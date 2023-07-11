import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CustomInput } from '../components';

function StartScreen() {
  const navigate = useNavigate();
  const currentGame = useSelector((state) => state.current);
  const { gameId, hasOpponent } = currentGame;
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (gameId && hasOpponent) {
      navigate(`/game/${gameId}`);
    }
  }, [gameId, hasOpponent, navigate]);

  useEffect(() => {
    setUsername(localStorage.getItem('username'));
  }, []);

  const handleClick = () => {
    localStorage.setItem('username', username);
  };

  return (
    <div className="flex flex-1 justify-between py-8 sm:px-12 px-8 flex-col">
      <div className="flex-1 flex justify-center flex-col xl:mt-0 my-16">
        <div className="flex flex-row w-full">
          <h1 className="flex font-bold text-white sm:text-6xl text-4xl head-text">Welcome to Metaverse Mayhem</h1>
        </div>
        <p className="font-normal text-[24px] text-white my-10">Now begins your journey to conquer the metaverse</p>

        <CustomInput label="Username" placeHolder="Enter Battle Name" value={username} handleValueChange={setUsername} />

        <button type="button" className="flex items-center h-fit py-4 px-6 bg-[#25618B] rounded-[32px] gap-[12px] w-fit mt-4" onClick={handleClick}>
          <Link to="/game/new" className="text-white text-[16px] font-semibold">Start Game</Link>
        </button>
      </div>
    </div>
  );
}

export default StartScreen;
