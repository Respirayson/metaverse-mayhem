import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import allActions from "../actions";
import { socket } from "../utils/socket";
import { useNavigate } from "react-router-dom";

const GameNewScreen = () => {
	const currentGame = useSelector((state) => state.current);
	console.log(currentGame);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { loading, gameId, hasOpponent } = currentGame;
	const previousGameId = useRef(gameId);

	useEffect(() => {
		dispatch(allActions.beforeGameActions.fetchNewGame(true)).then(
			(gameId) => {
				socket.emit("joinGame", { gameId });
			}
		);
	}, [dispatch]);

	useEffect(() => {
		if (previousGameId !== gameId) {
			socket.on("playerJoined", ({ playerCount }) => {
				console.log("player joined");
				if (playerCount === 2) {
					console.log("running");
					dispatch(
						allActions.beforeGameActions.updateHasOpponent(true)
					);
					navigate(`/game/${gameId}`);
				}
			});
		}
	}, [dispatch, gameId, navigate]);

	const joinNewGame = (gameId) => {
		dispatch(allActions.beforeGameActions.joinGame(gameId));
		socket.emit("joinGame", { gameId });
		navigate(`/game/${gameId}`);
	};

	const promptForGameId = () => {
		const gameId = prompt("Enter game ID");

		console.log("gameId is", gameId);
		if (gameId) {
			joinNewGame(gameId);
		}
	};

	return (
		<div className="text-white">
			<h1>Game New Screen</h1>
			<div>
				<p>
					Loading:{" "}
					{loading ? (
						<img
							src="http://chimplyimage.appspot.com/images/samples/classic-spinner/animatedCircle.gif"
							className="w-[16px] h-[16px]"
						/>
					) : (
						"no"
					)}
				</p>
				<p>found opponent? {hasOpponent ? "yes" : "no"}</p>
				{gameId ? (
					<div className="mt-4">
						<p>Hey dude, send this ID to your friend 😁</p>
						<div className="bg-gray-200 p-8 rounded-md text-black">
							{loading ? "Creating new Game ID" : `${gameId}`}
						</div>
						<div className="mt-4">
							<button onClick={() => navigate(`/game/${gameId}`)} className="mr-4 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd] font-semibold">
								Join Current Game
							</button>
							<button onClick={promptForGameId} className="mr-4 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd] font-semibold">
								Join Specific Game
							</button>
						</div>
					</div>
				) : null}
			</div>
		</div>
	);
};

export default GameNewScreen;
