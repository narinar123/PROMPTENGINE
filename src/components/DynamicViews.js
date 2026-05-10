import React, { useState, useLayoutEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { CheckCircle2, Zap, Shield, Globe, Terminal, Key, Sparkles, Cpu, FileText, BookOpen, CreditCard, X, Smartphone, QrCode, Loader2 } from "lucide-react";

const PaymentModal = ({ isOpen, onClose, plan }) => {
  const [loading, setLoading] = useState(false);
  const [payData, setPayData] = useState(null);

  React.useEffect(() => {
    if (isOpen && plan) {
      setLoading(true);
      // Fetch from dynamic backend
      fetch('/api/pay', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ 
             amount: plan.priceNum, 
             plan: plan.name, 
             userEmail: "user@gsprompthero.com", 
             userName: "Demo Client" 
         })
      })
      .then(r => r.json())
      .then(data => {
         setPayData(data);
         setLoading(false);
      })
      .catch(e => {
         console.error(e);
         setLoading(false);
      });
    } else {
      setPayData(null);
    }
  }, [isOpen, plan]);

  return React.createElement(AnimatePresence, null, 
    isOpen && React.createElement(motion.div, {
      initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 },
      className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl px-4"
    }, 
      React.createElement(motion.div, {
        initial: { scale: 0.9, y: 20, opacity: 0 },
        animate: { scale: 1, y: 0, opacity: 1 },
        exit: { scale: 0.9, y: 20, opacity: 0 },
        className: "w-full max-w-md bg-[#0D111A] border border-white/10 rounded-[32px] overflow-hidden relative shadow-[0_32px_100px_rgba(0,0,0,0.7)]"
      },
         React.createElement("button", { onClick: onClose, className: "absolute top-6 right-6 text-slate-400 hover:text-white transition-colors bg-white/5 p-2 rounded-full" }, React.createElement(X, { className: "w-5 h-5" })),
         
         React.createElement("div", { className: "p-8" },
            React.createElement("div", { className: "flex items-center gap-3 mb-6" },
               React.createElement("div", { className: "p-3 bg-primary/10 rounded-2xl text-primary" }, React.createElement(CreditCard, { className: "w-6 h-6" })),
               React.createElement("h3", { className: "text-xl font-black text-white" }, "Payment Gateway")
            ),
            
            React.createElement("div", { className: "bg-white/5 rounded-2xl p-5 mb-8 border border-white/5 flex justify-between items-center" }, 
              React.createElement("div", null, 
                React.createElement("p", { className: "text-slate-400 text-xs font-bold uppercase tracking-wider" }, plan?.name || "Plan"),
                React.createElement("p", { className: "text-white text-sm font-medium mt-1" }, "Standard Deployment License")
              ),
              React.createElement("p", { className: "text-3xl font-black text-white" }, plan?.price)
            ),

            loading ? (
              React.createElement("div", { className: "flex flex-col items-center justify-center py-12" },
                React.createElement(Loader2, { className: "w-8 h-8 text-primary animate-spin mb-4" }),
                React.createElement("span", { className: "text-slate-400 font-medium" }, "Initializing Universal Payment Interface...")
              )
            ) : payData && (
              React.createElement("div", { className: "space-y-6 text-center" },
                 React.createElement("div", { className: "relative inline-block bg-white p-4 rounded-3xl shadow-2xl" },
                   React.createElement("img", { 
                      src: `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(payData.upiLink)}`,
                      alt: "Payment QR",
                      className: "w-44 h-44 block"
                   }),
                   React.createElement("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0D111A] p-1.5 rounded-lg shadow-lg" },
                      React.createElement(Smartphone, { className: "w-6 h-6 text-emerald-400" })
                   )
                 ),
                 
                 React.createElement("p", { className: "text-slate-400 text-xs font-medium px-6" }, "Scan QR using ANY UPI app (GPay, PhonePe, Paytm) to complete transaction instantaneously."),

                 React.createElement("div", { className: "grid grid-cols-1 gap-3 pt-4" },
                   React.createElement("a", { 
                     href: payData.upiLink,
                     className: "w-full py-4 rounded-2xl bg-white text-black font-bold text-sm flex items-center justify-center gap-3 shadow-xl hover:scale-[1.02] transition-all"
                   }, React.createElement(Smartphone, { className: "w-5 h-5" }), "Pay via Apps (Mobile)"),
                   
                   React.createElement("a", { 
                     href: payData.gpayLink,
                     className: "w-full py-4 rounded-2xl bg-[#1E2330] border border-white/10 text-white font-bold text-sm flex items-center justify-center gap-3 hover:bg-white/5 transition-all"
                   }, "⚡ Launch Direct GPay")
                 ),
                 
                 React.createElement("div", { className: "flex items-center justify-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2" },
                   React.createElement(Shield, { className: "w-3 h-3 text-emerald-500" }), "End-to-End Encrypted Infrastructure"
                 )
              )
            )
         )
      )
    )
  );
};

export const SolutionsView = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
     const ctx = gsap.context(() => {
        gsap.fromTo(".sol-header > *", 
          { opacity: 0, y: 30 }, 
          { opacity: 1, y: 0, stagger: 0.15, ease: "power3.out", duration: 0.8 }
        );
        gsap.fromTo(".sol-card", 
          { opacity: 0, y: 40, scale: 0.95 }, 
          { opacity: 1, y: 0, scale: 1, stagger: 0.1, ease: "power3.out", duration: 0.7, delay: 0.2 }
        );
     }, containerRef);
     return () => ctx.revert();
  }, []);

  return React.createElement("div", {
    ref: containerRef,
    className: "pt-32 pb-20 px-6 max-w-7xl mx-auto"
  },
    React.createElement("div", { className: "sol-header text-center mb-16" },
      React.createElement("h2", { className: "text-6xl font-black text-white mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400" }, "Enterprise Vectors"),
      React.createElement("p", { className: "text-slate-400 max-w-2xl mx-auto text-xl font-light leading-relaxed" }, "Next-generation neural pathways configured for hyper-velocity execution and architectural optimization.")
    ),
    React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8" },
      [
        { title: "Generative Core", desc: "Deploy and orchestrate massive language models instantly across internal secure pipelines.", icon: Sparkles },
        { title: "Nexus Security", desc: "Military-grade compliance ensuring dynamic context windows stay private and localized.", icon: Shield },
        { title: "Flow Integration", desc: "Hook directly into distributed cloud nodes via direct-compute rest endpoints.", icon: Zap },
        { title: "Edge Velocity", desc: "Distribute inference workflows globally at under 50ms worldwide replication latency.", icon: Globe }
      ].map((solution, idx) => 
        React.createElement("div", { key: idx, className: "sol-card glass-card p-10 rounded-[32px] group border border-white/5 hover:bg-white/[0.03] hover:border-primary/30 hover:-translate-y-1.5 shadow-xl transition-all duration-500 cursor-pointer relative overflow-hidden" },
          React.createElement("div", { className: "absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 group-hover:rotate-12 transition-all duration-500" },
             React.createElement(solution.icon, { className: "w-24 h-24 text-primary" })
          ),
          React.createElement("div", { className: "flex items-center gap-5 mb-6 relative z-10" },
            React.createElement("div", { className: "w-14 h-14 bg-gradient-to-br from-primary to-indigo-600 rounded-2xl text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] flex items-center justify-center group-hover:scale-110 transition-transform duration-500" }, 
              React.createElement(solution.icon, { className: "w-7 h-7" })
            ),
            React.createElement("h3", { className: "text-2xl font-black text-white tracking-tight" }, solution.title)
          ),
          React.createElement("p", { className: "text-slate-400 leading-relaxed text-lg font-medium relative z-10" }, solution.desc),
          React.createElement("div", { className: "mt-10 h-1.5 w-full bg-white/5 rounded-full overflow-hidden relative z-10 shadow-inner" },
            React.createElement(motion.div, {
              initial: { width: 0 },
              animate: { width: '100%' },
              transition: { duration: 2.5, delay: 1 + idx * 0.2, ease: "easeInOut" },
              className: "h-full bg-gradient-to-r from-primary via-indigo-500 to-emerald-500"
            })
          )
        )
      )
    )
  );
};

export const PricingView = () => {
  const containerRef = useRef(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useLayoutEffect(() => {
     const ctx = gsap.context(() => {
        gsap.fromTo(".pricing-card", 
          { opacity: 0, y: 50 }, 
          { opacity: 1, y: 0, stagger: 0.15, ease: "back.out(1.2)", duration: 0.8 }
        );
     }, containerRef);
     return () => ctx.revert();
  }, []);

  const plans = [
    { name: "Operator Lite", price: "Free", priceNum: 0, desc: "For standard inference tests.", features: ["100 Operations / Day", "Standard Model Access", "Community Support"], accent: false },
    { name: "Executive Nexus", price: "$49", priceNum: 49, desc: "High capacity acceleration.", features: ["Unlimited Parallel Flows", "Advanced Multi-Agent API", "Priority Core Compute", "Custom Prompts"], accent: true },
    { name: "Monolith Core", price: "$199", priceNum: 199, desc: "For heavy institutional grids.", features: ["Dedicated GPU Farm", "SOC-2 Hardened Compliance", "Dedicated 24/7 Engineer Team"], accent: false }
  ];

  return React.createElement("div", {
    ref: containerRef,
    className: "pt-32 pb-24 px-6 max-w-6xl mx-auto relative"
  },
    React.createElement(PaymentModal, { 
      isOpen: !!selectedPlan, 
      onClose: () => setSelectedPlan(null), 
      plan: selectedPlan 
    }),

    React.createElement("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" }),
    
    React.createElement("div", { className: "text-center mb-20 relative z-10" },
      React.createElement("h2", { className: "text-6xl font-black text-white mb-6 tracking-tight" }, "Select Allocation Tier"),
      React.createElement("p", { className: "text-slate-400 text-lg font-medium max-w-lg mx-auto" }, "Discover the configuration perfectly synthesized for your enterprise ecosystem velocity.")
    ),
    React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch relative z-10" },
      plans.map((tier, idx) => 
        React.createElement("div", { 
          key: idx, 
          className: `pricing-card rounded-[32px] p-10 flex flex-col transition-all duration-500 relative overflow-hidden ${tier.accent ? 'bg-[#0D111C] border-2 border-primary shadow-[0_20px_50px_rgba(99,102,241,0.2)] z-10 scale-105' : 'glass-card border border-white/5 shadow-xl opacity-90'}` 
        },
          tier.accent && React.createElement("div", { className: "absolute -inset-x-20 -top-20 aspect-square bg-gradient-to-b from-primary/20 to-transparent rounded-full blur-3xl pointer-events-none" }),
          tier.accent && React.createElement("div", { className: "absolute top-5 right-5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-[10px] font-black px-3 py-1 rounded-full tracking-widest uppercase shadow-xl flex items-center gap-1" }, 
             React.createElement(Sparkles, { className: "w-3 h-3" }), "OPTIMIZED"
          ),
          React.createElement("h3", { className: "text-sm font-black text-primary tracking-widest uppercase mb-2" }, tier.name),
          React.createElement("div", { className: "flex items-baseline gap-1 mb-2" },
             React.createElement("div", { className: "text-5xl font-black text-white" }, tier.price),
             tier.price !== "Custom" && tier.price !== "Free" && React.createElement("span", { className: "text-slate-500 text-sm" }, "/mo")
          ),
          React.createElement("p", { className: "text-slate-400 text-sm font-medium mb-8" }, tier.desc),
          
          React.createElement("div", { className: "space-y-4 mb-12 flex-grow" }, 
            tier.features.map((f, i) => React.createElement("div", { key: i, className: "flex items-start gap-3 text-slate-300 text-sm font-medium" },
              React.createElement("div", { className: "mt-0.5" }, React.createElement(CheckCircle2, { className: `w-4 h-4 ${tier.accent ? 'text-emerald-400' : 'text-slate-500'}` })), 
              f
            ))
          ),
          React.createElement("button", { 
            onClick: () => tier.priceNum > 0 ? setSelectedPlan(tier) : alert("Free tier selected."),
            className: `w-full py-5 rounded-2xl font-black text-sm tracking-[0.15em] uppercase transition-all duration-300 shadow-lg hover:-translate-y-1 ${tier.accent ? 'bg-gradient-to-r from-primary to-indigo-600 text-white hover:shadow-[0_10px_30px_rgba(99,102,241,0.4)]' : 'bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10'}`
          }, tier.accent ? "INITIALIZE ACCESS" : "SELECT TIER")
        )
      )
    )
  );
};


export const DocsView = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
      const ctx = gsap.context(() => {
         gsap.fromTo(".docs-aside", { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" });
         gsap.fromTo(".docs-main > *", { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.7, delay: 0.2 });
      }, containerRef);
      return () => ctx.revert();
  }, []);

  return React.createElement("div", {
    ref: containerRef,
    className: "pt-28 flex flex-col md:flex-row min-h-screen max-w-7xl mx-auto relative"
  },
    React.createElement("aside", { className: "docs-aside w-full md:w-72 border-r border-white/5 p-10 space-y-10 overflow-y-auto shrink-0" },
      React.createElement("div", null,
        React.createElement("h4", { className: "text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2" }, 
          React.createElement(BookOpen, { className: "w-4 h-4" }), "CORE INFRA"
        ),
        React.createElement("div", { className: "space-y-3" },
          ["Quick Start", "Architecture Matrix", "Node Configuration", "CLI Binary"].map((l, i) => 
            React.createElement("div", { key: i, className: `cursor-pointer flex items-center gap-2 text-sm font-bold px-3 py-2.5 rounded-lg transition-all ${i === 0 ? 'bg-primary/10 text-primary border border-primary/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}` }, 
              i === 0 && React.createElement("div", { className: "w-1.5 h-1.5 rounded-full bg-primary animate-pulse" }),
              l
            )
          )
        )
      ),
      React.createElement("div", null,
        React.createElement("h4", { className: "text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2" }, 
           React.createElement(Cpu, { className: "w-4 h-4" }), "API PROTOCOL"
        ),
        React.createElement("div", { className: "space-y-3 text-sm font-bold text-slate-400" },
          ["Authentication", "Dynamic Payloads", "Error Handling", "Rate Limits"].map((l, i) => 
            React.createElement("div", { key: i, className: "px-3 py-2.5 rounded-lg hover:text-white hover:bg-white/5 cursor-pointer transition-all" }, l)
          )
        )
      )
    ),
    React.createElement("main", { className: "docs-main flex-1 p-8 md:p-16 overflow-y-auto" },
      React.createElement("div", { className: "inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-6" }, "SYSTEM STABLE v2.4"),
      React.createElement("h1", { className: "text-5xl font-black text-white mb-6 tracking-tight" }, "Getting Started"),
      React.createElement("p", { className: "text-slate-400 mb-10 text-xl font-light leading-relaxed max-w-3xl" }, "The GS Prompt Hero framework facilitates hyper-distributed orchestration logic without requiring local binary hooks. Initialize standard compute endpoints via CLI directly below."),
      
      /* Code Terminal */
      React.createElement("div", { className: "glass-card bg-[#05070C] rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden group" },
        React.createElement("div", { className: "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-emerald-500" }),
        React.createElement("div", { className: "flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]" },
          React.createElement("div", { className: "flex items-center gap-2" },
            React.createElement("div", { className: "w-3 h-3 rounded-full bg-[#FF5F56]" }),
            React.createElement("div", { className: "w-3 h-3 rounded-full bg-[#FFBD2E]" }),
            React.createElement("div", { className: "w-3 h-3 rounded-full bg-[#27C93F]" })
          ),
          React.createElement("div", { className: "text-[10px] font-black text-slate-500 uppercase tracking-widest" }, "bash")
        ),
        React.createElement("div", { className: "p-8 font-mono text-sm leading-relaxed relative" },
          React.createElement("div", { className: "flex gap-4 mb-3" },
            React.createElement("span", { className: "text-slate-600 select-none" }, "$"),
            React.createElement("span", { className: "text-emerald-400 font-bold" }, "npm install -g gsprompthero")
          ),
          React.createElement("div", { className: "flex gap-4 mb-6" },
             React.createElement("span", { className: "text-slate-600 select-none" }, ">"),
             React.createElement("span", { className: "text-slate-500 italic animate-pulse" }, "Resolving dynamic network connections...")
          ),
          React.createElement("div", { className: "flex items-center gap-2 text-white bg-white/5 inline-block px-3 py-1 rounded-md mb-6 border border-white/5 shadow-inner" }, 
            React.createElement("span", null, "✅ SYSTEM SCAN COMPLETED: READY.")
          ),
          React.createElement("div", { className: "flex gap-4" },
            React.createElement("span", { className: "text-slate-600 select-none" }, "$"),
            React.createElement("span", { className: "text-emerald-400 font-bold" }, "hero init --matrix-node"),
            React.createElement("span", { className: "w-2 h-5 bg-indigo-500 animate-pulse" })
          )
        )
      ),
      
      React.createElement("div", { className: "mt-12 glass-card bg-indigo-500/5 border border-indigo-500/10 rounded-3xl p-8 flex gap-6 items-start transition-all hover:bg-indigo-500/10 hover:border-indigo-500/30" },
        React.createElement("div", { className: "w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0" },
           React.createElement(Terminal, { className: "w-6 h-6" })
        ),
        React.createElement("div", null,
          React.createElement("h4", { className: "text-xl font-black text-white mb-2 tracking-tight" }, "Neural Socket Injection"),
          React.createElement("p", { className: "text-slate-400 text-lg font-medium leading-relaxed" }, "Local telemetry dynamically tracks zero latent nodes during runtime orchestration. Monitor internal system heartbeat endpoints for instant pipeline status and throughput diagnostics.")
        )
      )
    )
  );
};
