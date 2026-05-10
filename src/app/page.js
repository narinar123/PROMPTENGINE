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
    let content = null;
    switch(currentRoute) {
      case "solutions":
        content = React.createElement(SolutionsView);
        break;
      case "pricing":
        content = React.createElement(PricingView);
        break;
      case "docs":
        content = React.createElement(DocsView);
        break;
      case "tools":
        content = React.createElement(ToolsDirectoryView, { onSelectTool: navigateToTool });
        break;
      case "single-tool":
        content = React.createElement(SingleToolWorkspace, { toolId: activeToolId, onBack: () => setCurrentRoute("tools") });
        break;
      case "workflows":
        content = React.createElement("div", { className: "pt-20 bg-[#0c0c0e] min-h-screen" }, React.createElement(WorkflowPlayground));
        break;
      default:
        content = React.createElement(DesignCodeMasterView, { onAction: () => setCurrentRoute("tools") });
    }

    return React.createElement(motion.div, {
      key: currentRoute,
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -10 },
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    }, content);
  };

  return React.createElement(AuthManager, null,
    React.createElement("main", { className: "min-h-screen w-full bg-[#050506] text-white overflow-x-hidden flex flex-col" },
      React.createElement(RoleSwitcher),

      /* PREMIUM NAV LAYER */
      React.createElement("nav", { className: "fixed top-0 inset-x-0 z-[100] h-16 glass border-b border-white/[0.03] backdrop-blur-2xl flex items-center justify-between px-6 md:px-16" },
        React.createElement("div", { 
          className: "flex items-center gap-3 font-extrabold text-xl tracking-[0.1em] text-white cursor-pointer group",
          onClick: () => { setCurrentRoute("home"); setActiveToolId(null); }
        },
          React.createElement("img", { 
            src: "https://www.gsgroups.net/gslogo.png", 
            alt: "Logo", 
            className: "h-8 w-auto transition-transform duration-500 group-hover:rotate-[360deg]" 
          }),
          React.createElement("span", null, "GUIDESOFT")
        ),
        React.createElement("div", { className: "hidden md:flex items-center gap-10 text-[10px] font-black text-white/40 tracking-[0.2em] uppercase" },
          [
            { id: "home", label: "Index" },
            { id: "tools", label: "Matrix" },
            { id: "solutions", label: "Nodes" },
            { id: "docs", label: "Schema" },
            { id: "pricing", label: "Quotas" }
          ].map(item => React.createElement("button", {
            key: item.id,
            onClick: () => { setCurrentRoute(item.id); setActiveToolId(null); },
            className: `transition-all duration-300 relative hover:text-white ${currentRoute === item.id ? 'text-white' : ''}`
          }, 
             item.label,
             currentRoute === item.id && React.createElement(motion.div, {
               layoutId: "navIndicator",
               className: "absolute -bottom-6 left-0 right-0 h-[2px] bg-indigo-500 rounded-full shadow-[0_0_12px_rgba(99,102,241,1)]"
             })
          ))
        ),
        React.createElement("div", { className: "flex items-center gap-4" },
          React.createElement("button", { 
             onClick: () => setCurrentRoute("tools"),
             className: "px-5 py-2 bg-white text-black text-xs font-black tracking-widest uppercase rounded-lg hover:bg-slate-200 hover:scale-105 transition-all active:scale-95" 
          }, "Initialize")
        )
      ),

      /* Dynamic Routed Content Ingress with AnimatePresence */
      React.createElement("div", { className: "flex-1 relative" }, 
        React.createElement(AnimatePresence, { mode: "wait" }, renderContent())
      )
    )
  );
}
