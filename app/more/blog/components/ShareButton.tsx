"use client";

import { useState } from "react";
import { Share2, Check, Copy, Link as LinkIcon } from "lucide-react";

export default function ShareButton({ title, text }: { title: string; text?: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: text || "Baca artikel menarik ini!",
          url: url,
        });
        return;
      } catch (err) {
        console.log("Share dibatalkan");
      }
    }

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = url;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Gagal menyalin link", err);
    }
  };

  return (
    <button 
      onClick={handleShare}
      className="group relative p-2.5 rounded-full bg-gray-50 dark:bg-[#111] text-gray-500 dark:text-gray-400 hover:bg-lime-100 dark:hover:bg-lime-500/20 hover:text-lime-600 dark:hover:text-lime-400 transition-all border border-gray-200 dark:border-white/10 active:scale-95"
      aria-label="Bagikan Artikel"
    >
      {copied ? (
        <Check size={18} className="text-emerald-500" />
      ) : (
        <Share2 size={18} />
      )}
      {copied && (
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/90 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-lg whitespace-nowrap animate-in fade-in slide-in-from-bottom-1">
          Link Disalin!
        </span>
      )}
    </button>
  );
}