import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Shield, Zap, Globe } from "lucide-react";

export const HeroSection = () => {
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
