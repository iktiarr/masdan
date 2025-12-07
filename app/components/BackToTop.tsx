"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { usePathname } from "next/navigation";

export default function BackToTop() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isVisible, setIsVisible] = useState(false);
  const [animationData, setAnimationData] = useState(null);
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (!isHomePage) return;
    fetch("/drone.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, [isHomePage]);

  useEffect(() => {
    if (!isHomePage) return;
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [isHomePage]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleMouseEnter = () => {
    lottieRef.current?.setSpeed(2);
  };

  const handleMouseLeave = () => {
    lottieRef.current?.setSpeed(1);
  };

  if (!isHomePage || !animationData) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0 }}
          drag
          dragSnapToOrigin={true}
          dragElastic={0.1}
          whileDrag={{ scale: 1.1, cursor: "grabbing" }}
          whileHover={{ scale: 1.3 }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTap={scrollToTop}
          className="fixed bottom-8 right-8 z-50 cursor-grab active:cursor-grabbing w-24 h-24 flex items-center justify-center"
          style={{ touchAction: "none" }}
        >
          <div className="absolute inset-0 bg-lime-500/30 blur-2xl rounded-full animate-pulse"></div>

          <div className="relative w-full h-full drop-shadow-2xl filter">
            <Lottie
              lottieRef={lottieRef}
              animationData={animationData}
              loop={true}
              className="w-full h-full"
            />

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ opacity: 1, y: -10 }}
              className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded-lg whitespace-nowrap border border-lime-500 pointer-events-none"
            >
              Tarik aku atau Klik! 🚁
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
