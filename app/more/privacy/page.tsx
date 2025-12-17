"use client";

import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import AOS from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";

// Import Data & Components
import { privacyPolicies } from "@/app/information-menu/data_privacy";
import Navbar from "@/app/asset/navbar_atas";
import Footer from "@/app/asset/footer_bawah";
import SimpleHeader from "@/app/asset/navbar_atas"; 

export default function PrivacyPage() {
  
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <>
      <Navbar />

      <main className="relative min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white font-sans transition-colors duration-300 pt-24 pb-20 px-4 md:px-8">
        
        <SimpleHeader title="Privacy Policy" />

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
               Kebijakan <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-500 to-emerald-600">Privasi</span>
             </h1>
             <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
               Transparansi adalah prioritas kami. Berikut adalah penjelasan bagaimana kami mengelola dan melindungi data Anda.
             </p>
             
             {/* Divider */}
             <div className="w-full h-px bg-gradient-to-r from-transparent via-lime-500/50 to-transparent mt-8 max-w-xs mx-auto" />
          </div>

          {/* --- GRID POLICIES --- */}
          <div className="grid md:grid-cols-2 gap-6">
            {privacyPolicies.map((policy, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`group bg-white dark:bg-[#121212] border border-gray-200 dark:border-white/5 hover:border-lime-500/30 dark:hover:border-lime-500/30 rounded-2xl p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-lime-500/5 ${idx === privacyPolicies.length - 1 ? "md:col-span-2" : ""}`}
              >
                 <div className="flex items-start gap-5">
                    {/* Icon Box */}
                    <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-white/5 text-gray-400 dark:text-gray-500 group-hover:bg-lime-500 group-hover:text-black transition-all duration-300 shrink-0">
                       <policy.icon size={24} />
                    </div>
                    
                    {/* Content */}
                    <div>
                       <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors">
                         {policy.title}
                       </h3>
                       <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed text-justify">
                         {policy.content}
                       </p>
                    </div>
                 </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}