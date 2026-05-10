import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Zap, Shield, Globe, Terminal, Key, Sparkles } from "lucide-react";

export const SolutionsView = () => {
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

export const PricingView = () => {
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

export const DocsView = () => {
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
