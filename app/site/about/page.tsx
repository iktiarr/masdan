"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Aperture } from "lucide-react";

export default function AboutSection() {
  const [nickIndex, setNickIndex] = useState(0);
  
  const nicknames = ["Iktiar Ramadani", "Mas Dan", "Iktiar", "Dani", "Rama"];

  useEffect(() => {
    const interval = setInterval(() => {
      setNickIndex((prev) => (prev + 1) % nicknames.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="relative py-24 bg-white dark:bg-[#0a0a0a] overflow-hidden transition-colors duration-300">
      <div className="max-w-6xl mx-auto relative z-10 px-6">

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col md:flex-row md:items-end gap-2 md:gap-6"
        >
           <div className="relative">
             <h2 className="text-6xl md:text-8xl font-black text-gray-900 dark:text-white tracking-tighter leading-[0.85]">
               Tentang <span className="text-transparent bg-clip-text bg-linear-to-r from-lime-300 to-lime-600">Saya</span>
             </h2>
             <div className="absolute -bottom-2 left-2 w-1/2 h-2 bg-lime-400/30 dark:bg-lime-500/20 -z-10 rounded-full"></div>
           </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="col-span-1 h-[450px] relative rounded-[2.5rem] overflow-hidden border border-gray-200 dark:border-white/10 shadow-xl shadow-gray-200/50 dark:shadow-none group bg-gray-50 dark:bg-[#111]"
          >
             <Image 
               src="/profil.jpg" 
               fill 
               alt="Profile" 
               className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
             />
             

             <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/40 to-transparent opacity-90 dark:opacity-80 group-hover:opacity-70 transition-opacity duration-500"></div>
             
             <div className="absolute bottom-0 left-0 w-full p-8">
                <div className="h-8 mb-1 overflow-hidden relative">
                   <AnimatePresence mode="wait">
                      <motion.h3
                         key={nicknames[nickIndex]}
                         initial={{ y: 20, opacity: 0 }}
                         animate={{ y: 0, opacity: 1 }}
                         exit={{ y: -20, opacity: 0 }}
                         transition={{ duration: 0.5 }}
                         className="text-2xl font-bold text-white tracking-tight absolute top-0 left-0"
                      >
                         {nicknames[nickIndex]}
                      </motion.h3>
                   </AnimatePresence>
                </div>
                
                <div className="flex items-center gap-3 mt-4">
                   <div className="px-3 py-1 rounded-full bg-lime-500/20 border border-lime-500/30 backdrop-blur-md flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-500"></span>
                      </span>
                      <span className="text-[10px] font-bold text-lime-400 uppercase tracking-wider">Siap 24 Jam</span>
                   </div>
                </div>
             </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="col-span-1 md:col-span-2 bg-white dark:bg-[#111] rounded-[2.5rem] p-8 md:p-12 shadow-lg shadow-gray-100/50 dark:shadow-none border border-gray-100 dark:border-white/10 flex flex-col justify-center relative overflow-hidden"
          >

             <div className="absolute top-0 right-0 w-64 h-64 bg-lime-500/5 rounded-full blur-[80px] pointer-events-none"></div>

             <div className="relative z-10 space-y-8">
                <div>
                  <h3 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white leading-snug">
                    Saya percaya bahwa karya apapun memberikan <span className="italic font-serif font-normal text-gray-400 dark:text-gray-500">kehidupan</span> yang sangat <span className="text-lime-600 dark:text-lime-400 bg-lime-50 dark:bg-lime-500/10 px-2 rounded-lg box-decoration-clone">bermanfaat.</span>
                  </h3>
                  <div className="w-20 h-1.5 bg-gray-900 dark:bg-white mt-6 rounded-full"></div>
                </div>

                <div className="space-y-4 text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed font-medium">
                  <p>
                    Hai, saya <strong className="text-gray-900 dark:text-white">Iktiar Ramadani</strong>. Perjalanan saya di dunia teknologi dimulai dari rasa ingin tahu sederhana: <em>"Bagaimana sesuatu bekerja?"</em>. Kini, rasa itu telah berevolusi menjadi obsesi untuk menciptakan ekosistem digital yang kompleks dan rasa ingin tau yang luar biasa.
                  </p>
                  <p>
                    Saya tidak ingin hanya menulis baris kode. Namun saya ingin <strong className="text-gray-900 dark:text-white border-b-2 border-lime-400 pb-0.5">memecahkan sebuah hal yang tidak masuk akal</strong>. Fokus utama saya adalah selalu ingin belajar tentang hal apapun yang ada di dunia ini.
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 italic pt-2">
                    "Barang siapa yang bersungguh-sungguh, maka dia akan mendapatkan kesuksesan."
                  </p>
                </div>
             </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="col-span-1 md:col-span-3 bg-gray-900 dark:bg-[#151515] text-white rounded-[2.5rem] p-8 md:p-10 overflow-hidden relative group border border-gray-800 dark:border-white/5"
          >

             <Image src="/ft2.jpg" fill alt="bg" className="object-cover opacity-30 dark:opacity-20 blur-2xl scale-110 group-hover:scale-100 transition-transform duration-[2s]" />
             <div className="absolute inset-0 bg-linear-to-r from-gray-900 via-gray-900/80 to-transparent dark:from-[#151515] dark:via-[#151515]/80"></div>
             
             <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                <div className="w-full md:w-1/3 space-y-4">
                   <div className="flex items-center gap-2 text-lime-400 font-bold uppercase tracking-widest text-xs">
                      <Aperture size={16} /> Kehidupan & Kreativitas
                   </div>
                   <h3 className="text-3xl font-bold leading-tight text-white">
                      Di Balik Layar <br/> <span className="text-gray-400">ide dan logika.</span>
                   </h3>
                   <p className="text-gray-400 text-sm leading-relaxed">
                      Tempat ide menjadi nyata. Sedikit rasa ingin tau akan membawamu semakin baik.
                   </p>
                </div>

                <div className="w-full md:w-2/3 flex gap-4 h-48 md:h-64">
                   <div className="flex-2 relative rounded-2xl overflow-hidden border border-white/10 group/img cursor-pointer shadow-lg hover:shadow-lime-500/20 transition-all duration-500">
                      <Image src="/ft2.jpg" fill alt="Workspace" className="object-cover transition-transform duration-700 hover:scale-110 grayscale hover:grayscale-0" />
                   </div>

                   <div className="flex-1 flex flex-col gap-4">
                      <div className="flex-1 relative rounded-2xl overflow-hidden border border-white/10 group/img cursor-pointer">
                         <Image src="/ft3.jpg" fill alt="Coffee" className="object-cover transition-transform duration-700 hover:scale-110 grayscale hover:grayscale-0" />
                      </div>
                      <div className="flex-1 relative rounded-2xl overflow-hidden border border-white/10 group/img cursor-pointer flex items-center justify-center bg-gray-800">
                         <Image src="/ft4.jpg" fill alt="Setup" className="object-cover opacity-60 transition-transform duration-700 hover:scale-110 hover:opacity-100" />
                      </div>
                   </div>
                </div>

             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}