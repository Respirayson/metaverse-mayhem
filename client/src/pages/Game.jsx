import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Board } from '../containers';

function Game() {
  const currentGame = useSelector((state) => state.current);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentGame.gameId) {
      navigate('/game/new');
    }
  }, [currentGame, navigate]);

  return (
    <section className="bg-board1 bg-cover w-full h-100vh">
      <Board />
    </section>
  );
}

export default Game;
