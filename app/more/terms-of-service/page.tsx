"use client";

import { motion } from "framer-motion";
import { 
  Scale, CheckCircle2, AlertCircle, FileWarning, RefreshCcw, 
  ArrowLeft, Gavel, Copyright
} from "lucide-react";
import Link from "next/link";

const TERMS = [
  {
    title: "Lisensi Penggunaan",
    icon: FileWarning,
    content: "Dengan membeli produk digital (source code/template) dari kami, Anda diberikan lisensi non-eksklusif untuk menggunakannya pada proyek pribadi atau komersial. Anda DILARANG KERAS menjual ulang, mendistribusikan ulang, atau menyewakan source code asli tanpa modifikasi signifikan."
  },
  {
    title: "Pembayaran & Pengiriman",
    icon: CheckCircle2,
    content: "Semua pembayaran dilakukan di muka melalui metode yang tersedia (Transfer Bank/E-Wallet). Akses ke file produk akan dikirimkan secara instan atau manual (via WhatsApp/Email) segera setelah bukti pembayaran diverifikasi oleh tim kami."
  },
  {
    title: "Kebijakan Refund",
    icon: RefreshCcw,
    content: "Karena sifat produk digital yang dapat disalin, kami TIDAK MENERIMA permintaan pengembalian dana (No Refund) setelah file dikirimkan, kecuali jika file terbukti rusak dan tidak dapat diperbaiki oleh tim support kami."
  },
  {
    title: "Dukungan Teknis",
    icon: AlertCircle,
    content: "Kami menyediakan dukungan teknis dasar terkait instalasi atau bug pada kode asli. Kami TIDAK bertanggung jawab untuk membantu modifikasi fitur kustom atau memperbaiki error yang disebabkan oleh perubahan kode yang Anda lakukan sendiri."
  },
  {
    title: "Hak Kekayaan Intelektual",
    icon: Copyright,
    content: "Seluruh konten, desain, dan kode dalam produk ini adalah hak cipta milik kami (atau mitra kami). Pelanggaran terhadap hak cipta ini dapat ditindaklanjuti sesuai hukum yang berlaku di Indonesia."
  }
];

export default function TermsPage() {
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
              <Scale size={12} /> Syarat & Ketentuan
           </div>
           <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              Terms of <span className="text-transparent bg-clip-text bg-linear-to-r from-lime-400 to-emerald-500">Service</span>
            </h1>

           <p className="text-gray-400 text-base md:text-lg max-w-2xl leading-relaxed">
             Harap baca ketentuan ini dengan seksama. Penggunaan layanan kami menandakan persetujuan Anda terhadap aturan yang berlaku.
           </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
           {TERMS.map((term, idx) => (
             <motion.div 
               key={idx}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: idx * 0.1 }}
               className={`group relative bg-[#0a150a] border border-lime-900/30 hover:border-lime-500/40 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-lime-900/10 ${idx === TERMS.length - 1 ? "md:col-span-2" : ""}`}
             >
                <div className="flex flex-col md:flex-row gap-5">
                   <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-linear-to-br from-lime-900/20 to-emerald-900/20 text-lime-400 group-hover:scale-110 transition-transform shrink-0 border border-lime-500/10">
                      <term.icon size={22} />
                   </div>
                   <div>
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-lime-400 transition-colors">
                        {term.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {term.content}
                      </p>
                   </div>
                </div>
             </motion.div>
           ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 pt-8 border-t border-white/5 text-center"
        >
           <div className="inline-flex items-center gap-2 text-red-400 mb-2">
             <Gavel size={18} />
             <span className="font-bold text-sm uppercase tracking-wider">Disclaimer</span>
           </div>
           <p className="text-xs text-gray-500 max-w-lg mx-auto">
             Kami berhak mengubah syarat dan ketentuan ini sewaktu-waktu tanpa pemberitahuan sebelumnya.
           </p>
        </motion.div>

      </div>
    </main>
  );
}