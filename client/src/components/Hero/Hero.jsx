
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
const Hero = (props) => {
    const { health, mana } = props.character;

    return (
        <div className="flex flex-col">
            <div className="w-[150px] h-[40px] bg-red-700 rounded">
                Health: {health}
            </div>
            <div className="w-[150px] h-[40px] bg-blue-700 rounded">
                Mana: {mana.current} / {mana.total}
            </div>
        </div>
    );
};

export default Hero;
