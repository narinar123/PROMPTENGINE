/** 
 * GS Prompt Hero v2.0 - Optimized Production Bundle 
 * Auto-compiled via Terminal Zero-Build Pipeline 
 */

// Unified Module Ecosystem Injection
import React, { useState, createContext, useContext, useEffect, useLayoutEffect, useRef } from "react";
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  User, Lock, Settings, Key, LogIn, LogOut, UserPlus, AlertTriangle, 
  Sparkles, ArrowRight, Shield, Zap, Globe, 
  Terminal, Play, Loader2, CheckCircle2, AlertCircle,
  FileText, Edit, Repeat, CheckCircle, BookOpen, Mail, 
  MessageSquare, Briefcase, Copy, CheckSquare, Type,
  Database, Code, Layers, Cpu, Star, Check} from "lucide-react";

// Core Engine Extension Registration
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}



/* --- COMPONENT BUNDLE: AuthManager.js --- */



const AuthContext = createContext({
  user: null,
  role: "guest",
  loading: false,
  login: () => {},
  logout: () => {},
});

const useAuth = () => useContext(AuthContext);

// Utility to decode generic JWT tokens from Google
const parseJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
};

const AuthManager = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("guest");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Restoring session on load
    const storedUser = localStorage.getItem("gs_hero_user");
    const storedRole = localStorage.getItem("gs_hero_role") || "guest";
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setRole(storedRole);
      } catch(e) {}
    }
    setLoading(false);
    
    // Setup global callback for Google Sign In
    window.handleGoogleCredentialResponse = (response) => {
      setLoading(true);
      const decoded = parseJwt(response.credential);
      if (decoded) {
        const enrichedUser = {
          id: decoded.sub,
          email: decoded.email,
          name: decoded.name,
          picture: decoded.picture,
          verified: decoded.email_verified
        };
        // Mock fetch backend call syncing to Airtable/Google/Neon
        fetch('/api/auth', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ action: 'sync', user: enrichedUser })
        }).catch(e => console.warn("Offline/Mock Sync mode active."));
        
        login(enrichedUser, "editor"); // Default role for logged in users
      }
      setLoading(false);
    };
  }, []);

  const login = (userData, userRole) => {
    setUser(userData);
    setRole(userRole);
    localStorage.setItem("gs_hero_user", JSON.stringify(userData));
    localStorage.setItem("gs_hero_role", userRole);
  };
  
  const logout = () => {
    setUser(null);
    setRole("guest");
    localStorage.removeItem("gs_hero_user");
    localStorage.removeItem("gs_hero_role");
    // Trigger a google accounts revocation or simply clear state
    if (window.google && window.google.accounts) {
      window.google.accounts.id.disableAutoSelect();
    }
  };

  return React.createElement(AuthContext.Provider, { value: { user, role, loading, login, logout } }, children);
};

const RoleSwitcher = () => {
  const { user, role, loading, login, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const roles = ["guest", "editor", "admin", "super"];

  // Setup Google Button rendering once dynamic GSI is ready.
  useEffect(() => {
    if (isOpen && !user && window.google) {
      const renderBtn = () => {
         try {
           window.google.accounts.id.initialize({
             client_id: "665036018723-v203s33n6p8rt9j1n0n4b03u2n3u8e24.apps.googleusercontent.com", // Explicit fallback/placeholder for frontend demonstration
             callback: window.handleGoogleCredentialResponse,
             auto_select: false,
             cancel_on_tap_outside: true
           });
           window.google.accounts.id.renderButton(
             document.getElementById("g_id_btn_container"),
             { theme: "filled_black", size: "large", width: 220, text: "continue_with", shape: "pill" }
           );
         } catch(e) { console.error("GSI Init Failure", e); }
      };
      
      // Polling check for window.google ready state
      const checkInt = setInterval(() => {
        if (window.google && window.google.accounts && window.google.accounts.id) {
           renderBtn();
           clearInterval(checkInt);
        }
      }, 500);
      return () => clearInterval(checkInt);
    }
  }, [isOpen, user]);

  return React.createElement("div", { className: "fixed top-4 right-4 z-50 flex gap-3 items-center" }, 
    user && React.createElement("div", { className: "glass px-4 py-2 rounded-full text-xs font-semibold tracking-wide flex items-center gap-2" }, 
      user.picture ? React.createElement("img", { src: user.picture, className: "w-5 h-5 rounded-full border border-white/20" }) 
                   : React.createElement("span", { className: "w-2 h-2 rounded-full bg-emerald-400 animate-pulse" }),
      React.createElement("span", { className: "text-slate-200" }, `${user.name || "User"} (${role})`)
    ),
    React.createElement("button", { 
      onClick: () => setIsOpen(!isOpen),
      className: "w-10 h-10 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all shadow-lg hover:scale-105 relative group overflow-hidden"
    }, 
      React.createElement("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" }),
      React.createElement(User, { className: "w-5 h-5 relative z-10" })
    ),
    React.createElement(AnimatePresence, null, 
      isOpen && React.createElement(motion.div, { 
        initial: { opacity: 0, scale: 0.95, y: 10, filter: "blur(10px)" },
        animate: { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" },
        exit: { opacity: 0, scale: 0.95, y: 10, filter: "blur(10px)" },
        className: "absolute right-0 top-14 w-72 glass-card rounded-3xl p-5 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.6)] overflow-hidden"
      }, 
        React.createElement("div", { className: "absolute -right-10 -top-10 w-32 h-32 bg-indigo-500/10 blur-[40px] rounded-full pointer-events-none" }),
        React.createElement("div", { className: "relative font-bold text-sm text-white/90 mb-5 flex items-center gap-2 pb-3 border-b border-white/10" }, 
          React.createElement(Key, { className: "w-4 h-4 text-indigo-400" }), 
          " Security Orchestrator"
        ),
        
        !user ? (
          React.createElement("div", { className: "flex flex-col items-center py-2 space-y-4" },
             React.createElement("div", { id: "g_id_btn_container", className: "w-full flex justify-center min-h-[40px]" }),
             React.createElement("div", { className: "relative w-full flex items-center justify-center my-1" },
                React.createElement("div", { className: "w-full border-t border-white/10" }),
                React.createElement("span", { className: "absolute bg-[#101012] px-2 text-[10px] font-medium text-slate-500 uppercase tracking-widest" }, "or temporary mock")
             ),
             React.createElement("button", {
               onClick: () => { login({name: "Demo Developer", email: "dev@mock.ai"}, "guest"); setIsOpen(false); },
               className: "w-full py-3 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white text-sm font-medium transition-all flex items-center justify-center gap-2"
             }, React.createElement(UserPlus, { className: "w-4 h-4" }), "Enter as Guest")
          )
        ) : (
          React.createElement("div", { className: "space-y-2" }, 
            roles.map((r) => React.createElement("button", {
              key: r,
              onClick: () => { login(user, r); setIsOpen(false); },
              className: `w-full flex justify-between items-center p-3 rounded-xl transition-all text-sm relative group ${role === r ? 'bg-indigo-500/20 text-white border border-indigo-500/30 shadow-lg' : 'bg-white/5 text-slate-300 border border-transparent hover:bg-white/10'}`
            }, 
              React.createElement("div", { className: "flex items-center gap-3" },
                 role === r && React.createElement(motion.div, { layoutId: "activeRoleRing", className: "absolute inset-0 border border-indigo-500 rounded-xl pointer-events-none" }),
                 React.createElement("span", { className: "capitalize font-medium" }, r)
              ),
              r === 'super' ? React.createElement(Lock, { className: "w-3.5 h-3.5 text-red-400 opacity-80" }) : React.createElement(Settings, { className: "w-3.5 h-3.5 opacity-40 group-hover:opacity-70 transition-opacity" })
            )),
            
            React.createElement("div", { className: "pt-3 mt-3 border-t border-white/10" },
              React.createElement("button", { 
                onClick: () => { logout(); setIsOpen(false); },
                className: "w-full py-2.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs font-semibold hover:bg-red-500/20 hover:text-red-300 transition-all flex items-center justify-center gap-2"
              }, React.createElement(LogOut, { className: "w-3.5 h-3.5" }), "Terminate Session")
            )
          )
        )
      )
    )
  );
};



/* --- COMPONENT BUNDLE: HeroSection.js --- */



const HeroSection = () => {
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


/* --- COMPONENT BUNDLE: WorkflowPlayground.js --- */




const WorkflowPlayground = () => {
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


/* --- COMPONENT BUNDLE: DynamicViews.js --- */




const SolutionsView = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
     const ctx = gsap.context(() => {
        gsap.fromTo(".sol-header > *", 
          { opacity: 0, y: 30 }, 
          { opacity: 1, y: 0, stagger: 0.15, ease: "power3.out", duration: 0.8 }
        );
        gsap.fromTo(".sol-card", 
          { opacity: 0, y: 40, scale: 0.95 }, 
          { opacity: 1, y: 0, scale: 1, stagger: 0.1, ease: "power3.out", duration: 0.7, delay: 0.2 }
        );
     }, containerRef);
     return () => ctx.revert();
  }, []);

  return React.createElement("div", {
    ref: containerRef,
    className: "pt-32 pb-20 px-6 max-w-7xl mx-auto"
  },
    React.createElement("div", { className: "sol-header text-center mb-16" },
      React.createElement("h2", { className: "text-6xl font-black text-white mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400" }, "Enterprise Vectors"),
      React.createElement("p", { className: "text-slate-400 max-w-2xl mx-auto text-xl font-light leading-relaxed" }, "Next-generation neural pathways configured for hyper-velocity execution and architectural optimization.")
    ),
    React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8" },
      [
        { title: "Generative Core", desc: "Deploy and orchestrate massive language models instantly across internal secure pipelines.", icon: Sparkles },
        { title: "Nexus Security", desc: "Military-grade compliance ensuring dynamic context windows stay private and localized.", icon: Shield },
        { title: "Flow Integration", desc: "Hook directly into distributed cloud nodes via direct-compute rest endpoints.", icon: Zap },
        { title: "Edge Velocity", desc: "Distribute inference workflows globally at under 50ms worldwide replication latency.", icon: Globe }
      ].map((solution, idx) => 
        React.createElement("div", { key: idx, className: "sol-card glass-card p-10 rounded-[32px] group border border-white/5 hover:bg-white/[0.03] hover:border-primary/30 hover:-translate-y-1.5 shadow-xl transition-all duration-500 cursor-pointer relative overflow-hidden" },
          React.createElement("div", { className: "absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 group-hover:rotate-12 transition-all duration-500" },
             React.createElement(solution.icon, { className: "w-24 h-24 text-primary" })
          ),
          React.createElement("div", { className: "flex items-center gap-5 mb-6 relative z-10" },
            React.createElement("div", { className: "w-14 h-14 bg-gradient-to-br from-primary to-indigo-600 rounded-2xl text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] flex items-center justify-center group-hover:scale-110 transition-transform duration-500" }, 
              React.createElement(solution.icon, { className: "w-7 h-7" })
            ),
            React.createElement("h3", { className: "text-2xl font-black text-white tracking-tight" }, solution.title)
          ),
          React.createElement("p", { className: "text-slate-400 leading-relaxed text-lg font-medium relative z-10" }, solution.desc),
          React.createElement("div", { className: "mt-10 h-1.5 w-full bg-white/5 rounded-full overflow-hidden relative z-10 shadow-inner" },
            React.createElement(motion.div, {
              initial: { width: 0 },
              animate: { width: '100%' },
              transition: { duration: 2.5, delay: 1 + idx * 0.2, ease: "easeInOut" },
              className: "h-full bg-gradient-to-r from-primary via-indigo-500 to-emerald-500"
            })
          )
        )
      )
    )
  );
};

const PricingView = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
     const ctx = gsap.context(() => {
        gsap.fromTo(".pricing-card", 
          { opacity: 0, y: 50 }, 
          { opacity: 1, y: 0, stagger: 0.15, ease: "back.out(1.2)", duration: 0.8 }
        );
     }, containerRef);
     return () => ctx.revert();
  }, []);

  return React.createElement("div", {
    ref: containerRef,
    className: "pt-32 pb-24 px-6 max-w-6xl mx-auto relative"
  },
    React.createElement("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" }),
    
    React.createElement("div", { className: "text-center mb-20 relative z-10" },
      React.createElement("h2", { className: "text-6xl font-black text-white mb-6 tracking-tight" }, "Select Allocation Tier"),
      React.createElement("p", { className: "text-slate-400 text-lg font-medium max-w-lg mx-auto" }, "Discover the configuration perfectly synthesized for your enterprise ecosystem velocity.")
    ),
    React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch relative z-10" },
      [
        { name: "Operator Lite", price: "Free", desc: "For standard inference tests.", features: ["100 Operations / Day", "Standard Model Access", "Community Support"], accent: false },
        { name: "Executive Nexus", price: "$49", desc: "High capacity acceleration.", features: ["Unlimited Parallel Flows", "Advanced Multi-Agent API", "Priority Core Compute", "Custom Prompts"], accent: true },
        { name: "Monolith Core", price: "Custom", desc: "For heavy institutional grids.", features: ["Dedicated GPU Farm", "SOC-2 Hardened Compliance", "Dedicated 24/7 Engineer Team"], accent: false }
      ].map((tier, idx) => 
        React.createElement("div", { 
          key: idx, 
          className: `pricing-card rounded-[32px] p-10 flex flex-col transition-all duration-500 relative overflow-hidden ${tier.accent ? 'bg-[#0D111C] border-2 border-primary shadow-[0_20px_50px_rgba(99,102,241,0.2)] z-10 scale-105' : 'glass-card border border-white/5 shadow-xl opacity-90'}` 
        },
          tier.accent && React.createElement("div", { className: "absolute -inset-x-20 -top-20 aspect-square bg-gradient-to-b from-primary/20 to-transparent rounded-full blur-3xl pointer-events-none" }),
          tier.accent && React.createElement("div", { className: "absolute top-5 right-5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-[10px] font-black px-3 py-1 rounded-full tracking-widest uppercase shadow-xl flex items-center gap-1" }, 
             React.createElement(Sparkles, { className: "w-3 h-3" }), "OPTIMIZED"
          ),
          React.createElement("h3", { className: "text-sm font-black text-primary tracking-widest uppercase mb-2" }, tier.name),
          React.createElement("div", { className: "flex items-baseline gap-1 mb-2" },
             React.createElement("div", { className: "text-5xl font-black text-white" }, tier.price),
             tier.price !== "Custom" && tier.price !== "Free" && React.createElement("span", { className: "text-slate-500 text-sm" }, "/mo")
          ),
          React.createElement("p", { className: "text-slate-400 text-sm font-medium mb-8" }, tier.desc),
          
          React.createElement("div", { className: "space-y-4 mb-12 flex-grow" }, 
            tier.features.map((f, i) => React.createElement("div", { key: i, className: "flex items-start gap-3 text-slate-300 text-sm font-medium" },
              React.createElement("div", { className: "mt-0.5" }, React.createElement(CheckCircle2, { className: `w-4 h-4 ${tier.accent ? 'text-emerald-400' : 'text-slate-500'}` })), 
              f
            ))
          ),
          React.createElement("button", { 
            className: `w-full py-5 rounded-2xl font-black text-sm tracking-[0.15em] uppercase transition-all duration-300 shadow-lg hover:-translate-y-1 ${tier.accent ? 'bg-gradient-to-r from-primary to-indigo-600 text-white hover:shadow-[0_10px_30px_rgba(99,102,241,0.4)]' : 'bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10'}`
          }, tier.accent ? "INITIALIZE ACCESS" : "SELECT TIER")
        )
      )
    )
  );
};

const DocsView = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
      const ctx = gsap.context(() => {
         gsap.fromTo(".docs-aside", { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" });
         gsap.fromTo(".docs-main > *", { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.7, delay: 0.2 });
      }, containerRef);
      return () => ctx.revert();
  }, []);

  return React.createElement("div", {
    ref: containerRef,
    className: "pt-28 flex flex-col md:flex-row min-h-screen max-w-7xl mx-auto relative"
  },
    React.createElement("aside", { className: "docs-aside w-full md:w-72 border-r border-white/5 p-10 space-y-10 overflow-y-auto shrink-0" },
      React.createElement("div", null,
        React.createElement("h4", { className: "text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2" }, 
          React.createElement(BookOpen, { className: "w-4 h-4" }), "CORE INFRA"
        ),
        React.createElement("div", { className: "space-y-3" },
          ["Quick Start", "Architecture Matrix", "Node Configuration", "CLI Binary"].map((l, i) => 
            React.createElement("div", { key: i, className: `cursor-pointer flex items-center gap-2 text-sm font-bold px-3 py-2.5 rounded-lg transition-all ${i === 0 ? 'bg-primary/10 text-primary border border-primary/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}` }, 
              i === 0 && React.createElement("div", { className: "w-1.5 h-1.5 rounded-full bg-primary animate-pulse" }),
              l
            )
          )
        )
      ),
      React.createElement("div", null,
        React.createElement("h4", { className: "text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2" }, 
           React.createElement(Cpu, { className: "w-4 h-4" }), "API PROTOCOL"
        ),
        React.createElement("div", { className: "space-y-3 text-sm font-bold text-slate-400" },
          ["Authentication", "Dynamic Payloads", "Error Handling", "Rate Limits"].map((l, i) => 
            React.createElement("div", { key: i, className: "px-3 py-2.5 rounded-lg hover:text-white hover:bg-white/5 cursor-pointer transition-all" }, l)
          )
        )
      )
    ),
    React.createElement("main", { className: "docs-main flex-1 p-8 md:p-16 overflow-y-auto" },
      React.createElement("div", { className: "inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-6" }, "SYSTEM STABLE v2.4"),
      React.createElement("h1", { className: "text-5xl font-black text-white mb-6 tracking-tight" }, "Getting Started"),
      React.createElement("p", { className: "text-slate-400 mb-10 text-xl font-light leading-relaxed max-w-3xl" }, "The GS Prompt Hero framework facilitates hyper-distributed orchestration logic without requiring local binary hooks. Initialize standard compute endpoints via CLI directly below."),
      
      /* Code Terminal */
      React.createElement("div", { className: "glass-card bg-[#05070C] rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden group" },
        React.createElement("div", { className: "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-emerald-500" }),
        React.createElement("div", { className: "flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]" },
          React.createElement("div", { className: "flex items-center gap-2" },
            React.createElement("div", { className: "w-3 h-3 rounded-full bg-[#FF5F56]" }),
            React.createElement("div", { className: "w-3 h-3 rounded-full bg-[#FFBD2E]" }),
            React.createElement("div", { className: "w-3 h-3 rounded-full bg-[#27C93F]" })
          ),
          React.createElement("div", { className: "text-[10px] font-black text-slate-500 uppercase tracking-widest" }, "bash")
        ),
        React.createElement("div", { className: "p-8 font-mono text-sm leading-relaxed relative" },
          React.createElement("div", { className: "flex gap-4 mb-3" },
            React.createElement("span", { className: "text-slate-600 select-none" }, "$"),
            React.createElement("span", { className: "text-emerald-400 font-bold" }, "npm install -g gsprompthero")
          ),
          React.createElement("div", { className: "flex gap-4 mb-6" },
             React.createElement("span", { className: "text-slate-600 select-none" }, ">"),
             React.createElement("span", { className: "text-slate-500 italic animate-pulse" }, "Resolving dynamic network connections...")
          ),
          React.createElement("div", { className: "flex items-center gap-2 text-white bg-white/5 inline-block px-3 py-1 rounded-md mb-6 border border-white/5 shadow-inner" }, 
            React.createElement("span", null, "✅ SYSTEM SCAN COMPLETED: READY.")
          ),
          React.createElement("div", { className: "flex gap-4" },
            React.createElement("span", { className: "text-slate-600 select-none" }, "$"),
            React.createElement("span", { className: "text-emerald-400 font-bold" }, "hero init --matrix-node"),
            React.createElement("span", { className: "w-2 h-5 bg-indigo-500 animate-pulse" })
          )
        )
      ),
      
      React.createElement("div", { className: "mt-12 glass-card bg-indigo-500/5 border border-indigo-500/10 rounded-3xl p-8 flex gap-6 items-start transition-all hover:bg-indigo-500/10 hover:border-indigo-500/30" },
        React.createElement("div", { className: "w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0" },
           React.createElement(Terminal, { className: "w-6 h-6" })
        ),
        React.createElement("div", null,
          React.createElement("h4", { className: "text-xl font-black text-white mb-2 tracking-tight" }, "Neural Socket Injection"),
          React.createElement("p", { className: "text-slate-400 text-lg font-medium leading-relaxed" }, "Local telemetry dynamically tracks zero latent nodes during runtime orchestration. Monitor internal system heartbeat endpoints for instant pipeline status and throughput diagnostics.")
        )
      )
    )
  );
};


/* --- COMPONENT BUNDLE: ToolMatrix.js --- */




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

const ToolsDirectoryView = ({ onSelectTool }) => {
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

const SingleToolWorkspace = ({ toolId, onBack }) => {
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


/* --- COMPONENT BUNDLE: DesignCodeView.js --- */





// --- UPDATED MODERN PREMIUM ASSETS & ASSET SOURCES ---
const ASSETS = {
  logo: "https://www.gsgroups.net/gslogo.png",
  heroBg: "https://designcode.io/images/mockups/mockup3-bg.svg", // Will utilize parallax
  heroCard1: "https://designcode.io/images/mockups/mockup-card2.svg",
  heroContent: "https://designcode.io/images/mockups/mockup-content.svg",
  proIcon: "https://designcode.io/images/icons/pricing-large.svg"
};

const MasterBackground = () => {
  const bgRef = useRef(null);
  const circle1 = useRef(null);
  const circle2 = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Parallax on the circles linked to page scroll
      gsap.to(circle1.current, {
        y: -200,
        x: 100,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom top",
          scrub: 1.5
        }
      });

      gsap.to(circle2.current, {
        y: 300,
        x: -150,
        scale: 1.2,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom top",
          scrub: 2
        }
      });
    }, bgRef);
    return () => ctx.revert();
  }, []);

  return React.createElement("div", { ref: bgRef, className: "fixed inset-0 -z-10 bg-[#05050A] overflow-hidden" },
    React.createElement("img", { 
      src: ASSETS.heroBg, 
      className: "absolute top-0 left-0 w-full h-full object-cover opacity-20 mix-blend-overlay",
      alt: "" 
    }),
    React.createElement("div", {
      ref: circle1,
      className: "absolute top-[-15%] left-[-5%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-[#6366f1]/20 to-[#a855f7]/20 opacity-60 blur-[120px]"
    }),
    React.createElement("div", {
      ref: circle2,
      className: "absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-br from-[#ec4899]/10 to-[#3b82f6]/20 opacity-50 blur-[140px]"
    }),
    React.createElement("div", { className: "absolute inset-0 bg-gradient-to-b from-transparent via-[#05050A]/60 to-[#05050A]" })
  );
};

const HeroSectionEnhanced = ({ onAction }) => {
  const scopeRef = useRef(null);
  const card1 = useRef(null);
  const card2 = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      // Intro Reveal Timeline
      tl.from(".hero-eyebrow", { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" })
        .from(".hero-heading span", { 
          y: 50, 
          opacity: 0, 
          skewY: 5,
          stagger: 0.2, 
          duration: 0.8, 
          ease: "power4.out" 
        }, "-=0.3")
        .from(".hero-para", { y: 30, opacity: 0, duration: 0.8 }, "-=0.5")
        .from(".hero-btns", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
        .from(".hero-image-stack img", { 
          scale: 0.8, 
          opacity: 0, 
          rotate: 5, 
          stagger: 0.2, 
          duration: 1, 
          ease: "elastic.out(1, 0.8)" 
        }, "-=0.8");

      // Subtle persistent floating float for mockup items
      gsap.to(card1.current, {
        y: -20,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.to(card2.current, {
        y: 15,
        x: 5,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5
      });

      // Scroll Parallax for visual stacking
      gsap.to(".hero-image-stack img", {
        y: (i, el) => -100 * (i + 1),
        ease: "none",
        scrollTrigger: {
          trigger: scopeRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }, scopeRef);
    return () => ctx.revert();
  }, []);

  return React.createElement("section", { ref: scopeRef, className: "relative pt-36 pb-24 px-6 lg:px-16 flex flex-col lg:flex-row items-center gap-16 max-w-7xl mx-auto min-h-[90vh]" },
    React.createElement("div", { className: "flex-1 text-center lg:text-left z-10" },
      React.createElement("div", { className: "hero-eyebrow mb-6 inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full border-white/10" },
         React.createElement(Sparkles, { className: "w-4 h-4 text-indigo-400" }),
         React.createElement("span", { className: "text-xs font-bold text-indigo-200 uppercase tracking-widest" }, "Enterprise Gen-AI Platform")
      ),
      React.createElement("h1", { className: "hero-heading text-5xl md:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-8" }, 
        React.createElement("span", { className: "block" }, "Prompt The"), 
        React.createElement("span", { className: "text-gradient block mt-2" }, "Future Workflow")
      ),
      React.createElement("p", { className: "hero-para text-lg md:text-xl text-white/60 max-w-xl leading-relaxed mb-12 mx-auto lg:mx-0 font-light" }, 
        "The ultimate distributed ecosystem for autonomous prompt chains, logic extraction, and instant deployment. Orchestrate next-gen vectors with precision and speed."
      ),
      React.createElement("div", { className: "hero-btns flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start" },
        React.createElement(motion.button, {
          whileHover: { scale: 1.05, boxShadow: "0 0 40px rgba(99,102,241,0.4)" },
          whileTap: { scale: 0.98 },
          onClick: onAction,
          className: "group relative flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-black shadow-xl transition-all font-extrabold text-lg hover:bg-slate-100"
        },
          "Launch Matrix",
          React.createElement(ArrowRight, { className: "w-5 h-5 transition-transform group-hover:translate-x-1" })
        ),
        React.createElement("div", { className: "flex items-center gap-3 text-left pl-2" },
           React.createElement("div", { className: "w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20" }, 
             React.createElement(Terminal, { className: "w-5 h-5 text-indigo-400" })
           ),
           React.createElement("div", null,
             React.createElement("div", { className: "text-white font-bold text-sm" }, "v2.4 Runtime"),
             React.createElement("div", { className: "text-white/40 text-xs" }, "Distributed Core Activated")
           )
        )
      )
    ),
    React.createElement("div", { className: "hero-image-stack flex-1 relative w-full max-w-lg h-[350px] md:h-[500px]" },
      React.createElement("img", {
        ref: card1,
        src: ASSETS.heroCard1,
        alt: "Layer",
        className: "absolute top-0 right-0 w-full h-auto object-contain z-10 filter drop-shadow-[0_40px_80px_rgba(0,0,0,0.6)] transition-transform"
      }),
      React.createElement("img", {
        ref: card2,
        src: ASSETS.heroContent,
        alt: "Top layer",
        className: "absolute top-[15%] left-[-5%] w-[80%] h-auto object-contain z-20 filter drop-shadow-2xl transition-transform"
      })
    )
  );
};

const ScrollingTechStack = () => {
  const tech = [
    { name: "NEURAL ENG", icon: Cpu }, { name: "VECTOR DB", icon: Database },
    { name: "EXEC LOGIC", icon: Code }, { name: "DISTRIBUTED", icon: Globe },
    { name: "ACCELERATOR", icon: Zap }, { name: "ORCHESTRATOR", icon: Layers }
  ];
  
  return React.createElement("div", { className: "w-full py-10 border-y border-white/5 overflow-hidden relative bg-[#0a0a10]/50 backdrop-blur-md" },
    React.createElement(motion.div, {
      animate: { x: [0, -1200] },
      transition: { repeat: Infinity, duration: 35, ease: "linear" },
      className: "flex items-center gap-24 whitespace-nowrap w-max px-12"
    },
      [...tech, ...tech, ...tech, ...tech].map((t, idx) => 
        React.createElement("div", { key: idx, className: "flex items-center gap-3 opacity-40 hover:opacity-100 transition-opacity duration-300 font-extrabold tracking-widest text-slate-200 select-none text-xs" },
          React.createElement(t.icon, { className: "w-5 h-5 text-indigo-400" }),
          React.createElement("span", null, t.name)
        )
      )
    )
  );
};

const GridShowcase = () => {
  const container = useRef(null);
  const items = [
    { title: "Advanced Context Injection", desc: "Inject stateful environmental memories into neural stream responses dynamically.", icon: Sparkles, color: "from-indigo-500 to-cyan-400" },
    { title: "Autonomous Sub-Agent Chains", desc: "Build complex multi-step iterative logical loops across independent worker clusters.", icon: Layers, color: "from-purple-500 to-pink-500" },
    { title: "Zero-Latency Inference", desc: "Stream responses through high-velocity distribution edge nodes for sub-second handshakes.", icon: Zap, color: "from-amber-400 to-orange-500" },
    { title: "Encrypted Vector Isolation", desc: "Enterprise-grade logic guardrails ensures strictly compartmentalized execution.", icon: Shield, color: "from-emerald-400 to-teal-500" }
  ];

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".grid-card", {
        y: 80,
        opacity: 0,
        scale: 0.95,
        stagger: 0.15,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return React.createElement("section", { ref: container, className: "py-32 px-6 lg:px-12 max-w-7xl mx-auto" },
    React.createElement("div", { className: "text-center mb-20" },
      React.createElement("span", { className: "text-indigo-400 font-black tracking-[0.25em] text-xs mb-4 block uppercase" }, "Core Matrix Architecture"),
      React.createElement("h2", { className: "text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight" }, "Unparalleled Capabilities"),
      React.createElement("p", { className: "text-white/50 text-lg max-w-2xl mx-auto font-light" }, "We merged bleeding-edge prompt methodology with distributed compute engines to resolve enterprise challenges.")
    ),
    React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" },
      items.map((item, idx) => React.createElement("div", {
        key: idx,
        className: "grid-card group relative rounded-[32px] p-[1px] bg-white/5 hover:bg-white/10 transition-all cursor-pointer overflow-hidden shadow-2xl"
      },
        React.createElement("div", { className: `absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br ${item.color} blur-xl transition-all duration-500` }),
        React.createElement("div", { className: "relative h-full bg-[#0c0c14] glass-card p-8 flex flex-col rounded-[31px] border border-white/[0.04]" },
          React.createElement("div", { className: `w-14 h-14 rounded-2xl flex items-center justify-center mb-8 bg-gradient-to-br ${item.color} bg-opacity-10 relative` },
            React.createElement("div", { className: "absolute inset-0 opacity-20 rounded-2xl bg-white mix-blend-overlay" }),
            React.createElement(item.icon, { className: "w-6 h-6 text-white" })
          ),
          React.createElement("h3", { className: "text-xl font-bold text-white mb-4 leading-tight" }, item.title),
          React.createElement("p", { className: "text-white/50 text-sm font-light leading-relaxed mb-8" }, item.desc),
          React.createElement("div", { className: "mt-auto pt-4 flex justify-between items-center border-t border-white/5" },
            React.createElement("span", { className: "text-[10px] font-bold text-indigo-400 tracking-wider uppercase" }, "Enabled"),
            React.createElement(ArrowRight, { className: "w-4 h-4 text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all" })
          )
        )
      ))
    )
  );
};

const FeatureRow = () => {
  const rowRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".feat-content", {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rowRef.current,
          start: "top 75%",
        }
      });
      gsap.from(".feat-visual", {
        x: 60,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rowRef.current,
          start: "top 75%",
        }
      });
    }, rowRef);
    return () => ctx.revert();
  }, []);

  return React.createElement("section", { ref: rowRef, className: "py-24 px-6 lg:px-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center" },
    React.createElement("div", { className: "feat-content" },
       React.createElement("h2", { className: "text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight" }, "Streamlined Node Workspaces"),
       React.createElement("p", { className: "text-white/60 text-lg mb-8 leading-relaxed" }, "Control complex execution vectors from a unified visual board. No cognitive overload, just raw logical clarity."),
       React.createElement("ul", { className: "space-y-4" },
         ["Live Trace Visualization", "Parallel Branching Chains", "Integrated Sandbox Runtimes"].map((x, i) => 
           React.createElement("li", { key: i, className: "flex items-center gap-3 text-white/80" },
             React.createElement("div", { className: "w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center" }, React.createElement(Check, { className: "w-3 h-3 text-emerald-400" })),
             React.createElement("span", { className: "text-sm font-medium" }, x)
           )
         )
       )
    ),
    React.createElement("div", { className: "feat-visual relative aspect-video glass-card rounded-3xl border border-white/10 p-4 bg-black/40 overflow-hidden group" },
      React.createElement("div", { className: "absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" }),
      React.createElement("div", { className: "flex gap-1.5 mb-4 items-center" },
        [1,2,3].map(c => React.createElement("div", { key: c, className: "w-3 h-3 rounded-full bg-white/10" }))
      ),
      React.createElement("div", { className: "w-full h-full rounded-xl bg-[#0c0c14] border border-white/5 flex items-center justify-center relative font-mono text-indigo-500/50 text-xs select-none" },
        "// System Live Render Active",
        React.createElement(Terminal, { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 opacity-10" })
      )
    )
  );
};

const UltimateCTA = ({ onAction }) => {
  return React.createElement("section", { className: "py-32 px-6" },
    React.createElement(motion.div, {
      whileInView: { y: [50, 0], opacity: [0, 1] },
      viewport: { once: true },
      transition: { duration: 1, ease: "easeOut" },
      className: "max-w-4xl mx-auto text-center relative glass-card rounded-[40px] p-12 md:p-20 border border-indigo-500/20 bg-[#0a0a18] overflow-hidden"
    },
      React.createElement("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" }),
      React.createElement("h2", { className: "text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight" }, "Ready to Accelerate?"),
      React.createElement("p", { className: "text-white/50 text-lg mb-10 max-w-lg mx-auto font-light" }, "Deploy the dynamic ecosystem in under 60 seconds. No overhead, just instant scale."),
      React.createElement("button", {
        onClick: onAction,
        className: "px-10 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg shadow-[0_0_40px_rgba(99,102,241,0.3)] hover:scale-105 transition-all hover:shadow-[0_0_60px_rgba(99,102,241,0.5)]"
      }, "Initialize Ecosystem")
    )
  );
};

const SubNavbar = () => {
  return React.createElement("nav", { className: "fixed top-0 inset-x-0 z-50 h-16 glass border-b border-white/[0.05] flex items-center justify-between px-8 md:px-16" },
    React.createElement("div", { className: "flex items-center gap-3 cursor-pointer group" },
      React.createElement("img", { src: ASSETS.logo, alt: "Logo", className: "h-7 w-auto transition-transform group-hover:rotate-12" }),
      React.createElement("span", { className: "font-black text-lg tracking-[0.15em] text-white" }, "GUIDESOFT")
    ),
    React.createElement("div", { className: "hidden md:flex items-center gap-10 text-xs font-bold text-white/50 tracking-widest" },
      ["MATRIX", "NODES", "LOGIC", "DOCS"].map((item) => 
        React.createElement("a", { key: item, className: "hover:text-white transition-all cursor-pointer relative group" }, 
          item,
          React.createElement("div", { className: "absolute -bottom-1 left-0 w-0 h-[1px] bg-indigo-500 group-hover:w-full transition-all duration-300" })
        )
      )
    ),
    React.createElement("div", { className: "flex items-center gap-4" },
      React.createElement("button", { className: "px-5 py-2 rounded-xl bg-white/5 border border-white/10 text-white/80 font-bold text-xs tracking-widest hover:bg-white/10 transition-all" }, "LOGIN")
    )
  );
};

const DesignCodeMasterView = ({ onAction }) => {
  // Smooth entrance wrapper
  useLayoutEffect(() => {
     window.scrollTo(0,0);
  }, []);

  return React.createElement("main", { className: "relative min-h-screen w-full text-white overflow-x-hidden flex flex-col font-sans selection:bg-indigo-500 selection:text-white" },
    React.createElement(MasterBackground),
    // Reusing simple internal Navbar specific to this view to show distinct polish, 
    // though logically linked to root frame via container if needed.
    React.createElement(HeroSectionEnhanced, { onAction }),
    React.createElement(ScrollingTechStack),
    React.createElement(GridShowcase),
    React.createElement(FeatureRow),
    React.createElement(UltimateCTA, { onAction }),
    React.createElement("footer", { className: "py-16 border-t border-white/5 glass text-center mt-20" },
       React.createElement("img", { src: ASSETS.logo, className: "h-6 mx-auto opacity-30 mb-4 filter grayscale", alt: "" }),
       React.createElement("p", { className: "text-white/20 text-[10px] font-bold tracking-widest" }, "GUIDESOFT AI ECOSYSTEM © 2026. ALL RIGHTS RESERVED.")
    )
  );
};


/* --- COMPONENT BUNDLE: page.js --- */







function App() {
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


/* --- DYNAMIC APP BOOTSTRAP --- */
const bootApp = () => {
    const container = document.getElementById('root');
    if (!container) return console.error('FATAL: Root DOM not found.');
    const root = createRoot(container);
    // React components resolved through linear scoping in standard JS bundle
    root.render(React.createElement(App));
    console.log('🚀 GS PROMPT HERO: Application Activated Successfully.');
};

// Execute bootstrap on immediate listener ready event.
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootApp);
} else {
    bootApp();
}
