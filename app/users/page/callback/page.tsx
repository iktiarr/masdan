"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";
import { Loader2 } from "lucide-react";
import { toast } from "sonner"; // Opsional, buat debug visual

export default function AuthCallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState("Memproses login...");

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const handleAuth = async () => {
      // 1. Cek langsung via Listener Supabase (Cara Normal)
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN' && session) {
          setStatus("Berhasil! Mengalihkan...");
          clearInterval(intervalId); // Stop checking
          router.replace("/users/dashboard");
        } else if (event === 'SIGNED_OUT') {
           // Jangan langsung redirect ke login, tunggu sebentar siapa tau delay
           console.log("User signed out / belum ada session");
        }
      });

      // 2. BACKUP: Cek Manual Berulang (Cara Mobile)
      // HP kadang lambat, jadi kita cek setiap 500ms (setengah detik)
      // sampai session benar-benar ditemukan.
      intervalId = setInterval(async () => {
        // Cek apakah di URL ada tanda-tanda token tapi belum login
        const hash = window.location.hash;
        
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          setStatus("Sesi ditemukan! Masuk...");
          clearInterval(intervalId);
          router.replace("/users/dashboard");
        } else if (!hash && !window.location.search) {
          // Kalau URL bersih (gak ada token) DAN gak ada session, berarti emang gagal/user nyasar
          // Kita kasih waktu timeout, jangan langsung tendang
        }
      }, 500);

      // Cleanup function
      return () => {
        subscription.unsubscribe();
        clearInterval(intervalId);
      };
    };

    handleAuth();

    // Safety Net: Jika 10 detik masih muter2, lempar ke login
    const timeout = setTimeout(() => {
        toast.error("Waktu habis. Silakan login ulang.");
        router.replace("/users/page/login");
    }, 10000); // 10 detik

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#020a02] text-white font-sans px-6 text-center">
      <Loader2 size={50} className="animate-spin text-lime-500 mb-6" />
      <h2 className="text-xl font-bold mb-2">{status}</h2>
      <p className="text-gray-400 text-xs max-w-xs mx-auto animate-pulse">
        Sedang menyinkronkan data dengan Google...
        <br />(Jangan tutup halaman ini)
      </p>
    </div>
  );
}