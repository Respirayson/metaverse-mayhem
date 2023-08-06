import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import { fadeIn } from '../utils/motion';

/**
 * Component for rendering the final screen after the game ends.
 * @component
 * @param {Object} props - Component props.
 * @param {boolean} props.isWinner - Flag indicating if the player is the winner or not.
 * @returns {JSX.Element} FinalScreen component.
 */
function FinalScreen({ isWinner, profileIcon }) {
  const navigate = useNavigate();

  /**
   * Handles the click event of the "Go back to Home" button.
   */
  const handleClick = () => {
    navigate('/');
  };

  return (
    <motion.div
      variants={fadeIn('up', 'tween', 0.2, 0.5)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="z-[100000000] relative"
    >
      <div className="flex justify-between items-center absolute w-full h-screen gameload inset-0 flex-col">
        <div className="flex-1 flex items-center justify-center flex-col">
          <h1 className="font-bold text-white sm:text-6xl text-4xl text-center">
            {isWinner ? (
              <div>
                Congratulations
                <br />
                you have prevailed
              </div>
            ) : (
              <div>
                Oops sorry
                <br />
                you have lost
              </div>
            )}
          </h1>
          <div className="bg-siteWhite text-white outline-none px-4 py-2 mt-4 justify-center align-center flex rounded-md max-w-full">
            {isWinner ? 'Will your luck last?' : 'Try again next time buddy'}
          </div>

          <div className="flex justify-evenly items-center mt-12">
            <div className="flex items-center justify-center flex-col">
              <img
                src={`/player${profileIcon}.jpg`}
                alt="player01"
                className="md:w-36 w-24 md:h-36 h-24 object-contain rounded-full drop-shadow-lg"
              />
              <p className="mt-3 text-white md:text-xl text-base">
                {localStorage.getItem('username')}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <button
              type="button"
              className="px-4 py-2 rounded-lg bg-siteBlue w-fit text-white font-bold my-4"
              onClick={handleClick}
            >
              Go back to Home
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default FinalScreen;
