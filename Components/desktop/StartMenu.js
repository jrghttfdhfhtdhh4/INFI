import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Power, Settings, User, LogOut } from "lucide-react";

export default function StartMenu({ user, onClose, onOpenApp, onLogout }) {
  const [searchQuery, setSearchQuery] = useState('');

  const apps = [
    { id: 'calculator', name: 'Calculator', icon: '🧮', type: 'calculator' },
    { id: 'notes', name: 'Notes', icon: '📝', type: 'notes' },
    { id: 'finder', name: 'Finder', icon: '📁', type: 'finder' },
    { id: 'browser', name: 'Browser', icon: '🌐', type: 'browser' },
    { id: 'music', name: 'Music', icon: '🎵', type: 'music' },
    { id: 'photos', name: 'Photos', icon: '🖼️', type: 'photos' },
    { id: 'calendar', name: 'Calendar', icon: '📅', type: 'calendar' },
    { id: 'mail', name: 'Mail', icon: '✉️', type: 'mail' },
  ];

  const filteredApps = apps.filter(app => 
    app.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      className="absolute bottom-20 left-4 w-96 h-[500px] bg-neutral-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden text-white"
    >
      {/* Search Bar */}
      <div className="p-4 border-b border-white/10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="text"
            placeholder="Search apps..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-black/30 text-white rounded-xl border border-white/10 focus:ring-2 focus:ring-red-500 focus:bg-black/50 transition-all duration-200"
          />
        </div>
      </div>

      {/* Apps Grid */}
      <div className="p-4 flex-1 overflow-y-auto">
        <div className="grid grid-cols-4 gap-4">
          {filteredApps.map((app) => (
            <motion.button
              key={app.id}
              whileHover={{ scale: 1.05, y: -2, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                onOpenApp(app.type);
                onClose();
              }}
              className="flex flex-col items-center p-3 rounded-xl transition-all duration-200 group"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-200">
                {app.icon}
              </div>
              <span className="text-xs font-medium text-white/80 text-center">
                {app.name}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-white/10 bg-black/30">
        <div className="flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200"
          >
            <User className="w-4 h-4 text-red-500" />
            <span className="text-sm font-medium text-white/80">{user.username}</span>
          </motion.button>
          
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg hover:bg-white/5 transition-all duration-200"
            >
              <Settings className="w-4 h-4 text-white/60" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(239, 68, 68, 0.2)' }}
              whileTap={{ scale: 0.9 }}
              onClick={onLogout}
              className="p-2 rounded-lg transition-all duration-200"
            >
              <LogOut className="w-4 h-4 text-red-500" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
