"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const storedConsent = localStorage.getItem("cookie_consent");
    if (storedConsent === null) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAction = (choice: boolean) => {
    localStorage.setItem("cookie_consent", JSON.stringify(choice));
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-[400px] z-[999]"
        >
          <div className="relative overflow-hidden bg-white/80 dark:bg-[#121212]/80 backdrop-blur-xl border border-gray-200 dark:border-white/10 p-6 rounded-3xl shadow-2xl shadow-black/10">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-lime-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-start gap-4">
                <div className="shrink-0 p-3 bg-gradient-to-br from-lime-100 to-emerald-100 dark:from-lime-900/30 dark:to-emerald-900/30 text-lime-700 dark:text-lime-400 rounded-2xl animate-[bounce_3s_infinite]">
                  <Cookie size={24} />
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-base text-gray-900 dark:text-white mb-1">
                      Kami menggunakan Cookie 🍪
                    </h3>
                    <button 
                      onClick={() => handleAction(false)}
                      className="text-gray-400 hover:text-red-500 transition-colors -mt-1 -mr-1"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-4 text-justify">
                    Website ini menggunakan cookie untuk menyimpan preferensi, alur kerja anda dan memastikan pengalaman yang lebih baik dari sebelumnya.
                  </p>
                  
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleAction(true)}
                      className="h-9 flex-1 bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-lime-600 dark:hover:bg-lime-400 font-bold rounded-xl text-xs shadow-lg shadow-lime-500/10"
                    >
                      Terima Semua
                    </Button>
                    <Button 
                      onClick={() => handleAction(false)}
                      variant="outline"
                      className="h-9 flex-1 border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl text-xs bg-transparent"
                    >
                      Tolak Sekarang
                    </Button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}