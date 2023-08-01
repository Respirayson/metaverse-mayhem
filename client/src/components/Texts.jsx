import { motion } from 'framer-motion';
import { textContainer, textVariant2 } from '../utils/motion';

/**
 * TypingText component to display text with a typing effect.
 * @param {Object} props - The props passed to the TypingText component.
 * @param {string} props.title - The text to be displayed with a typing effect.
 * @param {string} props.textStyles - Additional CSS classes for custom styling.
 * @returns {JSX.Element} TypingText component.
 */
export function TypingText({ title, textStyles }) {
  return (
    <motion.p
      variants={textContainer}
      className={`font-normal text-[14px] text-secondary-white ${textStyles}`}
    >
      {Array.from(title).map((letter, index) => (
        <motion.span variants={textVariant2} key={index}>
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.p>
  );
}

/**
 * TitleText component to display a title.
 * @param {Object} props - The props passed to the TitleText component.
 * @param {string} props.title - The title to be displayed.
 * @param {string} props.textStyles - Additional CSS classes for custom styling.
 * @returns {JSX.Element} TitleText component.
 */
export function TitleText({ title, textStyles }) {
  return (
    <motion.h2
      variants={textVariant2}
      initial="hidden"
      whileInView="show"
      className={`mt-[8px] font-bold md:text-[64px] text-[40px] text-white ${textStyles}`}
    >
      {title}
    </motion.h2>
  );
}
