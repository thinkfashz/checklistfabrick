import React from 'react';

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
        <div 
          className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-fabrick-lava/20 blur-[120px] rounded-full opacity-10" 
        />
        <div 
          className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-fabrick-yellow/10 blur-[100px] rounded-full opacity-5" 
        />
      </div>

      {/* Animated Lines or Accents */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            style={{ top: `${20 + i * 30}%`, left: '-50%' }}
            className="absolute h-[1px] w-1/2 bg-gradient-to-r from-transparent via-fabrick-lava/30 to-transparent rotate-[-15deg]"
          />
        ))}
        
        {/* Vertical Scanning Line */}
        <div
          className="absolute inset-y-0 left-1/2 w-[1px] bg-gradient-to-b from-transparent via-fabrick-yellow/20 to-transparent"
        />
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-fabrick-black/20 via-transparent to-fabrick-black/80" />
    </div>
  );
}
