"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, ArrowRight } from "lucide-react";

export default function LogoutPage() {
  const [step, setStep] = useState(1);
  const [countdown, setCountdown] = useState(5);
  const INSTAGRAM_URL = "https://instagram.com/iktiarramadani";

  const timersRef = useRef<number[]>([]);
  const intervalRef = useRef<number | null>(null);

  const handleRedirect = () => {
    window.location.href = INSTAGRAM_URL;
  };

  useEffect(() => {
    timersRef.current.push(window.setTimeout(() => setStep(2), 600));
    timersRef.current.push(window.setTimeout(() => setStep(3), 900));

    intervalRef.current = window.setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          handleRedirect();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      timersRef.current.forEach((id) => clearTimeout(id));
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-white text-gray-900 flex flex-col items-center justify-center overflow-hidden font-sans">
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-200 rounded-full mix-blend-multiply blur-[100px] opacity-40 animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-pink-200 rounded-full mix-blend-multiply blur-[100px] opacity-40 animate-pulse" />
      <div className="absolute top-[40%] left-[40%] w-[300px] h-[300px] bg-orange-100 rounded-full mix-blend-multiply blur-[80px] opacity-40" />

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            transition={{ duration: 0.45 }}
            className="flex flex-col items-center gap-6 z-10"
          >
            <div className="relative w-32 h-32 md:w-40 md:h-40">
              <img src="/loading_logout.gif" alt="Loading..." className="w-full h-full object-contain drop-shadow-xl" />
            </div>
            <p className="text-sm font-medium text-gray-400 tracking-widest uppercase">Mengalihkan...</p>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-white z-50"
          />
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative z-10 text-center px-6 max-w-2xl"
          >
            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 160, damping: 14, delay: 0.12 }}
              className="w-24 h-24 mx-auto bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-500 rounded-3xl flex items-center justify-center shadow-2xl mb-8"
            >
              <Instagram size={48} className="text-white" />
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 tracking-tight">
              Terima kasih, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">Tetap Terhubung.</span>
            </h1>

            <p className="text-gray-500 max-w-lg mx-auto text-base leading-relaxed mb-10">
              Terima kasih sudah mampir. Yuk, intip keseharian dan kegiatan saya di Instagram.
            </p>

            <div className="flex flex-col items-center gap-4">
              <div className="h-1.5 w-64 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 4, ease: "linear" }}
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                />
              </div>

              <p className="text-[10px] text-gray-400 font-mono mt-2" aria-live="polite">
                Berpindah ke Instagram dalam {countdown}s
              </p>

              <button
                onClick={handleRedirect}
                className="mt-6 flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-sm hover:shadow-xl hover:shadow-pink-200 hover:scale-105 transition-all duration-200"
              >
                <Instagram size={18} /> Buka Instagram Sekarang <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
