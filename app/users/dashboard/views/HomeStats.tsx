"use client";
import { motion } from "framer-motion";

export default function HomeStats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Overview Statistik</h2>
        <p className="text-muted-foreground">Ringkasan data hari ini.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="p-6 bg-background rounded-xl border shadow-sm hover:shadow-md transition-shadow">
            <div className="text-sm font-medium text-muted-foreground mb-1">Total Kunjungan</div>
            <div className="text-3xl font-bold text-foreground">1,204</div>
            <div className="text-xs text-lime-600 mt-2 font-bold">+12% bulan ini</div>
          </div>
          <div className="p-6 bg-background rounded-xl border shadow-sm hover:shadow-md transition-shadow">
            <div className="text-sm font-medium text-muted-foreground mb-1">Pengguna Baru</div>
            <div className="text-3xl font-bold text-foreground">342</div>
            <div className="text-xs text-lime-600 mt-2 font-bold">+8% bulan ini</div>
          </div>
          <div className="p-6 bg-background rounded-xl border shadow-sm hover:shadow-md transition-shadow">
            <div className="text-sm font-medium text-muted-foreground mb-1">Transaksi</div>
            <div className="text-3xl font-bold text-foreground">Rp 5.2M</div>
          </div>
      </div>
    </motion.div>
  );
}