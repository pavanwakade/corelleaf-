import React, { useState } from 'react';
import { ArrowRight, Star, X } from 'lucide-react';

const projects = [
  {
    title: 'Project Alpha',
    description: 'A cutting-edge web application that revolutionizes the way users interact with data.',
    longDescription: 'Project Alpha is a full-stack web application built with the MERN stack. It features a custom-built data visualization library, real-time collaboration, and a powerful API for third-party integrations. The project was completed in 6 months with a team of 5 developers.',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tags: ['React', 'Node.js', 'GraphQL'],
    liveUrl: '#',
  },
  {
    title: 'Project Beta',
    description: 'An innovative mobile app designed to streamline daily tasks and boost productivity.',
    longDescription: 'Project Beta is a cross-platform mobile app developed with Flutter and Firebase. It includes features like offline sync, push notifications, and a machine learning model for personalized recommendations. The app has over 10,000 downloads on the App Store and Google Play.',
    image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tags: ['Flutter', 'Firebase', 'ML Kit'],
    liveUrl: '#',
  },
  {
    title: 'Project Gamma',
    description: 'A scalable cloud-based platform for data analysis and visualization.',
    longDescription: 'Project Gamma is a cloud-native platform built on AWS that provides a suite of tools for data scientists and analysts. It leverages services like S3, Lambda, and Redshift to deliver a highly scalable and cost-effective solution. The platform is used by several Fortune 500 companies.',
    image: 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tags: ['AWS', 'Python', 'D3.js'],
    liveUrl: '#',
  },
  {
    title: 'Project Delta',
    description: 'A decentralized application that leverages blockchain technology for secure transactions.',
    longDescription: 'Project Delta is a decentralized exchange (DEX) built on the Ethereum blockchain. It uses smart contracts to enable peer-to-peer trading of digital assets in a secure and transparent manner. The platform has processed over $10 million in transaction volume.',
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tags: ['Ethereum', 'Solidity', 'Web3.js'],
    liveUrl: '#',
  },
  {
    title: 'Project Epsilon',
    description: 'An AI-powered chatbot that provides instant customer support and engagement.',
    longDescription: 'Project Epsilon is an AI-powered chatbot that integrates with popular messaging platforms like Slack and Microsoft Teams. It uses natural language processing (NLP) to understand user queries and provide instant, accurate responses. The chatbot has a 95% customer satisfaction rating.',
    image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tags: ['Dialogflow', 'Node.js', 'React'],
    liveUrl: '#',
  },
  {
    title: 'Project Zeta',
    description: 'A stunning e-commerce website with a focus on user experience and conversion optimization.',
    longDescription: 'Project Zeta is a bespoke e-commerce website built on the Shopify platform. It features a custom theme, a streamlined checkout process, and a suite of marketing integrations. The website has achieved a 20% increase in conversion rates since its launch.',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tags: ['Shopify', 'Liquid', 'JavaScript'],
    liveUrl: '#',
  },
];

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section id="portfolio" className="min-h-screen py-10 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container px-4 mx-auto sm:px-6">
        <div className="mb-8 text-center sm:mb-12 md:mb-16">
          <h2 className="text-3xl font-bold text-transparent sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text">
            Our Latest Work
          </h2>
          <p className="max-w-2xl px-4 mx-auto mt-4 text-base text-gray-600 sm:mt-6 sm:text-lg md:text-xl">
            A glimpse into our passion for innovation and quality craftsmanship.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`relative overflow-hidden bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl group cursor-pointer transform transition-all duration-500 hover:shadow-2xl ${
                hoveredIndex === index ? 'scale-102 sm:scale-105 -translate-y-1 sm:-translate-y-2' : ''
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onTouchStart={() => setHoveredIndex(index)}
              onTouchEnd={() => setTimeout(() => setHoveredIndex(null), 2000)}
              style={{
                animationDelay: `${index * 200}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className={`object-cover w-full h-48 sm:h-56 md:h-64 transition-transform duration-700 ${
                    hoveredIndex === index ? 'scale-110' : ''
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              </div>
              
              <div className={`absolute inset-0 flex flex-col justify-between p-4 sm:p-6 md:p-8 transition-all duration-500 ${
                hoveredIndex === index ? 'bg-black/60 opacity-100' : 'opacity-0'
              }`}>
                <div className="text-center">
                  <h3 className="mb-2 text-xl font-bold text-white sm:text-2xl md:text-3xl sm:mb-3 md:mb-4">
                    {project.title}
                  </h3>
                  <p className="mb-2 text-sm leading-relaxed text-gray-200 sm:text-base sm:mb-3 md:mb-4">{project.description}</p>
                  <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs font-semibold text-white rounded-full sm:px-3 bg-white/30 backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center px-3 py-2 text-xs font-semibold text-white transition-all duration-300 transform rounded-full sm:px-4 bg-gradient-to-r from-purple-600 to-blue-600 sm:text-sm hover:from-purple-700 hover:to-blue-700 hover:scale-105"
                  >
                    See More <ArrowRight className="ml-1" size={14} />
                  </button>
                </div>
              </div>
              
              <div className={`absolute bottom-0 left-0 p-3 sm:p-4 md:p-6 transition-opacity duration-500 ${
                hoveredIndex === index ? 'opacity-0' : 'opacity-100'
              }`}>
                <h3 className="text-lg font-bold text-white sm:text-xl md:text-2xl drop-shadow-lg">
                  {project.title}
                </h3>
                <div className="flex flex-wrap gap-1 mt-2 sm:gap-2 sm:mt-3">
                  {project.tags.slice(0, 2).map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs font-semibold text-white rounded-full sm:px-3 bg-white/20 backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-2 bg-black/70 backdrop-blur-sm sm:p-4"
          onClick={() => setSelectedProject(null)}
          style={{
            animation: 'fadeIn 0.3s ease-out'
          }}
        >
          <div
            className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: 'slideUp 0.4s ease-out'
            }}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 z-10 p-1.5 sm:p-2 bg-white/90 backdrop-blur-sm text-gray-600 hover:text-gray-900 rounded-full hover:bg-white transition-all duration-200"
            >
              <X size={18} className="sm:hidden" />
              <X size={20} className="hidden sm:block md:hidden" />
              <X size={24} className="hidden md:block" />
            </button>
            
            <div className="relative">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="object-cover w-full h-40 xs:h-44 sm:h-48 md:h-56 lg:h-64 xl:h-72"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 md:bottom-6 md:left-6">
                <h2 className="mb-1 text-lg font-bold text-white xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl sm:mb-2">
                  {selectedProject.title}
                </h2>
              </div>
            </div>
            
            <div className="p-3 xs:p-4 sm:p-6 md:p-8">
              <p className="mb-4 text-xs leading-relaxed text-gray-700 xs:text-sm sm:text-base md:text-lg sm:mb-6 md:mb-8">
                {selectedProject.longDescription}
              </p>
              
              <div>
                <h3 className="mb-2 text-sm font-semibold text-gray-800 xs:text-base sm:text-lg sm:mb-3 md:mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-1.5 xs:gap-2 sm:gap-3">
                  {selectedProject.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-purple-700 bg-purple-100 rounded-full hover:bg-purple-200 transition-colors duration-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </section>
  );
};

export default Portfolio;