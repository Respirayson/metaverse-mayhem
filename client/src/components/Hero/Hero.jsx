import { useEffect } from 'react';
import { Tooltip } from 'react-tooltip';
import sparcle from '../../utils/animations';

/**
 * Component representing the hero character
 * @param {object} props - The component props
 * @param {object} props.character - The character object containing health and mana information
 * @param {number} props.character.health - The current health of the hero
 * @param {object} props.character.mana - The mana information of the hero
 * @param {number} props.character.mana.current - The current mana of the hero
 * @param {number} props.character.mana.total - The total mana of the hero
 * @returns {JSX.Element} - The JSX element
 */
function Hero({
  character, isOpponent, name, isOver, heroRef, getCoords,
}) {
  const { health, mana } = character;

  useEffect(() => {
    if (health < 30) {
      sparcle(getCoords(heroRef));
    }
  }, [getCoords, health, heroRef]);

  const getHealthColours = (hp) => (hp >= 15 ? 'bg-green-500' : hp >= 8 ? 'bg-orange-500' : 'bg-red-500');

  return (
    <div ref={heroRef} className="flex items-center justify-center mt-4">
      {isOver && <div className="absolute w-[60%] h-[30%] rounded-xl bg-red-500 bg-opacity-50" />}
      <img data-testid="player" id={`Player-${isOpponent ? '1' : '2'}`} src={isOpponent ? '/player02.jpg' : '/player01.jpg'} alt="player-icon" className="w-14 h-14 object-contain rounded-full" />

      <div data-testid="health" id={`Health-${isOpponent ? '1' : '2'}`} className="flex flex-row bg-white rounded-md p-2 sm:min-w-[512px] min-w-[312px] sm:min-h-[48px] min-h-[40px] bg-opacity-10 backdrop-filter backdrop-blur-lg mx-3">
        {[...Array(Math.abs(health)).keys()].map((item, _index) => (
          <div
            key={`player-item-${item}`}
            className={`sm:w-4 w-2 sm:h-8 h-6 rounded-sm ${getHealthColours(health)} mr-1`}
          />
        ))}
      </div>
      <div data-testid="mana" id={`Mana-${isOpponent ? '1' : '2'}`} className="flex items-center justify-center bg-blue-700 backdrop-filter backdrop-blur-lg bg-opacity-10 w-20 h-14 rounded-full text-white font-extrabold text-2xl">
        {mana.current}
      </div>

      <Tooltip data-testid="name" anchorSelect={`#Player-${isOpponent ? '1' : '2'}`}>
        <p className="font-medium">
          <span className="font-extrabold text-white">Name:</span>
          {' '}
          {name}
        </p>
      </Tooltip>
      <Tooltip anchorSelect={`#Health-${isOpponent ? '1' : '2'}`}>
        <p className="font-medium">
          <span className="font-extrabold text-white">
            Health:
            {' '}
            {health}
            {' '}
            /
            {' '}
            30

          </span>
        </p>
      </Tooltip>
      <Tooltip data-testid="mana" anchorSelect={`#Mana-${isOpponent ? '1' : '2'}`}>
        <p className="font-medium">
          <span className="font-extrabold text-white">
            Mana:
            {' '}
            {mana.current}
            {' '}
            /
            {' '}
            {mana.total}

          </span>
        </p>
      </Tooltip>
    </div>
  );
}

export default Hero;
