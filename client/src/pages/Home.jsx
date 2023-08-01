import React from 'react';
import {
  Introduction, About, Explore, GetStarted, Map, NewFeatures,
} from '../components';

/**
 * Home component representing the home page of the website or application.
 * It renders various sections to provide information and navigation options.
 * @returns {JSX.Element} - The JSX element representing the home page.
 */
function Home() {
  return (
    <>
      {/* Introduction section */}
      <Introduction />

      <div className="relative">
        {/* About section */}
        <About />
        {/* Gradient background */}
        <div className="gradient-03 z-0" />
        {/* Explore section */}
        <Explore />
      </div>

      <div className="relative">
        {/* GetStarted section */}
        <GetStarted />
        {/* Gradient background */}
        <div className="gradient-04 z-0" />
        {/* NewFeatures section */}
        <NewFeatures />
      </div>

      {/* Map section */}
      <Map />
    </>
  );
}

export default Home;
