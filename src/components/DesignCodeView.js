import React, { useState, useLayoutEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Play, Sparkles, Shield, Zap, Globe, ArrowRight,
  Cpu, Database, Code, Layers, Terminal, Lock, Star, Check, Mail
} from "lucide-react";

// --- UPDATED MODERN PREMIUM ASSETS & ASSET SOURCES ---
const ASSETS = {
  logo: "https://www.gsgroups.net/gslogo.png",
  heroBg: "https://designcode.io/images/mockups/mockup3-bg.svg", // Will utilize parallax
  heroCard1: "https://designcode.io/images/mockups/mockup-card2.svg",
  heroContent: "https://designcode.io/images/mockups/mockup-content.svg",
  proIcon: "https://designcode.io/images/icons/pricing-large.svg"
};

const MasterBackground = () => {
  const bgRef = useRef(null);
  const circle1 = useRef(null);
  const circle2 = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Parallax on the circles linked to page scroll
      gsap.to(circle1.current, {
        y: -200,
        x: 100,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom top",
          scrub: 1.5
        }
      });

      gsap.to(circle2.current, {
        y: 300,
        x: -150,
        scale: 1.2,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom top",
          scrub: 2
        }
      });
    }, bgRef);
    return () => ctx.revert();
  }, []);

  return React.createElement("div", { ref: bgRef, className: "fixed inset-0 -z-10 bg-[#05050A] overflow-hidden" },
    React.createElement("img", { 
      src: ASSETS.heroBg, 
      className: "absolute top-0 left-0 w-full h-full object-cover opacity-20 mix-blend-overlay",
      alt: "" 
    }),
    React.createElement("div", {
      ref: circle1,
      className: "absolute top-[-15%] left-[-5%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-[#6366f1]/20 to-[#a855f7]/20 opacity-60 blur-[120px]"
    }),
    React.createElement("div", {
      ref: circle2,
      className: "absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-br from-[#ec4899]/10 to-[#3b82f6]/20 opacity-50 blur-[140px]"
    }),
    React.createElement("div", { className: "absolute inset-0 bg-gradient-to-b from-transparent via-[#05050A]/60 to-[#05050A]" })
  );
};

const HeroSectionEnhanced = ({ onAction }) => {
  const scopeRef = useRef(null);
  const card1 = useRef(null);
  const card2 = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      // Intro Reveal Timeline
      tl.from(".hero-eyebrow", { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" })
        .from(".hero-heading span", { 
          y: 50, 
          opacity: 0, 
          skewY: 5,
          stagger: 0.2, 
          duration: 0.8, 
          ease: "power4.out" 
        }, "-=0.3")
        .from(".hero-para", { y: 30, opacity: 0, duration: 0.8 }, "-=0.5")
        .from(".hero-btns", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
        .from(".hero-image-stack img", { 
          scale: 0.8, 
          opacity: 0, 
          rotate: 5, 
          stagger: 0.2, 
          duration: 1, 
          ease: "elastic.out(1, 0.8)" 
        }, "-=0.8");

      // Subtle persistent floating float for mockup items
      gsap.to(card1.current, {
        y: -20,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.to(card2.current, {
        y: 15,
        x: 5,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5
      });

      // Scroll Parallax for visual stacking
      gsap.to(".hero-image-stack img", {
        y: (i, el) => -100 * (i + 1),
        ease: "none",
        scrollTrigger: {
          trigger: scopeRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }, scopeRef);
    return () => ctx.revert();
  }, []);

  return React.createElement("section", { ref: scopeRef, className: "relative pt-36 pb-24 px-6 lg:px-16 flex flex-col lg:flex-row items-center gap-16 max-w-7xl mx-auto min-h-[90vh]" },
    React.createElement("div", { className: "flex-1 text-center lg:text-left z-10" },
      React.createElement("div", { className: "hero-eyebrow mb-6 inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full border-white/10" },
         React.createElement(Sparkles, { className: "w-4 h-4 text-indigo-400" }),
         React.createElement("span", { className: "text-xs font-bold text-indigo-200 uppercase tracking-widest" }, "Enterprise Gen-AI Platform")
      ),
      React.createElement("h1", { className: "hero-heading text-5xl md:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-8" }, 
        React.createElement("span", { className: "block" }, "Prompt The"), 
        React.createElement("span", { className: "text-gradient block mt-2" }, "Future Workflow")
      ),
      React.createElement("p", { className: "hero-para text-lg md:text-xl text-white/60 max-w-xl leading-relaxed mb-12 mx-auto lg:mx-0 font-light" }, 
        "The ultimate distributed ecosystem for autonomous prompt chains, logic extraction, and instant deployment. Orchestrate next-gen vectors with precision and speed."
      ),
      React.createElement("div", { className: "hero-btns flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start" },
        React.createElement(motion.button, {
          whileHover: { scale: 1.05, boxShadow: "0 0 40px rgba(99,102,241,0.4)" },
          whileTap: { scale: 0.98 },
          onClick: onAction,
          className: "group relative flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-black shadow-xl transition-all font-extrabold text-lg hover:bg-slate-100"
        },
          "Launch Matrix",
          React.createElement(ArrowRight, { className: "w-5 h-5 transition-transform group-hover:translate-x-1" })
        ),
        React.createElement("div", { className: "flex items-center gap-3 text-left pl-2" },
           React.createElement("div", { className: "w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20" }, 
             React.createElement(Terminal, { className: "w-5 h-5 text-indigo-400" })
           ),
           React.createElement("div", null,
             React.createElement("div", { className: "text-white font-bold text-sm" }, "v2.4 Runtime"),
             React.createElement("div", { className: "text-white/40 text-xs" }, "Distributed Core Activated")
           )
        )
      )
    ),
    React.createElement("div", { className: "hero-image-stack flex-1 relative w-full max-w-lg h-[350px] md:h-[500px]" },
      React.createElement("img", {
        ref: card1,
        src: ASSETS.heroCard1,
        alt: "Layer",
        className: "absolute top-0 right-0 w-full h-auto object-contain z-10 filter drop-shadow-[0_40px_80px_rgba(0,0,0,0.6)] transition-transform"
      }),
      React.createElement("img", {
        ref: card2,
        src: ASSETS.heroContent,
        alt: "Top layer",
        className: "absolute top-[15%] left-[-5%] w-[80%] h-auto object-contain z-20 filter drop-shadow-2xl transition-transform"
      })
    )
  );
};

const ScrollingTechStack = () => {
  const tech = [
    { name: "NEURAL ENG", icon: Cpu }, { name: "VECTOR DB", icon: Database },
    { name: "EXEC LOGIC", icon: Code }, { name: "DISTRIBUTED", icon: Globe },
    { name: "ACCELERATOR", icon: Zap }, { name: "ORCHESTRATOR", icon: Layers }
  ];
  
  return React.createElement("div", { className: "w-full py-10 border-y border-white/5 overflow-hidden relative bg-[#0a0a10]/50 backdrop-blur-md" },
    React.createElement(motion.div, {
      animate: { x: [0, -1200] },
      transition: { repeat: Infinity, duration: 35, ease: "linear" },
      className: "flex items-center gap-24 whitespace-nowrap w-max px-12"
    },
      [...tech, ...tech, ...tech, ...tech].map((t, idx) => 
        React.createElement("div", { key: idx, className: "flex items-center gap-3 opacity-40 hover:opacity-100 transition-opacity duration-300 font-extrabold tracking-widest text-slate-200 select-none text-xs" },
          React.createElement(t.icon, { className: "w-5 h-5 text-indigo-400" }),
          React.createElement("span", null, t.name)
        )
      )
    )
  );
};

const GridShowcase = () => {
  const container = useRef(null);
  const items = [
    { title: "Advanced Context Injection", desc: "Inject stateful environmental memories into neural stream responses dynamically.", icon: Sparkles, color: "from-indigo-500 to-cyan-400" },
    { title: "Autonomous Sub-Agent Chains", desc: "Build complex multi-step iterative logical loops across independent worker clusters.", icon: Layers, color: "from-purple-500 to-pink-500" },
    { title: "Zero-Latency Inference", desc: "Stream responses through high-velocity distribution edge nodes for sub-second handshakes.", icon: Zap, color: "from-amber-400 to-orange-500" },
    { title: "Encrypted Vector Isolation", desc: "Enterprise-grade logic guardrails ensures strictly compartmentalized execution.", icon: Shield, color: "from-emerald-400 to-teal-500" }
  ];

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".grid-card", {
        y: 80,
        opacity: 0,
        scale: 0.95,
        stagger: 0.15,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return React.createElement("section", { ref: container, className: "py-32 px-6 lg:px-12 max-w-7xl mx-auto" },
    React.createElement("div", { className: "text-center mb-20" },
      React.createElement("span", { className: "text-indigo-400 font-black tracking-[0.25em] text-xs mb-4 block uppercase" }, "Core Matrix Architecture"),
      React.createElement("h2", { className: "text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight" }, "Unparalleled Capabilities"),
      React.createElement("p", { className: "text-white/50 text-lg max-w-2xl mx-auto font-light" }, "We merged bleeding-edge prompt methodology with distributed compute engines to resolve enterprise challenges.")
    ),
    React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" },
      items.map((item, idx) => React.createElement("div", {
        key: idx,
        className: "grid-card group relative rounded-[32px] p-[1px] bg-white/5 hover:bg-white/10 transition-all cursor-pointer overflow-hidden shadow-2xl"
      },
        React.createElement("div", { className: `absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br ${item.color} blur-xl transition-all duration-500` }),
        React.createElement("div", { className: "relative h-full bg-[#0c0c14] glass-card p-8 flex flex-col rounded-[31px] border border-white/[0.04]" },
          React.createElement("div", { className: `w-14 h-14 rounded-2xl flex items-center justify-center mb-8 bg-gradient-to-br ${item.color} bg-opacity-10 relative` },
            React.createElement("div", { className: "absolute inset-0 opacity-20 rounded-2xl bg-white mix-blend-overlay" }),
            React.createElement(item.icon, { className: "w-6 h-6 text-white" })
          ),
          React.createElement("h3", { className: "text-xl font-bold text-white mb-4 leading-tight" }, item.title),
          React.createElement("p", { className: "text-white/50 text-sm font-light leading-relaxed mb-8" }, item.desc),
          React.createElement("div", { className: "mt-auto pt-4 flex justify-between items-center border-t border-white/5" },
            React.createElement("span", { className: "text-[10px] font-bold text-indigo-400 tracking-wider uppercase" }, "Enabled"),
            React.createElement(ArrowRight, { className: "w-4 h-4 text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all" })
          )
        )
      ))
    )
  );
};

const FeatureRow = () => {
  const rowRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".feat-content", {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rowRef.current,
          start: "top 75%",
        }
      });
      gsap.from(".feat-visual", {
        x: 60,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rowRef.current,
          start: "top 75%",
        }
      });
    }, rowRef);
    return () => ctx.revert();
  }, []);

  return React.createElement("section", { ref: rowRef, className: "py-24 px-6 lg:px-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center" },
    React.createElement("div", { className: "feat-content" },
       React.createElement("h2", { className: "text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight" }, "Streamlined Node Workspaces"),
       React.createElement("p", { className: "text-white/60 text-lg mb-8 leading-relaxed" }, "Control complex execution vectors from a unified visual board. No cognitive overload, just raw logical clarity."),
       React.createElement("ul", { className: "space-y-4" },
         ["Live Trace Visualization", "Parallel Branching Chains", "Integrated Sandbox Runtimes"].map((x, i) => 
           React.createElement("li", { key: i, className: "flex items-center gap-3 text-white/80" },
             React.createElement("div", { className: "w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center" }, React.createElement(Check, { className: "w-3 h-3 text-emerald-400" })),
             React.createElement("span", { className: "text-sm font-medium" }, x)
           )
         )
       )
    ),
    React.createElement("div", { className: "feat-visual relative aspect-video glass-card rounded-3xl border border-white/10 p-4 bg-black/40 overflow-hidden group" },
      React.createElement("div", { className: "absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" }),
      React.createElement("div", { className: "flex gap-1.5 mb-4 items-center" },
        [1,2,3].map(c => React.createElement("div", { key: c, className: "w-3 h-3 rounded-full bg-white/10" }))
      ),
      React.createElement("div", { className: "w-full h-full rounded-xl bg-[#0c0c14] border border-white/5 flex items-center justify-center relative font-mono text-indigo-500/50 text-xs select-none" },
        "// System Live Render Active",
        React.createElement(Terminal, { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 opacity-10" })
      )
    )
  );
};

const UltimateCTA = ({ onAction }) => {
  return React.createElement("section", { className: "py-32 px-6" },
    React.createElement(motion.div, {
      whileInView: { y: [50, 0], opacity: [0, 1] },
      viewport: { once: true },
      transition: { duration: 1, ease: "easeOut" },
      className: "max-w-4xl mx-auto text-center relative glass-card rounded-[40px] p-12 md:p-20 border border-indigo-500/20 bg-[#0a0a18] overflow-hidden"
    },
      React.createElement("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" }),
      React.createElement("h2", { className: "text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight" }, "Ready to Accelerate?"),
      React.createElement("p", { className: "text-white/50 text-lg mb-10 max-w-lg mx-auto font-light" }, "Deploy the dynamic ecosystem in under 60 seconds. No overhead, just instant scale."),
      React.createElement("button", {
        onClick: onAction,
        className: "px-10 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg shadow-[0_0_40px_rgba(99,102,241,0.3)] hover:scale-105 transition-all hover:shadow-[0_0_60px_rgba(99,102,241,0.5)]"
      }, "Initialize Ecosystem")
    )
  );
};

const SubNavbar = () => {
  return React.createElement("nav", { className: "fixed top-0 inset-x-0 z-50 h-16 glass border-b border-white/[0.05] flex items-center justify-between px-8 md:px-16" },
    React.createElement("div", { className: "flex items-center gap-3 cursor-pointer group" },
      React.createElement("img", { src: ASSETS.logo, alt: "Logo", className: "h-7 w-auto transition-transform group-hover:rotate-12" }),
      React.createElement("span", { className: "font-black text-lg tracking-[0.15em] text-white" }, "GUIDESOFT")
    ),
    React.createElement("div", { className: "hidden md:flex items-center gap-10 text-xs font-bold text-white/50 tracking-widest" },
      ["MATRIX", "NODES", "LOGIC", "DOCS"].map((item) => 
        React.createElement("a", { key: item, className: "hover:text-white transition-all cursor-pointer relative group" }, 
          item,
          React.createElement("div", { className: "absolute -bottom-1 left-0 w-0 h-[1px] bg-indigo-500 group-hover:w-full transition-all duration-300" })
        )
      )
    ),
    React.createElement("div", { className: "flex items-center gap-4" },
      React.createElement("button", { className: "px-5 py-2 rounded-xl bg-white/5 border border-white/10 text-white/80 font-bold text-xs tracking-widest hover:bg-white/10 transition-all" }, "LOGIN")
    )
  );
};

export const DesignCodeMasterView = ({ onAction }) => {
  // Smooth entrance wrapper
  useLayoutEffect(() => {
     window.scrollTo(0,0);
  }, []);

  return React.createElement("main", { className: "relative min-h-screen w-full text-white overflow-x-hidden flex flex-col font-sans selection:bg-indigo-500 selection:text-white" },
    React.createElement(MasterBackground),
    // Reusing simple internal Navbar specific to this view to show distinct polish, 
    // though logically linked to root frame via container if needed.
    React.createElement(HeroSectionEnhanced, { onAction }),
    React.createElement(ScrollingTechStack),
    React.createElement(GridShowcase),
    React.createElement(FeatureRow),
    React.createElement(UltimateCTA, { onAction }),
    React.createElement("footer", { className: "py-16 border-t border-white/5 glass text-center mt-20" },
       React.createElement("img", { src: ASSETS.logo, className: "h-6 mx-auto opacity-30 mb-4 filter grayscale", alt: "" }),
       React.createElement("p", { className: "text-white/20 text-[10px] font-bold tracking-widest" }, "GUIDESOFT AI ECOSYSTEM © 2026. ALL RIGHTS RESERVED.")
    )
  );
};
