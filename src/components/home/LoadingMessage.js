import React from 'react';
import "./LoadingMessage.css";

const LoadingMessage = () => {
  return (
    <div className="loading-overlay">
      <p className="main-page-loading-label">Loading Data...</p>
    </div>
  );
};

export default LoadingMessage;