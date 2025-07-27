import React, { useEffect, useRef, useState } from 'react';

const NeonCursor = () => {
  const cursorRef = useRef(null);
  const trailRefs = useRef([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const updateCursor = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      // Update main cursor
      cursor.style.transform = `translate(${e.clientX - 8}px, ${e.clientY - 8}px)`;
      
      // Update trail with delay
      trailRefs.current.forEach((trail, index) => {
        if (trail) {
          setTimeout(() => {
            trail.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
          }, index * 50);
        }
      });
    };

    const handleMouseDown = () => setIsActive(true);
    const handleMouseUp = () => setIsActive(false);

    document.addEventListener('mousemove', updateCursor);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full pointer-events-none">
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className={`fixed w-4 h-4 rounded-full transition-all duration-200 ${
          isActive ? 'scale-150' : 'scale-100'
        }`}
        style={{
          background: 'linear-gradient(45deg, #ff006e, #00f5ff)',
          boxShadow: `
            0 0 20px #ff006e,
            0 0 40px #ff006e,
            0 0 60px #ff006e,
            inset 0 0 20px rgba(255, 255, 255, 0.2)
          `,
          filter: 'hue-rotate(0deg)',
          animation: 'neonGlow 2s ease-in-out infinite alternate'
        }}
      />

      {/* Trail elements */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          ref={el => trailRefs.current[i] = el}
          className="fixed w-2 h-2 rounded-full"
          style={{
            background: `linear-gradient(45deg, rgba(255, 0, 110, ${0.8 - i * 0.1}), rgba(0, 245, 255, ${0.8 - i * 0.1}))`,
            boxShadow: `0 0 ${20 - i * 2}px rgba(255, 0, 110, ${0.6 - i * 0.08})`,
            filter: `hue-rotate(${i * 30}deg)`,
            transition: 'all 0.1s ease-out'
          }}
        />
      ))}

      {/* Neon glow animation */}
      <style jsx>{`
        @keyframes neonGlow {
          0% {
            filter: hue-rotate(0deg) brightness(1);
            box-shadow: 
              0 0 20px #ff006e,
              0 0 40px #ff006e,
              0 0 60px #ff006e,
              inset 0 0 20px rgba(255, 255, 255, 0.2);
          }
          100% {
            filter: hue-rotate(90deg) brightness(1.2);
            box-shadow: 
              0 0 25px #00f5ff,
              0 0 50px #00f5ff,
              0 0 75px #00f5ff,
              inset 0 0 25px rgba(255, 255, 255, 0.3);
          }
        }
      `}</style>
    </div>
  );
};

export default NeonCursor;
