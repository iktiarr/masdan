"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

type BannerItem = {
  id: string;
  url: string;
  type: string;
  link?: string;
};

export default function BannerCarousel({ items = [] }: { items: any[] }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  if (!Array.isArray(items) || items.length === 0) return null;

  const slides: BannerItem[] = items.flatMap((item) => {
    const mediaList = item.fields?.iklan || [];
    const link = item.fields?.url || "";

    return mediaList
      .map((media: any) => {
        const fileUrl = media.fields?.file?.url;
        if (!fileUrl) return null;

        return {
          id: media.sys.id,
          url: "https:" + fileUrl,
          type: media.fields?.file?.contentType || "image/jpeg",
          link,
        };
      })
      .filter(Boolean);
  });

  if (slides.length === 0) return null;

  useEffect(() => {
    const timer = setTimeout(() => paginate(1), 4500);
    return () => clearTimeout(timer);
  }, [index]);

  const paginate = (dir: number) => {
    setDirection(dir);
    setIndex((prev) => (prev + dir + slides.length) % slides.length);
  };

  const current = slides[index];

  const isInternalLink = (url?: string) => {
    if (!url) return false;
    return url.startsWith("/") || url.includes("masdan.vercel.app");
  };

  const resolveInternalHref = (url: string) => {
    if (url.startsWith("/")) return url;
    return url.replace("https://masdan.vercel.app", "");
  };

  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    if (!current.link) return <>{children}</>;

    if (isInternalLink(current.link)) {
      return (
        <Link href={resolveInternalHref(current.link)}>
          {children}
        </Link>
      );
    }

    return (
      <a href={current.link} rel="noopener noreferrer">
        {children}
      </a>
    );
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 1,
    }),
    center: {
      x: 0,
      opacity: 1,
      zIndex: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 1,
      zIndex: 0,
    }),
  };

  return (
    <div className="relative group w-full">
      <div
        className="relative overflow-hidden rounded-xl shadow"
        style={{ aspectRatio: "3 / 1" }}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={current.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "tween", duration: 0.55, ease: "easeInOut" },
            }}
            className="absolute inset-0"
          >
            <Wrapper>
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
      </div>
    </div>
  );
}
