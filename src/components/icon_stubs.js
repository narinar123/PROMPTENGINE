// Precision-Engineered Vector Asset Definitions replacing polluted external dependency topologies.
window.SVGIcon = ({ d, className, ...props }) => {
    return React.createElement('svg', {
        xmlns: "http://www.w3.org/2000/svg",
        width: props.width || props.size || 24,
        height: props.height || props.size || 24,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: className,
        ...props
    }, React.createElement('path', { d }));
};

window.User = (p) => window.SVGIcon({ ...p, d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2 M12 3a4 4 0 1 0 0 8 4 4 0 1 0 0-8z" });
window.Lock = (p) => window.SVGIcon({ ...p, d: "M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z M7 11V7a5 5 0 0 1 10 0v4" });
window.Settings = (p) => window.SVGIcon({ ...p, d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.72V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" });
window.Key = (p) => window.SVGIcon({ ...p, d: "m21 2-2 2-5 5-4 4-4-4-4 4 4 4 5-5 5 5z" });
window.Sparkles = (p) => window.SVGIcon({ ...p, d: "m12 3 1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3Z" });
window.ArrowRight = (p) => window.SVGIcon({ ...p, d: "M5 12h14M12 5l7 7-7 7" });
window.Shield = (p) => window.SVGIcon({ ...p, d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" });
window.Zap = (p) => window.SVGIcon({ ...p, d: "M13 2L3 14h9l-1 8 10-12h-9l1-8z" });
window.Globe = (p) => window.SVGIcon({ ...p, d: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M2 12h20 M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" });
window.Terminal = (p) => window.SVGIcon({ ...p, d: "m4 17 6-6-6-6 M12 19h8" });
window.Play = (p) => window.SVGIcon({ ...p, d: "m5 3 14 9-14 9V3z" });
window.Loader2 = (p) => window.SVGIcon({ ...p, className: (p.className||"") + " animate-spin", d: "M21 12a9 9 0 1 1-6.219-8.56" });
window.CheckCircle2 = (p) => window.SVGIcon({ ...p, d: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-10l-2-2m2 2l4-4" });
window.AlertCircle = (p) => window.SVGIcon({ ...p, d: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M12 8v4 M12 16h.01" });

console.log("🛡️ Vector Icon Security Shields Activated.");
