// import React, { useEffect, useState } from 'react';
// import {
//   ArrowRight, Code, Smartphone, Cloud, Zap, Rocket, Star, Globe, Shield
// } from 'lucide-react';
// import './css/Hero.css';
// import heroimg from "../Assets/hero.png"

// const Hero = () => {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [scrollY, setScrollY] = useState(0);
//   const [loaded, setLoaded] = useState(false);

//   useEffect(() => {
//     setIsLoaded(true);
//     setTimeout(() => setLoaded(true), 100); // Delay to trigger transition

//     const handleMouseMove = (e) => {
//       const x = (e.clientX / window.innerWidth) * 100;
//       const y = (e.clientY / window.innerHeight) * 100;
//       requestAnimationFrame(() => setMousePosition({ x, y }));
//     };

//     const handleScroll = () => setScrollY(window.scrollY);

//     window.addEventListener('mousemove', handleMouseMove);
//     window.addEventListener('scroll', handleScroll, { passive: true });

//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   const scrollToSection = (id) => {
//     const element = document.getElementById(id);
//     if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
//   };

//   const floatingCards = [
//     { icon: Code, text: 'Web Development', color: 'core-blue', position: 'core-top-left' },
//     { icon: Smartphone, text: 'Mobile Apps', color: 'core-green', position: 'core-bottom-right' },
//     { icon: Cloud, text: 'Cloud Solutions', color: 'core-purple', position: 'core-middle-right' },
//     { icon: Globe, text: 'Digital Strategy', color: 'core-indigo', position: 'core-top-right' },
//     { icon: Shield, text: 'Cybersecurity', color: 'core-red', position: 'core-bottom-left' },
//     { icon: Star, text: 'UI/UX Design', color: 'core-yellow', position: 'core-middle-left' }
//   ];

//   return (
//     <section id="hero" className="core-hero-section" aria-label="Hero section">
//       {/* Background orbs */}
//       <div className="core-hero-bg" aria-hidden="true">
//         <div
//           className="core-orb core-orb-1"
//           style={{
//             transform: `translate3d(${mousePosition.x * 0.03}px, ${mousePosition.y * 0.03}px, 0)`
//           }}
//         />
//         <div
//           className="core-orb core-orb-2"
//           style={{
//             transform: `translate3d(${mousePosition.x * -0.025}px, ${mousePosition.y * -0.025}px, 0)`
//           }}
//         />
//         <div
//           className="core-orb core-orb-3"
//           style={{
//             transform: `rotate(${mousePosition.x * 0.1 + scrollY * 0.05}deg)`
//           }}
//         />
//       </div>

//       <div className="core-hero-container">
//         <div
//           className={`core-hero-text${loaded ? ' core-loaded' : ''}`}
//           style={{ transform: `translateY(${scrollY * -0.1}px)` }}
//         >
//           <h1>
//             Transform Your Business with{' '}
//             <span className="core-gradient-text">Corelleaf</span>
//           </h1>
//           <p>
//             We deliver innovative software solutions that drive growth, efficiency, and digital transformation. From cutting-edge web applications to mobile apps and cloud infrastructure, we're your trusted technology partner.
//           </p>
//           <div className="core-hero-buttons">
//             <button className="core-btn-primary" onClick={() => scrollToSection('contact')} aria-label="Start your project">
//               <Rocket size={18} /> Start Your Project <ArrowRight size={18} />
//             </button>
//             <button className="core-btn-secondary" onClick={() => scrollToSection('services')} aria-label="View our services">
//               <Zap size={18} /> View Our Services
//             </button>
//           </div>
//         </div>

//         <div
//           className={`core-hero-image${loaded ? ' core-loaded' : ''}`}
//           style={{ transform: `translateY(${scrollY * -0.05}px)` }}
//         >
//           <div className="core-image-wrapper" tabIndex={-1}>
//             <img
//               src={heroimg}
//               alt="Team working"
//               loading="lazy"
//             />
//           </div>

//           {floatingCards.map((card, i) => {
//             const Icon = card.icon;
//             return (
//               <div
//                 key={i}
//                 className={`core-floating-card ${card.color} ${card.position} ${isLoaded ? 'core-fade-in-up' : ''}`}
//                 style={{ animationDelay: `${0.2 + i * 0.15}s` }}
//                 tabIndex={0}
//                 aria-label={card.text}
//               >
//                 <Icon size={20} />
//                 <span>{card.text}</span>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;



// import React, { useEffect, useRef } from 'react';
// import Ecommers from "../Assets/image/Ecommers.jpg"
// import Mobile from "../Assets/image/mobile app.jpeg"
// import Claud from "../Assets/image/claud.jpeg"
// import Database from "../Assets/image/Database.jpg"
// import security from "../Assets/image/Security.jpeg"
// import API from "../Assets/image/API.jpeg"

// const Hero = () => {
//   const nextDomRef = useRef(null);
//   const prevDomRef = useRef(null);
//   const carouselDomRef = useRef(null);
//   const runTimeOutRef = useRef(null);
//   const runNextAutoRef = useRef(null);

//   useEffect(() => {
//     // Get DOM elements
//     let nextDom = nextDomRef.current;
//     let prevDom = prevDomRef.current;
//     let carouselDom = carouselDomRef.current;
//     let SliderDom = carouselDom.querySelector('.carousel .list');
//     let thumbnailBorderDom = carouselDom.querySelector('.carousel .thumbnail');
//     let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
//     let timeDom = carouselDom.querySelector('.carousel .time');

//     thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
//     let timeRunning = 3000;
//     let timeAutoNext = 7000;

//     const showSlider = (type) => {
//       let SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
//       let thumbnailItemsDom = carouselDom.querySelectorAll('.carousel .thumbnail .item');
      
//       if(type === 'next'){
//         SliderDom.appendChild(SliderItemsDom[0]);
//         thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
//         carouselDom.classList.add('next');
//       } else {
//         SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
//         thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
//         carouselDom.classList.add('prev');
//       }
      
//       clearTimeout(runTimeOutRef.current);
//       runTimeOutRef.current = setTimeout(() => {
//         carouselDom.classList.remove('next');
//         carouselDom.classList.remove('prev');
//       }, timeRunning);

//       clearTimeout(runNextAutoRef.current);
//       runNextAutoRef.current = setTimeout(() => {
//         nextDom.click();
//       }, timeAutoNext);
//     };

//     nextDom.onclick = function(){
//       showSlider('next');    
//     };

//     prevDom.onclick = function(){
//       showSlider('prev');    
//     };

//     runNextAutoRef.current = setTimeout(() => {
//       nextDom.click();
//     }, timeAutoNext);

//     // Cleanup function
//     return () => {
//       clearTimeout(runTimeOutRef.current);
//       clearTimeout(runNextAutoRef.current);
//     };
//   }, []);

//   return (
//     <>
//       <style jsx>{`
//         body {
//           margin: 0;
//           background-color: #eee;
//           font-family: Poppins;
//           height: 100vh;
//         }
        
//         .carousel {
//           height: 100vh;
//           // margin-top: -50px;
//           width: 100vw;
//           overflow: hidden;
//           position: relative;
//         }
        
//         .carousel .list .item {
//           width: 100%;
//           height: 100%;
//           position: absolute;
//           inset: 0 0 0 0;
//         }
        
//         .carousel .list .item img {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//         }
        
//         .carousel .list .item .content {
//           position: absolute;
//           top: 20%;
//           width: 1140px;
//           max-width: 80%;
//           left: 50%;
//           transform: translateX(-50%);
//           padding-right: 30%;
//           box-sizing: border-box;
//           color: #fff;
//           text-shadow: 0 5px 10px #0004;
//         }
        
//         .carousel .list .item .content .author {
//           font-weight: bold;
//           letter-spacing: 10px;
//         }
        
//         .carousel .list .item .content .title,
//         .carousel .list .item .content .topic {
//           font-size: 5em;
//           font-weight: bold;
//           line-height: 1.3em;
//         }
        
//         .carousel .list .item .content .topic {
//           color: #f1683a;
//         }
        
//         .carousel .list .item .content .des {
//           margin-top: 20px;
//         }
//           .des{
//           // text-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
//           text-shadow: 2px 2px 4px black;

//           }
        
//         .carousel .list .item .content .buttons {
//           display: grid;
//           grid-template-columns: repeat(2, 130px);
//           grid-template-rows: 40px;
//           gap: 5px;
//           margin-top: 20px;
//         }
        
//         .carousel .list .item .content .buttons button {
//           border: none;
//           background-color: #eee;
//           font-family: Poppins;
//           font-weight: 500;
//           cursor: pointer;
//           transition: 0.4s;
//           border-radius: 30px;
//         }
        
//         .carousel .list .item .content .buttons button:nth-child(2) {
//           background-color: transparent;
//           border: 1px solid #fff;
//           color: #eee;
//         }
        
//         .carousel .list .item .content .buttons button:hover {
//           transform: scale(1.1);
//         }
        
//         .carousel .list .item:nth-child(1) {
//           z-index: 1;
//         }
        
//         .carousel .list .item:nth-child(1) .content .author,
//         .carousel .list .item:nth-child(1) .content .title,
//         .carousel .list .item:nth-child(1) .content .topic,
//         .carousel .list .item:nth-child(1) .content .des,
//         .carousel .list .item:nth-child(1) .content .buttons {
//           transform: translateY(50px);
//           filter: blur(20px);
//           opacity: 0;
//           animation: showContent 0.5s 1s linear 1 forwards;
//         }
        
//         @keyframes showContent {
//           to {
//             transform: translateY(0px);
//             filter: blur(0px);
//             opacity: 1;
//           }
//         }
        
//         .carousel .list .item:nth-child(1) .content .title {
//           animation-delay: 1.2s !important;
//         }
        
//         .carousel .list .item:nth-child(1) .content .topic {
//           animation-delay: 1.4s !important;
//         }
        
//         .carousel .list .item:nth-child(1) .content .des {
//           animation-delay: 1.6s !important;
//         }
        
//         .carousel .list .item:nth-child(1) .content .buttons {
//           animation-delay: 1.8s !important;
//         }
        
//         .carousel.next .list .item:nth-child(1) img,
//         .carousel.prev .list .item:nth-child(1) img {
//           width: 150%;
//           height: 150%;
//           position: absolute;
//           top: 50%;
//           left: 50%;
//           transform: translate(-50%, -50%);
//           filter: blur(50px);
//           transition: 0.5s;
//         }
        
//         .carousel.next .thumbnail .item:nth-child(1) {
//           overflow: hidden;
//           animation: showThumbnail 0.5s linear 1 forwards;
//         }
        
//         .carousel.prev .thumbnail .item:nth-child(1) {
//           overflow: hidden;
//           animation: showThumbnail 0.5s linear 1 forwards;
//         }
        
//         .carousel.next .thumbnail {
//           animation: effectNext 0.5s linear 1 forwards;
//         }
        
//         .carousel.prev .thumbnail {
//           animation: effectPrev 0.5s linear 1 forwards;
//         }
        
//         @keyframes showThumbnail {
//           from {
//             width: 0px;
//             filter: blur(20px);
//           }
//           to {
//             width: 150px;
//             filter: blur(0px);
//           }
//         }
        
//         @keyframes effectNext {
//           from {
//             transform: translateX(150px);
//           }
//         }
        
//         @keyframes effectPrev {
//           from {
//             transform: translateX(-150px);
//           }
//         }
        
//         .carousel .thumbnail {
//           position: absolute;
//           bottom: 50px;
//           left: 50%;
//           width: max-content;
//           z-index: 100;
//           display: flex;
//           gap: 20px;
//         }
        
//         .carousel .thumbnail .item {
//           width: 150px;
//           height: 220px;
//           flex-shrink: 0;
//           position: relative;
//         }
        
//         .carousel .thumbnail .item img {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//           border-radius: 20px;
//         }
        
//         .carousel .thumbnail .item .content {
//           color: #fff;
//           position: absolute;
//           bottom: 10px;
//           left: 10px;
//           right: 10px;
//         }
        
//         .carousel .thumbnail .item .content .title {
//           font-weight: 500;
//         }
        
//         .carousel .thumbnail .item .content .description {
//           font-weight: 300;
//         }
        
//         .carousel .arrows {
//           position: absolute;
//           top: 80%;
//           right: 52%;
//           z-index: 100;
//           width: 300px;
//           max-width: 30%;
//           display: flex;
//           gap: 10px;
//           align-items: center;
//         }
        
//         .carousel .arrows button {
//           width: 40px;
//           height: 40px;
//           border-radius: 50%;
//           background-color: #eee4;
//           border: none;
//           color: #fff;
//           font-family: monospace;
//           font-weight: bold;
//           transition: 0.5s;
//           cursor: pointer;
//         }
        
//         .carousel .arrows button:hover {
//           background-color: #fff;
//           color: #555;
//         }
        
//         .carousel .time {
//           position: absolute;
//           z-index: 1000;
//           width: 0%;
//           height: 3px;
//           background-color: #f1683a;
//           left: 0;
//           top: 0;
//         }
        
//         .carousel.next .time,
//         .carousel.prev .time {
//           animation: runningTime 3s linear 1 forwards;
//         }
        
//         @keyframes runningTime {
//           from { width: 100%; }
//           to { width: 0%; }
//         }
        
//         @media screen and (max-width: 678px) {
//           .carousel .list .item .content {
//             padding-right: 0;
//           }
          
//           .carousel .list .item .content .title {
//             font-size: 30px;
//           }
//         }
//       `}</style>

//       {/* carousel */}
//       <div className="carousel" ref={carouselDomRef}>
//         {/* list item */}
//         <div className="list">
//           <div className="item">
//             <img src={Ecommers} alt="Ecommers" />
//             <div className="content">
//               <div className="author">CORELLEAF</div>
//               <div className="title">E-Commers</div>
//               <div className="topic">WEBSITES</div>
//               <div className="des">
//                 Custom web applications built with modern frameworks like React, <br /> Vue, and Angular. Responsive, fast, and SEO-optimized.
//               </div>
//               <div className="buttons">
//                 {/* <button>SEE MORE</button> */}
//                 {/* <button>SUBSCRIBE</button> */}
//               </div>
//             </div>
//           </div>
//           <div className="item">
//             <img src={Mobile} alt="Mobile App" />
//             <div className="content">
//               <div className="author">CORELLEAF</div>
//               <div className="title">Mobile App</div>
//               <div className="topic">Development</div>
//               <div className="des">
//                 Native and cross-platform mobile applications for iOS and <br /> Android with seamless user experiences.
//               </div>
//               <div className="buttons">
//                 {/* <button>SEE MORE</button> */}
//                 {/* <button>SUBSCRIBE</button> */}
//               </div>
//             </div>
//           </div>
//           <div className="item">
//             <img src={Claud} alt="Claud" />
//             <div className="content">
//               <div className="author">CORELLEAF</div>
//               <div className="title">Cloud</div>
//               <div className="topic">Solutions</div>
//               <div className="des">
//                 Scalable cloud infrastructure and migration services using <br /> AWS, Azure, and Google Cloud platforms.
//               </div>
//               <div className="buttons">
//                 {/* <button>SEE MORE</button> */}
//                 {/* <button>SUBSCRIBE</button> */}
//               </div>
//             </div>
//           </div>
//           <div className="item">
//             <img src={Database} alt="Database" />
//             <div className="content">
//               <div className="author">CORELLEAF</div>
//               <div className="title">Database</div>
//               <div className="topic">Design</div>
//               <div className="des">
//                 Efficient database architecture and optimization for <br /> maximum performance and reliability.
//               </div>
//               <div className="buttons">
//                 {/* <button>SEE MORE</button> */}
//                 {/* <button>SUBSCRIBE</button> */}
//               </div>
//             </div>
//           </div>

//            <div className="item">
//             <img src={security} alt="security" />
//             <div className="content">
//               <div className="author">CORELLEAF</div>
//               <div className="title">Cybersecurity</div>
//               <div className="topic">Security</div>
//               <div className="des">
//                 Comprehensive security solutions to protect your <br /> digital assets and ensure compliance.
//               </div>
//               <div className="buttons">
//                 {/* <button>SEE MORE</button> */}
//                 {/* <button>SUBSCRIBE</button> */}
//               </div>
//             </div>
//           </div>

//            <div className="item">
//             <img src={API} alt="API" />
//             <div className="content">
//               <div className="author">CORELLEAF</div>
//               <div className="title">API</div>
//               <div className="topic"> Development</div>
//               <div className="des">
//                 Comprehensive API solutions to enhance your <br /> digital products and ensure seamless integration.
//               </div>
//               <div className="buttons">
//                 {/* <button>SEE MORE</button> */}
//                 {/* <button>SUBSCRIBE</button> */}
//               </div>
//             </div>
//           </div>

//         </div>
        

// {/* 
        
// import React, { useEffect, useRef } from 'react';
// import Ecommers from "../Assets/image/Ecommers.jpg"
// import Mobile from "../Assets/image/mobile app.jpeg"
// import Claud from "../Assets/image/claud.jpeg"
// import Database from "../Assets/image/Database.jpg"
// import security from "../Assets/image/Security.jpeg"
// import API from "../Assets/image/API.jpeg" */}

//         {/* list thumbnail */}
//         <div className="thumbnail">

//           {/* <div className="item">
//             <img src={Ecommers} alt="Ecommers" />
//             <div className="content">
//               <div className="title">Ecommers</div>
//               <div className="description">E-commerce Solutions</div>
//             </div>
//           </div> */}

//           {/* <div className="item">
//             <img src={Mobile} alt="Mobile thumbnail" />
//             <div className="content">
//               <div className="title">Mobile App</div>
//               <div className="description">Development</div>
//             </div>
//           </div> */}

//           {/* <div className="item">
//             <img src={Claud} alt="Claud thumbnail" />
//             <div className="content">
//               <div className="title">Cloud</div>
//               <div className="description">Cloud Solutions</div>
//             </div>
//           </div> */}

//           {/* <div className="item">
//             <img src={Database} alt="Database thumbnail" />
//             <div className="content">
//               <div className="title">Database</div>
//               <div className="description">Integretion</div>
//             </div>
//           </div> */}


//           {/* <div className="item">
//             <img src={security} alt="Security thumbnail" />
//             <div className="content">
//               <div className="title">Cybersecurity</div>
//               <div className="description">Security</div>
//             </div>
//           </div> */}


//           <div className="item">
//             {/* <img src={API} alt="API thumbnail" /> */}
//             <div className="content">
//               {/* <div className="title">API</div>
//               <div className="description">Development</div> */}
//             </div>
//           </div>
          
//         </div>
        
//         {/* next prev */}
//         <div className="arrows">
//           <button ref={prevDomRef}>{'<'}</button>
//           <button ref={nextDomRef}>{'>'}</button>
//         </div>
        
//         {/* time running */}
//         <div className="time"></div>
//       </div>
//     </>
//   );
// };

// export default Hero;





// // import React, { useEffect, useState } from 'react';
// // import {
// //   ArrowRight, Code, Smartphone, Cloud, Zap, Rocket, Star, Globe, Shield
// // } from 'lucide-react';
// // import './css/Hero.css';
// // import heroimg from "../Assets/hero.png"

// // const Hero = () => {
// //   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
// //   const [isLoaded, setIsLoaded] = useState(false);
// //   const [scrollY, setScrollY] = useState(0);
// //   const [loaded, setLoaded] = useState(false);

// //   useEffect(() => {
// //     setIsLoaded(true);
// //     setTimeout(() => setLoaded(true), 100); // Delay to trigger transition

// //     const handleMouseMove = (e) => {
// //       const x = (e.clientX / window.innerWidth) * 100;
// //       const y = (e.clientY / window.innerHeight) * 100;
// //       requestAnimationFrame(() => setMousePosition({ x, y }));
// //     };

// //     const handleScroll = () => setScrollY(window.scrollY);

// //     window.addEventListener('mousemove', handleMouseMove);
// //     window.addEventListener('scroll', handleScroll, { passive: true });

// //     return () => {
// //       window.removeEventListener('mousemove', handleMouseMove);
// //       window.removeEventListener('scroll', handleScroll);
// //     };
// //   }, []);

// //   const scrollToSection = (id) => {
// //     const element = document.getElementById(id);
// //     if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
// //   };

// //   const floatingCards = [
// //     { icon: Code, text: 'Web Development', color: 'core-blue', position: 'core-top-left' },
// //     { icon: Smartphone, text: 'Mobile Apps', color: 'core-green', position: 'core-bottom-right' },
// //     { icon: Cloud, text: 'Cloud Solutions', color: 'core-purple', position: 'core-middle-right' },
// //     { icon: Globe, text: 'Digital Strategy', color: 'core-indigo', position: 'core-top-right' },
// //     { icon: Shield, text: 'Cybersecurity', color: 'core-red', position: 'core-bottom-left' },
// //     { icon: Star, text: 'UI/UX Design', color: 'core-yellow', position: 'core-middle-left' }
// //   ];

// //   return (
// //     <section id="hero" className="core-hero-section" aria-label="Hero section">
// //       {/* Background orbs */}
// //       <div className="core-hero-bg" aria-hidden="true">
// //         <div
// //           className="core-orb core-orb-1"
// //           style={{
// //             transform: `translate3d(${mousePosition.x * 0.03}px, ${mousePosition.y * 0.03}px, 0)`
// //           }}
// //         />
// //         <div
// //           className="core-orb core-orb-2"
// //           style={{
// //             transform: `translate3d(${mousePosition.x * -0.025}px, ${mousePosition.y * -0.025}px, 0)`
// //           }}
// //         />
// //         <div
// //           className="core-orb core-orb-3"
// //           style={{
// //             transform: `rotate(${mousePosition.x * 0.1 + scrollY * 0.05}deg)`
// //           }}
// //         />
// //       </div>

// //       <div className="core-hero-container">
// //         <div
// //           className={`core-hero-text${loaded ? ' core-loaded' : ''}`}
// //           style={{ transform: `translateY(${scrollY * -0.1}px)` }}
// //         >
// //           <h1>
// //             Transform Your Business with{' '}
// //             <span className="core-gradient-text">Corelleaf</span>
// //           </h1>
// //           <p>
// //             We deliver innovative software solutions that drive growth, efficiency, and digital transformation. From cutting-edge web applications to mobile apps and cloud infrastructure, we're your trusted technology partner.
// //           </p>
// //           <div className="core-hero-buttons">
// //             <button className="core-btn-primary" onClick={() => scrollToSection('contact')} aria-label="Start your project">
// //               <Rocket size={18} /> Start Your Project <ArrowRight size={18} />
// //             </button>
// //             <button className="core-btn-secondary" onClick={() => scrollToSection('services')} aria-label="View our services">
// //               <Zap size={18} /> View Our Services
// //             </button>
// //           </div>
// //         </div>

// //         <div
// //           className={`core-hero-image${loaded ? ' core-loaded' : ''}`}
// //           style={{ transform: `translateY(${scrollY * -0.05}px)` }}
// //         >
// //           <div className="core-image-wrapper" tabIndex={-1}>
// //             <img
// //               src={heroimg}
// //               alt="Team working"
// //               loading="lazy"
// //             />
// //           </div>

// //           {floatingCards.map((card, i) => {
// //             const Icon = card.icon;
// //             return (
// //               <div
// //                 key={i}
// //                 className={`core-floating-card ${card.color} ${card.position} ${isLoaded ? 'core-fade-in-up' : ''}`}
// //                 style={{ animationDelay: `${0.2 + i * 0.15}s` }}
// //                 tabIndex={0}
// //                 aria-label={card.text}
// //               >
// //                 <Icon size={20} />
// //                 <span>{card.text}</span>
// //               </div>
// //             );
// //           })}
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default Hero;



// import React, { useEffect, useRef } from 'react';
// import Ecommers from "../Assets/image/Ecommers.jpg"
// import Mobile from "../Assets/image/mobile app.jpeg"
// import Claud from "../Assets/image/claud.jpeg"
// import Database from "../Assets/image/Database.jpg"
// import security from "../Assets/image/Security.jpeg"
// import API from "../Assets/image/API.jpeg"

// const Hero = () => {
//   const nextDomRef = useRef(null);
//   const prevDomRef = useRef(null);
//   const carouselDomRef = useRef(null);
//   const runTimeOutRef = useRef(null);
//   const runNextAutoRef = useRef(null);

//   useEffect(() => {
//     // Get DOM elements
//     let nextDom = nextDomRef.current;
//     let prevDom = prevDomRef.current;
//     let carouselDom = carouselDomRef.current;
//     let SliderDom = carouselDom.querySelector('.carousel .list');
//     let thumbnailBorderDom = carouselDom.querySelector('.carousel .thumbnail');
//     let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
//     let timeDom = carouselDom.querySelector('.carousel .time');

//     thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
//     let timeRunning = 3000;
//     let timeAutoNext = 7000;

//     const showSlider = (type) => {
//       let SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
//       let thumbnailItemsDom = carouselDom.querySelectorAll('.carousel .thumbnail .item');
      
//       if(type === 'next'){
//         SliderDom.appendChild(SliderItemsDom[0]);
//         thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
//         carouselDom.classList.add('next');
//       } else {
//         SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
//         thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
//         carouselDom.classList.add('prev');
//       }
      
//       clearTimeout(runTimeOutRef.current);
//       runTimeOutRef.current = setTimeout(() => {
//         carouselDom.classList.remove('next');
//         carouselDom.classList.remove('prev');
//       }, timeRunning);

//       clearTimeout(runNextAutoRef.current);
//       runNextAutoRef.current = setTimeout(() => {
//         nextDom.click();
//       }, timeAutoNext);
//     };

//     nextDom.onclick = function(){
//       showSlider('next');    
//     };

//     prevDom.onclick = function(){
//       showSlider('prev');    
//     };

//     runNextAutoRef.current = setTimeout(() => {
//       nextDom.click();
//     }, timeAutoNext);

//     // Cleanup function
//     return () => {
//       clearTimeout(runTimeOutRef.current);
//       clearTimeout(runNextAutoRef.current);
//     };
//   }, []);

//   return (
//     <>
//       <style jsx>{`
//         body {
//           margin: 0;
//           background-color: #eee;
//           font-family: Poppins;
//           height: 100vh;
//         }
        
//         .carousel {
//           height: 100vh;
//           // margin-top: -50px;
//           width: 100vw;
//           overflow: hidden;
//           position: relative;
//         }
        
//         .carousel .list .item {
//           width: 100%;
//           height: 100%;
//           position: absolute;
//           inset: 0 0 0 0;
//         }
        
//         .carousel .list .item img {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//         }
        
//         .carousel .list .item .content {
//           position: absolute;
//           top: 20%;
//           width: 1140px;
//           max-width: 80%;
//           left: 50%;
//           transform: translateX(-50%);
//           padding-right: 30%;
//           box-sizing: border-box;
//           color: #fff;
//           text-shadow: 0 5px 10px #0004;
//         }
        
//         .carousel .list .item .content .author {
//           font-weight: bold;
//           letter-spacing: 10px;
//         }
        
//         .carousel .list .item .content .title,
//         .carousel .list .item .content .topic {
//           font-size: 5em;
//           font-weight: bold;
//           line-height: 1.3em;
//         }
        
//         .carousel .list .item .content .topic {
//           color: #f1683a;
//         }
        
//         .carousel .list .item .content .des {
//           margin-top: 20px;
//         }
//           .des{
//           // text-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
//           text-shadow: 2px 2px 4px black;

//           }
        
//         .carousel .list .item .content .buttons {
//           display: grid;
//           grid-template-columns: repeat(2, 130px);
//           grid-template-rows: 40px;
//           gap: 5px;
//           margin-top: 20px;
//         }
        
//         .carousel .list .item .content .buttons button {
//           border: none;
//           background-color: #eee;
//           font-family: Poppins;
//           font-weight: 500;
//           cursor: pointer;
//           transition: 0.4s;
//           border-radius: 30px;
//         }
        
//         .carousel .list .item .content .buttons button:nth-child(2) {
//           background-color: transparent;
//           border: 1px solid #fff;
//           color: #eee;
//         }
        
//         .carousel .list .item .content .buttons button:hover {
//           transform: scale(1.1);
//         }
        
//         .carousel .list .item:nth-child(1) {
//           z-index: 1;
//         }
        
//         .carousel .list .item:nth-child(1) .content .author,
//         .carousel .list .item:nth-child(1) .content .title,
//         .carousel .list .item:nth-child(1) .content .topic,
//         .carousel .list .item:nth-child(1) .content .des,
//         .carousel .list .item:nth-child(1) .content .buttons {
//           transform: translateY(50px);
//           filter: blur(20px);
//           opacity: 0;
//           animation: showContent 0.5s 1s linear 1 forwards;
//         }
        
//         @keyframes showContent {
//           to {
//             transform: translateY(0px);
//             filter: blur(0px);
//             opacity: 1;
//           }
//         }
        
//         .carousel .list .item:nth-child(1) .content .title {
//           animation-delay: 1.2s !important;
//         }
        
//         .carousel .list .item:nth-child(1) .content .topic {
//           animation-delay: 1.4s !important;
//         }
        
//         .carousel .list .item:nth-child(1) .content .des {
//           animation-delay: 1.6s !important;
//         }
        
//         .carousel .list .item:nth-child(1) .content .buttons {
//           animation-delay: 1.8s !important;
//         }
        
//         .carousel.next .list .item:nth-child(1) img,
//         .carousel.prev .list .item:nth-child(1) img {
//           width: 150%;
//           height: 150%;
//           position: absolute;
//           top: 50%;
//           left: 50%;
//           transform: translate(-50%, -50%);
//           filter: blur(50px);
//           transition: 0.5s;
//         }
        
//         .carousel.next .thumbnail .item:nth-child(1) {
//           overflow: hidden;
//           animation: showThumbnail 0.5s linear 1 forwards;
//         }
        
//         .carousel.prev .thumbnail .item:nth-child(1) {
//           overflow: hidden;
//           animation: showThumbnail 0.5s linear 1 forwards;
//         }
        
//         .carousel.next .thumbnail {
//           animation: effectNext 0.5s linear 1 forwards;
//         }
        
//         .carousel.prev .thumbnail {
//           animation: effectPrev 0.5s linear 1 forwards;
//         }
        
//         @keyframes showThumbnail {
//           from {
//             width: 0px;
//             filter: blur(20px);
//           }
//           to {
//             width: 150px;
//             filter: blur(0px);
//           }
//         }
        
//         @keyframes effectNext {
//           from {
//             transform: translateX(150px);
//           }
//         }
        
//         @keyframes effectPrev {
//           from {
//             transform: translateX(-150px);
//           }
//         }
        
//         .carousel .thumbnail {
//           position: absolute;
//           bottom: 50px;
//           left: 50%;
//           width: max-content;
//           z-index: 100;
//           display: flex;
//           gap: 20px;
//         }
        
//         .carousel .thumbnail .item {
//           width: 150px;
//           height: 220px;
//           flex-shrink: 0;
//           position: relative;
//         }
        
//         .carousel .thumbnail .item img {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//           border-radius: 20px;
//         }
        
//         .carousel .thumbnail .item .content {
//           color: #fff;
//           position: absolute;
//           bottom: 10px;
//           left: 10px;
//           right: 10px;
//         }
        
//         .carousel .thumbnail .item .content .title {
//           font-weight: 500;
//         }
        
//         .carousel .thumbnail .item .content .description {
//           font-weight: 300;
//         }
        
//         .carousel .arrows {
//           position: absolute;
//           top: 80%;
//           right: 52%;
//           z-index: 100;
//           width: 300px;
//           max-width: 30%;
//           display: flex;
//           gap: 10px;
//           align-items: center;
//         }
        
//         .carousel .arrows button {
//           width: 40px;
//           height: 40px;
//           border-radius: 50%;
//           background-color: #eee4;
//           border: none;
//           color: #fff;
//           font-family: monospace;
//           font-weight: bold;
//           transition: 0.5s;
//           cursor: pointer;
//         }
        
//         .carousel .arrows button:hover {
//           background-color: #fff;
//           color: #555;
//         }
        
//         .carousel .time {
//           position: absolute;
//           z-index: 1000;
//           width: 0%;
//           height: 3px;
//           background-color: #f1683a;
//           left: 0;
//           top: 0;
//         }
        
//         .carousel.next .time,
//         .carousel.prev .time {
//           animation: runningTime 3s linear 1 forwards;
//         }
        
//         @keyframes runningTime {
//           from { width: 100%; }
//           to { width: 0%; }
//         }
        
//         @media screen and (max-width: 678px) {
//           .carousel .list .item .content {
//             padding-right: 0;
//           }
          
//           .carousel .list .item .content .title {
//             font-size: 30px;
//           }
//         }
//       `}</style>

//       {/* carousel */}
//       <div className="carousel" id="hero" ref={carouselDomRef}>
//         {/* list item */}
//         <div className="list">
//           <div className="item">
//             <img src={Ecommers} alt="Ecommers" />
//             <div className="content">
//               <div className="author">CORELLEAF</div>
//               <div className="title">E-Commers</div>
//               <div className="topic">WEBSITES</div>
//               <div className="des">
//                 Custom web applications built with modern frameworks like React, <br /> Vue, and Angular. Responsive, fast, and SEO-optimized.
//               </div>
//               <div className="buttons">
//                 {/* <button>SEE MORE</button> */}
//                 {/* <button>SUBSCRIBE</button> */}
//               </div>
//             </div>
//           </div>
//           <div className="item">
//             <img src={Mobile} alt="Mobile App" />
//             <div className="content">
//               <div className="author">CORELLEAF</div>
//               <div className="title">Mobile App</div>
//               <div className="topic">Development</div>
//               <div className="des">
//                 Native and cross-platform mobile applications for iOS and <br /> Android with seamless user experiences.
//               </div>
//               <div className="buttons">
//                 {/* <button>SEE MORE</button> */}
//                 {/* <button>SUBSCRIBE</button> */}
//               </div>
//             </div>
//           </div>
//           <div className="item">
//             <img src={Claud} alt="Claud" />
//             <div className="content">
//               <div className="author">CORELLEAF</div>
//               <div className="title">Cloud</div>
//               <div className="topic">Solutions</div>
//               <div className="des">
//                 Scalable cloud infrastructure and migration services using <br /> AWS, Azure, and Google Cloud platforms.
//               </div>
//               <div className="buttons">
//                 {/* <button>SEE MORE</button> */}
//                 {/* <button>SUBSCRIBE</button> */}
//               </div>
//             </div>
//           </div>
//           <div className="item">
//             <img src={Database} alt="Database" />
//             <div className="content">
//               <div className="author">CORELLEAF</div>
//               <div className="title">Database</div>
//               <div className="topic">Design</div>
//               <div className="des">
//                 Efficient database architecture and optimization for <br /> maximum performance and reliability.
//               </div>
//               <div className="buttons">
//                 {/* <button>SEE MORE</button> */}
//                 {/* <button>SUBSCRIBE</button> */}
//               </div>
//             </div>
//           </div>

//            <div className="item">
//             <img src={security} alt="security" />
//             <div className="content">
//               <div className="author">CORELLEAF</div>
//               <div className="title">Cybersecurity</div>
//               <div className="topic">Security</div>
//               <div className="des">
//                 Comprehensive security solutions to protect your <br /> digital assets and ensure compliance.
//               </div>
//               <div className="buttons">
//                 {/* <button>SEE MORE</button> */}
//                 {/* <button>SUBSCRIBE</button> */}
//               </div>
//             </div>
//           </div>

//            <div className="item">
//             <img src={API} alt="API" />
//             <div className="content">
//               <div className="author">CORELLEAF</div>
//               <div className="title">API</div>
//               <div className="topic"> Development</div>
//               <div className="des">
//                 Comprehensive API solutions to enhance your <br /> digital products and ensure seamless integration.
//               </div>
//               <div className="buttons">
//                 {/* <button>SEE MORE</button> */}
//                 {/* <button>SUBSCRIBE</button> */}
//               </div>
//             </div>
//           </div>

//         </div>
        

// {/* 
        
// import React, { useEffect, useRef } from 'react';
// import Ecommers from "../Assets/image/Ecommers.jpg"
// import Mobile from "../Assets/image/mobile app.jpeg"
// import Claud from "../Assets/image/claud.jpeg"
// import Database from "../Assets/image/Database.jpg"
// import security from "../Assets/image/Security.jpeg"
// import API from "../Assets/image/API.jpeg" */}

//         {/* list thumbnail */}
//         <div className="thumbnail">
//           <div className="item">
//             {/* <img src={Ecommers} alt="Ecommers" />
//             <div className="content">
//               <div className="title">Ecommers</div>
//               <div className="description">E-commerce Solutions</div> */}
//             {/* </div> */}
//           </div>
//           <div className="item">
//             {/* <img src={Mobile} alt="Mobile thumbnail" />
//             <div className="content">
//               <div className="title">Mobile App</div>
//               <div className="description">Development</div> */}
//             {/* </div> */}
//           </div>

//           <div className="item">
//             {/* <img src={Claud} alt="Claud thumbnail" />
//             <div className="content">
//               <div className="title">Cloud</div>
//               <div className="description">Cloud Solutions</div>
//             </div> */}
//           </div>
          
//           <div className="item">
//             {/* <img src={Database} alt="Database thumbnail" />
//             <div className="content">
//               <div className="title">Database</div>
//               <div className="description">Integretion</div>
//             </div> */}
//           </div>


//           <div className="item">
//             {/* <img src={security} alt="Security thumbnail" />
//             <div className="content">
//               <div className="title">Cybersecurity</div>
//               <div className="description">Security</div>
//             </div> */}
//           </div>


//           <div className="item">
//             {/* <img src={API} alt="API thumbnail" />
//             <div className="content">
//               <div className="title">API</div>
//               <div className="description">Development</div>
//             </div> */}
//           </div>
//         </div>
        
//         {/* next prev */}
//         <div className="arrows">
//           <button ref={prevDomRef}>{'<'}</button>
//           <button ref={nextDomRef}>{'>'}</button>
//         </div>
        
//         {/* time running */}
//         <div className="time"></div>
//       </div>
//     </>
//   );
// };

// export default Hero;







// import React, { useState, useEffect } from 'react';
// // import AI from "../Assets/AI.png"
// import LightRays from './Effects/LightRays.jsx';

// const Hero = () => {
//   const [particles, setParticles] = useState([]);

//   useEffect(() => {
//     createParticles();
//   }, []);

//   const createParticles = () => {
//     const particleCount = window.innerWidth < 768 ? 15 : 25;
//     const colors = ['white', 'pink', 'purple', 'cyan', 'blue'];
//     const newParticles = [];
    
//     for (let i = 0; i < particleCount; i++) {
//       newParticles.push({
//         id: i,
//         color: colors[i % colors.length],
//         size: Math.random() * 6 + 3,
//         left: Math.random() * 100,
//         duration: Math.random() * 8 + 10,
//         delay: Math.random() * -20
//       });
//     }
//     setParticles(newParticles);
//   };

//   const handleScrollDown = () => {
//     window.scrollTo({
//       top: window.innerHeight,
//       behavior: 'smooth'
//     });
//   };

//   return (
//     <div className="relative min-h-screen overflow-hidden bg-black"  id="hero">
//       {/* Background Image */}
//       <div className="absolute inset-0 z-10">
//         {/* <img 
//           alt="A close-up of a female humanoid robot's face with intricate mechanical details" 
//           src={AI}
//           className="object-cover w-full h-full"
//           style={{ filter: 'brightness(0.8) contrast(1.2) saturate(1.1)' }}
//         /> */}

//         <LightRays
//     raysOrigin="top-center"
//     raysColor="#00ffff"
//     raysSpeed={1.5}
//     lightSpread={0.8}
//     rayLength={1.2}
//     followMouse={true}
//     mouseInfluence={0.1}
//     noiseAmount={0.1}
//     distortion={0.05}
//     className="custom-rays"
//   />
//       </div>

//       {/* Image Overlay */}
//       {/* <div 
//         className="absolute inset-0 z-20"
//         style={{
//           background: `linear-gradient(
//             135deg, 
//             rgba(0,0,0,0.7) 0%, 
//             rgba(236,72,153,0.15) 25%,
//             rgba(139,92,246,0.15) 50%,
//             rgba(6,182,212,0.1) 75%,
//             rgba(0,0,0,0.8) 100%
//           )`
//         }}
//       /> */}

//       {/* Particles */}
//       <div className="absolute inset-0 z-30 overflow-hidden pointer-events-none">
//         {particles.map(particle => (
//           <div
//             key={particle.id}
//             className={`absolute rounded-full particle-${particle.color}`}
//             style={{
//               width: `${particle.size}px`,
//               height: `${particle.size}px`,
//               left: `${particle.left}%`,
//               animation: `particleFloat ${particle.duration}s linear infinite`,
//               animationDelay: `${particle.delay}s`,
//               background: getParticleBackground(particle.color),
//               boxShadow: getParticleGlow(particle.color)
//             }}
//           />
//         ))}
//       </div>

//       {/* Main Content */}
//       <div className="relative z-40 flex items-center justify-center min-h-screen px-4">
//         <div className="max-w-4xl mx-auto text-center">
//           <h1 
//             className="mt-12 mb-8 text-6xl font-black leading-none md:text-3xl lg:text-6xl"
//             style={{
//               // background: 'linear-gradient(135deg, #ffffff 0%, #ec4899 30%, #8b5cf6 70%, #06b6d4 100%)',
//               background:"white",
//               WebkitBackgroundClip: 'text',
//               WebkitTextFillColor: 'transparent',
//               backgroundClip: 'text',
//               textShadow: '0 0 30px rgba(236, 72, 153, 0.3)',
//               animation: 'textGlow 4s ease-in-out infinite alternate, headingFloat 6s ease-in-out infinite'
//             }}
//           >
//             Scalable Software Solutions
//           </h1>
          
//           <p 
//             className="p-6 mb-12 text-xl leading-relaxed border md:text-1xl text-white/90 rounded-2xl border-white/10"
//             style={{
//               background: 'rgba(0, 0, 0, 0.164)',
//               backdropFilter: 'blur(1px)',
//               animation: 'fadeInUp 1s ease-out 0.5s both'
//             }}
//           >
//             Transforming businesses with scalable, innovative, and tailored solutions that push the boundaries of what's possible in the digital age.
//           </p>

//           {/* Modern Scroll Button */}
//           <div 
//             className="flex justify-center"
//             style={{ animation: 'fadeInUp 1s ease-out 0.8s both' }}
//           >
//             <button
//               onClick={handleScrollDown}
//               className="relative flex flex-col items-center justify-center w-16 h-16 mt-10 transition-all duration-500 border-2 rounded-full group border-white/30 backdrop-blur-md hover:border-pink-400/60 hover:scale-110 hover:shadow-2xl hover:shadow-pink-500/25"
//               style={{
//                 background: 'rgba(255, 255, 255, 0.05)',
//                 animation: 'scrollPulse 2s ease-in-out infinite'
//               }}
//             >
//               {/* Scroll Icon */}
//               <div className="relative">
//                 {/* Mouse */}
//                 <div className="relative w-6 h-10 transition-colors duration-300 border-2 rounded-full border-white/60 group-hover:border-pink-400">
//                   {/* Scroll Wheel */}
//                   <div 
//                     className="absolute w-1 h-3 transition-all duration-300 transform -translate-x-1/2 rounded-full bg-white/80 left-1/2 top-2 group-hover:bg-pink-400"
//                     style={{ animation: 'scrollWheel 2s ease-in-out infinite' }}
//                   />
//                 </div>
                
//                 {/* Arrow */}
//                 <div className="absolute transform -translate-x-1/2 -bottom-2 left-1/2">
//                   <div 
//                     className="w-0 h-0 transition-colors duration-300 border-t-4 border-l-2 border-r-2 border-transparent border-t-white/60 group-hover:border-t-pink-400"
//                     style={{ animation: 'arrowBounce 2s ease-in-out infinite' }}
//                   />
//                 </div>
//               </div>
              
//               {/* Ripple Effect */}
//               <div 
//                 className="absolute inset-0 transition-all duration-300 border-2 rounded-full border-white/20 group-hover:border-pink-400/40"
//                 style={{ animation: 'ripple 3s ease-in-out infinite' }}
//               />
//             </button>
//           </div>
          
//           {/* Scroll Text */}
//           <p 
//             className="mt-4 text-sm font-medium tracking-widest uppercase transition-colors duration-300 text-white/60 group-hover:text-pink-400"
//             style={{ animation: 'fadeInUp 1s ease-out 1s both' }}
//           >
//             Scroll to explore
//           </p>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes particleFloat {
//           0% {
//             transform: translateY(100vh) translateX(0px) rotate(0deg) scale(0);
//             opacity: 0;
//           }
//           5% {
//             opacity: 1;
//             transform: translateY(95vh) translateX(5px) rotate(18deg) scale(1);
//           }
//           25% {
//             opacity: 0.8;
//             transform: translateY(75vh) translateX(15px) rotate(90deg) scale(1);
//           }
//           50% {
//             opacity: 1;
//             transform: translateY(50vh) translateX(25px) rotate(180deg) scale(1);
//           }
//           75% {
//             opacity: 0.6;
//             transform: translateY(25vh) translateX(35px) rotate(270deg) scale(1);
//           }
//           95% {
//             opacity: 1;
//             transform: translateY(5vh) translateX(45px) rotate(340deg) scale(1);
//           }
//           100% {
//             transform: translateY(-10vh) translateX(50px) rotate(360deg) scale(0);
//             opacity: 0;
//           }
//         }

//         @keyframes textGlow {
//           0% {
//             filter: drop-shadow(0 0 10px rgba(236, 72, 153, 0.4));
//           }
//           100% {
//             filter: drop-shadow(0 0 25px rgba(139, 92, 246, 0.6));
//           }
//         }

//         @keyframes headingFloat {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-8px); }
//         }

//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes scrollPulse {
//           0%, 100% {
//             transform: scale(1);
//             box-shadow: 0 0 20px rgba(236, 72, 153, 0.2);
//           }
//           50% {
//             transform: scale(1.05);
//             box-shadow: 0 0 30px rgba(236, 72, 153, 0.4);
//           }
//         }

//         @keyframes scrollWheel {
//           0%, 100% {
//             transform: translateX(-50%) translateY(0);
//             opacity: 1;
//           }
//           50% {
//             transform: translateX(-50%) translateY(8px);
//             opacity: 0.5;
//           }
//         }

//         @keyframes arrowBounce {
//           0%, 100% {
//             transform: translateX(-50%) translateY(0);
//           }
//           50% {
//             transform: translateX(-50%) translateY(4px);
//           }
//         }

//         @keyframes ripple {
//           0% {
//             transform: scale(1);
//             opacity: 0.3;
//           }
//           50% {
//             transform: scale(1.2);
//             opacity: 0.1;
//           }
//           100% {
//             transform: scale(1.4);
//             opacity: 0;
//           }
//         }

//         @media (max-width: 768px) {
//           .particle:nth-child(n+16) {
//             display: none;
//           }
//         }

//         @media (prefers-reduced-motion: reduce) {
//           * {
//             animation: none !important;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// // Helper functions for particle styling
// const getParticleBackground = (color) => {
//   const gradients = {
//     white: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.3) 100%)',
//     pink: 'radial-gradient(circle, #ec4899 0%, rgba(236,72,153,0.3) 100%)',
//     purple: 'radial-gradient(circle, #8b5cf6 0%, rgba(139,92,246,0.3) 100%)',
//     cyan: 'radial-gradient(circle, #06b6d4 0%, rgba(6,182,212,0.3) 100%)',
//     blue: 'radial-gradient(circle, #3b82f6 0%, rgba(59,130,246,0.3) 100%)'
//   };
//   return gradients[color] || gradients.white;
// };

// const getParticleGlow = (color) => {
//   const glows = {
//     white: '0 0 8px rgba(255,255,255,0.4)',
//     pink: '0 0 15px rgba(236,72,153,0.6)',
//     purple: '0 0 12px rgba(139,92,246,0.5)',
//     cyan: '0 0 10px rgba(6,182,212,0.4)',
//     blue: '0 0 8px rgba(59,130,246,0.4)'
//   };
//   return glows[color] || glows.white;
// };

// export default Hero;



// import React, { useState } from 'react';
// import logo from '../Assets/logo.png'; // Replace with your logo path

// const LogoCircle = () => {
//   const [hoveredLogo, setHoveredLogo] = useState(null);
  
//   const logos = [
//     { name: 'Adobe', content: 'Web Development', description: 'Web Development', bgColor: 'from-red-500 to-red-700', shadowColor: 'shadow-red-500/30' },
//     { name: 'Reddit', content: 'App Development', description: 'App Development', bgColor: 'from-orange-400 to-orange-600', shadowColor: 'shadow-orange-500/30' },
//     { name: 'Coinbase', content: 'Logo Design', description: 'Logo Design', bgColor: 'from-blue-500 to-blue-700', shadowColor: 'shadow-blue-500/30' },
//     { name: 'Patreon', content: 'Cloud Solutions', description: 'Cloud Solutions', bgColor: 'from-purple-400 to-purple-600', shadowColor: 'shadow-purple-500/30' },
//     { name: 'YouTube', content: 'Database Design', description: 'Database Design', bgColor: 'from-red-500 to-pink-600', shadowColor: 'shadow-red-500/30' },
//     { name: 'Facebook', content: 'Cybersecurity', description: 'Cybersecurity', bgColor: 'from-blue-600 to-indigo-700', shadowColor: 'shadow-blue-500/30' },
//     { name: 'Terminal', content: 'API Development', description: 'API Development', bgColor: 'from-emerald-500 to-teal-600', shadowColor: 'shadow-emerald-500/30' }
//   ];

//   const rotateAnimation = {
//     animation: 'rotate 80s linear infinite'
//   };

//   const pulseAnimation = (index) => ({
//     animation: `pulse 6s ease-in-out infinite, float 4s ease-in-out infinite`,
//     animationDelay: `${index * 0.8}s, ${index * 0.3}s`
//   });

//   return (
//     <>
//       <style jsx>{`
//         @keyframes rotate {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
        
//         @keyframes pulse {
//           0%, 100% { transform: scale(1); opacity: 1; }
//           50% { transform: scale(1.1); opacity: 0.9; }
//         }
        
//         @keyframes float {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-8px); }
//         }
        
//         @keyframes glow {
//           0%, 100% { filter: brightness(1) drop-shadow(0 0 20px rgba(255,255,255,0.3)); }
//           50% { filter: brightness(1.2) drop-shadow(0 0 30px rgba(255,255,255,0.6)); }
//         }
        
//         @keyframes shimmer {
//           0% { background-position: -200% 0; }
//           100% { background-position: 200% 0; }
//         }
        
//         .shimmer-effect {
//           background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
//           background-size: 200% 100%;
//           animation: shimmer 3s ease-in-out infinite;
//         }
//       `}</style>
      
//       <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
//         {/* Animated background particles */}
//         <div className="absolute inset-0">
//           {[...Array(50)].map((_, i) => (
//             <div
//               key={i}
//               className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-pulse"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//                 animationDelay: `${Math.random() * 5}s`,
//                 animationDuration: `${2 + Math.random() * 3}s`
//               }}
//             />
//           ))}
//         </div>

//         <div className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px]">
//           {/* Outer glow ring */}
//           <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20 blur-xl animate-pulse"></div>
          
//           {/* Main background circle with glassmorphism */}
//           <div className="absolute overflow-hidden border rounded-full shadow-2xl inset-4 bg-white/10 backdrop-blur-lg border-white/20">
//             <div className="absolute inset-0 rounded-full shimmer-effect"></div>
//           </div>
          
//           {/* Center logo container */}
//           <div 
//             className="absolute z-20 flex items-center justify-center w-24 h-24 transform -translate-x-1/2 -translate-y-1/2 border-4 rounded-full shadow-2xl md:w-28 md:h-28 lg:w-32 lg:h-32 top-1/2 left-1/2 bg-gradient-to-br from-white via-gray-50 to-gray-100 border-white/50 backdrop-blur-sm"
//             style={{
//               animation: 'glow 4s ease-in-out infinite'
//             }}
//           >
//             <div className="flex flex-col items-center justify-center text-center">
//               <img 
//                 src={logo} 
//                 alt="Logo" 
//                 className="mt-5"
//                 style={{ animation: 'pulse 3s ease-in-out infinite' }}
//               />
//               <span className="mt-2 text-lg font-semibold text-white">Corelleaf</span>
//             </div>
//           </div>
          
//           {/* Rotating logos container */}
//           <div className="absolute inset-0 z-10" style={rotateAnimation}>
//             {logos.map((logo, index) => {
//               const angle = (360 / logos.length) * index;
//               const radius = window.innerWidth < 768 ? 140 : window.innerWidth < 1024 ? 160 : 180;
              
//               return (
//                 <div
//                   key={logo.name}
//                   className="absolute w-14 h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 top-1/2 left-1/2"
//                   style={{
//                     transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius}px) rotate(-${angle}deg)`
//                   }}
//                   onMouseEnter={() => setHoveredLogo(index)}
//                   onMouseLeave={() => setHoveredLogo(null)}
//                 >
//                   <div 
//                     className={`relative w-full h-full bg-gradient-to-br ${logo.bgColor} rounded-full
//                               flex items-center justify-center
//                               shadow-xl ${logo.shadowColor} hover:shadow-2xl hover:${logo.shadowColor}
//                               transition-all duration-500 ease-in-out
//                               cursor-pointer border-2 border-white/30 hover:border-white/50
//                               backdrop-blur-sm overflow-hidden group`}
//                     style={pulseAnimation(index)}
//                   >
//                     {/* Hover shimmer effect */}
//                     <div className="absolute inset-0 transition-all duration-1000 transform -translate-x-full opacity-0 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:opacity-100 group-hover:translate-x-full"></div>
                    
//                     <span className="relative z-10 text-xl transition-transform duration-300 transform md:text-2xl lg:text-3xl group-hover:scale-110">
//                       {logo.content}
//                     </span>
                    
//                     {/* Tooltip */}
//                     {hoveredLogo === index && (
//                       <div className="absolute z-30 px-3 py-1 text-xs text-white transform -translate-x-1/2 border rounded-full -top-12 left-1/2 bg-black/80 whitespace-nowrap backdrop-blur-sm border-white/20">
//                         {logo.description}
//                         <div className="absolute w-0 h-0 transform -translate-x-1/2 border-t-4 border-l-4 border-r-4 border-transparent top-full left-1/2 border-t-black/80"></div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
          
//           {/* Central pulse rings */}
//           <div className="absolute z-0 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
//             {[...Array(3)].map((_, i) => (
//               <div
//                 key={i}
//                 className="absolute border rounded-full border-white/10"
//                 style={{
//                   width: `${120 + i * 40}px`,
//                   height: `${120 + i * 40}px`,
//                   left: `${-(60 + i * 20)}px`,
//                   top: `${-(60 + i * 20)}px`,
//                   animation: `pulse ${3 + i}s ease-in-out infinite`,
//                   animationDelay: `${i * 0.5}s`
//                 }}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default LogoCircle;











import React, { useState, useEffect, useRef, useMemo } from 'react';
import logo from '../Assets/logo.png'; // Replace with your logo path

const LogoCircle = () => {
  const [hoveredLogo, setHoveredLogo] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState(null);
  const containerRef = useRef(null);

  // Configuration object for easy customization
  const config = {
    animation: {
      rotation: { duration: 120, easing: 'linear' },
      pulse: { duration: 4, delay: 0.8 },
      float: { duration: 6, delay: 0.3 },
      glow: { duration: 5 }
    },
    layout: {
      baseRadius: { sm: 120, md: 160, lg: 200 },
      centerSize: { sm: 80, md: 100, lg: 120 },
      itemSize: { sm: 56, md: 72, lg: 84 }
    },
    particles: { count: 75, minSize: 1, maxSize: 3 }
  };

  // SVG Icon Components
  const IconComponents = {
    Globe: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm6.6 5.8c-.3-.8-.7-1.5-1.2-2.1-.5.5-1.3 1.1-2.4 1.6-.3-.9-.7-1.7-1.1-2.4 1.5.4 2.9 1.2 4.1 2.3.2.2.4.4.6.6zm-9.5-1.3c-.4.7-.8 1.5-1.1 2.4-1.1-.5-1.9-1.1-2.4-1.6-.5.6-.9 1.3-1.2 2.1.7-.4 1.5-.7 2.3-.9.5-.5 1.1-1 1.8-1.4.2-.2.4-.4.6-.6zm-3.7 4.5h2.5c-.1.7-.1 1.3-.1 2s0 1.3.1 2H5.4c-.2-.6-.4-1.3-.4-2s.2-1.4.4-2zm4.2 0h3c0 .7 0 1.3 0 2s0 1.3 0 2h-3c0-.7 0-1.3 0-2s0-1.3 0-2zm5 0h2.5c.2.6.4 1.3.4 2s-.2 1.4-.4 2H14.6c.1-.7.1-1.3.1-2s0-1.3-.1-2z"/>
      </svg>
    ),
    Smartphone: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M7 2C6.45 2 6 2.45 6 3v18c0 .55.45 1 1 1h10c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1H7zm5 19c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm4-3H8V4h8v14z"/>
      </svg>
    ),
    Palette: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10c1.38 0 2.5-.56 2.5-1.25 0-.34-.13-.68-.37-.93-.24-.24-.38-.58-.38-.93 0-.69.56-1.25 1.25-1.25H16c3.31 0 6-2.69 6-6 0-4.96-4.49-9-10-9zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 8 6.5 8s1.5.67 1.5 1.5S7.33 11 6.5 11zm3-4C8.67 7 8 6.33 8 5.5S8.67 4 9.5 4s1.5.67 1.5 1.5S10.33 7 9.5 7zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 4 14.5 4s1.5.67 1.5 1.5S15.33 7 14.5 7zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 8 17.5 8s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
      </svg>
    ),
    Cloud: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M19.36 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.64-4.96z"/>
      </svg>
    ),
    Database: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 3C7.58 3 4 4.79 4 7s3.58 4 8 4 8-1.79 8-4-3.58-4-8-4z"/>
        <path d="M4 9v3c0 2.21 3.58 4 8 4s8-1.79 8-4V9c0 2.21-3.58 4-8 4s-8-1.79-8-4z"/>
        <path d="M4 16v3c0 2.21 3.58 4 8 4s8-1.79 8-4v-3c0 2.21-3.58 4-8 4s-8-1.79-8-4z"/>
      </svg>
    ),
    Shield: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11C15.4,11 16,11.4 16,12V16C16,16.6 15.6,17 15,17H9C8.4,17 8,16.6 8,16V12C8,11.4 8.4,11 9,11V10C9,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.2,9.2 10.2,10V11H13.8V10C13.8,9.2 12.8,8.2 12,8.2Z"/>
      </svg>
    ),
    Zap: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M13 0L8.5 8H16L11 24L15.5 16H8L13 0Z"/>
      </svg>
    ),
    Bot: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        <circle cx="15.5" cy="9.5" r="1.5"/>
        <circle cx="8.5" cy="9.5" r="1.5"/>
        <path d="M12 17.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
      </svg>
    ),
    Leaf: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
        <path d="M17.8 5.2c-.3-.2-.6-.2-.9-.2-3.8 0-7.4 1.5-10.2 4.3C4.4 11.6 3.2 15 3.2 18.7c0 .3.1.6.3.8.2.2.5.3.8.3 3.7 0 7.1-1.2 9.4-3.5 2.8-2.8 4.3-6.4 4.3-10.2 0-.3-.1-.6-.2-.9zm-6.1 10.7c-1.8 1.8-4.2 2.8-6.7 3.1.3-2.5 1.3-4.9 3.1-6.7 2.2-2.2 5.1-3.4 8.2-3.4-.1 3.1-1.3 6-4.6 7z"/>
      </svg>
    )
  };

  const services = [
    { 
      id: 'web-dev',
      name: 'Web Development', 
      icon: IconComponents.Globe,
      bgColor: 'from-emerald-400 via-teal-500 to-cyan-600',
      shadowColor: 'shadow-emerald-400/40',
      description: 'Modern web applications with cutting-edge technologies',
      details: 'React, Vue, Angular, Next.js'
    },
    { 
      id: 'app-dev',
      name: 'App Development', 
      icon: IconComponents.Smartphone,
      bgColor: 'from-purple-400 via-violet-500 to-indigo-600',
      shadowColor: 'shadow-purple-400/40',
      description: 'Native and cross-platform mobile applications',
      details: 'React Native, Flutter, Swift, Kotlin'
    },
    { 
      id: 'ui-ux',
      name: 'UI/UX Design', 
      icon: IconComponents.Palette,
      bgColor: 'from-pink-400 via-rose-500 to-red-600',
      shadowColor: 'shadow-pink-400/40',
      description: 'User-centered design solutions',
      details: 'Figma, Adobe Creative Suite'
    },
    { 
      id: 'cloud',
      name: 'Cloud Solutions', 
      icon: IconComponents.Cloud,
      bgColor: 'from-blue-400 via-sky-500 to-cyan-600',
      shadowColor: 'shadow-blue-400/40',
      description: 'Scalable cloud infrastructure and services',
      details: 'AWS, Azure, Google Cloud'
    },
    { 
      id: 'database',
      name: 'Database Design', 
      icon: IconComponents.Database,
      bgColor: 'from-orange-400 via-amber-500 to-yellow-600',
      shadowColor: 'shadow-orange-400/40',
      description: 'Optimized data storage and management',
      details: 'PostgreSQL, MongoDB, Redis'
    },
    { 
      id: 'security',
      name: 'Cybersecurity', 
      icon: IconComponents.Shield,
      bgColor: 'from-red-400 via-rose-500 to-pink-600',
      shadowColor: 'shadow-red-400/40',
      description: 'Advanced security solutions and audits',
      details: 'Penetration Testing, Security Architecture'
    },
    { 
      id: 'api',
      name: 'API Development', 
      icon: IconComponents.Zap,
      bgColor: 'from-green-400 via-emerald-500 to-teal-600',
      shadowColor: 'shadow-green-400/40',
      description: 'RESTful and GraphQL API development',
      details: 'Node.js, Python, Microservices'
    },
    { 
      id: 'ai-ml',
      name: 'AI & ML', 
      icon: IconComponents.Bot,
      bgColor: 'from-violet-400 via-purple-500 to-indigo-600',
      shadowColor: 'shadow-violet-400/40',
      description: 'Artificial Intelligence and Machine Learning solutions',
      details: 'TensorFlow, PyTorch, NLP'
    }
  ];

  // Handle responsive dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (typeof window !== 'undefined') {
        setDimensions({ width: window.innerWidth, height: window.innerHeight });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    setIsVisible(true);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Calculate responsive values
  const responsiveValues = useMemo(() => {
    const { width } = dimensions;
    if (width < 768) {
      return {
        radius: config.layout.baseRadius.sm,
        centerSize: config.layout.centerSize.sm,
        itemSize: config.layout.itemSize.sm,
        fontSize: 'text-lg',
        centerText: 'text-base'
      };
    } else if (width < 1024) {
      return {
        radius: config.layout.baseRadius.md,
        centerSize: config.layout.centerSize.md,
        itemSize: config.layout.itemSize.md,
        fontSize: 'text-xl',
        centerText: 'text-lg'
      };
    }
    return {
      radius: config.layout.baseRadius.md,
      centerSize: config.layout.centerSize.lg,
      itemSize: config.layout.itemSize.lg,
      fontSize: 'text-2xl',
      centerText: 'text-xl'
    };
  }, [dimensions, config]);

  // Generate background particles
  const particles = useMemo(() => {
    return Array.from({ length: config.particles.count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: config.particles.minSize + Math.random() * (config.particles.maxSize - config.particles.minSize),
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
      opacity: 0.1 + Math.random() * 0.3
    }));
  }, [config.particles]);

  const handleServiceClick = (service, index) => {
    setActiveService(activeService === index ? null : index);
  };

  // CSS styles as a string
  const cssStyles = `
    @keyframes rotate {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    @keyframes counterRotate {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(-360deg); }
    }
    
    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.05); opacity: 0.9; }
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      33% { transform: translateY(-12px) rotate(1deg); }
      66% { transform: translateY(6px) rotate(-1deg); }
    }
    
    @keyframes glow {
      0%, 100% { 
        filter: brightness(1) drop-shadow(0 0 20px rgba(255,255,255,0.3));
        box-shadow: 0 0 30px rgba(255,255,255,0.1);
      }
      50% { 
        filter: brightness(1.3) drop-shadow(0 0 40px rgba(255,255,255,0.6));
        box-shadow: 0 0 60px rgba(255,255,255,0.2);
      }
    }
    
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    
    @keyframes ripple {
      0% { transform: scale(0.8); opacity: 1; }
      100% { transform: scale(2.4); opacity: 0; }
    }
    
    @keyframes fadeInUp {
      0% { opacity: 0; transform: translateY(30px); }
      100% { opacity: 1; transform: translateY(0); }
    }

    @keyframes flipUp {
      0% { transform: translateY(0); }
      100% { transform: translateY(-100%); }
    }

    @keyframes flipDown {
      0% { transform: translateY(100%); }
      100% { transform: translateY(0); }
    }
    
    .rotate-animation {
      animation: rotate ${config.animation.rotation.duration}s ${config.animation.rotation.easing} infinite;
    }
    
    .counter-rotate {
      animation: counterRotate ${config.animation.rotation.duration}s ${config.animation.rotation.easing} infinite;
    }
    
    .shimmer-effect {
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
      background-size: 200% 100%;
      animation: shimmer 4s ease-in-out infinite;
    }
    
    .ripple-effect {
      animation: ripple 2s ease-out infinite;
    }
    
    .fade-in-up {
      animation: fadeInUp 0.8s ease-out forwards;
    }
  `;

  return (
    <div className="flex items-center justify-center flex-1" id='hero'>
      {/* Inject CSS styles */}
      <style dangerouslySetInnerHTML={{ __html: cssStyles }} />
      
      {/* Main container */}
      <div 
        className="relative"
        style={{
          width: `${responsiveValues.radius * 2 + responsiveValues.centerSize + 60}px`,
          height: `${responsiveValues.radius * 2 + responsiveValues.centerSize + 60}px`
        }}
      >
        {/* Multi-layered glow rings */}
        <div className="absolute inset-0">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-pulse"
              style={{
                inset: `${i * 8}px`,
                background: `radial-gradient(circle, rgba(147, 51, 234, ${0.1 - i * 0.02}) 0%, transparent 70%)`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${4 + i}s`
              }}
            />
          ))}
        </div>
        
        {/* Main glassmorphism background */}
        <div className="absolute border rounded-full shadow-2xl inset-8 bg-white/5 backdrop-blur-xl border-white/10">
          <div className="absolute inset-0 rounded-full shimmer-effect" />
          {/* Ripple effects */}
          <div className="absolute inset-0 rounded-full">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute inset-0 border rounded-full border-white/20 ripple-effect"
                style={{ animationDelay: `${i * 0.7}s` }}
              />
            ))}
          </div>
        </div>
        
        {/* Center logo container */}
        <div 
          className={`absolute z-30 flex flex-col items-center justify-center transform -translate-x-1/2 -translate-y-1/2 
                     border-4 rounded-full shadow-2xl top-1/2 left-1/2 
                     bg-gradient-to-br from-white/90 via-gray-50/80 to-gray-100/90 
                     border-white/30 backdrop-blur-md hover:border-white/50 
                     transition-all duration-500 cursor-pointer group`}
          style={{
            width: `${responsiveValues.centerSize}px`,
            height: `${responsiveValues.centerSize}px`,
            animation: 'glow 5s ease-in-out infinite'
          }}
          role="button"
          tabIndex={0}
          aria-label="Corelleaf Logo"
        >
          <div className="flex flex-col items-center justify-center text-center">
            <img src={logo} alt="Corelleaf Logo" />
          </div>
        </div>
        
        {/* Enhanced rotating services */}
        <div className="absolute inset-0 z-20 rotate-animation">
          {services.map((service, index) => {
            const angle = (360 / services.length) * index;
            const isActive = activeService === index;
            
            return (
              <div
                key={service.id}
                className="absolute top-1/2 left-1/2"
                style={{
                  width: `${responsiveValues.itemSize}px`,
                  height: `${responsiveValues.itemSize}px`,
                  transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${responsiveValues.radius}px)`
                }}
              >
                <div 
                  className={`relative w-full h-full bg-gradient-to-br ${service.bgColor} rounded-2xl
                            flex flex-col items-center justify-center p-2
                            shadow-xl ${service.shadowColor} hover:shadow-2xl
                            transition-all duration-500 ease-out cursor-pointer
                            border-2 border-white/20 hover:border-white/40
                            backdrop-blur-sm overflow-hidden group counter-rotate
                            ${isActive ? 'scale-110 z-40' : 'hover:scale-105'}
                            ${hoveredLogo === index ? 'brightness-110' : ''}`}
                  style={{
                    animation: `pulse ${config.animation.pulse.duration}s ease-in-out infinite, float ${config.animation.float.duration}s ease-in-out infinite`,
                    animationDelay: `${index * config.animation.pulse.delay}s, ${index * config.animation.float.delay}s`,
                    transform: `rotate(-${angle}deg) ${isActive ? 'scale(1.1)' : ''}`
                  }}
                  onMouseEnter={() => setHoveredLogo(index)}
                  onMouseLeave={() => setHoveredLogo(null)}
                  onClick={() => handleServiceClick(service, index)}
                  role="button"
                  tabIndex={0}
                  aria-label={`${service.name} service`}
                >
                  {/* Hover shimmer effect */}
                  <div className="absolute inset-0 transition-all duration-700 transform -translate-x-full opacity-0 bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:opacity-100 group-hover:translate-x-full" />
                  
                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="mb-1 text-white transition-all duration-300 filter drop-shadow-sm group-hover:scale-110 group-hover:text-yellow-200">
                      <service.icon />
                    </div>
                    <span className="text-xs font-semibold leading-tight text-white transition-colors duration-300 group-hover:text-yellow-200">
                      {service.name.split(' ').map((word, i) => (
                        <span key={i} className="block">{word}</span>
                      ))}
                    </span>
                  </div>
                  
                  {/* Enhanced tooltip */}
                  {hoveredLogo === index && (
                    <div className="absolute z-50 px-4 py-3 text-sm text-white transform -translate-x-1/2 border shadow-2xl rounded-xl -top-20 left-1/2 bg-gray-900/95 backdrop-blur-md border-white/20 fade-in-up min-w-48">
                      <div className="mb-1 font-semibold">{service.description}</div>
                      <div className="text-xs text-gray-300">{service.details}</div>
                      <div className="absolute w-0 h-0 transform -translate-x-1/2 border-t-4 border-l-4 border-r-4 border-transparent top-full left-1/2 border-t-gray-900/95" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Central pulse rings */}
        <div className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute border rounded-full border-white/5"
              style={{
                width: `${responsiveValues.centerSize + i * 30}px`,
                height: `${responsiveValues.centerSize + i * 30}px`,
                left: `${-(responsiveValues.centerSize/2 + i * 15)}px`,
                top: `${-(responsiveValues.centerSize/2 + i * 15)}px`,
                animation: `pulse ${4 + i * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Service details panel */}
      {activeService !== null && (
        <div className="absolute z-40 transform -translate-x-1/2 bottom-8 left-1/2 fade-in-up">
          <div className="px-6 py-4 border shadow-2xl bg-white/10 backdrop-blur-lg border-white/20 rounded-2xl">
            <h3 className="mb-2 text-xl font-bold text-white">{services[activeService].name}</h3>
            <p className="mb-2 text-sm text-gray-200">{services[activeService].description}</p>
            <p className="text-xs text-gray-300">{services[activeService].details}</p>
          </div>
        </div>
      )}
    </div>
  );
};

// RevealText Component with smaller text and quote
const RevealText = () => {
  return (
    <section className="flex flex-col items-center justify-center flex-1 gap-6 px-8 py-24 text-white sm:gap-8 md:gap-10 sm:mt-0">
      <div className="space-y-4 text-center sm:space-y-6 md:space-y-8">
        <FlipText>Scalable</FlipText>
        <FlipText>Software</FlipText>
        <FlipText>Solution</FlipText>
      </div>
      <blockquote className="max-w-md mx-auto mt-8 text-sm italic text-center text-white/70 sm:text-base md:text-lg">
        Transforming businesses with scalable, innovative, and tailored solutions that push the boundaries of what's possible in the digital age.
      </blockquote>
    </section>
  );
};




const FlipText = ({ children }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative block overflow-hidden text-3xl font-black uppercase cursor-default whitespace-nowrap sm:text-5xl md:text-6xl lg:text-7xl"
      style={{ lineHeight: 0.75 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Layer */}
      <div className="flex">
        {children.split("").map((letter, i) => (
          <span
            key={i}
            className={`inline-block transition-transform duration-300 ease-in-out ${
              isHovered ? 'transform -translate-y-full' : ''
            }`}
            style={{
              transitionDelay: `${i * 25}ms`
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </div>
    </div>
  );
};

// Main Hero Component
const HeroSection = () => {
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateDimensions = () => {
      if (typeof window !== 'undefined') {
        setDimensions({ width: window.innerWidth, height: window.innerHeight });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    setIsVisible(true);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Generate background particles for the entire hero section
  const particles = useMemo(() => {
    return Array.from({ length: 100 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 1 + Math.random() * 3,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
      opacity: 0.1 + Math.random() * 0.3
    }));
  }, []);

const containerClasses = `
    relative min-h-screen overflow-hidden pt-20 sm:pt-24 md:pt-28 lg:pt-10 
    bg-gradient-to-br from-slate-900 via-purple-900 via-indigo-900 to-slate-900
    transition-all duration-1000 ease-out
    ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
  `;



  return (
    <div className={containerClasses}>
      {/* Dynamic background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`
            }}
          />
        ))}
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-10"
            style={{
              left: `${5 + i * 8}%`,
              top: `${10 + (i % 4) * 20}%`,
              animation: `float ${8 + i * 1.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.8}s`
            }}
          >
            <div className={`w-12 h-12 ${i % 3 === 0 ? 'rounded-full' : i % 3 === 1 ? 'rounded-lg rotate-45' : 'rounded-sm rotate-12'} bg-gradient-to-r ${
              i % 4 === 0 ? 'from-purple-400 to-blue-400' :
              i % 4 === 1 ? 'from-pink-400 to-purple-400' :
              i % 4 === 2 ? 'from-blue-400 to-cyan-400' :
              'from-green-400 to-teal-400'
            }`} />
          </div>
        ))}
      </div>

      {/* Main content container */}
      <div className="relative z-10 flex flex-col min-h-screen lg:flex-row">
        {/* Left side - RevealText */}
        

        {/* Right side - LogoCircle */}
        <div className="flex items-center justify-center flex-1 lg:justify-end lg:pr-12">
          <LogoCircle />
        </div>
        <div className="flex items-center justify-center flex-1 lg:justify-start lg:pl-12 md:pt-[0px !important] md:mt-[0px !important]">
          <RevealText />
        </div>
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none bg-gradient-to-t from-slate-900/80 to-transparent" />
    </div>
  );
};

export default HeroSection;
