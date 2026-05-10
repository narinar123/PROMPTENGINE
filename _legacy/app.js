/**
 * GS Prompt Hero — Web App Server
 * Real AI via Gemini API (native https, zero dependencies)
 * Routes: GET /*, POST /api/ai, POST /api/detect, GET /api/health
 */

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 8080;
const GEMINI_KEY = process.env.GEMINI_API_KEY || '';
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.woff2': 'font/woff2'
};

// ── Gemini call via native https ──────────────────────────────────────────────
function callGemini(prompt) {
  return new Promise((resolve, reject) => {
    if (!GEMINI_KEY) return reject(new Error('NO_KEY'));
    const body = JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { maxOutputTokens: 1024, temperature: 0.8 }
    });
    const req = https.request(
      `${GEMINI_URL}?key=${GEMINI_KEY}`,
      { method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) } },
      (res) => {
        let data = '';
        res.on('data', c => data += c);
        res.on('end', () => {
          try {
            const json = JSON.parse(data);
            const text = json?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) resolve(text);
            else reject(new Error(json?.error?.message || 'Empty response'));
          } catch (e) { reject(e); }
        });
      }
    );
    req.on('error', reject);
    req.setTimeout(25000, () => { req.destroy(); reject(new Error('Timeout')); });
    req.write(body);
    req.end();
  });
}

// ── Tool prompts ──────────────────────────────────────────────────────────────
const PROMPTS = {
  paraphraser: (t, opts) => `Paraphrase the following text in ${opts.mode||'standard'} style. Return only the paraphrased text, no explanation.\n\nText: ${t}`,
  grammar:     (t) => `Check the following text for grammar, spelling, and punctuation errors. Return a JSON object with two fields: "corrected" (the fixed text) and "issues" (array of {original, fix, type, desc}). Return only valid JSON.\n\nText: ${t}`,
  humanizer:   (t, opts) => `Rewrite the following AI-generated text to sound more human and natural. Strength: ${opts.strength||'moderate'}. Remove robotic patterns, vary sentence length, add natural flow. Return only the rewritten text.\n\nText: ${t}`,
  summarizer:  (t, opts) => `Summarize the following text in ${opts.style||'paragraph'} format (${opts.length||'medium'} length). Return only the summary.\n\nText: ${t}`,
  'email-writer': (t, opts) => `Write a ${opts.tone||'professional'} email. Purpose: ${opts.purpose||'follow-up'}. Recipient: ${opts.recipient||'Sir/Madam'}. Sender: ${opts.sender||''}. Key points: ${t}. Return only the email body including subject line prefixed with "Subject: ".`,
  'essay-writer': (t, opts) => `Write a ${opts.type||'argumentative'} essay at ${opts.level||'undergraduate'} level on the topic: "${t}". Include introduction, 2-3 body sections with H2 headings, and conclusion. Target ~${opts.words||500} words. Return only the essay.`,
  'blog-writer': (t, opts) => `Write a complete ${opts.tone||'informative'} blog post on: "${t}". Target audience: ${opts.audience||'general'}. Include H1 title, intro, 3+ H2 sections with content, and conclusion. Target ~${opts.words||700} words. Return only the blog post.`,
  'cover-letter': (t, opts) => `Write a ${opts.tone||'professional'} cover letter. Job: ${opts.job}. Company: ${opts.company||'the company'}. Applicant: ${opts.name||''}. Details: ${t}. Return only the cover letter.`,
  'job-description': (t, opts) => `Write a complete job description for: ${t}. Company: ${opts.company||''}. Level: ${opts.level||'mid'}. Type: ${opts.type||'Full-Time'}. Include: About the Role, Responsibilities (5+), Requirements (5+), Benefits. Return structured text.`,
  'story-generator': (t, opts) => `Write a ${opts.genre||'fiction'} ${opts.length||'short'} story based on: "${t}". Include vivid characters, conflict, and a satisfying ending. Return only the story.`,
  'poem-generator': (t, opts) => `Write a ${opts.style||'free verse'} poem about: "${t}". Make it emotionally resonant and original. Return only the poem.`,
  'speech-writer': (t, opts) => `Write a ${opts.tone||'professional'} speech for: ${opts.occasion||'a formal event'}. Topic/Notes: ${t}. Include opening hook, main points, and memorable close. Return only the speech.`,
  'meta-description': (t, opts) => `Generate 3 SEO meta descriptions for a page titled "${t}" about: ${opts.content||t}. Keyword: ${opts.keyword||''}. Each should be 150-160 characters. Return as JSON array of strings.`,
  'headline-generator': (t, opts) => `Generate 5 high-converting headlines for: "${t}". Tone: ${opts.tone||'engaging'}. Mix styles: how-to, listicle, question, bold statement. Return as JSON array of strings.`,
  'ad-copy': (t, opts) => `Write ad copy for: "${t}". Platform: ${opts.platform||'Google Ads'}. Include headline (max 30 chars), description (max 90 chars), and call-to-action. Return JSON with headline, description, cta fields.`,
  'product-description': (t, opts) => `Write a persuasive product description for: "${t}". Tone: ${opts.tone||'engaging'}. Include benefits, features, and a CTA. Return only the description (~100-150 words).`,
  'linkedin-bio': (t, opts) => `Write a professional LinkedIn summary for someone who is: ${t}. Make it compelling, keyword-rich, and authentic. First person. ~200 words. Return only the bio.`,
  'bio-generator': (t, opts) => `Write a concise professional bio for: ${t}. Platform: ${opts.platform||'general'}. Length: ${opts.length||'short'} (~80-120 words). Third person. Return only the bio.`,
  'caption-writer': (t, opts) => `Write a ${opts.tone||'engaging'} social media caption for ${opts.platform||'Instagram'} about: "${t}". Include relevant emojis and 5-8 hashtags. Return only the caption with hashtags.`,
  'cold-email': (t, opts) => `Write a personalized cold outreach email for: "${t}". Offer: ${opts.offer||''}. Keep it under 150 words, include a specific CTA. Return only the email with subject line prefixed "Subject: ".`,
  'rewriter': (t, opts) => `Rewrite the following for ${opts.goal||'clarity'} in ${opts.tone||'neutral'} tone. Return only the rewritten version.\n\nText: ${t}`,
  translation: (t, opts) => `Translate the following text to ${opts.targetLang||'Spanish'}. Preserve tone, style, and nuance. Return only the translation.\n\nText: ${t}`,
  'content-detector': (t) => `Analyze if the following text was written by AI or a human. Respond with JSON: {"score": 0-100 (100=definitely AI), "verdict": "AI Generated|Mixed Content|Likely Human", "reasoning": "brief explanation", "aiSentences": ["list of most AI-sounding sentences"]}. Return only valid JSON.\n\nText: ${t}`,
  summarizer_bullets: (t) => `Summarize the following text as 5 concise bullet points. Return as JSON array of strings.\n\nText: ${t}`,
  plagiarism: (t) => `Analyze the following text for originality. Assign an originality score 0-100. Return JSON: {"score": number, "verdict": string, "flaggedPhrases": ["phrase1","phrase2"]}. Return only JSON.\n\nText: ${t}`
};

// ── JSON body parser ──────────────────────────────────────────────────────────
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', c => { body += c; if (body.length > 50000) req.destroy(); });
    req.on('end', () => {
      try { resolve(JSON.parse(body)); } catch { resolve({}); }
    });
    req.on('error', reject);
  });
}

// ── Response helpers ──────────────────────────────────────────────────────────
function json(res, data, status = 200) {
  res.writeHead(status, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
  res.end(JSON.stringify(data));
}
function err(res, msg, status = 500) { json(res, { error: msg }, status); }

// ── Static file server ────────────────────────────────────────────────────────
function serveFile(res, filePath) {
  fs.readFile(filePath, (e, content) => {
    if (e) { res.writeHead(404); res.end('Not Found'); return; }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'text/plain' });
    res.end(content);
  });
}

// ── Main server ───────────────────────────────────────────────────────────────
http.createServer(async (req, res) => {
  const parsed = url.parse(req.url, true);
  const pathname = parsed.pathname;

  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${pathname}`);

  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST,GET', 'Access-Control-Allow-Headers': 'Content-Type' });
    return res.end();
  }

  // ── API: Health ────────────────────────────────────────────────────────────
  if (pathname === '/api/health') {
    return json(res, { status: 'ok', ai: GEMINI_KEY ? 'connected' : 'no-key', time: new Date().toISOString() });
  }

  // ── API: Main AI endpoint ──────────────────────────────────────────────────
  if (pathname === '/api/ai' && req.method === 'POST') {
    const body = await parseBody(req);
    const { tool, text, options = {} } = body;

    if (!text || text.trim().length < 2) return err(res, 'Input text required', 400);
    if (!tool || !PROMPTS[tool]) return err(res, 'Unknown tool: ' + tool, 400);

    const promptFn = PROMPTS[tool];
    const prompt = typeof promptFn === 'function' ? promptFn(text, options) : promptFn;

    if (!GEMINI_KEY) {
      // Demo mode: return a structured placeholder response
      return json(res, {
        result: `[Demo Mode — Add GEMINI_API_KEY to .env to enable real AI]\n\nYou entered: "${text.substring(0, 100)}..."`,
        demo: true,
        tool
      });
    }

    try {
      const result = await callGemini(prompt);
      // Try parsing as JSON for structured tools
      let parsed = result;
      if (['grammar','meta-description','headline-generator','ad-copy','content-detector','plagiarism','summarizer_bullets'].includes(tool)) {
        try {
          const jsonMatch = result.match(/\[[\s\S]*\]|\{[\s\S]*\}/);
          if (jsonMatch) parsed = JSON.parse(jsonMatch[0]);
        } catch {}
      }
      return json(res, { result: parsed, tool });
    } catch (e) {
      console.error('Gemini error:', e.message);
      if (e.message === 'NO_KEY') return err(res, 'API key not configured', 401);
      return err(res, 'AI error: ' + e.message, 502);
    }
  }

  // ── Static files ───────────────────────────────────────────────────────────
  if (req.method === 'GET') {
    let fp = '.' + pathname;
    if (fp === './' || fp === '.') fp = './index.html';
    // remove query string from path
    fp = fp.split('?')[0];
    return serveFile(res, fp);
  }

  err(res, 'Not found', 404);

}).listen(PORT, () => {
  const keyStatus = GEMINI_KEY ? '✅ Gemini AI connected' : '⚠️  No API key (demo mode) — set GEMINI_API_KEY in .env';
  console.log('\n\x1b[32m%s\x1b[0m', '✅ GS Prompt Hero webapp running on port ' + PORT);
  console.log('\x1b[36m%s\x1b[0m', '🚀 http://localhost:' + PORT);
  console.log('\x1b[33m%s\x1b[0m', '🤖 ' + keyStatus);
  console.log('\x1b[90m%s\x1b[0m', '📡 API: POST /api/ai  |  GET /api/health\n');
});
