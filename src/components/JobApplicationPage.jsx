import React, { useState, useRef } from 'react';
import { 
  X, Upload, User, Mail, Phone, MapPin, Calendar, 
  FileText, Code, Award, Send, ArrowLeft, Star,
  Briefcase, Clock, DollarSign, Users, Heart, Globe,
  Download, Eye, CheckCircle, AlertCircle
} from 'lucide-react';

const JobApplicationPage = ({ job, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: '', // Pre-filled from user profile
      lastName: '',
      email: '@gmail.com',
      phone: '',
      location: '',
      linkedIn: '',
      github: '',
      portfolio: ''
    },
    experience: {
      currentRole: '',
      currentCompany: '',
      yearsOfExperience: '',
      relevantExperience: '',
      previousCompany: ''
    },
    education: {
      degree: '',
      institution: '',
      graduationYear: '',
      additionalCertifications: ''
    },
    skills: {
      technicalSkills: '',
      frameworks: '',
      databases: '',
      tools: ''
    },
    motivation: {
      whyInterested: '',
      coverLetter: '',
      availabilityDate: '',
      salaryExpectation: '',
      willingToRelocate: 'yes'
    }
  });

  const [resume, setResume] = useState(null);
  const [coverLetterFile, setCoverLetterFile] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef(null);
  const coverLetterInputRef = useRef(null);

  const steps = [
    { id: 1, title: 'Personal Information', icon: <User size={20} /> },
    { id: 2, title: 'Experience & Skills', icon: <Code size={20} /> },
    { id: 3, title: 'Documents & Motivation', icon: <FileText size={20} /> },
    { id: 4, title: 'Review & Submit', icon: <Send size={20} /> }
  ];

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    
    // Clear error when user starts typing
    if (errors[`${section}.${field}`]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[`${section}.${field}`];
        return newErrors;
      });
    }
  };

  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (type === 'resume') {
        setResume(file);
      } else if (type === 'coverLetter') {
        setCoverLetterFile(file);
      }
    }
  };

  const handleDrag = (e, type) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (type === 'resume') {
        setResume(file);
      } else if (type === 'coverLetter') {
        setCoverLetterFile(file);
      }
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 1:
        if (!formData.personalInfo.firstName) newErrors['personalInfo.firstName'] = 'First name is required';
        if (!formData.personalInfo.lastName) newErrors['personalInfo.lastName'] = 'Last name is required';
        if (!formData.personalInfo.email) newErrors['personalInfo.email'] = 'Email is required';
        if (!formData.personalInfo.phone) newErrors['personalInfo.phone'] = 'Phone is required';
        break;
      case 2:
        if (!formData.experience.yearsOfExperience) newErrors['experience.yearsOfExperience'] = 'Experience is required';
        if (!formData.skills.technicalSkills) newErrors['skills.technicalSkills'] = 'Technical skills are required';
        break;
      case 3:
        if (!resume) newErrors['resume'] = 'Resume is required';
        if (!formData.motivation.whyInterested) newErrors['motivation.whyInterested'] = 'Please explain your interest';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const applicationData = {
      ...formData,
      resume: resume?.name,
      coverLetter: coverLetterFile?.name,
      submittedAt: new Date().toISOString()
    };
    
    onSubmit(job.id, applicationData);
    setIsSubmitting(false);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="mb-6 text-2xl font-bold text-gray-900">Personal Information</h3>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  First Name *
                </label>
                <input
                  type="text"
                  value={formData.personalInfo.firstName}
                  onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors['personalInfo.firstName'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your first name"
                />
                {errors['personalInfo.firstName'] && (
                  <p className="mt-1 text-sm text-red-600">{errors['personalInfo.firstName']}</p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={formData.personalInfo.lastName}
                  onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors['personalInfo.lastName'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your last name"
                />
                {errors['personalInfo.lastName'] && (
                  <p className="mt-1 text-sm text-red-600">{errors['personalInfo.lastName']}</p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.personalInfo.email}
                  onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors['personalInfo.email'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors['personalInfo.email'] && (
                  <p className="mt-1 text-sm text-red-600">{errors['personalInfo.email']}</p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.personalInfo.phone}
                  onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors['personalInfo.phone'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="+91 XXXXX XXXXX"
                />
                {errors['personalInfo.phone'] && (
                  <p className="mt-1 text-sm text-red-600">{errors['personalInfo.phone']}</p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.personalInfo.location}
                  onChange={(e) => handleInputChange('personalInfo', 'location', e.target.value)}
                  className="w-full px-4 py-3 transition-colors border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="City, Country"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  LinkedIn Profile
                </label>
                <input
                  type="url"
                  value={formData.personalInfo.linkedIn}
                  onChange={(e) => handleInputChange('personalInfo', 'linkedIn', e.target.value)}
                  className="w-full px-4 py-3 transition-colors border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  GitHub Profile
                </label>
                <input
                  type="url"
                  value={formData.personalInfo.github}
                  onChange={(e) => handleInputChange('personalInfo', 'github', e.target.value)}
                  className="w-full px-4 py-3 transition-colors border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://github.com/yourusername"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Portfolio Website
                </label>
                <input
                  type="url"
                  value={formData.personalInfo.portfolio}
                  onChange={(e) => handleInputChange('personalInfo', 'portfolio', e.target.value)}
                  className="w-full px-4 py-3 transition-colors border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://yourportfolio.com"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="mb-6 text-2xl font-bold text-gray-900">Experience & Skills</h3>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Current Role
                  </label>
                  <input
                    type="text"
                    value={formData.experience.currentRole}
                    onChange={(e) => handleInputChange('experience', 'currentRole', e.target.value)}
                    className="w-full px-4 py-3 transition-colors border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your current job title"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Current Company
                  </label>
                  <input
                    type="text"
                    value={formData.experience.currentCompany}
                    onChange={(e) => handleInputChange('experience', 'currentCompany', e.target.value)}
                    className="w-full px-4 py-3 transition-colors border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your current company"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Years of Experience *
                  </label>
                  <select
                    value={formData.experience.yearsOfExperience}
                    onChange={(e) => handleInputChange('experience', 'yearsOfExperience', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors['experience.yearsOfExperience'] ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select experience</option>
                    <option value="0-1">0-1 years</option>
                    <option value="1-2">1-2 years</option>
                    <option value="2-3">2-3 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5+">5+ years</option>
                  </select>
                  {errors['experience.yearsOfExperience'] && (
                    <p className="mt-1 text-sm text-red-600">{errors['experience.yearsOfExperience']}</p>
                  )}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Previous Company
                  </label>
                  <input
                    type="text"
                    value={formData.experience.previousCompany}
                    onChange={(e) => handleInputChange('experience', 'previousCompany', e.target.value)}
                    className="w-full px-4 py-3 transition-colors border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your previous company"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Technical Skills *
                </label>
                <textarea
                  value={formData.skills.technicalSkills}
                  onChange={(e) => handleInputChange('skills', 'technicalSkills', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors h-24 ${
                    errors['skills.technicalSkills'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="List your technical skills (e.g., Java, Spring Boot, React, etc.)"
                />
                {errors['skills.technicalSkills'] && (
                  <p className="mt-1 text-sm text-red-600">{errors['skills.technicalSkills']}</p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Frameworks & Libraries
                  </label>
                  <textarea
                    value={formData.skills.frameworks}
                    onChange={(e) => handleInputChange('skills', 'frameworks', e.target.value)}
                    className="w-full h-20 px-4 py-3 transition-colors border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Frameworks and libraries you work with"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Databases
                  </label>
                  <textarea
                    value={formData.skills.databases}
                    onChange={(e) => handleInputChange('skills', 'databases', e.target.value)}
                    className="w-full h-20 px-4 py-3 transition-colors border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Database technologies you've worked with"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Relevant Experience Details
                </label>
                <textarea
                  value={formData.experience.relevantExperience}
                  onChange={(e) => handleInputChange('experience', 'relevantExperience', e.target.value)}
                  className="w-full h-32 px-4 py-3 transition-colors border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe your relevant experience for this role..."
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="mb-6 text-2xl font-bold text-gray-900">Documents & Motivation</h3>
            
            <div className="space-y-6">
              {/* Resume Upload */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Resume/CV *
                </label>
                <div
                  className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                    dragActive ? 'border-blue-500 bg-blue-50' : errors['resume'] ? 'border-red-500' : 'border-gray-300'
                  } hover:border-blue-400 hover:bg-blue-50`}
                  onDragEnter={(e) => handleDrag(e, 'resume')}
                  onDragLeave={(e) => handleDrag(e, 'resume')}
                  onDragOver={(e) => handleDrag(e, 'resume')}
                  onDrop={(e) => handleDrop(e, 'resume')}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileUpload(e, 'resume')}
                    className="hidden"
                  />
                  
                  {resume ? (
                    <div className="flex items-center justify-center space-x-3">
                      <FileText className="w-8 h-8 text-green-500" />
                      <div>
                        <p className="font-medium text-gray-900">{resume.name}</p>
                        <p className="text-sm text-gray-500">{(resume.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                      <button
                        onClick={() => setResume(null)}
                        className="p-1 text-red-500 transition-colors rounded-full hover:bg-red-50"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <p className="mb-2 text-lg font-medium text-gray-900">Upload your resume</p>
                      <p className="mb-4 text-gray-500">Drag and drop or click to browse</p>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-6 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                      >
                        Choose File
                      </button>
                      <p className="mt-2 text-xs text-gray-400">PDF, DOC, DOCX up to 10MB</p>
                    </div>
                  )}
                </div>
                {errors['resume'] && (
                  <p className="mt-1 text-sm text-red-600">{errors['resume']}</p>
                )}
              </div>

              {/* Cover Letter Upload (Optional) */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Cover Letter (Optional)
                </label>
                <div
                  className="relative p-6 text-center transition-all duration-300 border-2 border-gray-300 border-dashed rounded-xl hover:border-blue-400 hover:bg-blue-50"
                  onDragEnter={(e) => handleDrag(e, 'coverLetter')}
                  onDragLeave={(e) => handleDrag(e, 'coverLetter')}
                  onDragOver={(e) => handleDrag(e, 'coverLetter')}
                  onDrop={(e) => handleDrop(e, 'coverLetter')}
                >
                  <input
                    ref={coverLetterInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileUpload(e, 'coverLetter')}
                    className="hidden"
                  />
                  
                  {coverLetterFile ? (
                    <div className="flex items-center justify-center space-x-3">
                      <FileText className="w-6 h-6 text-green-500" />
                      <div>
                        <p className="font-medium text-gray-900">{coverLetterFile.name}</p>
                        <p className="text-sm text-gray-500">{(coverLetterFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                      <button
                        onClick={() => setCoverLetterFile(null)}
                        className="p-1 text-red-500 transition-colors rounded-full hover:bg-red-50"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="mb-1 font-medium text-gray-900">Upload cover letter</p>
                      <button
                        onClick={() => coverLetterInputRef.current?.click()}
                        className="text-blue-600 transition-colors hover:text-blue-700"
                      >
                        Choose File
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Why interested */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Why are you interested in this position? *
                </label>
                <textarea
                  value={formData.motivation.whyInterested}
                  onChange={(e) => handleInputChange('motivation', 'whyInterested', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors h-32 ${
                    errors['motivation.whyInterested'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Tell us what excites you about this role and our company..."
                />
                {errors['motivation.whyInterested'] && (
                  <p className="mt-1 text-sm text-red-600">{errors['motivation.whyInterested']}</p>
                )}
              </div>

              {/* Additional fields */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Available Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.motivation.availabilityDate}
                    onChange={(e) => handleInputChange('motivation', 'availabilityDate', e.target.value)}
                    className="w-full px-4 py-3 transition-colors border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Expected Salary (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.motivation.salaryExpectation}
                    onChange={(e) => handleInputChange('motivation', 'salaryExpectation', e.target.value)}
                    className="w-full px-4 py-3 transition-colors border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., $80,000 - $100,000"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Willing to Relocate?
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="yes"
                      checked={formData.motivation.willingToRelocate === 'yes'}
                      onChange={(e) => handleInputChange('motivation', 'willingToRelocate', e.target.value)}
                      className="mr-2 text-blue-600"
                    />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="no"
                      checked={formData.motivation.willingToRelocate === 'no'}
                      onChange={(e) => handleInputChange('motivation', 'willingToRelocate', e.target.value)}
                      className="mr-2 text-blue-600"
                    />
                    No
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="remote"
                      checked={formData.motivation.willingToRelocate === 'remote'}
                      onChange={(e) => handleInputChange('motivation', 'willingToRelocate', e.target.value)}
                      className="mr-2 text-blue-600"
                    />
                    Remote Only
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="mb-6 text-2xl font-bold text-gray-900">Review Your Application</h3>
            
            <div className="space-y-8">
              {/* Job Summary */}
              <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                <h4 className="mb-4 text-lg font-bold text-gray-900">Position Details</h4>
                <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
                  <div><strong>Position:</strong> {job.title}</div>
                  <div><strong>Department:</strong> {job.department}</div>
                  <div><strong>Location:</strong> {job.location}</div>
                  <div><strong>Type:</strong> {job.type}</div>
                  <div><strong>Salary:</strong> {job.salary}</div>
                  <div><strong>Experience:</strong> {job.experience}</div>
                </div>
              </div>

              {/* Personal Info Summary */}
              <div className="p-6 bg-white border border-gray-200 rounded-xl">
                <h4 className="mb-4 text-lg font-bold text-gray-900">Personal Information</h4>
                <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
                  <div><strong>Name:</strong> {formData.personalInfo.firstName} {formData.personalInfo.lastName}</div>
                  <div><strong>Email:</strong> {formData.personalInfo.email}</div>
                  <div><strong>Phone:</strong> {formData.personalInfo.phone}</div>
                  <div><strong>Location:</strong> {formData.personalInfo.location}</div>
                </div>
              </div>

              {/* Experience Summary */}
              <div className="p-6 bg-white border border-gray-200 rounded-xl">
                <h4 className="mb-4 text-lg font-bold text-gray-900">Experience & Skills</h4>
                <div className="space-y-2 text-sm">
                  <div><strong>Current Role:</strong> {formData.experience.currentRole}</div>
                  <div><strong>Experience:</strong> {formData.experience.yearsOfExperience} years</div>
                  <div><strong>Key Skills:</strong> {formData.skills.technicalSkills.substring(0, 100)}...</div>
                </div>
              </div>

              {/* Documents */}
              <div className="p-6 bg-white border border-gray-200 rounded-xl">
                <h4 className="mb-4 text-lg font-bold text-gray-900">Documents</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Resume: {resume?.name}</span>
                  </div>
                  {coverLetterFile && (
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Cover Letter: {coverLetterFile.name}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="p-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                <p className="mb-4 text-white">
                  Ready to submit your application for <strong>{job.title}</strong>?
                </p>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-8 py-4 font-bold text-blue-600 transition-colors bg-white rounded-xl hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="w-5 h-5 mr-2 border-b-2 border-blue-600 rounded-full animate-spin"></div>
                      Submitting...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Send size={20} className="mr-2" />
                      Submit Application
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm">
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-4xl mx-auto overflow-hidden bg-white shadow-2xl rounded-3xl">
          {/* Header */}
          <div className={`bg-gradient-to-r ${job.gradient} p-6 text-white relative`}>
            <button
              onClick={onClose}
              className="absolute p-2 transition-colors rounded-full top-6 right-6 hover:bg-white/20"
            >
              <X size={24} />
            </button>
            
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <Briefcase size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Apply for {job.title}</h1>
                <p className="opacity-90">{job.department} • {job.location}</p>
              </div>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="px-6 py-4 border-b bg-gray-50">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
                    currentStep >= step.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step.icon}
                  </div>
                  <span className={`ml-2 text-sm font-medium hidden sm:block ${
                    currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`hidden sm:block w-12 h-1 mx-4 rounded ${
                      currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            {renderStepContent()}
          </div>

          {/* Navigation */}
          <div className="flex justify-between px-6 py-6 border-t sm:px-8 bg-gray-50">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="flex items-center px-6 py-3 text-gray-600 transition-colors bg-white border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft size={20} className="mr-2" />
              Previous
            </button>
            
            {currentStep < 4 ? (
              <button
                onClick={handleNext}
                className="flex items-center px-6 py-3 text-white transition-colors bg-blue-600 rounded-xl hover:bg-blue-700"
              >
                Next
                <ArrowLeft size={20} className="ml-2 rotate-180" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobApplicationPage;
