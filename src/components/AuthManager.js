import React, { useState, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Lock, Settings, Key } from "lucide-react";

const AuthContext = createContext({
  user: null,
  role: "guest",
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthManager = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("guest");

  const login = (u, r) => {
    setUser(u);
    setRole(r);
  };
  
  const logout = () => {
    setUser(null);
    setRole("guest");
  };

  return React.createElement(AuthContext.Provider, { value: { user, role, login, logout } }, children);
};

export const RoleSwitcher = () => {
  const { user, role, login, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const roles = ["guest", "editor", "admin", "super"];

  return React.createElement("div", { className: "fixed top-4 right-4 z-50 flex gap-3 items-center" }, 
    user && React.createElement("div", { className: "glass px-4 py-2 rounded-full text-xs font-semibold tracking-wide flex items-center gap-2" }, 
      React.createElement("span", { className: "w-2 h-2 rounded-full bg-green-500 animate-pulse" }),
      role.toUpperCase(), " MODE"
    ),
    React.createElement("button", { 
      onClick: () => setIsOpen(!isOpen),
      className: "w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
    }, React.createElement(User, { className: "w-5 h-5" })),
    React.createElement(AnimatePresence, null, 
      isOpen && React.createElement(motion.div, { 
        initial: { opacity: 0, scale: 0.9, y: 10 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.9, y: 10 },
        className: "absolute right-0 top-14 w-64 glass border border-white/10 rounded-2xl p-4 shadow-2xl overflow-hidden"
      }, 
        React.createElement("div", { className: "font-bold text-sm text-white mb-4 flex items-center gap-2" }, 
          React.createElement(Key, { className: "w-4 h-4 text-primary" }), 
          " Universal ID System"
        ),
        React.createElement("div", { className: "space-y-2" }, 
          roles.map((r) => React.createElement("button", {
            key: r,
            onClick: () => { login("DemoUser", r); setIsOpen(false); },
            className: `w-full flex justify-between items-center p-3 rounded-xl transition-all text-sm ${role === r && user ? 'bg-primary text-white' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`
          }, 
            React.createElement("span", { className: "capitalize" }, r),
            r === 'super' ? React.createElement(Lock, { className: "w-3 h-3 opacity-70" }) : React.createElement(Settings, { className: "w-3 h-3 opacity-50" })
          )),
          user && React.createElement("button", { 
            onClick: () => { logout(); setIsOpen(false); },
            className: "w-full mt-4 p-2 border border-red-500/30 bg-red-500/10 text-red-400 rounded-xl text-xs hover:bg-red-500/20 transition-colors"
          }, "Terminate Session")
        )
      )
    )
  );
};
