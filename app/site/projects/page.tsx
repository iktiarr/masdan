"use client";

import { useState, useEffect } from "react";
import { createClient } from "contentful";
import { ArrowRight, PlayCircle, CheckCircle2, Loader2 } from "lucide-react";
import AOS from "aos";
import { motion, AnimatePresence } from "framer-motion";

import ProductOverlay from "../projects/components/ProductOverlay";
import TutorialModal from "../projects/components/TutorialModal";

const TUTORIAL_SLIDES = [
  {
    id: 1,
    image: "/produk1.jpg",
    title: "Jelajahi Katalog Premium",
    description: "Temukan berbagai template dan source code berkualitas tinggi yang terkurasi untuk kebutuhan project Anda."
  },
  {
    id: 2,
    image: "/produk3.jpg",
    title: "Proses Checkout Mudah",
    description: "Sistem pembayaran yang aman dan cepat. Dapatkan akses instan setelah transaksi berhasil."
  },
  {
    id: 3,
    image: "/produk2.jpg",
    title: "Unduh & Kembangkan",
    description: "Dapatkan file lengkap beserta dokumentasi. Siap untuk dimodifikasi dan mempercepat workflow Anda."
  }
];

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || "",
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || ""
});

export default function ProjectsSection() {
  const [products, setProducts] = useState<any[]>([]);
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 50 });

    async function fetchData() {
      try {
        const res = await client.getEntries({ content_type: "product" });
        setProducts(res.items);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % TUTORIAL_SLIDES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="projects"
      aria-label="Produk dan Result"
      className="relative py-15 bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white font-sans overflow-hidden transition-colors duration-300"
    >
      <ProductOverlay
        isOpen={isProductOpen}
        onClose={() => setIsProductOpen(false)}
        products={products}
      />

      <TutorialModal
        isOpen={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
      />

      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="text-center lg:text-left space-y-8" data-aos="fade-right">
            <div className="flex flex-col items-center mb-2 animate-fade-in-right">
              <h2 className="text-4xl md:text-6xl font-black text-neutral-900 dark:text-white tracking-tighter mb-2">
                <span className="text-lime-500">Produk & Hasil </span>Saya
              </h2>
            </div>

          <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
            Koleksi template, source code, dan aset digital berkualitas tinggi untuk mempercepat development Anda. Hemat waktu, hasil maksimal.
          </p>

          <ul className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3 text-sm text-gray-500 dark:text-gray-500 font-bold">
            <li className="flex items-center gap-2">
              <CheckCircle2 size={18} className="text-lime-600 dark:text-lime-500" />
              100% Kode Original
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 size={18} className="text-lime-600 dark:text-lime-500" />
              Garansi Terjamin
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 size={18} className="text-lime-600 dark:text-lime-500" />
              Akses Mudah
            </li>
          </ul>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-6">
            <button
              onClick={() => setIsProductOpen(true)}
              className="w-full sm:w-auto px-8 py-4 bg-lime-400 dark:bg-lime-500 hover:bg-lime-600 dark:hover:bg-lime-400 text-black dark:text-black font-bold rounded-xl flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1"
              aria-label="Lihat semua produk"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>
                  Lihat Semua Produk <ArrowRight size={18} />
                </>
              )}
            </button>

            <button
              onClick={() => setIsTutorialOpen(true)}
              className="w-full sm:w-auto px-8 py-4 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-lime-500 dark:text-lime-500 font-semibold rounded-xl border border-gray-200 dark:border-white/10 flex items-center justify-center gap-2 transition-all"
              aria-label="Buka panduan cara membeli"
            >
              <PlayCircle size={18} /> Panduan Cara Membeli?
            </button>
          </div>
        </div>

        <figure
          className="relative w-full aspect-square md:aspect-video rounded-4xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-2xl bg-gray-50 dark:bg-[#111]"
          data-aos="fade-left"
          data-aos-delay="200"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              <img
                src={TUTORIAL_SLIDES[activeSlide].image}
                alt={TUTORIAL_SLIDES[activeSlide].title}
                className="w-full h-full object-cover"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/40 to-transparent opacity-90 dark:opacity-80" />
            </motion.div>
          </AnimatePresence>

          <figcaption className="absolute bottom-0 left-0 w-full p-8 md:p-10 flex flex-col justify-end items-start gap-3 z-20">
            <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight drop-shadow-md">
              {TUTORIAL_SLIDES[activeSlide].title}
            </h3>
            <p className="text-gray-300 line-clamp-3 text-sm md:text-base font-medium drop-shadow-sm max-w-md">
              {TUTORIAL_SLIDES[activeSlide].description}
            </p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
