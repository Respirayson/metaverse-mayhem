import { Link } from 'react-router-dom';

function StartScreen() {
  return (
    <div className="text-white p-16">
      <h1 className="text-3xl my-8">Welcome to Metaverse Mayhem</h1>
      <button className="bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd] font-semibold">
        <Link to="/game/new">Start Game</Link>
      </button>
    </div>
  );
}

export default StartScreen;
