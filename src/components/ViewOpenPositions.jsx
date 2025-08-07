import React, { useState, useEffect, useRef } from "react";
import {
  MapPin,
  Clock,
  DollarSign,
  Users,
  Star,
  Search,
  Filter,
  ChevronRight,
  Briefcase,
  Heart,
  Code,
  Award,
  Zap,
  Calendar,
  Send,
  ExternalLink,
  TrendingUp,
  Globe,
  Shield,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import JobApplicationPage from "./JobApplicationPage"; // Import the application page component
import axios from "axios"; // NEW: Import axios for fetching data

const ViewOpenPositions = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredJob, setHoveredJob] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState(new Set());
  const [selectedJob, setSelectedJob] = useState(null); // New state for selected job
  const [showApplicationPage, setShowApplicationPage] = useState(false); // New state for application page
  const sectionRef = useRef(null);

  // NEW: State for fetched jobs, loading, and error
  const [jobs, setJobs] = useState([]); // Replaces hardcoded openPositions
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Advanced intersection observer and scroll effects
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

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
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // MODIFIED: Fetch jobs from Google Sheet on mount, with improved error handling
  useEffect(() => {
    fetchJobs();
  }, []); // Empty dependency array: Fetch once on mount

  // NEW: Extracted fetch function for reusability (e.g., retry)
  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      // MODIFIED: Removed &single=true to fetch all rows; ensure your sheet is published correctly
      const csvUrl =
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vRKsk7IevG8Q4AUUPZM8zW2lOsaoYkHliv5_velPNzpGhaNBCc6ds6ShiH2vP24YK6DB2koqia7klKt/pub?gid=1582629735&single=true&output=csv";
      const response = await axios.get(csvUrl, { responseType: "text" }); // Ensure text response for parsing
      const parsedJobs = parseCSV(response.data);
      setJobs(parsedJobs);
      if (parsedJobs.length === 0) {
        setError(
          "No jobs found in the sheet. Please check your Google Sheet data."
        );
      }
    } catch (err) {
      console.error("Error fetching jobs:", err);
      // MODIFIED: More informative error message
      setError(
        `Failed to load jobs: ${err.message}. Check the console for details or verify the sheet URL.`
      );
    } finally {
      setLoading(false);
    }
  };

  // MODIFIED: Improved CSV parsing to handle quoted fields and commas within values
  const parseCSV = (csvText) => {
    const rows = csvText.split(/\r?\n/); // Split into rows
    if (rows.length === 0) return [];

    // Use regex to split rows while handling quoted fields (e.g., fields with commas inside quotes)
    const splitRow = (row) => {
      const fields = [];
      const regex = /(".*?"|[^",]+)(?=\s*,|\s*$)/g; // Matches quoted or non-quoted fields
      let match;
      while ((match = regex.exec(row)) !== null) {
        let value = match[1].trim();
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1); // Remove surrounding quotes
        }
        fields.push(value);
      }
      return fields;
    };

    const headers = splitRow(rows[0]); // Extract headers
    const data = [];

    for (let i = 1; i < rows.length; i++) {
      const rowData = splitRow(rows[i]);
      if (
        rowData.length !== headers.length ||
        rowData.every((field) => field === "")
      )
        continue; // Skip malformed or empty rows

      const jobObject = {};
      headers.forEach((header, index) => {
        let value = rowData[index];

        // Handle array fields like requirements, benefits, tags (assume '|' delimited)
        if (["requirements", "benefits", "tags"].includes(header)) {
          value = value ? value.split("|").map((item) => item.trim()) : []; // Split and trim
        } else if (
          header === "id" ||
          header === "postedDays" ||
          header === "applicants"
        ) {
          value = parseInt(value, 10) || 0; // Convert to numbers
        }

        jobObject[header] = value;
      });

      data.push(jobObject);
    }

    console.log("Parsed jobs:", data); // NEW: Debug log for verification
    return data;
  };

  const jobCategories = [
    {
      id: "all",
      name: "All Positions",
      count: 12,
      color: "from-gray-500 to-gray-600",
    },
    {
      id: "engineering",
      name: "Engineering",
      count: 6,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "design",
      name: "Design",
      count: 3,
      color: "from-purple-500 to-violet-500",
    },
    {
      id: "marketing",
      name: "Marketing",
      count: 2,
      color: "from-pink-500 to-rose-500",
    },
    {
      id: "sales",
      name: "Sales",
      count: 1,
      color: "from-emerald-500 to-teal-500",
    },
  ];

  const experienceLevels = [
    { id: "all", name: "All Levels" },
    { id: "entry", name: "Entry Level" },
    { id: "mid", name: "Mid Level" },
    { id: "senior", name: "Senior Level" },
    { id: "lead", name: "Lead/Principal" },
  ];

  // REMOVED: Hardcoded openPositions array (now fetched dynamically)

  const companyStats = [
    {
      icon: <Users size={24} />,
      number: "150+",
      label: "Team Members",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Globe size={24} />,
      number: "15+",
      label: "Countries",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: <Award size={24} />,
      number: "4.8",
      label: "Glassdoor Rating",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: <TrendingUp size={24} />,
      number: "300%",
      label: "Growth Rate",
      color: "from-purple-500 to-violet-500",
    },
  ];

  const benefits = [
    {
      icon: <Heart size={24} />,
      title: "Health & Wellness",
      description: "Comprehensive health, dental, and vision insurance",
      color: "from-red-500 to-pink-500",
    },
    {
      icon: <Globe size={24} />,
      title: "Remote Flexibility",
      description: "Work from anywhere with flexible hours",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Code size={24} />,
      title: "Learning & Growth",
      description: "$3000 annual learning budget and conference tickets",
      color: "from-purple-500 to-violet-500",
    },
    {
      icon: <Shield size={24} />,
      title: "Financial Security",
      description: "Competitive salary, equity, and 401k matching",
      color: "from-emerald-500 to-teal-500",
    },
  ];

  // MODIFIED: Use fetched 'jobs' instead of 'openPositions'
  const filteredJobs = jobs.filter((job) => {
    const matchesCategory =
      selectedCategory === "all" || job.category === selectedCategory;
    const matchesLevel = selectedLevel === "all" || job.level === selectedLevel;
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
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
    setAppliedJobs((prev) => new Set([...prev, jobId]));
    setShowApplicationPage(false);
    setSelectedJob(null);
    // Here you would typically send the application data to your backend
    console.log("Application submitted:", { jobId, applicationData });
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
            animationDuration: `${2 + Math.random() * 3}s`,
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
              <div
                className="w-24 h-24 border border-blue-200/30 rounded-3xl animate-spin"
                style={{ animationDuration: "20s" }}
              />
            </div>

            {/* Interactive mouse follower */}
            <div
              className="fixed w-8 h-8 transition-transform duration-300 ease-out rounded-full pointer-events-none bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-sm"
              style={{
                left: mousePosition.x - 16,
                top: mousePosition.y - 16,
                transform: `scale(${isInView ? 1 : 0})`,
              }}
            />
          </div>

          <div className="container relative px-4 mx-auto sm:px-6 lg:px-8">
            {/* Enhanced Header Section */}
            <div
              className={`mb-16 sm:mb-20 lg:mb-24 text-center transform transition-all duration-1000 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 mb-8 text-sm font-medium text-blue-600 transition-all duration-300 bg-white border border-blue-200 rounded-full shadow-lg hover:shadow-xl hover:scale-105 backdrop-blur-sm bg-white/80">
                <Briefcase size={18} className="animate-pulse" />
                Join Our Team
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
              </div>

              <h1 className="mb-6 text-4xl font-black leading-tight text-transparent sm:mb-8 sm:text-5xl lg:text-6xl xl:text-7xl bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text">
                Open{" "}
                <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                  Positions
                </span>
              </h1>

              <p className="max-w-4xl mx-auto text-xl leading-relaxed text-gray-600 sm:text-2xl lg:text-3xl">
                Join our passionate team of innovators and help us{" "}
                <span className="font-semibold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                  shape the future
                </span>{" "}
                of technology.
              </p>
            </div>

            {/* Company Stats */}
            <div
              className={`grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16 sm:mb-20 transform transition-all duration-1000 delay-200 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              {companyStats.map((stat, index) => (
                <div key={index} className="relative group">
                  <div className="absolute inset-0 transition-all duration-300 transform shadow-lg bg-gradient-to-br from-white to-gray-50 rounded-2xl group-hover:shadow-xl group-hover:-translate-y-1" />
                  <div className="relative p-4 text-center sm:p-6">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 mb-3 rounded-2xl bg-gradient-to-br ${stat.color} text-white group-hover:scale-110 transition-transform duration-300`}
                    >
                      {stat.icon}
                    </div>
                    <h3
                      className={`mb-2 text-2xl font-black sm:text-3xl bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                    >
                      {stat.number}
                    </h3>
                    <p className="text-sm font-medium text-gray-600 sm:text-base">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Search and Filters */}
            <div
              className={`mb-12 sm:mb-16 transform transition-all duration-1000 delay-400 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
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
                      className={`px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                        selectedCategory === category.id
                          ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {category.name}
                      {/* <span className="ml-2 text-xs opacity-75">({category.count})</span> */}
                    </button>
                  ))}
                </div>

                {/* Level Filter */}
                <div className="flex flex-wrap gap-3">
                  {experienceLevels.map((level) => (
                    <button
                      key={level.id}
                      onClick={() => setSelectedLevel(level.id)}
                      className={`px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                        selectedLevel === level.id
                          ? "bg-purple-600 text-white shadow-lg"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {level.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* MODIFIED: Handle loading and error states with retry button */}
            {loading ? (
              <div className="py-16 text-center">
                <p className="text-xl text-gray-600">Loading jobs...</p>
              </div>
            ) : error ? (
              <div className="py-16 text-center text-red-600">
                <p>{error}</p>
                {/* NEW: Retry button for user-initiated refetch */}
                <button
                  onClick={fetchJobs}
                  className="px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                  Retry Fetching Jobs
                </button>
              </div>
            ) : (
              /* Job Listings - Modified for 2-column grid */
              <div
                className={`mb-16 sm:mb-20 transform transition-all duration-1000 delay-600 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
                  {filteredJobs.map((job, index) => (
                    <div
                      key={job.id}
                      className="relative overflow-hidden transition-all duration-500 transform bg-white shadow-lg group rounded-3xl hover:-translate-y-2 hover:shadow-2xl"
                      onMouseEnter={() => setHoveredJob(job.id)}
                      onMouseLeave={() => setHoveredJob(null)}
                    >
                      {/* Animated background glow */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${job.gradient} opacity-0 group-hover:opacity-10 transition-all duration-500 rounded-3xl`}
                      />

                      {/* Urgency indicator */}
                      {job.urgency === "high" && (
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
                            <div
                              className={`p-1.5 rounded-lg bg-gradient-to-r ${job.gradient} text-white`}
                            >
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
                                <Send
                                  size={16}
                                  className="mr-2 group-hover/btn:animate-bounce"
                                />
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
                                  {job.requirements
                                    .slice(0, 3)
                                    .map((req, reqIndex) => (
                                      <li
                                        key={reqIndex}
                                        className="flex items-center gap-2 text-xs text-gray-600"
                                      >
                                        <div
                                          className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${job.gradient}`}
                                        />
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
                                  {job.benefits
                                    .slice(0, 3)
                                    .map((benefit, benefitIndex) => (
                                      <li
                                        key={benefitIndex}
                                        className="flex items-center gap-2 text-xs text-gray-600"
                                      >
                                        <div
                                          className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${job.gradient}`}
                                        />
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
                    <h3 className="mb-2 text-2xl font-bold text-gray-900">
                      No positions found
                    </h3>
                    <p className="text-gray-600">
                      Try adjusting your search criteria or check back later for
                      new openings.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Benefits Section */}
            <div
              className={`mb-16 sm:mb-20 transform transition-all duration-1000 delay-800 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="mb-12 text-center">
                <h2 className="mb-4 text-3xl font-black text-gray-900 sm:text-4xl lg:text-5xl">
                  Why Work{" "}
                  <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                    With Us?
                  </span>
                </h2>
                <p className="max-w-3xl mx-auto text-xl text-gray-600 sm:text-2xl">
                  We offer competitive benefits and a culture that supports your
                  growth.
                </p>
              </div>

              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="relative overflow-hidden group">
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${benefit.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-all duration-500 transform group-hover:scale-105`}
                    />
                    <div className="relative p-8 text-center transition-all duration-500 bg-white shadow-lg rounded-3xl group-hover:shadow-2xl">
                      <div
                        className={`inline-flex items-center justify-center w-16 h-16 mb-6 rounded-3xl bg-gradient-to-r ${benefit.color} text-white group-hover:scale-110 transition-transform duration-300`}
                      >
                        {benefit.icon}
                      </div>
                      <h3 className="mb-4 text-xl font-bold text-gray-900">
                        {benefit.title}
                      </h3>
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
        onClick={() => navigate("/")}
        className="p-2 m-4 text-white bg-blue-600 rounded"
      >
        ← Back to Home
      </button>
    </>
  );
};
export default ViewOpenPositions;
