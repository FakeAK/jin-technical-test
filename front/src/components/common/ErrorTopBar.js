import React from 'react';
import './ErrorTopBar.css';

const ErrorTopBar = ({ error }) => {
  return (
    <div className="errorBar">
      <p className="errorMessage">{error}</p>
    </div>
  );
}

export default ErrorTopBar;