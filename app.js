import http from 'http';
import https from 'https';
import fs from 'fs';
import path from 'path';
import url from 'url';

const PORT = process.env.PORT || 3010;
const GEMINI_KEY = process.env.GEMINI_API_KEY || '';
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.jsx': 'application/javascript', // Browser must treat jsx as source text for babel
  '.ts': 'application/javascript',
  '.tsx': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

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

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  console.log(`[REQUEST] ${req.method} ${pathname}`);

  // CORS Support
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  // ── Universal Serverless API Dispatcher ─────────────────────────────────────
  if (pathname.startsWith('/api/') && !pathname.endsWith('.js')) {
      const endpoint = pathname.split('/').pop();
      const apiPath = path.join(process.cwd(), 'api', `${endpoint}.js`);
      
      if (fs.existsSync(apiPath)) {
          let bodyStr = '';
          req.on('data', chunk => bodyStr += chunk);
          req.on('end', async () => {
              try {
                  // Dynamic simulation of serverless environment wrapper
                  const mod = await import(url.pathToFileURL(apiPath).href + `?t=${Date.now()}`);
                  const handler = mod.default;

                  // Inject simulated res helper methods (like Vercel/Next.js format)
                  res.status = (code) => { res.writeHead(code); return res; };
                  res.json = (obj) => { 
                      res.setHeader('Content-Type', 'application/json');
                      res.end(JSON.stringify(obj));
                  };
                  req.body = bodyStr ? JSON.parse(bodyStr) : {};
                  
                  // Parse simple query params if they aren't available
                  req.query = parsedUrl.query;

                  await handler(req, res);
              } catch (e) {
                  console.error(`[API FAILED] ${endpoint}:`, e.message);
                  res.writeHead(500, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ success: false, error: e.message }));
              }
          });
          return;
      } else {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ success: false, error: 'Endpoint Not Found' }));
      }
  }

  // ── Static File Delivery ────────────────────────────────────────────────────
  // If it maps into /src, server serves it from filesystem directly
  // Else it falls into /public folder convention.
  let localPath = '';
  if (pathname.startsWith('/src/')) {
    localPath = path.join(process.cwd(), pathname);
  } else {
    // Maps root to public/index.html
    let relativePath = pathname === '/' ? 'index.html' : pathname;
    localPath = path.join(process.cwd(), 'public', relativePath);
  }

  // If file doesn't have extension but is route, fallback to root index.html (SPA behavior)
  if (!path.extname(localPath) && pathname !== '/') {
      localPath = path.join(process.cwd(), 'public', 'index.html');
  }

  fs.stat(localPath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback to SPA root if file not found and no extension
      if (!path.extname(localPath)) {
          const fallbackPath = path.join(process.cwd(), 'public', 'index.html');
          fs.readFile(fallbackPath, (e, content) => {
              res.writeHead(200, { 'Content-Type': 'text/html' });
              res.end(content);
          });
          return;
      }
      res.writeHead(404);
      res.end('404 Resource Missing');
      return;
    }

    const ext = path.extname(localPath).toLowerCase();
    const mime = MIME_TYPES[ext] || 'text/plain';

    fs.readFile(localPath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Internal Disk Error');
        return;
      }
      res.writeHead(200, { 'Content-Type': mime });
      res.end(data);
    });
  });
});

server.listen(PORT, '0.0.0.0', () => {
  const actualPort = server.address().port;
  console.log('\n🚀 GS PROMPT HERO 2.0 NEXT-VIBE SERVER ACTIVATED');
  console.log(`🌍 Local URL: http://localhost:${actualPort}`);
  console.log(`📡 Connected to Gemini AI: ${GEMINI_KEY ? 'YES' : 'NO (KEY MISSING)'}\n`);
});
