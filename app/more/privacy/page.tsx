"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileText, Server, ArrowLeft, Cookie } from "lucide-react";
import Link from "next/link";

const POLICIES = [
  {
    title: "Informasi yang Kami Kumpulkan",
    icon: Eye,
    content: "Kami mengumpulkan informasi yang Anda berikan secara langsung saat menghubungi kami atau melakukan pembelian, seperti Nama, Alamat Email, dan Nomor WhatsApp. Kami tidak menyimpan informasi kartu kredit atau data perbankan Anda secara langsung di server kami."
  },
  {
    title: "Penggunaan Informasi",
    icon: FileText,
    content: "Informasi yang kami kumpulkan digunakan untuk: memproses transaksi produk digital, mengirimkan file produk, memberikan dukungan teknis (support), dan mengirimkan pembaruan (update) terkait produk yang telah Anda beli."
  },
  {
    title: "Keamanan Data",
    icon: Lock,
    content: "Kami menerapkan langkah-langkah keamanan teknis untuk melindungi data pribadi Anda dari akses yang tidak sah. Transaksi pembayaran dilakukan melalui platform pihak ketiga yang aman atau transfer bank manual yang diverifikasi."
  },
  {
    title: "Kebijakan Cookies",
    icon: Cookie,
    content: "Website ini menggunakan cookies dasar untuk meningkatkan pengalaman pengguna dan menganalisis lalu lintas situs (Analytics). Anda dapat mengatur browser Anda untuk menolak semua cookies jika diinginkan."
  },
  {
    title: "Pihak Ketiga",
    icon: Server,
    content: "Kami tidak menjual, memperdagangkan, atau menyewakan informasi identitas pribadi pengguna kepada pihak lain. Kami mungkin berbagi data demografis agregat umum yang tidak terkait dengan informasi identitas pribadi apa pun dengan mitra bisnis tepercaya kami."
  }
];

export default function PrivacyPage() {
  return (
    <main className="relative min-h-screen bg-[#020a02] text-white font-sans selection:bg-lime-500/30 py-12 px-6">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
         <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-lime-500/5 rounded-full blur-[120px]" />
         <div className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px]" />
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-lime-500/20 hover:border-lime-500/50 transition-all duration-300 group backdrop-blur-sm">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform text-lime-400" />
              <span className="text-sm font-medium text-gray-300 group-hover:text-white">Kembali ke Beranda</span>
          </Link>
        </div>
          
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 space-y-4"
        >
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-500/10 border border-lime-500/20 text-lime-400 text-[10px] font-bold uppercase tracking-widest">
              <Shield size={12} /> Legal Document
           </div>
           <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
             Kebijakan <span className="text-transparent bg-clip-text bg-linear-to-r from-lime-400 to-emerald-500">Privasi</span>
           </h1>
           <p className="text-gray-400 text-base md:text-lg max-w-2xl leading-relaxed">
             Transparansi adalah prioritas kami. Halaman ini menjelaskan bagaimana kami mengelola dan melindungi data pribadi Anda saat menggunakan layanan ini.
           </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
           {POLICIES.map((policy, idx) => (
             <motion.div 
               key={idx}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: idx * 0.1 }}
               className={`group bg-[#0a150a] border border-lime-900/30 hover:border-lime-500/30 rounded-2xl p-6 md:p-8 transition-all duration-300 hover:shadow-lg hover:shadow-lime-900/10 ${idx === POLICIES.length - 1 ? "md:col-span-2" : ""}`}
             >
                <div className="flex items-start gap-4">
                   <div className="p-3 rounded-xl bg-white/5 text-lime-400 group-hover:bg-lime-500 group-hover:text-black transition-colors shrink-0">
                      <policy.icon size={24} />
                   </div>
                   <div>
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-lime-400 transition-colors">
                        {policy.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed text-justify">
                        {policy.content}
                      </p>
                   </div>
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    </main>
  );
}