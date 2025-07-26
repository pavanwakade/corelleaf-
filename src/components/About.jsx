import React, { useState, useEffect, useRef } from 'react';
import { Target, Eye, Award, Users, ChevronRight, Sparkles, TrendingUp, Zap, Shield, Heart } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeValue, setActiveValue] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);
  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const [hoveredStat, setHoveredStat] = useState(null);

  // Advanced scroll and intersection observer effects
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  // Auto-rotating values with smooth transitions
  useEffect(() => {
    if (!isInView) return;
    
    const interval = setInterval(() => {
      setActiveValue((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, [isInView]);

  // Advanced mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const values = [
    {
      icon: <Target className="text-blue-500" size={32} />,
      title: "Innovation",
      description: "We embrace cutting-edge technologies and creative solutions to solve complex business challenges with forward-thinking approaches.",
      color: "from-blue-500 via-cyan-500 to-blue-600",
      shadowColor: "shadow-blue-500/25",
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
      borderColor: "border-blue-200",
      accent: "accent-blue-500",
      particles: 15
    },
    {
      icon: <Eye className="text-emerald-500" size={32} />,
      title: "Quality",
      description: "We deliver exceptional results through rigorous testing, comprehensive code reviews, and meticulous attention to every detail.",
      color: "from-emerald-500 via-teal-500 to-emerald-600",
      shadowColor: "shadow-emerald-500/25",
      bgColor: "bg-gradient-to-br from-emerald-50 to-teal-50",
      borderColor: "border-emerald-200",
      accent: "accent-emerald-500",
      particles: 12
    },
    {
      icon: <Award className="text-purple-500" size={32} />,
      title: "Excellence",
      description: "We strive for perfection in every project, consistently exceeding client expectations and setting new industry standards.",
      color: "from-purple-500 via-violet-500 to-purple-600",
      shadowColor: "shadow-purple-500/25",
      bgColor: "bg-gradient-to-br from-purple-50 to-violet-50",
      borderColor: "border-purple-200",
      accent: "accent-purple-500",
      particles: 18
    },
    {
      icon: <Users className="text-orange-500" size={32} />,
      title: "Collaboration",
      description: "We work closely with our clients as true partners, ensuring transparent communication and collaborative success throughout every phase.",
      color: "from-orange-500 via-red-500 to-orange-600",
      shadowColor: "shadow-orange-500/25",
      bgColor: "bg-gradient-to-br from-orange-50 to-red-50",
      borderColor: "border-orange-200",
      accent: "accent-orange-500",
      particles: 14
    }
  ];

  const stats = [
    { 
      number: "150+", 
      label: "Projects Completed", 
      icon: <TrendingUp size={24} />,
      gradient: "from-blue-500 to-cyan-500",
      description: "Successfully delivered projects across various industries"
    },
    { 
      number: "50+", 
      label: "Happy Clients", 
      icon: <Heart size={24} />,
      gradient: "from-pink-500 to-rose-500",
      description: "Long-term partnerships built on trust and results"
    },
    { 
      number: "5+", 
      label: "Years Experience", 
      icon: <Shield size={24} />,
      gradient: "from-emerald-500 to-teal-500",
      description: "Proven track record in technology solutions"
    },
    { 
      number: "24/7", 
      label: "Support Available", 
      icon: <Zap size={24} />,
      gradient: "from-purple-500 to-violet-500",
      description: "Round-the-clock support for mission-critical applications"
    }
  ];

  // Advanced floating particles component
  const FloatingParticles = ({ count, color }) => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className={`absolute w-1 h-1 ${color} rounded-full opacity-30 animate-pulse`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 3}s`
          }}
        />
      ))}
    </div>
  );

  // Parallax effect calculation
  const parallaxOffset = scrollY * 0.5;

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="relative py-20 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 sm:py-24 lg:py-32"
    >
      {/* Advanced Animated Background with Parallax */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary background orbs */}
        <div 
          className="absolute rounded-full -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 via-cyan-400/20 to-purple-400/20 blur-3xl animate-pulse"
          style={{ transform: `translateY(${parallaxOffset * 0.3}px)` }}
        />
        <div 
          className="absolute delay-1000 rounded-full -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-emerald-400/20 via-teal-400/20 to-cyan-400/20 blur-3xl animate-pulse"
          style={{ transform: `translateY(${-parallaxOffset * 0.2}px)` }}
        />
        
        {/* Floating geometric shapes */}
        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/4 left-3/4">
          <div className="w-24 h-24 border border-blue-200/30 rounded-xl animate-spin" style={{ animationDuration: '20s' }} />
        </div>
        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-3/4 left-1/4">
          <div className="w-16 h-16 border rounded-full border-purple-200/30 animate-bounce" style={{ animationDelay: '1s' }} />
        </div>
        
        {/* Interactive mouse follower */}
        <div 
          className="fixed w-6 h-6 transition-transform duration-300 ease-out rounded-full pointer-events-none bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-sm"
          style={{
            left: mousePosition.x - 12,
            top: mousePosition.y - 12,
            transform: `scale(${isInView ? 1 : 0})`
          }}
        />
      </div>

      <div className="container relative px-4 mx-auto sm:px-6 lg:px-8">
        {/* Enhanced Header Section */}
        <div className={`mb-16 sm:mb-20 lg:mb-24 text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center gap-3 px-6 py-3 mb-8 text-sm font-medium text-blue-600 transition-all duration-300 bg-white border border-blue-200 rounded-full shadow-lg hover:shadow-xl hover:scale-105 backdrop-blur-sm bg-white/80">
            <Sparkles size={18} className="animate-pulse" />
            About Our Company
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
          </div>
          
          <h2 className="mb-6 text-4xl font-black leading-tight text-transparent sm:mb-8 sm:text-5xl lg:text-6xl xl:text-7xl bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text animate-gradient">
            About Corelleaf
          </h2>
          
          <p className="max-w-4xl mx-auto text-xl leading-relaxed text-gray-600 sm:text-2xl lg:text-3xl">
            We're a passionate team of{' '}
            <span className="font-semibold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
              developers, designers, and strategists
            </span>{' '}
            dedicated to transforming businesses through innovative technology solutions.
          </p>
        </div>

        {/* Enhanced Stats Section with Advanced Hover Effects */}
        <div ref={statsRef} className={`grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 mb-20 sm:mb-24 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {stats.map((stat, index) => {
            const [animatedNumber, setAnimatedNumber] = useState(0);

            useEffect(() => {
              if (statsInView) {
                const end = parseInt(stat.number.replace('+', ''));
                let start = 0;
                const duration = 2000;
                const increment = (end - start) / duration;
                let currentNumber = start;

                const timer = setInterval(() => {
                  currentNumber += increment * 100;
                  setAnimatedNumber(Math.round(currentNumber));

                  if (currentNumber >= end) {
                    clearInterval(timer);
                    setAnimatedNumber(end);
                  }
                }, 10);

                return () => clearInterval(timer);
              }
            }, [statsInView, stat.number]);

            return (
            <div
              key={index}
              className="relative group"
              onMouseEnter={() => setHoveredStat(index)}
              onMouseLeave={() => setHoveredStat(null)}
            >
              {/* Background glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-20 rounded-3xl blur-xl transition-all duration-500 transform group-hover:scale-110`} />
              
              {/* Main card */}
              <div className="relative p-6 text-center transition-all duration-500 transform bg-white border border-gray-200 shadow-xl sm:p-8 rounded-3xl group-hover:shadow-2xl group-hover:-translate-y-3 group-hover:border-transparent backdrop-blur-sm bg-white/90">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 mb-4 rounded-2xl bg-gradient-to-br ${stat.gradient} text-white group-hover:scale-110 transition-transform duration-300`}>
                  {stat.icon}
                </div>
                
                {/* Number with animated counter effect */}
                <h3 className={`mb-2 text-3xl font-black sm:text-4xl lg:text-5xl bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}>
                  {animatedNumber}{stat.number.includes('+') ? '+' : ''}
                </h3>
                
                {/* Label */}
                <p className="mb-2 text-sm font-bold text-gray-800 sm:text-base">{stat.label}</p>
                
                {/* Description (shows on hover) */}
                <p className={`text-xs text-gray-500 transition-all duration-300 ${hoveredStat === index ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0'} overflow-hidden`}>
                  {stat.description}
                </p>
                
                {/* Floating particles on hover */}
                {hoveredStat === index && <FloatingParticles count={8} color="bg-blue-500" />}
              </div>
            </div>
          );
        })}
        </div>

        {/* Enhanced Main Content Grid */}
        <div className={`grid lg:grid-cols-2 gap-16 lg:gap-20 xl:gap-24 mb-20 sm:mb-24 items-center transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Enhanced Image Section */}
          <div className="relative order-2 group lg:order-1">
            {/* Multiple layered backgrounds for depth */}
            <div className="absolute inset-0 transition-all duration-700 transform bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl rotate-3 group-hover:rotate-6 group-hover:scale-105" />
            <div className="absolute inset-0 transition-all duration-500 transform bg-gradient-to-br from-cyan-400 to-blue-500 rounded-3xl rotate-1 group-hover:rotate-3 opacity-70" />
            
            {/* Main image container */}
            <div className="relative p-3 transition-all duration-700 transform bg-white shadow-2xl rounded-3xl group-hover:-translate-y-4 group-hover:shadow-4xl">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src="https://images.pexels.com/photos/3184611/pexels-photo-3184611.jpeg"
                  alt="Our modern office space"
                  className="object-cover w-full transition-transform duration-700 h-72 sm:h-80 lg:h-96 group-hover:scale-110"
                />
                
                {/* Overlay effects */}
                <div className="absolute inset-0 transition-all duration-500 bg-gradient-to-t from-black/30 via-transparent to-blue-500/20 group-hover:from-black/20" />
                
                {/* Floating UI elements */}
                <div className="absolute transition-all duration-500 transform top-4 right-4 group-hover:scale-110">
                  <div className="px-4 py-2 text-sm font-medium text-white bg-black rounded-full bg-opacity-20 backdrop-blur-md">
                    ✨ Innovation Hub
                  </div>
                </div>
              </div>
              
              {/* Corner accent */}
              <div className="absolute w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 -top-2 -right-2 animate-pulse" />
            </div>
          </div>

          {/* Enhanced Content Section */}
          <div className="order-1 space-y-8 lg:order-2 sm:space-y-10">
            <div className="inline-flex items-center gap-3 px-6 py-3 text-sm font-medium text-purple-600 transition-all duration-300 bg-purple-100 rounded-full hover:bg-purple-200 hover:scale-105">
              <Target size={18} />
              Our Journey
              <ChevronRight size={16} className="animate-pulse" />
            </div>
            
            <h3 className="text-3xl font-black leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
              Our{' '}
              <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                Story
              </span>
            </h3>
            
            <div className="space-y-6 sm:space-y-8">
              <div className="relative p-6 border-l-4 border-blue-500 bg-gradient-to-r from-blue-50 to-transparent rounded-r-2xl">
                <p className="text-lg leading-relaxed text-gray-700 sm:text-xl">
                  Founded in 2019, Corelleaf emerged from a simple vision: to bridge the gap between 
                  complex technology and business success. Our founders, experienced software architects 
                  and business strategists, recognized that many companies struggled to leverage technology 
                  effectively for growth.
                </p>
              </div>
              
              <div className="relative p-6 border-l-4 border-purple-500 bg-gradient-to-r from-purple-50 to-transparent rounded-r-2xl">
                <p className="text-lg leading-relaxed text-gray-700 sm:text-xl">
                  Today, we've grown into a full-service technology partner, helping businesses of all sizes 
                  navigate digital transformation with confidence. Our agile approach and commitment to 
                  excellence have earned us recognition as a trusted advisor in the tech industry.
                </p>
              </div>
            </div>
            
            {/* Enhanced Mission & Vision Cards */}
            <div className="grid gap-8 pt-8 sm:grid-cols-2">
              <div className="relative overflow-hidden group">
                <div className="absolute inset-0 transition-all duration-500 transform opacity-0 bg-gradient-to-br from-blue-500 to-cyan-500 group-hover:opacity-10 rounded-3xl group-hover:scale-105" />
                <div className="relative p-8 transition-all duration-300 bg-white border-2 border-blue-100 shadow-lg rounded-3xl group-hover:shadow-2xl group-hover:border-blue-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-blue-100 rounded-2xl">
                      <Target size={24} className="text-blue-600" />
                    </div>
                    <h4 className="text-2xl font-bold text-blue-600">Mission</h4>
                  </div>
                  <p className="leading-relaxed text-gray-600">
                    To empower businesses with innovative technology solutions that drive sustainable growth and operational efficiency.
                  </p>
                </div>
              </div>
              
              <div className="relative overflow-hidden group">
                <div className="absolute inset-0 transition-all duration-500 transform opacity-0 bg-gradient-to-br from-purple-500 to-pink-500 group-hover:opacity-10 rounded-3xl group-hover:scale-105" />
                <div className="relative p-8 transition-all duration-300 bg-white border-2 border-purple-100 shadow-lg rounded-3xl group-hover:shadow-2xl group-hover:border-purple-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-purple-100 rounded-2xl">
                      <Eye size={24} className="text-purple-600" />
                    </div>
                    <h4 className="text-2xl font-bold text-purple-600">Vision</h4>
                  </div>
                  <p className="leading-relaxed text-gray-600">
                    To be the leading technology partner that transforms how businesses operate and succeed in the digital age.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Revolutionary Values Section */}
        <div className={`transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="mb-16 text-center sm:mb-20">
            <div className="inline-flex items-center gap-3 px-6 py-3 mb-8 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-full shadow-lg backdrop-blur-sm bg-white/80">
              <Sparkles size={18} className="text-blue-500 animate-spin" />
              Our DNA
            </div>
            
            <h3 className="mb-6 text-3xl font-black text-gray-900 sm:text-4xl lg:text-5xl">
              Our Core{' '}
              <span className="text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text">
                Values
              </span>
            </h3>
            
            <p className="max-w-3xl mx-auto text-xl text-gray-600 sm:text-2xl">
              The principles that guide everything we do and shape our company culture.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
            {values.map((value, index) => (
              <div 
                key={index} 
                className={`relative group cursor-pointer transition-all duration-700 transform hover:-translate-y-4 ${
                  activeValue === index ? 'scale-105 z-10' : 'hover:scale-105'
                }`}
                onMouseEnter={() => setActiveValue(index)}
              >
                {/* Floating particles background */}
                <FloatingParticles count={value.particles} color="bg-gradient-to-r from-blue-500 to-purple-500" />
                
                {/* Dynamic glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-20 rounded-3xl blur-xl transition-all duration-500 transform group-hover:scale-110`} />
                
                {/* Main card with glass morphism */}
                <div className={`relative p-8 sm:p-10 text-center bg-white/80 backdrop-blur-xl rounded-3xl border-2 ${value.borderColor} ${value.shadowColor} shadow-xl group-hover:shadow-2xl transition-all duration-500 h-full group-hover:bg-white/90`}>
                  {/* Animated icon container */}
                  <div className={`inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 ${value.bgColor} rounded-3xl mb-6 sm:mb-8 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 relative overflow-hidden`}>
                    {/* Icon glow effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-20 rounded-3xl blur-sm group-hover:opacity-40 transition-opacity duration-300`} />
                    <div className="relative z-10">
                      {value.icon}
                    </div>
                  </div>
                  
                  {/* Title with gradient effect */}
                  <h4 className={`mb-4 text-2xl font-black transition-all duration-500 sm:mb-6 sm:text-3xl text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${value.color}`}>
                    {value.title}
                  </h4>
                  
                  {/* Description with enhanced typography */}
                  <p className="text-base leading-relaxed text-gray-600 transition-colors duration-300 sm:text-lg group-hover:text-gray-700">
                    {value.description}
                  </p>
                  
                  {/* Interactive elements */}
                  <div className="absolute transition-all duration-300 opacity-0 bottom-6 right-6 group-hover:opacity-100 group-hover:scale-110">
                    <div className={`p-2 rounded-full bg-gradient-to-br ${value.color} text-white shadow-lg`}>
                      <ChevronRight size={20} />
                    </div>
                  </div>
                  
                  {/* Progress indicator */}
                  {activeValue === index && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse" />
                  )}
                  
                  {/* Active state indicator */}
                  {activeValue === index && (
                    <div className="absolute w-8 h-8 rounded-full shadow-lg -top-3 -right-3 bg-gradient-to-br from-blue-500 to-purple-500 animate-pulse">
                      <div className="absolute bg-white rounded-full inset-2" />
                      <div className="absolute rounded-full inset-3 bg-gradient-to-br from-blue-500 to-purple-500" />
                    </div>
                  )}
                  
                  {/* Hover border effect */}
                  <div className={`absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`} style={{ padding: '2px' }}>
                    <div className="w-full h-full bg-white rounded-3xl" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom CSS for additional animations */}
      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default About;
