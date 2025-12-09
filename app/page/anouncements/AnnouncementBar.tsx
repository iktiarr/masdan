"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AnnouncementBar() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("announcement_closed", "true");
  };

  useEffect(() => {
    const isClosed = localStorage.getItem("announcement_closed") === "true";

    if (pathname === "/" && !isClosed) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        localStorage.setItem("announcement_closed", "true");
      }, 10000);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [pathname]);

  if (pathname !== "/") return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="fixed top-0 left-0 w-full z-[100] isolate"
        >
          <div className="relative bg-linear-to-r from-lime-600 via-emerald-600 to-green-700 text-white shadow-lg overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-size-[250%_250%] animate-shine pointer-events-none"></div>

            <nav className="max-w-7xl mx-auto px-4 h-11 md:h-12 flex items-center justify-center relative z-10">
              <Link
                href="/more/releases"
                onClick={handleClose}
                className="flex items-center gap-2 md:gap-3 text-[10px] md:text-xs font-semibold tracking-wide group w-full justify-center"
              >
                <div className="flex items-center gap-1.5 bg-white/25 px-2 py-0.5 rounded-full border border-white/20 backdrop-blur-sm">
                  <Sparkles size={12} className="text-yellow-300 animate-pulse" />
                  <span className="uppercase text-[9px]">Update</span>
                </div>

                <span className="truncate max-w-[200px] md:max-w-none">
                  Perbaikan bug dan lainnya
                </span>

                <span className="hidden md:flex items-center gap-1 group-hover:underline underline-offset-4">
                  Selengkapnya <ArrowRight size={12} />
                </span>
              </Link>

              <button
                aria-label="Tutup pengumuman"
                onClick={handleClose}
                className="absolute right-4 p-1 rounded-full hover:bg-white/20 transition"
              >
                <X size={14} />
              </button>
            </nav>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
