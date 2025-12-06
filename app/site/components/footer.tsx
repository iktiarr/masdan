"use client";

import { Leaf } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-auto border-t transition-colors duration-300 bg-gray-50 dark:bg-[#0a150a] border-gray-200 dark:border-white/5 text-gray-600 dark:text-gray-300 overflow-hidden">
      
      {/* --- BACKGROUND FX --- */}
      <div className="absolute inset-0 pointer-events-none">
         {/* Glow Effect: Lebih terang di Dark Mode, lebih halus di Light Mode */}
         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[100px] bg-lime-400/20 dark:bg-lime-500/5"></div>
         
         {/* Noise Texture: Mode blend berbeda untuk Light/Dark */}
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 dark:opacity-10 mix-blend-multiply dark:mix-blend-overlay"></div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="relative pt-16 pb-12 px-6 z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start">
          
          {/* KOLOM 1: BRANDING */}
          <div className="text-center md:text-left space-y-4">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
               <div className="p-2 bg-lime-100 dark:bg-lime-900/30 rounded-lg text-lime-600 dark:text-lime-400">
                 <Leaf size={24} />
               </div>
               <h3 className="text-3xl font-extrabold tracking-tighter text-gray-900 dark:text-white">
                 M A S D A N
               </h3>
            </div>
            <p className="text-sm leading-relaxed max-w-xs mx-auto md:mx-0 text-gray-500 dark:text-gray-400">
              Membangun inovasi digital adalah perjalanan terbaik yang kami jalani bersama Anda.
            </p>
            <div className="h-1 w-16 rounded-full mx-auto md:mx-0 mt-4 bg-lime-500"></div>
          </div>

          {/* KOLOM 2: QUOTES (List Style) */}
          <div className="flex flex-col space-y-6 justify-center">
            <blockquote className="relative pl-4 text-sm italic border-l-2 transition-colors border-lime-500 text-gray-600 dark:text-gray-400">
              <span className="font-bold text-lime-600 dark:text-lime-400 mr-1">"</span>
              Inovasi adalah kunci untuk membangun masa depan yang lebih cerah.
            </blockquote>
            <blockquote className="relative pl-4 text-sm italic border-l-2 transition-colors border-lime-500/50 text-gray-500 dark:text-gray-500">
              <span className="font-bold text-lime-600 dark:text-lime-400 mr-1">"</span>
              Tidak ada batasan untuk kreativitas ketika kita berani bermimpi besar.
            </blockquote>
            <blockquote className="relative pl-4 text-sm italic border-l-2 transition-colors border-lime-500/50 text-gray-500 dark:text-gray-500">
               <span className="font-bold text-lime-600 dark:text-lime-400 mr-1">"</span>
               Setiap orang memiliki potensi untuk menciptakan perubahan positif.
            </blockquote>
          </div>

          {/* KOLOM 3: KOMITMEN (Card Style) */}
          <div className="text-center md:text-right flex flex-col items-center md:items-end justify-center h-full">
            <div className="p-6 rounded-2xl backdrop-blur-sm shadow-sm dark:shadow-none transition-all duration-300 border bg-white border-gray-200 dark:bg-white/5 dark:border-white/10 max-w-xs hover:border-lime-500/50 dark:hover:border-lime-500/50">
                <p className="text-sm leading-6 font-medium text-gray-700 dark:text-gray-300">
                  "Kami berkomitmen untuk memberikan karya yang berdampak nyata dan berguna bagi ekosistem digital."
                </p>
                <div className="mt-4 flex items-center justify-center md:justify-end gap-2">
                   <div className="h-px w-8 bg-lime-500"></div>
                   <cite className="text-xs font-bold tracking-widest uppercase text-lime-600 dark:text-lime-400">MD Team</cite>
                </div>
            </div>
          </div>

        </div>
      </div>

      {/* --- COPYRIGHT SECTION --- */}
      <div className="relative border-t py-6 transition-colors border-gray-200 dark:border-white/5 bg-gray-100/50 dark:bg-black/20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-gray-500">
            © 2025 MDeveloper. All rights reserved. <span className="text-gray-400 dark:text-gray-600 mx-2">|</span> Dilindungi oleh Iktiar Ramadani
          </p>
        </div>
      </div>

    </footer>
  );
}