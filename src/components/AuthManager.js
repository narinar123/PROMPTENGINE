import React, { useState, createContext, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Lock, Settings, Key, LogIn, LogOut, UserPlus, AlertTriangle } from "lucide-react";

const AuthContext = createContext({
  user: null,
  role: "guest",
  loading: false,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

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

export const AuthManager = ({ children }) => {
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

export const RoleSwitcher = () => {
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

