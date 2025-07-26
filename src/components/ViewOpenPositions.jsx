import React, { useState, useEffect, useRef } from 'react';
import {
    MapPin, Clock, DollarSign, Users, Star, Search, Filter,
    ChevronRight, Briefcase, Heart, Code, Award, Zap,
    Calendar, Send, ExternalLink, TrendingUp, Globe, Shield
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import JobApplicationPage from './JobApplicationPage'; // Import the application page component

const ViewOpenPositions = () => {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [scrollY, setScrollY] = useState(0);
    const [isInView, setIsInView] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedLevel, setSelectedLevel] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [hoveredJob, setHoveredJob] = useState(null);
    const [showFilters, setShowFilters] = useState(false);
    const [appliedJobs, setAppliedJobs] = useState(new Set());
    const [selectedJob, setSelectedJob] = useState(null); // New state for selected job
    const [showApplicationPage, setShowApplicationPage] = useState(false); // New state for application page
    const sectionRef = useRef(null);

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

    const jobCategories = [
        { id: 'all', name: 'All Positions', count: 12, color: 'from-gray-500 to-gray-600' },
        { id: 'engineering', name: 'Engineering', count: 6, color: 'from-blue-500 to-cyan-500' },
        { id: 'design', name: 'Design', count: 3, color: 'from-purple-500 to-violet-500' },
        { id: 'marketing', name: 'Marketing', count: 2, color: 'from-pink-500 to-rose-500' },
        { id: 'sales', name: 'Sales', count: 1, color: 'from-emerald-500 to-teal-500' }
    ];

    const experienceLevels = [
        { id: 'all', name: 'All Levels' },
        { id: 'entry', name: 'Entry Level' },
        { id: 'mid', name: 'Mid Level' },
        { id: 'senior', name: 'Senior Level' },
        { id: 'lead', name: 'Lead/Principal' }
    ];

    const openPositions = [
        {
            id: 1,
            title: "Senior Full Stack Developer",
            category: "engineering",
            level: "senior",
            location: "San Francisco, CA",
            type: "Full-time",
            salary: "$120k - $180k",
            experience: "5+ years",
            description: "Join our core engineering team to build scalable web applications using React, Node.js, and cloud technologies. Work on cutting-edge projects that impact millions of users worldwide.",
            requirements: ["React/Next.js expertise", "Node.js/Express", "AWS/Azure", "Database design", "API development"],
            benefits: ["Equity package", "Health insurance", "Remote flexible", "Learning budget", "Unlimited PTO"],
            gradient: "from-blue-500 via-cyan-500 to-blue-600",
            urgency: "high",
            postedDays: 2,
            applicants: 45,
            tags: ["React", "Node.js", "AWS", "Remote OK"],
            team: "Core Platform",
            department: "Engineering"
        },
        {
            id: 2,
            title: "UX/UI Designer",
            category: "design",
            level: "mid",
            location: "New York, NY",
            type: "Full-time",
            salary: "$90k - $130k",
            experience: "3+ years",
            description: "Create beautiful, intuitive user experiences for our growing suite of products. Work closely with engineering and product teams to deliver exceptional user interfaces.",
            requirements: ["Figma/Sketch expert", "User research", "Prototyping", "Design systems", "HTML/CSS knowledge"],
            benefits: ["Design budget", "Conference tickets", "Health insurance", "Stock options", "Flexible hours"],
            gradient: "from-purple-500 via-violet-500 to-purple-600",
            urgency: "medium",
            postedDays: 5,
            applicants: 28,
            tags: ["Figma", "Design Systems", "UX Research", "Hybrid"],
            team: "Product Design",
            department: "Design"
        },
        {
            id: 3,
            title: "DevOps Engineer",
            category: "engineering",
            level: "senior",
            location: "Austin, TX",
            type: "Full-time",
            salary: "$130k - $170k",
            experience: "4+ years",
            description: "Build and maintain our cloud infrastructure, implement CI/CD pipelines, and ensure system reliability and scalability. Lead the transformation to modern DevOps practices.",
            requirements: ["Kubernetes/Docker", "AWS/GCP", "Terraform", "CI/CD pipelines", "Monitoring tools"],
            benefits: ["Signing bonus", "Health insurance", "401k match", "Remote first", "Tech allowance"],
            gradient: "from-emerald-500 via-teal-500 to-emerald-600",
            urgency: "high",
            postedDays: 1,
            applicants: 32,
            tags: ["Kubernetes", "AWS", "Terraform", "Remote"],
            team: "Infrastructure",
            department: "Engineering"
        },
        {
            id: 4,
            title: "Frontend Developer",
            category: "engineering",
            level: "mid",
            location: "Remote",
            type: "Full-time",
            salary: "$100k - $140k",
            experience: "3+ years",
            description: "Build responsive, performant user interfaces using modern JavaScript frameworks. Focus on user experience, accessibility, and performance optimization for web applications.",
            requirements: ["React/Vue.js", "TypeScript", "CSS/Tailwind", "Testing frameworks", "Performance optimization"],
            benefits: ["Remote first", "Learning stipend", "Health coverage", "Flexible PTO", "Home office setup"],
            gradient: "from-orange-500 via-red-500 to-orange-600",
            urgency: "medium",
            postedDays: 7,
            applicants: 67,
            tags: ["React", "TypeScript", "Remote", "Accessibility"],
            team: "Frontend Platform",
            department: "Engineering"
        },
        {
            id: 5,
            title: "Product Marketing Manager",
            category: "marketing",
            level: "mid",
            location: "Los Angeles, CA",
            type: "Full-time",
            salary: "$110k - $150k",
            experience: "4+ years",
            description: "Drive product positioning, messaging, and go-to-market strategies. Work with cross-functional teams to launch new features and drive product adoption in competitive markets.",
            requirements: ["B2B marketing", "Product launches", "Content creation", "Analytics", "Cross-functional leadership"],
            benefits: ["Marketing budget", "Conference travel", "Health insurance", "Stock options", "Unlimited PTO"],
            gradient: "from-pink-500 via-rose-500 to-pink-600",
            urgency: "low",
            postedDays: 10,
            applicants: 23,
            tags: ["B2B", "Product Launch", "Analytics", "Hybrid"],
            team: "Growth Marketing",
            department: "Marketing"
        },
        {
            id: 6,
            title: "Sales Development Representative",
            category: "sales",
            level: "entry",
            location: "Chicago, IL",
            type: "Full-time",
            salary: "$60k - $90k + Commission",
            experience: "1+ years",
            description: "Generate and qualify leads for our enterprise sales team. Great opportunity to grow into account management role with clear career progression and mentorship program.",
            requirements: ["Sales experience", "CRM proficiency", "Communication skills", "Lead qualification", "Goal-oriented"],
            benefits: ["Commission structure", "Career growth", "Training program", "Health benefits", "Team events"],
            gradient: "from-yellow-500 via-amber-500 to-yellow-600",
            urgency: "medium",
            postedDays: 3,
            applicants: 89,
            tags: ["Sales", "CRM", "Commission", "Growth"],
            team: "Sales Development",
            department: "Sales"
        }
    ];

    const companyStats = [
        { icon: <Users size={24} />, number: "150+", label: "Team Members", color: "from-blue-500 to-cyan-500" },
        { icon: <Globe size={24} />, number: "15+", label: "Countries", color: "from-emerald-500 to-teal-500" },
        { icon: <Award size={24} />, number: "4.8", label: "Glassdoor Rating", color: "from-yellow-500 to-orange-500" },
        { icon: <TrendingUp size={24} />, number: "300%", label: "Growth Rate", color: "from-purple-500 to-violet-500" }
    ];

    const benefits = [
        {
            icon: <Heart size={24} />,
            title: "Health & Wellness",
            description: "Comprehensive health, dental, and vision insurance",
            color: "from-red-500 to-pink-500"
        },
        {
            icon: <Globe size={24} />,
            title: "Remote Flexibility",
            description: "Work from anywhere with flexible hours",
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: <Code size={24} />,
            title: "Learning & Growth",
            description: "$3000 annual learning budget and conference tickets",
            color: "from-purple-500 to-violet-500"
        },
        {
            icon: <Shield size={24} />,
            title: "Financial Security",
            description: "Competitive salary, equity, and 401k matching",
            color: "from-emerald-500 to-teal-500"
        }
    ];

    // Filter jobs based on selected criteria
    const filteredJobs = openPositions.filter(job => {
        const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
        const matchesLevel = selectedLevel === 'all' || job.level === selectedLevel;
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesCategory && matchesLevel && matchesSearch;
    });

    // Modified apply handler to open application page
    const handleApply = (job) => {
        setSelectedJob(job);
        setShowApplicationPage(true);
    };

    const handleApplicationClose = () => {
        setShowApplicationPage(false);
        setSelectedJob(null);
    };

    const handleApplicationSubmit = (jobId, applicationData) => {
        setAppliedJobs(prev => new Set([...prev, jobId]));
        setShowApplicationPage(false);
        setSelectedJob(null);
        // Here you would typically send the application data to your backend
        console.log('Application submitted:', { jobId, applicationData });
    };

    // Floating particles component
    const FloatingParticles = ({ count = 30 }) => (
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

    const parallaxOffset = scrollY * 0.5;

    // If application page is shown, render it instead
    if (showApplicationPage && selectedJob) {
        return (
            <JobApplicationPage
                job={selectedJob}
                onClose={handleApplicationClose}
                onSubmit={handleApplicationSubmit}
            />
        );
    }

    return (

        <>


            {showApplicationPage && selectedJob ? (
                <JobApplicationPage
                    job={selectedJob}
                    onClose={handleApplicationClose}
                    onSubmit={handleApplicationSubmit}
                />
            ) : (

                <section
                    ref={sectionRef}
                    className="relative py-10 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 sm:py-24 lg:py-32"
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
                            <div className="w-24 h-24 border border-blue-200/30 rounded-3xl animate-spin" style={{ animationDuration: '20s' }} />
                        </div>

                        {/* Interactive mouse follower */}
                        <div
                            className="fixed w-8 h-8 transition-transform duration-300 ease-out rounded-full pointer-events-none bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-sm"
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
                            <div className="inline-flex items-center gap-3 px-6 py-3 mb-8 text-sm font-medium text-blue-600 transition-all duration-300 bg-white border border-blue-200 rounded-full shadow-lg hover:shadow-xl hover:scale-105 backdrop-blur-sm bg-white/80">
                                <Briefcase size={18} className="animate-pulse" />
                                Join Our Team
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
                            </div>

                            <h1 className="mb-6 text-4xl font-black leading-tight text-transparent sm:mb-8 sm:text-5xl lg:text-6xl xl:text-7xl bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text">
                                Open{' '}
                                <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                                    Positions
                                </span>
                            </h1>

                            <p className="max-w-4xl mx-auto text-xl leading-relaxed text-gray-600 sm:text-2xl lg:text-3xl">
                                Join our passionate team of innovators and help us{' '}
                                <span className="font-semibold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                                    shape the future
                                </span>{' '}
                                of technology.
                            </p>
                        </div>

                        {/* Company Stats */}
                        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16 sm:mb-20 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                            {companyStats.map((stat, index) => (
                                <div key={index} className="relative group">
                                    <div className="absolute inset-0 transition-all duration-300 transform shadow-lg bg-gradient-to-br from-white to-gray-50 rounded-2xl group-hover:shadow-xl group-hover:-translate-y-1" />
                                    <div className="relative p-4 text-center sm:p-6">
                                        <div className={`inline-flex items-center justify-center w-12 h-12 mb-3 rounded-2xl bg-gradient-to-br ${stat.color} text-white group-hover:scale-110 transition-transform duration-300`}>
                                            {stat.icon}
                                        </div>
                                        <h3 className={`mb-2 text-2xl font-black sm:text-3xl bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                                            {stat.number}
                                        </h3>
                                        <p className="text-sm font-medium text-gray-600 sm:text-base">{stat.label}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Search and Filters */}
                        <div className={`mb-12 sm:mb-16 transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                            <div className="p-6 bg-white shadow-xl sm:p-8 rounded-3xl backdrop-blur-sm bg-white/90">
                                {/* Search Bar */}
                                <div className="relative mb-6">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-6">
                                        <Search className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search positions by title, skills, or keywords..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full py-4 pr-6 text-lg transition-all duration-300 border-2 border-gray-200 pl-14 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 bg-gray-50 focus:bg-white"
                                    />
                                </div>

                                {/* Category Filters */}
                                <div className="flex flex-wrap gap-3 mb-6">
                                    {jobCategories.map((category) => (
                                        <button
                                            key={category.id}
                                            onClick={() => setSelectedCategory(category.id)}
                                            className={`px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${selectedCategory === category.id
                                                ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                }`}
                                        >
                                            {category.name}
                                            <span className="ml-2 text-xs opacity-75">({category.count})</span>
                                        </button>
                                    ))}
                                </div>

                                {/* Level Filter */}
                                <div className="flex flex-wrap gap-3">
                                    {experienceLevels.map((level) => (
                                        <button
                                            key={level.id}
                                            onClick={() => setSelectedLevel(level.id)}
                                            className={`px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${selectedLevel === level.id
                                                ? 'bg-purple-600 text-white shadow-lg'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                }`}
                                        >
                                            {level.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Job Listings - Modified for 2-column grid */}
                        <div className={`mb-16 sm:mb-20 transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                            <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
                                {filteredJobs.map((job, index) => (
                                    <div
                                        key={job.id}
                                        className="relative overflow-hidden transition-all duration-500 transform bg-white shadow-lg group rounded-3xl hover:-translate-y-2 hover:shadow-2xl"
                                        onMouseEnter={() => setHoveredJob(job.id)}
                                        onMouseLeave={() => setHoveredJob(null)}
                                    >
                                        {/* Animated background glow */}
                                        <div className={`absolute inset-0 bg-gradient-to-r ${job.gradient} opacity-0 group-hover:opacity-10 transition-all duration-500 rounded-3xl`} />

                                        {/* Urgency indicator */}
                                        {job.urgency === 'high' && (
                                            <div className="absolute z-10 top-4 right-4">
                                                <div className="flex items-center gap-1 px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full animate-pulse">
                                                    <Zap size={10} />
                                                    Urgent
                                                </div>
                                            </div>
                                        )}

                                        <div className="relative z-10 p-6">
                                            {/* Job Header */}
                                            <div className="mb-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className={`p-1.5 rounded-lg bg-gradient-to-r ${job.gradient} text-white`}>
                                                        <Briefcase size={16} />
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                                        <span>{job.team}</span>
                                                        <span>•</span>
                                                        <span>{job.department}</span>
                                                    </div>
                                                </div>

                                                <h3 className="mb-2 text-lg font-black text-gray-900 transition-all duration-300 sm:text-xl group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-blue-600">
                                                    {job.title}
                                                </h3>

                                                <div className="flex flex-wrap items-center gap-3 mb-3 text-xs text-gray-600">
                                                    <div className="flex items-center gap-1">
                                                        <MapPin size={12} />
                                                        {job.location}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Clock size={12} />
                                                        {job.type}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <DollarSign size={12} />
                                                        {job.salary}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Description - Always visible */}
                                            <p className="mb-4 text-sm leading-relaxed text-gray-600 line-clamp-3">
                                                {job.description}
                                            </p>

                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-1 mb-4">
                                                {job.tags.slice(0, 3).map((tag, tagIndex) => (
                                                    <span
                                                        key={tagIndex}
                                                        className={`px-2 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${job.gradient} text-white opacity-80 hover:opacity-100 transition-opacity duration-300`}
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                                {job.tags.length > 3 && (
                                                    <span className="px-2 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded-full">
                                                        +{job.tags.length - 3} more
                                                    </span>
                                                )}
                                            </div>

                                            {/* Job Meta Info */}
                                            <div className="flex items-center justify-between mb-4 text-xs text-gray-500">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar size={12} />
                                                        {job.postedDays}d ago
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Users size={12} />
                                                        {job.applicants}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Star size={12} />
                                                    {job.experience}
                                                </div>
                                            </div>

                                            {/* Action Button */}
                                            <div className="w-full">
                                                {appliedJobs.has(job.id) ? (
                                                    <div className="flex items-center justify-center w-full px-4 py-3 text-sm font-bold text-green-600 bg-green-100 rounded-xl">
                                                        <Heart className="mr-2" size={16} />
                                                        Applied
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() => handleApply(job)}
                                                        className={`relative flex items-center justify-center w-full px-4 py-3 text-sm font-bold text-white bg-gradient-to-r ${job.gradient} rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 overflow-hidden group/btn`}
                                                    >
                                                        {/* Button shine effect */}
                                                        <div className="absolute inset-0 transition-transform duration-700 transform -translate-x-full -skew-x-12 bg-white/20 group-hover/btn:translate-x-full" />

                                                        <span className="relative z-10 flex items-center">
                                                            <Send size={16} className="mr-2 group-hover/btn:animate-bounce" />
                                                            Apply Now
                                                        </span>
                                                    </button>
                                                )}
                                            </div>

                                            {/* Expanded Requirements (shown on hover) */}
                                            {hoveredJob === job.id && (
                                                <div className="mt-6 transition-all duration-500 transform translate-y-0 opacity-100">
                                                    <div className="grid gap-4 sm:grid-cols-2">
                                                        <div>
                                                            <h4 className="flex items-center gap-2 mb-2 text-sm font-bold text-gray-900">
                                                                <Code size={14} />
                                                                Requirements
                                                            </h4>
                                                            <ul className="space-y-1">
                                                                {job.requirements.slice(0, 3).map((req, reqIndex) => (
                                                                    <li key={reqIndex} className="flex items-center gap-2 text-xs text-gray-600">
                                                                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${job.gradient}`} />
                                                                        {req}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>

                                                        <div>
                                                            <h4 className="flex items-center gap-2 mb-2 text-sm font-bold text-gray-900">
                                                                <Heart size={14} />
                                                                Benefits
                                                            </h4>
                                                            <ul className="space-y-1">
                                                                {job.benefits.slice(0, 3).map((benefit, benefitIndex) => (
                                                                    <li key={benefitIndex} className="flex items-center gap-2 text-xs text-gray-600">
                                                                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${job.gradient}`} />
                                                                        {benefit}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* No Results Message */}
                            {filteredJobs.length === 0 && (
                                <div className="py-16 text-center">
                                    <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-gray-200 to-gray-300">
                                        <Search size={32} className="text-gray-400" />
                                    </div>
                                    <h3 className="mb-2 text-2xl font-bold text-gray-900">No positions found</h3>
                                    <p className="text-gray-600">Try adjusting your search criteria or check back later for new openings.</p>
                                </div>
                            )}
                        </div>

                        {/* Benefits Section */}
                        <div className={`mb-16 sm:mb-20 transform transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                            <div className="mb-12 text-center">
                                <h2 className="mb-4 text-3xl font-black text-gray-900 sm:text-4xl lg:text-5xl">
                                    Why Work{' '}
                                    <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                                        With Us?
                                    </span>
                                </h2>
                                <p className="max-w-3xl mx-auto text-xl text-gray-600 sm:text-2xl">
                                    We offer competitive benefits and a culture that supports your growth.
                                </p>
                            </div>

                            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                                {benefits.map((benefit, index) => (
                                    <div key={index} className="relative overflow-hidden group">
                                        <div className={`absolute inset-0 bg-gradient-to-r ${benefit.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-all duration-500 transform group-hover:scale-105`} />
                                        <div className="relative p-8 text-center transition-all duration-500 bg-white shadow-lg rounded-3xl group-hover:shadow-2xl">
                                            <div className={`inline-flex items-center justify-center w-16 h-16 mb-6 rounded-3xl bg-gradient-to-r ${benefit.color} text-white group-hover:scale-110 transition-transform duration-300`}>
                                                {benefit.icon}
                                            </div>
                                            <h3 className="mb-4 text-xl font-bold text-gray-900">{benefit.title}</h3>
                                            <p className="text-gray-600">{benefit.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}
            <button
                onClick={() => navigate('/')}
                className="p-2 m-4 text-white bg-blue-600 rounded"
            >
                ← Back to Home
            </button>
        </>
    );
};

export default ViewOpenPositions;
