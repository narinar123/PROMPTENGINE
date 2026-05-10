import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, Sparkles, Shield, Zap, Globe, ArrowRight,
  Cpu, Database, Code, Layers, Terminal, Lock
} from "lucide-react";

// -------------------------------------------------------------------
// 1. Background Canvas Simulator (The Famous Animated Spline/Mesh Look)
// -------------------------------------------------------------------
export const DesignCodeBg = () => {
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

export const HeroSectionV2 = ({ onGetStarted }) => {
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

export const CourseGrid = () => {
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
export const MarqueeStrip = () => {
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
export const DesignCodeMasterView = ({ onAction }) => {
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
