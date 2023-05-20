import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '../reducers';

const initialState = { cards: [
  { id: 1, name: 'Gabria Warden', mana: 1, attack: 5, defense: 1 },
  { id: 2, name: 'Abusive Sergeant', mana: 1, attack: 2, defense: 1 },
  { id: 3, name: 'Acolyte of Pain', mana: 3 },
  { id: 4, name: 'Azure Drake', mana: 5, attack: 4, defense: 4 },
]};


export default configureStore({
  reducer: rootReducer,
  preloadedState: {hand: initialState}
})