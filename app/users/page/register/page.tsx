"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";
import { motion } from "framer-motion";
import { 
  User, Mail, Phone, MapPin, Lock, ArrowRight, Loader2, CheckCircle2, AlertCircle, Moon, Sun, Eye, EyeOff
} from "lucide-react";
import Link from "next/link";
import { Toaster, toast } from "sonner";
import confetti from "canvas-confetti";
import { useTheme } from "next-themes";
import Lottie from "lottie-react";

export default function RegisterPage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [animationData, setAnimationData] = useState(null);

  // State Data
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    hp: "",
    alamat: "",
    password: ""
  });

  // State Error
  const [errors, setErrors] = useState({
    nama: "",
    email: "",
    hp: "",
    password: ""
  });

  useEffect(() => {
    setMounted(true);
    // Fetch Lottie JSON
    fetch("/register.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Lottie Error:", err));
  }, []);

  const validateField = (name: string, value: string) => {
    let errorMsg = "";
    switch (name) {
      case "nama": if (value.length < 3) errorMsg = "Min 3 huruf"; break;
      case "email": if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errorMsg = "Email tidak valid"; break;
      case "hp": if (!/^[0-9]{10,13}$/.test(value)) errorMsg = "10-13 angka"; break;
      case "password": if (value.length < 8) errorMsg = "Min 8 karakter"; break;
    }
    setErrors(prev => ({ ...prev, [name]: errorMsg }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

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

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (Object.values(errors).some(err => err) || Object.values(formData).some(val => !val)) {
      toast.error("Mohon lengkapi data dengan benar.");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Mendaftarkan akun...");

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([{ 
            id: data.user.id, 
            email: formData.email,
            nama_lengkap: formData.nama, 
            nomor_hp: formData.hp,
            alamat: formData.alamat 
          }]);

        if (profileError) throw profileError;

        triggerConfetti();
        toast.success("Pendaftaran Berhasil!", { id: toastId, description: "Akun telah dibuat." });
        
        setTimeout(() => {
          router.push("/users/page/login");
        }, 2000);
      }
    } catch (error: any) {
      toast.error("Gagal Daftar", { id: toastId, description: error.message });
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="h-screen w-full flex bg-white dark:bg-[#020a02] font-sans transition-colors duration-300 overflow-hidden">
      <Toaster position="top-center" richColors />

      {/* --- BAGIAN KIRI (ANIMASI) --- */}
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
                <h3 className="text-2xl font-black text-gray-800 dark:text-white mb-2">Daftar Sekarang</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">
                    Bergabunglah dengan kami sekarang untuk mengakses lebih banyak fitur menarik!
                </p>
            </div>
         </motion.div>
      </div>

      {/* --- BAGIAN KANAN (FORM) --- */}
      <div className="w-full lg:w-7/12 flex flex-col justify-center relative overflow-y-auto px-6 py-4 md:px-12 lg:px-24">
         
         <button 
           onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
           className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10 transition-all"
         >
            {theme === 'dark' ? <Sun size={18} className="text-yellow-400 fill-current" /> : <Moon size={18} className="fill-current" />}
         </button>

         <div className="w-full max-w-md mx-auto">
            <div className="text-center mb-6">
               <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-2">Buat Akun</h1>
               <p className="text-sm text-gray-500 dark:text-gray-400">
                 Sudah punya akun? <Link href="/users/page/login" className="text-lime-600 dark:text-lime-400 font-bold hover:underline transition-colors">Masuk</Link>
               </p>
            </div>

            <motion.form 
              onSubmit={handleRegister} 
              className="space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
               {/* Nama */}
               <div>
                  <div className="relative group">
                     <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-lime-500 transition-colors" />
                     <input 
                       type="text" name="nama" required 
                       value={formData.nama} onChange={handleChange}
                       className={`w-full bg-white dark:bg-white/5 border ${errors.nama ? "border-red-500" : "border-gray-200 dark:border-white/10"} rounded-xl py-2.5 pl-10 pr-4 text-sm focus:border-lime-500 focus:ring-1 focus:ring-lime-500 outline-none transition-all placeholder:text-gray-400 dark:text-white`}
                       placeholder="Nama Lengkap"
                     />
                  </div>
                  {errors.nama && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.nama}</p>}
               </div>

               {/* Grid: Email & HP */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                     <div className="relative group">
                        <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-lime-500 transition-colors" />
                        <input 
                          type="email" name="email" required 
                          value={formData.email} onChange={handleChange}
                          className={`w-full bg-white dark:bg-white/5 border ${errors.email ? "border-red-500" : "border-gray-200 dark:border-white/10"} rounded-xl py-2.5 pl-10 pr-4 text-sm focus:border-lime-500 focus:ring-1 focus:ring-lime-500 outline-none transition-all placeholder:text-gray-400 dark:text-white`}
                          placeholder="Email"
                        />
                     </div>
                     {errors.email && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.email}</p>}
                  </div>

                  <div>
                     <div className="relative group">
                        <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-lime-500 transition-colors" />
                        <input 
                          type="tel" name="hp" required 
                          value={formData.hp} onChange={handleChange}
                          className={`w-full bg-white dark:bg-white/5 border ${errors.hp ? "border-red-500" : "border-gray-200 dark:border-white/10"} rounded-xl py-2.5 pl-10 pr-4 text-sm focus:border-lime-500 focus:ring-1 focus:ring-lime-500 outline-none transition-all placeholder:text-gray-400 dark:text-white`}
                          placeholder="No. HP"
                        />
                     </div>
                     {errors.hp && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.hp}</p>}
                  </div>
               </div>

               {/* Alamat */}
               <div>
                  <div className="relative group">
                     <MapPin size={16} className="absolute left-3.5 top-3 text-gray-400 group-focus-within:text-lime-500 transition-colors" />
                     <textarea 
                       name="alamat" rows={2} required 
                       value={formData.alamat} onChange={handleChange}
                       className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:border-lime-500 focus:ring-1 focus:ring-lime-500 outline-none transition-all placeholder:text-gray-400 resize-none dark:text-white leading-snug"
                       placeholder="Alamat Lengkap"
                     />
                  </div>
               </div>

               {/* Password */}
               <div>
                  <div className="relative group">
                     <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-lime-500 transition-colors" />
                     <input 
                       type={showPassword ? "text" : "password"} name="password" required 
                       value={formData.password} onChange={handleChange}
                       className={`w-full bg-white dark:bg-white/5 border ${errors.password ? "border-red-500" : "border-gray-200 dark:border-white/10"} rounded-xl py-2.5 pl-10 pr-10 text-sm focus:border-lime-500 focus:ring-1 focus:ring-lime-500 outline-none transition-all placeholder:text-gray-400 dark:text-white`}
                       placeholder="Password"
                     />
                     <button 
                       type="button"
                       onClick={() => setShowPassword(!showPassword)}
                       className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-lime-500 transition-colors"
                     >
                       {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                     </button>
                  </div>
                  {errors.password ? (
                     <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.password}</p>
                  ) : (formData.password && (
                     <p className="text-lime-600 dark:text-lime-400 text-[10px] flex items-center gap-1 mt-1 ml-1"><CheckCircle2 size={10} /> Password kuat</p>
                  ))}
               </div>

               {/* Submit Button */}
               <motion.button 
                 whileHover={{ scale: 1.01 }}
                 whileTap={{ scale: 0.99 }}
                 type="submit" 
                 disabled={loading}
                 className="w-full py-3.5 bg-lime-500 hover:bg-lime-400 text-black font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-lime-500/20 disabled:opacity-70 disabled:cursor-not-allowed mt-4 group text-sm"
               >
                 {loading ? <Loader2 className="animate-spin" size={18} /> : (
                    <>
                      Daftar Sekarang <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </>
                 )}
               </motion.button>
            </motion.form>

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