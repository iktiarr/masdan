"use client";
import { motion } from "framer-motion";

export default function SettingsView() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h2 className="text-2xl font-bold mb-4">Pengaturan Akun</h2>
        <p className="text-muted-foreground mb-4">Kelola preferensi aplikasi Anda di sini.</p>
        
        <div className="space-y-4 max-w-xl">
           {/* Contoh Setting Switch */}
           <div className="flex items-center justify-between p-4 border rounded-lg bg-background">
              <div>
                 <div className="font-medium">Notifikasi Email</div>
                 <div className="text-sm text-muted-foreground">Terima update via email</div>
              </div>
              <div className="h-6 w-11 bg-lime-500 rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 h-4 w-4 bg-white rounded-full"></div>
              </div>
           </div>

           <div className="p-6 border border-red-200 bg-red-50 dark:bg-red-900/10 rounded-xl mt-8">
              <h3 className="text-red-600 font-bold mb-2">Zona Bahaya</h3>
              <p className="text-sm text-red-600/80 mb-4">Menghapus akun tidak dapat dibatalkan.</p>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-bold hover:bg-red-700 transition-colors">
                Hapus Akun Saya
              </button>
           </div>
        </div>
    </motion.div>
  );
}