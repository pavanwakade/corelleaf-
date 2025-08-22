import React, { useState, useEffect, useRef } from 'react';
import { Target, Eye, Award, Users, TrendingUp, Zap, Shield, Heart, Sparkles } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import './css/About.css';

const About = () => {
  const [activeValue, setActiveValue] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [hoveredStat, setHoveredStat] = useState(null);

  const sectionRef = useRef(null);
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.5 });

  // Animate active value every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => setActiveValue(prev => (prev + 1) % 4), 4000);
    return () => clearInterval(interval);
  }, []);

  // Track mouse position for subtle effects if needed
  useEffect(() => {
    const handleMouseMove = e => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Track scroll for parallax effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const values = [
    {
      icon: <Target size={28} />,
      title: "Innovation",
      description: "We embrace cutting-edge technologies and creative solutions to solve complex business challenges.",
      colorClass: "blue",
      particles: 15
    },
    {
      icon: <Eye size={28} />,
      title: "Quality",
      description: "Delivering exceptional results through rigorous testing and meticulous attention to detail.",
      colorClass: "green",
      particles: 12
    },
    {
      icon: <Award size={28} />,
      title: "Excellence",
      description: "Striving for perfection and setting new industry standards with every project.",
      colorClass: "purple",
      particles: 18
    },
    {
      icon: <Users size={28} />,
      title: "Collaboration",
      description: "Working closely with clients ensuring transparent communication and joint success.",
      colorClass: "orange",
      particles: 14
    }
  ];

  const stats = [
    {
      number: 250,
      label: "Projects Completed",
      icon: <TrendingUp size={24} />,
      gradientClass: "stat-blue",
      description: "Successfully delivered projects across various industries."
    },
    {
      number: 200,
      label: "Happy Clients",
      icon: <Heart size={24} />,
      gradientClass: "stat-pink",
      description: "Long-term partnerships built on trust and results."
    },
    {
      number: 9,
      label: "Years Experience",
      icon: <Shield size={24} />,
      gradientClass: "stat-green",
      description: "Proven track record in technology solutions."
    },
    {
      number: 24,
      label: "Support Available",
      icon: <Zap size={24} />,
      gradientClass: "stat-purple",
      description: "Round-the-clock support for mission-critical applications."
    }
  ];

  // Animate numbers when in view
  const AnimatedNumber = ({ number }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!statsInView) return;

      let start = 0;
      const end = number;
      const duration = 1000;
      const stepTime = Math.abs(Math.floor(duration / end));
      let timer = setInterval(() => {
        start += 1;
        if (start >= end) {
          clearInterval(timer);
          setCount(end);
        } else {
          setCount(start);
        }
      }, stepTime);

      return () => clearInterval(timer);
    }, [number, statsInView]);

    return <>{count}</>;
  };

  // Floating Particles component
  const FloatingParticles = ({ count, color }) => (
    <div className={`particles particles-${color}`}>
      {[...Array(count)].map((_, i) => (
        <span
          key={i}
          className="particle"
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

  const parallaxOffset = scrollY * 0.3;

  return (
    <section ref={sectionRef} id="about" className="about-section">
      <div className="bg-orbs" style={{ transform: `translateY(${parallaxOffset}px)` }} />
      <div className="bg-orbs-secondary" style={{ transform: `translateY(${-parallaxOffset * 0.7}px)` }} />

      <div className="container">
        <header className="header-section">
          <div className="badge"><Sparkles size={16} /> About Our Company</div>
          <h2 className="gradient-title">About Corelleaf</h2>
          <p className="header-description">
            We're a passionate team of <span className="highlight">developers, designers, and strategists</span> dedicated to transforming businesses.
          </p>
        </header>

        <div ref={statsRef} className="stats-grid">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`stat-card ${stat.gradientClass}`}
              onMouseEnter={() => setHoveredStat(idx)}
              onMouseLeave={() => setHoveredStat(null)}
            >
              <div className="stat-icon">{stat.icon}</div>
              <h3 className="stat-number"><AnimatedNumber number={stat.number} />{stat.label === "Support Available" ? "/7" : "+"}</h3>
              <p className="stat-label">{stat.label}</p>
              {hoveredStat === idx && <p className="stat-desc">{stat.description}</p>}
            </div>
          ))}
        </div>

        <div className="values-grid">
          {values.map((val, idx) => (
            <div
              key={idx}
              className={`value-card ${val.colorClass} ${activeValue === idx ? 'active' : ''}`}
              onMouseEnter={() => setActiveValue(idx)}
            >
              <FloatingParticles count={val.particles} color={val.colorClass} />
              <div className="value-icon">{val.icon}</div>
              <h4 className="value-title">{val.title}</h4>
              <p className="value-description">{val.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
