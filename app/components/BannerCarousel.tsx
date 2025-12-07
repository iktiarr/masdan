"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function BannerCarousel({ items = [] }: { items: any[] }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  if (!items || !Array.isArray(items) || items.length === 0) return null;

  const slides = items.flatMap((item) => {
    const mediaList = item.fields?.iklan || [];
    const link = item.fields?.url || "";

    return mediaList
      .map((media: any) => {
        const fileUrl = media.fields?.file?.url;
        if (!fileUrl) return null;
        return {
          id: media.sys.id,
          link,
          url: "https:" + fileUrl,
          type: media.fields?.file?.contentType || "image/jpeg",
        };
      })
      .filter(Boolean);
  });

  if (slides.length === 0) return null;

  // Autoplay yang smooth (tanpa bentrok dengan drag)
  useEffect(() => {
    const timer = setTimeout(() => nextSlide(), 4500);
    return () => clearTimeout(timer);
  }, [index]);

  const paginate = (dir: number) => {
    setDirection(dir);
    setIndex((prev) => (prev + dir + slides.length) % slides.length);
  };

  const nextSlide = () => paginate(1);
  const prevSlide = () => paginate(-1);

  // VARIANTS BARU (lebih smooth, tidak jitter)
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100vw" : "-100vw",
      opacity: 1,
    }),
    center: {
      x: 0,
      opacity: 1,
      zIndex: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100vw" : "-100vw",
      opacity: 1,
      zIndex: 0,
    }),
  };

  const current = slides[index];
  const Wrapper = current.link ? "a" : "div";
  const props = current.link ? { href: current.link, target: "_blank" } : {};

  return (
    <div className="relative  group">
      <div
        className="relative overflow-hidden shadow"
        style={{ aspectRatio: "3/1" }}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "tween", duration: 0.55, ease: "easeInOut" },
            }}
            className="absolute inset-0 w-full h-full"
          >
            <Wrapper {...props} className="block w-full h-full relative">
              {current.type.startsWith("video") ? (
                <video
                  src={current.url}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={current.url}
                  alt="Banner"
                  fill
                  className="object-cover"
                  priority
                />
              )}
            </Wrapper>
          </motion.div>
        </AnimatePresence>

        {/* DOTS (tanpa background hitam) */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > index ? 1 : -1);
                setIndex(idx);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === index
                  ? "w-6 bg-white"
                  : "w-2 bg-white/60 hover:bg-white"
              }`}
            />
          ))}
        </div>

        {/* NAV (tanpa background hitam, hanya putih transparan lembut) */}
        <button
          onClick={prevSlide}
          className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 
          p-2 rounded-full bg-white/60 hover:bg-white shadow transition"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={nextSlide}
          className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 
          p-2 rounded-full bg-white/60 hover:bg-white shadow transition"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
