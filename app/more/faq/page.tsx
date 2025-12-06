"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

// Import Data
import { faqData } from "@/app/information-menu/faq";

export default function FAQPage() {
  const [openCategory, setOpenCategory] = useState<string | null>(faqData[0].category); // Default buka kategori pertama
  const [openQuestion, setOpenQuestion] = useState<string | null>(null); // Default tutup semua pertanyaan

  // Toggle Kategori Utama
  const toggleCategory = (cat: string) => {
    setOpenCategory(openCategory === cat ? null : cat);
    setOpenQuestion(null); // Tutup pertanyaan saat ganti kategori
  };

  // Toggle Pertanyaan
  const toggleQuestion = (q: string) => {
    setOpenQuestion(openQuestion === q ? null : q);
  };

  return (
    <main className="relative min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white font-sans transition-colors duration-300 py-24 px-6">
      
      {/* --- BACKGROUND FX --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
         <div className="absolute inset-0 bg-[radial-gradient(#84cc16_1px,transparent_1px)] dark:bg-[radial-gradient(#84cc16_1px,transparent_1px)] bg-size[32px_32px] opacity-10 dark:opacity-5"></div>
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-lime-200/30 dark:bg-lime-500/10 rounded-full blur-[150px] opacity-60"></div>
      </div>


      <div className="relative z-10 max-w-4xl mx-auto">
            <div className="mb-8 text-center md:text-left">
                <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-lime-500 dark:hover:border-lime-500 transition-all duration-300 group shadow-sm">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform text-gray-500 dark:text-gray-400 group-hover:text-lime-500" />
                    <span className="text-sm font-bold text-gray-600 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white">Kembali</span>
                </Link>
              </div>
        
        {/* --- HEADER --- */}
        <div className="text-center mb-16 space-y-4" data-aos="fade-down">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-100 dark:bg-lime-500/10 text-lime-600 dark:text-lime-400 text-xs font-bold uppercase tracking-widest border border-lime-200 dark:border-lime-500/20">
              <HelpCircle size={14} /> Pusat Informasi
           </div>
           <h1 className="text-4xl md:text-6xl font-black tracking-tighter">
             Frequently Asked <span className="text-transparent bg-clip-text bg-linear-to-r from-lime-500 to-emerald-600">Questions.</span>
           </h1>
           <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
             Jawaban lengkap untuk segala pertanyaan tentang produk, layanan, dan teknis website ini.
           </p>
        </div>

        {/* --- CONTENT ACCORDION --- */}
        <div className="space-y-6">
          
          {faqData.map((section, idx) => {
            const isCatOpen = openCategory === section.category;

            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                  isCatOpen 
                    ? "bg-white dark:bg-[#121212] border-lime-500/50 shadow-xl dark:shadow-lime-900/10" 
                    : "bg-white dark:bg-[#121212]/50 border-gray-200 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/10"
                }`}
              >
                
                {/* HEADER KATEGORI (KLIK UNTUK BUKA) */}
                <button
                  onClick={() => toggleCategory(section.category)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left outline-none"
                >
                   <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-2xl transition-colors ${isCatOpen ? "bg-lime-500 text-black" : "bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400"}`}>
                         <section.icon size={24} />
                      </div>
                      <div>
                         <h2 className={`text-xl font-bold ${isCatOpen ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400"}`}>
                           {section.category}
                         </h2>
                         <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 font-medium uppercase tracking-wider">
                           {section.items.length} Pertanyaan
                         </p>
                      </div>
                   </div>
                   <ChevronDown 
                      size={24} 
                      className={`text-gray-400 transition-transform duration-300 ${isCatOpen ? "rotate-180 text-lime-500" : ""}`} 
                   />
                </button>

                {/* ISI PERTANYAAN (COLLAPSIBLE) */}
                <AnimatePresence>
                  {isCatOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 md:px-8 pb-8 pt-0 space-y-3">
                         {/* Garis Pemisah Halus */}
                         <div className="h-px w-full bg-gray-100 dark:bg-white/5 mb-6"></div>

                         {section.items.map((item, qIdx) => {
                           const isQOpen = openQuestion === item.q;
                           
                           return (
                             <div key={qIdx} className="group rounded-xl border border-transparent hover:border-gray-100 dark:hover:border-white/5 bg-gray-50 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 transition-all duration-200">
                                
                                <button
                                  onClick={() => toggleQuestion(item.q)}
                                  className="w-full flex items-start justify-between gap-4 p-4 text-left"
                                >
                                  <span className={`text-sm md:text-base font-bold transition-colors ${isQOpen ? "text-lime-600 dark:text-lime-400" : "text-gray-700 dark:text-gray-200"}`}>
                                    {item.q}
                                  </span>
                                  <ChevronDown 
                                    size={18} 
                                    className={`shrink-0 mt-0.5 transition-transform duration-200 text-gray-400 ${isQOpen ? "rotate-180" : ""}`} 
                                  />
                                </button>

                                <AnimatePresence>
                                  {isQOpen && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.2 }}
                                      className="overflow-hidden"
                                    >
                                       <div className="px-4 pb-4 text-sm text-gray-500 dark:text-gray-400 leading-relaxed border-t border-gray-200/50 dark:border-white/5 pt-3 mt-1 mx-4">
                                          {item.a}
                                       </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                                
                             </div>
                           );
                         })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            );
          })}

        </div>
      </div>
    </main>
  );
}