"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";
import { motion } from "framer-motion";
import { 
  Mail, Lock, LogIn, Loader2, Moon, Sun, Eye, EyeOff
} from "lucide-react";
import Link from "next/link";
import { Toaster, toast } from "sonner";
import { useTheme } from "next-themes";
import confetti from "canvas-confetti";
import Lottie from "lottie-react";

export default function LoginPage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [animationData, setAnimationData] = useState(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setMounted(true);
    // Fetch Lottie JSON dari public folder
    fetch("/login.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Lottie Load Error:", err));
  }, []);

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Sedang memproses...");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      triggerConfetti();
      toast.success("Login Berhasil!", { id: toastId, description: "Selamat datang kembali!" });
      
      setTimeout(() => {
        router.push("/users/dashboard");
      }, 1500);

    } catch (error: any) {
      toast.error("Gagal Masuk", { 
        id: toastId,
        description: "Email atau password salah." 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    // Ambil URL asli tempat user berada sekarang (misal: masdan.vercel.app)
    const origin = window.location.origin; 
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${origin}/users/page/callback`,
        queryParams: {
          // Memaksa Google meminta izin ulang jika perlu (mengurangi bug cache)
          access_type: 'offline', 
          prompt: 'consent',
        },
      },
    });
    
    if (error) toast.error("Gagal koneksi ke Google");
  };

  if (!mounted) return null;

  return (
    <div className="h-screen w-full flex bg-white dark:bg-[#020a02] font-sans transition-colors duration-300 overflow-hidden">
      <Toaster position="top-center" richColors />

      <div className="hidden lg:flex w-5/12 relative bg-gray-50 dark:bg-[#050f05] items-center justify-center p-8 overflow-hidden border-r border-gray-100 dark:border-white/5">
         <div className="absolute inset-0 opacity-40 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
         
         <motion.div 
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8 }}
           className="relative z-10 w-full max-w-md"
         >
            <div className="bg-white dark:bg-white/5 backdrop-blur-sm rounded-3xl p-6 shadow-2xl shadow-gray-200/50 dark:shadow-lime-900/10 border border-gray-100 dark:border-white/10">
                {animationData ? (
                  <Lottie animationData={animationData} loop={true} className="w-full h-auto" />
                ) : (
                  <div className="h-64 flex items-center justify-center text-gray-400">Loading Animation...</div>
                )}
            </div>
            
            <div className="mt-8 text-center">
                <h3 className="text-2xl font-black text-gray-800 dark:text-white mb-2">Selamat datang Kembali</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">
                    Lanjutkan perjalanan anda yang terhenti sekarang bersama kami!
                </p>
            </div>
         </motion.div>
      </div>

      <div className="w-full lg:w-7/12 flex flex-col justify-center relative overflow-y-auto px-6 py-4 md:px-12 lg:px-24">
         
         <button 
           onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
           className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10 transition-all"
         >
            {theme === 'dark' ? <Sun size={18} className="text-yellow-400 fill-current" /> : <Moon size={18} className="fill-current" />}
         </button>

         <div className="w-full max-w-md mx-auto">
            <div className="text-center mb-10">
               <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight mb-2">Login Akun</h1>
               <p className="text-sm text-gray-500 dark:text-gray-400">
                 Silakan masuk untuk mengakses dashboard.
               </p>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
               <button 
                 onClick={handleGoogleLogin}
                 className="w-full py-3.5 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-white font-bold rounded-xl flex items-center justify-center gap-3 transition-all hover:bg-gray-50 dark:hover:bg-white/10 hover:border-gray-300 hover:shadow-lg text-sm group"
               >
                 <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                 </svg>
                 Masuk dengan Google
               </button>

               <div className="flex items-center gap-4 my-8">
                  <div className="h-px bg-gray-200 dark:bg-white/10 flex-1"></div>
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Atau Email</span>
                  <div className="h-px bg-gray-200 dark:bg-white/10 flex-1"></div>
               </div>

               <form onSubmit={handleLogin} className="space-y-5">
                  <div className="relative group">
                     <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-lime-500 transition-colors" />
                     <input 
                       type="email" required 
                       value={email} onChange={(e) => setEmail(e.target.value)}
                       className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-sm focus:border-lime-500 focus:ring-1 focus:ring-lime-500 outline-none transition-all placeholder:text-gray-400 dark:text-white"
                       placeholder="Email Anda"
                     />
                  </div>

                  <div>
                     <div className="relative group">
                        <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-lime-500 transition-colors" />
                        <input 
                          type={showPassword ? "text" : "password"} required 
                          value={password} onChange={(e) => setPassword(e.target.value)}
                          className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-3.5 pl-11 pr-12 text-sm focus:border-lime-500 focus:ring-1 focus:ring-lime-500 outline-none transition-all placeholder:text-gray-400 dark:text-white"
                          placeholder="Password"
                        />
                        <button 
                           type="button"
                           onClick={() => setShowPassword(!showPassword)}
                           className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-lime-500 transition-colors"
                        >
                           {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                     </div>
                     <div className="flex justify-end mt-2">
                        <Link href="/users/page/password" className="text-xs text-gray-500 dark:text-gray-400 hover:text-lime-600 dark:hover:text-lime-400 hover:underline transition-colors">
                           Lupa Password?
                        </Link>
                     </div>
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit" 
                    disabled={loading}
                    className="w-full py-4 bg-lime-500 hover:bg-lime-400 text-black font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-lime-500/20 disabled:opacity-70 disabled:cursor-not-allowed mt-4 group text-sm"
                  >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : (
                        <>
                          Masuk Sekarang <LogIn size={18} className="group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                  </motion.button>
               </form>

               <div className="mt-8 text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Belum punya akun? <Link href="/users/page/register" className="text-lime-600 dark:text-lime-400 font-bold hover:underline transition-colors">Daftar Sekarang</Link>
                  </p>
               </div>
            </motion.div>

            <div className="mt-10 flex justify-center">
              <Link
                href="/"
                className="
                  group relative inline-flex items-center gap-3
                  px-8 py-4 rounded-full
                  bg-black text-white
                  dark:bg-white dark:text-black
                  font-bold text-sm tracking-wide
                  transition-all duration-300
                  hover:scale-[1.03]
                  hover:shadow-xl hover:shadow-black/20
                  dark:hover:shadow-white/20
                  active:scale-95
                "
              >
                <span
                  className="
                    absolute inset-0 rounded-full
                    bg-gradient-to-r from-lime-500 to-emerald-500
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-300
                    -z-10
                  "
                />
                <span className="relative z-10">Kembali ke Website</span>
                <span
                  className="
                    relative z-10
                    transition-transform duration-300
                    group-hover:translate-x-1
                  "
                >
                  →
                </span>
              </Link>
            </div>

         </div>
      </div>
    </div>
  );
}