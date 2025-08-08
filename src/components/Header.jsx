import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Menu, X, Zap, Home, Users, Briefcase, Mail, ArrowUp } from "lucide-react";
import logo from "../Assets/logo.png";
import "./css/Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollProgress, setScrollProgress] = useState(0);

  const navItems = useMemo(
    () => [
      { name: "Home", id: "hero", icon: Home },
      { name: "About", id: "about", icon: Users },
      { name: "Services", id: "services", icon: Zap },
      { name: "Portfolio", id: "portfolio", icon: Briefcase },
      { name: "Contact", id: "contact", icon: Mail },
    ],
    []
  );

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    const progress = Math.min(
      (scrollPosition / (documentHeight - windowHeight)) * 100,
      100
    );
    setScrollProgress(progress);
    setIsScrolled(scrollPosition > 50);

    const sections = navItems.map((item) => item.id);
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          setActiveSection(section);
          break;
        }
      }
    }
  }, [navItems]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
  }, [isMenuOpen]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const offsetTop = element.offsetTop - headerHeight;

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
      setIsMenuOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="scroll-progress">
        <div
          className="progress-bar"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Header */}
      <header className={`header ${isScrolled ? "scrolled" : ""}`}>
        <nav className="nav-container">
          <div className="logo-container" onClick={() => scrollToSection("hero")}>
            <div className="logo-wrapper">
              <img src={logo} alt="Logo" className="logo" />
            </div>
          </div>

          {/* Desktop Links */}
          <div className="nav-links">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`nav-link ${activeSection === item.id ? "active" : ""}`}
                >
                  <span className="nav-link-content">
                    <Icon size={18} />
                    <span className="nav-link-text">{item.name}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Actions */}
          <div className="nav-actions">
            <button
              onClick={() => scrollToSection("contact")}
              className="cta-button"
            >
              Get Started
            </button>

            {scrollProgress > 20 && (
              <button onClick={scrollToTop} className="scroll-to-top">
                <ArrowUp size={18} />
              </button>
            )}

            <button
              className="mobile-menu-button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="menu-overlay" onClick={() => setIsMenuOpen(false)}>
          <div
            className="mobile-menu"
            onClick={(e) => e.stopPropagation()}
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="mobile-menu-item"
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
