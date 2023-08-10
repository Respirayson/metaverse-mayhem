import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { WebContext } from '../context/WebContext';
import { battlegrounds } from '../constants';

function Battleground() {
  const navigate = useNavigate();
  const {
    setShowAlert, setSuccess, setAlertMessage, setBattleground,
  } = useContext(WebContext);

  const handleBattleChoice = (ground) => {
    setBattleground(ground.id);

    localStorage.setItem('battleground', ground.id);

    setShowAlert(true);
    setSuccess(true);
    setAlertMessage(`${ground.name} is battle ready!`);

    setTimeout(() => {
      navigate('/game');
    }, 1000);
  };

  return (
    <div className="flex flex-1 justify-between py-8 sm:px-12 px-8 flex-col">
      <div className="flex-1 flex justify-center flex-col xl:mt-0">
        <div className="flex flex-row w-full">
          <h1 className="flex font-bold text-white sm:text-6xl text-4xl head-text">
            Choose your Battleground
          </h1>
        </div>
        <p className="font-normal text-[24px] text-white my-10">
          Where do you want to battle?
        </p>

        <div className="flex items-center justify-center flex-wrap max-w-[1200px]">
          {battlegrounds.map((ground) => (
            <div
              key={ground.id}
              className="flex items-center justify-center sm:w-[420px] w-full h-[260px] p-2 glassmorphism m-4 rounded-lg cursor-pointer battle-card"
              onClick={() => handleBattleChoice(ground)}
            >
              <img
                src={ground.image}
                alt="saiman"
                className="w-full h-full object-cover rounded-md"
              />

              <div className="info absolute">
                <p className="font-semibold text-2xl text-white">
                  {ground.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Battleground;
