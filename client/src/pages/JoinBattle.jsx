import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { CustomInput } from '../components';
import allActions from '../actions';
import { socket } from '../utils/socket';

function JoinBattle() {
  const [gameId, setGameId] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const joinNewGame = (gameId) => {
    dispatch(allActions.beforeGameActions.joinGame(gameId));
    socket.emit('joinGame', { gameId });
    navigate(`/game/${gameId}`);
  };

  const handleClick = () => {
    if (gameId) {
			joinNewGame(gameId);
		}
  };

  return (
    <div className="flex flex-1 justify-between py-8 sm:px-12 px-8 flex-col">
      <div className="flex-1 flex justify-center flex-col xl:mt-0 my-16">
        <div className="flex flex-row w-full">
          <h1 className="flex font-bold text-white sm:text-6xl text-4xl head-text">Join a Game</h1>
        </div>
        <p className="font-normal text-[24px] text-white my-10">Join already existing games</p>

        <CustomInput
          label="Game ID"
          placeHolder="Enter Game ID"
          value={gameId}
          handleValueChange={setGameId}
        />
        <button type="button" onClick={handleClick} className="mt-6 px-4 py-2 rounded-lg bg-siteBlue w-fit text-white font-bold">Join a specific game</button>

        <p className="font-medium text-lg text-siteBlue cursor-pointer mt-6" onClick={() => navigate('/game/new')}>
          Or create a new battle
        </p>
      </div>
    </div>
  );
}

export default JoinBattle;
