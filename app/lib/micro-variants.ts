import { transitions } from "./transitions";

export const hoverLift = {
  whileHover: { y: -4, scale: 1.02 },
  transition: transitions.microSpring,
};

export const hoverLiftHeavy = {
  whileHover: { y: -6, scale: 1.03 },
  transition: transitions.microSpring,
};

export const hoverScale = {
  whileHover: { scale: 1.05 },
  transition: transitions.microSpring,
};

export const hoverSlide = {
  whileHover: { x: 4 },
  transition: transitions.microSpring,
};

export const tapPress = {
  whileTap: { scale: 0.97 },
  transition: transitions.microTap,
};

export const tapCompact = {
  whileTap: { scale: 0.99 },
  transition: transitions.microTap,
};

export const hoverScaleGlow = {
  whileHover: { scale: 1.15 },
  transition: transitions.microSpring,
};

export const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
};

export const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5 },
};
