"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Layers, Zap } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

// Import Data & Components
import { usesData } from "@/app/information-menu/data_uses";
import Navbar from "@/app/asset/navbar_atas";
import Footer from "@/app/asset/footer_bawah";
import SimpleHeader from "@/app/asset/navbar_atas"; 
export default function UsesPage() {
  
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <>
      <Navbar/>

      <main className="relative min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white font-sans transition-colors duration-300 pt-32 pb-20 px-4 md:px-8">
        <SimpleHeader title="Alat yang Kami Gunakan" />
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
           <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-lime-500/5 rounded-full blur-[120px]" />
           <div className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px]" />
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4" data-aos="fade-down">            
             <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-gray-900 dark:text-white">
               Alat yang <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-500 to-emerald-600">Kami Gunakan</span>
             </h1>
             <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
               Daftar lengkap perangkat lunak, framework, dan library yang membangun pondasi proyek Masdaner agar berjalan cepat dan aman.
             </p>
          </div>

          {/* --- LOOPING KATEGORI --- */}
          <div className="space-y-20">
            {usesData.map((section, sectionIdx) => (
              <div key={section.category} data-aos="fade-up" data-aos-delay={sectionIdx * 100}>
                
                {/* Judul Kategori */}
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white border-l-4 border-lime-500 pl-4">
                    {section.category}
                  </h2>
                  <div className="h-px flex-1 bg-gray-200 dark:bg-white/10" />
                </div>

                {/* Grid Item (Desain Kartu disamakan dengan TermsPage) */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {section.items.map((item, itemIdx) => (
                    <motion.div
                      key={item.name}
                      whileHover={{ y: -5 }}
                      className="group relative"
                    >
                      <Link 
                        href={item.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block h-full"
                      >
                        <div className="h-full bg-white dark:bg-[#121212] border border-gray-200 dark:border-white/5 hover:border-lime-500/50 dark:hover:border-lime-500/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-lime-500/10 flex flex-col">
                          
                          {/* Header Kartu: Icon & Arrow */}
                          <div className="flex justify-between items-start mb-4">
                            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-white/5 text-gray-400 dark:text-gray-500 group-hover:bg-lime-500 group-hover:text-black transition-all duration-300 border border-gray-100 dark:border-white/5">
                               <item.icon size={22} />
                            </div>
                            <ArrowUpRight size={18} className="text-gray-300 dark:text-gray-600 group-hover:text-lime-500 transition-colors" />
                          </div>

                          {/* Isi Kartu */}
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                              {item.description}
                            </p>
                          </div>

                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}