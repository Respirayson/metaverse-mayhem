import handReducer from "./handReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    hand: handReducer,
});

export default rootReducer;