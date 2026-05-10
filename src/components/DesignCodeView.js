import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, Sparkles, Shield, Zap, Globe, ArrowRight,
  Cpu, Database, Code, Layers, Terminal, Lock, Star, Check, Mail
} from "lucide-react";

// --- EXACT ASSETS FROM DESIGNCODE ---
const ASSETS = {
  logo: "https://designcode.io/images/logos/logo.svg",
  heroBg: "https://designcode.io/images/mockups/mockup3-bg.svg",
  heroCard1: "https://designcode.io/images/mockups/mockup-card2.svg",
  heroContent: "https://designcode.io/images/mockups/mockup-content.svg",
  proIcon: "https://designcode.io/images/icons/pricing-large.svg",
  course1: "https://images.ctfassets.net/ooa29xqb8tix/7bIHb2z3qClO9GfyPwj6nP/4cb3a08cdc0d34645540b1295f96dc67/Logo_React.png",
  course2: "https://images.ctfassets.net/ooa29xqb8tix/4bWEQMRsA6PzjiHljsxryp/55d78d84da072e9c22caddbccd67396b/swift-logo.png",
  course3: "https://images.ctfassets.net/ooa29xqb8tix/6wKL78pR08vwXE1lqdnmqQ/3fae44b2af1858454fa6c34fafe68cf1/framer-logo.png",
  course4: "https://images.ctfassets.net/ooa29xqb8tix/1bYdUtniEAUH3jdqQd3Qc1/7cf21d20882bfe59f01d7bc74e81010d/react-logo.png"
};

// Massive Visual Background with moving blobs and waves
const MasterBackground = () => {
  return React.createElement("div", { className: "fixed inset-0 -z-10 bg-[#1F1F47] overflow-hidden" },
    React.createElement("img", { 
      src: ASSETS.heroBg, 
      className: "absolute top-0 left-0 w-full h-full object-cover opacity-40 mix-blend-overlay",
      alt: "" 
    }),
    React.createElement(motion.div, {
      animate: { scale: [1, 1.1, 1], x: [0, 30, 0], y: [0, -20, 0] },
      transition: { duration: 20, repeat: Infinity, ease: "linear" },
      className: "absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] rounded-full bg-gradient-to-br from-[#FF4ECD] to-[#F9CB28] opacity-30 blur-[120px]"
    }),
    React.createElement(motion.div, {
      animate: { scale: [1, 1.15, 1], x: [0, -40, 0], y: [0, 30, 0] },
      transition: { duration: 25, repeat: Infinity, ease: "linear" },
      className: "absolute bottom-[-20%] right-[-10%] w-[80vw] h-[80vw] rounded-full bg-gradient-to-br from-[#007CF0] to-[#00DFD8] opacity-30 blur-[120px]"
    }),
    React.createElement("div", { className: "absolute inset-0 bg-gradient-to-b from-transparent via-[#1F1F47]/50 to-[#1F1F47]" })
  );
};

const NavbarV3 = () => {
  return React.createElement("nav", { className: "fixed top-0 inset-x-0 z-50 h-16 glass border-b border-white/10 backdrop-blur-xl flex items-center justify-between px-6 md:px-12" },
    React.createElement("div", { className: "flex items-center gap-3 cursor-pointer" },
      React.createElement("img", { src: ASSETS.logo, alt: "DesignCode Logo", className: "h-8 w-auto" }),
      React.createElement("span", { className: "font-extrabold text-xl tracking-tighter text-white" }, "Design+Code")
    ),
    React.createElement("div", { className: "hidden md:flex items-center gap-8 text-sm font-semibold text-white/70" },
      ["Courses", "Tutorials", "Pricing", "Downloads"].map((item) => 
        React.createElement("a", { key: item, className: "hover:text-white transition-all" }, item)
      )
    ),
    React.createElement("div", { className: "flex items-center gap-4" },
      React.createElement("button", { className: "text-white/70 text-sm font-bold hover:text-white transition-colors" }, "Sign In"),
      React.createElement("button", { className: "px-5 py-2 rounded-xl bg-white text-black font-bold text-sm hover:shadow-2xl hover:scale-105 transition-all" }, "Get Started")
    )
  );
};

const DetailedHero = () => {
  return React.createElement("section", { className: "relative pt-32 pb-24 px-6 flex flex-col lg:flex-row items-center gap-12 max-w-7xl mx-auto" },
    React.createElement(motion.div, {
      initial: { opacity: 0, y: 40 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 1, ease: "easeOut" },
      className: "flex-1 text-center lg:text-left z-10"
    },
      React.createElement("h1", { className: "text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tight mb-6" }, 
        "Design   and code  ", 
        React.createElement("br"), 
        React.createElement("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-[#00c6ff] to-[#0072ff]" }, "React apps")
      ),
      React.createElement("p", { className: "text-lg md:text-xl text-white/70 max-w-lg leading-relaxed mb-10 mx-auto lg:mx-0" }, 
        "Don’t skip design. Learn design and code, by building real apps with React and Swift. Complete courses about the best tools."
      ),
      React.createElement("div", { className: "flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start" },
        React.createElement(motion.button, {
          whileHover: { scale: 1.05, y: -2 },
          whileTap: { scale: 0.98 },
          className: "group flex items-center gap-3 px-8 py-4 rounded-3xl bg-white/10 border border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.2)] backdrop-blur-xl hover:bg-white/20 transition-all text-white font-bold text-lg"
        },
          React.createElement("img", { src: ASSETS.proIcon, className: "w-8 h-8", alt: "" }),
          "Get Pro Access"
        ),
        React.createElement("div", { className: "text-left" },
          React.createElement("div", { className: "text-white font-extrabold text-lg" }, "$19 per month"),
          React.createElement("div", { className: "text-white/50 text-sm max-w-[200px]" }, "Includes 50+ courses & videos")
        )
      )
    ),
    React.createElement("div", { className: "flex-1 relative w-full max-w-lg h-[450px] md:h-[550px]" },
      // The layering effect using exact svgs
      React.createElement(motion.img, {
        src: ASSETS.heroCard1,
        initial: { opacity: 0, y: 40, scale: 0.9, rotateY: 10 },
        animate: { opacity: 1, y: 0, scale: 1, rotateY: 0 },
        transition: { duration: 1.5, ease: "easeOut" },
        className: "absolute top-0 right-0 w-full h-auto object-contain z-10 drop-shadow-[0_50px_100px_rgba(0,0,0,0.5)]",
        style: { transformPerspective: 1000 }
      }),
      React.createElement(motion.img, {
        src: ASSETS.heroContent,
        initial: { opacity: 0, x: -40, rotateZ: -5 },
        animate: { opacity: 1, x: 0, rotateZ: 0 },
        transition: { duration: 1.2, delay: 0.5 },
        className: "absolute top-20 left-[-10%] w-[70%] h-auto object-contain z-20 drop-shadow-2xl"
      })
    )
  );
};

const ScrollingFeatures = () => {
  const tech = [
    { name: "REACT", icon: Code }, { name: "SWIFTUI", icon: Cpu },
    { name: "FIGMA", icon: Layers }, { name: "SPLINE", icon: Globe },
    { name: "FRAMER", icon: Zap }, { name: "NODE.JS", icon: Terminal }
  ];
  
  return React.createElement("div", { className: "w-full py-12 border-y border-white/10 overflow-hidden relative bg-white/5 backdrop-blur-md" },
    React.createElement(motion.div, {
      animate: { x: [0, -1035] },
      transition: { repeat: Infinity, duration: 30, ease: "linear" },
      className: "flex items-center gap-20 whitespace-nowrap w-max px-10"
    },
      [...tech, ...tech, ...tech].map((t, idx) => 
        React.createElement("div", { key: idx, className: "flex items-center gap-3 opacity-40 hover:opacity-100 transition-all font-bold tracking-widest text-white select-none" },
          React.createElement(t.icon, { className: "w-6 h-6" }),
          React.createElement("span", null, t.name)
        )
      )
    )
  );
};

const CourseCard = ({ title, desc, hours, image, color }) => {
  return React.createElement(motion.div, {
    whileHover: { scale: 1.03, y: -5 },
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    className: "group relative p-[1px] rounded-[40px] overflow-hidden bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
  },
    React.createElement("div", { className: "absolute inset-0 bg-gradient-to-br opacity-40 group-hover:opacity-60 blur-xl transition-opacity", style: { backgroundImage: `linear-gradient(135deg, ${color})` } }),
    React.createElement("div", { className: "relative bg-[#24244D]/95 backdrop-blur-2xl rounded-[39px] p-8 h-full flex flex-col border border-white/10 shadow-2xl" },
      React.createElement("div", { className: "w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-8 shadow-lg", style: { backgroundImage: `linear-gradient(135deg, ${color})` } },
        React.createElement("img", { src: image, className: "w-10 h-10 object-contain", alt: "" })
      ),
      React.createElement("h3", { className: "text-xl md:text-2xl font-extrabold text-white mb-3 leading-tight" }, title),
      React.createElement("p", { className: "text-white/60 text-sm leading-relaxed mb-6 line-clamp-3" }, desc),
      React.createElement("div", { className: "mt-auto pt-6 border-t border-white/5 flex justify-between items-center" },
        React.createElement("span", { className: "text-xs font-bold text-white/40 tracking-wider" }, hours.toUpperCase()),
        React.createElement(ArrowRight, { className: "w-5 h-5 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" })
      )
    )
  );
};

const CoursesGrid = () => {
  const items = [
    { title: "Master AI Prompting", desc: "Learn to leverage AI tools like Aura for creating beautiful designs and advanced prompts.", hours: "10 hours", image: ASSETS.course1, color: "#FF4ECD, #FF72E1" },
    { title: "Build SwiftUI Apps", desc: "Explore exciting new features of SwiftUI 6 and Xcode 16 for building premium iOS 18 apps.", hours: "5 hours", image: ASSETS.course2, color: "#007CF0, #00DFD8" },
    { title: "No-Code with Framer", desc: "Create modern user interfaces using dark mode and glass designs and auto layout.", hours: "4 hours", image: ASSETS.course3, color: "#7928CA, #FF0080" },
    { title: "Full React Site", desc: "Build web apps from the ground up using React for frontend and Firebase for scale.", hours: "6 hours", image: ASSETS.course4, color: "#FF4B2B, #FF416C" }
  ];

  return React.createElement("section", { className: "py-24 px-6 max-w-7xl mx-auto" },
    React.createElement("div", { className: "text-center mb-16" },
      React.createElement("span", { className: "text-white/50 font-bold tracking-[0.2em] text-sm mb-4 block" }, "300 HOURS OF COURSES"),
      React.createElement("h2", { className: "text-4xl md:text-5xl font-black text-white mb-6 tracking-tight" }, "Learn the best tools and platforms"),
      React.createElement("p", { className: "text-white/60 text-lg max-w-2xl mx-auto" }, "We focus on industry leading platforms so that you can be prepared for your next job. Then we teach all we can about them.")
    ),
    React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" },
      items.map((item, idx) => React.createElement(CourseCard, { key: idx, ...item }))
    )
  );
};

const PricingV3 = () => {
  const tiers = [
    { name: "Basic", price: "Free", features: ["Free courses", "5 Premium Videos", "Notify me, Favorite"] },
    { name: "Pro", price: "$19", features: ["All courses and videos", "Source files, ePub", "Certificates, Tests", "Commercial use"], active: true },
    { name: "Team", price: "$25", features: ["5 users included", "Manage subscriptions", "Team progress reporting"] }
  ];

  return React.createElement("section", { className: "py-24 px-6" },
    React.createElement("div", { className: "text-center mb-16" },
      React.createElement("h2", { className: "text-4xl md:text-5xl font-black text-white tracking-tight" }, "Ready to start?")
    ),
    React.createElement("div", { className: "grid md:grid-cols-3 gap-8 max-w-5xl mx-auto" },
      tiers.map((tier, i) => 
        React.createElement("div", { 
          key: i, 
          className: `glass p-10 rounded-[40px] border transition-all ${tier.active ? 'border-white/30 scale-105 bg-gradient-to-b from-white/10 to-transparent shadow-2xl z-10' : 'border-white/10 opacity-80 hover:opacity-100 hover:scale-105'}`
        },
          React.createElement("span", { className: "text-white/50 text-sm font-bold tracking-widest uppercase" }, tier.name),
          React.createElement("div", { className: "mt-4 flex items-baseline text-white" },
            React.createElement("span", { className: "text-5xl font-black" }, tier.price),
            tier.price !== 'Free' && React.createElement("span", { className: "text-white/60 text-sm ml-2" }, "per month")
          ),
          React.createElement("ul", { className: "mt-8 space-y-4 mb-10" },
            tier.features.map((feat, idx) => 
              React.createElement("li", { key: idx, className: "flex items-center gap-3 text-white/70 text-sm" },
                React.createElement(Check, { className: "w-4 h-4 text-green-400" }),
                feat
              )
            )
          ),
          React.createElement("button", { className: `w-full py-4 rounded-2xl font-bold text-sm transition-all ${tier.active ? 'bg-white text-black shadow-lg hover:bg-white/90' : 'border border-white/20 text-white hover:bg-white/5'}` }, 
            tier.active ? "Subscribe" : "Sign Up"
          )
        )
      )
    )
  );
};

const FooterV3 = () => {
  return React.createElement("footer", { className: "py-16 border-t border-white/10 glass mt-auto text-center" },
    React.createElement("img", { src: ASSETS.logo, className: "h-10 mx-auto opacity-50 mb-6", alt: "" }),
    React.createElement("p", { className: "text-white/40 text-xs mb-2" }, "Site made with React, Next.js and Spline."),
    React.createElement("p", { className: "text-white/60 text-sm font-medium" }, "Design+Code © 2025")
  );
};

export const DesignCodeMasterView = ({ onAction }) => {
  return React.createElement("main", { className: "relative min-h-screen w-full text-white overflow-x-hidden flex flex-col font-sans selection:bg-[#00C6FF] selection:text-black" },
    React.createElement(MasterBackground),
    React.createElement(NavbarV3),
    React.createElement(DetailedHero),
    React.createElement(ScrollingFeatures),
    React.createElement(CoursesGrid),
    React.createElement(PricingV3),
    React.createElement(FooterV3)
  );
};
