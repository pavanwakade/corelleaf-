import React from 'react';
import './LoadingPage.css';

const LoadingPage = () => {
  return (
    <div className="loading-page">
      <div className="loading-container">
        <div className="loading-animation">
          <div className="spinner">
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
          </div>
        </div>
        <div className="loading-content">
          <h1 className="loading-title">Loading...</h1>
          <p className="loading-subtitle">Please wait while we prepare everything for you</p>
          <div className="loading-dots">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      </div>
      <div className="loading-bg">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
          <div className="shape shape-5"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;