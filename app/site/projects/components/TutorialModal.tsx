"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, AlertCircle } from "lucide-react";

export default function TutorialModal({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm z-[9999]"
          />

          <div className="fixed inset-0 flex items-center justify-center z-[10000] p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="tutorial-title"
              className="bg-white dark:bg-[#09090b] border border-gray-200 dark:border-white/10 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden pointer-events-auto flex flex-col max-h-[90vh]"
            >
              <header className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-[#101012]">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-lime-100 dark:bg-lime-500/10 rounded-lg text-lime-600 dark:text-lime-400">
                    <BookOpen size={18} />
                  </div>
                  <h3
                    id="tutorial-title"
                    className="text-gray-900 dark:text-white font-bold text-sm"
                  >
                    Panduan dan Langkah - Langkah Pembelian
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Tutup panduan"
                  className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 transition-colors"
                >
                  <X size={18} />
                </button>
              </header>

              <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
                <ul className="space-y-4">
                  {[
                    "Pilih produk yang Anda inginkan dari katalog.",
                    "Klik tombol 'Pesan via WA' atau 'Klaim'.",
                    "Anda akan diarahkan ke WhatsApp Admin.",
                    "Lakukan diskusi dan konfirmasi pesanan.",
                    "Lakukan pembayaran sesuai instruksi dan file produk dikirim instan setelah validasi."
                  ].map((step, idx) => (
                    <li
                      key={idx}
                      className="flex gap-3 text-sm text-gray-600 dark:text-gray-300 items-start group"
                    >
                      <div className="mt-0.5 min-w-5 h-5 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-[10px] font-bold text-gray-900 dark:text-white border border-gray-200 dark:border-white/10 group-hover:bg-lime-500 group-hover:text-black group-hover:border-lime-500 transition-colors">
                        {idx + 1}
                      </div>
                      <span className="leading-snug">{step}</span>
                    </li>
                  ))}
                </ul>

                <div className="h-px bg-gray-100 dark:bg-white/5" />

                <section className="p-4 bg-red-50 dark:bg-red-500/5 border border-red-100 dark:border-red-500/10 rounded-xl space-y-3">
                  <h4 className="text-red-600 dark:text-red-500 text-xs font-bold flex items-center gap-2 uppercase tracking-wide">
                    <AlertCircle size={14} /> Syarat & Ketentuan
                  </h4>

                  <div className="space-y-2 pl-1">
                    {[
                      "Produk digital yang sudah terkirim tidak dapat direfund.",
                      "Dilarang menjual ulang source code tanpa lisensi resmi.",
                      "Garansi support berlaku 1 bulan sejak pembelian.",
                      "Tidak ada pengembalian dana jika transaksi sukses.",
                      "Garansi hangus jika kode dimodifikasi > 15%.",
                      "Hubungi Admin jika mengalami kendala teknis."
                    ].map((rule, idx) => (
                      <p
                        key={idx}
                        className="text-[11px] text-gray-600 dark:text-gray-400 flex gap-2 leading-relaxed"
                      >
                        <span className="text-red-500 shrink-0 mt-0.5">•</span>
                        {rule}
                      </p>
                    ))}
                  </div>
                </section>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
