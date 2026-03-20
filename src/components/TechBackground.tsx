import React from 'react';
import { motion } from 'framer-motion';

interface TechBackgroundProps {
  className?: string;
}

export default function TechBackground({ className = "" }: TechBackgroundProps) {
  return (
    <div className={`absolute inset-0 z-0 pointer-events-none overflow-hidden bg-fabrick-black ${className}`}>
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.15]" 
        style={{ 
          backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} 
      />
      
      {/* Radial Glows */}
      <div className="absolute top-0 left-0 w-full h-full">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-fabrick-lava/20 blur-[120px] rounded-full" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.1, 0.05],
            x: [0, -40, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-fabrick-yellow/10 blur-[100px] rounded-full" 
        />
      </div>

      {/* Animated Lines or Accents */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: '-100%', y: `${20 + i * 30}%` }}
            animate={{ x: '200%' }}
            transition={{ 
              duration: 15 + i * 5, 
              repeat: Infinity, 
              ease: "linear",
              delay: i * 4
            }}
            className="absolute h-[1px] w-1/2 bg-gradient-to-r from-transparent via-fabrick-lava/30 to-transparent rotate-[-15deg]"
          />
        ))}
        
        {/* Vertical Scanning Line */}
        <motion.div
          animate={{ x: ['0%', '100%', '0%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-y-0 w-[1px] bg-gradient-to-b from-transparent via-fabrick-yellow/20 to-transparent"
        />
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-fabrick-black/20 via-transparent to-fabrick-black/80" />
    </div>
  );
}
