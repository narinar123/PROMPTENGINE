import React from "react";
import { AuthManager, RoleSwitcher } from "/src/components/AuthManager.js";
import { HeroSection } from "/src/components/HeroSection.js";
import { WorkflowPlayground } from "/src/components/WorkflowPlayground.js";

export default function App() {
  return React.createElement(AuthManager, null,
    React.createElement("main", { className: "min-h-screen w-full bg-background text-foreground overflow-x-hidden" },
      React.createElement(RoleSwitcher, null),

      React.createElement("nav", { className: "fixed top-0 inset-x-0 z-40 h-16 glass border-b border-white/5 flex items-center justify-between px-6 md:px-12" },
        React.createElement("div", { className: "flex items-center gap-2 font-heading font-bold text-xl tracking-tight text-white" },
          React.createElement("div", { className: "w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white" }, "G"),
          "PROMPT HERO"
        ),
        React.createElement("div", { className: "hidden md:flex items-center gap-8 text-sm text-slate-400 font-medium" },
          React.createElement("a", { href: "#", className: "hover:text-white transition-colors" }, "Solutions"),
          React.createElement("a", { href: "#", className: "hover:text-white transition-colors" }, "Workflows"),
          React.createElement("a", { href: "#", className: "hover:text-white transition-colors" }, "Docs"),
          React.createElement("a", { href: "#", className: "hover:text-white transition-colors" }, "Pricing")
        ),
        React.createElement("div", { className: "flex items-center gap-4" },
          React.createElement("button", { className: "hidden sm:block text-sm text-white font-medium hover:text-primary transition-colors" }, "Sign In"),
          React.createElement("button", { className: "px-4 py-2 bg-white text-black text-sm font-bold rounded-lg hover:bg-slate-200 transition-all" }, "Access Beta")
        )
      ),

      React.createElement(HeroSection, null),
      
      React.createElement("section", { className: "relative border-t border-white/5 bg-[#0c0c0e]" },
        React.createElement(WorkflowPlayground, null)
      ),

      React.createElement("footer", { className: "py-12 border-t border-white/5 glass text-center text-slate-500 text-xs" },
        React.createElement("div", null, "© 2026 GS Prompt Hero AI. All access reserved.")
      )
    )
  );
}
