import handReducer from "./handReducer";
import userReducer from "./userReducer";
import opponentReducer from "./opponentReducer";
import characterReducer from "./characterReducer";
import boardReducer from "./boardReducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
    hand: handReducer,
    user: userReducer,
    opponent: opponentReducer,
    character: characterReducer,
    board: boardReducer,
});

export default rootReducer;