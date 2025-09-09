import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Account } from "@/entities/Account";
import { User, Lock, ArrowRight, UserPlus, X } from "lucide-react";

export default function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!username || !password) {
      setError("Username and password are required.");
      setIsLoading(false);
      return;
    }

    try {
      const results = await Account.filter({ username });
      if (results.length > 0 && results[0].password === password) {
        onLogin(results[0]);
      } else {
        setError("Invalid username or password.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const CreateAccountForm = () => {
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [createError, setCreateError] = useState("");
    const [createLoading, setCreateLoading] = useState(false);
  
    const handleCreateAccount = async (e) => {
        e.preventDefault();
        setCreateLoading(true);
        setCreateError("");
    
        if (!newUsername || !newPassword || !confirmPassword) {
            setCreateError("All fields are required.");
            setCreateLoading(false);
            return;
        }
    
        if (newPassword !== confirmPassword) {
            setCreateError("Passwords do not match.");
            setCreateLoading(false);
            return;
        }
    
        try {
            const existing = await Account.filter({ username: newUsername });
            if (existing.length > 0) {
                setCreateError("Username already taken.");
                setCreateLoading(false);
                return;
            }
    
            const newUser = await Account.create({ username: newUsername, password: newPassword });
            onLogin(newUser);
        } catch (err) {
            setCreateError("Could not create account. Please try again.");
        } finally {
            setCreateLoading(false);
        }
    };
  
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center"
        >
            <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-neutral-900 border border-white/10 rounded-2xl p-8 w-96 relative"
            >
                <motion.button 
                    onClick={() => setShowCreateAccount(false)}
                    className="absolute top-4 right-4 text-white/50 hover:text-white"
                >
                    <X />
                </motion.button>
                <h2 className="text-3xl font-bold text-white mb-2 text-center">Create Account</h2>
                <p className="text-white/50 mb-8 text-center">Join the INFI experience.</p>
                <form onSubmit={handleCreateAccount} className="space-y-4">
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500"/>
                        <input type="text" placeholder="Username" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-black/30 text-white rounded-lg border border-white/10 focus:ring-2 focus:ring-red-500 focus:outline-none"/>
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500"/>
                        <input type="password" placeholder="Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-black/30 text-white rounded-lg border border-white/10 focus:ring-2 focus:ring-red-500 focus:outline-none"/>
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500"/>
                        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-black/30 text-white rounded-lg border border-white/10 focus:ring-2 focus:ring-red-500 focus:outline-none"/>
                    </div>
                    {createError && <p className="text-red-500 text-sm">{createError}</p>}
                    <motion.button type="submit" whileHover={{scale: 1.02}} whileTap={{scale: 0.98}} disabled={createLoading} className="w-full py-3 bg-red-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2">
                        {createLoading ? "Creating..." : "Create & Login"}
                    </motion.button>
                </form>
            </motion.div>
        </motion.div>
    );
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-red"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black to-black"></div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="text-center z-10">
            <h1 className="text-8xl font-bold tracking-tighter mb-4">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h1>
            <p className="text-2xl text-white/70">{currentTime.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-16 w-80 z-10">
            <form onSubmit={handleLogin} className="space-y-4 p-6 bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl">
                <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500"/>
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-black/30 text-white rounded-lg border border-white/10 focus:ring-2 focus:ring-red-500 focus:outline-none"/>
                </div>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500"/>
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-black/30 text-white rounded-lg border border-white/10 focus:ring-2 focus:ring-red-500 focus:outline-none"/>
                </div>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <motion.button type="submit" whileHover={{scale: 1.02}} whileTap={{scale: 0.98}} disabled={isLoading} className="w-full py-3 bg-red-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2">
                    {isLoading ? "Logging in..." : "Login"}
                    <ArrowRight className="w-5 h-5"/>
                </motion.button>
            </form>
             <div className="text-center mt-4">
                <button onClick={() => setShowCreateAccount(true)} className="text-sm text-white/50 hover:text-white flex items-center gap-2 justify-center">
                    <UserPlus className="w-4 h-4"/>
                    Create a new account
                </button>
            </div>
        </motion.div>
        <AnimatePresence>
            {showCreateAccount && <CreateAccountForm />}
        </AnimatePresence>
        <style>{`
            .bg-grid-red {
                background-image: 
                    linear-gradient(rgba(239, 68, 68, 0.1) 1px, transparent 1px), 
                    linear-gradient(90deg, rgba(239, 68, 68, 0.1) 1px, transparent 1px);
                background-size: 40px 40px;
            }
        `}</style>
    </div>
  );
}
