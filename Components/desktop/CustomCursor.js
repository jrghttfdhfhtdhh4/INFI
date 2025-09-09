
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor({ position, type }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  if (!isVisible) return null;

  const getCursorStyles = () => {
    switch (type) {
      case 'grabbing':
        return {
          scale: 1.2,
          backgroundColor: 'rgba(239, 68, 68, 0.8)',
          border: 'none',
        };
      case 'hover':
        return {
          scale: 1.8,
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          border: 'none'
        };
      default:
        return {
          scale: 1,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          border: '1px solid rgba(239, 68, 68, 0.5)',
        };
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999] mix-blend-difference"
      style={{
        x: position.x - 6,
        y: position.y - 6,
      }}
      animate={getCursorStyles()}
      transition={{
        type: "spring",
        stiffness: 800,
        damping: 40,
        mass: 0.5
      }}
    >
    </motion.div>
  );
}
