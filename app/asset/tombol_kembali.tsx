"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TombolKembali({
  href = "/",
  label = "Kembali ke Beranda",
}: {
  href?: string;
  label?: string;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 
      border border-white/10 hover:bg-lime-500/20 hover:border-lime-500/50 
      transition-all duration-300 group backdrop-blur-sm"
    >
      <ArrowLeft
        size={16}
        className="group-hover:-translate-x-1 transition-transform text-lime-400"
      />
      <span className="text-sm font-medium text-gray-300 group-hover:text-white">
        {label}
      </span>
    </Link>
  );
}
