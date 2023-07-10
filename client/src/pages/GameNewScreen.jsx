import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import allActions from '../actions';
import { socket } from '../utils/socket';
import { CustomInput, LoadingScreen } from '../components';

function GameNewScreen() {
  const currentGame = useSelector((state) => state.current);
  console.log(currentGame);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, gameId, hasOpponent } = currentGame;
  const previousGameId = useRef(gameId);
  const [battleName, setBattleName] = useState('');
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    dispatch(allActions.beforeGameActions.fetchNewGame(true)).then(
      (gameId) => {
        socket.emit('joinGame', { gameId });
      },
    );
  }, [dispatch]);

  useEffect(() => {
    if (previousGameId !== gameId) {
      socket.on('playerJoined', ({ playerCount }) => {
        console.log('player joined');
        if (playerCount === 2) {
          console.log('running');
          dispatch(
            allActions.beforeGameActions.updateHasOpponent(true),
          );
          navigate(`/game/${gameId}`);
        }
      });
    }
  }, [dispatch, gameId, navigate]);

  const handleClick = () => {
	setWaiting(true);
  }

  return (
    <>
      {waiting && <LoadingScreen loading={loading} gameId={gameId} battleName={battleName} />}
      <div className="flex flex-1 justify-between py-8 sm:px-12 px-8 flex-col">
        <div className="flex-1 flex justify-center flex-col xl:mt-0 my-16">
          <div className="flex flex-row w-full">
            <h1 className="flex font-bold text-white sm:text-6xl text-4xl head-text">Create new Battle</h1>
          </div>
          <p className="font-normal text-[24px] text-white my-10">Create your own battle or wait for other players to join</p>
          <CustomInput label="Username" placeHolder="Enter Battle Name" value={battleName} handleValueChange={setBattleName} />
          <button type="button" className="px-4 py-2 rounded-lg bg-siteBlue w-fit text-white font-bold my-4" onClick={handleClick}>Enter the Arena</button>
          <p className="font-medium text-lg text-siteBlue cursor-pointer" onClick={() => navigate('/game/join-battle')}>
            Or join already existing battles
          </p>
        </div>
      </div>
    </>
  );
}

export default GameNewScreen;
