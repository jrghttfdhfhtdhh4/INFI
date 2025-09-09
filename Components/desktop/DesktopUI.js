import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DesktopWallpaper from "./DesktopWallpaper";
import Taskbar from "./Taskbar";
import WindowManager from "./WindowManager";
import StartMenu from "./StartMenu";
import CustomCursor from "./CustomCursor";
import NotificationCenter from "./NotificationCenter";

export default function DesktopUI({ user, onLogout }) {
  const [windows, setWindows] = useState([]);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorType, setCursorType] = useState('default');
  const desktopRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000 * 60); // Update every minute
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const openWindow = (appType, props = {}) => {
    const newWindow = {
      id: Date.now(),
      type: appType,
      props,
      position: { x: 100 + windows.length * 30, y: 100 + windows.length * 30 },
      size: { width: 800, height: 600 },
      isMinimized: false,
      isFocused: true
    };
    
    setWindows(prev => [
      ...prev.map(w => ({ ...w, isFocused: false })),
      newWindow
    ]);
  };

  const closeWindow = (windowId) => {
    setWindows(prev => prev.filter(w => w.id !== windowId));
  };

  const minimizeWindow = (windowId) => {
    setWindows(prev => 
      prev.map(w => 
        w.id === windowId ? { ...w, isMinimized: !w.isMinimized } : w
      )
    );
  };

  const focusWindow = (windowId) => {
    setWindows(prev => 
      prev.map(w => ({
        ...w,
        isFocused: w.id === windowId,
        isMinimized: w.id === windowId ? false : w.isMinimized
      }))
    );
  };

  const handleDesktopClick = (e) => {
    if (e.target === desktopRef.current) {
      setShowStartMenu(false);
      setShowNotifications(false);
      setWindows(prev => prev.map(w => ({ ...w, isFocused: false })));
    }
  };

  return (
    <div 
      ref={desktopRef}
      className="relative w-full h-screen overflow-hidden bg-black"
      onClick={handleDesktopClick}
      onContextMenu={(e) => e.preventDefault()}
    >
      <CustomCursor position={cursorPosition} type={cursorType} />
      
      <DesktopWallpaper />
      
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-4 left-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white/80 text-sm font-medium bg-black/50 backdrop-blur-sm px-3 py-2 rounded-xl border border-white/10"
          >
            INFI OS // Logged in as: {user.username}
          </motion.div>
        </div>
      </div>

      <WindowManager 
        windows={windows}
        onClose={closeWindow}
        onMinimize={minimizeWindow}
        onFocus={focusWindow}
        onCursorChange={setCursorType}
      />

      <AnimatePresence>
        {showStartMenu && (
          <StartMenu 
            user={user}
            onClose={() => setShowStartMenu(false)}
            onOpenApp={openWindow}
            onLogout={onLogout}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showNotifications && (
          <NotificationCenter 
            onClose={() => setShowNotifications(false)}
          />
        )}
      </AnimatePresence>

      <Taskbar 
        user={user}
        windows={windows}
        currentTime={currentTime}
        onStartMenuToggle={() => setShowStartMenu(!showStartMenu)}
        onNotificationsToggle={() => setShowNotifications(!showNotifications)}
        onWindowFocus={focusWindow}
        onMinimize={minimizeWindow}
        onOpenApp={openWindow}
      />
    </div>
  );
}
