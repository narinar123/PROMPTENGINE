import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { 
  ArrowRight, FileText, Edit, Repeat, CheckCircle, 
  BookOpen, Mail, MessageSquare, Briefcase, Copy,
  CheckSquare, Globe, Type, Sparkles, Play, Loader2, Shield, User 
} from "lucide-react";
import { useAuth } from "/src/components/AuthManager.js";

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

export const ToolsDirectoryView = ({ onSelectTool }) => {
  const [activeCat, setActiveCat] = useState("All Tools");
  const containerRef = useRef(null);

  const filteredTools = activeCat === "All Tools" 
    ? AI_TOOLS_REGISTRY 
    : AI_TOOLS_REGISTRY.filter(t => t.cat === activeCat);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".tool-card", 
        { opacity: 0, y: 40, scale: 0.95 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.6, 
          stagger: {
             each: 0.06,
             grid: "auto",
             from: "start"
          },
          ease: "power3.out",
          clearProps: "all"
        }
      );

      gsap.fromTo(".cat-pill", 
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, stagger: 0.05, ease: "back.out(1.7)", duration: 0.5, delay: 0.1 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [activeCat]);

  return React.createElement("div", {
    ref: containerRef,
    className: "pt-32 pb-24 px-6 max-w-7xl mx-auto relative"
  },
    // Dynamic Background Orbs
    React.createElement("div", { className: "absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -z-10 animate-pulse" }),
    React.createElement("div", { className: "absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10" }),

    React.createElement("div", { className: "text-center mb-16 relative z-10" },
      React.createElement("div", { className: "inline-flex items-center gap-2 px-4 py-1.5 mb-8 border border-emerald-500/20 bg-emerald-500/10 backdrop-blur-xl rounded-full text-xs font-bold text-emerald-400 uppercase tracking-widest shadow-[0_0_15px_rgba(16,185,129,0.15)]" }, 
        React.createElement(Sparkles, { className: "w-3 h-3" }), "Intelligent Production Network"
      ),
      React.createElement("h2", { className: "text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-500 tracking-tight mb-6 drop-shadow-2xl" }, "Neural Engine Index"),
      React.createElement("p", { className: "text-slate-400 max-w-2xl mx-auto text-xl font-light leading-relaxed" }, 
        "Synchronize your creative workflow with our elite roster of specialized AI models and language augmentations."
      )
    ),

    /* Premium Category Filter Ribbon */
    React.createElement("div", { className: "flex flex-wrap gap-3 mb-16 overflow-x-auto pb-4 justify-center px-4 relative z-10" },
      CATEGORIES.map((c, idx) => React.createElement("button", {
        key: c,
        onClick: () => setActiveCat(c),
        className: `cat-pill group px-6 py-3 rounded-2xl text-sm font-bold whitespace-nowrap border transition-all duration-500 flex items-center gap-2 ${
            activeCat === c 
                ? 'bg-gradient-to-r from-primary to-indigo-600 border-transparent text-white shadow-[0_8px_30px_rgba(79,70,229,0.3)] translate-y-[-2px]' 
                : 'glass-card border-white/5 text-slate-400 hover:text-white hover:border-white/20 hover:bg-white/10 hover:translate-y-[-1px]'
        }`
      }, 
        c,
        activeCat === c && React.createElement(motion.div, {
            layoutId: "cat-spark",
            className: "w-1.5 h-1.5 rounded-full bg-white animate-pulse"
        })
      ))
    ),

    /* Fluid Dynamic Grid */
    React.createElement("div", { 
      className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10" 
    },
      filteredTools.map((tool, idx) => 
        React.createElement("div", {
          key: tool.id + activeCat, // Key iteration forces layout cycle for seamless GSAP targeting
          className: "tool-card group cursor-pointer perspective-1000",
          onClick: () => onSelectTool(tool.id)
        },
          React.createElement("div", { 
            className: "glass-card h-full p-8 rounded-3xl border border-white/5 relative overflow-hidden transition-all duration-500 group-hover:border-primary/50 group-hover:bg-gradient-to-br group-hover:from-white/[0.07] group-hover:to-primary/[0.03] group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]" 
          },
            /* Ambient Glow Overlay */
            React.createElement("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-transparent transition-all duration-500" }),
            
            /* Icon Housing */
            React.createElement("div", { className: "w-14 h-14 rounded-2xl bg-slate-900/50 border border-white/5 flex items-center justify-center mb-6 text-slate-400 group-hover:text-white group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-indigo-600 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all duration-500 transform group-hover:rotate-3" },
              React.createElement(tool.icon || Sparkles, { className: "w-6 h-6 transition-transform duration-500 group-hover:scale-110" })
            ),

            React.createElement("h3", { className: "text-xl font-bold text-white mb-3 tracking-tight transition-colors group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-indigo-200" }, tool.name),
            React.createElement("p", { className: "text-sm text-slate-500 leading-relaxed mb-6 line-clamp-2 font-medium group-hover:text-slate-300 transition-colors" }, tool.desc),
            
            React.createElement("div", { className: "flex items-center justify-between pt-4 border-t border-white/5 text-xs font-bold tracking-widest text-primary opacity-40 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0" }, 
              React.createElement("span", null, "LAUNCH INSTANCE"), 
              React.createElement(ArrowRight, { className: "w-4 h-4 transform group-hover:translate-x-1 transition-transform" })
            )
          )
        )
      )
    )
  );
};

export const SingleToolWorkspace = ({ toolId, onBack }) => {
  const tool = AI_TOOLS_REGISTRY.find(t => t.id === toolId) || AI_TOOLS_REGISTRY[0];
  const { role } = useAuth();
  const containerRef = useRef(null);
  
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useLayoutEffect(() => {
     const ctx = gsap.context(() => {
        gsap.from(".ws-element", {
            opacity: 0,
            y: 30,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out"
        });
     }, containerRef);
     return () => ctx.revert();
  }, []);

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

  return React.createElement("div", {
    ref: containerRef,
    className: "pt-32 min-h-screen max-w-7xl mx-auto px-6 pb-24 relative"
  },
    /* Kinetic Lighting */
    React.createElement("div", { className: "absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent -z-10" }),

    /* Breadcrumb & Header */
    React.createElement("div", { className: "ws-element mb-12 flex flex-col items-start" },
      React.createElement("button", { 
          onClick: onBack, 
          className: "text-slate-500 hover:text-primary flex items-center gap-2 text-sm font-bold mb-6 transition-colors group bg-white/5 px-4 py-2 rounded-full border border-white/5 hover:border-primary/20 hover:bg-primary/5" 
      },
        React.createElement(ArrowRight, { className: "w-4 h-4 rotate-180 transition-transform group-hover:-translate-x-1" }), 
        "INDEX OVERVIEW"
      ),
      React.createElement("div", { className: "flex items-center gap-6" },
        React.createElement("div", { className: "w-20 h-20 bg-gradient-to-br from-primary to-indigo-600 rounded-3xl flex items-center justify-center text-white shadow-[0_10px_40px_rgba(99,102,241,0.3)] rotate-3" },
            React.createElement(tool.icon || Sparkles, { className: "w-10 h-10" })
        ),
        React.createElement("div", null,
            React.createElement("h1", { className: "text-5xl font-black text-white tracking-tight mb-2" }, tool.name),
            React.createElement("div", { className: "flex items-center gap-3" },
                React.createElement("span", { className: "px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-primary font-bold text-xs tracking-widest uppercase" }, tool.cat),
                React.createElement("p", { className: "text-slate-400 font-medium" }, tool.desc)
            )
        )
      )
    ),

    /* Unified Interface Block */
    React.createElement("div", { className: "ws-element grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-350px)] min-h-[600px]" },
        /* Input Terminal */
        React.createElement("div", { className: "glass-card bg-[#0B0F19]/50 backdrop-blur-3xl rounded-[32px] flex flex-col p-8 border border-white/5 shadow-2xl relative group" },
            React.createElement("div", { className: "absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none rounded-[32px]" }),
            React.createElement("div", { className: "flex justify-between items-center mb-6 relative z-10" },
                React.createElement("div", { className: "flex items-center gap-2" },
                    React.createElement("div", { className: "w-2 h-2 rounded-full bg-indigo-500 animate-pulse" }),
                    React.createElement("div", { className: "text-xs font-bold tracking-widest text-indigo-400 uppercase" }, "SOURCE DATASET")
                ),
                React.createElement("div", { className: "text-[11px] font-mono bg-slate-900 px-2 py-1 rounded border border-white/5 text-slate-500" }, `${inputText.length} BYTES`)
            ),
            React.createElement("textarea", {
                value: inputText,
                onChange: (e) => setInputText(e.target.value),
                placeholder: `Drop vector parameters here for ${tool.name} conversion...`,
                className: "flex-1 bg-black/30 backdrop-blur-md rounded-2xl p-8 text-slate-300 font-medium resize-none focus:outline-none border border-white/5 focus:border-primary/40 focus:bg-black/50 transition-all duration-300 text-lg leading-relaxed selection:bg-indigo-500/30 relative z-10 shadow-inner"
            }),
            
            React.createElement("div", { className: "relative z-10 pt-6" },
                React.createElement(motion.button, {
                    whileTap: { scale: 0.97 },
                    disabled: loading || !inputText.trim(),
                    onClick: executeTool,
                    className: "w-full py-5 bg-gradient-to-r from-primary via-indigo-600 to-violet-600 text-white font-black text-sm uppercase tracking-[0.2em] rounded-2xl flex items-center justify-center gap-3 disabled:opacity-40 shadow-[0_15px_35px_rgba(99,102,241,0.3)] hover:shadow-[0_20px_40px_rgba(99,102,241,0.4)] hover:-translate-y-0.5 transition-all duration-300 group/btn"
                },
                    loading ? React.createElement(Loader2, { className: "w-5 h-5 animate-spin" }) : React.createElement(Play, { className: "w-4 h-4 fill-current transition-transform group-hover/btn:scale-125" }),
                    `INITIATE SEQUENCE`
                )
            ),
            
            error && React.createElement(motion.div, { 
                initial: { opacity: 0, y: 10 },
                animate: { opacity: 1, y: 0 },
                className: "mt-4 text-xs text-red-400 bg-red-500/10 border border-red-500/20 p-4 rounded-2xl text-center font-bold tracking-wide flex items-center justify-center gap-2" 
            }, React.createElement("span", { className: "w-2 h-2 rounded-full bg-red-500" }), error)
        ),

        /* Output Projection */
        React.createElement("div", { className: "glass-card bg-[#0B0F19]/50 backdrop-blur-3xl rounded-[32px] flex flex-col p-8 border border-white/5 shadow-2xl relative overflow-hidden" },
            React.createElement("div", { className: "absolute -right-32 -top-32 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" }),
            React.createElement("div", { className: "flex justify-between items-center mb-6 relative z-10" },
                 React.createElement("div", { className: "flex items-center gap-2" },
                    React.createElement("div", { className: `w-2 h-2 rounded-full ${outputText ? 'bg-emerald-500 animate-ping' : 'bg-slate-600'}` }),
                    React.createElement("div", { className: `text-xs font-bold tracking-widest uppercase ${outputText ? 'text-emerald-400' : 'text-slate-500'}` }, "RESOLVED LOGIC")
                ),
                outputText && React.createElement("button", { 
                    onClick: () => {
                        navigator.clipboard.writeText(outputText);
                        // Add simple UI toast logic here if needed
                    },
                    className: "text-xs font-bold bg-white/5 border border-white/10 px-4 py-2 rounded-full hover:bg-emerald-500 hover:text-white hover:border-emerald-400 text-slate-300 transition-all flex items-center gap-2" 
                }, React.createElement(Copy, { className: "w-3 h-3" }), "COPY ARTIFACT")
            ),
            
            React.createElement("div", { className: "flex-1 bg-gradient-to-b from-slate-900/50 to-slate-900/20 rounded-2xl p-8 font-medium overflow-y-auto text-slate-200 relative leading-relaxed shadow-inner border border-white/5" },
                loading ? React.createElement("div", { className: "absolute inset-0 flex flex-col items-center justify-center gap-4" },
                    React.createElement("div", { className: "relative" },
                        React.createElement("div", { className: "w-16 h-16 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 animate-spin" }),
                        React.createElement("div", { className: "absolute inset-2 rounded-full border-4 border-indigo-500/20 border-b-indigo-500 animate-spin [animation-direction:reverse]" })
                    ),
                    React.createElement("span", { className: "text-xs font-black tracking-[0.3em] text-emerald-400 animate-pulse" }, "COMPILING NEURAL DATA")
                ) : outputText ? React.createElement("div", { className: "whitespace-pre-wrap selection:bg-emerald-500/40 text-lg text-slate-100 animate-fadeIn" }, outputText) 
                  : React.createElement("div", { className: "absolute inset-0 flex flex-col items-center justify-center text-slate-600 gap-4" }, 
                        React.createElement(Cpu, { className: "w-12 h-12 opacity-20" }),
                        React.createElement("div", { className: "italic font-medium tracking-wide" }, "SYSTEM IDLE: Awaiting Command Input")
                    )
            )
        )
    )
  );
};
