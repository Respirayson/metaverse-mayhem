import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Board } from "../containers";
import { useState } from "react";

function Game() {
  const currentGame = useSelector((state) => state.current);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.querySelector("footer").style.display = "none";
    document.querySelector("header").style.display = "none";
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (!currentGame.gameId) {
      document.querySelector("footer").style.display = "block";
      document.querySelector("header").style.display = "block";
      navigate("/game/new");
    }
  }, [currentGame, navigate]);

  return (
    <section className="bg-board1 bg-cover w-full h-full">
      {loading && (
        <div className="preloader">
          <div className="preloader-wrapper">
            <div className="loading">
              <div className="circle" />
              <div className="circle" />
              <div className="circle" />
            </div>
          </div>
        </div>
      )}
      <Board />
    </section>
  );
}

export default Game;
