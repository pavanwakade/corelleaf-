import React, { useRef, useEffect, useState } from 'react';
import '../css/ScrollVelocity.css';

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

// Responsive dimensions hook
function useResponsiveDimensions() {
  const [dimensions, setDimensions] = useState({});

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      if (width < 480) {
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
      } else if (width < 768) {
        setDimensions({
          imageWidth: Math.min(220, width * 0.3),
          imageHeight: Math.min(145, width * 0.2),
          gap: 12,
          logoPadding: 12,
          numCopies: 10,
          borderRadius: '8px',
          sectionMargin: '1.5rem 0',
          sectionTransform: 'rotate(5deg)',
          rowMarginBottom: '0.75rem',
          containerHeightPadding: 25,
        });
      } else if (width < 1024) {
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
      } else {
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

  const finalDimensions = {
    imageWidth: imageWidth || responsiveDimensions.imageWidth,
    imageHeight: imageHeight || responsiveDimensions.imageHeight,
    gap: gap || responsiveDimensions.gap,
    logoPadding: logoPadding || responsiveDimensions.logoPadding,
    numCopies: numCopies || responsiveDimensions.numCopies,
    ...responsiveDimensions
  };

  const ScrollRow = ({ images, baseVelocity, ...dims }) => {
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
          const deltaTime = 16;
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
        cancelAnimationFrame(rafId);
      };
    }, [baseVelocity, copyWidth]);

    const imageSets = Array.from({ length: dims.numCopies }).map((_, i) => (
      <div key={i} ref={i === 0 ? copyRef : null} className="scroll-row">
        {images.map((image, imgIndex) => (
          <div
            key={`${i}-${imgIndex}`}
            className="logo-card"
            style={{
              width: `${dims.imageWidth}px`,
              height: `${dims.imageHeight}px`,
              marginRight: `${dims.gap}px`,
              borderRadius: dims.borderRadius,
              backgroundColor: logoBackground,
              padding: `${dims.logoPadding}px`
            }}
          >
            <img src={image.src} alt={image.alt || `Logo ${imgIndex + 1}`} />
          </div>
        ))}
      </div>
    ));

    return (
      <div className="scroll-container" style={{ height: `${dims.imageHeight + dims.containerHeightPadding}px`, ...style }}>
        <div ref={containerRef} className="scroll-content" style={{ paddingLeft: `${dims.gap}px` }}>
          {imageSets}
        </div>
      </div>
    );
  };

  return (
    <section style={{ margin: finalDimensions.sectionMargin, transform: finalDimensions.sectionTransform }}>
      {Array.isArray(images[0]) ? (
        images.map((imageRow, index) => (
          <div key={index} style={{ marginBottom: finalDimensions.rowMarginBottom }}>
            <ScrollRow images={imageRow} baseVelocity={index % 2 === 0 ? velocity : -velocity} {...finalDimensions} />
          </div>
        ))
      ) : (
        <ScrollRow images={images} baseVelocity={velocity} {...finalDimensions} />
      )}
    </section>
  );
};

export default ScrollVelocity;
