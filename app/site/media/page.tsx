"use client";

import { useState, useEffect } from "react";
import {
  Instagram,
  Youtube,
  Linkedin,
  Facebook,
  Copy,
  Check,
  MessageCircle,
  AtSign,
  Coffee,
  Heart,
  ExternalLink,
  ArrowUpRight,
  Check as CheckIcon
} from "lucide-react";
import AOS from "aos";
import Link from 'next/link';

type Social = {
  name: string;
  handle: string;
  link: string;
  icon: any;
  gradient: string;
  desc: string;
};

const SOCIALS: Social[] = [
  {
    name: "Instagram",
    handle: "@iktiarramadani",
    link: "https://instagram.com/iktiarramadani",
    icon: Instagram,
    gradient: "from-fuchsia-500 to-pink-500",
    desc: "Daily Life & Creative"
  },
  {
    name: "YouTube",
    handle: "Abang Tiar",
    link: "https://www.youtube.com/@iktiarramadani",
    icon: Youtube,
    gradient: "from-red-500 to-orange-500",
    desc: "Tutorial & Education"
  },
  {
    name: "TikTok",
    handle: "@iktiarramadani",
    link: "https://www.tiktok.com/@iktiarramadani",
    icon: ({ className }: { className?: string }) => (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
      </svg>
    ),
    gradient: "from-stone-950 to-teal-500",
    desc: "Shorts & Fun"
  },
  {
    name: "Threads",
    handle: "@iktiarramadani",
    link: "https://www.threads.net/@iktiarramadani",
    icon: AtSign,
    gradient: "from-gray-700 to-black",
    desc: "Thoughts & Ideas"
  },
  {
    name: "LinkedIn",
    handle: "Iktiar Ramadani",
    link: "https://www.linkedin.com/in/iktiarramadani",
    icon: Linkedin,
    gradient: "from-blue-600 to-cyan-500",
    desc: "Professional Network"
  },
  {
    name: "Facebook",
    handle: "Iktiar Ramadani",
    link: "https://facebook.com/iktiar.ramadani.5",
    icon: Facebook,
    gradient: "from-blue-600 to-indigo-600",
    desc: "Social Community"
  }
];

const EMAIL = "irofficialfeedback@gmail.com";
const WA_PHONE = "6285143875550";
const BANK_INFO = {
  bankName: "BANK JAGO",
  accountNumber: "1081 1120 3480",
  accountName: "Iktiar Ramadani"
};

export default function MediaPage() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedBank, setCopiedBank] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 700, once: true, offset: 40 });
  }, []);

  useEffect(() => {
    let t1: number | undefined;
    let t2: number | undefined;
    if (copiedEmail) t1 = window.setTimeout(() => setCopiedEmail(false), 2000);
    if (copiedBank) t2 = window.setTimeout(() => setCopiedBank(false), 2000);
    return () => {
      if (t1) clearTimeout(t1);
      if (t2) clearTimeout(t2);
    };
  }, [copiedEmail, copiedBank]);

  const handleCopy = async (text: string, type: "email" | "bank") => {
    let isSuccess = false;
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        isSuccess = true;
      } catch {
        isSuccess = false;
      }
    }
    if (!isSuccess) {
      try {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.setAttribute("readonly", "");
        textArea.style.position = "absolute";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.select();
        const result = document.execCommand("copy");
        document.body.removeChild(textArea);
        isSuccess = Boolean(result);
      } catch {
        isSuccess = false;
      }
    }

    if (isSuccess) {
      if (type === "email") setCopiedEmail(true);
      else setCopiedBank(true);
    } else {
      window.alert("Gagal menyalin otomatis. Silakan salin manual.");
    }
  };

  const handleWA = () => {
    const text = `Halo, saya ingin mendiskusikan keperluan bisnis/kolaborasi.`;
    const url = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <main id="media" className="relative min-h-screen bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white selection:bg-lime-500/30 flex items-start justify-center py-24 transition-colors duration-300">
      <div className="w-full max-w-6xl px-6">
        <header className="text-center mb-12" data-aos="fade-down">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4">
            Ayo Terhubung
            <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-lime-500 to-emerald-600">
              & Saling Kolaborasi
            </span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
            Jelajahi ekosistem digital saya. Temukan konten, diskusi, dan peluang kolaborasi di berbagai platform.
          </p>
        </header>

        <section aria-labelledby="socials-heading" className="mb-12">
          <h2 id="socials-heading" className="sr-only">Platform Sosial</h2>
          <ul role="list" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {SOCIALS.map((social, idx) => {
              const Icon = social.icon;
              return (
                <li key={social.name} className="col-span-1 lg:col-span-2">
                  <a
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${social.name} — ${social.handle}`}
                    data-aos="fade-up"
                    data-aos-delay={idx * 40}
                    className="group relative flex flex-col justify-between p-5 rounded-2xl border border-gray-100 dark:border-white/5 bg-white dark:bg-[#121212] overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-400 focus:outline-none focus:ring-2 focus:ring-lime-500/30"
                  >
                    <div aria-hidden className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-br ${social.gradient}`} />
                    <div className="relative z-10 flex items-start justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-700 dark:text-gray-300 transition-colors duration-300">
                        <Icon size={22} aria-hidden />
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        <ArrowUpRight size={14} aria-hidden />
                      </div>
                    </div>

                    <div className="relative z-10 mt-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-white transition-colors duration-300">{social.name}</h3>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 group-hover:text-white/80 transition-colors duration-300">{social.desc}</p>
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        </section>

        <section aria-label="Dukungan dan Kerja Sama" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <article
            data-aos="fade-up"
            data-aos-delay={200}
            className="relative overflow-hidden rounded-2xl bg-[#071013] text-white p-6 md:p-10 shadow-2xl border border-gray-800"
          >
            <div aria-hidden className="absolute top-0 right-0 w-64 h-64 bg-lime-500/20 rounded-full blur-[80px] pointer-events-none" />
            <div aria-hidden className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
            <header className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold">Dukungan Anda</h3>
              <p className="text-gray-300 text-sm mt-2 max-w-md">
                Apresiasi dari Anda adalah bahan bakar untuk terus berkarya dan berbagi konten bermanfaat.
              </p>
            </header>

            <div className="relative z-10 mt-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center justify-between gap-4 group hover:border-[#faae2b]/50 transition-all duration-300">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-[10px] tracking-wider uppercase font-bold text-gray-400">
                    Dukungan
                  </p>
                  <span className="px-1.5 py-0.5 rounded-[4px] bg-[#faae2b]/20 text-[#faae2b] text-[8px] font-bold border border-[#faae2b]/30">
                      SAWERIA
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <h3 className="text-lg md:text-xl font-bold tracking-wide text-white group-hover:text-[#faae2b] transition-colors">
                    Traktir Saya Kopi
                  </h3>
                  <Coffee size={18} className="text-neutral-500 group-hover:text-[#faae2b] transition-colors mb-1" />
                </div>
              </div>

              {/* Bagian Kanan: Tombol Aksi */}
              <Link
                href="https://saweria.co/iktiar7"
                target="_blank"
                className="flex-shrink-0 p-3 rounded-xl bg-[#faae2b] text-black hover:bg-[#e59d20] hover:scale-105 transition-all active:scale-95 shadow-lg shadow-orange-500/10 flex items-center gap-2"
                aria-label="Buka halaman Saweria"
              >
                <span className="text-xs font-bold hidden sm:block">Dukung</span>
                <ExternalLink size={20} aria-hidden />
              </Link>
            </div>
          </article>

          <article
            data-aos="fade-up"
            data-aos-delay={300}
            className="relative overflow-hidden rounded-2xl bg-white dark:bg-[#121212] border border-gray-200 dark:border-white/5 p-6 md:p-10 shadow-sm transition-all"
          >
            <header className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Kerja Sama</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 max-w-md">
                Tertarik mengundang saya sebagai pembicara, konsultasi atau tawaran kolaborasi lainnya?
              </p>
            </header>

            <div className="relative z-10 mt-6 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleWA}
                className="flex-1 flex items-center justify-center gap-2 bg-lime-500 dark:bg-lime-500 hover:bg-black dark:hover:bg-lime-400 text-white dark:text-black font-bold py-3.5 px-6 rounded-xl transition-transform active:scale-95 shadow-lg"
                aria-label="Hubungi via WhatsApp"
              >
                <MessageCircle size={18} aria-hidden /> WhatsApp
              </button>

              <button
                type="button"
                onClick={() => handleCopy(EMAIL, "email")}
                className="flex-[1.5] flex items-center justify-between bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 py-3.5 px-5 rounded-xl transition-colors"
                aria-label="Salin alamat email"
              >
                <div className="text-left overflow-hidden">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Email Address</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{EMAIL}</p>
                </div>
                <div className="text-gray-400 dark:text-gray-500 transition-colors">
                  {copiedEmail ? <Check size={18} aria-hidden /> : <Copy size={18} aria-hidden />}
                </div>
              </button>
            </div>
          </article>
        </section>

        <div className="sr-only" aria-live="polite">
          {copiedEmail ? "Email berhasil disalin." : copiedBank ? "Nomor rekening berhasil disalin." : ""}
        </div>
      </div>
    </main>
  );
}
