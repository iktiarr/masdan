"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Aperture } from "lucide-react";

export default function AboutSection() {
  const [nickIndex, setNickIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const nicknames = ["Iktiar Ramadani", "Mas Dan", "Iktiar", "Dani", "Rama"];

  useEffect(() => {
    const interval = setInterval(() => {
      setNickIndex((prev) => (prev + 1) % nicknames.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative py-15 bg-white dark:bg-[#0a0a0a] overflow-hidden transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto relative z-10 px-6">

        <motion.header
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col md:flex-row md:items-end gap-2 md:gap-6"
        >
          <div className="relative">
            <h2
              id="about-heading"
              className="text-6xl md:text-8xl font-black text-gray-900 dark:text-white tracking-tighter leading-[0.85]"
            >
              Tentang{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-lime-300 to-lime-600">
                Saya
              </span>
            </h2>
            <div className="absolute -bottom-2 left-2 w-1/2 h-2 bg-lime-400/30 dark:bg-lime-500/20 rounded-full" />
          </div>
        </motion.header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <motion.figure
            initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="col-span-1 h-[450px] relative rounded-[2.5rem] overflow-hidden border border-gray-200 dark:border-white/10 shadow-xl bg-gray-50 dark:bg-[#111]"
          >
            <Image
              src="/profil.jpg"
              alt="Foto profil Iktiar Ramadani"
              fill
              loading="lazy"
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/40 to-transparent opacity-90 dark:opacity-80 transition-opacity"
            />

            <figcaption className="absolute bottom-0 left-0 w-full p-8">
              <div className="relative h-15 mb-1 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.h3
                    key={nicknames[nickIndex]}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.45 }}
                    className="text-2xl font-bold text-white absolute top-3 left-0"
                  >
                    {nicknames[nickIndex]}
                  </motion.h3>
                </AnimatePresence>
              </div>
            </figcaption>
          </motion.figure>

          <motion.article
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="col-span-1 md:col-span-2 bg-white dark:bg-[#111] rounded-[2.5rem] p-8 md:p-12 border border-gray-100 dark:border-white/10 shadow-lg relative overflow-hidden"
          >
            <div
              aria-hidden="true"
              className="absolute top-0 right-0 w-64 h-64 bg-lime-500/5 rounded-full blur-[80px]"
            />

            <div className="relative z-10 space-y-8">
              <div>
                <h3 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white leading-snug">
                  Saya percaya bahwa karya memberikan banyak{" "}
                  <span className="text-lime-100 dark:text-lime-500 bg-lime-500 dark:bg-lime-100 px-2 rounded-lg">
                    manfaat.
                  </span>
                </h3>
              </div>

              <div className="space-y-4 text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed font-medium">
                <p>
                  Hai, saya{" "}
                  <strong className="text-gray-900 dark:text-white">
                    Iktiar Ramadani
                  </strong>
                  . Saya adalah seorang mahasiswa yang memiliki minat dalam teknologi 
                  terutama dalam bidang pengembangan sistem. Perjalanan saya dimulai dari rasa ingin tahu sederhana:
                  <em> "Bagaimana sesuatu bekerja?"</em> Hingga kini berkembang
                  menjadi ambisi menciptakan sistem digital dan rasa ingin tahu
                  yang besar.
                </p>
                <p>
                  Saya tidak ingin hanya menulis baris kode atau hanya membuat suatu sistem, namun{" "}
                  <strong className="text-gray-900 dark:text-white border-b-2 border-lime-400 pb-0.5">
                    memecahkan hal yang tampak tidak masuk akal
                  </strong>
                  . Fokus utama saya adalah belajar apapun yang membawa nilai.
                </p>
              </div>
            </div>
          </motion.article>

          <motion.article
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 40 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="col-span-1 md:col-span-3 bg-gray-900 dark:bg-[#151515] text-white rounded-[2.5rem] p-8 md:p-10 border border-gray-800 dark:border-white/5 relative overflow-hidden"
          >
            <Image
              src="/ft2.jpg"
              alt="Background blur abstract"
              fill
              loading="lazy"
              className="object-cover opacity-30 dark:opacity-20 blur-2xl scale-110 transition-transform duration-[2s]"
            />

            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-r from-gray-900 via-gray-900/80 to-transparent dark:from-[#151515] dark:via-[#151515]/80"
            />

            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/3 space-y-4">
                <h3 className="text-3xl font-bold leading-tight">
                  Di Balik Layar <br />
                  <span className="text-lime-400">ide dan logika.</span>
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed">
                  Tempat di mana ide menjadi nyata. Rasa ingin tahu membawa kita
                  semakin jauh.
                </p>
              </div>

              <div className="w-full md:w-2/3 flex gap-4 h-48 md:h-64">
                <div className="flex-2 relative rounded-2xl overflow-hidden border border-white/10 shadow-lg cursor-pointer transition-all duration-500">
                  <Image
                    src="/ft2.jpg"
                    alt="Workspace area"
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-700 hover:scale-110 grayscale hover:grayscale-0"
                  />
                </div>

                <div className="flex-1 flex flex-col gap-4">
                  <div className="flex-1 relative rounded-2xl overflow-hidden border border-white/10 cursor-pointer">
                    <Image
                      src="/ft3.jpg"
                      alt="Coffee table"
                      fill
                      loading="lazy"
                      className="object-cover transition-transform duration-700 hover:scale-110 grayscale hover:grayscale-0"
                    />
                  </div>

                  <div className="flex-1 relative rounded-2xl overflow-hidden border border-white/10 cursor-pointer bg-gray-800">
                    <Image
                      src="/ft4.jpg"
                      alt="Desk setup"
                      fill
                      loading="lazy"
                      className="object-cover opacity-60 transition-transform duration-700 hover:scale-110 hover:opacity-100"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
