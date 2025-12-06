"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Quote } from "lucide-react";
import Link from "next/link";

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed top-27 left-0 w-full z-100 isolate"
        >
          {/* Background Gradient Premium */}
          <div className="relative bg-linear-to-r from-violet-600 via-purple-600 to-pink-700 text-white overflow-hidden shadow-xl">
            
            {/* Pattern Background */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-size-[250%_250%] animate-shine pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 h-10 md:h-12 flex items-center justify-center relative z-10">
              
              {/* Content Link */}
              <Link 
                href="/more/releases" 
                onClick={handleClose} // <--- PERBAIKAN DISINI (Tutup saat diklik)
                className="flex items-center gap-2 md:gap-3 text-[10px] md:text-xs font-bold tracking-wide group hover:opacity-90 transition-opacity cursor-pointer w-full justify-center"
              >
                <div className="flex items-center gap-1.5 bg-white/20 px-2 py-0.5 rounded-full border border-white/20 backdrop-blur-sm">
                   <Quote size={12} className="text-yellow-300 animate-pulse" />
                   <span className="uppercase text-[9px]">Page Available</span>
                </div>
                
                <span className="truncate max-w-[200px] md:max-w-none">
                  Blog kini sudah tersedia!
                </span>

                <span className="hidden md:flex items-center gap-1 group-hover:underline decoration-white/50 underline-offset-4">
                  Pelajari selengkapnya <ArrowRight size={12} />
                </span>
              </Link>

              {/* Close Button */}
              <button 
                onClick={handleClose}
                className="absolute right-4 p-1 rounded-full hover:bg-white/20 transition-colors"
              >
                <X size={14} />
              </button>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}