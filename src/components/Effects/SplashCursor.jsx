import React, { useEffect, useRef, useState } from 'react';

const SplashCursor = () => {
  const cursorDotRef = useRef(null);
  const cursorOutlineRef = useRef(null);
  const trailRefs = useRef([]);
  const [cursorState, setCursorState] = useState('default');
  
  const mousePos = useRef({ x: 0, y: 0 });
  const outlinePos = useRef({ x: 0, y: 0 });
  const trail = useRef([]);
  const maxTrailLength = 15;

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Create trail elements
    for (let i = 0; i < maxTrailLength; i++) {
      const trailElement = document.createElement('div');
      trailElement.className = 'cursor-trail';
      trailElement.style.cssText = `
        position: fixed;
        width: ${6 - i * 0.2}px;
        height: ${6 - i * 0.2}px;
        background: rgba(255, 255, 255, ${(maxTrailLength - i) / maxTrailLength * 0.4});
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s ease;
      `;
      document.body.appendChild(trailElement);
      trailRefs.current.push(trailElement);
      trail.current.push({ x: 0, y: 0 });
    }

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      // Update dot position immediately
      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${e.clientX}px`;
        cursorDotRef.current.style.top = `${e.clientY}px`;
      }
      
      // Update trail
      updateTrail(e.clientX, e.clientY);
    };

    const handleMouseDown = () => setCursorState('click');
    const handleMouseUp = () => setCursorState('default');

    const handleMouseEnter = (e) => {
      const target = e.target;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.classList.contains('clickable')) {
        setCursorState('hover');
      }
    };

    const handleMouseLeave = () => setCursorState('default');

    const handleTextSelection = () => {
      if (window.getSelection().toString().length > 0) {
        setCursorState('text');
      } else {
        setCursorState('default');
      }
    };

    const updateTrail = (x, y) => {
      // Shift trail positions
      for (let i = trail.current.length - 1; i > 0; i--) {
        trail.current[i].x = trail.current[i - 1].x;
        trail.current[i].y = trail.current[i - 1].y;
      }
      
      trail.current[0] = { x, y };
      
      // Update trail elements
      trail.current.forEach((point, index) => {
        if (trailRefs.current[index] && point.x && point.y) {
          trailRefs.current[index].style.left = `${point.x}px`;
          trailRefs.current[index].style.top = `${point.y}px`;
        }
      });
    };

    const animateOutline = () => {
      outlinePos.current.x += (mousePos.current.x - outlinePos.current.x) * 0.15;
      outlinePos.current.y += (mousePos.current.y - outlinePos.current.y) * 0.15;
      
      if (cursorOutlineRef.current) {
        cursorOutlineRef.current.style.left = `${outlinePos.current.x}px`;
        cursorOutlineRef.current.style.top = `${outlinePos.current.y}px`;
      }
      
      requestAnimationFrame(animateOutline);
    };

    // Event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);
    document.addEventListener('selectionchange', handleTextSelection);

    animateOutline();

    return () => {
      document.body.style.cursor = 'auto';
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
      document.removeEventListener('selectionchange', handleTextSelection);
      
      // Clean up trail elements
      trailRefs.current.forEach(el => {
        if (el && el.parentNode) {
          el.parentNode.removeChild(el);
        }
      });
    };
  }, []);

  const getCursorStyles = () => {
    const baseStyles = {
      position: 'fixed',
      pointerEvents: 'none',
      zIndex: 9999,
      mixBlendMode: 'difference',
      transition: 'all 0.15s ease-out'
    };

    switch (cursorState) {
      case 'hover':
        return {
          dot: {
            ...baseStyles,
            width: '12px',
            height: '12px',
            background: '#ff6b6b',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 25px rgba(255, 107, 107, 0.7)'
          },
          outline: {
            ...baseStyles,
            width: '60px',
            height: '60px',
            border: '2px solid #ff6b6b',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(255, 107, 107, 0.1)',
            backdropFilter: 'blur(5px)',
            boxShadow: '0 0 30px rgba(255, 107, 107, 0.3)'
          }
        };
      
      case 'click':
        return {
          dot: {
            ...baseStyles,
            width: '4px',
            height: '4px',
            background: '#4ecdc4',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%) scale(0.5)',
            boxShadow: '0 0 20px rgba(78, 205, 196, 0.7)'
          },
          outline: {
            ...baseStyles,
            width: '60px',
            height: '60px',
            border: '2px solid #4ecdc4',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%) scale(1.5)',
            background: 'rgba(78, 205, 196, 0.2)',
            backdropFilter: 'blur(5px)'
          }
        };
      
      case 'text':
        return {
          dot: {
            ...baseStyles,
            opacity: 0
          },
          outline: {
            ...baseStyles,
            width: '2px',
            height: '20px',
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '1px',
            transform: 'translate(-50%, -50%)',
            border: 'none'
          }
        };
      
      default:
        return {
          dot: {
            ...baseStyles,
            width: '8px',
            height: '8px',
            background: '#fff',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 20px rgba(255, 255, 255, 0.5)'
          },
          outline: {
            ...baseStyles,
            width: '40px',
            height: '40px',
            border: '2px solid rgba(255, 255, 255, 0.5)',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(5px)'
          }
        };
    }
  };

  const styles = getCursorStyles();

  return (
    <>
      <div
        ref={cursorDotRef}
        style={styles.dot}
      />
      <div
        ref={cursorOutlineRef}
        style={styles.outline}
      />
      
      {/* Demo content to test cursor */}
     
    </>
  );
};

export default SplashCursor;