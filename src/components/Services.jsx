import React from 'react';
import { Code, Smartphone, Cloud, Database, Shield, Zap, ArrowRight, Sparkles } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Code className="text-blue-600" size={40} />,
      title: "Web Development",
      description: "Custom web applications built with modern frameworks like React, Vue, and Angular. Responsive, fast, and SEO-optimized.",
      features: ["React/Vue/Angular", "Responsive Design", "SEO Optimization", "Performance Tuning"],
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Smartphone className="text-green-600" size={40} />,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications for iOS and Android with seamless user experiences.",
      features: ["iOS & Android", "React Native", "Flutter", "App Store Deployment"],
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <Cloud className="text-purple-600" size={40} />,
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and migration services using AWS, Azure, and Google Cloud platforms.",
      features: ["AWS/Azure/GCP", "Migration Services", "DevOps", "Auto-scaling"],
      gradient: "from-purple-500 to-violet-500"
    },
    {
      icon: <Database className="text-orange-600" size={40} />,
      title: "Database Design",
      description: "Efficient database architecture and optimization for maximum performance and reliability.",
      features: ["SQL/NoSQL", "Performance Tuning", "Data Migration", "Backup Solutions"],
      gradient: "from-orange-500 to-amber-500"
    },
    {
      icon: <Shield className="text-red-600" size={40} />,
      title: "Cybersecurity",
      description: "Comprehensive security audits, vulnerability assessments, and implementation of robust security measures.",
      features: ["Security Audits", "Penetration Testing", "Compliance", "Monitoring"],
      gradient: "from-red-500 to-rose-500"
    },
    {
      icon: <Zap className="text-yellow-600" size={40} />,
      title: "API Development",
      description: "RESTful and GraphQL APIs with comprehensive documentation and robust authentication systems.",
      features: ["REST/GraphQL", "API Documentation", "Authentication", "Rate Limiting"],
      gradient: "from-yellow-500 to-orange-500"
    }
  ];

  return (
    <section id="services" className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 rounded-full w-72 h-72 blur-3xl bg-gradient-to-br from-blue-400/10 to-purple-400/10 left-1/4"></div>
        <div className="absolute bottom-0 rounded-full w-72 h-72 blur-3xl bg-gradient-to-br from-purple-400/10 to-pink-400/10 right-1/4"></div>
      </div>
      
      <div className="container px-6 mx-auto">
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center mb-4 space-x-2">
            <Sparkles className="text-blue-600 animate-pulse" size={24} />
            <span className="font-semibold text-blue-600">What We Offer</span>
          </div>
          <h2 className="mb-4 text-4xl font-bold text-transparent md:text-5xl bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text">Our Services</h2>
          <p className="max-w-3xl mx-auto text-xl text-gray-600">
            We offer comprehensive technology solutions to help your business thrive in the digital age. 
            From concept to deployment, we've got you covered.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative overflow-hidden transition-all duration-500 border border-gray-100 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl hover:shadow-2xl group hover:-translate-y-2"
            >
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              {/* Animated border */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} style={{padding: '2px'}}>
                <div className="w-full h-full bg-white rounded-2xl"></div>
              </div>
              
              <div className="relative z-10 p-8">
                <div className="flex justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <div className="relative">
                    {service.icon}
                    <div className={`absolute inset-0 rounded-full blur-lg bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
                  </div>
                </div>
                <h3 className="mb-4 text-2xl font-bold text-center text-gray-900 transition-all duration-300 group-hover:text-pink-500 group-hover:bg-gradient-to-r group-hover:bg-clip-text" style={{backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`}}>{service.title}</h3>
                <p className="mb-6 leading-relaxed text-center text-gray-600">{service.description}</p>
                
                <div className="mb-6 space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center group/feature">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient} mr-3 group-hover:animate-pulse`}></div>
                      <span className="text-gray-700 transition-colors duration-300 group-hover/feature:text-gray-900">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <button
                  aria-label={`Learn more about ${service.title}`}
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className={`relative overflow-hidden font-semibold transition-all duration-300 transform hover:scale-105 w-full bg-gradient-to-r ${service.gradient} text-white py-3 rounded-xl hover:shadow-lg group/btn`}
                >
                  <span className="relative z-10 flex items-center justify-center">
                     More details
                    <ArrowRight className="ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" size={16} />
                  </span>
                  <div className="absolute inset-0 transition-transform duration-700 transform -translate-x-full -skew-x-12 bg-white/20 group-hover/btn:translate-x-full"></div>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="max-w-2xl p-8 mx-auto border border-gray-100 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
            <h3 className="mb-4 text-2xl font-bold text-gray-900">Need a Custom Solution?</h3>
            <p className="mb-6 text-gray-600">We'd love to discuss your project and create a tailored solution that meets your specific needs.</p>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="relative px-8 py-4 overflow-hidden font-semibold text-white transition-all duration-300 transform shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 hover:shadow-xl hover:scale-105 group"
            >
              <span className="relative z-10 flex items-center">
                <Sparkles className="mr-2 animate-spin" size={20} />
                Get Custom Quote
                <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" size={20} />
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