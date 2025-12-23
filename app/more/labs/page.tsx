"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Beaker, Calendar } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

// Import Data & Components
import { labsData } from "@/app/information-menu/data_labs";
import Navbar from "@/app/asset/navbar_atas";
import Footer from "@/app/asset/footer_bawah";
import SimpleHeader from "@/app/asset/navbar_atas"; 

export default function LabsPage() {
  
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <>
      <Navbar/>

      <main className="relative min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white font-sans transition-colors duration-300 pt-32 pb-20 px-4 md:px-8">
        <SimpleHeader title="Laboratorium Kami" />

        <div className="fixed inset-0 pointer-events-none overflow-hidden">
           <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-lime-500/5 rounded-full blur-[120px]" />
           <div className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px]" />
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          
          {/* --- HEADER SECTION --- */}
          <div className="text-center mb-16 space-y-4" data-aos="fade-down">            
             <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-gray-900 dark:text-white">
               Masdaner <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-500 to-emerald-600">Labs</span>
             </h1>
             <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
               Ruang eksperimen, hasil penelitian, dan purwarupa teknologi yang sedang saya kembangkan.
             </p>
          </div>

          {/* --- GRID LABS --- */}
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
            {labsData.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                className="group relative"
              >
                <Link href={item.link} className="block h-full">
                  <div className="h-full bg-white dark:bg-[#121212] border border-gray-200 dark:border-white/5 hover:border-lime-500/50 dark:hover:border-lime-500/50 rounded-3xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-lime-500/10 flex flex-col relative overflow-hidden">
                    
                    {/* Background Glow Hiasan saat Hover */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-lime-500/10 rounded-full blur-3xl group-hover:bg-lime-500/20 transition-all duration-500 -mr-10 -mt-10" />

                    {/* Header Kartu: Icon & Status */}
                    <div className="flex justify-between items-start mb-6 z-10">
                      <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gray-50 dark:bg-white/5 text-gray-400 dark:text-gray-500 group-hover:bg-lime-500 group-hover:text-black transition-all duration-300 border border-gray-100 dark:border-white/5 shadow-sm">
                         <item.icon size={26} />
                      </div>
                      
                      {/* Badge Status */}
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                        item.status === 'Completed' ? 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800' :
                        item.status === 'Ongoing' ? 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800' :
                        'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800'
                      }`}>
                        {item.status}
                      </span>
                    </div>

                    {/* Isi Konten */}
                    <div className="flex-1 z-10">
                      <div className="text-xs font-bold text-lime-600 dark:text-lime-500 mb-2 uppercase tracking-wide">
                        {item.category}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                        {item.description}
                      </p>
                    </div>

                    {/* Footer Kartu: Tanggal & Link */}
                    <div className="flex items-center justify-between border-t border-gray-100 dark:border-white/5 pt-6 mt-auto z-10">
                       <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                          <Calendar size={14} />
                          {item.date}
                       </div>
                       
                       <div className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors">
                          Lihat Detail <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                       </div>
                    </div>

                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}