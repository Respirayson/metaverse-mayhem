import { Board } from "../containers/";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Game = () => {
  const currentGame = useSelector((state) => state.current);
  console.log(currentGame);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(currentGame);
    if (!currentGame.gameId) {
      navigate("/game/new");
    }
  }, [currentGame, navigate]);


  return (
    <section className="bg-board bg-cover w-full h-100vh">
      <Board />
    </section>
  );
};

export default Game;
