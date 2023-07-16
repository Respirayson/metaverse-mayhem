import { motion } from 'framer-motion';
import { TypingText } from './Texts';

import { fadeIn, staggerContainer } from '../utils/motion';

function About() {
  return (
    <section data-testid="component" className="sm:p-16 xs:p-8 px-6 py-12 relative z-10">
      <div className="gradient-02 z-0" />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className="2xl:max-w-[1280px] w-full mx-auto flex justify-center items-center flex-col"
      >
        <TypingText title="| About Metaverse Mayhem" textStyles="text-center" />

        <motion.p
          variants={fadeIn('up', 'tween', 0.2, 1)}
          className="mt-[8px] font-normal sm:text-[32px] text-[20px] text-center text-secondary-white"
        >
          <span className="font-extrabold text-white">Metaverse Mayhem</span>
          {' '}
          is a cutting-edge web3 card game designed for players who
          crave excitement, competition, and endless
          possibilities.
          {' '}
          <span className="font-extrabold text-white">
            Built on the ethereum net,
          </span>
          {' '}
          you can buy and sell your
          {' '}
          <span className="font-extrabold text-white">Trading Cards.</span>
          {' '}
          Build
          your decks. Everything is
          {' '}
          <span className="font-extrabold text-white">yours</span>
          {' '}
          for the taking. Let's
          {' '}
          <span className="font-extrabold text-white">explore</span>
          {' '}
          the metaverse by scrolling down
        </motion.p>

        <motion.img
          variants={fadeIn('up', 'tween', 0.3, 1)}
          src="/arrow-down.svg"
          alt="arrow down"
          className="w-[18px] h-[28px] object-contain mt-[28px]"
        />
      </motion.div>
    </section>
  );
}

export default About;
