import { useState } from 'react';
import { motion } from 'framer-motion';

import { exploreCards } from '../constants';
import { staggerContainer } from '../utils/motion';
import { TypingText, TitleText } from './Texts';
import ExploreCard from './ExploreCard';

function Explore() {
  const [active, setActive] = useState('card-2');

  return (
    <section data-testid="explore" className="sm:p-16 xs:p-8 px-6 py-12" id="explore">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className="2xl:max-w-[1280px] w-full mx-auto flex flex-col"
      >
        <TypingText title="| Trading Cards" textStyles="text-center" />
        <TitleText
          title={(
            <>
              Collect your favorite
              <br className="md:block hidden" />
              {' '}
              Characters
            </>
)}
          textStyles="text-center"
        />
        <div className="mt-[50px] flex lg:flex-row flex-col min-h-[70vh] gap-5">
          {exploreCards.map((card, index) => (
            <ExploreCard
              key={card.id}
              {...card}
              index={index}
              active={active}
              handleClick={setActive}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default Explore;
