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

// const ScrollVelocity = ({
//   images = [],
//   velocity = 50,
//   numCopies = 8,
//   imageWidth = 300,
//   imageHeight = 200,
//   gap = 20,
//   style = {},
//   logoBackground = '#ffffff', // Background color for logo containers
//   logoPadding = 20 // Padding inside logo containers
// }) => {

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
//             borderRadius: '12px',
//             // overflow: 'hidden',
//             boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
//             transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//             backgroundColor: logoBackground, // Background for logos
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
//               objectFit: 'contain', // Maintains aspect ratio, shows full logo
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
//           height: `${imageHeight + 40}px`,
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
//     <section style={{ margin: '2rem 0', transform: 'rotate(10deg)' }}>
//       {Array.isArray(images[0]) ? (
//         images.map((imageRow, index) => (
//           <div key={index} style={{ marginBottom: '1rem' }}>
//             <ScrollRow
//               images={imageRow}
//               baseVelocity={index % 2 === 0 ? velocity : -velocity}
//               numCopies={numCopies}
//               imageWidth={imageWidth}
//               imageHeight={imageHeight}
//               gap={gap}
//               logoBackground={logoBackground}
//               logoPadding={logoPadding}
//             />
//           </div>
//         ))
//       ) : (
//         <ScrollRow
//           images={images}
//           baseVelocity={velocity}
//           numCopies={numCopies}
//           imageWidth={imageWidth}
//           imageHeight={imageHeight}
//           gap={gap}
//           logoBackground={logoBackground}
//           logoPadding={logoPadding}
//         />
//       )}
//     </section>
//   );
// };

// export default ScrollVelocity;


import React, { useRef, useEffect, useState } from 'react';

// Hook to calculate element width
function useElementWidth(ref) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [ref]);

  return width;
}

// Hook to get responsive dimensions
function useResponsiveDimensions() {
  const [dimensions, setDimensions] = useState({
    imageWidth: 300,
    imageHeight: 200,
    gap: 20,
    logoPadding: 20,
    numCopies: 8
  });

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      
      if (width < 480) { // Mobile
        setDimensions({
          imageWidth: Math.min(100, width * 0.20),
          imageHeight: Math.min(60, width * 0.12),
          gap: 6,
          logoPadding: 6,
          numCopies: 15
        });
      } else if (width < 768) { // Small tablet
        setDimensions({
          imageWidth: Math.min(220, width * 0.35),
          imageHeight: Math.min(145, width * 0.23),
          gap: 12,
          logoPadding: 12,
          numCopies: 10
        });
      } else if (width < 1024) { // Large tablet
        setDimensions({
          imageWidth: Math.min(250, width * 0.3),
          imageHeight: Math.min(165, width * 0.2),
          gap: 15,
          logoPadding: 15,
          numCopies: 9
        });
      } else { // Desktop
        setDimensions({
          imageWidth: 300,
          imageHeight: 200,
          gap: 20,
          logoPadding: 20,
          numCopies: 8
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
  
  // Use responsive dimensions as fallback
  const finalDimensions = {
    imageWidth: imageWidth || responsiveDimensions.imageWidth,
    imageHeight: imageHeight || responsiveDimensions.imageHeight,
    gap: gap || responsiveDimensions.gap,
    logoPadding: logoPadding || responsiveDimensions.logoPadding,
    numCopies: numCopies || responsiveDimensions.numCopies
  };

  const ScrollRow = ({ 
    images, 
    baseVelocity = velocity, 
    numCopies,
    imageWidth,
    imageHeight,
    gap,
    logoBackground,
    logoPadding
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
        scrollVelocity.current = currentScrollY - lastScrollY.current;
        lastScrollY.current = currentScrollY;
      };

      const animate = () => {
        if (containerRef.current && copyWidth > 0) {
          const deltaTime = 16; // ~60 FPS
          let moveBy = baseVelocity * (deltaTime / 1000);
          moveBy += scrollVelocity.current * 0.3;

          positionRef.current += moveBy;

          if (positionRef.current <= -copyWidth) {
            positionRef.current = 0;
          } else if (positionRef.current >= 0) {
            positionRef.current = -copyWidth;
          }

          containerRef.current.style.transform = `translateX(${positionRef.current}px)`;

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

    const imageSets = [];
    for (let i = 0; i < numCopies; i++) {
      const imageElements = images.map((image, imgIndex) => (
        <div
          key={`${i}-${imgIndex}`}
          style={{
            flexShrink: 0,
            width: `${imageWidth}px`,
            height: `${imageHeight}px`,
            marginRight: `${gap}px`,
            borderRadius: window.innerWidth < 480 ? '6px' : '12px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            backgroundColor: logoBackground,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: `${logoPadding}px`
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
              transition: 'opacity 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.opacity = '0.8';
            }}
            onMouseLeave={(e) => {
              e.target.style.opacity = '1';
            }}
          />
        </div>
      ));

      imageSets.push(
        <div
          key={i}
          ref={i === 0 ? copyRef : null}
          style={{ 
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {imageElements}
        </div>
      );
    }

    return (
      <div 
        style={{ 
          position: 'relative',
          overflow: 'hidden',
          height: `${imageHeight + (window.innerWidth < 480 ? 15 : 40)}px`,
          ...style 
        }}
      >
        <div
          ref={containerRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            paddingLeft: `${gap}px`,
            willChange: 'transform'
          }}
        >
          {imageSets}
        </div>
      </div>
    );
  };

  return (
    <section style={{ 
      margin: window.innerWidth < 480 ? '0.5rem 0' : '2rem 0',
      transform: window.innerWidth < 480 ? 'rotate(3deg)' : 'rotate(10deg)',
      overflow: 'hidden'
    }}>
      {Array.isArray(images[0]) ? (
        images.map((imageRow, index) => (
          <div key={index} style={{ 
            marginBottom: window.innerWidth < 480 ? '0.3rem' : '1rem' 
          }}>
            <ScrollRow
              images={imageRow}
              baseVelocity={index % 2 === 0 ? velocity : -velocity}
              numCopies={finalDimensions.numCopies}
              imageWidth={finalDimensions.imageWidth}
              imageHeight={finalDimensions.imageHeight}
              gap={finalDimensions.gap}
              logoBackground={logoBackground}
              logoPadding={finalDimensions.logoPadding}
            />
          </div>
        ))
      ) : (
        <ScrollRow
          images={images}
          baseVelocity={velocity}
          numCopies={finalDimensions.numCopies}
          imageWidth={finalDimensions.imageWidth}
          imageHeight={finalDimensions.imageHeight}
          gap={finalDimensions.gap}
          logoBackground={logoBackground}
          logoPadding={finalDimensions.logoPadding}
        />
      )}
    </section>
  );
};

export default ScrollVelocity;