"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, X } from "lucide-react";
import { STEPS } from "@/app/information-menu/data_steper_notifications";

export default function Onboarding() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const hasSeen = localStorage.getItem("has_seen_onboarding");
    if (!hasSeen) {
      const timer = setTimeout(() => setIsOpen(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleFinish = () => {
    setIsOpen(false);
    localStorage.setItem("has_seen_onboarding", "true");
  };

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

  const data = STEPS[currentStep];
  const Icon = data.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 dark:bg-black/60 z-[9998]"
          />

          <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 22, stiffness: 240 }}
              className="relative w-full max-w-md rounded-2xl p-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 shadow-xl"
            >
              <button
                onClick={handleFinish}
                className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
              >
                <X size={16} className="text-neutral-700 dark:text-neutral-300" />
              </button>

              <div className="flex flex-col items-center text-center">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-20 h-20 rounded-xl flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 mb-5">
                    <Icon size={40} className="text-lime-600 dark:text-lime-400" />
                  </div>

                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                    {data.title}
                  </h3>

                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {data.desc}
                  </p>
                </motion.div>

                <div className="mt-8 flex items-center w-full gap-3">
                  <button
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className={`p-3 rounded-xl border transition ${
                      currentStep === 0
                        ? "opacity-0 pointer-events-none"
                        : "border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    }`}
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <div className="flex-1 flex justify-center gap-2">
                    {STEPS.map((_, idx) => (
                      <motion.div
                        key={idx}
                        animate={{
                          width: idx === currentStep ? 24 : 6,
                          backgroundColor:
                            idx === currentStep
                              ? "rgb(132,204,22)"
                              : "rgb(160,160,160)"
                        }}
                        className="h-2 rounded-full"
                      />
                    ))}
                  </div>

                  <button
                    onClick={nextStep}
                    className="px-6 py-3 rounded-xl bg-lime-600 hover:bg-lime-700 text-white font-semibold transition"
                  >
                    {currentStep === STEPS.length - 1 ? "Selesai" : "Lanjut"}
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
