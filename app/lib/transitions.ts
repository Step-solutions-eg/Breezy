export const transitions = {
  spring: {
    type: "spring" as const,
    stiffness: 300,
    damping: 24,
  },
  springBouncy: {
    type: "spring" as const,
    stiffness: 500,
    damping: 15,
  },
  springStiff: {
    type: "spring" as const,
    stiffness: 700,
    damping: 30,
  },
  smooth: {
    type: "tween" as const,
    duration: 0.3,
    ease: "easeInOut" as const,
  },
  snappy: {
    type: "tween" as const,
    duration: 0.15,
    ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
  },
  microSpring: {
    type: "spring" as const,
    stiffness: 400,
    damping: 26,
    mass: 1,
  },
  microTap: {
    type: "spring" as const,
    stiffness: 1000,
    damping: 10,
    mass: 0.5,
  },
};

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};
