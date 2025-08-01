import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, Award, Heart } from 'lucide-react';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const testimonials = [
    {
      name: "Jennifer Martinez",
      role: "CEO, StartupVenture",
      company: "StartupVenture",
      image: "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg",
      content: "Corelleaf transformed our vision into reality. Their team delivered a robust e-commerce platform that exceeded our expectations. The attention to detail and technical expertise is outstanding.",
      rating: 5,
      project: "E-commerce Platform Development",
      gradient: "from-blue-500 to-purple-500"
    },
    {
      name: "Robert Anderson",
      role: "CTO, HealthTech Inc",
      company: "HealthTech Inc",
      image: "https://images.pexels.com/photos/3760790/pexels-photo-3760790.jpeg",
      content: "Working with Corelleaf was a game-changer for our healthcare app. They delivered on time, within budget, and the quality was exceptional. Highly recommend their mobile development services.",
      rating: 5,
      project: "Healthcare Mobile App",
      gradient: "from-green-500 to-teal-500"
    },
    {
      name: "Amanda Foster",
      role: "Director of Operations, ManufacturingCorp",
      company: "ManufacturingCorp",
      image: "https://images.pexels.com/photos/3760793/pexels-photo-3760793.jpeg",
      content: "The cloud migration project was seamless. Corelleaf reduced our infrastructure costs by 40% while improving performance. Their expertise in AWS is unmatched.",
      rating: 5,
      project: "Cloud Infrastructure Migration",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      name: "James Wilson",
      role: "Founder, FinanceFlow",
      company: "FinanceFlow",
      image: "https://images.pexels.com/photos/3760792/pexels-photo-3760792.jpeg",
      content: "Exceptional service and technical expertise. The team at Corelleaf built us a secure, scalable fintech platform that has processed millions in transactions without issues.",
      rating: 5,
      project: "Fintech Platform Development",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, isMobile ? 6000 : 5000); // Slower on mobile for better readability

    return () => {
      clearInterval(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, [testimonials.length, isMobile]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const testimonial = testimonials[currentTestimonial];

  return (
    <section className="relative py-12 overflow-hidden sm:py-16 md:py-20 lg:py-24 xl:py-32 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Responsive background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-0 left-1/3 rounded-full blur-2xl sm:blur-3xl transition-opacity duration-1000 ${
          isMobile 
            ? 'w-48 h-48 opacity-5' 
            : 'w-80 h-80 sm:w-96 sm:h-96 opacity-10'
        } bg-gradient-to-br from-blue-400/10 to-purple-400/10`}
        style={{ animation: isMobile ? 'none' : 'pulse 4s ease-in-out infinite' }}
        />
        
        <div className={`absolute bottom-0 right-1/3 rounded-full blur-2xl sm:blur-3xl transition-opacity duration-1000 ${
          isMobile 
            ? 'w-52 h-52 opacity-5' 
            : 'w-80 h-80 sm:w-96 sm:h-96 opacity-10'
        } bg-gradient-to-br from-purple-400/10 to-pink-400/10`}
        style={{ 
          animation: isMobile ? 'none' : 'pulse 4s ease-in-out infinite',
          animationDelay: '1s'
        }}
        />
      </div>
      
      <div className="container px-3 mx-auto sm:px-4 md:px-6 lg:px-8">
        {/* Mobile-optimized header */}
        <div className="mb-12 text-center sm:mb-16">
          <div className="flex items-center justify-center mb-3 space-x-2 sm:mb-4">
            <Heart className="text-red-500 animate-pulse" size={isMobile ? 18 : 24} />
            <span className="text-sm font-semibold text-red-500 sm:text-base">Client Love</span>
          </div>
          
          <h2 className="mb-3 text-2xl font-bold leading-tight text-transparent sm:mb-4 sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 bg-clip-text">
            What Our Clients Say
          </h2>
          
          <p className="max-w-3xl mx-auto text-sm leading-relaxed text-gray-600 sm:text-base md:text-lg lg:text-xl xl:text-2xl">
            Don't just take our word for it. Here's what our clients have to say about working with Corelleaf.
          </p>
        </div>

        {/* Mobile-optimized testimonial card */}
        <div className="max-w-xs mx-auto sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-5xl">
          <div className="relative p-4 overflow-hidden border border-gray-100 shadow-lg sm:p-6 md:p-8 lg:p-10 xl:p-12 sm:shadow-xl md:shadow-2xl rounded-2xl sm:rounded-3xl bg-white/90 backdrop-blur-sm group">
            {/* Responsive animated border */}
            <div className={`absolute inset-0 bg-gradient-to-r ${testimonial.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 sm:duration-500 rounded-2xl sm:rounded-3xl`} 
                 style={{padding: isMobile ? '1px' : '2px'}}>
              <div className="w-full h-full bg-white rounded-2xl sm:rounded-3xl"></div>
            </div>
            
            {/* Mobile-optimized quote decoration */}
            <div className="absolute opacity-5 sm:opacity-10 top-3 sm:top-6 md:top-8 left-3 sm:left-6 md:left-8">
              <Quote size={isMobile ? 40 : 60} className={`text-transparent bg-gradient-to-r ${testimonial.gradient} bg-clip-text sm:block ${isMobile ? 'hidden' : ''}`} />
            </div>
            
            {/* Mobile-optimized content */}
            <div className="mb-6 text-center sm:mb-8">
              {/* Responsive star rating */}
              <div className="flex justify-center mb-4 sm:mb-6 space-x-0.5 sm:space-x-1">
                {[...Array(testimonial.rating)].map((_, index) => (
                  <Star 
                    key={index} 
                    className="text-yellow-400 transition-transform duration-300 fill-current hover:scale-110 sm:hover:scale-125" 
                    size={isMobile ? 20 : 24}
                    style={{animationDelay: `${index * 100}ms`}}
                  />
                ))}
              </div>
              
              {/* Responsive testimonial content */}
              <blockquote className="relative px-2 mb-6 text-sm italic leading-relaxed text-gray-700 sm:mb-8 sm:text-base md:text-lg lg:text-xl xl:text-2xl sm:px-4">
                "{testimonial.content}"
              </blockquote>
            </div>

            {/* Mobile-optimized navigation arrows */}
            <button
              onClick={prevTestimonial}
              className={`absolute transform -translate-y-1/2 shadow-md sm:shadow-lg md:shadow-xl rounded-full hover:shadow-lg sm:hover:shadow-xl md:hover:shadow-2xl transition-all duration-300 hover:scale-105 sm:hover:scale-110 top-1/2 text-white bg-gradient-to-r ${testimonial.gradient} active:scale-95 ${
                isMobile 
                  ? 'p-2 -left-4' 
                  : 'p-2.5 sm:p-3 left-2 sm:left-4'
              }`}
            >
              <ChevronLeft size={isMobile ? 18 : 24} />
            </button>
            
            <button
              onClick={nextTestimonial}
              className={`absolute transform -translate-y-1/2 shadow-md sm:shadow-lg md:shadow-xl rounded-full hover:shadow-lg sm:hover:shadow-xl md:hover:shadow-2xl transition-all duration-300 hover:scale-105 sm:hover:scale-110 top-1/2 text-white bg-gradient-to-r ${testimonial.gradient} active:scale-95 ${
                isMobile 
                  ? 'p-2 -right-4' 
                  : 'p-2.5 sm:p-3 right-2 sm:right-4'
              }`}
            >
              <ChevronRight size={isMobile ? 18 : 24} />
            </button>

            {/* Mobile-optimized client info (optional - uncommented if needed) */}
            <div className="relative z-10 flex flex-col items-center justify-center gap-3 mt-4 sm:flex-row sm:gap-4 md:gap-6 sm:mt-0">
              {/* <img
                src={testimonial.image}
                alt={testimonial.name}
                className={`object-cover border-2 sm:border-4 border-white rounded-full shadow-md sm:shadow-lg transition-transform duration-500 group-hover:scale-105 sm:group-hover:scale-110 ${
                  isMobile ? 'w-14 h-14' : 'w-16 h-16 sm:w-20 sm:h-20'
                }`}
                loading="lazy"
              /> */}
              <div className="text-center sm:text-left">
                <div className={`font-bold text-gray-900 ${
                  isMobile ? 'text-sm' : 'text-base sm:text-lg md:text-xl'
                }`}>
                  {/* {testimonial.name} */}
                </div>
                <div className={`bg-gradient-to-r ${testimonial.gradient} bg-clip-text text-transparent font-semibold ${
                  isMobile ? 'text-xs' : 'text-sm sm:text-base'
                }`}>
                  {/* {testimonial.role} */}
                </div>
                <div className={`text-gray-500 ${
                  isMobile ? 'text-xs' : 'text-sm'
                }`}>
                  {testimonial.company}
                </div>
                <div className={`flex items-center justify-center sm:justify-start mt-1 text-gray-400 ${
                  isMobile ? 'text-xs' : 'text-sm'
                }`}>
                  <Award size={isMobile ? 12 : 14} className="mr-1" />
                  <span className={isMobile ? 'truncate max-w-[120px]' : ''}>
                    {testimonial.project}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile-optimized dots indicator */}
          <div className="flex justify-center gap-2 mt-6 sm:gap-3 sm:mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`rounded-full transition-all duration-300 transform hover:scale-110 sm:hover:scale-125 active:scale-95 ${
                  isMobile ? 'w-2.5 h-2.5' : 'w-3 h-3 sm:w-4 sm:h-4'
                } ${
                  index === currentTestimonial 
                    ? `bg-gradient-to-r ${testimonials[index].gradient} shadow-md sm:shadow-lg` 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Mobile swipe hint */}
          {isMobile && (
            <div className="mt-4 text-center">
              {/* <p className="text-xs text-gray-400">
                ← Swipe or tap arrows to navigate →
              </p> */}
            </div>
          )}
        </div>
      </div>

      {/* Mobile-optimized CSS */}
      <style jsx>{`
        /* Mobile-specific optimizations */
        @media (max-width: 767px) {
          * {
            -webkit-transform: translateZ(0);
            transform: translateZ(0);
          }
          
          .transition-all {
            transition-duration: 0.2s;
          }
          
          /* Reduce motion for better mobile performance */
          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
        }

        /* Enhanced touch feedback */
        @media (hover: none) and (pointer: coarse) {
          .group:active {
            transform: scale(0.98);
          }
          
          button:active {
            transform: scale(0.95);
          }
        }

        /* Smooth transitions for all devices */
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .transition-all {
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Pulse animation optimization */
        @keyframes pulse {
          0%, 100% { 
            opacity: 0.1;
            transform: scale(1);
          }
          50% { 
            opacity: 0.15;
            transform: scale(1.05);
          }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
