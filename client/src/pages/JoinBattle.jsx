import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { Alert, CustomInput } from "../components";
import allActions from "../actions";
import { socket } from "../utils/socket";
import { WebContext } from "../context/WebContext";

function JoinBattle() {
  const [gameId, setGameId] = useState("");
  const [username, setUsername] = useState("");
  const { setShowAlert, setAlertMessage, setSuccess } = useContext(WebContext);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, []);

  const joinNewGame = async (gameId) => {
    // const res = await fetch(`https://metaverse-mayhem.onrender.com/api/v1/game/?gameId=${gameId}`)
    // const data = await res.json();
    // if (data !== null) {
    dispatch(allActions.beforeGameActions.joinGame(gameId));
    socket.emit("joinGame", { gameId, name: username });
    setShowAlert(true);
    setSuccess(true);
    setAlertMessage("Joined game successfully");
    setTimeout(() => {
      navigate(`/game/${gameId}`);
    }, 2000);
    // } else {
    //   setAlertMessage("Game not found");
    // }
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
          <h1 className="flex font-bold text-white sm:text-6xl text-4xl head-text">
            Join a Game
          </h1>
        </div>
        <p className="font-normal text-[24px] text-white my-10">
          Join already existing games
        </p>

        <div className="gradient-04 z-0" />
        <CustomInput
          label="Game ID"
          placeHolder="Enter Game ID"
          value={gameId}
          handleValueChange={setGameId}
        />
        <button
          type="button"
          onClick={handleClick}
          className="mt-6 px-4 py-2 rounded-lg bg-siteBlue w-fit text-white font-bold z-10 relative"
        >
          Join a specific game
        </button>

        <p
          className="font-medium text-lg text-siteBlue cursor-pointer mt-4"
          onClick={() => navigate("/game/new")}
        >
          Or create a new battle
        </p>
      </div>
    </div>
  );
}

export default JoinBattle;
