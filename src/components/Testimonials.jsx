import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, Award, Heart } from 'lucide-react';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

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
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const testimonial = testimonials[currentTestimonial];

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 rounded-full left-1/3 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-400/10 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 delay-1000 rounded-full right-1/3 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 blur-3xl animate-pulse"></div>
      </div>
      
      <div className="container px-6 mx-auto">
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center mb-4 space-x-2">
            <Heart className="text-red-500 animate-pulse" size={24} />
            <span className="font-semibold text-red-500">Client Love</span>
          </div>
          <h2 className="mb-4 text-4xl font-bold text-transparent md:text-5xl bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 bg-clip-text">What Our Clients Say</h2>
          <p className="max-w-3xl mx-auto text-xl text-gray-600">
            Don't just take our word for it. Here's what our clients have to say about working with Corelleaf.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative p-8 overflow-hidden border border-gray-100 shadow-2xl rounded-3xl bg-white/90 backdrop-blur-sm md:p-12 group">
            {/* Animated border */}
            <div className={`absolute inset-0 bg-gradient-to-r ${testimonial.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`} style={{padding: '2px'}}>
              <div className="w-full h-full bg-white rounded-3xl"></div>
            </div>
            
            {/* Quote decoration */}
            <div className="absolute top-8 left-8 opacity-10">
              <Quote size={80} className={`text-transparent bg-gradient-to-r ${testimonial.gradient} bg-clip-text`} />
            </div>
            
            <div className="mb-8 text-center">
              <div className="flex justify-center mb-6 space-x-1">
                {[...Array(testimonial.rating)].map((_, index) => (
                  <Star 
                    key={index} 
                    className="text-yellow-400 transition-transform duration-300 fill-current hover:scale-125" 
                    size={28}
                    style={{animationDelay: `${index * 100}ms`.toString()}}
                  />
                ))}
              </div>
              <blockquote className="relative mb-8 text-xl italic leading-relaxed text-gray-700 md:text-2xl">
                "{testimonial.content}"
              </blockquote>
            </div>

            <div className="relative z-10 flex items-center justify-center gap-6">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="object-cover w-20 h-20 transition-transform duration-500 border-4 border-white rounded-full shadow-lg group-hover:scale-110"
              />
              <div className="text-center md:text-left">
                <div className="text-xl font-bold text-gray-900">{testimonial.name}</div>
                <div className={`bg-gradient-to-r ${testimonial.gradient} bg-clip-text text-transparent font-semibold`}>{testimonial.role}</div>
                <div className="text-sm text-gray-500">{testimonial.company}</div>
                <div className="flex items-center mt-1 text-sm text-gray-400">
                  <Award size={14} className="mr-1" />
                  {testimonial.project}
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className={`absolute transform -translate-y-1/2 p-3 text-white shadow-xl rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-110 left-4 top-1/2 bg-gradient-to-r ${testimonial.gradient}`}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextTestimonial}
              className={`absolute transform -translate-y-1/2 p-3 text-white shadow-xl rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-110 right-4 top-1/2 bg-gradient-to-r ${testimonial.gradient}`}
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 transform hover:scale-125 ${
                  index === currentTestimonial 
                    ? `bg-gradient-to-r ${testimonials[index].gradient} shadow-lg` 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;