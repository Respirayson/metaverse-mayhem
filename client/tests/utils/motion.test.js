import {
  slideAnimation,
  fadeAnimation,
  textVariant,
  textVariant2,
  textContainer,
  staggerContainer,
  navVariants,
  slideIn,
  fadeIn,
  dioramaAnimation,
  footerVariants,
} from "../../src/utils/motion";

describe("slideAnimation", () => {
  it("should return the correct animation properties for left direction", () => {
    const direction = "left";
    const animation = slideAnimation(direction);

    expect(animation.initial).toEqual({
      x: -100,
      y: 0,
      opacity: 0,
      transition: { type: "spring", duration: 0.8, delay: 0.5 },
    });
    expect(animation.animate).toEqual({
      x: 0,
      y: 0,
      opacity: 1,
      transition: { type: "spring", duration: 0.8, delay: 0 },
    });
    expect(animation.exit).toEqual({
      x: -100,
      y: 0,
      transition: { type: "spring", duration: 0.8, delay: 0 },
    });
  });

  it("should return the correct animation properties for right direction", () => {
    const direction = "right";
    const animation = slideAnimation(direction);

    expect(animation.initial).toEqual({
      x: 100,
      y: 0,
      opacity: 0,
      transition: { type: "spring", duration: 0.8, delay: 0.5 },
    });
    expect(animation.animate).toEqual({
      x: 0,
      y: 0,
      opacity: 1,
      transition: { type: "spring", duration: 0.8, delay: 0 },
    });
    expect(animation.exit).toEqual({
      x: 100,
      y: 0,
      transition: { type: "spring", duration: 0.8, delay: 0 },
    });
  });

  it("should return the correct animation properties for up direction", () => {
    const direction = "up";
    const animation = slideAnimation(direction);

    expect(animation.initial).toEqual({
      x: 0,
      y: 100,
      opacity: 0,
      transition: { type: "spring", duration: 0.8, delay: 0.5 },
    });
    expect(animation.animate).toEqual({
      x: 0,
      y: 0,
      opacity: 1,
      transition: { type: "spring", duration: 0.8, delay: 0 },
    });
    expect(animation.exit).toEqual({
      x: 0,
      y: 100,
      transition: { type: "spring", duration: 0.8, delay: 0 },
    });
  });

  it("should return the correct animation properties for down direction", () => {
    const direction = "down";
    const animation = slideAnimation(direction);

    expect(animation.initial).toEqual({
      x: 0,
      y: -100,
      opacity: 0,
      transition: { type: "spring", duration: 0.8, delay: 0.5 },
    });
    expect(animation.animate).toEqual({
      x: 0,
      y: 0,
      opacity: 1,
      transition: { type: "spring", duration: 0.8, delay: 0 },
    });
    expect(animation.exit).toEqual({
      x: 0,
      y: -100,
      transition: { type: "spring", duration: 0.8, delay: 0 },
    });
  });
});

describe("fadeAnimation", () => {
  it("should return the correct animation properties", () => {
    const animation = fadeAnimation;

    expect(animation.initial).toEqual({
      opacity: 0,
      transition: { type: "spring", duration: 0.8, delay: 0.5 },
    });
    expect(animation.animate).toEqual({
      opacity: 1,
      transition: { type: "spring", duration: 0.8, delay: 0 },
    });
    expect(animation.exit).toEqual({
      opacity: 0,
      transition: { type: "spring", duration: 0.8, delay: 0 },
    });
  });
});

describe("textVariant", () => {
  it("should return the correct animation properties for the 'show' variant", () => {
    const delay = 0.5;
    const variant = textVariant(delay);

    expect(variant.hidden).toEqual({
      y: 50,
      opacity: 0,
    });
    expect(variant.show).toEqual({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 1.25,
        delay: delay,
      },
    });
  });
});

describe("textVariant2", () => {
  it("should return the correct animation properties for the 'show' variant", () => {
    const variant = textVariant2;

    expect(variant.hidden).toEqual({
      opacity: 0,
      y: 20,
    });
    expect(variant.show).toEqual({
      opacity: 1,
      y: 0,
      transition: {
        type: "tween",
        ease: "easeIn",
      },
    });
  });
});

describe("textContainer", () => {
  it("should return the correct animation properties for the 'show' variant", () => {
    const i = 1;
    const container = textContainer.show(i);

    expect(container.opacity).toBe(1);
    expect(container.transition).toEqual({
      staggerChildren: 0.1,
      delayChildren: i * 0.1,
    });
  });
});

describe("staggerContainer", () => {
  it("should return the correct animation properties for the 'show' variant", () => {
    const staggerChildren = 0.2;
    const delayChildren = 0.1;
    const container = staggerContainer(staggerChildren, delayChildren).show;

    expect(container.transition).toEqual({
      staggerChildren: staggerChildren,
      delayChildren: delayChildren,
    });
  });
});

describe("navVariants", () => {
  it("should return the correct animation properties for the 'hidden' variant", () => {
    const variant = navVariants.hidden;

    expect(variant.opacity).toBe(0);
    expect(variant.y).toBe(-50);
    expect(variant.transition).toEqual({
      type: "spring",
      stiffness: 300,
      damping: 140,
    });
  });

  it("should return the correct animation properties for the 'show' variant", () => {
    const variant = navVariants.show;

    expect(variant.opacity).toBe(1);
    expect(variant.y).toBe(0);
    expect(variant.transition).toEqual({
      type: "spring",
      stiffness: 80,
      delay: 1,
    });
  });
});

describe("slideIn", () => {
  it("should return the correct animation properties for the 'hidden' variant", () => {
    const direction = "left";
    const type = "tween";
    const delay = 0.5;
    const duration = 0.8;
    const variant = slideIn(direction, type, delay, duration).hidden;

    expect(variant.x).toBe("-100%");
    expect(variant.y).toBe(0);
  });

  it("should return the correct animation properties for the 'show' variant", () => {
    const direction = "left";
    const type = "tween";
    const delay = 0.5;
    const duration = 0.8;
    const variant = slideIn(direction, type, delay, duration).show;

    expect(variant.x).toBe(0);
    expect(variant.y).toBe(0);
    expect(variant.transition).toEqual({
      type: type,
      delay: delay,
      duration: duration,
      ease: "easeOut",
    });
  });

  it("should return the correct animation properties for the 'hidden' variant (right direction)", () => {
    const direction = "right";
    const type = "tween";
    const delay = 0.5;
    const duration = 0.8;
    const variant = slideIn(direction, type, delay, duration).hidden;

    expect(variant.x).toBe("100%");
    expect(variant.y).toBe(0);
  });

  it("should return the correct animation properties for the 'show' variant (right direction)", () => {
    const direction = "right";
    const type = "tween";
    const delay = 0.5;
    const duration = 0.8;
    const variant = slideIn(direction, type, delay, duration).show;

    expect(variant.x).toBe(0);
    expect(variant.y).toBe(0);
    expect(variant.transition).toEqual({
      type: type,
      delay: delay,
      duration: duration,
      ease: "easeOut",
    });
  });

  it("should return the correct animation properties for the 'hidden' variant (up direction)", () => {
    const direction = "up";
    const type = "tween";
    const delay = 0.5;
    const duration = 0.8;
    const variant = slideIn(direction, type, delay, duration).hidden;

    expect(variant.x).toBe(0);
    expect(variant.y).toBe("100%");
  });

  it("should return the correct animation properties for the 'show' variant (up direction)", () => {
    const direction = "up";
    const type = "tween";
    const delay = 0.5;
    const duration = 0.8;
    const variant = slideIn(direction, type, delay, duration).show;

    expect(variant.x).toBe(0);
    expect(variant.y).toBe(0);
    expect(variant.transition).toEqual({
      type: type,
      delay: delay,
      duration: duration,
      ease: "easeOut",
    });
  });

  it("should return the correct animation properties for the 'hidden' variant (down direction)", () => {
    const direction = "down";
    const type = "tween";
    const delay = 0.5;
    const duration = 0.8;
    const variant = slideIn(direction, type, delay, duration).hidden;

    expect(variant.x).toBe(0);
    expect(variant.y).toBe("100%");
  });

  it("should return the correct animation properties for the 'show' variant (down direction)", () => {
    const direction = "down";
    const type = "tween";
    const delay = 0.5;
    const duration = 0.8;
    const variant = slideIn(direction, type, delay, duration).show;

    expect(variant.x).toBe(0);
    expect(variant.y).toBe(0);
    expect(variant.transition).toEqual({
      type: type,
      delay: delay,
      duration: duration,
      ease: "easeOut",
    });
  });
});

describe("fadeIn", () => {
  it("should return the correct animation properties for the 'hidden' variant", () => {
    const direction = "left";
    const type = "tween";
    const delay = 0.5;
    const duration = 0.8;
    const variant = fadeIn(direction, type, delay, duration).hidden;

    expect(variant.x).toBe(100);
    expect(variant.y).toBe(0);
    expect(variant.opacity).toBe(0);
  });

  it("should return the correct animation properties for the 'show' variant", () => {
    const direction = "left";
    const type = "tween";
    const delay = 0.5;
    const duration = 0.8;
    const variant = fadeIn(direction, type, delay, duration).show;

    expect(variant.x).toBe(0);
    expect(variant.y).toBe(0);
    expect(variant.opacity).toBe(1);
    expect(variant.transition).toEqual({
      type: type,
      delay: delay,
      duration: duration,
      ease: "easeOut",
    });
  });

  it("should return the correct animation properties for the 'hidden' variant (right direction)", () => {
    const direction = "right";
    const type = "tween";
    const delay = 0.5;
    const duration = 0.8;
    const variant = fadeIn(direction, type, delay, duration).hidden;

    expect(variant.x).toBe(-100);
    expect(variant.y).toBe(0);
    expect(variant.opacity).toBe(0);
  });

  it("should return the correct animation properties for the 'show' variant (right direction)", () => {
    const direction = "right";
    const type = "tween";
    const delay = 0.5;
    const duration = 0.8;
    const variant = fadeIn(direction, type, delay, duration).show;

    expect(variant.x).toBe(0);
    expect(variant.y).toBe(0);
    expect(variant.opacity).toBe(1);
    expect(variant.transition).toEqual({
      type: type,
      delay: delay,
      duration: duration,
      ease: "easeOut",
    });
  });

  it("should return the correct animation properties for the 'hidden' variant (up direction)", () => {
    const direction = "up";
    const type = "tween";
    const delay = 0.5;
    const duration = 0.8;
    const variant = fadeIn(direction, type, delay, duration).hidden;

    expect(variant.x).toBe(0);
    expect(variant.y).toBe(100);
    expect(variant.opacity).toBe(0);
  });

  it("should return the correct animation properties for the 'show' variant (up direction)", () => {
    const direction = "up";
    const type = "tween";
    const delay = 0.5;
    const duration = 0.8;
    const variant = fadeIn(direction, type, delay, duration).show;

    expect(variant.x).toBe(0);
    expect(variant.y).toBe(0);
    expect(variant.opacity).toBe(1);
    expect(variant.transition).toEqual({
      type: type,
      delay: delay,
      duration: duration,
      ease: "easeOut",
    });
  });

  it("should return the correct animation properties for the 'hidden' variant (down direction)", () => {
    const direction = "down";
    const type = "tween";
    const delay = 0.5;
    const duration = 0.8;
    const variant = fadeIn(direction, type, delay, duration).hidden;

    expect(variant.x).toBe(0);
    expect(variant.y).toBe(-100);
    expect(variant.opacity).toBe(0);
  });

  it("should return the correct animation properties for the 'show' variant (down direction)", () => {
    const direction = "down";
    const type = "tween";
    const delay = 0.5;
    const duration = 0.8;
    const variant = fadeIn(direction, type, delay, duration).show;

    expect(variant.x).toBe(0);
    expect(variant.y).toBe(0);
    expect(variant.opacity).toBe(1);
    expect(variant.transition).toEqual({
      type: type,
      delay: delay,
      duration: duration,
      ease: "easeOut",
    });
  });
});

describe("dioramaAnimation", () => {
  it("should return the correct animation properties for the 'hidden' variant", () => {
    const direction = "left";
    const variant = dioramaAnimation(direction).hidden;

    expect(variant.x).toBe("-100%");
    expect(variant.rotate).toBe(120);
  });

  it("should return the correct animation properties for the 'show' variant", () => {
    const direction = "left";
    const variant = dioramaAnimation(direction).show;

    expect(variant.x).toBe(0);
    expect(variant.rotate).toBe(0);
    expect(variant.transition).toEqual({
      type: "spring",
      duration: 1.8,
      delay: 0.5,
    });
  });

  it("should return the correct animation properties for the 'hidden' variant", () => {
    const direction = "right";
    const variant = dioramaAnimation(direction).hidden;

    expect(variant.x).toBe("100%");
    expect(variant.rotate).toBe(120);
  });

  it("should return the correct animation properties for the 'show' variant", () => {
    const direction = "right";
    const variant = dioramaAnimation(direction).show;

    expect(variant.x).toBe(0);
    expect(variant.rotate).toBe(0);
    expect(variant.transition).toEqual({
      type: "spring",
      duration: 1.8,
      delay: 0.5,
    });
  });
});

describe("footerVariants", () => {
  it("should return the correct animation properties for the 'hidden' variant", () => {
    const variant = footerVariants.hidden;

    expect(variant.opacity).toBe(0);
    expect(variant.y).toBe(50);
    expect(variant.transition).toEqual({
      type: "spring",
      stiffness: 300,
      damping: 140,
    });
  });

  it("should return the correct animation properties for the 'show' variant", () => {
    const variant = footerVariants.show;

    expect(variant.opacity).toBe(1);
    expect(variant.y).toBe(0);
    expect(variant.transition).toEqual({
      type: "spring",
      stiffness: 80,
      delay: 0.5,
    });
  });
});
