"use client";

import { motion } from "framer-motion";
import { Scale, Gavel } from "lucide-react";
import AOS from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";

// Import Data & Components
import { termsData } from "@/app/information-menu/data_terms";
import Navbar from "@/app/asset/navbar_atas";
import Footer from "@/app/asset/footer_bawah";
import SimpleHeader from "@/app/asset/navbar_atas"; 

export default function TermsPage() {
  
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <>
      <Navbar />

      <main className="relative min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white font-sans transition-colors duration-300 pt-24 pb-20 px-4 md:px-8">
        
        <SimpleHeader title="Terms of Service" />

        {/* --- BACKGROUND FX --- */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
           <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-lime-500/5 rounded-full blur-[120px]" />
           <div className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px]" />
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          
          {/* --- HEADER SECTION --- */}
          <div className="text-center mb-16 space-y-4" data-aos="fade-down">             
             <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-gray-900 dark:text-white">
               Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-500 to-emerald-600">Service</span>
             </h1>
             <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
               Harap baca ketentuan ini dengan saksama. Penggunaan layanan kami menandakan persetujuan Anda terhadap aturan yang berlaku.
             </p>
             
             {/* Divider */}
             <div className="w-full h-px bg-gradient-to-r from-transparent via-lime-500/50 to-transparent mt-8 max-w-xs mx-auto" />
          </div>

          {/* --- GRID TERMS --- */}
          <div className="grid md:grid-cols-2 gap-6">
            {termsData.map((term, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`group bg-white dark:bg-[#121212] border border-gray-200 dark:border-white/5 hover:border-lime-500/30 dark:hover:border-lime-500/30 rounded-2xl p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-lime-500/5 ${idx === termsData.length - 1 ? "md:col-span-2" : ""}`}
              >
                 <div className="flex flex-col md:flex-row gap-5 items-start">
                    {/* Icon Box */}
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-white/5 text-gray-400 dark:text-gray-500 group-hover:bg-lime-500 group-hover:text-black transition-all duration-300 shrink-0 border border-gray-100 dark:border-white/5">
                       <term.icon size={22} />
                    </div>
                    
                    {/* Content */}
                    <div>
                       <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors">
                         {term.title}
                       </h3>
                       <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed text-justify">
                         {term.content}
                       </p>
                    </div>
                 </div>
              </motion.div>
            ))}
          </div>

          {/* --- DISCLAIMER FOOTER --- */}
          <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 0.5 }}
             className="mt-16 pt-8 border-t border-gray-200 dark:border-white/5 text-center"
          >
             <div className="inline-flex items-center gap-2 text-red-500 dark:text-red-400 mb-2 bg-red-50 dark:bg-red-900/10 px-3 py-1 rounded-full">
               <Gavel size={14} />
               <span className="font-bold text-[10px] uppercase tracking-wider">Disclaimer</span>
             </div>
             <p className="text-xs text-gray-400 dark:text-gray-600 max-w-lg mx-auto leading-relaxed">
               Kami berhak mengubah syarat dan ketentuan ini sewaktu-waktu tanpa pemberitahuan sebelumnya. Perubahan akan berlaku efektif segera setelah dipublikasikan di halaman ini.
             </p>
          </motion.div>

        </div>
      </main>

      <Footer />
    </>
  );
}