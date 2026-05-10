import React, { useState } from "react";
import { AuthManager, RoleSwitcher } from "/src/components/AuthManager.js";
import { HeroSection } from "/src/components/HeroSection.js";
import { WorkflowPlayground } from "/src/components/WorkflowPlayground.js";
import { SolutionsView, PricingView, DocsView } from "/src/components/DynamicViews.js";
import { ToolsDirectoryView, SingleToolWorkspace } from "/src/components/ToolMatrix.js";
import { DesignCodeMasterView } from "/src/components/DesignCodeView.js";

export default function App() {
  const [currentRoute, setCurrentRoute] = useState("home");
  const [activeToolId, setActiveToolId] = useState(null);

  const navigateToTool = (toolId) => {
    setActiveToolId(toolId);
    setCurrentRoute("single-tool");
  };

  // Centralized Router Matrix
  const renderContent = () => {
    switch(currentRoute) {
      case "solutions":
        return React.createElement(SolutionsView);
      case "pricing":
        return React.createElement(PricingView);
      case "docs":
        return React.createElement(DocsView);
      case "tools":
        return React.createElement(ToolsDirectoryView, { onSelectTool: navigateToTool });
      case "single-tool":
        return React.createElement(SingleToolWorkspace, { toolId: activeToolId, onBack: () => setCurrentRoute("tools") });
      case "workflows":
        return React.createElement("div", { className: "pt-20 bg-[#0c0c0e] min-h-screen" }, React.createElement(WorkflowPlayground));
      default:
        return React.createElement(DesignCodeMasterView, { onAction: () => setCurrentRoute("tools") });
    }
  };

  return React.createElement(AuthManager, null,
    React.createElement("main", { className: "min-h-screen w-full bg-background text-foreground overflow-x-hidden flex flex-col" },
      React.createElement(RoleSwitcher),

      React.createElement("nav", { className: "fixed top-0 inset-x-0 z-50 h-16 glass border-b border-white/5 flex items-center justify-between px-6 md:px-12" },
        React.createElement("div", { 
          className: "flex items-center gap-3 font-heading font-bold text-xl tracking-tight text-white cursor-pointer",
          onClick: () => { setCurrentRoute("home"); setActiveToolId(null); }
        },
          React.createElement("img", { 
            src: "https://www.gsgroups.net/gslogo.png", 
            alt: "Logo", 
            className: "h-8 w-auto object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]" 
          }),
          React.createElement("span", { className: "tracking-widest font-extrabold" }, "GUIDESOFT")
        ),
        React.createElement("div", { className: "hidden md:flex items-center gap-8 text-sm text-slate-400 font-medium" },
          [
            { id: "home", label: "Home" },
            { id: "tools", label: "AI Tools" },
            { id: "solutions", label: "Solutions" },
            { id: "docs", label: "Docs" },
            { id: "pricing", label: "Pricing" }
          ].map(item => React.createElement("button", {
            key: item.id,
            onClick: () => { setCurrentRoute(item.id); setActiveToolId(null); },
            className: `transition-all ${currentRoute === item.id ? 'text-white font-bold' : 'hover:text-white'}`
          }, item.label))
        ),
        React.createElement("div", { className: "flex items-center gap-4" },
          React.createElement("button", { 
             onClick: () => setCurrentRoute("tools"),
             className: "px-4 py-2 bg-white text-black text-sm font-bold rounded-lg hover:bg-slate-200 transition-all" 
          }, "Launch Node Matrix")
        )
      ),

      /* Dynamic Routed Content Ingress */
      React.createElement("div", { className: "flex-1" }, renderContent()),

      React.createElement("footer", { className: "py-12 border-t border-white/5 glass text-center text-slate-500 text-xs mt-auto" },
        React.createElement("div", null, "© 2026 GS Prompt Hero AI. All access reserved.")
      )
    )
  );
}
