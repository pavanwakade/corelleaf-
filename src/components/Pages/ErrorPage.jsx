import React from 'react';
import './ErrorPage.css';

const ErrorPage = ({ error = "Something went wrong", onRetry }) => {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="error-page">
      <div className="error-container">
        <div className="error-animation">
          <div className="error-icon">
            <div className="error-circle">
              <div className="error-x">
                <div className="error-line error-line-1"></div>
                <div className="error-line error-line-2"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="error-content">
          <h1 className="error-title">Oops!</h1>
          <h2 className="error-code">Error</h2>
          <p className="error-message">{error}</p>
          <p className="error-description">
            We're sorry, but something went wrong. Please try again or go back to the homepage.
          </p>
          
          <div className="error-actions">
            <button className="btn btn-primary" onClick={onRetry || handleRefresh}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                <path d="M21 3v5h-5"/>
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                <path d="M3 21v-5h5"/>
              </svg>
              Try Again
            </button>
            <button className="btn btn-secondary" onClick={handleGoHome}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9,22 9,12 15,12 15,22"/>
              </svg>
              Go Home
            </button>
          </div>
        </div>
      </div>
      
      <div className="error-bg">
        <div className="glitch-bg"></div>
        <div className="particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;