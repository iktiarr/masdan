"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, MousePointer2, Smartphone, Database, Code2, Terminal } from "lucide-react";

export default function HeroSection() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const words = ["Front-End Developer", "AI Enthusiast", "Next App Developer", "UI/UX Designer, Ambitious Student"];

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % words.length;
      const fullText = words[i];

      setText(isDeleting 
        ? fullText.substring(0, text.length - 1) 
        : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 50 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, words]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center bg-white dark:bg-[#0a0a0a] overflow-hidden pt-24 pb-12 md:pt-0 md:pb-0 transition-colors duration-300">
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative order-1 flex justify-center items-center"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-linear-to-tr from-lime-200 via-green-100 to-transparent dark:from-lime-300 dark:via-lime-500 dark:to-transparent rounded-full blur-3xl opacity-70 dark:opacity-40 animate-pulse-slow"></div>

          <div className="relative z-10 w-full max-w-md">
            <img
              src="/hero4.svg" 
              alt="Coding Illustration"
              className="w-full h-auto drop-shadow-2xl relative z-10"
            />

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-4 -right-2 md:-right-10 bg-white/90 dark:bg-[#1a1a1a]/90 backdrop-blur-sm p-4 rounded-2xl border border-lime-200 dark:border-white/10 shadow-xl z-20 max-w-[200px]"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-lime-100 dark:bg-lime-500/20 rounded-lg text-lime-600 dark:text-lime-400">
                   <MousePointer2 size={18} />
                </div>
                <div>
                   <p className="text-xs font-bold text-gray-900 dark:text-white italic">"Inovasi adalah kunci untuk membuka masa depan"</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 right-10 p-3 bg-white dark:bg-[#1a1a1a] rounded-xl shadow-lg border border-lime-100 dark:border-white/10 z-0"
            >
               <Smartphone className="text-lime-600 dark:text-lime-400 w-6 h-6" />
            </motion.div>

            <motion.div 
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-1/3 -left-6 md:-left-12 p-3 bg-white dark:bg-[#1a1a1a] rounded-xl shadow-lg border border-lime-100 dark:border-white/10 z-20"
            >
               <Code2 className="text-lime-600 dark:text-lime-400 w-6 h-6" />
            </motion.div>

            <motion.div 
              animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-0 left-10 p-2.5 bg-white dark:bg-[#1a1a1a] rounded-xl shadow-lg border border-lime-100 dark:border-white/10 z-0"
            >
               <Database className="text-lime-500 dark:text-lime-400 w-5 h-5" />
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center lg:text-left order-2"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight mb-4">
            Welcome to <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-lime-500 to-lime-700 dark:lime-400">
              Website & Portfolio
            </span>
          </h1>

          <div className="h-8 mb-6 text-xl md:text-2xl font-medium text-gray-500 dark:text-gray-400 flex justify-center lg:justify-start items-center gap-2">
            <Terminal className="w-5 h-5 text-lime-600 dark:text-lime-400" />
            <span>I am a </span>
            <span className="text-gray-900 dark:text-white font-bold border-b-2 border-lime-400 dark:border-lime-500 pb-0.5">{text}</span>
            <span className="animate-pulse text-lime-500 text-2xl">|</span>
          </div>

          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
            Menciptakan sebuah karya tidak hanya sekedar hasil, tapi juga 
            <span className="text-lime-600 dark:text-lime-400 font-bold px-1 rounded">langkah</span> besar dalam kehidupan.
            Oleh karena itu, kami ingin menghadirkan banyak hal baru untuk anda.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
            <a 
              href="/cv.pdf" 
              download 
              className="group relative px-8 py-4 rounded-full bg-gray-900 dark:bg-white text-white dark:text-black font-bold shadow-xl hover:shadow-2xl hover:shadow-lime-500/20 dark:hover:shadow-lime-500/40 transition-all hover:-translate-y-1 overflow-hidden w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Download className="w-4 h-4 group-hover:animate-bounce" />
                Download CV
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-lime-300 to-lime-600 dark:from-lime-300 dark:to-lime-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}