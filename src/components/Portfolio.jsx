import React, { useState, useEffect, useRef } from 'react';
import { 
  ExternalLink, Github, ChevronLeft, ChevronRight, Award, Zap, 
  Eye, Star, TrendingUp, Code, Sparkles, Play, Heart, Users 
} from 'lucide-react';

const Portfolio = () => {
  const [currentProject, setCurrentProject] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [hoveredTech, setHoveredTech] = useState(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const sectionRef = useRef(null);
  const autoPlayRef = useRef(null);

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

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && isInView) {
      autoPlayRef.current = setInterval(() => {
        setCurrentProject((prev) => (prev + 1) % projects.length);
      }, 5000);
    } else {
      clearInterval(autoPlayRef.current);
    }

    return () => clearInterval(autoPlayRef.current);
  }, [isAutoPlaying, isInView]);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Reset image loaded state when project changes
  useEffect(() => {
    setImageLoaded(false);
  }, [currentProject]);

  const projects = [
    {
      title: "E-Commerce Platform",
      category: "Web Development",
      description: "A comprehensive e-commerce solution with inventory management, payment processing, and analytics dashboard. Built with modern technologies for scalability and performance.",
      image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "Redis", "AWS"],
      features: ["Real-time inventory", "Payment gateway", "Admin dashboard", "Mobile responsive", "AI recommendations", "Analytics"],
      liveUrl: "#",
      githubUrl: "#",
      gradient: "from-blue-500 via-cyan-500 to-blue-600",
      primaryColor: "blue",
      stats: { users: "10K+", revenue: "$2M+", rating: "4.9★" },
      metrics: { completion: "100%", satisfaction: "98%", performance: "A+" },
      tags: ["Featured", "Popular"],
      duration: "6 months",
      team: "5 developers"
    },
    {
      title: "Healthcare Management System",
      category: "Mobile App",
      description: "Mobile application for patient management, appointment scheduling, and telemedicine consultations. HIPAA compliant with end-to-end encryption.",
      image: "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg",
      technologies: ["React Native", "Firebase", "Redux", "WebRTC", "Socket.io", "Node.js"],
      features: ["Appointment booking", "Video consultations", "Patient records", "Push notifications", "Prescription management", "Health tracking"],
      liveUrl: "#",
      githubUrl: "#",
      gradient: "from-emerald-500 via-teal-500 to-emerald-600",
      primaryColor: "emerald",
      stats: { users: "5K+", satisfaction: "98%", rating: "4.8★" },
      metrics: { completion: "100%", uptime: "99.9%", security: "A+" },
      tags: ["Award Winner", "Healthcare"],
      duration: "8 months",
      team: "7 specialists"
    },
    {
      title: "Cloud Infrastructure Migration",
      category: "Cloud Solutions",
      description: "Complete cloud migration for a manufacturing company, reducing costs by 40% and improving scalability. Implemented DevOps best practices.",
      image: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg",
      technologies: ["AWS", "Docker", "Kubernetes", "Terraform", "Jenkins", "Prometheus"],
      features: ["Auto-scaling", "Load balancing", "CI/CD pipeline", "Monitoring", "Cost optimization", "Security compliance"],
      liveUrl: "#",
      githubUrl: "#",
      gradient: "from-purple-500 via-violet-500 to-purple-600",
      primaryColor: "purple",
      stats: { savings: "40%", uptime: "99.9%", performance: "+60%" },
      metrics: { completion: "100%", efficiency: "+75%", costs: "-40%" },
      tags: ["Enterprise", "Cloud"],
      duration: "4 months",
      team: "4 experts"
    },
    {
      title: "AI-Powered Analytics Dashboard",
      category: "Data Science",
      description: "Advanced analytics platform with machine learning capabilities for predictive insights and automated reporting. Real-time data processing.",
      image: "https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg",
      technologies: ["Python", "TensorFlow", "React", "D3.js", "PostgreSQL", "Apache Kafka"],
      features: ["Machine learning", "Predictive analytics", "Real-time data", "Custom reports", "Data visualization", "API integration"],
      liveUrl: "#",
      githubUrl: "#",
      gradient: "from-orange-500 via-red-500 to-orange-600",
      primaryColor: "orange",
      stats: { accuracy: "94%", speed: "10x faster", insights: "1000+" },
      metrics: { completion: "100%", accuracy: "94%", speed: "10x" },
      tags: ["AI/ML", "Innovation"],
      duration: "10 months",
      team: "6 data scientists"
    },
    {
      title: "E-Commerce Platform",
      category: "Web Development",
      description: "A comprehensive e-commerce solution with inventory management, payment processing, and analytics dashboard. Built with modern technologies for scalability and performance.",
      image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "Redis", "AWS"],
      features: ["Real-time inventory", "Payment gateway", "Admin dashboard", "Mobile responsive", "AI recommendations", "Analytics"],
      liveUrl: "#",
      githubUrl: "#",
      gradient: "from-blue-500 via-cyan-500 to-blue-600",
      primaryColor: "blue",
      stats: { users: "10K+", revenue: "$2M+", rating: "4.9★" },
      metrics: { completion: "100%", satisfaction: "98%", performance: "A+" },
      tags: ["Featured", "Popular"],
      duration: "6 months",
      team: "5 developers"
    }
  ];

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
    setIsAutoPlaying(false);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
    setIsAutoPlaying(false);
  };

  const goToProject = (index) => {
    setCurrentProject(index);
    setIsAutoPlaying(false);
  };

  const project = projects[currentProject];
  const parallaxOffset = scrollY * 0.5;

  // Floating particles component
  const FloatingParticles = ({ count = 25 }) => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-20 animate-pulse"
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

  return (
    <section 
      ref={sectionRef}
      id="portfolio"
      className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50 lg:pt-32"
    >
      {/* Advanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingParticles count={40} />
        
        {/* Animated gradient orbs with parallax */}
        <div 
          className="absolute rounded-full -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-cyan-400/20 blur-3xl animate-pulse"
          style={{ transform: `translateY(${parallaxOffset * 0.3}px)` }}
        />
        <div 
          className="absolute rounded-full -bottom-32 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 via-pink-400/20 to-indigo-400/20 blur-3xl animate-pulse"
          style={{ transform: `translateY(${-parallaxOffset * 0.2}px)` }}
        />
        
        {/* Geometric shapes */}
        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/4 right-1/4">
          <div className="w-24 h-24 border border-indigo-200/30 rounded-3xl animate-spin" style={{ animationDuration: '20s' }} />
        </div>
        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 bottom-1/4 left-1/4">
          <div className="w-16 h-16 border rounded-full border-blue-200/30 animate-bounce" style={{ animationDelay: '1s' }} />
        </div>

        {/* Interactive mouse follower */}
        <div 
          className="fixed w-8 h-8 transition-transform duration-300 ease-out rounded-full pointer-events-none bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-sm"
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
          <div className="inline-flex items-center gap-3 px-6 py-3 mb-8 text-sm font-medium text-indigo-600 transition-all duration-300 bg-white border border-indigo-200 rounded-full shadow-lg hover:shadow-xl hover:scale-105 backdrop-blur-sm bg-white/80">
            <Award className="animate-pulse" size={18} />
            Our Work
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-ping" />
          </div>
          
          <h2 className="mb-6 text-4xl font-black leading-tight text-transparent sm:mb-8 sm:text-5xl lg:text-6xl xl:text-7xl bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text">
            Our{' '}
            <span className="text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text">
              Portfolio
            </span>
          </h2>
          
          <p className="max-w-4xl mx-auto text-xl leading-relaxed text-gray-600 sm:text-2xl lg:text-3xl">
            Explore some of our recent projects and see how we've helped businesses achieve their goals 
            through{' '}
            <span className="font-semibold text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text">
              innovative technology solutions
            </span>
            .
          </p>
        </div>


        {/* Two Card Display with Hover Details */}
<div className={`max-w-6xl mx-auto transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
  {/* Display two cards at a time */}
  <div className="grid gap-6 md:grid-cols-2">
    {projects.slice(currentProject, currentProject + 2).map((project, index) => (
      <div key={currentProject + index} className="relative overflow-hidden shadow-lg rounded-2xl bg-white/95 backdrop-blur-sm group hover:shadow-2xl transition-all duration-500">
        {/* Subtle border glow on hover */}
        <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-75 transition-all duration-300 rounded-2xl blur-sm`} />
        <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-10 transition-all duration-300 rounded-2xl`} />
        
        {/* Image Section - Always Visible */}
        <div className="relative overflow-hidden">
          {/* Loading skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
          )}
          
          <img
            src={project.image}
            alt={project.title}
            onLoad={() => setImageLoaded(true)}
            className={`object-cover w-full transition-all duration-500 h-96 md:h-[28rem] group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
          
          {/* Overlay effects */}
          <div className="absolute inset-0 transition-all duration-300 bg-gradient-to-tr from-black/20 via-transparent to-black/5 group-hover:from-black/40" />
          
          {/* Project Title - Always Visible */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <h3 className="text-xl font-bold text-white md:text-2xl">
              {project.title}
            </h3>
          </div>
          
          {/* Category badge - Always Visible */}
          <div className={`absolute top-3 left-3 bg-gradient-to-r ${project.gradient} text-white px-3 py-1 rounded-lg text-xs font-semibold shadow-md backdrop-blur-sm`}>
            {project.category}
          </div>
        </div>
        
        {/* Details Section - Only Visible on Hover */}
        <div className="absolute inset-0 bg-white/95 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-center p-6 transform translate-y-full group-hover:translate-y-0">
          {/* Project header */}
          <div className="flex items-center gap-2 mb-4">
            <div className={`p-1.5 rounded-lg bg-gradient-to-r ${project.gradient} text-white`}>
              <Zap size={16} />
            </div>
            <div>
              <span className={`text-sm font-semibold bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                Featured Project
              </span>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <span>{project.duration}</span>
                <span>•</span>
                <span>{project.team}</span>
              </div>
            </div>
          </div>
          
          {/* Project Title */}
          <h3 className={`mb-3 text-2xl font-bold bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
            {project.title}
          </h3>
          
          {/* Description */}
          <p className="mb-4 text-sm leading-relaxed text-gray-700 line-clamp-3">
            {project.description}
          </p>
          
          {/* Technologies */}
          <div className="mb-4">
            <h4 className="flex items-center gap-1 mb-2 text-sm font-semibold text-gray-900">
              <Code size={14} />
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 4).map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className={`px-2 py-1 bg-gradient-to-r ${project.gradient} text-white rounded-lg text-xs font-medium shadow-sm`}
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="px-2 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded-lg">
                  +{project.technologies.length - 4}
                </span>
              )}
            </div>
          </div>
          
          {/* Key Features */}
          <div className="mb-4">
            <h4 className="flex items-center gap-1 mb-2 text-sm font-semibold text-gray-900">
              <Star size={14} />
              Key Features
            </h4>
            <div className="space-y-1">
              {project.features.slice(0, 3).map((feature, featureIndex) => (
                <div key={featureIndex} className="flex items-center text-xs">
                  <div className={`w-2 h-2 bg-gradient-to-r ${project.gradient} rounded-full mr-2 flex-shrink-0`} />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Project Stats */}
          <div className="mb-4">
            <div className="grid grid-cols-3 gap-2 text-center">
              {Object.entries(project.stats).slice(0, 3).map(([key, value], statIndex) => (
                <div key={statIndex} className="space-y-1">
                  <div className={`text-lg font-bold bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                    {value}
                  </div>
                  <div className="text-xs text-gray-600 capitalize">{key}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Action Button */}
          <div className="mt-auto">
            <a
              href={project.liveUrl}
              className={`relative flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r ${project.gradient} rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 overflow-hidden group/btn w-full`}
            >
              {/* Button shine effect */}
              <div className="absolute inset-0 transition-transform duration-500 transform -translate-x-full -skew-x-12 bg-white/20 group-hover/btn:translate-x-full" />
              
              <span className="relative z-10 flex items-center">
                <ExternalLink size={16} className="mr-2 group-hover/btn:animate-bounce" />
                Live Demo
              </span>
            </a>
          </div>
        </div>
      </div>
    ))}
  </div>

  {/* Navigation for Two-Card Sets */}
  <div className="flex items-center justify-center gap-4 mt-8">
    <button
      onClick={() => setCurrentProject(Math.max(0, currentProject - 2))}
      disabled={currentProject === 0}
      className={`relative p-3 bg-white shadow-md rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-110 border border-gray-100 hover:border-gray-200 group overflow-hidden ${
        currentProject === 0 ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${projects[currentProject]?.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
      <ChevronLeft size={18} className="relative z-10 text-gray-600 transition-colors duration-300 group-hover:text-gray-800" />
    </button>
    
    {/* Project Set Indicators */}
    <div className="flex gap-2">
      {Array.from({ length: Math.ceil(projects.length / 2) }, (_, index) => (
        <button
          key={index}
          onClick={() => setCurrentProject(index * 2)}
          className={`relative w-8 h-2 rounded-full transition-all duration-300 transform hover:scale-110 overflow-hidden ${
            Math.floor(currentProject / 2) === index
              ? `bg-gradient-to-r ${projects[currentProject]?.gradient} shadow-md scale-110` 
              : 'bg-gray-300 hover:bg-gray-400'
          }`}
        >
          {Math.floor(currentProject / 2) === index && (
            <div className="absolute inset-0 bg-white rounded-full opacity-30 animate-pulse" />
          )}
        </button>
      ))}
    </div>
    
    <button
      onClick={() => setCurrentProject(Math.min(projects.length - 2, currentProject + 2))}
      disabled={currentProject >= projects.length - 2}
      className={`relative p-3 bg-white shadow-md rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-110 border border-gray-100 hover:border-gray-200 group overflow-hidden ${
        currentProject >= projects.length - 2 ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${projects[currentProject]?.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
      <ChevronRight size={18} className="relative z-10 text-gray-600 transition-colors duration-300 group-hover:text-gray-800" />
    </button>
  </div>

  {/* Auto-play control for two-card sets */}
  <div className="flex items-center justify-center mt-4">
    <button
      onClick={() => setIsAutoPlaying(!isAutoPlaying)}
      className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${
        isAutoPlaying 
          ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md' 
          : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
      }`}
    >
      {isAutoPlaying ? <Play size={12} /> : <Heart size={12} />}
      {isAutoPlaying ? 'Auto-playing' : 'Manual mode'}
    </button>
  </div>
</div>
      </div> 

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes progress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        .animate-progress {
          transform-origin: left;
        }
      `}</style>
    </section>
  );
};

export default Portfolio;
