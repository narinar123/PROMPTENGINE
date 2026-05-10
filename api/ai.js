import https from 'https';

const GEMINI_KEY = process.env.GEMINI_API_KEY || '';
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

async function callGemini(prompt) {
  return new Promise((resolve, reject) => {
    if (!GEMINI_KEY) return reject(new Error('NO_API_KEY_CONFIGURED'));
    const body = JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { maxOutputTokens: 1024, temperature: 0.7 }
    });
    
    const req = https.request(
      `${GEMINI_URL}?key=${GEMINI_KEY}`,
      { method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) } },
      (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            const json = JSON.parse(data);
            const text = json?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) resolve(text);
            else reject(new Error(json?.error?.message || 'Empty AI frame returned'));
          } catch (e) { reject(e); }
        });
      }
    );
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// Official Vercel Serverless Function Handler
export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        return res.status(204).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: "Method not allowed" });
    }

    let parsed = req.body;

    if (!parsed) {
        // Fallback for non-buffered stream execution (some runtimes)
        let bodyStr = '';
        await new Promise((resolve) => {
            req.on('data', chunk => bodyStr += chunk);
            req.on('end', resolve);
        });
        try { parsed = JSON.parse(bodyStr || '{}'); } catch(e) { parsed = {}; }
    }

    try {
        const promptText = parsed.prompt || parsed.text || "Analyze current prompt orchestrator state.";
        
        const result = await callGemini(promptText);
        return res.status(200).json({ success: true, result });
    } catch (err) {
        console.error("Function error:", err.message);
        return res.status(500).json({ 
            success: false, 
            error: err.message.includes('NO_API') ? "Configure GEMINI_API_KEY in Vercel dashboard." : err.message 
        });
    }
}
