"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Power, Instagram, ArrowRight } from "lucide-react";

export default function LogoutPage() {
  const [step, setStep] = useState(1);
  const [countdown, setCountdown] = useState(12);

  // GANTI USERNAME IG KAMU DISINI
  const INSTAGRAM_URL = "https://instagram.com/iktiarramadani"; 

  const handleRedirect = () => {
    window.location.href = INSTAGRAM_URL;
  };

  useEffect(() => {
    // Sequence Animasi
    const timer1 = setTimeout(() => setStep(2), 1500);
    const timer2 = setTimeout(() => setStep(3), 2500);

    // Countdown Logic
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleRedirect();
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearInterval(interval);
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-[#020a02] text-white flex flex-col items-center justify-center overflow-hidden font-sans">
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-red-500 blur-[50px] opacity-20 animate-pulse"></div>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                className="relative w-24 h-24 rounded-full border-4 border-red-500/30 border-t-red-500 flex items-center justify-center"
              >
                <Power size={40} className="text-red-500" />
              </motion.div>
            </div>
            <h2 className="text-xl font-mono text-red-500 animate-pulse tracking-widest">WEBSITE SELESAI...</h2>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black z-50"
          />
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 text-center px-6"
          >

            <motion.div 
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
              className="w-24 h-24 mx-auto bg-linear-to-tr from-purple-500 via-pink-500 to-orange-500 rounded-3xl flex items-center justify-center shadow-[0_0_50px_rgba(236,72,153,0.4)] mb-8"
            >
              <Instagram size={48} className="text-white" />
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white tracking-tight">
              Sesi Berakhir, <br/> 
              <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-400">Koneksi Berlanjut.</span>
            </h1>
            
            <p className="text-gray-400 max-w-lg mx-auto text-base leading-relaxed mb-10">
              Terima kasih sudah mampir! Jangan biarkan obrolan putus di sini. Yuk, intip keseharian dan <i>behind the scene</i> project saya di Instagram.
            </p>

            <div className="flex flex-col items-center gap-4">
              <div className="h-1.5 w-64 bg-gray-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 12, ease: "linear" }}
                  className="h-full bg-linear-to-r from-purple-500 to-pink-500"
                />
              </div>
              
              <p className="text-[10px] text-gray-500 font-mono flex items-center gap-2">
                REDIRECTING TO INSTAGRAM IN {countdown}s
              </p>

              <button 
                onClick={handleRedirect}
                className="mt-6 flex items-center gap-2 px-8 py-3 rounded-full bg-white text-black font-bold text-sm hover:scale-105 transition-transform shadow-lg shadow-white/10"
              >
                <Instagram size={16} /> Buka Instagram Sekarang <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </main>
  );
}