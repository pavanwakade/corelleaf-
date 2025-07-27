import React, { useEffect, useState } from 'react';
import { ArrowRight, Code, Smartphone, Cloud, Sparkles, Zap, Rocket, Star, Globe, Shield } from 'lucide-react';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      
      // Smooth transition with requestAnimationFrame
      requestAnimationFrame(() => {
        setMousePosition({ x, y });
      });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const floatingCards = [
    { icon: Code, text: 'Web Development', color: 'blue', position: 'top-left' },
    { icon: Smartphone, text: 'Mobile Apps', color: 'green', position: 'bottom-right' },
    { icon: Cloud, text: 'Cloud Solutions', color: 'purple', position: 'middle-right' },
    { icon: Globe, text: 'Digital Strategy', color: 'indigo', position: 'top-right' },
    { icon: Shield, text: 'Cybersecurity', color: 'red', position: 'bottom-left' },
    { icon: Star, text: 'UI/UX Design', color: 'yellow', position: 'middle-left' }
  ];

  const getCardPosition = (position) => {
    const positions = {
      'top-left': '-top-6 -left-6 md:-top-8 md:-left-8',
      'top-right': '-top-6 -right-6 md:-top-8 md:-right-8',
      'bottom-left': '-bottom-6 -left-6 md:-bottom-8 md:-left-8',
      'bottom-right': '-bottom-6 -right-6 md:-bottom-8 md:-right-8',
      'middle-right': 'top-1/2 -right-6 md:-right-8 transform -translate-y-1/2',
      'middle-left': 'top-1/2 -left-6 md:-left-8 transform -translate-y-1/2'
    };
    return positions[position] || '';
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: 'border-blue-200/60 bg-blue-50/90 text-blue-600 hover:bg-blue-100/95 hover:border-blue-300/80',
      green: 'border-green-200/60 bg-green-50/90 text-green-600 hover:bg-green-100/95 hover:border-green-300/80',
      purple: 'border-purple-200/60 bg-purple-50/90 text-purple-600 hover:bg-purple-100/95 hover:border-purple-300/80',
      indigo: 'border-indigo-200/60 bg-indigo-50/90 text-indigo-600 hover:bg-indigo-100/95 hover:border-indigo-300/80',
      red: 'border-red-200/60 bg-red-50/90 text-red-600 hover:bg-red-100/95 hover:border-red-300/80',
      yellow: 'border-yellow-200/60 bg-yellow-50/90 text-yellow-600 hover:bg-yellow-100/95 hover:border-yellow-300/80'
    };
    return colors[color] || colors.blue;
  };

  return (
    <section 
      id="hero" 
      className="relative flex items-center min-h-screen pt-16 pb-12 overflow-hidden md:pt-20 md:pb-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"
    >
      {/* Dynamic Background with smooth transitions */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient orbs with smooth movement */}
        <div 
          className="absolute w-96 h-96 md:w-[32rem] md:h-[32rem] rounded-full blur-3xl opacity-30 transition-all duration-1000 ease-out"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.4) 0%, rgba(147,51,234,0.4) 50%, rgba(59,130,246,0.2) 100%)',
            top: '-20%',
            right: '-15%',
            transform: `translate3d(${mousePosition.x * 0.03}px, ${mousePosition.y * 0.03}px, 0) scale(${1 + Math.sin(Date.now() * 0.001) * 0.1})`,
            animation: 'smooth-pulse 4s ease-in-out infinite'
          }}
        ></div>
        
        <div 
          className="absolute transition-all ease-out rounded-full opacity-25 w-80 h-80 md:w-96 md:h-96 blur-3xl duration-1200"
          style={{
            background: 'radial-gradient(circle, rgba(147,51,234,0.4) 0%, rgba(236,72,153,0.4) 50%, rgba(59,130,246,0.2) 100%)',
            bottom: '-15%',
            left: '-10%',
            transform: `translate3d(${mousePosition.x * -0.025}px, ${mousePosition.y * -0.025}px, 0) scale(${1 + Math.cos(Date.now() * 0.0008) * 0.1})`,
            animation: 'smooth-pulse 5s ease-in-out infinite 1.5s'
          }}
        ></div>

        <div 
          className="absolute transition-all duration-700 ease-out rounded-full w-72 h-72 md:w-80 md:h-80 blur-2xl opacity-20"
          style={{
            background: 'conic-gradient(from 0deg, rgba(59,130,246,0.3), rgba(147,51,234,0.3), rgba(236,72,153,0.3), rgba(59,130,246,0.3))',
            top: '50%',
            left: '50%',
            transform: `translate3d(-50%, -50%, 0) rotate(${mousePosition.x * 0.1 + scrollY * 0.05}deg) translate3d(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px, 0)`,
            animation: 'smooth-spin 60s linear infinite'
          }}
        ></div>

        {/* Additional smooth background elements */}
        <div 
          className="absolute w-64 h-64 transition-all duration-500 ease-out rounded-full blur-2xl opacity-15"
          style={{
            background: 'linear-gradient(45deg, rgba(99,102,241,0.3), rgba(168,85,247,0.3))',
            top: '20%',
            left: '20%',
            transform: `translate3d(${mousePosition.x * -0.01}px, ${mousePosition.y * 0.015}px, 0) rotate(${scrollY * -0.1}deg)`,
            animation: 'smooth-float 8s ease-in-out infinite'
          }}
        ></div>
      </div>
      
      {/* Enhanced floating particles with smoother movement */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full transition-all duration-700 ease-out ${
              i % 3 === 0 ? 'bg-blue-400/30 w-1.5 h-1.5 md:w-2.5 md:h-2.5' : 
              i % 3 === 1 ? 'bg-purple-400/30 w-1 h-1 md:w-2 md:h-2' : 
              'bg-pink-400/30 w-2 h-2 md:w-3 md:h-3'
            }`}
            style={{
              left: `${15 + (i * 7) % 70}%`,
              top: `${20 + (i * 11) % 60}%`,
              transform: `translateY(${Math.sin((Date.now() + i * 1000) * 0.002) * 20}px) translateX(${Math.cos((Date.now() + i * 1500) * 0.0015) * 15}px) scale(${0.5 + (i % 3) * 0.3})`,
              animation: `smooth-bounce ${2.5 + (i % 3) * 0.5}s ease-in-out infinite ${i * 0.3}s`
            }}
          ></div>
        ))}
      </div>

      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:gap-12 lg:grid-cols-2">
          {/* Content Section with smooth animations */}
          <div 
            className={`relative z-10 space-y-6 md:space-y-8 transition-all duration-1000 ease-out ${
              isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
            }`}
            style={{ transform: `translateY(${scrollY * -0.1}px)` }}
          >
            <div className="space-y-4 md:space-y-6">
              {/* Main Heading with smooth reveal */}
              <div 
                className={`transition-all duration-1200 ease-out delay-300 ${
                  isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
                }`}
              >
                <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                  Transform Your Business with{' '}
                  <span className="relative inline-block">
                    <span className="text-transparent transition-all duration-500 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text animate-gradient-x hover:from-purple-600 hover:via-indigo-600 hover:to-blue-600">
                      Corelleaf
                    </span>
                    <div className="absolute left-0 w-full h-1 transition-all duration-700 ease-out rounded-full -bottom-2 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 animate-smooth-pulse"></div>
                  </span>{' '}
                  Design Studio
                </h1>
              </div>

              {/* Description with smooth fade-in */}
              <p 
                className={`text-base sm:text-lg md:text-xl leading-relaxed text-gray-600 max-w-2xl transition-all duration-1000 ease-out delay-500 ${
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
              >
                We deliver innovative software solutions that drive growth, efficiency, and digital transformation. 
                From cutting-edge web applications to mobile apps and cloud infrastructure, we're your trusted technology partner.
              </p>
            </div>
            
            {/* Action Buttons with enhanced hover effects */}
            <div 
              className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 ease-out delay-700 ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
            >
              <button
                onClick={scrollToContact}
                className="relative flex items-center justify-center px-6 py-3 overflow-hidden text-white transition-all duration-700 ease-out transform shadow-xl group md:px-8 md:py-4 hover:shadow-2xl hover:scale-105 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl hover:-translate-y-1"
              >
                <span className="relative z-10 flex items-center text-sm font-semibold transition-all duration-300 md:text-base">
                  <Rocket className="mr-2 transition-transform duration-500 group-hover:animate-pulse group-hover:scale-110" size={18} />
                  Start Your Project
                  <ArrowRight className="ml-2 transition-all duration-500 group-hover:translate-x-3 group-hover:scale-110" size={18} />
                </span>
                <div className="absolute inset-0 transition-all duration-1000 ease-out transform -translate-x-full -skew-x-12 bg-white/20 group-hover:translate-x-full"></div>
                <div className="absolute inset-0 transition-all duration-500 ease-out opacity-0 bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-700 group-hover:opacity-100 rounded-2xl"></div>
              </button>
              
              <button
                onClick={scrollToServices}
                className="relative px-6 py-3 overflow-hidden text-blue-600 transition-all duration-700 ease-out transform border-2 border-blue-300 group md:px-8 md:py-4 rounded-2xl hover:border-purple-400 backdrop-blur-sm bg-white/70 hover:bg-white/95 hover:shadow-xl hover:scale-105 hover:-translate-y-1"
              >
                <span className="relative z-10 flex items-center text-sm font-semibold transition-all duration-500 md:text-base group-hover:text-purple-600">
                  <Zap className="mr-2 transition-transform duration-700 group-hover:rotate-180 group-hover:scale-110" size={18} />
                  View Our Services
                </span>
                <div className="absolute inset-0 transition-all duration-700 ease-out transform scale-0 bg-gradient-to-r from-blue-50 to-purple-50 group-hover:scale-100 rounded-2xl"></div>
              </button>
            </div>            
          </div>

          {/* Image Section with smooth parallax */}
          <div 
            className={`relative transition-all duration-1200 ease-out delay-500 ${
              isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
            }`}
            style={{ transform: `translateY(${scrollY * -0.05}px)` }}
          >
            <div className="relative z-10 group">
              <div className="relative overflow-hidden transition-all duration-700 ease-out shadow-2xl rounded-3xl group-hover:shadow-3xl">
                <img
                  src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg"
                  alt="Team working on technology solutions"
                  className="w-full h-50 sm:h-80 md:h-96 lg:h-[400px] object-cover transition-all duration-1000 ease-out transform group-hover:scale-110"
                />
                <div className="absolute inset-0 transition-all duration-700 ease-out opacity-0 bg-gradient-to-tr from-blue-600/30 via-purple-600/20 to-indigo-600/30 group-hover:opacity-100"></div>
                
                {/* Enhanced overlay pattern */}
                <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-transparent via-white to-transparent animate-smooth-shimmer"></div>
              </div>
              
              {/* Enhanced glow effect */}
              <div className="absolute inset-0 transition-all duration-700 ease-out scale-105 opacity-60 rounded-3xl bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-indigo-400/20 blur-xl group-hover:opacity-100 group-hover:scale-110"></div>
            </div>
            
            {/* Enhanced Floating Cards with smooth animations */}
            {floatingCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <div
                  key={index}
                  className={`absolute z-20 p-3 md:p-4 transition-all duration-700 ease-out border backdrop-blur-md shadow-xl cursor-pointer rounded-2xl hover:shadow-2xl hover:scale-110 hover:-translate-y-2 group/card ${getCardPosition(card.position)} ${getColorClasses(card.color)}`}
                  style={{
                    transform: `translateY(${Math.sin((Date.now() + index * 2000) * 0.002) * 8}px) translateX(${Math.cos((Date.now() + index * 1800) * 0.0018) * 6}px)`,
                    animation: `smooth-float ${3 + index * 0.5}s ease-in-out infinite ${index * 0.2}s`,
                    willChange: 'transform'
                  }}
                >
                  <Icon className="transition-all duration-500 ease-out group-hover/card:scale-125 group-hover/card:rotate-12" size={20} />
                  <div className="mt-1 text-xs font-semibold transition-all duration-300 md:mt-2 md:text-sm whitespace-nowrap">{card.text}</div>
                  <div className="absolute inset-0 transition-all duration-500 ease-out opacity-0 rounded-2xl bg-gradient-to-r from-white/0 via-white/30 to-white/0 group-hover/card:opacity-100"></div>
                </div>
              );
            })}

            {/* Additional decorative elements with smooth animations */}
            <div 
              className="absolute w-2 h-2 bg-blue-400 rounded-full top-1/4 left-1/4"
              style={{
                animation: 'smooth-ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
                transform: `scale(${1 + Math.sin(Date.now() * 0.003) * 0.3})`
              }}
            ></div>
            <div 
              className="absolute w-1 h-1 bg-purple-400 rounded-full bottom-1/3 right-1/3"
              style={{
                animation: 'smooth-pulse 3s ease-in-out infinite 0.5s',
                transform: `translateY(${Math.sin(Date.now() * 0.004) * 5}px)`
              }}
            ></div>
            <div 
              className="absolute top-2/3 left-1/6 w-1.5 h-1.5 bg-indigo-400 rounded-full"
              style={{
                animation: 'smooth-bounce 2s ease-in-out infinite 1s',
                transform: `translateX(${Math.cos(Date.now() * 0.002) * 3}px)`
              }}
            ></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes smooth-float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg) translateX(0px);
          }
          33% { 
            transform: translateY(-8px) rotate(1deg) translateX(2px);
          }
          66% { 
            transform: translateY(-12px) rotate(-1deg) translateX(-2px);
          }
        }
        
        @keyframes gradient-x {
          0%, 100% { 
            background-position: 0% 50%;
            background-size: 200% 200%;
          }
          50% { 
            background-position: 100% 50%;
            background-size: 250% 250%;
          }
        }
        
        @keyframes smooth-shimmer {
          0% { transform: translateX(-100%) skewX(-45deg); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(100%) skewX(-45deg); opacity: 0; }
        }
        
        @keyframes smooth-pulse {
          0%, 100% { 
            opacity: 0.3;
            transform: scale(1);
          }
          50% { 
            opacity: 0.5;
            transform: scale(1.05);
          }
        }
        
        @keyframes smooth-spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        @keyframes smooth-bounce {
          0%, 100% { 
            transform: translateY(0px) scale(1);
            opacity: 0.7;
          }
          50% { 
            transform: translateY(-15px) scale(1.1);
            opacity: 1;
          }
        }
        
        @keyframes smooth-ping {
          0% { 
            transform: scale(1);
            opacity: 1;
          }
          75%, 100% { 
            transform: scale(2);
            opacity: 0;
          }
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 4s ease-in-out infinite;
        }
        
        .animate-smooth-shimmer {
          animation: smooth-shimmer 3s ease-in-out infinite;
        }
        
        .animate-smooth-pulse {
          animation: smooth-pulse 2s ease-in-out infinite;
        }

        /* Smooth transitions for all elements */
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* Hardware acceleration for better performance */
        .group, .group/card {
          will-change: transform;
          transform: translateZ(0);
        }

        /* Custom easing for ultra-smooth animations */
        .transition-all {
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </section>
  );
};

export default Hero;