import { combineReducers } from 'redux';
import handReducer from './handReducer';
import userReducer from './userReducer';
import opponentReducer from './opponentReducer';
import characterReducer from './characterReducer';
import boardReducer from './boardReducer';
import opponentHandCountReducer from './opponentHandCountReducer';
import turnReducer from './turnReducer';
import currentGameReducer from './currentGameReducer';

const rootReducer = combineReducers({
  hand: handReducer,
  user: userReducer,
  opponent: opponentReducer,
  character: characterReducer,
  board: boardReducer,
  handCount: opponentHandCountReducer,
  turn: turnReducer,
  current: currentGameReducer,
});

export default rootReducer;
