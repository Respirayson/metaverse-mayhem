import mongoose from 'mongoose';

const GameSchema = new mongoose.Schema({
  gameId: { type: Number, required: true },
});

const Game = mongoose.model('Game', GameSchema);

export default Game;
