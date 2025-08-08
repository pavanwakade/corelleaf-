import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, Award, Heart } from 'lucide-react';
import './css/Testimonials.css';

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
      gradient: "linear-gradient(90deg, #3b82f6, #8b5cf6)"
    },
    {
      name: "Robert Anderson",
      role: "CTO, HealthTech Inc",
      company: "HealthTech Inc",
      image: "https://images.pexels.com/photos/3760790/pexels-photo-3760790.jpeg",
      content: "Working with Corelleaf was a game-changer for our healthcare app. They delivered on time, within budget, and the quality was exceptional. Highly recommend their mobile development services.",
      rating: 5,
      project: "Healthcare Mobile App",
      gradient: "linear-gradient(90deg, #10b981, #14b8a6)"
    },
    {
      name: "Amanda Foster",
      role: "Director of Operations, ManufacturingCorp",
      company: "ManufacturingCorp",
      image: "https://images.pexels.com/photos/3760793/pexels-photo-3760793.jpeg",
      content: "The cloud migration project was seamless. Corelleaf reduced our infrastructure costs by 40% while improving performance. Their expertise in AWS is unmatched.",
      rating: 5,
      project: "Cloud Infrastructure Migration",
      gradient: "linear-gradient(90deg, #8b5cf6, #ec4899)"
    },
    {
      name: "James Wilson",
      role: "Founder, FinanceFlow",
      company: "FinanceFlow",
      image: "https://images.pexels.com/photos/3760792/pexels-photo-3760792.jpeg",
      content: "Exceptional service and technical expertise. The team at Corelleaf built us a secure, scalable fintech platform that has processed millions in transactions without issues.",
      rating: 5,
      project: "Fintech Platform Development",
      gradient: "linear-gradient(90deg, #f97316, #ef4444)"
    }
  ];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, isMobile ? 6000 : 5000);

    return () => {
      clearInterval(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const testimonial = testimonials[currentTestimonial];

  return (
    <section className="testimonials-section">
      <div className="testimonials-header">
        <div className="header-icon">
          <Heart className="heart-icon" size={isMobile ? 18 : 24} />
          <span>Client Love</span>
        </div>
        <h2>What Our Clients Say</h2>
        <p>Don't just take our word for it. Here's what our clients have to say about working with Corelleaf.</p>
      </div>

      <div className="testimonial-card">
        <div className="quote-icon">
          <Quote size={isMobile ? 40 : 60} />
        </div>
        
        <div className="stars">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="star" size={isMobile ? 20 : 24} />
          ))}
        </div>

        <blockquote>"{testimonial.content}"</blockquote>

        <button className="arrow left" onClick={prevTestimonial} style={{ background: testimonial.gradient }}>
          <ChevronLeft size={isMobile ? 18 : 24} />
        </button>
        <button className="arrow right" onClick={nextTestimonial} style={{ background: testimonial.gradient }}>
          <ChevronRight size={isMobile ? 18 : 24} />
        </button>

        <div className="client-info">
          {/* Optional Image */}
          {/* <img src={testimonial.image} alt={testimonial.name} /> */}
          <div>
            {/* <strong>{testimonial.name}</strong> */}
            {/* <div className="role" style={{ background: testimonial.gradient, WebkitBackgroundClip: 'text', color: 'transparent' }}>
              {testimonial.role}
            </div> */}
            <div className="company">{testimonial.company}</div>
            <div className="project">
              <Award size={isMobile ? 12 : 14} />
              <span>{testimonial.project}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="dots">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentTestimonial(index)}
            className={`dot ${index === currentTestimonial ? 'active' : ''}`}
            style={index === currentTestimonial ? { background: testimonials[index].gradient } : {}}
          />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
