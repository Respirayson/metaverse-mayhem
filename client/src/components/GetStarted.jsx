import { motion } from 'framer-motion';
import { useLottie } from 'lottie-react';
import { features } from '../constants';
import { staggerContainer, fadeIn, dioramaAnimation } from '../utils/motion';
import { TypingText, TitleText } from './Texts';
import Starter from './Starter';
import bitcoinCity from '../assets/bitcoinCity.json';

/**
 * Component for rendering the "Get Started" section with animation.
 * @returns {JSX.Element} GetStarted component.
 */
function GetStarted() {
  const options = {
    animationData: bitcoinCity,
    loop: true,
  };

  const { View } = useLottie(options);

  return (
    <section data-testid="lottie-view" className="sm:p-16 xs:p-8 px-6 py-12 relative z-10">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className="2xl:max-w-[1280px] w-full mx-auto flex lg:flex-row flex-col gap-8"
      >
        <motion.div
          variants={dioramaAnimation('left')}
          className="flex-1 flex justify-center items-center"
        >
          <div className="w-[90%] h-[90%] object-contain">
            {View}
          </div>
        </motion.div>
        <motion.div
          variants={fadeIn('left', 'tween', 0.2, 1)}
          className="flex-[0.75] flex justify-center flex-col"
        >
          <TypingText title="| How Metaverse Mayhem Works" />
          <TitleText title={<>Get started with just a few clicks</>} />
          <div className="mt-[31px] flex flex-col max-w-[370px] gap-[24px]">
            {features.map((feature, index) => (
              <Starter
                key={feature}
                number={`${index < 10 ? '0' : ''} ${index + 1}`}
                text={feature}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default GetStarted;
