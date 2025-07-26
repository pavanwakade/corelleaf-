import React, { useState, useEffect, useRef } from 'react';
import {
  Mail, Phone, MapPin, Send, CheckCircle, Sparkles, Clock,
  Calendar, MessageSquare, Zap, Globe, Shield, Award
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [hoveredInfo, setHoveredInfo] = useState(null);
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef(null);
  const formRef = useRef(null);

  // Advanced intersection observer and scroll effects
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

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);

      // Simulate API call with loading state
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);

        // Reset form after success message
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: '',
            email: '',
            company: '',
            phone: '',
            service: '',
            message: ''
          });
        }, 4000);
      }, 2000);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="text-blue-600" size={28} />,
      title: "Email Us",
      details: "career@corelleaf.com",
      subDetails: "We'll respond within 24 hours",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      accentIcon: <Zap size={16} />,
      response: "24h response"
    },
    {
      icon: <Phone className="text-emerald-600" size={28} />,
      title: "Call Us",
      details: "+91-7507454042",
      subDetails: "Mon-Fri 9AM-6PM EST",
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      accentIcon: <Clock size={16} />,
      response: "Live support"
    },
    {
      icon: <MapPin className="text-purple-600" size={28} />,
      title: "Visit Us",
      details: `Venus Garden Building, Office No- 10,
behind Bank of Baroda, Thite Vasti,
Kharadi,Pune`,
      subDetails: " Maharashtra 411014.",
      color: "from-purple-500 to-violet-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      accentIcon: <Globe size={16} />,
      response: "In-person meetings"
    }
  ];

  const features = [
    {
      icon: <Shield size={24} />,
      title: "Secure Communication",
      description: "Enterprise-grade security for all communications"
    },
    {
      icon: <Award size={24} />,
      title: "Expert Team",
      description: "Get responses from our senior consultants"
    },
    {
      icon: <MessageSquare size={24} />,
      title: "Detailed Consultation",
      description: "Comprehensive project analysis and recommendations"
    }
  ];

  // Floating particles component
  const FloatingParticles = ({ count = 20 }) => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-20 animate-pulse"
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

  const parallaxOffset = scrollY * 0.5;

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-20 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-purple-50 sm:py-24 lg:py-32"
    >
      {/* Advanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingParticles count={30} />

        {/* Animated gradient orbs */}
        <div
          className="absolute rounded-full -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-pink-400/20 blur-3xl animate-pulse"
          style={{ transform: `translateY(${parallaxOffset * 0.3}px)` }}
        />
        <div
          className="absolute rounded-full -bottom-32 -left-40 w-96 h-96 bg-gradient-to-br from-emerald-400/20 via-cyan-400/20 to-blue-400/20 blur-3xl animate-pulse"
          style={{ transform: `translateY(${-parallaxOffset * 0.2}px)` }}
        />

        {/* Geometric shapes */}
        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/3 left-2/3">
          <div className="w-20 h-20 border border-purple-200/40 rounded-2xl animate-spin" style={{ animationDuration: '15s' }} />
        </div>
        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-2/3 left-1/4">
          <div className="w-12 h-12 border rounded-full border-blue-200/40 animate-bounce" style={{ animationDelay: '2s' }} />
        </div>

        {/* Interactive mouse follower */}
        <div
          className="fixed w-8 h-8 transition-transform duration-300 ease-out rounded-full pointer-events-none bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-sm"
          style={{
            left: mousePosition.x - 16,
            top: mousePosition.y - 16,
            transform: `scale(${isInView ? 1 : 0})`
          }}
        />
      </div>

      <div className="container relative px-4 mx-auto sm:px-6 lg:px-8">
        {/* Enhanced Header Section */}
        <div className={`mb-16 sm:mb-20 lg:mb-24 text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center gap-3 px-6 py-3 mb-8 text-sm font-medium text-purple-600 transition-all duration-300 bg-white border border-purple-200 rounded-full shadow-lg hover:shadow-xl hover:scale-105 backdrop-blur-sm bg-white/80">
            <MessageSquare size={18} className="animate-pulse" />
            Let's Connect
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-ping" />
          </div>

          <h2 className="mb-6 text-4xl font-black leading-tight text-transparent sm:mb-8 sm:text-5xl lg:text-6xl xl:text-7xl bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 bg-clip-text">
            Get In{' '}
            <span className="text-transparent bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text">
              Touch
            </span>
          </h2>

          <p className="max-w-4xl mx-auto text-xl leading-relaxed text-gray-600 sm:text-2xl lg:text-3xl">
            Ready to start your next project? We'd love to hear from you.{' '}
            <span className="font-semibold text-transparent bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text">
              Send us a message
            </span>{' '}
            and we'll respond as soon as possible.
          </p>
        </div>

        {/* Features Section */}
        <div className={`grid gap-6 sm:grid-cols-3 mb-16 sm:mb-20 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {features.map((feature, index) => (
            <div key={index} className="relative group">
              <div className="absolute inset-0 transition-all duration-300 transform shadow-lg bg-gradient-to-br from-white to-purple-50 rounded-2xl group-hover:shadow-xl group-hover:-translate-y-1" />
              <div className="relative p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 mb-4 text-purple-600 transition-transform duration-300 bg-purple-100 rounded-2xl group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-lg font-bold text-gray-900">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20 xl:gap-24">
          {/* Enhanced Contact Information */}
          <div className={`space-y-8 transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div>
              <div className="inline-flex items-center gap-3 px-4 py-2 mb-6 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">
                <Sparkles size={16} />
                Start a Conversation
              </div>

              <h3 className="mb-6 text-3xl font-black text-gray-900 sm:text-4xl">
                Let's Create Something{' '}
                <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                  Amazing
                </span>
              </h3>

              <p className="mb-8 text-lg leading-relaxed text-gray-600 sm:text-xl">
                Whether you need a complete digital transformation or just want to discuss your ideas,
                we're here to help. Our team of experts is ready to turn your vision into reality.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden group"
                  onMouseEnter={() => setHoveredInfo(index)}
                  onMouseLeave={() => setHoveredInfo(null)}
                >
                  {/* Animated background glow */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${info.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-all duration-500 transform group-hover:scale-105`} />

                  {/* Main card */}
                  <div className={`relative flex items-start gap-4 p-6 bg-white/80 backdrop-blur-sm border-2 ${info.borderColor} shadow-lg rounded-2xl group-hover:shadow-2xl transition-all duration-500 group-hover:bg-white/90 group-hover:-translate-y-1`}>
                    {/* Icon container */}
                    <div className={`flex-shrink-0 p-3 ${info.bgColor} rounded-2xl group-hover:scale-110 transition-transform duration-300 relative overflow-hidden`}>
                      <div className={`absolute inset-0 bg-gradient-to-br ${info.color} opacity-20 group-hover:opacity-40 transition-opacity duration-300`} />
                      <div className="relative z-10">
                        {info.icon}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-xl font-bold text-gray-900 transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-blue-600">
                          {info.title}
                        </h4>
                        <div className={`flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${info.color} text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                          {info.accentIcon}
                          {info.response}
                        </div>
                      </div>
                      <p className="mb-1 text-lg font-semibold text-gray-700 transition-colors duration-300 group-hover:text-gray-900">
                        {info.details}
                      </p>
                      <p className="text-sm text-gray-500 transition-colors duration-300 group-hover:text-gray-600">
                        {info.subDetails}
                      </p>
                    </div>

                    {/* Hover indicator */}
                    <div className="absolute transition-all duration-300 opacity-0 top-4 right-4 group-hover:opacity-100 group-hover:scale-110">
                      <div className={`p-2 rounded-full bg-gradient-to-br ${info.color} text-white shadow-lg`}>
                        <Send size={16} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced CTA Card */}
            <div className="relative p-8 overflow-hidden text-white bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
              <div className="absolute w-20 h-20 rounded-full top-4 right-4 bg-white/10 animate-pulse" />
              <div className="absolute w-12 h-12 rounded-full bottom-4 left-4 bg-white/10 animate-bounce" style={{ animationDelay: '1s' }} />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar size={24} />
                  <h4 className="text-2xl font-black">Free Consultation</h4>
                </div>
                <p className="mb-6 text-lg text-white/90">
                  Get a free 30-minute consultation to discuss your project requirements and learn how we can help accelerate your success.
                </p>
                <button className="px-8 py-3 text-lg font-bold text-purple-600 transition-all duration-300 bg-white shadow-xl rounded-2xl hover:shadow-2xl hover:scale-105 hover:bg-gray-50 group-hover:animate-pulse">
                  Schedule Now
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced Contact Form */}
          <div className={`transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="relative p-8 overflow-hidden bg-white shadow-2xl sm:p-10 rounded-3xl backdrop-blur-sm bg-white/90">
              {/* Form background effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-3xl" />
              <div className="absolute w-16 h-16 rounded-full top-6 right-6 bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-xl animate-pulse" />

              <div className="relative z-10">
                {isSubmitted ? (
                  <div className="py-16 text-center">
                    <div className="relative inline-block mb-6">
                      <CheckCircle className="mx-auto text-green-600 animate-bounce" size={80} />
                      <div className="absolute inset-0 bg-green-400 rounded-full opacity-20 animate-ping" />
                    </div>
                    <h3 className="mb-4 text-3xl font-black text-gray-900">Thank You!</h3>
                    <p className="text-lg text-gray-600">
                      Your message has been sent successfully. We'll get back to you within 24 hours.
                    </p>
                    <div className="flex items-center justify-center gap-2 mt-6 text-sm text-green-600">
                      <Zap size={16} />
                      <span className="font-medium">Priority response activated</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="mb-8 text-center">
                      <h3 className="mb-2 text-2xl font-black text-gray-900 sm:text-3xl">
                        Send us a{' '}
                        <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                          Message
                        </span>
                      </h3>
                      <p className="text-gray-600">Fill out the form below and we'll be in touch soon.</p>
                    </div>

                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="relative">
                          <label htmlFor="name" className="block mb-2 text-sm font-bold text-gray-700">
                            Full Name *
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              onFocus={() => setFocusedField('name')}
                              onBlur={() => setFocusedField(null)}
                              className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm ${errors.name ? 'border-red-500 shake' : focusedField === 'name' ? 'border-blue-500 shadow-lg' : 'border-gray-200'
                                }`}
                              placeholder="John Doe"
                            />
                            {focusedField === 'name' && (
                              <div className="absolute w-full h-full border-2 border-blue-400 opacity-50 rounded-xl animate-pulse -inset-0" />
                            )}
                          </div>
                          {errors.name && (
                            <p className="flex items-center gap-1 mt-2 text-sm text-red-500 animate-shake">
                              <span className="w-1 h-1 bg-red-500 rounded-full" />
                              {errors.name}
                            </p>
                          )}
                        </div>

                        <div className="relative">
                          <label htmlFor="email" className="block mb-2 text-sm font-bold text-gray-700">
                            Email Address *
                          </label>
                          <div className="relative">
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              onFocus={() => setFocusedField('email')}
                              onBlur={() => setFocusedField(null)}
                              className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm ${errors.email ? 'border-red-500' : focusedField === 'email' ? 'border-blue-500 shadow-lg' : 'border-gray-200'
                                }`}
                              placeholder="john@example.com"
                            />
                            {focusedField === 'email' && (
                              <div className="absolute w-full h-full border-2 border-blue-400 opacity-50 rounded-xl animate-pulse -inset-0" />
                            )}
                          </div>
                          {errors.email && (
                            <p className="flex items-center gap-1 mt-2 text-sm text-red-500">
                              <span className="w-1 h-1 bg-red-500 rounded-full" />
                              {errors.email}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="relative">
                          <label htmlFor="company" className="block mb-2 text-sm font-bold text-gray-700">
                            Company Name
                          </label>
                          <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('company')}
                            onBlur={() => setFocusedField(null)}
                            className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm ${focusedField === 'company' ? 'border-blue-500 shadow-lg' : 'border-gray-200'
                              }`}
                            placeholder="Your Company"
                          />
                        </div>

                        <div className="relative">
                          <label htmlFor="phone" className="block mb-2 text-sm font-bold text-gray-700">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('phone')}
                            onBlur={() => setFocusedField(null)}
                            className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm ${focusedField === 'phone' ? 'border-blue-500 shadow-lg' : 'border-gray-200'
                              }`}
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                      </div>

                      <div className="relative">
                        <label htmlFor="service" className="block mb-2 text-sm font-bold text-gray-700">
                          Service Interested In
                        </label>
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('service')}
                          onBlur={() => setFocusedField(null)}
                          className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm ${focusedField === 'service' ? 'border-blue-500 shadow-lg' : 'border-gray-200'
                            }`}
                        >
                          <option value="">Select a service</option>
                          <option value="web-development">🌐 Web Development</option>
                          <option value="mobile-apps">📱 Mobile App Development</option>
                          <option value="cloud-solutions">☁️ Cloud Solutions</option>
                          <option value="database-design">🗄️ Database Design</option>
                          <option value="cybersecurity">🔒 Cybersecurity</option>
                          <option value="api-development">🔗 API Development</option>
                          <option value="other">✨ Other</option>
                        </select>
                      </div>

                      <div className="relative">
                        <label htmlFor="message" className="block mb-2 text-sm font-bold text-gray-700">
                          Project Description *
                        </label>
                        <div className="relative">
                          <textarea
                            id="message"
                            name="message"
                            rows={6}
                            value={formData.message}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('message')}
                            onBlur={() => setFocusedField(null)}
                            className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 resize-none bg-white/80 backdrop-blur-sm ${errors.message ? 'border-red-500' : focusedField === 'message' ? 'border-blue-500 shadow-lg' : 'border-gray-200'
                              }`}
                            placeholder="Tell us about your project requirements, timeline, and any specific needs. The more details you provide, the better we can help you!"
                          />
                          {focusedField === 'message' && (
                            <div className="absolute w-full h-full border-2 border-blue-400 opacity-50 rounded-xl animate-pulse -inset-0" />
                          )}
                        </div>
                        {errors.message && (
                          <p className="flex items-center gap-1 mt-2 text-sm text-red-500">
                            <span className="w-1 h-1 bg-red-500 rounded-full" />
                            {errors.message}
                          </p>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="relative flex items-center justify-center w-full px-8 py-5 overflow-hidden text-lg font-bold text-white transition-all duration-500 shadow-xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-2xl group hover:shadow-2xl hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {/* Button background animation */}
                        <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 group-hover:opacity-100" />

                        {/* Loading spinner */}
                        {isSubmitting && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-6 h-6 border-2 border-white rounded-full border-t-transparent animate-spin" />
                          </div>
                        )}

                        <span className={`transition-opacity duration-300 ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
                          Send Message
                        </span>
                        <Send
                          className={`ml-3 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110 ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}
                          size={20}
                        />

                        {/* Ripple effect */}
                        <div className="absolute inset-0 transition-opacity duration-150 bg-white opacity-0 group-active:opacity-20 rounded-2xl" />
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for additional animations */}
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        .shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default Contact;
