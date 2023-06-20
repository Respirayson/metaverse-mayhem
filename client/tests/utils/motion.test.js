import {
  slideAnimation,
  fadeAnimation,
  headTextAnimation,
  headContentAnimation,
  headContainerAnimation,
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

describe("headTextAnimation", () => {
  it("should return the correct animation properties", () => {
    const animation = headTextAnimation;

    expect(animation.initial).toEqual({ x: 100, opacity: 0 });
    expect(animation.animate).toEqual({ x: 0, opacity: 1 });
    expect(animation.transition).toEqual({
      type: "spring",
      damping: 5,
      stiffness: 40,
      restDelta: 0.001,
      duration: 0.3,
    });
  });
});

describe("headContentAnimation", () => {
  it("should return the correct animation properties", () => {
    const animation = headContentAnimation;

    expect(animation.initial).toEqual({ y: 100, opacity: 0 });
    expect(animation.animate).toEqual({ y: 0, opacity: 1 });
    expect(animation.transition).toEqual({
      type: "spring",
      damping: 7,
      stiffness: 30,
      restDelta: 0.001,
      duration: 0.6,
      delay: 0.2,
      delayChildren: 0.2,
    });
  });
});

describe("headContainerAnimation", () => {
  it("should return the correct animation properties", () => {
    const animation = headContainerAnimation;

    expect(animation.initial).toEqual({
      x: -100,
      opacity: 0,
      transition: { type: "spring", duration: 0.8, delay: 0.5 },
    });
    expect(animation.animate).toEqual({
      x: 0,
      opacity: 1,
      transition: { type: "spring", duration: 0.8, delay: 0 },
    });
    expect(animation.exit).toEqual({
      x: -100,
      opacity: 0,
      transition: { type: "spring", duration: 0.8, delay: 0 },
    });
  });
});
