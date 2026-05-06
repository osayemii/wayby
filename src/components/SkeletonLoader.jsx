import React from 'react';
import './SkeletonLoader.css';

const SkeletonLoader = ({ count = 6 }) => {
  return (
    <div className="product-list">
      {Array(count).fill(0).map((_, index) => (
        <div key={index} className="skeleton-card">
          <div className="skeleton-image shim"></div>
          <div className="skeleton-info">
            <div className="skeleton-title shim"></div>
            <div className="skeleton-text shim"></div>
            <div className="skeleton-text shim"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
