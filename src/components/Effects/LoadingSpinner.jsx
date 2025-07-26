import React, { useState, useEffect } from 'react';

const LoadingSpinner = () => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Loading');

  // Simulate loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 0; // Reset for demo
        return prev + Math.random() * 15;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  // Animate loading text
  useEffect(() => {
    const texts = ['Loading', 'Loading.', 'Loading..', 'Loading...'];
    let index = 0;
    
    const interval = setInterval(() => {
      setLoadingText(texts[index]);
      index = (index + 1) % texts.length;
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main loading container */}
      <div className="relative z-10">
        {/* Outer glow ring */}
        <div className="absolute inset-0 w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20 blur-xl animate-pulse"></div>
        
        {/* Multiple spinning rings */}
        <div className="relative w-32 h-32">
          {/* Outer ring */}
          <div className="absolute inset-0 w-32 h-32 border-2 border-transparent rounded-full border-t-blue-400 border-r-purple-400 animate-spin"></div>
          
          {/* Middle ring */}
          <div className="absolute border-2 border-transparent rounded-full inset-2 w-28 h-28 border-t-purple-400 border-l-pink-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          
          {/* Inner ring */}
          <div className="absolute w-24 h-24 border-2 border-transparent rounded-full inset-4 border-t-pink-400 border-b-blue-400 animate-spin" style={{ animationDuration: '2s' }}></div>
          
          {/* Core spinning element */}
          <div className="absolute w-20 h-20 rounded-full inset-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-80 animate-spin" style={{ animationDuration: '3s' }}>
            <div className="absolute flex items-center justify-center w-16 h-16 rounded-full inset-2 bg-slate-900">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-64 mx-auto mt-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-white/80">{loadingText}</span>
            <span className="text-sm font-medium text-white/60">{Math.round(progress)}%</span>
          </div>
          
          <div className="w-full h-2 overflow-hidden rounded-full bg-slate-800">
            <div className="relative h-full transition-all duration-300 ease-out rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                 style={{ width: `${Math.min(progress, 100)}%` }}>
              <div className="absolute inset-0 bg-white opacity-30 animate-pulse"></div>
              {/* Moving shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-40 animate-pulse" 
                   style={{ animation: 'shine 2s ease-in-out infinite' }}></div>
            </div>
          </div>
        </div>

        {/* Status indicators */}
        <div className="flex justify-center mt-6 space-x-2">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                progress > i * 25 
                  ? 'bg-gradient-to-r from-blue-400 to-purple-400 scale-125' 
                  : 'bg-slate-600 scale-100'
              }`}
              style={{ 
                animation: progress > i * 25 ? 'bounce 1s ease-in-out infinite' : 'none',
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </div>

        {/* Floating elements */}
        <div className="absolute w-3 h-3 bg-blue-400 rounded-full -top-4 -left-4 opacity-60 animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="absolute w-2 h-2 bg-purple-400 rounded-full -top-2 -right-6 opacity-60 animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute w-4 h-4 bg-pink-400 rounded-full -bottom-4 -right-4 opacity-60 animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute w-2 h-2 bg-blue-400 rounded-full -bottom-2 -left-6 opacity-60 animate-bounce" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* Custom keyframes */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes shine {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0) scale(1); }
          40%, 43% { transform: translate3d(0,-10px,0) scale(1.1); }
          70% { transform: translate3d(0,-5px,0) scale(1.05); }
          90% { transform: translate3d(0,-2px,0) scale(1.02); }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;