import { motion } from 'framer-motion';

import { fadeIn } from '../utils/motion';

/**
 * Component for rendering an Explore Card on the Explore section of the Trading Cards page.
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.id - Unique ID of the card.
 * @param {string} props.imgUrl - URL of the card image.
 * @param {string} props.title - Title of the card.
 * @param {number} props.index - Index of the card in the exploreCards array.
 * @param {string} props.active - ID of the active card.
 * @param {Function} props.handleClick - Function to handle the click event on the card.
 * @returns {JSX.Element} ExploreCard component.
 */
function ExploreCard({
  id, imgUrl, title, index, active, handleClick,
}) {
  return (
    <motion.div
      variants={fadeIn('right', 'spring', index * 0.5, 0.75)}
      className={`relative ${
        active === id ? 'lg:flex-[3.5] flex-[10]' : 'lg:flex-[0.5] flex-[2]'
      } flex items-center justify-center min-w-[170px] h-[700px] transition-[flex] duration-[0.7s] ease-out-flex cursor-pointer`}
      onClick={() => handleClick(id)}
    >
      <img
        src={imgUrl}
        alt="card-04"
        className="absolute w-full h-full object-cover rounded-[24px]"
      />
      {active !== id ? (
        <h3 className="font-semibold sm:text-[26px] text-[18px] absolute z-0 lg:bottom-20 lg:rotate-[-90deg] lg:origin-[0,0]">
          {title}
        </h3>
      ) : (
        <div className="absolute bottom-0 p-8 flex justify-start w-full flex-col bg-[rgba(0,0,0,0.5)] rounded-b-[24px]">
          <div
            className="flex justify-center items-center w-[60px] h-[60px] rounded-[24px] glassmorphism mb-[16px]"
          >
            <img
              src="/playingcards.svg"
              alt="playingcards"
              className="w-1/2 h-1/2 object-contain"
            />
          </div>
          <p className="font-normal text-[16px] leading-[20.16px] text-white uppercase">
            Enter Metaverse Mayhem
          </p>
          <h2 className="mt-[24px] font-semibold sm:text-[32px] text-[24px] text-white">
            {title}
          </h2>
        </div>
      )}
    </motion.div>
  );
}

export default ExploreCard;
