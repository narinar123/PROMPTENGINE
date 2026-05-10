/** 
 * GS Prompt Hero v2.0 - Optimized Production Bundle 
 * Auto-compiled via Terminal Zero-Build Pipeline 
 */


/* --- COMPONENT BUNDLE: AuthManager.js --- */
import React, { useState, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Lock, Settings, Key } from "lucide-react";

const AuthContext = createContext({
  user: null,
  role: "guest",
  login: () => {},
  logout: () => {},
});

const useAuth = () => useContext(AuthContext);

const AuthManager = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("guest");

  const login = (u, r) => {
    setUser(u);
    setRole(r);
  };
  
  const logout = () => {
    setUser(null);
    setRole("guest");
  };

  return React.createElement(AuthContext.Provider, { value: { user, role, login, logout } }, children);
};

const RoleSwitcher = () => {
  const { user, role, login, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const roles = ["guest", "editor", "admin", "super"];

  return React.createElement("div", { className: "fixed top-4 right-4 z-50 flex gap-3 items-center" }, 
    user && React.createElement("div", { className: "glass px-4 py-2 rounded-full text-xs font-semibold tracking-wide flex items-center gap-2" }, 
      React.createElement("span", { className: "w-2 h-2 rounded-full bg-green-500 animate-pulse" }),
      role.toUpperCase(), " MODE"
    ),
    React.createElement("button", { 
      onClick: () => setIsOpen(!isOpen),
      className: "w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
    }, React.createElement(User, { className: "w-5 h-5" })),
    React.createElement(AnimatePresence, null, 
      isOpen && React.createElement(motion.div, { 
        initial: { opacity: 0, scale: 0.9, y: 10 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.9, y: 10 },
        className: "absolute right-0 top-14 w-64 glass border border-white/10 rounded-2xl p-4 shadow-2xl overflow-hidden"
      }, 
        React.createElement("div", { className: "font-bold text-sm text-white mb-4 flex items-center gap-2" }, 
          React.createElement(Key, { className: "w-4 h-4 text-primary" }), 
          " Universal ID System"
        ),
        React.createElement("div", { className: "space-y-2" }, 
          roles.map((r) => React.createElement("button", {
            key: r,
            onClick: () => { login("DemoUser", r); setIsOpen(false); },
            className: `w-full flex justify-between items-center p-3 rounded-xl transition-all text-sm ${role === r && user ? 'bg-primary text-white' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`
          }, 
            React.createElement("span", { className: "capitalize" }, r),
            r === 'super' ? React.createElement(Lock, { className: "w-3 h-3 opacity-70" }) : React.createElement(Settings, { className: "w-3 h-3 opacity-50" })
          )),
          user && React.createElement("button", { 
            onClick: () => { logout(); setIsOpen(false); },
            className: "w-full mt-4 p-2 border border-red-500/30 bg-red-500/10 text-red-400 rounded-xl text-xs hover:bg-red-500/20 transition-colors"
          }, "Terminate Session")
        )
      )
    )
  );
};


/* --- COMPONENT BUNDLE: HeroSection.js --- */
import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Shield, Zap, Globe } from "lucide-react";

const HeroSection = () => {
  return React.createElement("div", { className: "relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-20" },
    /* 1000% Dynamic Background Layer */
    React.createElement("div", { className: "absolute inset-0 z-0 overflow-hidden pointer-events-none" },
      React.createElement(motion.div, {
        initial: { opacity: 0, scale: 1.2 },
        animate: { opacity: [0.6, 0.8, 0.6], scale: [1, 1.05, 1], rotate: [0, 1, 0] },
        transition: { duration: 20, repeat: Infinity, ease: "linear" },
        className: "absolute -inset-[10%] bg-cover bg-center opacity-60 blur-[2px]",
        style: { 
          backgroundImage: `url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2564')`,
          backgroundPosition: '50% 50%'
        }
      }),
      React.createElement("div", { className: "absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background" }),
      React.createElement("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" }),
      React.createElement("div", { className: "absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-[120px] animate-blob" }),
      React.createElement("div", { className: "absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[150px] animate-blob animation-delay-2000" })
    ),
    
    /* Main Hero Content Container */
    React.createElement("div", { className: "relative z-10 max-w-7xl mx-auto text-center" },
      React.createElement(motion.div, {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, ease: "easeOut" }
      },
        React.createElement("div", { className: "inline-flex items-center gap-2 px-3 py-1.5 mb-8 border border-white/10 bg-white/5 backdrop-blur-xl rounded-full" },
          React.createElement("span", { className: "flex h-2 w-2 relative" },
            React.createElement("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" }),
            React.createElement("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-primary" })
          ),
          React.createElement("span", { className: "text-xs font-medium tracking-wider text-white/70 uppercase" }, "Introducing Prompt Hero 2.0")
        ),
        React.createElement("h1", { className: "text-6xl md:text-8xl font-extrabold tracking-tight font-heading mb-8 leading-[1.1]" },
          React.createElement("span", { className: "block text-white" }, "Design The Future"),
          React.createElement("span", { className: "text-gradient" }, "Through AI Workflows")
        ),
        React.createElement("p", { className: "max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-12 leading-relaxed font-light" },
          "Unlock production-grade automation with real-time execution engines, enterprise identity, and advanced prompt orchestrators. Seamless. Autonomous. Next Gen."
        ),
        React.createElement("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-5 mb-24" },
          React.createElement(motion.button, {
            whileHover: { scale: 1.05 },
            whileTap: { scale: 0.98 },
            className: "group relative px-8 py-4 bg-primary text-white font-semibold rounded-xl overflow-hidden shadow-[0_0_40px_rgba(99,102,241,0.3)]"
          },
            React.createElement("div", { className: "absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" }),
            React.createElement("span", { className: "relative flex items-center gap-2 text-lg" },
              "Get Started Now ", 
              React.createElement(ArrowRight, { className: "w-5 h-5 group-hover:translate-x-1 transition-transform" })
            )
          ),
          React.createElement(motion.button, {
            whileHover: { scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' },
            className: "px-8 py-4 bg-white/5 border border-white/10 backdrop-blur-md text-white font-semibold rounded-xl flex items-center gap-2 text-lg transition-colors"
          }, "Explore Library")
        )
      ),
      
      /* Features grid */
      React.createElement(motion.div, {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 1, delay: 0.3 },
        className: "grid grid-cols-1 md:grid-cols-3 gap-6 text-left"
      },
        [
          { icon: Shield, title: "RBAC & MFA Security", desc: "Universal dynamic user roles with contextual permissions control." },
          { icon: Zap, title: "Sub-second Workflows", desc: "Highly distributed stream-optimized execution agents." },
          { icon: Globe, title: "Global Cloud Scale", desc: "Deploy and iterate instantaneously across distributed infrastructure." }
        ].map((item, idx) => 
          React.createElement("div", { key: idx, className: "glass p-8 rounded-2xl group hover:border-white/20 transition-all duration-500" },
            React.createElement("div", { className: "w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform group-hover:bg-primary/20" },
              React.createElement(item.icon, { className: "w-6 h-6 text-primary group-hover:text-indigo-400 transition-colors" })
            ),
            React.createElement("h3", { className: "text-xl font-bold font-heading mb-3 text-white" }, item.title),
            React.createElement("p", { className: "text-slate-400 leading-relaxed text-sm" }, item.desc)
          )
        )
      )
    )
  );
};


/* --- COMPONENT BUNDLE: WorkflowPlayground.js --- */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Play, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

const WorkflowPlayground = () => {
  const { role } = useAuth();
  const [prompt, setPrompt] = useState("Analyze secure vector embeddings sequence...");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const runWorkflow = async () => {
    if (role === 'guest') {
      setError("Insufficient Role: Requires active authentication.");
      setTimeout(() => setError(""), 3000);
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tool: 'paraphraser', text: prompt })
      });
      const data = await res.json();
      if (data.result) {
        setOutput(data.result);
      } else {
        setError(data.error || "Node Execution Fault.");
      }
    } catch (e) {
      setError("API Gateway Disconnected.");
    } finally {
      setLoading(false);
    }
  };

  return React.createElement("div", { className: "relative py-24 w-full max-w-6xl mx-auto px-6" },
    React.createElement("div", { className: "text-center mb-16" },
      React.createElement("h2", { className: "text-3xl md:text-4xl font-heading font-bold text-white mb-3 tracking-tight" }, "Dynamic Framework Execution"),
      React.createElement("p", { className: "text-slate-400 max-w-lg mx-auto text-sm font-light leading-relaxed" },
        "Connect dynamically to the Genkit architecture. Select specialized roles in the top right corner to bypass simulated gateway locks."
      )
    ),
    React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6" },
      /* Left Panel */
      React.createElement("div", { className: "glass p-8 rounded-3xl transition-all duration-500" },
        React.createElement("div", { className: "flex items-center justify-between mb-6" },
          React.createElement("div", { className: "flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-slate-400" },
            React.createElement(Terminal, { className: "w-4 h-4 text-primary" }), " Instance Shell"
          ),
          React.createElement("div", { 
            className: `text-[10px] font-bold tracking-wider border px-2 py-1 rounded-lg uppercase ${role === 'guest' ? 'text-red-400 border-red-500/20 bg-red-500/5' : 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5'}`
          }, `Role: ${role}`)
        ),
        React.createElement("textarea", {
          value: prompt,
          onChange: (e) => setPrompt(e.target.value),
          className: "w-full h-48 bg-black/40 rounded-2xl p-5 text-slate-200 font-mono text-sm border border-white/5 focus:border-primary/40 focus:outline-none resize-none placeholder-slate-600 transition-colors"
        }),
        React.createElement(motion.button, {
          whileTap: { scale: 0.98 },
          onClick: runWorkflow,
          disabled: loading,
          className: "mt-6 w-full py-4 flex items-center justify-center gap-3 bg-gradient-to-br from-indigo-600 to-violet-700 hover:brightness-110 disabled:opacity-40 text-white text-sm font-bold tracking-wide rounded-2xl shadow-lg shadow-indigo-900/20 transition-all"
        }, 
          loading ? React.createElement(Loader2, { className: "w-5 h-5 animate-spin" }) : React.createElement(Play, { className: "w-4 h-4 fill-current" }),
          " Initialize Stream Matrix"
        ),
        error && React.createElement(motion.div, {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          className: "mt-4 p-4 bg-red-950/30 border border-red-800/40 text-red-300 rounded-2xl text-xs font-medium flex items-center gap-3"
        },
          React.createElement("div", { className: "p-1 bg-red-500/20 rounded-full" }, React.createElement(AlertCircle, { className: "w-3.5 h-3.5" })),
          ` ${error}`
        )
      ),
      /* Right Panel */
      React.createElement("div", { className: "glass p-8 rounded-3xl flex flex-col min-h-[400px]" },
        React.createElement("div", { className: "flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-slate-400 mb-6" },
          React.createElement(CheckCircle2, { className: "w-4 h-4 text-emerald-500" }), " Matrix Response"
        ),
        React.createElement("div", { className: "flex-1 bg-black/60 border border-white/5 rounded-2xl p-6 font-mono text-xs overflow-y-auto leading-relaxed relative group" },
          loading ? React.createElement("div", { className: "text-indigo-300/60 flex flex-col gap-1" },
            React.createElement("span", { className: "animate-pulse" }, "[SYSTEM] Synchronizing neural endpoints..."),
            React.createElement("span", { className: "animate-pulse animation-delay-500" }, "[SYSTEM] Awaiting vector computation...")
          ) : output ? React.createElement("div", { 
            className: "text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.3)] whitespace-pre-wrap" 
          }, output) : React.createElement("div", { 
            className: "absolute inset-0 flex items-center justify-center text-slate-700 italic select-none" 
          }, "Standby for input execution context...")
        )
      )
    )
  );
};


/* --- COMPONENT BUNDLE: page.js --- */
import React from "react";



function App() {
  return React.createElement(AuthManager, null,
    React.createElement("main", { className: "min-h-screen w-full bg-background text-foreground overflow-x-hidden" },
      React.createElement(RoleSwitcher, null),

      React.createElement("nav", { className: "fixed top-0 inset-x-0 z-40 h-16 glass border-b border-white/5 flex items-center justify-between px-6 md:px-12" },
        React.createElement("div", { className: "flex items-center gap-2 font-heading font-bold text-xl tracking-tight text-white" },
          React.createElement("div", { className: "w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white" }, "G"),
          "PROMPT HERO"
        ),
        React.createElement("div", { className: "hidden md:flex items-center gap-8 text-sm text-slate-400 font-medium" },
          React.createElement("a", { href: "#", className: "hover:text-white transition-colors" }, "Solutions"),
          React.createElement("a", { href: "#", className: "hover:text-white transition-colors" }, "Workflows"),
          React.createElement("a", { href: "#", className: "hover:text-white transition-colors" }, "Docs"),
          React.createElement("a", { href: "#", className: "hover:text-white transition-colors" }, "Pricing")
        ),
        React.createElement("div", { className: "flex items-center gap-4" },
          React.createElement("button", { className: "hidden sm:block text-sm text-white font-medium hover:text-primary transition-colors" }, "Sign In"),
          React.createElement("button", { className: "px-4 py-2 bg-white text-black text-sm font-bold rounded-lg hover:bg-slate-200 transition-all" }, "Access Beta")
        )
      ),

      React.createElement(HeroSection, null),
      
      React.createElement("section", { className: "relative border-t border-white/5 bg-[#0c0c0e]" },
        React.createElement(WorkflowPlayground, null)
      ),

      React.createElement("footer", { className: "py-12 border-t border-white/5 glass text-center text-slate-500 text-xs" },
        React.createElement("div", null, "© 2026 GS Prompt Hero AI. All access reserved.")
      )
    )
  );
}


/* --- DYNAMIC APP BOOTSTRAP --- */
import { createRoot } from 'react-dom/client';

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
