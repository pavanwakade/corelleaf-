import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Smartphone, Cloud, Database, Shield, Zap, ArrowRight, Sparkles } from 'lucide-react';
import './css/Services.css';

const Services = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const services = [
  //   const Services = () => {
  // const services = [
    {
      icon: <Code className="icon-blue" size={32} />,
      title: "Web Development",
      description: "Custom web applications built with modern frameworks like React, Vue, and Angular. Responsive, fast, and SEO-optimized.",
      features: ["React/Vue/Angular", "Responsive Design", "SEO Optimization", "Performance Tuning"],
      gradientClass: "gradient-blue"
    },
    {
      icon: <Smartphone className="icon-green" size={32} />,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications for iOS and Android with seamless user experiences.",
      features: ["iOS & Android", "React Native", "Flutter", "App Store Deployment"],
      gradientClass: "gradient-green"
    },
    {
      icon: <Cloud className="icon-purple" size={32} />,
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and migration services using AWS, Azure, and Google Cloud platforms.",
      features: ["AWS/Azure/GCP", "Migration Services", "DevOps", "Auto-scaling"],
      gradientClass: "gradient-purple"
    },
    {
      icon: <Database className="icon-orange" size={32} />,
      title: "Database Design",
      description: "Efficient database architecture and optimization for maximum performance and reliability.",
      features: ["SQL/NoSQL", "Performance Tuning", "Data Migration", "Backup Solutions"],
      gradientClass: "gradient-orange"
    },
    {
      icon: <Shield className="icon-red" size={32} />,
      title: "Cybersecurity",
      description: "Comprehensive security audits, vulnerability assessments, and implementation of robust security measures.",
      features: ["Security Audits", "Penetration Testing", "Compliance", "Monitoring"],
      gradientClass: "gradient-red"
    },
    {
      icon: <Zap className="icon-yellow" size={32} />,
      title: "API Development",
      description: "RESTful and GraphQL APIs with comprehensive documentation and robust authentication systems.",
      features: ["REST/GraphQL", "API Documentation", "Authentication", "Rate Limiting"],
      gradientClass: "gradient-yellow"
    }
  ];


  return (
    <section id="services" className="services-section" ref={ref}>
      <div className="services-container">
        <div className="services-header">
          <div className="services-subtitle">
            <Sparkles className="icon-blue pulse" size={16} />
            <span>What We Offer</span>
          </div>
          <h2 className="services-title">Our Services</h2>
          <p className="services-description">
            We offer comprehensive technology solutions to help your business thrive in the digital age. 
            From concept to deployment, we've got you covered.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="service-card"
              variants={cardVariants}
              initial="hidden"
              animate={controls}
              whileHover={{ scale: 1.07 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className={`service-gradient ${service.gradientClass}`}></div>
              <div className="service-content">
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-text">{service.description}</p>
                <ul className="service-features">
                  {service.features.map((feature, i) => (
                    <li key={i} className="feature-item">{feature}</li>
                  ))}
                </ul>
                <button
                  className={`service-button ${service.gradientClass}`}
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  More details <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="custom-solution">
          <h3>Need a Custom Solution?</h3>
          <p>We'd love to discuss your project and create a tailored solution that meets your specific needs.</p>
          <button
            className="custom-button"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Sparkles size={16} className="spin" /> Get Custom Quote <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
