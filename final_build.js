import fs from 'fs';
import path from 'path';

console.log("🏗️ Starting Zero-Dependency Production Build System...");

const files = [
  'src/components/AuthManager.js',
  'src/components/HeroSection.js',
  'src/components/WorkflowPlayground.js',
  'src/app/page.js'
];

let bundleCode = `/** 
 * GS Prompt Hero v2.0 - Optimized Production Bundle 
 * Auto-compiled via Terminal Zero-Build Pipeline 
 */

// Unified Module Ecosystem Injection
import React, { useState, createContext, useContext } from "react";
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Lock, Settings, Key, 
  Sparkles, ArrowRight, Shield, Zap, Globe, 
  Terminal, Play, Loader2, CheckCircle2, AlertCircle 
} from "lucide-react";

`;

// Step 1: Collect source payload with hygienic import mapping
for (const file of files) {
    console.log(`   📦 Packing component: ${file}`);
    const fullPath = path.join(process.cwd(), file);
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Aggressive import strip: Remove EVERY SINGLE import line
    // Standard regex for single and multi-line imports
    content = content.replace(/^import .*? from .*?;\s*$/gm, '');
    content = content.replace(/^import \{[\s\S]*?\} from .*?;\s*$/gm, '');
    
    // Ensure cross-file export keywords are cleaned to simple declarations for inline execution safety.
    content = content.replace(/export const /g, 'const ');
    content = content.replace(/export default function /g, 'function ');
    content = content.replace(/export /g, '');

    bundleCode += `\n\n/* --- COMPONENT BUNDLE: ${path.basename(file)} --- */\n` + content;
}

// Step 2: Add Application Bootstrap Vector
bundleCode += `

/* --- DYNAMIC APP BOOTSTRAP --- */
const bootApp = () => {
    const container = document.getElementById('root');
    if (!container) return console.error('FATAL: Root DOM not found.');
    const root = createRoot(container);
    // React components resolved through linear scoping in standard JS bundle
    root.render(React.createElement(App));
    console.log('🚀 GS PROMPT HERO: Application Activated Successfully.');
};

// Execute bootstrap on immediate listener ready event.
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootApp);
} else {
    bootApp();
}
`;

// Step 3: Ensure Output Directories Exist
const publicDir = path.join(process.cwd(), 'public');
const distDir = path.join(publicDir, 'dist');
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);
if (!fs.existsSync(distDir)) fs.mkdirSync(distDir);

// Step 4: Emit the Static Binary Artifact
fs.writeFileSync(path.join(distDir, 'bundle.js'), bundleCode);
console.log(`✅ Built artifact written to: public/dist/bundle.js (${(bundleCode.length / 1024).toFixed(2)} KB)`);

// Step 5: Deploy Optimized Index Shell
const html = `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GS Prompt Hero - Zero Build Pipeline</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'class', theme: { extend: { colors: { background: "#050505", foreground: "#ffffff", primary: "#6366f1" }, animation: { 'blob': 'blob 7s infinite' }, keyframes: { blob: { '0%': { transform: 'translate(0px, 0px) scale(1)' }, '33%': { transform: 'translate(30px, -50px) scale(1.1)' }, '66%': { transform: 'translate(-20px, 20px) scale(0.9)' }, '100%': { transform: 'translate(0px, 0px) scale(1)' } } } } }
        }
    </script>
    <style>
        body { background-color: #050505; color: #fff; }
        .glass { background: rgba(255,255,255,0.03); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.08); }
        .text-gradient { background: linear-gradient(to right, #a5b4fc, #6366f1, #c084fc); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    </style>
    <!-- Standard CDN Dynamic Import Map -->
    <script type="importmap">
    {
      "imports": {
        "react": "https://esm.sh/react@18?dev",
        "react-dom/client": "https://esm.sh/react-dom@18/client?dev",
        "framer-motion": "https://esm.sh/framer-motion@10.16.4",
        "lucide-react": "https://esm.sh/lucide-react@0.294.0"
      }
    }
    </script>
</head>
<body>
    <div id="root"></div>
    <!-- Run the natively resolved Javascript Bundle directly -->
    <script type="module" src="/dist/bundle.js"></script>
</body>
</html>`;

fs.writeFileSync(path.join(publicDir, 'index.html'), html);
console.log(`✅ Deployed unified system shell to: public/index.html`);
console.log(`🎉 BUILD COMPLETED SUCCESSFULLY IN TERMINAL!`);
