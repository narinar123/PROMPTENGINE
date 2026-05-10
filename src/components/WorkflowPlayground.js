import React, { useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Play, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useAuth } from "/src/components/AuthManager.js";

export const WorkflowPlayground = () => {
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
