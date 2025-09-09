import React from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  Grid3X3, 
  Wifi, 
  Battery, 
  Volume2, 
  User,
  Folder,
  Calculator,
  FileText,
  Globe,
  Music
} from "lucide-react";

export default function Taskbar({ 
  user,
  windows, 
  currentTime, 
  onStartMenuToggle, 
  onNotificationsToggle,
  onWindowFocus,
  onMinimize,
  onOpenApp 
}) {
  const taskbarApps = [
    { id: 'finder', icon: Folder, name: 'Finder', type: 'finder' },
    { id: 'calculator', icon: Calculator, name: 'Calculator', type: 'calculator' },
    { id: 'notes', icon: FileText, name: 'Notes', type: 'notes' },
    { id: 'browser', icon: Globe, name: 'Browser', type: 'browser' },
    { id: 'music', icon: Music, name: 'Music', type: 'music' },
  ];

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString([], { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="absolute bottom-0 left-0 right-0 h-16 bg-black/60 backdrop-blur-xl border-t border-white/10"
    >
      <div className="flex items-center justify-between h-full px-4">
        {/* Start Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStartMenuToggle}
          className="flex items-center justify-center w-12 h-12 rounded-xl bg-black/50 hover:bg-white/10 transition-all duration-300 border border-white/10"
        >
          <Grid3X3 className="w-6 h-6 text-red-500" />
        </motion.button>

        {/* App Dock */}
        <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-2xl p-2 border border-white/10">
          {taskbarApps.map((app) => {
            const isActive = windows.some(w => w.type === app.type && !w.isMinimized);
            const AppIcon = app.icon;
            
            return (
              <motion.button
                key={app.id}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  const existingWindow = windows.find(w => w.type === app.type);
                  if (existingWindow) {
                    if (existingWindow.isFocused && !existingWindow.isMinimized) {
                      onMinimize(existingWindow.id);
                    } else {
                      onWindowFocus(existingWindow.id);
                    }
                  } else {
                    onOpenApp(app.type);
                  }
                }}
                className={`relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-white/20'
                    : 'hover:bg-white/10'
                }`}
              >
                <AppIcon className={`w-6 h-6 transition-colors duration-300 ${isActive ? 'text-red-500' : 'text-white/80'}`} />
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full" />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* System Tray */}
        <div className="flex items-center gap-3 text-white/80">
          <div className="flex items-center gap-2 text-red-500">
            <Wifi className="w-4 h-4" />
            <Battery className="w-4 h-4" />
            <Volume2 className="w-4 h-4" />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={onNotificationsToggle}
            className="text-right hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200"
          >
            <div className="text-sm font-medium text-white">{formatTime(currentTime)}</div>
            <div className="text-xs text-white/70">{formatDate(currentTime)}</div>
          </motion.button>

          <motion.button
            onClick={onStartMenuToggle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-200"
          >
            <User className="w-4 h-4 text-red-500" />
            <span className="text-sm font-medium text-white/80">{user.username}</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
