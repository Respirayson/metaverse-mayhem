import { motion } from 'framer-motion';

import { useLottie } from 'lottie-react';
import { newFeatures } from '../constants';
import { dioramaAnimation, staggerContainer, fadeIn } from '../utils/motion';
import { TitleText, TypingText } from './Texts';
import FeatureCard from './FeatureCard';
import features from '../assets/features.json';

function NewFeatures() {
  const options = {
    animationData: features,
    loop: true,
  };

  const { View } = useLottie(options);

  return (
    <section className="sm:p-16 xs:p-8 px-6 py-12 relative z-10">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className="2xl:max-w-[1280px] w-full mx-auto flex lg:flex-row flex-col gap-8"
      >
        <motion.div
          variants={fadeIn('right', 'tween', 0.2, 1)}
          className="flex-[0.95] flex justify-center flex-col"
        >
          <TypingText title="| Whats new?" />
          <TitleText title={<>What's new about Metaverse Mayhem?</>} />
          <div className="mt-[48px] flex flex-wrap justify-between gap-[24px]">
            {newFeatures.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={dioramaAnimation('right')}
          className="flex-1 flex justify-center items-center"
        >
          <div className="w-[90%] h-[90%] object-contain">
            {View}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default NewFeatures;
