import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gameRules } from '../constants';

function GameInstruction() {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <>
      <div className="absolute right-4 top-[40%] z-50">
        <div
          className="absolute right-[10px] top-1/2 flex items-center justify-center cursor-pointer"
          onClick={() => setToggleSidebar(true)}
        >
          <p className="font-semibold text-[16px] text-white">Instructions</p>
          <img
            src="/alertIcon.svg"
            alt="info"
            className="w-2/5 h-2/5 object-contain invert"
          />
        </div>
      </div>

      <div
        className={`absolute z-50 p-8 right-0 top-[10%] h-[80%] rounded-[20px] flex-col transition-all ease-in duration-300 ${
          toggleSidebar ? 'translate-x-0' : ' translate-x-full'
        } bg-white backdrop-filter backdrop-blur-lg bg-opacity-10 flex justify-between items-center backdrop-blur-3xl`}
      >
        <div className="flex flex-col">
          <div className="flex justify-end mb-8">
            <div
              className="flex items-center justify-center w-10 h-10 rounded-md bg-siteBlue text-white font-extrabold text-xl cursor-pointer"
              onClick={() => setToggleSidebar(false)}
            >
              X
            </div>
          </div>

          <h3 className="font-bold text-white text-3xl">Game Rules:</h3>

          <div className="mt-3">
            {gameRules.map((rule, index) => (
              <p
                key={`game-rule-${index}`}
                className="font-medium text-white text-xl mb-2"
              >
                <span className="font-bold">{index + 1}</span>
                .
                {rule}
              </p>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <button
              type="button"
              className="px-4 py-2 rounded-lg bg-siteBlue w-fit text-white font-bold my-4"
              onClick={handleClick}
            >
              Quit Game
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default GameInstruction;
