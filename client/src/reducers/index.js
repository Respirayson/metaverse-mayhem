import deckReducer from "./deckReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    deckReducer,
});

export default rootReducer;