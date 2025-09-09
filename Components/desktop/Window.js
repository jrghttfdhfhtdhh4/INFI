
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { X, Minus, Maximize2 } from "lucide-react";

export default function Window({ 
  windowData, 
  children, 
  onClose, 
  onMinimize, 
  onFocus,
  onCursorChange 
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const dragRef = useRef(null);

  const handleMouseDown = () => {
    setIsDragging(true);
    onFocus(windowData.id);
    onCursorChange('grabbing');
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    onCursorChange('default');
  };

  if (windowData.isMinimized) return null;

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0}
      onDragStart={handleMouseDown}
      onDragEnd={handleMouseUp}
      initial={{ 
        scale: 0.8, 
        opacity: 0,
        x: windowData.position.x,
        y: windowData.position.y
      }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        x: windowData.position.x,
        y: windowData.position.y,
        zIndex: windowData.isFocused ? 100 : 50,
        boxShadow: windowData.isFocused ? '0 0 30px rgba(239, 68, 68, 0.3)' : '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }}
      exit={{ scale: 0.8, opacity: 0 }}
      style={{
        width: windowData.size.width,
        height: windowData.size.height
      }}
      className={`absolute bg-neutral-900/95 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden`}
      onClick={() => onFocus(windowData.id)}
    >
      {/* Window Header */}
      <div 
        ref={dragRef}
        className="flex items-center justify-between h-10 px-4 bg-black/30 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.2, backgroundColor: '#ef4444' }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                onClose(windowData.id);
              }}
              className="w-3 h-3 bg-neutral-700 rounded-full flex items-center justify-center group"
            >
              <X className="w-2 h-2 text-transparent group-hover:text-black" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.2, backgroundColor: '#ef4444' }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                onMinimize(windowData.id);
              }}
              className="w-3 h-3 bg-neutral-700 rounded-full flex items-center justify-center group"
            >
                <Minus className="w-2 h-2 text-transparent group-hover:text-black" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.2, backgroundColor: '#ef4444' }}
              whileTap={{ scale: 0.9 }}
              className="w-3 h-3 bg-neutral-700 rounded-full flex items-center justify-center group"
            >
                <Maximize2 className="w-2 h-2 text-transparent group-hover:text-black" />
            </motion.button>
          </div>
          
          <div className="text-sm font-medium text-white/80 capitalize">
            {windowData.type}
          </div>
        </div>
      </div>

      {/* Window Content */}
      <div className="h-full pb-10 overflow-hidden bg-neutral-900">
        {children}
      </div>

      {/* Resize Handle */}
      <div 
        className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
        onMouseDown={() => setIsResizing(true)}
      >
        <div className="absolute bottom-1 right-1 w-1 h-1 border-b-2 border-r-2 border-white/20 transform rotate-45" />
      </div>
    </motion.div>
  );
}
