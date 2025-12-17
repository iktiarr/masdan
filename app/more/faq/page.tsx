"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

// Import Data & Components
// Pastikan path data ini sesuai dengan lokasi file data Anda
import { faqData } from "@/app/information-menu/data_question_faq"; 
import Navbar from "@/app/asset/navbar_atas";
import Footer from "@/app/asset/footer_bawah";
import SimpleHeader from "@/app/asset/navbar_atas"; 

export default function FAQPage() {
  // Set default open category ke yang pertama jika data ada
  const [openCategory, setOpenCategory] = useState<string | null>(faqData?.[0]?.category || null);
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // Toggle Kategori Utama
  const toggleCategory = (cat: string) => {
    // Jika klik kategori yg sama -> tutup, jika beda -> buka yg baru
    setOpenCategory(openCategory === cat ? null : cat);
    setOpenQuestion(null); // Reset pertanyaan saat ganti kategori agar rapi
  };

  // Toggle Pertanyaan
  const toggleQuestion = (q: string) => {
    setOpenQuestion(openQuestion === q ? null : q);
  };

  return (
    <>
      <Navbar />

      <main className="relative min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white font-sans transition-colors duration-300 pt-24 pb-20 px-4 md:px-8">
        
        <SimpleHeader title="FAQ" />

        {/* --- BACKGROUND FX --- */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
           <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-lime-500/5 rounded-full blur-[120px]" />
           <div className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px]" />
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
        
           {/* --- HEADER SECTION --- */}
           <div className="text-center mb-16 space-y-4" data-aos="fade-down">
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-gray-900 dark:text-white">
                Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-500 to-emerald-600">Questions</span>
              </h1>
              <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
                Jawaban lengkap untuk segala pertanyaan tentang produk, layanan, dan hal teknis lainnya.
              </p>

              {/* Divider */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-lime-500/50 to-transparent mt-8 max-w-xs mx-auto" />
           </div>

           {/* --- CONTENT ACCORDION --- */}
           <div className="space-y-4">
             {faqData.map((section, idx) => {
               const isCatOpen = openCategory === section.category;

               return (
                 <motion.div 
                   key={idx}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: idx * 0.1 }}
                   className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                     isCatOpen 
                       ? "bg-white dark:bg-[#121212] border-lime-500/50 shadow-xl shadow-lime-500/5" 
                       : "bg-white dark:bg-[#121212] border-gray-200 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/10"
                   }`}
                 >
                   
                   {/* HEADER KATEGORI */}
                   <button
                     onClick={() => toggleCategory(section.category)}
                     className="w-full flex items-center justify-between p-6 md:p-8 text-left outline-none group"
                   >
                      <div className="flex items-center gap-5">
                         {/* Icon Box */}
                         <div className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-300 ${
                            isCatOpen 
                              ? "bg-lime-500 text-black shadow-lg shadow-lime-500/20" 
                              : "bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-gray-500 group-hover:bg-lime-500 group-hover:text-black"
                         }`}>
                            <section.icon size={24} />
                         </div>
                         
                         <div>
                            <h2 className={`text-xl font-bold transition-colors ${
                               isCatOpen ? "text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-300"
                            }`}>
                              {section.category}
                            </h2>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 font-bold uppercase tracking-wider">
                              {section.items.length} Topik
                            </p>
                         </div>
                      </div>
                      
                      <div className={`p-2 rounded-full border transition-all duration-300 ${
                         isCatOpen 
                           ? "bg-lime-100 dark:bg-lime-500/10 border-lime-200 dark:border-lime-500/20 text-lime-600 dark:text-lime-400 rotate-180" 
                           : "border-gray-100 dark:border-white/5 text-gray-400"
                      }`}>
                         <ChevronDown size={20} />
                      </div>
                   </button>

                   {/* LIST PERTANYAAN (Sub-Accordion) */}
                   <AnimatePresence>
                     {isCatOpen && (
                       <motion.div
                         initial={{ height: 0, opacity: 0 }}
                         animate={{ height: "auto", opacity: 1 }}
                         exit={{ height: 0, opacity: 0 }}
                         transition={{ duration: 0.3, ease: "easeInOut" }}
                       >
                         <div className="px-6 md:px-8 pb-8 pt-0 space-y-3">
                            <div className="h-px w-full bg-gray-100 dark:bg-white/5 mb-6"></div>

                            {section.items.map((item: any, qIdx: number) => {
                              const isQOpen = openQuestion === item.q;
                              
                              return (
                                <div key={qIdx} className={`group/item rounded-2xl border transition-all duration-300 ${
                                   isQOpen
                                     ? "bg-gray-50 dark:bg-white/5 border-lime-500/30"
                                     : "bg-transparent border-transparent hover:bg-gray-50 dark:hover:bg-white/5 hover:border-gray-100 dark:hover:border-white/5"
                                }`}>
                                   
                                   <button
                                     onClick={() => toggleQuestion(item.q)}
                                     className="w-full flex items-start justify-between gap-4 p-4 text-left"
                                   >
                                      <span className={`text-sm md:text-base font-bold transition-colors ${
                                         isQOpen ? "text-lime-600 dark:text-lime-400" : "text-gray-700 dark:text-gray-300"
                                      }`}>
                                        {item.q}
                                      </span>
                                      <ChevronDown 
                                        size={18} 
                                        className={`shrink-0 mt-0.5 transition-transform duration-300 text-gray-400 ${isQOpen ? "rotate-180 text-lime-500" : ""}`} 
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
                                          <div className="px-4 pb-5 pt-0 text-sm text-gray-500 dark:text-gray-400 leading-relaxed ml-1">
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

      <Footer />
    </>
  );
}