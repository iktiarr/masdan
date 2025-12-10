"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const configSoft = { damping: 30, stiffness: 80, mass: 0.6 };
  const configCore = { damping: 20, stiffness: 120, mass: 0.4 };

  const softX = useSpring(mouseX, configSoft);
  const softY = useSpring(mouseY, configSoft);

  const coreX = useSpring(mouseX, configCore);
  const coreY = useSpring(mouseY, configCore);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-[380px] h-[380px] rounded-full pointer-events-none z-0 hidden md:block blur-3xl opacity-60"
        style={{
          x: softX,
          y: softY,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, rgba(132, 204, 22, 0.18) 0%, rgba(16, 185, 129, 0.12) 40%, rgba(0,0,0,0) 80%)",
          filter: "blur(70px)",
        }}
      />

      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-10 hidden md:block mix-blend-screen"
        style={{
          x: coreX,
          y: coreY,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, rgba(163, 230, 53, 0.4) 0%, rgba(74, 222, 128, 0.3) 50%, rgba(0,0,0,0) 100%)",
          boxShadow:
            "0 0 20px rgba(132, 204, 22, 0.5), 0 0 40px rgba(74, 222, 128, 0.4)",
          backdropFilter: "blur(4px)",
        }}
      />
    </>
  );
}
