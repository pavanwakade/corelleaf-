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


        {/* Enhanced Main Project Showcase */}
        <div className={`max-w-7xl mx-auto transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="relative overflow-hidden shadow-2xl rounded-3xl bg-white/90 backdrop-blur-sm group">
            {/* Animated border glow */}
            <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-3xl blur-sm`} />
            <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-20 transition-all duration-500 rounded-3xl`} />
            
            <div className="relative z-10 grid gap-0 lg:grid-cols-2">
              {/* Enhanced Image Section */}
              <div className="relative overflow-hidden group/image">
                {/* Loading skeleton */}
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
                )}
                
                <img
                  src={project.image}
                  alt={project.title}
                  onLoad={() => setImageLoaded(true)}
                  className={`object-cover w-full h-full transition-all duration-700 min-h-96 lg:min-h-[400px] group-hover/image:scale-110 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                
                {/* Overlay effects */}
                <div className="absolute inset-0 transition-all duration-500 bg-gradient-to-tr from-black/30 via-transparent to-black/10 group-hover/image:from-black/50" />
                
                {/* Category badge */}
                <div className={`absolute top-6 left-6 bg-gradient-to-r ${project.gradient} text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-lg backdrop-blur-sm group-hover:scale-110 transition-transform duration-300`}>
                  {project.category}
                </div>
                
                {/* Tags */}
                <div className="absolute flex gap-2 top-6 right-6">
                  {project.tags.map((tag, index) => (
                    <div key={index} className="px-3 py-1 text-xs font-medium text-white bg-black rounded-full bg-opacity-20 backdrop-blur-md">
                      {tag}
                    </div>
                  ))}
                </div>
                
                {/* Enhanced stats overlay */}
                <div className="absolute p-6 transition-all duration-500 transform translate-y-full shadow-xl bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl group-hover/image:translate-y-0">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    {Object.entries(project.stats).map(([key, value], index) => (
                      <div key={index} className="space-y-2">
                        <div className={`text-xl font-black bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                          {value}
                        </div>
                        <div className="text-xs font-medium text-gray-600 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Progress bars */}
                  <div className="mt-4 space-y-2">
                    {Object.entries(project.metrics).map(([key, value], index) => (
                      <div key={index} className="flex items-center gap-3">
                        <span className="w-20 text-xs font-medium text-gray-600 capitalize">{key}</span>
                        <div className="flex-1 h-2 overflow-hidden bg-gray-200 rounded-full">
                          <div 
                            className={`h-full bg-gradient-to-r ${project.gradient} rounded-full transition-all duration-1000 delay-${index * 200}`}
                            style={{ width: '85%' }}
                          />
                        </div>
                        <span className="text-xs font-bold text-gray-700">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover/image:opacity-100">
                  <button className="flex items-center justify-center w-16 h-16 text-white transition-all duration-300 bg-black rounded-full bg-opacity-20 backdrop-blur-md hover:scale-110 hover:bg-opacity-30">
                    <Play size={24} />
                  </button>
                </div>
              </div>
              
              {/* Enhanced Content Section */}
              <div className="relative z-10 flex flex-col justify-center p-8 lg:p-12 xl:p-16">
                {/* Project header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-2 rounded-xl bg-gradient-to-r ${project.gradient} text-white`}>
                    <Zap size={20} />
                  </div>
                  <div>
                    <span className={`text-sm font-bold bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                      Featured Project
                    </span>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{project.duration}</span>
                      <span>•</span>
                      <span>{project.team}</span>
                    </div>
                  </div>
                </div>
                
                <h3 className="mb-6 text-3xl font-black text-gray-900 transition-all duration-300 sm:text-4xl lg:text-5xl group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-indigo-600">
                  {project.title}
                </h3>
                
                <p className="mb-8 text-lg leading-relaxed text-gray-600 sm:text-xl">
                  {project.description}
                </p>
                
                {/* Enhanced Technologies */}
                <div className="mb-8">
                  <h4 className="flex items-center gap-2 mb-4 text-xl font-bold text-gray-900">
                    <Code size={20} />
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {project.technologies.map((tech, index) => (
                      <div
                        key={index}
                        className="relative group/tech"
                        onMouseEnter={() => setHoveredTech(index)}
                        onMouseLeave={() => setHoveredTech(null)}
                      >
                        <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-0 group-hover/tech:opacity-100 rounded-2xl blur-sm transition-opacity duration-300`} />
                        <span className={`relative px-4 py-2 bg-gradient-to-r ${project.gradient} text-white rounded-2xl text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer inline-block`}>
                          {tech}
                          {hoveredTech === index && (
                            <div className="absolute w-2 h-2 bg-white rounded-full -top-1 -right-1 animate-ping" />
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Enhanced Features */}
                <div className="mb-10">
                  <h4 className="flex items-center gap-2 mb-4 text-xl font-bold text-gray-900">
                    <Star size={20} />
                    Key Features
                  </h4>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {project.features.map((feature, index) => (
                      <div key={index} className="flex items-center group/feature">
                        <div className={`w-3 h-3 bg-gradient-to-r ${project.gradient} rounded-full mr-3 group-hover/feature:scale-125 transition-transform duration-300 flex-shrink-0`} />
                        <span className="font-medium text-gray-700 transition-colors duration-300 group-hover/feature:text-gray-900">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Enhanced Action Buttons */}
                <div className="flex flex-col gap-4 sm:flex-row">
                  <a
                    href={project.liveUrl}
                    className={`relative flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r ${project.gradient} rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden group/btn flex-1`}
                  >
                    {/* Button shine effect */}
                    <div className="absolute inset-0 transition-transform duration-700 transform -translate-x-full -skew-x-12 bg-white/20 group-hover/btn:translate-x-full" />
                    
                    <span className="relative z-10 flex items-center">
                      <ExternalLink size={20} className="mr-3 group-hover/btn:animate-bounce" />
                      Live Demo
                    </span>
                    
                    {/* Ripple effect */}
                    <div className="absolute inset-0 transition-opacity duration-150 bg-white opacity-0 group-active/btn:opacity-20 rounded-2xl" />
                  </a>
                  
                  <a
                    href={project.githubUrl}
                    className="flex items-center justify-center flex-1 px-8 py-4 text-lg font-bold text-gray-700 transition-all duration-300 transform bg-white border-2 border-gray-200 shadow-lg rounded-2xl hover:border-gray-300 hover:bg-gray-50 hover:scale-105 backdrop-blur-sm bg-white/80 hover:shadow-xl group/github"
                  >
                    <Github size={20} className="mr-3 group-hover/github:animate-spin" />
                    View Code
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Navigation */}
          <div className="flex items-center justify-center gap-8 mt-12 sm:mt-16">
            <button
              onClick={prevProject}
              className={`relative p-4 bg-white shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 border-2 border-transparent hover:border-gray-200 group overflow-hidden`}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              <ChevronLeft size={24} className="relative z-10 text-gray-600 transition-colors duration-300 group-hover:text-gray-800" />
            </button>
            
            {/* Enhanced Project Indicators */}
            <div className="flex gap-4">
              {projects.map((proj, index) => (
                <button
                  key={index}
                  onClick={() => goToProject(index)}
                  className={`relative w-12 h-3 rounded-full transition-all duration-500 transform hover:scale-110 overflow-hidden ${
                    index === currentProject 
                      ? `bg-gradient-to-r ${proj.gradient} shadow-lg scale-110` 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                >
                  {index === currentProject && (
                    <div className="absolute inset-0 bg-white rounded-full opacity-30 animate-pulse" />
                  )}
                  
                  {/* Progress indicator for auto-play */}
                  {index === currentProject && isAutoPlaying && (
                    <div 
                      className="absolute inset-0 origin-left transform scale-x-0 bg-white rounded-full opacity-50 animate-progress"
                      style={{ animation: 'progress 5s linear infinite' }}
                    />
                  )}
                </button>
              ))}
            </div>
            
            <button
              onClick={nextProject}
              className={`relative p-4 bg-white shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 border-2 border-transparent hover:border-gray-200 group overflow-hidden`}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              <ChevronRight size={24} className="relative z-10 text-gray-600 transition-colors duration-300 group-hover:text-gray-800" />
            </button>
          </div>

          {/* Auto-play control */}
          <div className="flex items-center justify-center mt-8">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                isAutoPlaying 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg' 
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              {isAutoPlaying ? <Play size={16} /> : <Heart size={16} />}
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
