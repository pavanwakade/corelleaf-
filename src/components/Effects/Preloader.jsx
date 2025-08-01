import React, { useState, useEffect } from 'react';

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + Math.random() * 3 + 1;
      });
    }, 100);

    // Simulate window load event after 3 seconds
    const loadTimeout = setTimeout(() => {
      clearInterval(interval);

      // Complete the progress to 100%
      setProgress(100);

      // Start completion animations after a brief delay
      setTimeout(() => {
        setIsComplete(true);

        // Hide preloader after animations complete
        setTimeout(() => {
          setIsHidden(true);
          if (onComplete) onComplete();
        }, 1400); // Total animation duration
      }, 500);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(loadTimeout);
    };
  }, [onComplete]);

  if (isHidden) return null;

  return (
    <div className="preloader">
      <div className={`preloader-after ${isComplete ? 'slide-down' : ''}`}></div>
      <div className={`preloader-before ${isComplete ? 'slide-up' : ''}`}></div>

      <div className="preloader-block">
        <div className={`title ${isComplete ? 'fade-up' : ''}`}>corelleaf</div>
        <div className={`percent ${isComplete ? 'fade-out' : ''}`}>{Math.round(progress)}</div>
        <div className={`loading ${isComplete ? 'fade-down' : ''}`}>loading...</div>
      </div>

      <div className={`preloader-bar ${isComplete ? 'slide-right' : ''}`}>
        <div
          className="preloader-progress"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <style jsx>{`
        .preloader {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 99999;
        }

        .preloader .preloader-before,
        .preloader .preloader-after {
          display: block;
          position: absolute;
          left: 0;
          width: 100%;
          height: 50%;
          background: #090808;
          transition: transform 1s ease-in-out;
        }

        .preloader .preloader-before {
          top: 0;
        }

        .preloader .preloader-after {
          bottom: 0;
        }

        .preloader .preloader-before.slide-up {
          transform: translateY(-100%);
          transition-delay: 0.7s;
        }

        .preloader .preloader-after.slide-down {
          transform: translateY(100%);
          transition-delay: 0.7s;
        }

        .preloader .preloader-block {
          position: absolute;
          top: 0;
          left: 0;
          right: auto;
          bottom: auto;
          width: 100%;
          height: 100%;
        }

        .preloader .preloader-block .title {
          position: absolute;
          left: 0;
          bottom: calc(50% + 16px);
          width: 100%;
          text-align: center;
          z-index: 2;
          font-size: 25px;
          letter-spacing: 0px;
          color: #fff;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          transition: all 1s ease-in-out;
          opacity: 1;
          transform: translateY(0);
        }

        .preloader .preloader-block .title.fade-up {
          opacity: 0;
          transform: translateY(-100px);
        }

        .preloader .preloader-block .percent {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate3d(-50%, -50%, 0);
          font-weight: 700;
          letter-spacing: 0px;
          font-size: 24vw;
          color: rgba(54, 54, 53, 0.1);
          z-index: 1;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          transition: opacity 1s ease-in-out;
        }

        .preloader .preloader-block .percent.fade-out {
          opacity: 0;
        }

        .preloader .preloader-block .loading {
          position: absolute;
          top: calc(50% + 16px);
          left: 0;
          width: 100%;
          text-align: center;
          z-index: 2;
          font-size: 14px;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 0px;
          color: #fff;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          animation: blink-animation 2.2s linear infinite;
          transition: all 1s ease-in-out;
          opacity: 1;
          transform: translateY(0);
        }

        .preloader .preloader-block .loading.fade-down {
          opacity: 0;
          transform: translateY(100px);
        }

        @keyframes blink-animation {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0.3; }
        }

        .preloader .preloader-bar {
          position: absolute;
          z-index: 2;
          top: calc(50% - 1px);
          right: 0;
          width: 100%;
          height: 2px;
          background: #1d1d1d;
          transition: transform 0.5s ease-in-out;
          transition-delay: 0.2s;
        }

        .preloader .preloader-bar.slide-right {
          transform: translateX(100%);
        }

        .preloader .preloader-bar .preloader-progress {
          position: absolute;
          top: 0;
          left: 0;
          right: auto;
          bottom: auto;
          height: 100%;
          width: 0;
          background: #fff;
          transition: width 0.3s ease-out;
        }

        /* Responsive font size for smaller screens */
        @media (max-width: 768px) {
          .preloader .preloader-block .title {
            font-size: 20px;
          }
          
          .preloader .preloader-block .percent {
            font-size: 30vw;
          }
          
          .preloader .preloader-block .loading {
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  );
};

export default Preloader;