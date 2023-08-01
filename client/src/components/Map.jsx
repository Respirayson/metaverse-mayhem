import { motion } from 'framer-motion';

import { fadeIn, staggerContainer } from '../utils/motion';
import { TitleText, TypingText } from './Texts';

/**
 * Component for rendering the multiplayer map section with interactive elements.
 * @returns {JSX.Element} Map component.
 */
function Map() {
  return (
    <section className="sm:p-16 xs:p-8 px-6 py-12 relative z-10">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className="2xl:max-w-[1280px] w-full mx-auto flex flex-col"
      >
        <TypingText title="| Multiplayer" textStyles="text-center" />
        <TitleText
          title={(
            <>
              Invite your friends all over the world to play with you
            </>
          )}
          textStyles="text-center"
        />

        <motion.div
          variants={fadeIn('up', 'tween', 0.3, 1)}
          className="relative mt-[68px] flex w-full h-[550px]"
        >
          {/* The map image */}
          <img src="/map.png" alt="map" className="w-full h-full object-cover" />

          {/* Interactive icons on the map */}
          <div className="absolute bottom-20 right-20 w-[70px] h-[70px] p-[6px] rounded-full bg-[#5D6680]">
            <img src="people-01.png" alt="people" className="w-full h-full" />
          </div>

          <div className="absolute top-10 left-20 w-[70px] h-[70px] p-[6px] rounded-full bg-[#5D6680]">
            <img src="/people-02.png" alt="people" className="w-full h-full" />
          </div>

          <div className="absolute top-1/2 left-[45%] w-[70px] h-[70px] p-[6px] rounded-full bg-[#5D6680]">
            <img src="people-03.png" alt="people" className="w-full h-full" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Map;
