"use client";

import { Leaf } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      aria-label="Footer situs"
      className="relative mt-auto border-t transition-colors duration-300 bg-gray-50 dark:bg-[#0a150a] border-gray-200 dark:border-white/5 text-gray-600 dark:text-gray-300 overflow-hidden"
    >
      <div className="relative border-t py-6 transition-colors border-gray-200 dark:border-white/5 bg-gray-100/50 dark:bg-black/20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-gray-500">
            © {year} MDeveloper. All rights reserved.
            <span className="text-gray-400 dark:text-gray-600 mx-2">|</span>
            Dilindungi oleh Iktiar Ramadani
          </p>
        </div>
      </div>
    </footer>
  );
}
