"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 18,
    mass: 0.3
  });

  const bounce = useTransform(scaleX, (v) => v + v * 0.03);

  return (
    <motion.div className="fixed top-0 left-0 right-0 z-[99999] h-1.5">
      <motion.div
        style={{ scaleX: bounce }}
        className="
          h-full origin-left 
          bg-gradient-to-r from-lime-400 via-lime-500 to-emerald-500 
          shadow-[0_0_10px_rgba(132,204,22,0.8)]
          relative overflow-hidden rounded-b-md
        "
      >
        <div
          className="
            absolute inset-0 
            bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.5),transparent)]
            animate-shineProgress
            opacity-70
          "
        />
      </motion.div>
    </motion.div>
  );
}
