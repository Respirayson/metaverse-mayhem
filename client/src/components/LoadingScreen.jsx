import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import { fadeIn } from '../utils/motion';

function LoadingScreen({ loading, gameId, battleName }) {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={fadeIn('up', 'tween', 0.2, 0.5)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <div className="flex justify-between items-center absolute z-20 w-full h-screen gameload inset-0 flex-col">

        <div className="flex-1 flex items-center justify-center flex-col">
          <h1 className="font-bold text-white sm:text-6xl text-4xl text-center">
            Waiting for a
            {' '}
            <br />
            {' '}
            worthy opponent...
          </h1>
          <p className="text-siteWhite text-2xl mt-5 text-center">
            Protip: send the Game ID to your friends
          </p>
          <div className="bg-siteWhite text-white outline-none px-4 py-2 mt-4 justify-center align-center flex rounded-md max-w-full">
            {loading ? 'Creating new Game ID' : `${gameId}`}
          </div>

          <div className="flex justify-evenly items-center mt-12">
            <div className="flex items-center justify-center flex-col">
              <img src="/player01.jpg" alt="player01" className="md:w-36 w-24 md:h-36 h-24 object-contain rounded-full drop-shadow-lg" />
              <p className="mt-3 text-white md:text-xl text-base">
                {battleName}
              </p>
            </div>

            <h2 className="font-extrabold text-siteViolet text-7xl mx-16">Vs</h2>

            <div className="flex items-center justify-center flex-col">
              <img src="/player02.jpg" alt="player02" className="md:w-36 w-24 md:h-36 h-24 object-contain rounded-full drop-shadow-lg" />
              <p className="mt-3 text-white md:text-xl text-base">??????????</p>
            </div>
          </div>

          <div className="mt-4">
            <p className="font-medium text-white text-xl mb-2 text-center mb-5">OR</p>

            <button type="button" className="px-4 py-2 rounded-lg bg-siteBlue w-fit text-white font-bold my-4" onClick={() => navigate('/game/join-battle')}>Join an existing Game</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default LoadingScreen;
