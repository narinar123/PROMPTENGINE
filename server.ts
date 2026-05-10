import { serve } from "bun";
import { join } from "path";

const PORT = 3000;

async function buildFrontend() {
  console.log("🚀 Bundling frontend...");
  try {
    const result = await Bun.build({
      entrypoints: ["./src/main.tsx"],
      outdir: "./public/dist",
      minify: false, // Useful for dev visibility
      sourcemap: "external",
      external: ["react", "react-dom", "framer-motion", "lucide-react", "clsx", "tailwind-merge"],
      define: {
        "process.env.NODE_ENV": '"development"',
      },
    });

    if (!result.success) {
      console.error("❌ Build failed:");
      for (const message of result.logs) {
        console.error(message);
      }
    } else {
      console.log("✅ Frontend build successful!");
    }
  } catch (e) {
    console.error("Build catastrophic failure", e);
  }
}

// Run initial build
await buildFrontend();

console.log(`✨ Starting development server on http://localhost:${PORT}`);

const GEMINI_KEY = process.env.GEMINI_API_KEY || "";
const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

async function callGemini(prompt: string) {
  if (!GEMINI_KEY) throw new Error("GEMINI_API_KEY is missing");
  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { maxOutputTokens: 1024, temperature: 0.8 }
  };
  
  const res = await fetch(`${GEMINI_URL}?key=${GEMINI_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  const json: any = await res.json();
  return json?.candidates?.[0]?.content?.parts?.[0]?.text || "Failed to get response";
}

const server = serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);
    const pathname = url.pathname;

    // API endpoint proxy logic
    if (pathname === "/api/ai" && req.method === "POST") {
      try {
        const body: any = await req.json();
        const result = await callGemini(body.prompt || "Hello world");
        return Response.json({ success: true, result });
      } catch (e: any) {
        return Response.json({ success: false, error: e.message }, { status: 500 });
      }
    }

    // Health check
    if (pathname === "/api/health") {
      return Response.json({ status: "ok", bun: Bun.version, timestamp: new Date() });
    }

    // Static Asset Server
    let filePath = pathname;
    if (filePath === "/") filePath = "/index.html";
    
    const fileLoc = join(process.cwd(), "public", filePath);
    const file = Bun.file(fileLoc);

    if (await file.exists()) {
      return new Response(file);
    }

    // Fallback to index.html for SPA routing
    return new Response(Bun.file(join(process.cwd(), "public", "index.html")));
  },
});
