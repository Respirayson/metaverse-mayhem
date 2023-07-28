export const transition = { type: 'spring', duration: 0.8 };

export const textVariant = (delay) => ({
  hidden: {
    y: 50,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      duration: 1.25,
      delay,
    },
  },
});

export const textVariant2 = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'tween',
      ease: 'easeIn',
    },
  },
};

export const textContainer = {
  hidden: {
    opacity: 0,
  },
  show: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: i * 0.1 },
  }),
};

export const staggerContainer = (staggerChildren, delayChildren) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const navVariants = {
  hidden: {
    opacity: 0,
    y: -50,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 140,
    },
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      delay: 1,
    },
  },
};

/**
 * Generates a slide animation object based on the specified direction
 * @param {string} direction - The direction of the slide animation
 * ("left", "right", "up", or "down")
 * @returns {object} - The slide animation object with initial, animate, and exit properties
 */
export const slideAnimation = (direction) => {
  let x = 0;
  let y = 0;
  let exitX = 0;
  let exitY = 0;

  if (direction === 'left') {
    x = -100;
    exitX = -100;
  } else if (direction === 'right') {
    x = 100;
    exitX = 100;
  }

  if (direction === 'up') {
    y = 100;
    exitY = 100;
  } else if (direction === 'down') {
    y = -100;
    exitY = -100;
  }

  return {
    initial: {
      x,
      y,
      opacity: 0,
      transition: { ...transition, delay: 0.5 },
    },
    animate: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: { ...transition, delay: 0 },
    },
    exit: {
      x: exitX,
      y: exitY,
      transition: { ...transition, delay: 0 },
    },
  };
};

export const slideIn = (direction, type, delay, duration) => {
  let x = 0;
  let y = 0;

  if (direction === 'left') {
    x = '-100%';
  } else if (direction === 'right') {
    x = '100%';
  }

  if (direction === 'up' || direction === 'down') {
    y = '100%';
  }

  return {
    hidden: {
      x,
      y,
    },
    show: {
      x: 0,
      y: 0,
      transition: {
        type,
        delay,
        duration,
        ease: 'easeOut',
      },
    },
  };
};

/**
 * The fade animation object with initial, animate, and exit properties
 */
export const fadeAnimation = {
  initial: {
    opacity: 0,
    transition: { ...transition, delay: 0.5 },
  },
  animate: {
    opacity: 1,
    transition: { ...transition, delay: 0 },
  },
  exit: {
    opacity: 0,
    transition: { ...transition, delay: 0 },
  },
};

export const fadeIn = (direction, type, delay, duration) => {
  let x = 0;
  let y = 0;

  if (direction === 'left') {
    x = 100;
  } else if (direction === 'right') {
    x = -100;
  }

  if (direction === 'up') {
    y = 100;
  } else if (direction === 'down') {
    y = -100;
  }

  return {
    hidden: {
      x,
      y,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type,
        delay,
        duration,
        ease: 'easeOut',
      },
    },
  };
};

export const dioramaAnimation = (direction) => ({
  hidden: {
    x: direction === 'left' ? '-100%' : '100%',
    rotate: 120,
  },
  show: {
    x: 0,
    rotate: 0,
    transition: {
      type: 'spring',
      duration: 1.8,
      delay: 0.5,
    },
  },
});

export const footerVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 140,
    },
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      delay: 0.5,
    },
  },
};
