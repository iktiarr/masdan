"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import Image from "next/image";

export default function BannerCarousel({ items = [] }: { items: any[] }) {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // --- SAFETY CHECK ---
  if (!items || items.length === 0) return null;

  // --- 1. PROSES DATA ---
  const slides = items.flatMap((item) => {
    const mediaList = item.fields?.iklan || []; 
    const title = item.fields?.nama || "";
    const link = item.fields?.url || "";

    return mediaList.map((media: any) => {
      const fileUrl = media.fields?.file?.url;
      if (!fileUrl) return null;
      return {
        id: media.sys.id,
        title: title,
        link: link,
        url: "https:" + fileUrl,
        type: media.fields?.file?.contentType || "image/jpeg",
      };
    }).filter(Boolean);
  });

  // --- 2. AUTO PLAY LOGIC (5 DETIK) ---
  useEffect(() => {
    if (isHovered) return; // Pause jika user sedang hover/drag

    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [index, isHovered]);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // --- 3. LOGIC TAMPILAN RESPONSIF (Desktop 3, Mobile 1) ---
  // Kita ambil 3 item yang akan ditampilkan berdasarkan index saat ini (Looping)
  const getVisibleSlides = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(slides[(index + i) % slides.length]);
    }
    return visible;
  };

  const visibleSlides = getVisibleSlides();

  return (
    <div 
      className="relative w-full group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      {/* CONTAINER GRID (RESPONSIVE) */}
      {/* Mobile: Grid 1, Desktop: Grid 3 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-4">
        
        <AnimatePresence mode="popLayout">
          {visibleSlides.map((slide: any, idx: number) => {
             const isVideo = slide.type?.startsWith("video");
             const Wrapper = slide.link ? 'a' : 'div';
             const wrapperProps = slide.link ? { href: slide.link, target: "_blank", rel: "noopener noreferrer" } : {};
             
             // Di mobile, hanya tampilkan item pertama (index 0) agar jadi slider tunggal
             // Di desktop, tampilkan ketiganya
             const isHiddenOnMobile = idx > 0 ? "hidden md:block" : "block";

             return (
               <motion.div
                 key={`${slide.id}-${index}-${idx}`} // Key unik agar animasi jalan
                 layout
                 initial={{ opacity: 0, x: 50 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -50 }}
                 transition={{ duration: 0.4, ease: "easeInOut" }}
                 className={`relative aspect-2/1 w-full bg-white dark:bg-black border border-gray-200 dark:border-white/10 overflow-hidden ${isHiddenOnMobile}`}
               >
                  <Wrapper {...wrapperProps} className="block w-full h-full relative cursor-pointer group/item">
                     {/* MEDIA */}
                     {isVideo ? (
                        <video src={slide.url} autoPlay muted loop playsInline className="w-full h-full object-cover" />
                     ) : (
                        <Image src={slide.url} alt={slide.title} fill className="object-cover transition-transform duration-700 group-hover/item:scale-105" />
                     )}

                     {/* HOVER OVERLAY (Link) */}
                     {slide.link && (
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                           <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest border border-white px-4 py-2">
                              Buka Link <ExternalLink size={12} />
                           </div>
                        </div>
                     )}
                  </Wrapper>
               </motion.div>
             );
          })}
        </AnimatePresence>

      </div>

      {/* NAVIGASI MANUAL (PANAH) */}
      {slides.length > 1 && (
        <>
          <button 
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 dark:bg-black/80 text-black dark:text-white hover:bg-lime-500 hover:text-black transition-colors z-20 shadow-lg border border-gray-200 dark:border-white/10 md:opacity-0 md:group-hover:opacity-100"
          >
             <ChevronLeft size={20} />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 dark:bg-black/80 text-black dark:text-white hover:bg-lime-500 hover:text-black transition-colors z-20 shadow-lg border border-gray-200 dark:border-white/10 md:opacity-0 md:group-hover:opacity-100"
          >
             <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* INDIKATOR HALAMAN (DOTS) */}
      <div className="flex justify-center gap-1 mt-4">
        {slides.map((_, i) => (
           <button
             key={i}
             onClick={() => setIndex(i)}
             className={`h-1 transition-all duration-300 ${
               i === index ? "w-8 bg-lime-600 dark:bg-lime-500" : "w-2 bg-gray-300 dark:bg-gray-800"
             }`}
           />
        ))}
      </div>

    </div>
  );
}