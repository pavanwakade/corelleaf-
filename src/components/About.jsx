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
      icon: <Target className="text-blue-500" size={24} />,
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
      icon: <Eye className="text-emerald-500" size={24} />,
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
      icon: <Award className="text-purple-500" size={24} />,
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
      icon: <Users className="text-orange-500" size={24} />,
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
      icon: <TrendingUp size={20} />,
      gradient: "from-blue-500 to-cyan-500",
      description: "Successfully delivered projects across various industries"
    },
    { 
      number: "50+", 
      label: "Happy Clients", 
      icon: <Heart size={20} />,
      gradient: "from-pink-500 to-rose-500",
      description: "Long-term partnerships built on trust and results"
    },
    { 
      number: "7+", 
      label: "Years Experience", 
      icon: <Shield size={20} />,
      gradient: "from-emerald-500 to-teal-500",
      description: "Proven track record in technology solutions"
    },
    { 
      number: "24/7", 
      label: "Support Available", 
      icon: <Zap size={20} />,
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
      className="relative py-10 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 sm:py-16 lg:py-32"
    >
      {/* Advanced Animated Background with Parallax */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary background orbs */}
        <div 
          className="absolute w-48 h-48 rounded-full -top-20 -right-20 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-gradient-to-br from-blue-400/20 via-cyan-400/20 to-purple-400/20 blur-2xl sm:blur-3xl animate-pulse"
          style={{ transform: `translateY(${parallaxOffset * 0.3}px)` }}
        />
        <div 
          className="absolute w-48 h-48 delay-1000 rounded-full -bottom-20 -left-20 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-gradient-to-br from-emerald-400/20 via-teal-400/20 to-cyan-400/20 blur-2xl sm:blur-3xl animate-pulse"
          style={{ transform: `translateY(${-parallaxOffset * 0.2}px)` }}
        />
        
        {/* Floating geometric shapes */}
        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/4 left-3/4">
          <div className="w-12 h-12 border sm:w-16 sm:h-16 lg:w-24 lg:h-24 border-blue-200/30 rounded-xl animate-spin" style={{ animationDuration: '20s' }} />
        </div>
        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-3/4 left-1/4">
          <div className="w-8 h-8 border rounded-full sm:w-12 sm:h-12 lg:w-16 lg:h-16 border-purple-200/30 animate-bounce" style={{ animationDelay: '1s' }} />
        </div>
        
        {/* Interactive mouse follower */}
        <div 
          className="fixed w-4 h-4 transition-transform duration-300 ease-out rounded-full pointer-events-none sm:w-6 sm:h-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-sm"
          style={{
            left: mousePosition.x - 8,
            top: mousePosition.y - 8,
            transform: `scale(${isInView ? 1 : 0})`
          }}
        />
      </div>

      <div className="container relative px-3 mx-auto sm:px-6 lg:px-8">
        {/* Enhanced Header Section */}
        <div className={`mb-8 sm:mb-12 lg:mb-20 text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-2 mb-4 text-xs font-medium text-blue-600 transition-all duration-300 bg-white border border-blue-200 rounded-full shadow-lg sm:px-4 sm:py-2 lg:px-6 lg:py-3 sm:mb-6 lg:mb-8 sm:text-sm hover:shadow-xl hover:scale-105 backdrop-blur-sm bg-white/80">
            <Sparkles size={14} className="sm:w-4 sm:h-4 lg:w-5 lg:h-5 animate-pulse" />
            About Our Company
            <div className="w-1 h-1 bg-blue-500 rounded-full sm:w-2 sm:h-2 animate-ping" />
          </div>
          
          <h2 className="mb-3 text-2xl font-black leading-tight text-transparent sm:mb-4 sm:text-3xl lg:mb-6 lg:text-5xl xl:text-6xl bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text animate-gradient">
            About Corelleaf
          </h2>
          
          <p className="max-w-4xl mx-auto text-sm leading-relaxed text-gray-600 sm:text-base lg:text-xl xl:text-2xl">
            We're a passionate team of{' '}
            <span className="font-semibold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
              developers, designers, and strategists
            </span>{' '}
            dedicated to transforming businesses through innovative technology solutions.
          </p>
        </div>

        {/* Enhanced Stats Section with Advanced Hover Effects */}
        <div ref={statsRef} className={`grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-8 mb-10 sm:mb-16 lg:mb-20 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
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
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-20 rounded-2xl sm:rounded-3xl blur-xl transition-all duration-500 transform group-hover:scale-110`} />
              
              {/* Main card */}
              <div className="relative p-3 text-center transition-all duration-500 transform bg-white border border-gray-200 shadow-xl sm:p-4 lg:p-6 rounded-2xl sm:rounded-3xl group-hover:shadow-2xl group-hover:-translate-y-1 sm:group-hover:-translate-y-3 group-hover:border-transparent backdrop-blur-sm bg-white/90">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 mb-2 sm:mb-3 lg:mb-4 rounded-xl lg:rounded-2xl bg-gradient-to-br ${stat.gradient} text-white group-hover:scale-110 transition-transform duration-300`}>
                  {stat.icon}
                </div>
                
                {/* Number with animated counter effect */}
                <h3 className={`mb-1 text-xl font-black sm:text-2xl lg:text-3xl xl:text-4xl bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}>
                  {animatedNumber}{stat.number.includes('+') ? '+' : ''}
                </h3>
                
                {/* Label */}
                <p className="mb-1 text-xs font-bold text-gray-800 sm:text-sm lg:text-base">{stat.label}</p>
                
                {/* Description (shows on hover) */}
                <p className={`text-xs text-gray-500 transition-all duration-300 ${hoveredStat === index ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0'} overflow-hidden`}>
                  {stat.description}
                </p>
                
                {/* Floating particles on hover */}
                {hoveredStat === index && <FloatingParticles count={6} color="bg-blue-500" />}
              </div>
            </div>
          );
        })}
        </div>

        {/* Enhanced Main Content Grid */}
        <div className={`grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 xl:gap-20 mb-10 sm:mb-16 lg:mb-20 items-center transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Enhanced Image Section */}
          <div className="relative order-2 group lg:order-1">
            {/* Multiple layered backgrounds for depth */}
            <div className="absolute inset-0 transition-all duration-700 transform bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl sm:rounded-3xl rotate-2 sm:rotate-3 group-hover:rotate-3 sm:group-hover:rotate-6 group-hover:scale-105" />
            <div className="absolute inset-0 transition-all duration-500 transform bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl sm:rounded-3xl rotate-1 group-hover:rotate-3 opacity-70" />
            
            {/* Main image container */}
            <div className="relative p-2 transition-all duration-700 transform bg-white shadow-2xl sm:p-3 rounded-2xl sm:rounded-3xl group-hover:-translate-y-2 sm:group-hover:-translate-y-4 group-hover:shadow-4xl">
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl">
                <img
                  src="https://images.pexels.com/photos/3184611/pexels-photo-3184611.jpeg"
                  alt="Our modern office space"
                  className="object-cover w-full h-48 transition-transform duration-700 sm:h-64 lg:h-80 xl:h-96 group-hover:scale-110"
                />
                
                {/* Overlay effects */}
                <div className="absolute inset-0 transition-all duration-500 bg-gradient-to-t from-black/30 via-transparent to-blue-500/20 group-hover:from-black/20" />
                
                {/* Floating UI elements */}
                <div className="absolute transition-all duration-500 transform top-2 right-2 sm:top-4 sm:right-4 group-hover:scale-110">
                  <div className="px-2 py-1 text-xs font-medium text-white bg-black rounded-full sm:px-3 sm:py-2 sm:text-sm bg-opacity-20 backdrop-blur-md">
                    ✨ Innovation Hub
                  </div>
                </div>
              </div>
              
              {/* Corner accent */}
              <div className="absolute w-4 h-4 rounded-full sm:w-6 sm:h-6 lg:w-8 lg:h-8 bg-gradient-to-br from-yellow-400 to-orange-500 -top-1 -right-1 sm:-top-2 sm:-right-2 animate-pulse" />
            </div>
          </div>

          {/* Enhanced Content Section */}
          <div className="order-1 space-y-4 sm:space-y-6 lg:space-y-8 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-2 text-xs font-medium text-purple-600 transition-all duration-300 bg-purple-100 rounded-full sm:px-4 sm:text-sm hover:bg-purple-200 hover:scale-105">
              <Target size={14} className="sm:w-4 sm:h-4" />
              Our Journey
              <ChevronRight size={12} className="sm:w-4 sm:h-4 animate-pulse" />
            </div>
            
            <h3 className="text-xl font-black leading-tight text-gray-900 sm:text-2xl lg:text-3xl xl:text-4xl">
              Our{' '}
              <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                Story
              </span>
            </h3>
            
            <div className="space-y-4 sm:space-y-6">
              <div className="relative p-3 border-l-4 border-blue-500 bg-gradient-to-r from-blue-50 to-transparent sm:p-4 lg:p-6 rounded-r-xl sm:rounded-r-2xl">
                <p className="text-sm leading-relaxed text-gray-700 sm:text-base lg:text-lg">
                  Founded in 2018, Corelleaf emerged from a simple vision: to bridge the gap between 
                  complex technology and business success. Our founders, experienced software architects 
                  and business strategists, recognized that many companies struggled to leverage technology 
                  effectively for growth.
                </p>
              </div>
              
              <div className="relative p-3 border-l-4 border-purple-500 bg-gradient-to-r from-purple-50 to-transparent sm:p-4 lg:p-6 rounded-r-xl sm:rounded-r-2xl">
                <p className="text-sm leading-relaxed text-gray-700 sm:text-base lg:text-lg">
                  Today, we've grown into a full-service technology partner, helping businesses of all sizes 
                  navigate digital transformation with confidence. Our agile approach and commitment to 
                  excellence have earned us recognition as a trusted advisor in the tech industry.
                </p>
              </div>
            </div>
            
            {/* Enhanced Mission & Vision Cards */}
            <div className="grid gap-4 pt-4 sm:grid-cols-2 sm:gap-6 sm:pt-6">
              <div className="relative overflow-hidden group">
                <div className="absolute inset-0 transition-all duration-500 transform opacity-0 bg-gradient-to-br from-blue-500 to-cyan-500 group-hover:opacity-10 rounded-2xl sm:rounded-3xl group-hover:scale-105" />
                <div className="relative p-4 transition-all duration-300 bg-white border-2 border-blue-100 shadow-lg sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl group-hover:shadow-2xl group-hover:border-blue-300">
                  <div className="flex items-center gap-2 mb-3 sm:gap-3 sm:mb-4">
                    <div className="p-2 bg-blue-100 rounded-xl sm:p-3 sm:rounded-2xl">
                      <Target size={16} className="text-blue-600 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-blue-600 sm:text-xl lg:text-2xl">Mission</h4>
                  </div>
                  <p className="text-xs leading-relaxed text-gray-600 sm:text-sm lg:text-base">
                    To empower businesses with innovative technology solutions that drive sustainable growth and operational efficiency.
                  </p>
                </div>
              </div>
              
              <div className="relative overflow-hidden group">
                <div className="absolute inset-0 transition-all duration-500 transform opacity-0 bg-gradient-to-br from-purple-500 to-pink-500 group-hover:opacity-10 rounded-2xl sm:rounded-3xl group-hover:scale-105" />
                <div className="relative p-4 transition-all duration-300 bg-white border-2 border-purple-100 shadow-lg sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl group-hover:shadow-2xl group-hover:border-purple-300">
                  <div className="flex items-center gap-2 mb-3 sm:gap-3 sm:mb-4">
                    <div className="p-2 bg-purple-100 rounded-xl sm:p-3 sm:rounded-2xl">
                      <Eye size={16} className="text-purple-600 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-purple-600 sm:text-xl lg:text-2xl">Vision</h4>
                  </div>
                  <p className="text-xs leading-relaxed text-gray-600 sm:text-sm lg:text-base">
                    To be the leading technology partner that transforms how businesses operate and succeed in the digital age.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Revolutionary Values Section */}
        <div className={`transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="mb-8 text-center sm:mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-2 mb-4 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-full shadow-lg sm:px-4 sm:text-sm sm:mb-6 lg:mb-8 backdrop-blur-sm bg-white/80">
              <Sparkles size={14} className="text-blue-500 sm:w-4 sm:h-4 animate-spin" />
              Our DNA
            </div>
            
            <h3 className="mb-3 text-xl font-black text-gray-900 sm:mb-4 sm:text-2xl lg:mb-6 lg:text-3xl xl:text-4xl">
              Our Core{' '}
              <span className="text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text">
                Values
              </span>
            </h3>
            
            <p className="max-w-3xl mx-auto text-sm text-gray-600 sm:text-base lg:text-lg xl:text-xl">
              The principles that guide everything we do and shape our company culture.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className={`relative group cursor-pointer transition-all duration-700 transform hover:-translate-y-2 sm:hover:-translate-y-4 ${
                  activeValue === index ? 'scale-105 z-10' : 'hover:scale-105'
                }`}
                onMouseEnter={() => setActiveValue(index)}
              >
                {/* Floating particles background */}
                <FloatingParticles count={value.particles} color="bg-gradient-to-r from-blue-500 to-purple-500" />
                
                {/* Dynamic glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-20 rounded-2xl sm:rounded-3xl blur-xl transition-all duration-500 transform group-hover:scale-110`} />
                
                {/* Main card with glass morphism */}
                <div className={`relative p-4 text-center bg-white/80 backdrop-blur-xl rounded-2xl border-2 ${value.borderColor} ${value.shadowColor} shadow-xl group-hover:shadow-2xl transition-all duration-500 h-full group-hover:bg-white/90 sm:p-6 lg:p-8 sm:rounded-3xl`}>
                  {/* Animated icon container */}
                  <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 ${value.bgColor} rounded-2xl mb-3 sm:mb-4 lg:mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 relative overflow-hidden sm:rounded-3xl`}>
                    {/* Icon glow effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-20 rounded-2xl sm:rounded-3xl blur-sm group-hover:opacity-40 transition-opacity duration-300`} />
                    <div className="relative z-10">
                      {value.icon}
                    </div>
                  </div>
                  
                  {/* Title with gradient effect */}
                  <h4 className={`mb-2 text-lg font-black transition-all duration-500 sm:mb-3 sm:text-xl lg:mb-4 lg:text-2xl text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${value.color}`}>
                    {value.title}
                  </h4>
                  
                  {/* Description with enhanced typography */}
                  <p className="text-xs leading-relaxed text-gray-600 transition-colors duration-300 sm:text-sm lg:text-base group-hover:text-gray-700">
                    {value.description}
                  </p>
                  
                  {/* Interactive elements */}
                  <div className="absolute transition-all duration-300 opacity-0 bottom-3 right-3 sm:bottom-4 sm:right-4 lg:bottom-6 lg:right-6 group-hover:opacity-100 group-hover:scale-110">
                    <div className={`p-1 rounded-full bg-gradient-to-br ${value.color} text-white shadow-lg sm:p-2`}>
                      <ChevronRight size={12} className="sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                    </div>
                  </div>
                  
                  {/* Progress indicator */}
                  {activeValue === index && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse" />
                  )}
                  
                  {/* Active state indicator */}
                  {activeValue === index && (
                    <div className="absolute w-4 h-4 rounded-full shadow-lg sm:w-6 sm:h-6 lg:w-8 lg:h-8 -top-2 -right-2 sm:-top-3 sm:-right-3 bg-gradient-to-br from-blue-500 to-purple-500 animate-pulse">
                      <div className="absolute bg-white rounded-full inset-1 sm:inset-2" />
                      <div className="absolute rounded-full inset-1.5 sm:inset-3 bg-gradient-to-br from-blue-500 to-purple-500" />
                    </div>
                  )}
                  
                  {/* Hover border effect */}
                  <div className={`absolute inset-0 rounded-2xl sm:rounded-3xl border-2 border-transparent bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`} style={{ padding: '2px' }}>
                    <div className="w-full h-full bg-white rounded-2xl sm:rounded-3xl" />
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
