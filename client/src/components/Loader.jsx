import React from 'react';

function Loader() {
  return (
    <div className="preloader">
      <div className="preloader-wrapper">
        <div className="loading">
          <div className="circle" />
          <div className="circle" />
          <div className="circle" />
        </div>
      </div>
    </div>
  );
}

export default Loader;
