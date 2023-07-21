import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Board } from '../containers';
import bg from '../assets/bg.mp3';
import { FinalScreen, Loader } from '../components';
import { socket } from '../utils/socket';

function Game() {
  const currentGame = useSelector((state) => state.current);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [isWinner, setIsWinner] = useState(false);

  useEffect(() => {
    document.querySelector('footer').style.display = 'none';
    document.querySelector('header').style.display = 'none';
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      document.querySelector('footer').style.display = 'block';
      document.querySelector('header').style.display = 'block';
      localStorage.removeItem('persist:root');
      localStorage.removeItem('gameId');
      window.location.reload();
    };
  }, []);

  useEffect(() => {
    const audio = new Audio(bg);
    audio.play();

    return () => {
      audio.pause();
    };
  }, []);

  useEffect(() => {
    if (!currentGame.gameId) {
      navigate('/game/new');
    } else {
      localStorage.setItem('gameId', currentGame.gameId);
      navigate(`/game/${currentGame.gameId}`);
      socket.emit('joinGame', {
        gameId: currentGame.gameId,
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
      {gameOver && <FinalScreen isWinner={isWinner} />}
      <section className="bg-board1 bg-cover w-full h-full">
        {loading && <Loader />}
        <Board />
      </section>
    </>
  );
}

export default Game;
