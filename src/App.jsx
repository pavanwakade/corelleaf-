import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import SplashCursor from './components/Effects/SplashCursor.jsx';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Team from './components/Team';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ViewOpenPositions from './components/ViewOpenPositions';
import ScrollVelocity from './components/Effects/ScrollVelocity.jsx';
import Preloader from './components/Preloader';


// Advanced Preloader Component

const row1Images = [
  { src: './src/Assets/Logos/1.png', alt: 'Image 1' },
  { src: './src/Assets/Logos/2.png', alt: 'Image 2' },
  { src: './src/Assets/Logos/3.png', alt: 'Image 3' },
  { src: './src/Assets/Logos/4.png', alt: 'Image 4' },
  { src: './src/Assets/Logos/5.png', alt: 'Image 5' }
];

const row2Images = [
  { src: './src/Assets/Logos/5.png', alt: 'Image 5' },
  { src: './src/Assets/Logos/4.png', alt: 'Image 4' },
  { src: './src/Assets/Logos/3.png', alt: 'Image 3' },
  { src: './src/Assets/Logos/2.png', alt: 'Image 2' },
  { src: './src/Assets/Logos/1.png', alt: 'Image 1' },
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
      <div className="min-h-screen overflow-x-hidden bg-white">
        {/* Global cursor effect */}
        <SplashCursor />

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


                  <ScrollVelocity
                    images={[row1Images, row2Images]}  // Array of arrays - auto alternates direction
                    velocity={60}
                    imageWidth={300}
                    imageHeight={170}
                    gap={30}
                    numCopies={6}
                  />
                  <Portfolio />
                  <Team />
                  <Testimonials />
                  <Contact />
                  <Footer />
                </>
              }
            />
            <Route path="/ViewOpenPositions" element={<><ViewOpenPositions /></>} />
          </Routes>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;