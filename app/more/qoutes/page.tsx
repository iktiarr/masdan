"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Tag, ArrowRight, Quote } from "lucide-react";
import Navbar from "@/app/asset/navbar_atas";
import Footer from "@/app/asset/footer_bawah";
import { quotesData } from "@/app/information-menu/data_quotes";

export default function QuotesPage() {
  const router = useRouter();

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#fdfdfd] dark:bg-[#050505] text-gray-900 dark:text-white pt-24 pb-20 overflow-hidden">
        
        {/* --- HEADER --- */}
        <div className="max-w-7xl mx-auto px-6 mb-16 md:mb-24 text-center">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
            Words of <span className="text-lime-600">Wisdom</span>
          </h1>
          <p className="max-w-2xl mx-auto text-gray-500 dark:text-gray-400 text-lg leading-relaxed">
            Setiap kata memiliki kekuatan. Temukan kutipan dari para visioner yang membentuk cara kita berpikir dan berkarya.
          </p>
        </div>

        {/* --- CONTENT LOOP (ZIG-ZAG) --- */}
        <div className="max-w-7xl mx-auto px-6 space-y-20 md:space-y-32">
          {quotesData.map((item, idx) => {
            // Logic: Jika Index Genap (0, 2, 4) -> Gambar Kiri. Jika Ganjil (1, 3) -> Gambar Kanan.
            const isEven = idx % 2 === 0;

            return (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col gap-8 md:gap-16 items-center ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                
                {/* --- IMAGE SECTION --- */}
                <div className="w-full md:w-1/2 relative group">
                  <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden relative shadow-2xl shadow-gray-200 dark:shadow-black/50">
                    <img 
                      src={item.image_url} 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Dark Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>

                    {/* Badges (Mirip Referensi Gambar) */}
                    <div className="absolute bottom-6 left-6 flex gap-2">
                      <div className="px-3 py-1.5 bg-white/90 backdrop-blur-md text-gray-900 text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-lg">
                        <Tag size={12} className="text-lime-600" />
                        {item.tag}
                      </div>
                      <div className="px-3 py-1.5 bg-white/90 backdrop-blur-md text-gray-900 text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-lg">
                        <MapPin size={12} className="text-lime-600" />
                        {item.location}
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative Blob */}
                  <div className={`absolute -z-10 w-full h-full top-6 ${isEven ? "-left-6" : "-right-6"} rounded-[2.5rem] border-2 border-lime-500/20 dark:border-lime-500/10`}></div>
                </div>

                {/* --- TEXT SECTION --- */}
                <div className="w-full md:w-1/2 space-y-6">
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                      {item.name}
                    </h3>
                    <p className="text-sm font-bold tracking-widest uppercase text-lime-600 dark:text-lime-500">
                      {item.role} • {item.category}
                    </p>
                  </div>

                  {/* Quote Block (Garis Samping) */}
                  <div className="relative pl-6 border-l-4 border-lime-500 py-2">
                     <Quote size={40} className="absolute -top-4 -left-3 text-lime-500/10 fill-lime-500/10" />
                     <p className="text-xl md:text-2xl font-serif italic text-gray-700 dark:text-gray-200 leading-relaxed">
                       "{item.quote}"
                     </p>
                  </div>

                  <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-justify">
                    {item.description}
                  </p>

                  <div className="pt-2">
                    <Link 
                      href={item.link_url}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-lime-500 text-white font-bold hover:bg-lime-600 hover:shadow-lg hover:shadow-lime-500/20 transition-all active:scale-95"
                    >
                      {item.link_text}
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* --- TOMBOL KEMBALI (Floating / Bottom) --- */}
        <div className="fixed bottom-6 right-6 z-40">
           <button 
             onClick={() => router.back()}
             className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white rounded-full shadow-2xl border border-gray-200 dark:border-white/10 hover:scale-105 active:scale-95 transition-all font-bold group"
           >
             <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
             Kembali
           </button>
        </div>

      </main>

      <Footer />
    </>
  );
}