import React from 'react';
import '../styles/loading-spinner.css';

const LoadingSpinner = () => (
  <div className="loading-spinner-container">
    <div className="custom-spinner"></div>
    <p className="loading-text">Fetching awesome games...</p>
  </div>
);

export default LoadingSpinner;
