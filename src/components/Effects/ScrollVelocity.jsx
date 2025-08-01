import React, { useRef, useEffect, useState } from 'react';

// Hook to calculate the width of an element
function useElementWidth(ref) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    };
    
    // Set initial width
    updateWidth();
    
    // Update width on window resize
    window.addEventListener('resize', updateWidth);
    
    // Cleanup event listener
    return () => window.removeEventListener('resize', updateWidth);
  }, [ref]);

  return width;
}

// Hook to get responsive dimensions based on viewport width
function useResponsiveDimensions() {
  const [dimensions, setDimensions] = useState({
    imageWidth: 300,
    imageHeight: 200,
    gap: 20,
    logoPadding: 20,
    numCopies: 8,
    borderRadius: '12px',
    sectionMargin: '2rem 0',
    sectionTransform: 'rotate(10deg)',
    rowMarginBottom: '1rem',
    containerHeightPadding: 40,
  });

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      
      if (width < 480) { // Mobile
        setDimensions({
          imageWidth: Math.min(100, width * 0.25),
          imageHeight: Math.min(60, width * 0.15),
          gap: 8,
          logoPadding: 8,
          numCopies: 15,
          borderRadius: '6px',
          sectionMargin: '0.5rem 0',
          sectionTransform: 'rotate(3deg)',
          rowMarginBottom: '0.3rem',
          containerHeightPadding: 15,
        });
      } else if (width < 768) { // Small tablet
        setDimensions({
          imageWidth: Math.min(220, width * 0.30),
          imageHeight: Math.min(145, width * 0.20),
          gap: 12,
          logoPadding: 12,
          numCopies: 10,
          borderRadius: '8px',
          sectionMargin: '1.5rem 0',
          sectionTransform: 'rotate(5deg)',
          rowMarginBottom: '0.75rem',
          containerHeightPadding: 25,
        });
      } else if (width < 1024) { // Large tablet
        setDimensions({
          imageWidth: Math.min(250, width * 0.28),
          imageHeight: Math.min(165, width * 0.18),
          gap: 15,
          logoPadding: 15,
          numCopies: 9,
          borderRadius: '10px',
          sectionMargin: '2rem 0',
          sectionTransform: 'rotate(7deg)',
          rowMarginBottom: '1rem',
          containerHeightPadding: 30,
        });
      } else { // Desktop
        setDimensions({
          imageWidth: 300,
          imageHeight: 200,
          gap: 20,
          logoPadding: 20,
          numCopies: 8,
          borderRadius: '12px',
          sectionMargin: '2rem 0',
          sectionTransform: 'rotate(10deg)',
          rowMarginBottom: '1rem',
          containerHeightPadding: 40,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return dimensions;
}

const ScrollVelocity = ({
  images = [],
  velocity = 50,
  numCopies,
  imageWidth,
  imageHeight,
  gap,
  style = {},
  logoBackground = '#ffffff',
  logoPadding
}) => {
  const responsiveDimensions = useResponsiveDimensions();
  
  // Use responsive dimensions as a fallback, allowing props to override
  const finalDimensions = {
    imageWidth: imageWidth || responsiveDimensions.imageWidth,
    imageHeight: imageHeight || responsiveDimensions.imageHeight,
    gap: gap || responsiveDimensions.gap,
    logoPadding: logoPadding || responsiveDimensions.logoPadding,
    numCopies: numCopies || responsiveDimensions.numCopies,
    ...responsiveDimensions
  };

  const ScrollRow = ({ 
    images, 
    baseVelocity, 
    ...dims
  }) => {
    const containerRef = useRef(null);
    const copyRef = useRef(null);
    const positionRef = useRef(0);
    const lastScrollY = useRef(0);
    const scrollVelocity = useRef(0);
    
    const copyWidth = useElementWidth(copyRef);

    useEffect(() => {
      let rafId;

      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        // Adjust scroll velocity based on the difference in scroll position
        scrollVelocity.current = currentScrollY - lastScrollY.current;
        lastScrollY.current = currentScrollY;
      };

      const animate = () => {
        if (containerRef.current && copyWidth > 0) {
          const deltaTime = 16; // Approximately 60 FPS
          let moveBy = baseVelocity * (deltaTime / 1000);
          
          // Add scroll-based velocity for a more dynamic effect
          moveBy += scrollVelocity.current * 0.3;

          positionRef.current += moveBy;

          // Loop the animation
          if (positionRef.current <= -copyWidth) {
            positionRef.current = 0;
          } else if (positionRef.current >= 0) {
            positionRef.current = -copyWidth;
          }

          containerRef.current.style.transform = `translateX(${positionRef.current}px)`;

          // Dampen the scroll velocity over time
          scrollVelocity.current *= 0.92;
        }

        rafId = requestAnimationFrame(animate);
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      rafId = requestAnimationFrame(animate);

      return () => {
        window.removeEventListener('scroll', handleScroll);
        if (rafId) cancelAnimationFrame(rafId);
      };
    }, [baseVelocity, copyWidth]);

    const imageSets = Array.from({ length: dims.numCopies }).map((_, i) => (
      <div
        key={i}
        ref={i === 0 ? copyRef : null}
        style={{ 
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {images.map((image, imgIndex) => (
          <div
            key={`${i}-${imgIndex}`}
            style={{
              flexShrink: 0,
              width: `${dims.imageWidth}px`,
              height: `${dims.imageHeight}px`,
              marginRight: `${dims.gap}px`,
              borderRadius: dims.borderRadius,
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              backgroundColor: logoBackground,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: `${dims.logoPadding}px`
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
            }}
          >
            <img
              src={image.src}
              alt={image.alt || `Logo ${imgIndex + 1}`}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </div>
        ))}
      </div>
    ));

    return (
      <div 
        style={{ 
          position: 'relative',
          overflow: 'hidden',
          height: `${dims.imageHeight + dims.containerHeightPadding}px`,
          ...style 
        }}
      >
        <div
          ref={containerRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            paddingLeft: `${dims.gap}px`,
            willChange: 'transform' // Performance optimization
          }}
        >
          {imageSets}
        </div>
      </div>
    );
  };

  return (
    <section style={{ 
      margin: finalDimensions.sectionMargin,
      transform: finalDimensions.sectionTransform,
      overflow: 'hidden' // Hide the corners of the rotated section
    }}>
      {Array.isArray(images[0]) ? (
        images.map((imageRow, index) => (
          <div key={index} style={{ 
            marginBottom: finalDimensions.rowMarginBottom 
          }}>
            <ScrollRow
              images={imageRow}
              baseVelocity={index % 2 === 0 ? velocity : -velocity}
              {...finalDimensions}
            />
          </div>
        ))
      ) : (
        <ScrollRow
          images={images}
          baseVelocity={velocity}
          {...finalDimensions}
        />
      )}
    </section>
  );
};

export default ScrollVelocity;


// import React, { useRef, useEffect, useState } from 'react';

// // Hook to calculate element width
// function useElementWidth(ref) {
//   const [width, setWidth] = useState(0);

//   useEffect(() => {
//     const updateWidth = () => {
//       if (ref.current) {
//         setWidth(ref.current.offsetWidth);
//       }
//     };
//     updateWidth();
//     window.addEventListener('resize', updateWidth);
//     return () => window.removeEventListener('resize', updateWidth);
//   }, [ref]);

//   return width;
// }

// // Hook to get responsive dimensions
// function useResponsiveDimensions() {
//   const [dimensions, setDimensions] = useState({
//     imageWidth: 300,
//     imageHeight: 200,
//     gap: 20,
//     logoPadding: 20,
//     numCopies: 8
//   });

//   useEffect(() => {
//     const updateDimensions = () => {
//       const width = window.innerWidth;
      
//       if (width < 480) { // Mobile
//         setDimensions({
//           imageWidth: Math.min(100, width * 0.20),
//           imageHeight: Math.min(60, width * 0.12),
//           gap: 6,
//           logoPadding: 6,
//           numCopies: 15
//         });
//       } else if (width < 768) { // Small tablet
//         setDimensions({
//           imageWidth: Math.min(220, width * 0.35),
//           imageHeight: Math.min(145, width * 0.23),
//           gap: 12,
//           logoPadding: 12,
//           numCopies: 10
//         });
//       } else if (width < 1024) { // Large tablet
//         setDimensions({
//           imageWidth: Math.min(250, width * 0.3),
//           imageHeight: Math.min(165, width * 0.2),
//           gap: 15,
//           logoPadding: 15,
//           numCopies: 9
//         });
//       } else { // Desktop
//         setDimensions({
//           imageWidth: 300,
//           imageHeight: 200,
//           gap: 20,
//           logoPadding: 20,
//           numCopies: 8
//         });
//       }
//     };

//     updateDimensions();
//     window.addEventListener('resize', updateDimensions);
//     return () => window.removeEventListener('resize', updateDimensions);
//   }, []);

//   return dimensions;
// }

// const ScrollVelocity = ({
//   images = [],
//   velocity = 50,
//   numCopies,
//   imageWidth,
//   imageHeight,
//   gap,
//   style = {},
//   logoBackground = '#ffffff',
//   logoPadding
// }) => {
//   const responsiveDimensions = useResponsiveDimensions();
  
//   // Use responsive dimensions as fallback
//   const finalDimensions = {
//     imageWidth: imageWidth || responsiveDimensions.imageWidth,
//     imageHeight: imageHeight || responsiveDimensions.imageHeight,
//     gap: gap || responsiveDimensions.gap,
//     logoPadding: logoPadding || responsiveDimensions.logoPadding,
//     numCopies: numCopies || responsiveDimensions.numCopies
//   };

//   const ScrollRow = ({ 
//     images, 
//     baseVelocity = velocity, 
//     numCopies,
//     imageWidth,
//     imageHeight,
//     gap,
//     logoBackground,
//     logoPadding
//   }) => {
//     const containerRef = useRef(null);
//     const copyRef = useRef(null);
//     const positionRef = useRef(0);
//     const lastScrollY = useRef(0);
//     const scrollVelocity = useRef(0);
    
//     const copyWidth = useElementWidth(copyRef);

//     useEffect(() => {
//       let rafId;

//       const handleScroll = () => {
//         const currentScrollY = window.scrollY;
//         scrollVelocity.current = currentScrollY - lastScrollY.current;
//         lastScrollY.current = currentScrollY;
//       };

//       const animate = () => {
//         if (containerRef.current && copyWidth > 0) {
//           const deltaTime = 16; // ~60 FPS
//           let moveBy = baseVelocity * (deltaTime / 1000);
//           moveBy += scrollVelocity.current * 0.3;

//           positionRef.current += moveBy;

//           if (positionRef.current <= -copyWidth) {
//             positionRef.current = 0;
//           } else if (positionRef.current >= 0) {
//             positionRef.current = -copyWidth;
//           }

//           containerRef.current.style.transform = `translateX(${positionRef.current}px)`;

//           scrollVelocity.current *= 0.92;
//         }

//         rafId = requestAnimationFrame(animate);
//       };

//       window.addEventListener('scroll', handleScroll, { passive: true });
//       rafId = requestAnimationFrame(animate);

//       return () => {
//         window.removeEventListener('scroll', handleScroll);
//         if (rafId) cancelAnimationFrame(rafId);
//       };
//     }, [baseVelocity, copyWidth]);

//     const imageSets = [];
//     for (let i = 0; i < numCopies; i++) {
//       const imageElements = images.map((image, imgIndex) => (
//         <div
//           key={`${i}-${imgIndex}`}
//           style={{
//             flexShrink: 0,
//             width: `${imageWidth}px`,
//             height: `${imageHeight}px`,
//             marginRight: `${gap}px`,
//             borderRadius: window.innerWidth < 480 ? '6px' : '12px',
//             boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
//             transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//             backgroundColor: logoBackground,
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             padding: `${logoPadding}px`
//           }}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.transform = 'scale(1.05)';
//             e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.transform = 'scale(1)';
//             e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
//           }}
//         >
//           <img
//             src={image.src}
//             alt={image.alt || `Logo ${imgIndex + 1}`}
//             style={{
//               maxWidth: '100%',
//               maxHeight: '100%',
//               width: 'auto',
//               height: 'auto',
//               objectFit: 'contain',
//               display: 'block',
//               transition: 'opacity 0.3s ease'
//             }}
//             onMouseEnter={(e) => {
//               e.target.style.opacity = '0.8';
//             }}
//             onMouseLeave={(e) => {
//               e.target.style.opacity = '1';
//             }}
//           />
//         </div>
//       ));

//       imageSets.push(
//         <div
//           key={i}
//           ref={i === 0 ? copyRef : null}
//           style={{ 
//             display: 'flex',
//             alignItems: 'center'
//           }}
//         >
//           {imageElements}
//         </div>
//       );
//     }

//     return (
//       <div 
//         style={{ 
//           position: 'relative',
//           overflow: 'hidden',
//           height: `${imageHeight + (window.innerWidth < 480 ? 15 : 40)}px`,
//           ...style 
//         }}
//       >
//         <div
//           ref={containerRef}
//           style={{
//             display: 'flex',
//             alignItems: 'center',
//             height: '100%',
//             paddingLeft: `${gap}px`,
//             willChange: 'transform'
//           }}
//         >
//           {imageSets}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <section style={{ 
//       margin: window.innerWidth < 480 ? '0.5rem 0' : '2rem 0',
//       transform: window.innerWidth < 480 ? 'rotate(3deg)' : 'rotate(10deg)',
//       overflow: 'hidden'
//     }}>
//       {Array.isArray(images[0]) ? (
//         images.map((imageRow, index) => (
//           <div key={index} style={{ 
//             marginBottom: window.innerWidth < 480 ? '0.3rem' : '1rem' 
//           }}>
//             <ScrollRow
//               images={imageRow}
//               baseVelocity={index % 2 === 0 ? velocity : -velocity}
//               numCopies={finalDimensions.numCopies}
//               imageWidth={finalDimensions.imageWidth}
//               imageHeight={finalDimensions.imageHeight}
//               gap={finalDimensions.gap}
//               logoBackground={logoBackground}
//               logoPadding={finalDimensions.logoPadding}
//             />
//           </div>
//         ))
//       ) : (
//         <ScrollRow
//           images={images}
//           baseVelocity={velocity}
//           numCopies={finalDimensions.numCopies}
//           imageWidth={finalDimensions.imageWidth}
//           imageHeight={finalDimensions.imageHeight}
//           gap={finalDimensions.gap}
//           logoBackground={logoBackground}
//           logoPadding={finalDimensions.logoPadding}
//         />
//       )}
//     </section>
//   );
// };

// export default ScrollVelocity;