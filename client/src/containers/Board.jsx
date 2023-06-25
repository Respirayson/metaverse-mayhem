import PlayerContainer from "./PlayerContainer";
import OpponentContainer from "./OpponentContainer";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import allActions from "../actions";

const Board = () => {
	const { user, board, opponent, handCount, character, turn } = useSelector(
		(state) => state
	);
	console.log(turn ? "Your turn" : "Enemy turn");

	const dispatch = useDispatch();

	const endTurn = () => {
		dispatch(allActions.gameActions.endTurn());
	};

	return (
		<DndProvider backend={HTML5Backend}>
			<div className="w-full mt-24">
				<OpponentContainer
					board={board.Opponent}
					name={opponent}
					handCount={handCount}
					character={character.Enemy}
				/>
				<PlayerContainer
					name={user}
					board={board.Player}
					character={character.Player}
					playerTurn={turn}
					onClick={endTurn}
					turn={turn}
				/>
			</div>
		</DndProvider>
	);
};

export default Board;
