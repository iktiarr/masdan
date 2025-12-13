"use client";
import React from "react";
import { SparklesCore } from "@/components/ui/sparkles";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="min-h-screen w-full bg-white flex flex-col items-center justify-center overflow-hidden relative">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="md:text-7xl text-5xl lg:text-9xl font-bold text-center text-black relative z-20"
      >
        MASDAN
      </motion.h1>

      <div className="w-[40rem] h-40 relative mt-4">
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-lime-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-lime-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-lime-300 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-lime-400 to-transparent h-px w-1/4" />

        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1000}
          className="w-full h-full"
          particleColor="#000000"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col items-center text-center gap-4 relative z-20 -mt-10"
      >
        <h2 className="text-xl md:text-3xl font-semibold text-neutral-700">
          Building An <span className="text-lime-600">Experience</span> with{" "}
          <span className="text-lime-600">Ideas</span>.
        </h2>

        <p className="max-w-lg text-sm md:text-base text-neutral-700 leading-relaxed border-l-4 border-lime-600 pl-4">
          I'm <span className="text-lime-700 font-semibold">Iktiar Ramadani</span>,
          a teenager with a
          <span className="text-black font-semibold"> deep interest and boundless curiosity </span> 
          in the world of design.
          <span className="text-lime-600 font-semibold"> My main goal </span>
          is to create works that are not only
          <span className="text-lime-600 font-semibold"> visually appealing</span>, 
          but also provide <span className="text-lime-600 font-semibold">value </span> 
          and meaning to
          <span className="text-lime-600 font-semibold"> inspire</span> others.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Link
            href="/"
            className="px-8 py-3 rounded-full bg-lime-600 hover:bg-lime-700 text-white font-bold transition duration-200 shadow-[0_0_20px_rgba(101,163,13,0.4)]"
          >
            Follow Me Now
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
