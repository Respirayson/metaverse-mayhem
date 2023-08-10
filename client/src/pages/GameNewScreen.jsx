import { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import allActions from '../actions';
import { socket } from '../utils/socket';
import { LoadingScreen } from '../components';
import { WebContext } from '../context/WebContext';

/**
 * Component representing the new game screen where players
 * can create a new battle or wait for others to join
 * @returns {JSX.Element} - The JSX element
 */
function GameNewScreen() {
  const currentGame = useSelector((state) => state.current);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, gameId } = currentGame;
  const previousGameId = useRef(gameId);
  const [username, setUsername] = useState('');
  const [waiting, setWaiting] = useState(false);

  const { profileIcon } = useContext(WebContext)

  // Get the username from local storage on component mount
  useEffect(() => {
    setUsername(localStorage.getItem('username'));
  }, []);

  // Dispatch the action to fetch a new game on component mount and join the game with the username
  useEffect(() => {
    dispatch(allActions.beforeGameActions.fetchNewGame(true)).then((gameId) => {
      socket.emit('joinGame', { gameId: gameId.toString(), name: localStorage.getItem('username') });
    });
  }, [dispatch]);

  // Listen for the 'playerJoined' event from the socket,
  // update the state if the player count is 2, and navigate to the game page
  useEffect(() => {
    if (previousGameId !== gameId) {
      socket.on('playerJoined', ({ playerCount }) => {
        if (playerCount === 2) {
          dispatch(allActions.beforeGameActions.updateHasOpponent(true));
          navigate(`/game/${gameId}`);
        }
      });
    }
  }, [dispatch, gameId, navigate]);

  // Handle the click event to enter the arena, set waiting state to true
  const handleClick = () => {
    document.querySelector('footer').style.display = 'none';
    document.querySelector('header').style.display = 'none';
    setWaiting(true);
  };

  return (
    <>
      {waiting && <LoadingScreen profileIcon={profileIcon} loading={loading} gameId={gameId} battleName={username} />}
      <div className="flex flex-1 justify-between py-8 sm:px-12 px-8 flex-col">
        <div className="flex-1 flex justify-center flex-col xl:mt-0 my-16">
          <div className="flex flex-row w-full">
            <h1 className="flex font-bold text-white sm:text-6xl text-4xl head-text">Create new Battle</h1>
          </div>
          <div className="gradient-02 z-0" />
          <p className="font-normal text-[24px] text-white my-10">Create your own battle or wait for other players to join</p>
          <button type="button" className="px-4 py-2 rounded-lg bg-siteBlue w-fit text-white font-bold my-4" onClick={handleClick}>Enter the Arena</button>
          <p className="z-10 font-medium text-lg text-siteBlue cursor-pointer" onClick={() => navigate('/game/join-battle')}>
            Or join already existing battles
          </p>
        </div>
      </div>
    </>
  );
}

export default GameNewScreen;
