import React from 'react';
import { motion } from 'framer-motion';
import { Code, Smartphone, Cloud, Database, Shield, Zap, ArrowRight, Sparkles } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Code className="text-blue-600" size={32} />,
      title: "Web Development",
      description: "Custom web applications built with modern frameworks like React, Vue, and Angular. Responsive, fast, and SEO-optimized.",
      features: ["React/Vue/Angular", "Responsive Design", "SEO Optimization", "Performance Tuning"],
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Smartphone className="text-green-600" size={32} />,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications for iOS and Android with seamless user experiences.",
      features: ["iOS & Android", "React Native", "Flutter", "App Store Deployment"],
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <Cloud className="text-purple-600" size={32} />,
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and migration services using AWS, Azure, and Google Cloud platforms.",
      features: ["AWS/Azure/GCP", "Migration Services", "DevOps", "Auto-scaling"],
      gradient: "from-purple-500 to-violet-500"
    },
    {
      icon: <Database className="text-orange-600" size={32} />,
      title: "Database Design",
      description: "Efficient database architecture and optimization for maximum performance and reliability.",
      features: ["SQL/NoSQL", "Performance Tuning", "Data Migration", "Backup Solutions"],
      gradient: "from-orange-500 to-amber-500"
    },
    {
      icon: <Shield className="text-red-600" size={32} />,
      title: "Cybersecurity",
      description: "Comprehensive security audits, vulnerability assessments, and implementation of robust security measures.",
      features: ["Security Audits", "Penetration Testing", "Compliance", "Monitoring"],
      gradient: "from-red-500 to-rose-500"
    },
    {
      icon: <Zap className="text-yellow-600" size={32} />,
      title: "API Development",
      description: "RESTful and GraphQL APIs with comprehensive documentation and robust authentication systems.",
      features: ["REST/GraphQL", "API Documentation", "Authentication", "Rate Limiting"],
      gradient: "from-yellow-500 to-orange-500"
    }
  ];

  return (
    <section id="services" className="relative py-12 overflow-hidden sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Background decoration - hidden on mobile for better performance */}
      <div className="absolute inset-0 hidden overflow-hidden sm:block">
        <div className="absolute top-0 w-48 h-48 rounded-full sm:w-72 sm:h-72 blur-3xl bg-gradient-to-br from-blue-400/10 to-purple-400/10 left-1/4"></div>
        <div className="absolute bottom-0 w-48 h-48 rounded-full sm:w-72 sm:h-72 blur-3xl bg-gradient-to-br from-purple-400/10 to-pink-400/10 right-1/4"></div>
      </div>
      
      <div className="container px-4 mx-auto sm:px-6">
        <div className="mb-8 text-center sm:mb-12 lg:mb-16">
          <div className="flex items-center justify-center mb-3 space-x-2 sm:mb-4">
            <Sparkles className="text-blue-600 animate-pulse" size={16} />
            <span className="text-sm font-semibold text-blue-600 sm:text-base">What We Offer</span>
          </div>
          <h2 className="mb-3 text-2xl font-bold text-transparent sm:mb-4 sm:text-3xl md:text-4xl lg:text-5xl bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text">Our Services</h2>
          <p className="max-w-3xl px-2 mx-auto text-sm text-gray-600 sm:text-base lg:text-xl">
            We offer comprehensive technology solutions to help your business thrive in the digital age. 
            From concept to deployment, we've got you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden transition-all duration-500 border border-gray-100 shadow-lg sm:shadow-xl bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl hover:shadow-2xl group hover:-translate-y-1 sm:hover:-translate-y-2"
              style={{ perspective: 1000 }}
              whileHover="hover"
            >
              <motion.div
                className="relative z-10 p-4 sm:p-6 lg:p-8"
                variants={{
                  initial: {
                    rotateY: 0,
                    scale: 1,
                  },
                  hover: {
                    rotateY: window.innerWidth > 768 ? 10 : 0,
                    scale: window.innerWidth > 768 ? 1.05 : 1.02,
                    boxShadow: '0px 10px 30px rgba(0,0,0,0.15)',
                  },
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                {/* Animated border - simplified for mobile */}
                <div className={`absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} style={{padding: '1px'}}>
                  <div className="w-full h-full bg-white rounded-xl sm:rounded-2xl"></div>
                </div>
                
                <div className="relative z-10">
                  <div className="flex justify-center mb-4 transition-all duration-500 sm:mb-6 group-hover:scale-110 group-hover:rotate-3 sm:group-hover:rotate-6">
                    <div className="relative">
                      {service.icon}
                      <div className={`absolute inset-0 rounded-full blur-lg bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500 hidden sm:block`}></div>
                    </div>
                  </div>
                  <h3 className="mb-3 text-lg font-bold text-center text-gray-900 transition-all duration-300 sm:mb-4 sm:text-xl lg:text-2xl group-hover:text-pink-500">{service.title}</h3>
                  <p className="mb-4 text-xs leading-relaxed text-center text-gray-600 sm:mb-6 sm:text-sm lg:text-base">{service.description}</p>
                  
                  <div className="mb-4 space-y-2 sm:mb-6 sm:space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center group/feature">
                        <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-r ${service.gradient} mr-2 sm:mr-3 group-hover:animate-pulse`}></div>
                        <span className="text-xs text-gray-700 transition-colors duration-300 sm:text-sm group-hover/feature:text-gray-900">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button
                    aria-label={`Learn more about ${service.title}`}
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className={`relative overflow-hidden text-xs sm:text-sm font-semibold transition-all duration-300 transform hover:scale-105 w-full bg-gradient-to-r ${service.gradient} text-white py-2.5 sm:py-3 rounded-lg sm:rounded-xl hover:shadow-lg group/btn`}
                  >
                    <span className="relative z-10 flex items-center justify-center">
                       More details
                      <ArrowRight className="ml-1 transition-transform duration-300 sm:ml-2 group-hover/btn:translate-x-1" size={14} />
                    </span>
                    <div className="absolute inset-0 transition-transform duration-700 transform -translate-x-full -skew-x-12 bg-white/20 group-hover/btn:translate-x-full"></div>
                  </button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center sm:mt-12 lg:mt-16">
          <div className="max-w-2xl p-4 mx-auto border border-gray-100 shadow-lg sm:p-6 lg:p-8 sm:shadow-xl bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl">
            <h3 className="mb-3 text-lg font-bold text-gray-900 sm:mb-4 sm:text-xl lg:text-2xl">Need a Custom Solution?</h3>
            <p className="px-2 mb-4 text-xs text-gray-600 sm:mb-6 sm:text-sm lg:text-base">We'd love to discuss your project and create a tailored solution that meets your specific needs.</p>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="relative px-4 py-3 overflow-hidden text-sm font-semibold text-white transition-all duration-300 transform rounded-lg shadow-lg sm:px-6 lg:px-8 sm:py-4 sm:text-base bg-gradient-to-r from-blue-600 to-purple-600 sm:rounded-xl hover:from-blue-700 hover:to-purple-700 hover:shadow-xl hover:scale-105 group"
            >
              <span className="relative z-10 flex items-center justify-center">
                <Sparkles className="mr-1 sm:mr-2 animate-spin" size={16} />
                Get Custom Quote
                <ArrowRight className="ml-1 transition-transform duration-300 sm:ml-2 group-hover:translate-x-1" size={16} />
              </span>
              <div className="absolute inset-0 transition-transform duration-1000 transform -translate-x-full -skew-x-12 bg-white/20 group-hover:translate-x-full"></div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;