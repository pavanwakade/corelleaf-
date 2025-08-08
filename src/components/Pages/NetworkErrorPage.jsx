import React, { useState, useEffect } from 'react';
import './NetworkErrorPage.css';

const NetworkErrorPage = ({ onRetry }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      if (onRetry) {
        setTimeout(() => {
          onRetry();
        }, 1000);
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [onRetry]);

  const handleRetry = () => {
    setIsRetrying(true);
    
    // Simulate retry process
    setTimeout(() => {
      if (navigator.onLine) {
        if (onRetry) {
          onRetry();
        }
      } else {
        setIsRetrying(false);
      }
    }, 2000);
  };

  return (
    <div className="network-error-page">
      <div className="network-error-container">
        <div className="network-animation">
          <div className="wifi-icon">
            <div className="wifi-circle wifi-circle-1"></div>
            <div className="wifi-circle wifi-circle-2"></div>
            <div className="wifi-circle wifi-circle-3"></div>
            <div className="wifi-base"></div>
            <div className="wifi-slash"></div>
          </div>
        </div>
        
        <div className="network-content">
          <h1 className="network-title">No Internet Connection</h1>
          {/* <div className="connection-status">
            <div className={`status-indicator ${isOnline ? 'online' : 'offline'}`}></div>
            <span className="status-text">
              {isOnline ? 'Connected' : 'Disconnected'}
            </span>
          </div> */}
          
          <p className="network-message">
            It looks like you're not connected to the internet. Please check your connection and try again.
          </p>
          
          <div className="network-suggestions">
            <h3>Try these steps:</h3>
            <ul>
              <li>Check your Wi-Fi or mobile data connection</li>
              <li>Make sure you're connected to a network</li>
              <li>Try moving to a location with better signal</li>
              <li>Restart your router if using Wi-Fi</li>
              <li>Refresh page</li>
            </ul>
          </div>
          
          <div className="network-actions">
            <button 
              className={`btn btn-primary ${isRetrying ? 'loading' : ''}`}
              onClick={handleRetry}
              disabled={isRetrying}
            >
              {isRetrying ? (
                <>
                  <div className="spinner-small"></div>
                  Retrying...
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                    <path d="M21 3v5h-5"/>
                    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                    <path d="M3 21v-5h5"/>
                  </svg>
                  Try Again
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      
      <div className="network-bg">
        <div className="signal-waves">
          <div className="wave wave-1"></div>
          <div className="wave wave-2"></div>
          <div className="wave wave-3"></div>
        </div>
      </div>
    </div>
  );
};

export default NetworkErrorPage;