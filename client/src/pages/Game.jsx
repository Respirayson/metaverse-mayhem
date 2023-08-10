import { useSelector } from 'react-redux';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Board } from '../containers';
import bg from '../assets/bg.mp3';
import { FinalScreen, Loader } from '../components';
import { socket } from '../utils/socket';
import { WebContext } from '../context/WebContext';

/**
 * Component representing the game page where players can play the game
 * @returns {JSX.Element} - The JSX element
 */
function Game() {
  const currentGame = useSelector((state) => state.current);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  const { currentAccount, battleground, profileIcon } = useContext(WebContext);

  // Hide header and footer during the game, show loading screen for 2 seconds
  useEffect(() => {
    document.querySelector('footer').style.display = 'none';
    document.querySelector('header').style.display = 'none';
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      // Restore header and footer, clear local storage, and reload the page on component unmount
      document.querySelector('footer').style.display = 'block';
      document.querySelector('header').style.display = 'block';
      localStorage.removeItem('persist:root');
      localStorage.removeItem('gameId');
      window.location.reload();
    };
  }, []);

  // Play background audio on component mount and pause on unmount
  useEffect(() => {
    const audio = new Audio(bg);
    audio.play();

    return () => {
      audio.pause();
    };
  }, []);

  // Fetch the player's deck from the API on component mount
  useEffect(() => {
    const fetchDeck = async () => {
      const cardsDeck = await fetch(
        `https://metaverse-mayhem.onrender.com/api/v1/game/cards/?publicAddress=${currentAccount}`,
      );
      const currentDeck = await cardsDeck.json();
      if (currentDeck != null) {
        localStorage.setItem('deck', JSON.stringify(currentDeck.cards));
      }
    };
    fetchDeck();
  }, [currentAccount]);

  // Check if a game is ongoing and join it, show the final screen if the game is over
  useEffect(() => {
    if (!currentGame.gameId) {
      navigate('/game/new');
    } else {
      localStorage.setItem('gameId', currentGame.gameId);
      navigate(`/game/${currentGame.gameId}`);
      socket.emit('joinGame', {
        gameId: currentGame.gameId.toString(),
        name: localStorage.getItem('username'),
      });
    }

    if (currentGame.gameOver) {
      setGameOver(true);
      setIsWinner(currentGame.isPlayerWinner);
    }
  }, [currentGame, navigate]);

  return (
    <>
      {gameOver && <FinalScreen profileIcon={profileIcon} isWinner={isWinner} />}
      <section className={`${battleground} bg-cover w-full h-full`}>
        {loading && <Loader />}
        <Board />
      </section>
    </>
  );
}

export default Game;
