import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Board } from '../containers';
import bg from '../assets/bg.mp3';
import { Loader } from '../components';

function Game() {
  const currentGame = useSelector((state) => state.current);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.querySelector('footer').style.display = 'none';
    document.querySelector('header').style.display = 'none';
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      document.querySelector('footer').style.display = 'block';
      document.querySelector('header').style.display = 'block';
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
    }
  }, [currentGame, navigate]);

  return (
    <section className="bg-board1 bg-cover w-full h-full">
      {loading && <Loader />}
      <Board />
    </section>
  );
}

export default Game;
