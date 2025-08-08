import React, { useEffect, useState } from 'react';
import {
  ArrowRight, Code, Smartphone, Cloud, Zap, Rocket, Star, Globe, Shield
} from 'lucide-react';
import './css/Hero.css';
import heroimg from "../Assets/hero.png"

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    setTimeout(() => setLoaded(true), 100); // Delay to trigger transition

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      requestAnimationFrame(() => setMousePosition({ x, y }));
    };

    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const floatingCards = [
    { icon: Code, text: 'Web Development', color: 'core-blue', position: 'core-top-left' },
    { icon: Smartphone, text: 'Mobile Apps', color: 'core-green', position: 'core-bottom-right' },
    { icon: Cloud, text: 'Cloud Solutions', color: 'core-purple', position: 'core-middle-right' },
    { icon: Globe, text: 'Digital Strategy', color: 'core-indigo', position: 'core-top-right' },
    { icon: Shield, text: 'Cybersecurity', color: 'core-red', position: 'core-bottom-left' },
    { icon: Star, text: 'UI/UX Design', color: 'core-yellow', position: 'core-middle-left' }
  ];

  return (
    <section id="hero" className="core-hero-section" aria-label="Hero section">
      {/* Background orbs */}
      <div className="core-hero-bg" aria-hidden="true">
        <div
          className="core-orb core-orb-1"
          style={{
            transform: `translate3d(${mousePosition.x * 0.03}px, ${mousePosition.y * 0.03}px, 0)`
          }}
        />
        <div
          className="core-orb core-orb-2"
          style={{
            transform: `translate3d(${mousePosition.x * -0.025}px, ${mousePosition.y * -0.025}px, 0)`
          }}
        />
        <div
          className="core-orb core-orb-3"
          style={{
            transform: `rotate(${mousePosition.x * 0.1 + scrollY * 0.05}deg)`
          }}
        />
      </div>

      <div className="core-hero-container">
        <div
          className={`core-hero-text${loaded ? ' core-loaded' : ''}`}
          style={{ transform: `translateY(${scrollY * -0.1}px)` }}
        >
          <h1>
            Transform Your Business with{' '}
            <span className="core-gradient-text">Corelleaf</span>
          </h1>
          <p>
            We deliver innovative software solutions that drive growth, efficiency, and digital transformation. From cutting-edge web applications to mobile apps and cloud infrastructure, we're your trusted technology partner.
          </p>
          <div className="core-hero-buttons">
            <button className="core-btn-primary" onClick={() => scrollToSection('contact')} aria-label="Start your project">
              <Rocket size={18} /> Start Your Project <ArrowRight size={18} />
            </button>
            <button className="core-btn-secondary" onClick={() => scrollToSection('services')} aria-label="View our services">
              <Zap size={18} /> View Our Services
            </button>
          </div>
        </div>

        <div
          className={`core-hero-image${loaded ? ' core-loaded' : ''}`}
          style={{ transform: `translateY(${scrollY * -0.05}px)` }}
        >
          <div className="core-image-wrapper" tabIndex={-1}>
            <img
              src={heroimg}
              alt="Team working"
              loading="lazy"
            />
          </div>

          {floatingCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={i}
                className={`core-floating-card ${card.color} ${card.position} ${isLoaded ? 'core-fade-in-up' : ''}`}
                style={{ animationDelay: `${0.2 + i * 0.15}s` }}
                tabIndex={0}
                aria-label={card.text}
              >
                <Icon size={20} />
                <span>{card.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;

