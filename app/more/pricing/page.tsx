"use client";

import { motion } from "framer-motion";
import { Check, X, Shield, Star, Award, Rocket } from "lucide-react";
import Link from "next/link";
import AOS from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";

// Import Data & Components
import { pricingPackages } from "@/app/information-menu/data_pricing";
import Navbar from "@/app/asset/navbar_atas";
import Footer from "@/app/asset/footer_bawah";
import SimpleHeader from "@/app/asset/navbar_atas"; 

// Helper untuk styling warna-warni
const getCardStyle = (color: string, isHighlight: boolean) => {
  const base = "border rounded-3xl p-6 transition-all duration-300 relative overflow-hidden";
  
  // Highlight (Pro Member) -> Lime Theme Dominant
  if (isHighlight) {
    return `${base} bg-[#0a150a] border-lime-500 shadow-2xl shadow-lime-500/20 scale-105 z-10 ring-4 ring-lime-500/20`;
  }

  // Normal Cards (Light/Dark Mode Adaptive)
  switch (color) {
    case "blue": return `${base} bg-white dark:bg-[#0f172a] border-blue-200 dark:border-blue-900 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10`;
    case "purple": return `${base} bg-white dark:bg-[#1e1b4b] border-purple-200 dark:border-purple-900 hover:border-purple-500 dark:hover:border-purple-500 hover:shadow-xl hover:shadow-purple-500/10`;
    case "orange": return `${base} bg-white dark:bg-[#2a1205] border-orange-200 dark:border-orange-900 hover:border-orange-500 dark:hover:border-orange-500 hover:shadow-xl hover:shadow-orange-500/10`;
    default: return `${base} bg-white dark:bg-[#121212] border-gray-200 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/30 hover:shadow-lg`;
  }
};

const getIconStyle = (color: string) => {
  switch (color) {
    case "lime": return "bg-lime-500 text-black";
    case "blue": return "bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400";
    case "purple": return "bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400";
    case "orange": return "bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400";
    default: return "bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-400";
  }
};

export default function PricingPage() {
  
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <>
      <Navbar />

      <main className="relative min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white font-sans transition-colors duration-300 pt-24 pb-20 px-4 md:px-8">
        
        <SimpleHeader title="Investasi Untuk Belajar" />

        {/* --- BACKGROUND FX --- */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
           <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-lime-500/5 rounded-full blur-[120px]" />
           <div className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px]" />
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          
          {/* --- HEADER SECTION --- */}
          <div className="text-center mb-16 space-y-4" data-aos="fade-down">
             <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900 dark:text-white">
               Pilih Paket <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-500 to-emerald-600">Belajar</span>
             </h1>
             <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
               Percepat karir coding-mu dengan bimbingan privat. Pilih paket yang sesuai dengan target dan kecepatan belajarmu.
             </p>
             
             {/* Divider */}
             <div className="w-full h-px bg-gradient-to-r from-transparent via-lime-500/50 to-transparent mt-8 max-w-xs mx-auto" />
          </div>

          {/* --- PRICING GRID --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 items-start">
             {pricingPackages.map((pkg, idx) => {
               const isHighlight = pkg.highlight;
               
               return (
                 <motion.div 
                   key={pkg.id}
                   initial={{ opacity: 0, y: 30 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: idx * 0.1 }}
                   className={`flex flex-col h-full ${getCardStyle(pkg.color, isHighlight)}`}
                 >
                    {/* Badge Best Seller */}
                    {isHighlight && (
                      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-lime-400 to-emerald-500" />
                    )}
                    {isHighlight && (
                       <div className="absolute top-4 right-4">
                          <span className="bg-lime-500 text-black text-[10px] font-bold px-2 py-0.5 rounded shadow-lg shadow-lime-500/50 animate-pulse">
                             {pkg.badge}
                          </span>
                       </div>
                    )}

                    {/* Header */}
                    <div className="mb-6">
                       <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-sm ${getIconStyle(pkg.color)}`}>
                          <pkg.icon size={22} />
                       </div>
                       <h3 className={`text-lg font-bold mb-1 ${isHighlight ? "text-white" : "text-gray-900 dark:text-white"}`}>
                         {pkg.name}
                       </h3>
                       <p className={`text-xs min-h-[40px] leading-relaxed ${isHighlight ? "text-gray-400" : "text-gray-500 dark:text-gray-400"}`}>
                         {pkg.desc}
                       </p>
                    </div>

                    {/* Price */}
                    <div className={`mb-6 pb-6 border-b ${isHighlight ? "border-white/10" : "border-gray-100 dark:border-white/5"}`}>
                       <div className="flex items-baseline gap-1">
                          <span className={`text-3xl font-black ${isHighlight ? "text-white" : "text-gray-900 dark:text-white"}`}>
                            {pkg.price}
                          </span>
                          <span className="text-xs text-gray-500 font-bold">{pkg.period}</span>
                       </div>
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 mb-8 flex-1">
                       {pkg.features.map((feat, i) => (
                         <li key={i} className="flex items-start gap-3 text-sm">
                            {feat.active ? (
                              <Check size={16} className={`shrink-0 mt-0.5 ${isHighlight ? "text-lime-500" : `text-${pkg.color}-500 dark:text-${pkg.color}-400`}`} />
                            ) : (
                              <X size={16} className="text-gray-300 dark:text-gray-700 shrink-0 mt-0.5" />
                            )}
                            <span className={feat.active ? (isHighlight ? "text-gray-300" : "text-gray-700 dark:text-gray-300") : "text-gray-400 dark:text-gray-600 line-through decoration-gray-400/50"}>
                              {feat.text}
                            </span>
                         </li>
                       ))}
                    </ul>

                    {/* CTA Button */}
                    <Link 
                       href={pkg.price === "Hubungi" ? "/contact" : "/checkout"}
                       className={`w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center transition-all shadow-lg active:scale-95
                         ${isHighlight 
                           ? "bg-lime-500 text-black hover:bg-lime-400 shadow-lime-500/20" 
                           : "bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 shadow-gray-500/10"
                         }
                       `}
                    >
                       {pkg.price === "Hubungi" ? "Kontak Admin" : "Pilih Paket"}
                    </Link>

                 </motion.div>
               );
             })}
          </div>

          {/* --- TRUST BADGES --- */}
          <div className="mt-20 border-t border-gray-200 dark:border-white/5 pt-10 text-center">
             <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-widest">
                   <Shield size={16} className="text-lime-500" /> Secure Payment
                </div>
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-widest">
                   <Award size={16} className="text-lime-500" /> Verified Mentor
                </div>
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-widest">
                   <Star size={16} className="text-lime-500" /> 4.9/5 Student Rating
                </div>
             </div>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}