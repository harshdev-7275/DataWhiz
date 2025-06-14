
import React from 'react';

const BackgroundEffects = () => {
  return (
    <>
      {/* Main background with grid pattern */}
      <div className="fixed inset-0 ai-grid-pattern opacity-30"></div>
      
      {/* Animated gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-ai-blue/20 to-ai-cyan/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-ai-purple/20 to-ai-blue/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-ai-cyan/10 to-ai-purple/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating geometric shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-2 h-2 bg-ai-blue rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-ai-cyan rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-32 left-40 w-1.5 h-1.5 bg-ai-purple rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-ai-blue rounded-full animate-pulse delay-1500"></div>
        <div className="absolute top-60 left-1/3 w-1 h-1 bg-ai-cyan rounded-full animate-pulse delay-2000"></div>
      </div>

      {/* Neural network lines */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#00FFE1" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <line x1="10%" y1="20%" x2="30%" y2="10%" stroke="url(#lineGradient)" strokeWidth="1" />
          <line x1="70%" y1="15%" x2="90%" y2="25%" stroke="url(#lineGradient)" strokeWidth="1" />
          <line x1="20%" y1="80%" x2="40%" y2="90%" stroke="url(#lineGradient)" strokeWidth="1" />
          <line x1="60%" y1="85%" x2="80%" y2="75%" stroke="url(#lineGradient)" strokeWidth="1" />
          <line x1="5%" y1="50%" x2="25%" y2="60%" stroke="url(#lineGradient)" strokeWidth="1" />
          <line x1="75%" y1="40%" x2="95%" y2="50%" stroke="url(#lineGradient)" strokeWidth="1" />
        </svg>
      </div>
    </>
  );
};

export default BackgroundEffects;