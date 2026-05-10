import fs from 'fs';
import path from 'path';

const files = [
  'src/components/icon_stubs.js',
  'src/components/AuthManager.js',
  'src/components/HeroSection.js',
  'src/components/WorkflowPlayground.js',
  'src/app/page.js'
];

let bundleCode = '';

for (const file of files) {
  const fullPath = path.join(process.cwd(), file);
  let content = fs.readFileSync(fullPath, 'utf8');
  
  // High-stability Line-by-Line Import Extractor
  const lines = content.split('\n');
  let cleanLines = [];
  let inMultiLineImport = false;
  
  for(let line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('import ') && !trimmed.includes(';')) {
          inMultiLineImport = true;
          continue;
      }
      if (inMultiLineImport) {
          if (trimmed.includes('from ') && trimmed.includes(';')) {
              inMultiLineImport = false;
          }
          continue;
      }
      if (trimmed.startsWith('import ') && trimmed.includes(';')) {
          continue; // Single line import
      }
      cleanLines.push(line);
  }
  content = cleanLines.join('\n');
  
  // Strip Export keyword logic (converts to standard assignments/declarations for Eval)
  content = content.replace(/export const /g, 'const ');
  content = content.replace(/export default function /g, 'function ');
  content = content.replace(/export /g, ''); // Backup catcher
  
  // Inject safe icon destructurer at head of each module to guarantee local resolve
  const iconInject = `\nconst { User, Lock, Settings, Key, Sparkles, ArrowRight, Shield, Zap, Globe, Terminal, Play, Loader2, CheckCircle2, AlertCircle } = window;\n`;
  content = iconInject + content;

  bundleCode += `\n\n/* --- BUNDLED COMPONENT: ${file} --- */\n\n` + content;
  
  // Post-inject global bridge bindings based on the component name
  if (file.includes('AuthManager.js')) {
      bundleCode += `\nwindow.AuthManager = AuthManager; window.RoleSwitcher = RoleSwitcher; window.useAuth = useAuth; \n`;
  } else if (file.includes('HeroSection.js')) {
      bundleCode += `\nwindow.HeroSection = HeroSection;\n`;
  } else if (file.includes('WorkflowPlayground.js')) {
      bundleCode += `\nwindow.WorkflowPlayground = WorkflowPlayground; \n`;
      // Special: inject useAuth resolver into WorkflowPlayground
      bundleCode = bundleCode.replace('const WorkflowPlayground = () => {', 'const WorkflowPlayground = () => {\n  const { useAuth } = window;\n');
  } else if (file.includes('page.js')) {
      // Inject destructurer inside App function definition to force linkage
      bundleCode = bundleCode.replace('function App() {', 'function App() {\n  const { AuthManager, RoleSwitcher, HeroSection, WorkflowPlayground } = window;\n');
  }
}

// Ensure we ONLY have one unified import set at the TOP for performance
// Actually let's just leave them, browser handles duplicate module specifier resolution perfectly.

const htmlTemplate = `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>GS Prompt Hero - Next Vibe System</title>
  
  <!-- Advanced Dynamic Styling Architecture -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            background: "#050505",
            foreground: "#ffffff",
            primary: { DEFAULT: "#6366f1", hover: "#4f46e5" },
            secondary: "#1e1b4b"
          },
          fontFamily: {
            sans: ["Inter", "system-ui", "sans-serif"],
            heading: ["Outfit", "sans-serif"]
          },
          animation: {
            'blob': 'blob 7s infinite',
          },
          keyframes: {
            blob: {
              '0%': { transform: 'translate(0px, 0px) scale(1)' },
              '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
              '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
              '100%': { transform: 'translate(0px, 0px) scale(1)' },
            }
          }
        }
      }
    }
  </script>
  
  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&family=Outfit:wght@400;700;900&display=swap" rel="stylesheet">

  <style>
    body { background-color: #050505; color: #fff; overflow-x: hidden; }
    .glass { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.08); }
    .text-gradient { background: linear-gradient(to right, #a5b4fc, #6366f1, #c084fc); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  </style>

  <!-- Rock-Solid UMD Global Scripts (Works in every restricted environment) -->
  <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/framer-motion@10.16.4/dist/framer-motion.js"></script>

  <!-- Browser-side Transpiler Architecture -->
  <script src="https://unpkg.com/@babel/standalone@7.23.9/babel.min.js"></script>
</head>
<body>
  <div id="root">
    <!-- Preloader -->
    <div style="position:fixed;top:0;left:0;width:100vw;height:100vh;background:#050505;display:flex;align-items:center;justify-content:center;color:#6366f1;font-family:sans-serif;font-weight:bold;z-index:9999" id="fallback-loader">
      BOOTING ARCHITECTURE...
    </div>
  </div>

  <!-- The Final Payload Buffer (Stored as raw source to escape syntax evaluation) -->
  <script type="text/plain" id="source-payload">
    ${bundleCode}
    
    // Explicit bridge to lift App from local injection scope to accessible global scope
    window.App = App;
    
    window.__INIT_REACT_NOW__ = () => {
      try {
        console.log("[BOOT] Locating viewport container...");
        const container = document.getElementById("root");
        if (!window.App) throw new Error("Core 'App' construct was not delivered across the bridge.");
        
        console.log("[BOOT] Initiating React framework...");
        const root = createRoot(container);
        console.log("[BOOT] Mounting application instance...");
        root.render(React.createElement(window.App));
        console.log("[BOOT] FRAME ONLINE.");
        
        setTimeout(() => {
            const l = document.getElementById('fallback-loader');
            if(l) l.remove();
        }, 100);
      } catch (err) {
        console.error("[BOOT] RENDER EXCEPTION:", err);
        document.body.innerHTML = "<div style='color:red;padding:50px;font-family:sans-serif'><h1>FATAL RENDER: " + err.message + "</h1></div>";
      }
    };
  </script>

  <!-- Manual Transpiler Lifecycle Handler -->
  <script>
    window.addEventListener('DOMContentLoaded', () => {
       console.log("[LOADER] Validating global namespaces...");
       try {
           // Establish global mappings from the UMD packages
           window.useState = window.React.useState;
           window.createContext = window.React.createContext;
           window.useContext = window.React.useContext;
           window.createRoot = window.ReactDOM.createRoot;
           
           // Motion detection (varies slightly between versions)
           window.motion = window.Motion || window.framerMotion?.motion || window.framerMotion;
           window.AnimatePresence = window.Motion?.AnimatePresence || window.framerMotion?.AnimatePresence;
           
           console.log("[LOADER] Starting manual compilation pipeline...");
           if (typeof Babel === 'undefined') {
               throw new Error("Babel Standalone was blocked or failed to load.");
           }
           
           const rawCode = document.getElementById('source-payload').textContent;
           
           console.log("[LOADER] Parsing source via Babel Core...");
           // Perform manual transformation!
           const result = Babel.transform(rawCode, {
               presets: ['react'],
               filename: 'app.jsx' // Hint to Babel that this is JSX code
           });
           
           console.log("[LOADER] Compilation finished. Injecting execution...");
           
           // We execute the code dynamically now!
           const execScript = document.createElement('script');
           execScript.text = result.code;
           document.body.appendChild(execScript);
           
           console.log("[LOADER] Script active. Checking for React Initialization vector...");
           
           if (typeof window.__INIT_REACT_NOW__ === 'function') {
               window.__INIT_REACT_NOW__();
           } else {
               throw new Error("Boot sequence handler missing after execution.");
           }
       } catch (e) {
           console.error("[LOADER] COMPILER FAULT:", e);
           document.getElementById('fallback-loader').innerText = "COMPILE ERROR: " + e.message;
           document.getElementById('fallback-loader').style.color = 'red';
       }
    });
  </script>
</body>
</html>
`;

fs.writeFileSync('index.html', htmlTemplate);
console.log("✅ Manual Eval-injection Production Bundle deployed successfully.");
