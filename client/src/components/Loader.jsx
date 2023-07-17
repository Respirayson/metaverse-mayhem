import React, { useState, useEffect } from 'react';
import { randomQuote } from '../constants';

function Loader() {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const getQuote = () => {
      setQuote(randomQuote());
      setTimeout(getQuote, 5000);
    };
    getQuote();
  }, []);

  return (
    <div data-testid="loader" className="preloader">
      <div className="preloader-wrapper flex flex-col">
        <div className="loading">
          <div className="circle" />
          <div className="circle" />
          <div className="circle" />
        </div>
        <div>
          <p data-testid='quote' className='text-white w-[80%] relative mx-auto text-center mt-4'>
            {quote}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Loader;
