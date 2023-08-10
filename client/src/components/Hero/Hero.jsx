import { Tooltip } from 'react-tooltip';

/**
 * Hero component represents the hero character in the game.
 *
 * @component
 * @param {object} props - The component props.
 * @param {object} props.character - The character object containing health and mana information.
 * @param {number} props.character.health - The current health of the hero.
 * @param {object} props.character.mana - The mana information of the hero.
 * @param {number} props.character.mana.current - The current mana of the hero.
 * @param {number} props.character.mana.total - The total mana of the hero.
 * @param {boolean} props.isOpponent - Flag indicating
 * if the hero is an opponent (true) or the player (false).
 * @param {string} props.name - The name of the hero.
 * @param {boolean} props.isOver - Flag indicating if the hero is being hovered over.
 * @param {React.RefObject} props.heroRef - React reference object for the hero element.
 * @returns {JSX.Element} The JSX element representing the Hero component.
 */
function Hero({
  character, isOpponent, name, isOver, heroRef, profileIcon,
}) {
  const { health, mana } = character;

  /**
   * Determines the health bar colors based on the current health value.
   * @param {number} hp - The current health of the hero.
   * @returns {string} The CSS class representing the health bar color.
   */
  const getHealthColours = (hp) => {
    if (hp >= 15) {
      return 'bg-green-500';
    } if (hp >= 8) {
      return 'bg-orange-500';
    }
    return 'bg-red-500';
  };

  return (
    <div ref={heroRef} className="flex items-center justify-center mt-4">
      {isOver && (
        <div className="absolute w-[60%] h-[30%] rounded-xl bg-red-500 bg-opacity-50" />
      )}
      <img
        data-testid="player"
        id={`Player-${isOpponent ? '1' : '2'}`}
        src={isOpponent ? '/player02.jpg' : `/player${profileIcon}.jpg`}
        alt="player-icon"
        className="w-14 h-14 object-contain rounded-full"
      />

      <div
        data-testid="health"
        id={`Health-${isOpponent ? '1' : '2'}`}
        className="flex flex-row bg-white rounded-md p-2 sm:min-w-[512px] min-w-[312px] sm:min-h-[48px] min-h-[40px] bg-opacity-10 backdrop-filter backdrop-blur-lg mx-3"
      >
        {[...Array(Math.abs(health)).keys()].map((item, _index) => (
          <div
            key={`player-item-${item}`}
            className={`sm:w-4 w-2 sm:h-8 h-6 rounded-sm ${getHealthColours(
              health,
            )} mr-1`}
          />
        ))}
      </div>
      <div
        data-testid="mana"
        id={`Mana-${isOpponent ? '1' : '2'}`}
        className="flex items-center justify-center bg-blue-700 backdrop-filter backdrop-blur-lg bg-opacity-10 w-20 h-14 rounded-full text-white font-extrabold text-2xl"
      >
        {mana.current}
      </div>

      <Tooltip
        data-testid="name"
        anchorSelect={`#Player-${isOpponent ? '1' : '2'}`}
      >
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
            / 30
          </span>
        </p>
      </Tooltip>
      <Tooltip
        data-testid="mana"
        anchorSelect={`#Mana-${isOpponent ? '1' : '2'}`}
      >
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
