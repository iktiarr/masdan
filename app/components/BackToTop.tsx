"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie, { LottieRefCurrentProps } from "lottie-react";

// Import Data JSON Lottie (Cara Import Langsung agar tidak perlu fetch)
// Pastikan file drone.json ada di folder public, 
// TAPI untuk lottie-react paling aman taruh file json di folder 'components' atau 'assets' lalu import.
// Atau gunakan fetch. Di sini saya pakai fetch dari public agar file project rapi.

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [animationData, setAnimationData] = useState(null);
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  // 1. Load Lottie JSON dari folder public
  useEffect(() => {
    fetch("/drone.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, []);

  // 2. Logic Scroll (Muncul saat scroll ke bawah)
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // 3. Fungsi Scroll ke Atas
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // 4. Interaksi Hover (Makin Lebar/Cepat)
  const handleMouseEnter = () => {
    lottieRef.current?.setSpeed(2); // Percepat animasi (baling-baling ngebut)
  };

  const handleMouseLeave = () => {
    lottieRef.current?.setSpeed(1); // Kembali normal
  };

  if (!animationData) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          // Posisi Awal (Pojok Kanan Bawah)
          initial={{ opacity: 0, y: 100, scale: 0 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0 }}
          
          // --- FITUR DRAG (IKUT MOUSE) ---
          drag // Mengaktifkan fitur drag
          dragSnapToOrigin={true} // Saat dilepas, balik ke posisi awal
          dragElastic={0.1} // Efek pegas saat ditarik
          whileDrag={{ scale: 1.1, cursor: "grabbing" }} // Efek saat ditekan/diseret
          
          // --- FITUR HOVER (MAKIN LEBAR) ---
          whileHover={{ scale: 1.3 }} // Membesar saat hover
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          
          // --- FITUR KLIK (SCROLL TOP) ---
          // Kita gunakan onTap agar tidak bentrok dengan Drag
          onTap={scrollToTop} 

          className="fixed bottom-8 right-8 z-50 cursor-grab active:cursor-grabbing w-24 h-24 flex items-center justify-center"
          style={{ touchAction: "none" }} // Mencegah scroll layar saat drag di HP
        >
          {/* Efek Glow di belakang Drone */}
          <div className="absolute inset-0 bg-lime-500/30 blur-2xl rounded-full animate-pulse"></div>
          
          {/* Lottie Player */}
          <div className="relative w-full h-full drop-shadow-2xl filter">
            <Lottie
              lottieRef={lottieRef}
              animationData={animationData}
              loop={true}
              className="w-full h-full"
            />
            
            {/* Tooltip Lucu (Opsional) */}
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