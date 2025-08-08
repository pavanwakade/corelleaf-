import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
// import SplashCursor from './components/Effects/SplashCursor.jsx';
import About from "./components/About";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";

// import Team from './components/Team';
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ViewOpenPositions from "./components/ViewOpenPositions";
import ScrollVelocity from "./components/Effects/ScrollVelocity.jsx";
import Preloader from "./components/Effects/Preloader.jsx";

import LoadingPage from "./components/Pages/LoadingPage";
import ErrorPage from "./components/Pages/ErrorPage";
import NetworkErrorPage from "./components/Pages/NetworkErrorPage";

// logos
import img1 from "./Assets/Logos/1.png"
import img2 from "./Assets/Logos/2.png"
import img3 from "./Assets/Logos/3.png"
import img4 from "./Assets/Logos/4.png"
import img5 from "./Assets/Logos/5.png"





// Advanced Preloader Component

const row1Images = [
  { src: img1, alt: "Image 1" },
  { src: img2, alt: "Image 2" },
  { src: img3, alt: "Image 3" },
  { src: img4, alt: "Image 4" },
  { src: img5, alt: "Image 5" },
];

const row2Images = [
  { src: img5, alt: "Image 5" },
  { src: img4, alt: "Image 4" },
  { src: img3, alt: "Image 3" },
  { src: img2, alt: "Image 2" },
  { src: img1, alt: "Image 1" },
];
function App() {
  const [loading, setLoading] = useState(true);

  // Handle preloader completion
  const handlePreloaderComplete = () => {
    setLoading(false);
  };
  // Define your image arrays for each row

  return (
    <BrowserRouter>
      <div>
        {/* Global cursor effect */}
        {/* <SplashCursor /> */}

        {loading ? (
          <Preloader onComplete={handlePreloaderComplete} />
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header />
                  <Hero />
                  <About />
                  <Services />
                  <Portfolio />

                  <ScrollVelocity
                    images={[row1Images, row2Images]} // Array of arrays - auto alternates direction
                    velocity={60}
                    imageWidth={300}
                    imageHeight={170}
                    gap={30}
                    numCopies={6}
                  />

                  {/* <Team /> */}
                  <Testimonials />
                  <Contact />
                  <Footer />
                </>
              }
            />
            <Route
              path="/ViewOpenPositions"
              element={
                <>
                  <ViewOpenPositions />
                </>
              }
            />
            <Route path="/loading" element={<LoadingPage />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="/network-error" element={<NetworkErrorPage />} />
            <Route path="*" element={<ErrorPage error="Page not found" />} />
          </Routes>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;


// import React, { useState } from "react";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Header from "./components/Header";
// import Hero from "./components/Hero";
// import About from "./components/About";
// import Services from "./components/Services";
// import Portfolio from "./components/Portfolio";
// import Testimonials from "./components/Testimonials";
// import Contact from "./components/Contact";
// import Footer from "./components/Footer";
// import ViewOpenPositions from "./components/ViewOpenPositions";
// import ScrollVelocity from "./components/Effects/ScrollVelocity.jsx";
// import Preloader from "./components/Effects/Preloader.jsx";

// import LoadingPage from "./components/Pages/LoadingPage";
// import ErrorPage from "./components/Pages/ErrorPage";
// import NetworkErrorPage from "./components/Pages/NetworkErrorPage";


// // imges

// import img1 from "./assets/logos/1.png"

// // Image arrays with corrected paths (assuming assets moved to public/assets/)
// const row1Images = [
//   // { src: "/assets/logos/1.png", alt: "Image 1" },
//   {img1},
//   { src: "/assets/logos/2.png", alt: "Image 2" },
//   { src: "/assets/logos/3.png", alt: "Image 3" },
//   { src: "/assets/logos/4.png", alt: "Image 4" },
//   { src: "/assets/logos/5.png", alt: "Image 5" },
// ];

// const row2Images = [
//   { src: "/assets/logos/5.png", alt: "Image 5" },
//   { src: "/assets/logos/4.png", alt: "Image 4" },
//   { src: "/assets/logos/3.png", alt: "Image 3" },
//   { src: "/assets/logos/2.png", alt: "Image 2" },
//   { src: "/assets/logos/1.png", alt: "Image 1" },
// ];

// function App() {
//   const [loading, setLoading] = useState(true);

//   // Handle preloader completion
//   const handlePreloaderComplete = () => {
//     setLoading(false);
//   };

//   return (
//     <BrowserRouter>
//       <div>
//         {loading ? (
//           <Preloader onComplete={handlePreloaderComplete} />
//         ) : (
//           <Routes>
//             <Route
//               path="/"
//               element={
//                 <>
//                   <Header />
//                   <Hero />
//                   <About />
//                   <Services />
//                   <Portfolio />

//                   <ScrollVelocity
//                     images={[row1Images, row2Images]}
//                     velocity={60}
//                     imageWidth={300}
//                     imageHeight={170}
//                     gap={30}
//                     numCopies={6}
//                   />

//                   <Testimonials />
//                   <Contact />
//                   <Footer />
//                 </>
//               }
//             />
//             <Route path="/ViewOpenPositions" element={<ViewOpenPositions />} />
//             <Route path="/loading" element={<LoadingPage />} />
//             <Route path="/error" element={<ErrorPage />} />
//             <Route path="/network-error" element={<NetworkErrorPage />} />
//             <Route path="*" element={<ErrorPage error="Page not found" />} />
//           </Routes>
//         )}
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;