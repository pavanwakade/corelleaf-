import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Menu, X, Zap, Home, Users, Briefcase, Rocket, Mail, ArrowUp } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from'../Assets/logo.png'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);

  const navItems = useMemo(() => [
    { name: 'Home', id: 'hero', icon: Home, gradient: 'from-blue-500 to-cyan-500' },
    { name: 'About', id: 'about', icon: Users, gradient: 'from-purple-500 to-pink-500' },
    { name: 'Services', id: 'services', icon: Zap, gradient: 'from-orange-500 to-red-500' },
    { name: 'Portfolio', id: 'portfolio', icon: Briefcase, gradient: 'from-green-500 to-emerald-500' },
    { name: 'Team', id: 'team', icon: Rocket, gradient: 'from-indigo-500 to-purple-500' },
    { name: 'Contact', id: 'contact', icon: Mail, gradient: 'from-pink-500 to-rose-500' }
  ], []);

  // Optimized scroll handler with reduced frequency
  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    const progress = Math.min((scrollPosition / (documentHeight - windowHeight)) * 100, 100);
    setScrollProgress(progress);
    setIsScrolled(scrollPosition > 50);
    
    // Reduced active section detection frequency
    if (scrollPosition % 10 === 0) {
      const sections = navItems.map(item => item.id);
      let newActiveSection = activeSection;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            newActiveSection = section;
            break;
          }
        }
      }
      
      if (newActiveSection !== activeSection) {
        setActiveSection(newActiveSection);
      }
    }
  }, [activeSection, navItems]);

  // Throttled scroll listener
  useEffect(() => {
    let ticking = false;
    let lastScrollTime = 0;
    
    const scrollHandler = () => {
      const now = Date.now();
      if (now - lastScrollTime > 16 && !ticking) { // ~60fps limit
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
          lastScrollTime = now;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollHandler, { passive: true });
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [handleScroll]);

  // Reduced mobile menu effects
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isMenuOpen]);

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const offsetTop = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      
      setIsMenuOpen(false);
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      {/* Simplified scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-gray-200/20">
        <div 
          className="h-full transition-all duration-300 ease-out bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header
        className={`fixed top-1 left-1 right-1 z-50 transition-all duration-500 ease-out rounded-2xl backdrop-blur-md border border-white/20 ${
          isScrolled
            ? 'bg-white/90 shadow-xl'
            : 'bg-white/70 shadow-lg'
        }`}
      >
        {/* Simplified background effects */}
        <div className="absolute inset-0 opacity-30 rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10" />
        
        <nav className="relative px-4 py-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Simplified logo */}
            <div 
              className="relative z-20 flex items-center cursor-pointer group"
              onClick={() => scrollToSection('hero')}
            >
              <div className="relative p-2 transition-all duration-300 rounded-xl group-hover:scale-105 bg-white/20">
                <img
                  src={logo}
                  alt="Company Logo"
                  className="object-contain w-auto h-8 sm:h-10 md:h-12"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Simplified desktop navigation */}
            <div className="items-center hidden space-x-2 lg:flex">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeSection === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                      isActive
                        ? 'text-white shadow-md'
                        : 'text-gray-700 hover:text-white hover:shadow-md'
                    }`}
                  >
                    {isActive && (
                      <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-xl`} />
                    )}
                    
                    <span className="relative z-10 flex items-center space-x-2">
                      <IconComponent size={16} />
                      <span className="hidden xl:inline">{item.name}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Simplified CTA and mobile menu */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => scrollToSection('contact')}
                className="hidden px-6 py-2 text-white transition-all duration-300 rounded-xl md:block bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:scale-105"
              >
                Get Started
              </button>
              
              {scrollProgress > 20 && (
                <button
                  onClick={scrollToTop}
                  className="hidden p-2 text-gray-600 transition-all duration-300 rounded-xl md:block hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500"
                >
                  <ArrowUp size={20} />
                </button>
              )}

              {/* Simplified mobile menu button */}
              <button
                className="p-2 text-gray-700 transition-colors duration-300 rounded-xl hover:bg-gray-100 lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Simplified mobile menu */}
          {isMenuOpen && (
            <div className="absolute left-0 right-0 mt-2 border shadow-xl top-full bg-white/95 backdrop-blur-md border-white/20 rounded-2xl lg:hidden">
              <div className="p-4 space-y-2">
                {navItems.map((item) => {
                  const IconComponent = item.icon;
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="flex items-center w-full px-4 py-3 space-x-3 text-gray-700 transition-colors duration-300 rounded-xl hover:bg-gray-50"
                    >
                      <IconComponent size={20} />
                      <span>{item.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </nav>
      </header>

      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Header;
