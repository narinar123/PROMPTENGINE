import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, FileText, Edit, Repeat, CheckCircle, 
  BookOpen, Mail, MessageSquare, Briefcase, Copy,
  CheckSquare, Globe, Type, Sparkles, Play, Loader2, Shield 
} from "lucide-react";
import { useAuth } from "/src/components/AuthManager.js";

// Unified Tool Matrix Registry Derived From Legacy Stack
const AI_TOOLS_REGISTRY = [
  { id: "ai-humanizer", name: "AI Humanizer", desc: "Convert sterile AI text into warm, undetectable human copy.", icon: User },
  { id: "blog-writer", name: "Blog Writer", desc: "Generate full-stack SEO articles in optimized markdown.", icon: BookOpen },
  { id: "paraphraser", name: "Paraphraser", desc: "Rephrase sentences retaining absolute contextual fidelity.", icon: Repeat },
  { id: "summarizer", name: "Summarizer", desc: "Distill long-form documents into rapid execution highlights.", icon: FileText },
  { id: "grammar-checker", name: "Grammar Checker", desc: "Correct and polish textual velocity syntax error-free.", icon: CheckCircle },
  { id: "essay-writer", name: "Essay Writer", desc: "Construct high-density academic-tier compositions.", icon: Edit },
  { id: "email-writer", name: "Email Writer", desc: "Draft persuasive transactional & cold-outreach threads.", icon: Mail },
  { id: "caption-writer", name: "Caption Writer", desc: "Craft hyper-engaging high-conversion social triggers.", icon: MessageSquare },
  { id: "cover-letter", name: "Cover Letter", desc: "Formulate bespoke pitch overlays tailored for recruiters.", icon: Briefcase },
  { id: "meta-description", name: "Meta Description", desc: "Optimize SERP CTR using dense thematic anchors.", icon: Globe },
  { id: "job-description", name: "Job Description", desc: "Structure comprehensive technical requisition forms.", icon: Briefcase },
  { id: "story-generator", name: "Story Generator", desc: "Weave complex narrative universes automatically.", icon: Sparkles },
  { id: "content-detector", name: "AI Detector", desc: "Scan text across probability vectors to verify origin.", icon: Shield },
  { id: "plagiarism-checker", name: "Plagiarism Check", desc: "Scan cross-indexed databases for footprint similarity.", icon: CheckSquare },
  { id: "translation", name: "Translation", desc: "Seamless vector shifts across 100+ dynamic tongues.", icon: Globe },
  { id: "product-description", name: "Product Desc", desc: "Generate high-conversion e-comm sales narratives.", icon: Copy },
  { id: "rewriter", name: "Content Rewriter", desc: "Spin legacy copy into dynamic fresh iterations.", icon: Repeat },
  { id: "ad-copy", name: "Ad Copy", desc: "Create high-retention ad scripts instantly.", icon: Sparkles },
  { id: "bio-generator", name: "Bio Generator", desc: "Structure compelling personal presence summaries.", icon: User },
  { id: "cold-email", name: "Cold Email", desc: "Unlock inbound funnels with high-open direct hooks.", icon: Mail },
  { id: "headline-generator", name: "Headline Gen", desc: "Hook users with algorithmic attention magnets.", icon: Type },
  { id: "linkedin-bio", name: "LinkedIn Bio", desc: "Position your stack strategically for visibility.", icon: Briefcase },
  { id: "poem-generator", name: "Poem Generator", desc: "Compute complex rhythm and metaphorical vectors.", icon: Sparkles },
  { id: "speech-writer", name: "Speech Writer", desc: "Draft rhetorical addresses optimized for cadence.", icon: MessageSquare }
];

export const ToolsDirectoryView = ({ onSelectTool }) => {
  return React.createElement(motion.div, {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    className: "pt-28 pb-20 px-6 max-w-7xl mx-auto"
  },
    React.createElement("div", { className: "text-center mb-16" },
      React.createElement("h2", { className: "text-5xl font-extrabold text-white tracking-tight mb-4" }, "Universal Toolbox Core"),
      React.createElement("p", { className: "text-slate-400 max-w-2xl mx-auto text-lg" }, "Unlock 24+ hyper-optimized neural processing engines mapped from dynamic datasets.")
    ),
    React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" },
      AI_TOOLS_REGISTRY.map((tool, idx) => 
        React.createElement(motion.div, {
          key: tool.id,
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

export const SingleToolWorkspace = ({ toolId, onBack }) => {
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
