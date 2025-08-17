// import React, { useState } from 'react';
// import { ArrowRight, X } from 'lucide-react';
// import './css/Portfolio.css';
// import Joystream from  "../Assets/portfolio/Joystream.png";
// import mobilebanking from  "../Assets/portfolio/mobilebanking.png";
// import EstateMarketplace from  "../Assets/portfolio/EstateMarketplace.png";
// import AIHealthcare from  "../Assets/portfolio/AIHealthcare.png";
// import ECommerce from  "../Assets/portfolio/E-Commerce.png";
// import Blockchain from  "../Assets/portfolio/Blockchain.png";

// const projects = [
//   {
//     title: 'Mobile Banking App Redesign',
//     description: 'A redesigned mobile banking app focused on seamless user experience and unified payment flows.',
//     longDescription:
//       'Netguru collaborated with UBS to redesign their mobile banking app, emphasizing user-centric design with a unified payment flow and consistent features. The project improved app store ratings and accelerated login processes, involving a team extension model for native design implementation.',
//     image: mobilebanking,
//     tags: ['Mobile Development', 'UX/UI Design', 'Banking'],
//   },
//   {
//     title: 'Joystream Video Platform Design System',
//     description: 'A blockchain-based video platform with a customizable design system for creators.',
//     longDescription:
//       'Joystream partnered with Netguru to develop the Atlas design system, featuring over 190 global components and 175 design tokens for consistency. It enables creators to publish and manage content via blockchain transactions, enhancing user experience and operational efficiency.',
//     image: Joystream,
//     tags: ['Blockchain', 'Design System', 'Video Platform'],
//   },
//   {
//     title: 'Otodom Real Estate Marketplace Optimization',
//     description: 'An optimized real estate platform with improved user experience for buyers and sellers.',
//     longDescription:
//       'Netguru worked with Otodom to enhance Poland’s premier real estate marketplace through user research and A/B testing. The project resulted in a 21% increase in conversion rates and a customizable email notification system, boosting traffic and retention.',
//     image: EstateMarketplace,
//     tags: ['Product Design', 'A/B Testing', 'Real Estate'],
//   },
//   {
//     title: 'AI Healthcare Bot System',
//     description: 'An AI-powered chatbot for mental health support and consultations.',
//     longDescription:
//       'This system uses Python to create an AI mental health therapist chatbot that provides consultations and support. It integrates natural language processing for accurate responses and has been implemented in various healthcare apps to improve accessibility and user satisfaction.',
//     image: AIHealthcare,
//     tags: ['Python', 'AI', 'Healthcare'],
//   },
//   {
//     title: 'E-Commerce Fake Product Reviews Monitor',
//     description: 'A system to detect and delete fake reviews in online shopping platforms.',
//     longDescription:
//       'Built using machine learning, this tool monitors and removes fake product reviews on e-commerce sites, ensuring trust and authenticity. It has been applied in platforms like Shopify integrations, leading to improved customer confidence and higher sales conversions.',
//     image: ECommerce,
//     tags: ['Machine Learning', 'E-Commerce', 'Python'],
//   },
//   {
//     title: 'Blockchain Shipment Management System',
//     description: 'A tracking system for secure and transparent supply chain management.',
//     longDescription:
//       'This blockchain-based system tracks shipments with evidence protection, using smart contracts for transparency. It has been used in logistics to reduce fraud and improve efficiency, processing high volumes of transactions securely.',
//     image:Blockchain,
//     tags: ['Blockchain', 'Supply Chain', 'Smart Contracts'],
//   },
// ];

// const Portfolio = () => {
//   const [selectedProject, setSelectedProject] = useState(null);

//   return (
//     <section id="portfolio" className="portfolio-section">
//       <div className="container">
//         <div className="section-header">
//           <h2 className="section-title">✨ Our Latest Work</h2>
//           <p className="section-subtitle">
//             A glimpse into our passion for innovation and quality craftsmanship.
//           </p>
//         </div>

//         <div className="portfolio-grid">
//           {projects.map((project, index) => (
//             <div
//               key={index}
//               className="portfolio-card"
//               style={{ animationDelay: `${index * 150}ms` }}
//             >
//               <div className="card-image">
//                 <img src={project.image} alt={project.title} />
//                 <div className="card-title-top">{project.title}</div>

//                 <div className="overlay glass">
//                   <div className="overlay-content">
//                     <p>{project.description}</p>
//                     <div className="tags">
//                       {project.tags.map((tag, i) => (
//                         <span key={i} className="tag">{tag}</span>
//                       ))}
//                     </div>
//                   </div>
//                   <button onClick={() => setSelectedProject(project)} className="see-more-fixed">
//                     See More <ArrowRight size={14}/>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {selectedProject && (
//         <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <button className="modal-close" onClick={() => setSelectedProject(null)}>
//               <X size={24} />
//             </button>
//             <div className="modal-image">
//               <img src={selectedProject.image} alt={selectedProject.title} />
//               <h2>{selectedProject.title}</h2>
//             </div>
//             <div className="modal-body">
//               <p>{selectedProject.longDescription}</p>
//               <h3>Technologies Used</h3>
//               <div className="modal-tags">
//                 {selectedProject.tags.map((tag, i) => (
//                   <span key={i} className="tag">{tag}</span>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default Portfolio;







import React, { useState, useRef } from 'react';
import { motion, useTransform, useScroll } from "framer-motion";
import { ArrowRight, X } from 'lucide-react';
import './css/Portfolio.css';
import Joystream from  "../Assets/portfolio/Joystream.png";
import mobilebanking from  "../Assets/portfolio/mobilebanking.png";
import EstateMarketplace from  "../Assets/portfolio/EstateMarketplace.png";
import AIHealthcare from  "../Assets/portfolio/AIHealthcare.png";
import ECommerce from  "../Assets/portfolio/E-Commerce.png";
import Blockchain from  "../Assets/portfolio/Blockchain.png";

const projects = [
  {
    title: 'Mobile Banking App Redesign',
    description: 'A redesigned mobile banking app focused on seamless user experience and unified payment flows.',
    longDescription:
      'Netguru collaborated with UBS to redesign their mobile banking app, emphasizing user-centric design with a unified payment flow and consistent features. The project improved app store ratings and accelerated login processes, involving a team extension model for native design implementation.',
    image: mobilebanking,
    tags: ['Mobile Development', 'UX/UI Design', 'Banking'],
  },
  {
    title: 'Joystream Video Platform Design System',
    description: 'A blockchain-based video platform with a customizable design system for creators.',
    longDescription:
      'Joystream partnered with Netguru to develop the Atlas design system, featuring over 190 global components and 175 design tokens for consistency. It enables creators to publish and manage content via blockchain transactions, enhancing user experience and operational efficiency.',
    image: Joystream,
    tags: ['Blockchain', 'Design System', 'Video Platform'],
  },
  {
    title: 'Otodom Real Estate Marketplace Optimization',
    description: 'An optimized real estate platform with improved user experience for buyers and sellers.',
    longDescription:
      'Netguru worked with Otodom to enhance Polands premier real estate marketplace through user research and A/B testing. The project resulted in a 21% increase in conversion rates and a customizable email notification system, boosting traffic and retention.',
    image: EstateMarketplace,
    tags: ['Product Design', 'A/B Testing', 'Real Estate'],
  },
  {
    title: 'AI Healthcare Bot System',
    description: 'An AI-powered chatbot for mental health support and consultations.',
    longDescription:
      'This system uses Python to create an AI mental health therapist chatbot that provides consultations and support. It integrates natural language processing for accurate responses and has been implemented in various healthcare apps to improve accessibility and user satisfaction.',
    image: AIHealthcare,
    tags: ['Python', 'AI', 'Healthcare'],
  },
  {
    title: 'E-Commerce Fake Product Reviews Monitor',
    description: 'A system to detect and delete fake reviews in online shopping platforms.',
    longDescription:
      'Built using machine learning, this tool monitors and removes fake product reviews on e-commerce sites, ensuring trust and authenticity. It has been applied in platforms like Shopify integrations, leading to improved customer confidence and higher sales conversions.',
    image: ECommerce,
    tags: ['Machine Learning', 'E-Commerce', 'Python'],
  },
  {
    title: 'Blockchain Shipment Management System',
    description: 'A tracking system for secure and transparent supply chain management.',
    longDescription:
      'This blockchain-based system tracks shipments with evidence protection, using smart contracts for transparency. It has been used in logistics to reduce fraud and improve efficiency, processing high volumes of transactions securely.',
    image: Blockchain,
    tags: ['Blockchain', 'Supply Chain', 'Smart Contracts'],
  },
];

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const targetRef = useRef(null);
  
  // Scroll progress tracking
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Transform scroll progress to horizontal movement
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-85%"]);

  return (
    <section id="portfolio" className="portfolio-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">✨ Our Latest Work</h2>
          <p className="section-subtitle">
            A glimpse into our passion for innovation and quality craftsmanship.
          </p>
        </div>

        {/* Horizontal Scroll Container */}
        <div ref={targetRef} className="horizontal-scroll-container">
          <div className="sticky-wrapper">
            <motion.div 
              style={{ x }} 
              className="portfolio-horizontal-grid"
            >
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="portfolio-card horizontal"
                >
                  <div className="card-image">
                    <img src={project.image} alt={project.title} />
                    <div className="card-title-top">{project.title}</div>

                    <div className="overlay glass">
                      <div className="overlay-content">
                        <p>{project.description}</p>
                        <div className="tags">
                          {project.tags.map((tag, i) => (
                            <span key={i} className="tag">{tag}</span>
                          ))}
                        </div>
                      </div>
                      <button onClick={() => setSelectedProject(project)} className="see-more-fixed">
                        See More <ArrowRight size={14}/>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProject(null)}>
              <X size={24} />
            </button>
            <div className="modal-image">
              <img src={selectedProject.image} alt={selectedProject.title} />
              <h2>{selectedProject.title}</h2>
            </div>
            <div className="modal-body">
              <p>{selectedProject.longDescription}</p>
              <h3>Technologies Used</h3>
              <div className="modal-tags">
                {selectedProject.tags.map((tag, i) => (
                  <span key={i} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
  