import fs from 'fs';
import path from 'path';

console.log("🏗️ Starting Zero-Dependency Production Build System...");

const files = [
  'src/components/AuthManager.js',
  'src/components/HeroSection.js',
  'src/components/WorkflowPlayground.js',
  'src/components/DynamicViews.js',
  'src/components/ToolMatrix.js',
  'src/components/DesignCodeView.js',
  'src/app/page.js'
];

let bundleCode = `/** 
 * GS Prompt Hero v2.0 - Optimized Production Bundle 
 * Auto-compiled via Terminal Zero-Build Pipeline 
 */

// Unified Module Ecosystem Injection
import React, { useState, createContext, useContext, useEffect, useLayoutEffect, useRef } from "react";
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  User, Lock, Settings, Key, LogIn, LogOut, UserPlus, AlertTriangle, 
  Sparkles, ArrowRight, Shield, Zap, Globe, 
  Terminal, Play, Loader2, CheckCircle2, AlertCircle,
  FileText, Edit, Repeat, CheckCircle, BookOpen, Mail, 
  MessageSquare, Briefcase, Copy, CheckSquare, Type,
  Database, Code, Layers, Cpu, Star, Check, CreditCard, X, Smartphone, QrCode} from "lucide-react";

// Core Engine Extension Registration
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

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
    <title>GUIDESOFT | Advanced Dynamic AI Ecosystem</title>
    <link rel="icon" href="https://www.gsgroups.net/gslogo.png" type="image/png">
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800;900&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'class', 
            theme: { 
                extend: { 
                    fontFamily: { sans: ['Outfit', 'sans-serif'] },
                    colors: { background: "#050506", foreground: "#ffffff", primary: "#6366f1" }, 
                    animation: { 'blob': 'blob 7s infinite' }, 
                    keyframes: { blob: { '0%': { transform: 'translate(0px, 0px) scale(1)' }, '33%': { transform: 'translate(30px, -50px) scale(1.1)' }, '66%': { transform: 'translate(-20px, 20px) scale(0.9)' }, '100%': { transform: 'translate(0px, 0px) scale(1)' } } } 
                } 
            } 
        }
    </script>
    <style>
        body { background-color: #050506; color: #fff; font-family: 'Outfit', sans-serif; overflow-x: hidden; }
        .glass { background: rgba(255,255,255,0.02); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); border: 1px solid rgba(255,255,255,0.05); }
        .glass-card { background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01)); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.08); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); }
        .text-gradient { background: linear-gradient(to right, #818cf8, #c084fc, #e879f9); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .perspective-1000 { perspective: 1000px; }
        ::selection { background: #6366f1; color: white; }
    </style>
    <!-- Immediate Global Node Polyfill (Prevents CDN Vendor Crashes) -->
    <script>
      window.process = { env: { NODE_ENV: 'production' } };
      window.onerror = function(msg, url, lineNo, columnNo, error) {
        var el = document.createElement('div');
        el.style.cssText = 'position:fixed;top:0;left:0;right:0;background:red;color:white;z-index:999999;padding:20px;font-family:monospace;white-space:pre-wrap;';
        el.textContent = 'GLOBAL ERROR: ' + msg + '\n' + url + ':' + lineNo + ':' + columnNo + '\n' + (error ? error.stack : '');
        document.body.appendChild(el);
      };
      window.addEventListener('unhandledrejection', function(event) {
        var el = document.createElement('div');
        el.style.cssText = 'position:fixed;top:0;left:0;right:0;background:orange;color:white;z-index:999999;padding:20px;font-family:monospace;white-space:pre-wrap;';
        el.textContent = 'UNHANDLED PROMISE REJECTION: ' + (event.reason && event.reason.stack ? event.reason.stack : event.reason);
        document.body.appendChild(el);
      });
    </script>
    <!-- Standard CDN Dynamic Import Map -->
    <script type="importmap">
    {
      "imports": {
        "react": "https://esm.sh/react@18.2.0",
        "react-dom/client": "https://esm.sh/react-dom@18.2.0/client",
        "framer-motion": "https://esm.sh/framer-motion@10.16.4",
        "lucide-react": "https://esm.sh/lucide-react@0.294.0",
        "gsap": "https://esm.sh/gsap@3.12.5",
        "gsap/ScrollTrigger": "https://esm.sh/gsap@3.12.5/ScrollTrigger"
      }
    }
    </script>
    <!-- Google Identity Services SDK -->
    <script src="https://accounts.google.com/gsi/client" async defer></script>
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
