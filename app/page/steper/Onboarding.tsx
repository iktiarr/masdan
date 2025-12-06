"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronRight, ChevronLeft, Sparkles, 
  Map, ShoppingBag, MessageCircle, Rocket, X, 
  PersonStanding
} from "lucide-react";

// --- DATA STEPS ---
const STEPS = [
  {
    title: "Selamat Datang!",
    desc: "Halo! Selamat datang!!!. Izinkan saya memandu Anda sebentar untuk mengenal fitur website ini.",
    icon: Sparkles,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10 border-yellow-500/20"
  },
    {
    title: "Tentang Saya",
    desc: "Bacalah profil saya di halaman tentang saya dan halaman lainnya untuk mengetahui siapa saya dan untuk apa saya membuat hal ini",
    icon: PersonStanding,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10 border-yellow-500/20"
  },
  {
    title: "Navigasi & Explore",
    desc: "Gunakan menu 'Explore' di bagian bawah halaman sebelum footer untuk melihat peta situs lengkap dan menemukan halaman tersembunyi.",
    icon: Map,
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20"
  },
  {
    title: "Digital Store",
    desc: "Mencari source code atau template premium? Kunjungi halaman 'Product' untuk mendapatkan aset berkualitas tinggi.",
    icon: ShoppingBag,
    color: "text-lime-400",
    bg: "bg-lime-500/10 border-lime-500/20"
  },
  {
    title: "Bantuan 24/7",
    desc: "Jika bingung atau ada kendala transaksi, fitur 'Help Center' dan Chat WhatsApp siap membantu Anda kapan saja.",
    icon: MessageCircle,
    color: "text-pink-400",
    bg: "bg-pink-500/10 border-pink-500/20"
  },
  {
    title: "Siap Jelajah?",
    desc: "Itu saja! Sekarang Anda siap mengeksplorasi seluruh karya dan layanan kami. Selamat menikmati!",
    icon: Rocket,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20"
  }
];

export default function Onboarding() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // 1. CEK LOCAL STORAGE (Hanya muncul sekali untuk user baru)
  useEffect(() => {
    const hasSeen = localStorage.getItem("has_seen_onboarding");
    if (!hasSeen) {
      // Delay sedikit agar tidak kaget saat load
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  // 2. FUNGSI SELESAI / SKIP
  const handleFinish = () => {
    setIsOpen(false);
    localStorage.setItem("has_seen_onboarding", "true");
  };

  // 3. NAVIGASI
  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((curr) => curr + 1);
    } else {
      handleFinish();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((curr) => curr - 1);
    }
  };

  // Ambil data step saat ini
  const currentData = STEPS[currentStep];
  const CurrentIcon = currentData.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* --- BACKDROP (KUNCI) --- */}
          {/* pointer-events-auto menangkap klik tapi tidak melakukan apa-apa (tidak close) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[9998] cursor-not-allowed"
          />

          {/* --- MODAL CONTAINER --- */}
          <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white dark:bg-[#0a0a0a] w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-white/20 dark:border-white/10 pointer-events-auto relative"
            >
              
              {/* Background Decoration */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gray-100 dark:bg-white/5">
                 <motion.div 
                   className="h-full bg-gradient-to-r from-lime-500 to-emerald-500"
                   initial={{ width: "0%" }}
                   animate={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
                   transition={{ duration: 0.5 }}
                 />
              </div>

              {/* Header: Skip Button */}
              <div className="absolute top-4 right-4 z-20">
                 <button 
                   onClick={handleFinish}
                   className="px-3 py-1 rounded-full bg-gray-100 dark:bg-white/5 text-[10px] font-bold text-gray-500 dark:text-gray-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-colors flex items-center gap-1"
                 >
                   Lewati <X size={12} />
                 </button>
              </div>

              <div className="p-8 pt-12">
                
                {/* CONTENT ANIMATION WRAPPER */}
                <div className="min-h-[240px] flex flex-col items-center text-center">
                   <AnimatePresence mode="wait">
                     <motion.div
                       key={currentStep}
                       initial={{ opacity: 0, x: 20 }}
                       animate={{ opacity: 1, x: 0 }}
                       exit={{ opacity: 0, x: -20 }}
                       transition={{ duration: 0.3 }}
                       className="flex flex-col items-center"
                     >
                        {/* ICON CIRCLE */}
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 border-2 shadow-[0_0_30px_-10px_rgba(255,255,255,0.1)] ${currentData.bg}`}>
                           <CurrentIcon size={32} className={currentData.color} />
                        </div>

                        {/* TEXT */}
                        <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">
                          {currentData.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                          {currentData.desc}
                        </p>
                     </motion.div>
                   </AnimatePresence>
                </div>

                {/* --- FOOTER NAVIGATION --- */}
                <div className="mt-8 flex items-center gap-3">
                   
                   {/* Tombol Back */}
                   <button
                     onClick={prevStep}
                     disabled={currentStep === 0}
                     className={`p-3 rounded-xl border transition-all ${
                       currentStep === 0 
                         ? "opacity-0 pointer-events-none" 
                         : "bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10"
                     }`}
                   >
                     <ChevronLeft size={20} />
                   </button>

                   {/* Dots Indicator */}
                   <div className="flex-1 flex justify-center gap-1.5">
                      {STEPS.map((_, idx) => (
                        <motion.div 
                          key={idx}
                          animate={{ 
                            width: idx === currentStep ? 24 : 6,
                            backgroundColor: idx === currentStep ? "#84cc16" : "#3f3f46" // Lime vs Gray
                          }}
                          className="h-1.5 rounded-full"
                        />
                      ))}
                   </div>

                   {/* Tombol Next / Finish */}
                   <button
                     onClick={nextStep}
                     className="px-6 py-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-black font-bold text-sm shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                   >
                     {currentStep === STEPS.length - 1 ? "Selesai" : "Lanjut"}
                     {currentStep === STEPS.length - 1 ? <Rocket size={16}/> : <ChevronRight size={16}/>}
                   </button>

                </div>

              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}