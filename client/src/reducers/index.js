import handReducer from "./handReducer";
import userReducer from "./userReducer";
import opponentReducer from "./opponentReducer";
import characterReducer from "./characterReducer";
import boardReducer from "./boardReducer";
import opponentHandCountReducer from "./opponentHandCountReducer";
import deckCountReducer from "./deckCountReducer";

import { combineReducers } from "redux";


const rootReducer = combineReducers({
    hand: handReducer,
    user: userReducer,
    opponent: opponentReducer,
    character: characterReducer,
    board: boardReducer,
    handCount: opponentHandCountReducer,
    deckCount: deckCountReducer,
});

export default rootReducer;