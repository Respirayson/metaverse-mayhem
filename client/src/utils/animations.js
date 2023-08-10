// Import the attack sound file
import attack from '../assets/Laser1.wav';

// Function to add prefixed event listener to an element
const prefixes = ['webkit', 'moz', 'ms', ''];
const prefixedEvent = (element, type, callback) => {
  for (let p = 0; p < prefixes.length; p += 1) {
    if (!prefixes[p]) type = type.toLowerCase();
    element.addEventListener(prefixes[p] + type, callback, false);
  }
};

// Function to apply transformation styles to an element
const transform = ($e, xValue, yValue, scaleValue, rotationValue, percent) => {
  // Set default values if not provided
  const x = xValue || 0;
  const y = yValue || 0;
  const scale = scaleValue || 1;
  const unit = percent ? '%' : 'px';
  const rotation = rotationValue || 0;

  const transfromString = `translate(${x}${unit}, ${y}${unit}) `
    + `scale(${scale}) `
    + `rotate(${rotation}deg)`;

  // Apply the transformation styles using different browser-specific prefixes
  $e.style.webkitTransform = transfromString;
  $e.style.MozTransform = transfromString;
  $e.style.transform = transfromString;
};

// Function to play the attack sound
const playAttackSound = () => {
  const audio = new Audio(attack);
  audio.volume = 0.1;
  return audio.play();
};

// Function to create a particle element for an explosion animation
const createParticle = (x, y, scale) => {
  const $particle = document.createElement('i');
  const $sparkle = document.createElement('i');

  $particle.className = 'particle';
  $sparkle.className = 'sparkle';

  // Apply transformation styles to the particle element
  transform($particle, x, y, scale);
  $particle.appendChild($sparkle);

  return $particle;
};

// Function to create an explosion animation
const explode = ($container) => {
  const particles = [];

  // Create a set of particles for the explosion animation
  particles.push(createParticle(0, 0, 1));
  particles.push(createParticle(50, -15, 0.4));
  // ... (additional particle positions)
  particles.push(createParticle(80, -15, 0.1));

  particles.forEach((particle) => {
    // Add the particles to the container element and attach animation end event listeners
    $container.appendChild(particle);
    prefixedEvent(particle, 'AnimationEnd', () => {
      // Remove the particle element from the DOM after the animation ends
      const self = this;
      setTimeout(() => {
        requestAnimationFrame(() => {
          $container.removeChild(self);
        });
      }, 100);
    });

    // Remove any existing container elements with the class 'container'
    document.querySelectorAll('.container').forEach((el) => el.remove());
  });
};

// Function to create and trigger an explosion animation at a specific position
const explodeGroup = (x, y, trans) => {
  const $container = document.createElement('div');

  $container.className = 'container';
  $container.style.top = `${y}px`;
  $container.style.left = `${x}px`;

  // Apply transformation styles to the container element
  transform($container, trans.x, trans.y, trans.scale, trans.r, true);

  // Trigger the explosion animation inside the container element
  explode($container);
  return $container;
};

// Main function for creating and triggering explosion animations
export default function sparkle(event) {
  const explosions = [];

  // Create three different explosion groups at specific positions and scales
  explosions.push(
    explodeGroup(event.pageX, event.pageY, {
      scale: 1,
      x: -50,
      y: -50,
      r: 0,
    }),
  );
  explosions.push(
    explodeGroup(event.pageX, event.pageY, {
      scale: 0.5,
      x: -30,
      y: -50,
      r: 180,
    }),
  );
  explosions.push(
    explodeGroup(event.pageX, event.pageY, {
      scale: 0.5,
      x: -50,
      y: -20,
      r: -90,
    }),
  );

  // Play the attack sound and show the explosion animations in sequence
  requestAnimationFrame(() => {
    playAttackSound();
    explosions.forEach((boum, i) => {
      setTimeout(() => {
        document.body.appendChild(boum);
      }, i * 100);
    });
  });
}

// Function to get battle card coordinates from a card reference
export const getCoords = (cardRef) => {
  const {
    left, top, right, bottom,
  } = cardRef.current.getBoundingClientRect();

  return {
    pageX: (right - left) / 2,
    pageY: top + (bottom - top) / 2,
  };
};

// Function to get player card coordinates from a card reference
export const getPlayerCoords = (cardRef) => {
  const {
    left, top, right, bottom,
  } = cardRef.current.getBoundingClientRect();

  return {
    pageX: (right + left) / 2,
    pageY: (bottom + top) / 2,
  };
};
