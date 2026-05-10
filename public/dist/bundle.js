/** 
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
  Terminal, Play, Loader2, CheckCircle2, AlertCircle,
  FileText, Edit, Repeat, CheckCircle, BookOpen, Mail, 
  MessageSquare, Briefcase, Copy, CheckSquare, Type,
  Database, Code, Layers, Cpu} from "lucide-react";



/* --- COMPONENT BUNDLE: AuthManager.js --- */



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


/* --- COMPONENT BUNDLE: DynamicViews.js --- */



const SolutionsView = () => {
  return React.createElement(motion.div, {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    className: "pt-32 pb-20 px-6 max-w-7xl mx-auto"
  },
    React.createElement("div", { className: "text-center mb-16" },
      React.createElement("h2", { className: "text-5xl font-extrabold text-gradient mb-4" }, "Enterprise Ecosystem Solutions"),
      React.createElement("p", { className: "text-slate-400 max-w-2xl mx-auto text-lg" }, "Scalable AI frameworks designed for next-gen corporate acceleration.")
    ),
    React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8" },
      [
        { title: "Generative Core", desc: "Deploy and orchestrate massive language models instantly across internal secure pipelines.", icon: Sparkles },
        { title: "Nexus Security", desc: "Military-grade compliance ensuring dynamic context windows stay private and localized.", icon: Shield },
        { title: "Flow Integration", desc: "Hook directly into distributed cloud nodes via direct-compute rest endpoints.", icon: Zap },
        { title: "Edge Velocity", desc: "Distribute inference workflows globally at under 50ms worldwide replication latency.", icon: Globe }
      ].map((solution, idx) => 
        React.createElement("div", { key: idx, className: "glass p-10 rounded-3xl group hover:bg-white/5 transition-all duration-500 cursor-pointer" },
          React.createElement("div", { className: "flex items-center gap-4 mb-6" },
            React.createElement("div", { className: "p-3 bg-primary/20 rounded-xl text-primary group-hover:scale-110 transition-transform" }, 
              React.createElement(solution.icon, { className: "w-6 h-6" })
            ),
            React.createElement("h3", { className: "text-2xl font-bold text-white" }, solution.title)
          ),
          React.createElement("p", { className: "text-slate-400 leading-relaxed" }, solution.desc),
          React.createElement("div", { className: "mt-8 h-1 w-full bg-white/5 rounded-full overflow-hidden" },
            React.createElement(motion.div, {
              initial: { width: 0 },
              animate: { width: '100%' },
              transition: { duration: 2, delay: 0.5 + idx * 0.2 },
              className: "h-full bg-primary"
            })
          )
        )
      )
    )
  );
};

const PricingView = () => {
  return React.createElement(motion.div, {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    className: "pt-32 pb-20 px-6 max-w-6xl mx-auto"
  },
    React.createElement("div", { className: "text-center mb-20" },
      React.createElement("h2", { className: "text-5xl font-extrabold text-white mb-4" }, "Unlocking Dynamic Scaling"),
      React.createElement("p", { className: "text-slate-400" }, "Select your enterprise velocity vector tier.")
    ),
    React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 items-center" },
      [
        { name: "Developer", price: "Free", features: ["100 Operations / Day", "Standard Model Access", "Community Support"], accent: false },
        { name: "Pro Architect", price: "$49/mo", features: ["Unlimited Parallel Flows", "Advanced Multi-Agent API", "Priority Core Compute", "Custom Prompts"], accent: true },
        { name: "Elite Core", price: "Custom", features: ["Dedicated GPU Farm", "SOC-2 Hardened Compliance", "Dedicated 24/7 Engineer Team"], accent: false }
      ].map((tier, idx) => 
        React.createElement("div", { 
          key: idx, 
          className: `rounded-3xl p-10 transition-all duration-500 relative ${tier.accent ? 'bg-gradient-to-b from-indigo-900/50 to-violet-900/50 border-2 border-primary scale-105 shadow-[0_0_50px_rgba(99,102,241,0.2)]' : 'glass border border-white/10 hover:border-white/20'}` 
        },
          tier.accent && React.createElement("div", { className: "absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full tracking-widest uppercase shadow-xl" }, "Most Optimized"),
          React.createElement("h3", { className: "text-xl font-bold text-slate-200 mb-2" }, tier.name),
          React.createElement("div", { className: "text-4xl font-extrabold text-white mb-8" }, tier.price),
          React.createElement("div", { className: "space-y-4 mb-10" }, 
            tier.features.map((f, i) => React.createElement("div", { key: i, className: "flex items-center gap-3 text-slate-300 text-sm" },
              React.createElement(CheckCircle2, { className: "w-4 h-4 text-emerald-500" }), f
            ))
          ),
          React.createElement("button", { 
            className: `w-full py-4 rounded-xl font-bold text-sm tracking-wide transition-all ${tier.accent ? 'bg-white text-black hover:bg-slate-200' : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'}`
          }, tier.accent ? "Initialize Nexus Account" : "Select Node Tier")
        )
      )
    )
  );
};

const DocsView = () => {
  return React.createElement(motion.div, {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    className: "pt-24 flex flex-col md:flex-row min-h-screen max-w-7xl mx-auto"
  },
    React.createElement("aside", { className: "w-full md:w-64 border-r border-white/5 p-8 space-y-8 overflow-y-auto" },
      React.createElement("div", null,
        React.createElement("h4", { className: "text-xs font-bold text-slate-500 uppercase tracking-widest mb-4" }, "Documentation Core"),
        React.createElement("div", { className: "space-y-2 text-sm font-medium" },
          ["Quick Start", "Architecture Matrix", "Node Configuration", "CLI Binary"].map((l, i) => 
            React.createElement("div", { key: i, className: `cursor-pointer ${i === 0 ? 'text-primary font-bold' : 'text-slate-400 hover:text-white'}` }, l)
          )
        )
      ),
      React.createElement("div", null,
        React.createElement("h4", { className: "text-xs font-bold text-slate-500 uppercase tracking-widest mb-4" }, "API Protocol"),
        React.createElement("div", { className: "space-y-2 text-sm font-medium text-slate-400" },
          ["Authentication", "Dynamic Payloads", "Error Handling", "Rate Limits"].map((l, i) => 
            React.createElement("div", { key: i, className: "hover:text-white cursor-pointer" }, l)
          )
        )
      )
    ),
    React.createElement("main", { className: "flex-1 p-8 md:p-16" },
      React.createElement("h1", { className: "text-4xl font-extrabold text-white mb-6" }, "Getting Started with Next-Vibe"),
      React.createElement("p", { className: "text-slate-400 mb-8 text-lg leading-relaxed" }, "The GS Prompt Hero framework facilitates hyper-distributed orchestration logic without requiring local binary hooks. Initialize standard compute endpoints below."),
      React.createElement("div", { className: "bg-black/80 rounded-2xl p-6 border border-white/10 font-mono text-sm shadow-2xl" },
        React.createElement("div", { className: "flex items-center gap-2 mb-4" },
          React.createElement("div", { className: "w-3 h-3 rounded-full bg-red-500" }),
          React.createElement("div", { className: "w-3 h-3 rounded-full bg-yellow-500" }),
          React.createElement("div", { className: "w-3 h-3 rounded-full bg-green-500" })
        ),
        React.createElement("div", { className: "text-emerald-400" }, "$ npx install -g gsprompthero"),
        React.createElement("div", { className: "text-slate-500 mt-2" }, "> Resolving secure channel connections..."),
        React.createElement("div", { className: "text-white mt-2" }, "✅ System Scanned: 100% Operational ready."),
        React.createElement("div", { className: "text-emerald-400 mt-2" }, "$ hero deploy --matrix")
      ),
      React.createElement("div", { className: "mt-12 p-6 bg-indigo-900/20 border border-indigo-500/20 rounded-2xl flex gap-4 items-start" },
        React.createElement(Terminal, { className: "w-6 h-6 text-indigo-400 flex-shrink-0 mt-1" }),
        React.createElement("div", null,
          React.createElement("h4", { className: "font-bold text-white mb-1" }, "Direct Injection Active"),
          React.createElement("p", { className: "text-slate-400 text-sm" }, "Local telemetry tracks zero latent nodes during initialization. Monitor dashboard for instant relay diagnostics.")
        )
      )
    )
  );
};


/* --- COMPONENT BUNDLE: ToolMatrix.js --- */



// Unified Tool Matrix Registry Derived From Legacy Stack
const AI_TOOLS_REGISTRY = [
  { id: "paraphraser", name: "Paraphraser", desc: "Rewrite sentences for fresh, original phrasing.", icon: Repeat, cat: "Writing" },
  { id: "grammar-checker", name: "Grammar Checker", desc: "Identify and fix syntax issues instantly.", icon: CheckCircle, cat: "Editing" },
  { id: "ai-humanizer", name: "AI Humanizer", desc: "Transform robotic text into natural content.", icon: User, cat: "Writing" },
  { id: "summarizer", name: "Summarizer", desc: "Distill articles and posts in seconds.", icon: FileText, cat: "Writing" },
  { id: "content-detector", name: "AI Detector", desc: "Detect if text was written by AI or human.", icon: Shield, cat: "Editing" },
  { id: "email-writer", name: "AI Email Writer", desc: "Craft professional emails tailored to tone.", icon: Mail, cat: "Marketing" },
  { id: "essay-writer", name: "Essay Writer", desc: "Produce well-structured academic essays.", icon: Edit, cat: "Writing" },
  { id: "blog-writer", name: "AI Blog Writer", desc: "Generate full blog posts automatically.", icon: BookOpen, cat: "Writing" },
  { id: "cover-letter", name: "Cover Letter", desc: "Write tailored job application letters.", icon: Briefcase, cat: "Business" },
  { id: "job-description", name: "Job Description", desc: "Generate complete role-specific docs.", icon: Briefcase, cat: "Business" },
  { id: "linkedin-bio", name: "LinkedIn Bio", desc: "Craft a standout professional summary.", icon: Briefcase, cat: "Business" },
  { id: "bio-generator", name: "Bio Generator", desc: "Create professional short bios quickly.", icon: User, cat: "Business" },
  { id: "story-generator", name: "Story Generator", desc: "Generate imaginative story plots.", icon: Sparkles, cat: "Creative" },
  { id: "poem-generator", name: "Poem Generator", desc: "Create beautiful poems in any style.", icon: Sparkles, cat: "Creative" },
  { id: "speech-writer", name: "Speech Writer", desc: "Write powerful speeches for any occasion.", icon: MessageSquare, cat: "Writing" },
  { id: "meta-description", name: "Meta Description", desc: "Create SEO-friendly descriptions.", icon: Globe, cat: "SEO" },
  { id: "headline-generator", name: "Headline Gen", desc: "Generate high-converting headlines.", icon: Type, cat: "SEO" },
  { id: "plagiarism-checker", name: "Plagiarism Check", desc: "Scan content for originality scoring.", icon: CheckSquare, cat: "Editing" },
  { id: "rewriter", name: "Sentence Rewriter", desc: "Rephrase any sentence dynamically.", icon: Repeat, cat: "Editing" },
  { id: "caption-writer", name: "AI Caption Writer", desc: "Generate scroll-stopping captions.", icon: MessageSquare, cat: "Social" },
  { id: "ad-copy", name: "Ad Copy Writer", desc: "Generate high-converting ad copies.", icon: Sparkles, cat: "Marketing" },
  { id: "product-description", name: "Product Desc", desc: "Write persuasive sales narratives.", icon: Copy, cat: "Marketing" },
  { id: "cold-email", name: "Cold Email Gen", desc: "Write personalized outreach emails.", icon: Mail, cat: "Social" },
  { id: "translation", name: "AI Translator", desc: "Translate text across 50+ languages.", icon: Globe, cat: "Writing" }
];

const CATEGORIES = ["All Tools", "Writing", "Editing", "Creative", "Marketing", "Business", "SEO", "Social"];

const ToolsDirectoryView = ({ onSelectTool }) => {
  const [activeCat, setActiveCat] = useState("All Tools");

  const filteredTools = activeCat === "All Tools" 
    ? AI_TOOLS_REGISTRY 
    : AI_TOOLS_REGISTRY.filter(t => t.cat === activeCat);

  return React.createElement(motion.div, {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    className: "pt-28 pb-20 px-6 max-w-7xl mx-auto"
  },
    React.createElement("div", { className: "text-center mb-16" },
      React.createElement("div", { className: "inline-flex items-center gap-2 px-3 py-1.5 mb-6 border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-xl rounded-full text-xs font-bold text-emerald-400 uppercase tracking-widest" }, 
        React.createElement(Sparkles, { className: "w-3 h-3" }), "All-in-One Assistant Platform"
      ),
      React.createElement("h2", { className: "text-5xl font-extrabold text-white tracking-tight mb-4" }, "Discover Our AI Tools"),
      React.createElement("p", { className: "text-slate-400 max-w-2xl mx-auto text-lg" }, "Explore our comprehensive suite of specialized engines designed to enhance production velocity.")
    ),

    /* Category Filter Grid - EXACT REPLICATION OF CLONE BEHAVIOR but modern */
    React.createElement("div", { className: "flex gap-3 mb-12 overflow-x-auto pb-4 scrollbar-hide justify-center" },
      CATEGORIES.map(c => React.createElement("button", {
        key: c,
        onClick: () => setActiveCat(c),
        className: `px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap border transition-all ${activeCat === c ? 'bg-primary border-primary text-white shadow-lg shadow-indigo-500/20' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'}`
      }, c))
    ),

    React.createElement(motion.div, { 
      layout: true,
      className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" 
    },
      filteredTools.map((tool, idx) => 
        React.createElement(motion.div, {
          layout: true,
          key: tool.id,
          initial: { opacity: 0, scale: 0.9 },
          animate: { opacity: 1, scale: 1 },
          whileHover: { y: -5, scale: 1.02 },
          className: "glass p-6 rounded-2xl cursor-pointer hover:border-primary/40 group relative overflow-hidden transition-all duration-300",
          onClick: () => onSelectTool(tool.id)
        },
          React.createElement("div", { className: "absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity" },
            React.createElement(tool.icon || Sparkles, { className: "w-16 h-16 text-primary" })
          ),
          React.createElement("div", { className: "w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white text-primary transition-colors" },
            React.createElement(tool.icon || Sparkles, { className: "w-5 h-5" })
          ),
          React.createElement("h3", { className: "text-lg font-bold text-white mb-2" }, tool.name),
          React.createElement("p", { className: "text-xs text-slate-500 leading-relaxed mb-4 line-clamp-2" }, tool.desc),
          React.createElement("div", { className: "flex items-center text-xs text-primary font-bold opacity-0 group-hover:opacity-100 transition-opacity" }, 
            "Initialize Node ", React.createElement(ArrowRight, { className: "w-3 h-3 ml-1" })
          )
        )
      )
    )
  );
};

const SingleToolWorkspace = ({ toolId, onBack }) => {
  const tool = AI_TOOLS_REGISTRY.find(t => t.id === toolId) || AI_TOOLS_REGISTRY[0];
  const { role } = useAuth();
  
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const executeTool = async () => {
    if (role === 'guest') {
        setError("Unauthorized Instance. Escalated privileges required.");
        return;
    }
    if (!inputText.trim()) return;

    setLoading(true);
    setError("");
    setOutputText("");

    try {
        const res = await fetch("/api/ai", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                tool: tool.id, 
                prompt: `Task: ${tool.name}. Input: ${inputText}. Response context: Professional, highly refined, ready for utilization.`
            })
        });
        const data = await res.json();
        if (data.success) setOutputText(data.result);
        else setError(data.error || "Neural handshake failure.");
    } catch(e) {
        setError("API Endpoint Offline.");
    } finally {
        setLoading(false);
    }
  };

  return React.createElement(motion.div, {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    className: "pt-24 min-h-screen max-w-7xl mx-auto px-6 pb-20"
  },
    /* Breadcrumb & Header */
    React.createElement("div", { className: "mb-8 flex flex-col items-start" },
      React.createElement("button", { onClick: onBack, className: "text-slate-500 hover:text-white flex items-center gap-2 text-sm font-medium mb-4" },
        React.createElement(ArrowRight, { className: "w-4 h-4 rotate-180" }), " Return to Vector Index"
      ),
      React.createElement("div", { className: "flex items-center gap-4" },
        React.createElement("div", { className: "w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center text-primary" },
            React.createElement(tool.icon || Sparkles, { className: "w-7 h-7" })
        ),
        React.createElement("div", null,
            React.createElement("h1", { className: "text-3xl font-extrabold text-white" }, tool.name),
            React.createElement("p", { className: "text-slate-400" }, tool.desc)
        )
      )
    ),

    /* Unified Interface Block */
    React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-300px)] min-h-[500px]" },
        /* Input Terminal */
        React.createElement("div", { className: "glass rounded-3xl flex flex-col p-6" },
            React.createElement("div", { className: "flex justify-between items-center mb-4" },
                React.createElement("div", { className: "text-xs font-bold tracking-widest text-slate-500 uppercase" }, "Source Stream"),
                React.createElement("div", { className: "text-[10px] font-mono text-slate-600" }, `${inputText.length} Characters`)
            ),
            React.createElement("textarea", {
                value: inputText,
                onChange: (e) => setInputText(e.target.value),
                placeholder: `Provide source content to feed into the ${tool.name} matrix...`,
                className: "flex-1 bg-black/20 rounded-2xl p-6 text-slate-300 font-medium resize-none focus:outline-none border border-white/5 focus:border-primary/30 transition-colors"
            }),
            React.createElement(motion.button, {
                whileTap: { scale: 0.98 },
                disabled: loading || !inputText.trim(),
                onClick: executeTool,
                className: "mt-4 py-4 bg-primary text-white font-bold rounded-xl flex items-center justify-center gap-2 disabled:opacity-40 shadow-[0_0_20px_rgba(99,102,241,0.2)] hover:brightness-110 transition-all"
            },
                loading ? React.createElement(Loader2, { className: "w-5 h-5 animate-spin" }) : React.createElement(Play, { className: "w-4 h-4 fill-current" }),
                `Initialize ${tool.name.split(' ')[0]}`
            ),
            error && React.createElement("div", { className: "mt-4 text-xs text-red-400 bg-red-900/20 border border-red-900/50 p-3 rounded-xl text-center" }, error)
        ),

        /* Output Projection */
        React.createElement("div", { className: "glass rounded-3xl flex flex-col p-6 bg-white/5 border-indigo-500/10" },
            React.createElement("div", { className: "flex justify-between items-center mb-4" },
                React.createElement("div", { className: "text-xs font-bold tracking-widest text-emerald-500 uppercase" }, "Rendered Logic"),
                outputText && React.createElement("button", { 
                    onClick: () => navigator.clipboard.writeText(outputText),
                    className: "text-[10px] bg-white/10 px-2 py-1 rounded hover:bg-white/20 text-white transition-all" 
                }, "Capture Clone")
            ),
            React.createElement("div", { className: "flex-1 bg-black/40 rounded-2xl p-6 font-medium overflow-y-auto text-slate-200 relative leading-relaxed" },
                loading ? React.createElement("div", { className: "absolute inset-0 flex flex-col items-center justify-center text-primary/60 gap-3" },
                    React.createElement(Loader2, { className: "w-8 h-8 animate-spin" }),
                    React.createElement("span", { className: "text-sm font-bold tracking-widest animate-pulse" }, "EXECUTING INFERENCE...")
                ) : outputText ? React.createElement("div", { className: "whitespace-pre-wrap selection:bg-emerald-500/30" }, outputText) : React.createElement("div", { className: "absolute inset-0 flex items-center justify-center text-slate-700 italic text-sm select-none" }, "Awaiting input vector to resolve matrix output...")
            )
        )
    )
  );
};


/* --- COMPONENT BUNDLE: DesignCodeView.js --- */



// -------------------------------------------------------------------
// 1. Background Canvas Simulator (The Famous Animated Spline/Mesh Look)
// -------------------------------------------------------------------
const DesignCodeBg = () => {
  return React.createElement("div", { className: "fixed inset-0 -z-10 overflow-hidden bg-[#1F1F47]" },
    // Base dynamic noise/mesh pattern
    React.createElement("div", { 
      className: "absolute inset-0 opacity-40 mix-blend-soft-light",
      style: { backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }
    }),
    // Animated Floating Gradient Orbs
    React.createElement(motion.div, {
      animate: { x: [0, 100, 0], y: [0, 50, 0], scale: [1, 1.2, 1] },
      transition: { duration: 20, repeat: Infinity, ease: "easeInOut" },
      className: "absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-[#FF4ECD] to-[#F9CB28] opacity-30 blur-[120px]"
    }),
    React.createElement(motion.div, {
      animate: { x: [0, -100, 0], y: [0, -50, 0], scale: [1, 1.1, 1] },
      transition: { duration: 25, repeat: Infinity, ease: "easeInOut" },
      className: "absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-br from-[#007CF0] to-[#00DFD8] opacity-30 blur-[120px]"
    }),
    React.createElement("div", { className: "absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(31,31,71,0.8)_100%)]" })
  );
};

// -------------------------------------------------------------------
// 2. Master Clone Section Components
// -------------------------------------------------------------------

const HeroSectionV2 = ({ onGetStarted }) => {
  return React.createElement("section", { className: "relative pt-32 pb-20 px-6 overflow-hidden flex flex-col lg:flex-row items-center gap-12 max-w-7xl mx-auto" },
    /* Content Layer */
    React.createElement(motion.div, {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.8 },
      className: "flex-1 text-center lg:text-left z-10"
    },
      React.createElement("h1", { className: "text-5xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6" },
        "Design and ", React.createElement("br"),
        React.createElement("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-[#00c6ff] to-[#0072ff]" }, "Code AI Apps")
      ),
      React.createElement("p", { className: "text-lg md:text-xl text-slate-300/80 max-w-lg mx-auto lg:mx-0 leading-relaxed mb-10" },
        "Don’t skip design. Build enterprise-grade systems utilizing highly scalable dynamic AI vectors and specialized neural processing."
      ),
      React.createElement("div", { className: "flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start" },
        React.createElement(motion.button, {
          whileHover: { scale: 1.05, y: -2 },
          whileTap: { scale: 0.95 },
          onClick: onGetStarted,
          className: "group px-8 py-4 rounded-full bg-gradient-to-r from-[#E323FF] to-[#7517F8] text-white font-bold text-lg shadow-[0_20px_40px_rgba(117,23,248,0.3)] flex items-center gap-2 relative overflow-hidden"
        },
          React.createElement("div", { className: "absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" }),
          "Get Pro Access", React.createElement(ArrowRight, { className: "w-5 h-5 group-hover:translate-x-1 transition-transform" })
        ),
        React.createElement("div", { className: "text-slate-400 font-medium text-sm" }, 
          React.createElement("div", { className: "text-white font-bold text-base" }, "$19 per month"),
          "Includes 24+ AI Engines"
        )
      )
    ),

    /* 3D Stack Representation Layer */
    React.createElement("div", { className: "flex-1 relative h-[500px] w-full max-w-lg perspective-[1000px]" },
      // Floating Card 1 (Deep)
      React.createElement(motion.div, {
        animate: { rotateY: [0, 5, 0], rotateX: [0, 5, 0], y: [0, -10, 0] },
        transition: { repeat: Infinity, duration: 5, ease: "easeInOut" },
        className: "absolute top-20 left-10 w-[320px] aspect-[4/3] bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl p-6 origin-top-left z-0"
      },
        React.createElement("div", { className: "w-12 h-12 rounded-xl bg-[#007CF0]/20 flex items-center justify-center text-[#007CF0] mb-4" }, React.createElement(Code, { className: "w-6 h-6" })),
        React.createElement("div", { className: "h-4 w-24 bg-white/20 rounded mb-2" }),
        React.createElement("div", { className: "h-3 w-full bg-white/10 rounded mb-2" }),
        React.createElement("div", { className: "h-3 w-4/5 bg-white/10 rounded" })
      ),
      // Floating Card 2 (Front Glass)
      React.createElement(motion.div, {
        initial: { scale: 0.8, opacity: 0 },
        animate: { scale: 1, opacity: 1, rotateY: [0, -5, 0], y: [0, 10, 0] },
        transition: { duration: 1, delay: 0.5, y: { repeat: Infinity, duration: 6, ease: "easeInOut" } },
        className: "absolute top-32 right-10 w-[340px] aspect-[3/4] bg-gradient-to-b from-white/20 to-white/5 backdrop-blur-3xl rounded-3xl border border-white/20 shadow-[0_30px_60px_rgba(0,0,0,0.5)] p-8 z-20 overflow-hidden"
      },
        React.createElement("div", { className: "absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-[#00C6FF] via-[#0072FF] to-[#E323FF]" }),
        React.createElement("div", { className: "w-16 h-16 rounded-2xl bg-[#E323FF] shadow-[0_0_30px_rgba(227,35,255,0.5)] flex items-center justify-center mb-8 text-white" }, React.createElement(Sparkles, { className: "w-8 h-8" })),
        React.createElement("h3", { className: "text-2xl font-bold text-white mb-4" }, "Neural Render"),
        React.createElement("p", { className: "text-sm text-slate-300 leading-relaxed mb-8" }, "Deploy high-density computational architectures optimized for next-gen fluid interactions."),
        React.createElement("div", { className: "flex items-center gap-2 mt-auto" },
          React.createElement("div", { className: "w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-red-500 border-2 border-white/20" }),
          React.createElement("div", { className: "text-xs text-white font-medium" }, "Authored by System Core")
        )
      ),
      // Glowing Floating Ring (Simulation)
      React.createElement(motion.div, {
        animate: { rotate: 360 },
        transition: { repeat: Infinity, duration: 40, ease: "linear" },
        className: "absolute top-[15%] left-[15%] w-[400px] h-[400px] border-2 border-dashed border-white/10 rounded-full z-10"
      })
    )
  );
};

// -------------------------------------------------------------------
// 3. Staggered Dynamic Feature Grid (Dynamic Replica)
// -------------------------------------------------------------------
const FEATURES = [
  { title: "Core Infrastructure", items: "12 Projects", color: "from-[#FF4ECD] to-[#FF72E1]", icon: Database },
  { title: "React Integration", items: "24 Components", color: "from-[#007CF0] to-[#00DFD8]", icon: Code },
  { title: "Visual Aesthetics", items: "30+ UI Kits", color: "from-[#7928CA] to-[#FF0080]", icon: Layers },
  { title: "Secure Sandbox", items: "Edge Compute", color: "from-[#FF4B2B] to-[#FF416C]", icon: Shield }
];

const CourseGrid = () => {
  return React.createElement("section", { className: "py-20 px-6 max-w-7xl mx-auto" },
    React.createElement("div", { className: "text-center lg:text-left mb-16" },
      React.createElement("h2", { className: "text-4xl font-bold text-white mb-4 tracking-tight" }, "Comprehensive Track Vector"),
      React.createElement("p", { className: "text-slate-400 max-w-xl" }, "Follow curated structured pathways to master the art of autonomous ecosystem integration.")
    ),
    React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" },
      FEATURES.map((f, i) => 
        React.createElement(motion.div, {
          key: i,
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.1 },
          whileHover: { y: -8, scale: 1.02 },
          className: "group relative rounded-[32px] p-1 overflow-hidden"
        },
          React.createElement("div", { className: `absolute inset-0 bg-gradient-to-br ${f.color} opacity-40 blur-xl group-hover:opacity-70 transition-opacity` }),
          React.createElement("div", { className: "relative bg-[#24244D]/90 backdrop-blur-xl rounded-[30px] p-8 h-full border border-white/10 flex flex-col" },
             React.createElement("div", { className: `w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-white mb-8 shadow-lg shadow-black/20` }, 
                React.createElement(f.icon, { className: "w-7 h-7" })
             ),
             React.createElement("h3", { className: "text-xl font-bold text-white mb-2" }, f.title),
             React.createElement("p", { className: "text-sm text-slate-400" }, f.items),
             React.createElement("div", { className: "mt-auto pt-8" },
                React.createElement("button", { className: "flex items-center gap-2 text-xs font-bold text-white/50 group-hover:text-white transition-colors" },
                   "OPEN NODE", React.createElement(ArrowRight, { className: "w-3 h-3 group-hover:translate-x-1 transition-transform" })
                )
             )
          )
        )
      )
    )
  );
};

// -------------------------------------------------------------------
// 4. Tech Vector Sliding Loop (Infinite Marquee)
// -------------------------------------------------------------------
const MarqueeStrip = () => {
  return React.createElement("div", { className: "w-full py-10 bg-white/5 backdrop-blur-md border-y border-white/5 overflow-hidden relative" },
    React.createElement(motion.div, {
      animate: { x: ["0%", "-50%"] },
      transition: { duration: 30, repeat: Infinity, ease: "linear" },
      className: "flex items-center gap-16 whitespace-nowrap w-[200%]"
    },
      [...Array(2)].map((_, i) => React.createElement(React.Fragment, { key: i },
        [
          { name: "React", icon: Code },
          { name: "Node.js", icon: Terminal },
          { name: "Figma", icon: Layers },
          { name: "Spline", icon: Globe },
          { name: "SwiftUI", icon: Cpu },
          { name: "Vercel", icon: Zap }
        ].map((tech, idx) => 
          React.createElement("div", { key: idx, className: "flex items-center gap-3 text-white/40 font-bold tracking-wider text-xl select-none" },
             React.createElement(tech.icon, { className: "w-6 h-6 opacity-50" }),
             tech.name.toUpperCase()
          )
        )
      ))
    )
  );
};

// -------------------------------------------------------------------
// 5. Consolidated "DesignCode-Style" View Assembly
// -------------------------------------------------------------------
const DesignCodeMasterView = ({ onAction }) => {
  return React.createElement(React.Fragment, null,
    React.createElement(DesignCodeBg),
    React.createElement("div", { className: "relative min-h-screen overflow-hidden" },
      React.createElement(HeroSectionV2, { onGetStarted: onAction }),
      React.createElement(MarqueeStrip),
      React.createElement(CourseGrid),
      // Static Footer Hook
      React.createElement("section", { className: "py-20 text-center" },
        React.createElement("div", { className: "glass max-w-3xl mx-auto rounded-[40px] p-12 border-white/10 bg-gradient-to-b from-white/10 to-transparent relative overflow-hidden" },
           React.createElement("h3", { className: "text-3xl font-bold text-white mb-4" }, "Join 100k+ developers"),
           React.createElement("p", { className: "text-slate-400 mb-8" }, "Gain immediate entry to high-density curriculum channels and asset repos."),
           React.createElement("button", { onClick: onAction, className: "px-10 py-4 rounded-full bg-white text-[#1F1F47] font-extrabold shadow-2xl hover:bg-slate-100 transition-all" }, "Initialize Instance")
        )
      )
    )
  );
};


/* --- COMPONENT BUNDLE: page.js --- */







function App() {
  const [currentRoute, setCurrentRoute] = useState("home");
  const [activeToolId, setActiveToolId] = useState(null);

  const navigateToTool = (toolId) => {
    setActiveToolId(toolId);
    setCurrentRoute("single-tool");
  };

  // Centralized Router Matrix
  const renderContent = () => {
    switch(currentRoute) {
      case "solutions":
        return React.createElement(SolutionsView);
      case "pricing":
        return React.createElement(PricingView);
      case "docs":
        return React.createElement(DocsView);
      case "tools":
        return React.createElement(ToolsDirectoryView, { onSelectTool: navigateToTool });
      case "single-tool":
        return React.createElement(SingleToolWorkspace, { toolId: activeToolId, onBack: () => setCurrentRoute("tools") });
      case "workflows":
        return React.createElement("div", { className: "pt-20 bg-[#0c0c0e] min-h-screen" }, React.createElement(WorkflowPlayground));
      default:
        return React.createElement(DesignCodeMasterView, { onAction: () => setCurrentRoute("tools") });
    }
  };

  return React.createElement(AuthManager, null,
    React.createElement("main", { className: "min-h-screen w-full bg-background text-foreground overflow-x-hidden flex flex-col" },
      React.createElement(RoleSwitcher),

      React.createElement("nav", { className: "fixed top-0 inset-x-0 z-50 h-16 glass border-b border-white/5 flex items-center justify-between px-6 md:px-12" },
        React.createElement("div", { 
          className: "flex items-center gap-3 font-heading font-bold text-xl tracking-tight text-white cursor-pointer",
          onClick: () => { setCurrentRoute("home"); setActiveToolId(null); }
        },
          React.createElement("img", { 
            src: "https://www.gsgroups.net/gslogo.png", 
            alt: "Logo", 
            className: "h-8 w-auto object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]" 
          }),
          React.createElement("span", { className: "tracking-widest font-extrabold" }, "GUIDESOFT")
        ),
        React.createElement("div", { className: "hidden md:flex items-center gap-8 text-sm text-slate-400 font-medium" },
          [
            { id: "home", label: "Home" },
            { id: "tools", label: "AI Tools" },
            { id: "solutions", label: "Solutions" },
            { id: "docs", label: "Docs" },
            { id: "pricing", label: "Pricing" }
          ].map(item => React.createElement("button", {
            key: item.id,
            onClick: () => { setCurrentRoute(item.id); setActiveToolId(null); },
            className: `transition-all ${currentRoute === item.id ? 'text-white font-bold' : 'hover:text-white'}`
          }, item.label))
        ),
        React.createElement("div", { className: "flex items-center gap-4" },
          React.createElement("button", { 
             onClick: () => setCurrentRoute("tools"),
             className: "px-4 py-2 bg-white text-black text-sm font-bold rounded-lg hover:bg-slate-200 transition-all" 
          }, "Launch Node Matrix")
        )
      ),

      /* Dynamic Routed Content Ingress */
      React.createElement("div", { className: "flex-1" }, renderContent()),

      React.createElement("footer", { className: "py-12 border-t border-white/5 glass text-center text-slate-500 text-xs mt-auto" },
        React.createElement("div", null, "© 2026 GS Prompt Hero AI. All access reserved.")
      )
    )
  );
}


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
