"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Download, MousePointer2, Smartphone, Database, Code2, ArrowRight,Terminal } from "lucide-react";

export default function HeroSection() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const prefersReducedMotion = useReducedMotion();

  const words = ["Front-End Developer", "AI Enthusiast", "Next App Developer", "UI/UX Designer", "Ambitious Student"];

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % words.length;
      const fullText = words[i];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 50 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative min-h-screen flex items-center justify-center bg-white dark:bg-[#0a0a0a] overflow-hidden px-6 py-20 md:py-0 transition-colors duration-300"
    >
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        <motion.figure
          initial={prefersReducedMotion ? {} : { opacity: 0, x: -40 }}
          animate={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto order-1"
        >
          <div className="absolute inset-0 w-full h-full bg-linear-to-tr from-lime-200 via-green-100 to-transparent dark:from-lime-300 dark:via-lime-500 rounded-full blur-3xl opacity-60 dark:opacity-40"></div>

          <div className="relative w-full max-w-md mx-auto">
            <img
              src="/hero4.svg"
              alt="Developer illustration"
              width={500}
              height={500}
              loading="lazy"
              className="w-full h-auto drop-shadow-xl"
            />

            <motion.div 
              initial={prefersReducedMotion ? {} : { y: 20, opacity: 0 }}
              animate={prefersReducedMotion ? {} : { y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-4 right-2 md:right-8 bg-white/90 dark:bg-[#1a1a1a]/90 backdrop-blur-sm p-4 rounded-2xl border border-lime-200 dark:border-white/10 shadow-xl max-w-[210px]"
            >
              <div className="flex gap-3">
                <div className="p-2 bg-lime-100 dark:bg-lime-500/20 rounded-lg text-lime-600 dark:text-lime-400">
                  <MousePointer2 size={18} />
                </div>
                <p className="text-xs font-semibold text-gray-900 dark:text-white italic">
                  "Inovasi adalah kunci untuk membuka masa depan"
                </p>
              </div>
            </motion.div>

            <motion.div
              animate={prefersReducedMotion ? {} : { y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-6 right-10 p-3 bg-white dark:bg-[#1a1a1a] rounded-xl border border-lime-100 dark:border-white/10 shadow-lg"
            >
              <Smartphone className="text-lime-500 dark:text-lime-400 w-6 h-6" />
            </motion.div>

            <motion.div
              animate={prefersReducedMotion ? {} : { y: [0, 12, 0] }}
              transition={{ duration: 4.5, repeat: Infinity }}
              className="absolute top-1/3 -left-6 md:-left-14 p-3 bg-white dark:bg-[#1a1a1a] rounded-xl border border-lime-100 dark:border-white/10 shadow-lg"
            >
              <Code2 className="text-lime-600 dark:text-lime-400 w-6 h-6" />
            </motion.div>

            <motion.div
              animate={prefersReducedMotion ? {} : { y: [0, -10, 0], x: [0, 6, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute top-0 left-12 p-2.5 bg-white dark:bg-[#1a1a1a] rounded-xl border border-lime-100 dark:border-white/10 shadow-lg"
            >
              <Database className="text-lime-500 dark:text-lime-400 w-5 h-5" />
            </motion.div>
          </div>
        </motion.figure>

        <motion.header
          initial={prefersReducedMotion ? {} : { opacity: 0, x: 40 }}
          animate={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center lg:text-left order-2"
        >
          <h1 id="hero-heading" className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4">
            Welcome to <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-lime-500 to-lime-700">
              Personal Digital Ecosystem
            </span>
          </h1>

          <div className="h-8 mb-6 text-xl md:text-2xl font-medium text-gray-600 dark:text-gray-400 flex justify-center lg:justify-start items-center gap-2">
            <Terminal className="w-5 h-5 text-lime-500 dark:text-lime-400" />
            <span>I am a</span>
            <span className="text-gray-900 dark:text-white font-bold border-b-2 border-lime-400 dark:border-lime-500 pb-0.5">
              {text}
            </span>
            <span className="animate-pulse text-lime-500 text-2xl">|</span>
          </div>

          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
            Menciptakan sebuah karya bukan hanya sekedar hasil, namun sebuah
            <span className="text-lime-600 dark:text-lime-400 font-bold px-1">langkah</span>
            besar dalam perjalanan. Kami ingin menghadirkan hal baru untuk Anda.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
            <a
              href="/cv.pdf"
              download
              className="group relative px-8 py-4 rounded-full bg-gray-900 dark:bg-white text-white dark:text-black font-semibold shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 overflow-hidden w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Download className="w-4 h-4 group-hover:animate-bounce" />
                Download CV
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-lime-300 to-lime-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>

            <a
              href="/welcome"
              className="group relative w-full sm:w-auto px-8 py-4 rounded-full
                        font-semibold text-white
                        bg-linear-to-r from-sky-500 via-purple-300 to-purple-600
                        shadow-lg shadow-indigo-500/30
                        transition-all duration-300
                        hover:-translate-y-1
                        overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
                Special Page
              </span>

              <span
                className="absolute inset-0 rounded-full p-0.5
                          bg-linear-to-r from-cyan-300 via-purple-300 to-purple-500
                          opacity-0 group-hover:opacity-100
                          transition-opacity duration-300"
              >
                <span className="block w-full h-full rounded-full
                                bg-linear-to-r from-sky-600 to-indigo-700" />
              </span>

              <span
                className="absolute -inset-1 rounded-full
                          bg-linear-to-r from-cyan-400 to-purple-500
                          opacity-0 group-hover:opacity-40 blur-lg
                          transition-opacity duration-300"
              />
            </a>
          </div>
        </motion.header>

      </div>
    </section>
  );
}
