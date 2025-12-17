"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, Lock, Loader2, ArrowLeft, CheckCircle2, Moon, Sun, Eye, EyeOff, Hash
} from "lucide-react";
import Link from "next/link";
import { Toaster, toast } from "sonner";
import { useTheme } from "next-themes";
import confetti from "canvas-confetti";
import Lottie from "lottie-react";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [animationData, setAnimationData] = useState(null);
  
  // State Steps: 1 = Email, 2 = OTP, 3 = New Password
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Form Data
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    setMounted(true);
    // Fetch Lottie JSON
    fetch("/password.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Lottie Error:", err));
  }, []);

  // --- STEP 1: KIRIM KODE OTP ---
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Mengirim kode...");

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          shouldCreateUser: false, 
        }
      });

      if (error) throw error;

      toast.success("Kode Terkirim!", { id: toastId, description: "Cek email Anda (Inbox/Spam)." });
      setStep(2); 
    } catch (error: any) {
      toast.error("Gagal", { id: toastId, description: error.message || "Email tidak ditemukan." });
    } finally {
      setLoading(false);
    }
  };

  // --- STEP 2: VERIFIKASI KODE ---
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Memverifikasi...");

    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'email',
      });

      if (error) throw error;

      toast.success("Verifikasi Berhasil!", { id: toastId });
      setStep(3); 
    } catch (error: any) {
      toast.error("Kode Salah", { id: toastId, description: "Pastikan kode 8 digit benar." });
    } finally {
      setLoading(false);
    }
  };

  // --- STEP 3: UPDATE PASSWORD BARU ---
  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Mengupdate password...");

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      // Sukses Total
      const duration = 3 * 1000;
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      
      toast.success("Password Diperbarui!", { id: toastId, description: "Silakan login dengan password baru." });
      
      await supabase.auth.signOut();
      
      setTimeout(() => {
        router.push("/users/page/login");
      }, 2000);

    } catch (error: any) {
      toast.error("Gagal", { id: toastId, description: error.message });
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
                <h3 className="text-2xl font-black text-gray-800 dark:text-white mb-2">Lupa Password?</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">
                    Pulihkan akses akun Anda dengan cepat disini!
                </p>
            </div>
         </motion.div>
      </div>

      {/* --- BAGIAN KANAN (FORM DENGAN STEPS) --- */}
      <div className="w-full lg:w-7/12 flex flex-col justify-center relative overflow-y-auto px-6 py-4 md:px-12 lg:px-24">
         
         <button 
           onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
           className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10 transition-all"
         >
            {theme === 'dark' ? <Sun size={18} className="text-yellow-400 fill-current" /> : <Moon size={18} className="fill-current" />}
         </button>

         <div className="w-full max-w-md mx-auto">
            
            {/* Navigasi Balik */}
            <button 
              onClick={() => step > 1 ? setStep(step - 1) : router.push("/users/page/login")} 
              className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-lime-600 dark:hover:text-lime-400 transition-colors mb-8 group"
            >
               <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
               {step > 1 ? "Kembali ke langkah sebelumnya" : "Kembali ke Login"}
            </button>

            <div className="mb-8">
               <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-2">
                 {step === 1 && "Lupa Password?"}
                 {step === 2 && "Verifikasi Kode"}
                 {step === 3 && "Buat Password Baru"}
               </h1>
               <p className="text-sm text-gray-500 dark:text-gray-400">
                 {step === 1 && "Masukkan email yang terdaftar untuk menerima kode OTP."}
                 {step === 2 && `Masukkan 8 digit kode yang dikirim ke ${email}`}
                 {step === 3 && "Silakan buat password baru yang aman."}
               </p>
            </div>

            {/* AREA FORM DINAMIS (SWITCH STEP) */}
            <AnimatePresence mode="wait">
              
              {/* --- STEP 1: EMAIL --- */}
              {step === 1 && (
                <motion.form 
                  key="step1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  onSubmit={handleSendOtp} 
                  className="space-y-4"
                >
                   <div>
                      <div className="relative group">
                         <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-lime-500 transition-colors" />
                         <input 
                           type="email" required 
                           value={email} onChange={(e) => setEmail(e.target.value)}
                           className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-sm focus:border-lime-500 focus:ring-1 focus:ring-lime-500 outline-none transition-all placeholder:text-gray-400 dark:text-white"
                           placeholder="Email Terdaftar"
                         />
                      </div>
                   </div>

                   <button 
                     type="submit" disabled={loading}
                     className="w-full py-3.5 bg-lime-500 hover:bg-lime-400 text-black font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-lime-500/20 disabled:opacity-70 mt-4 group"
                   >
                     {loading ? <Loader2 className="animate-spin" size={20} /> : "Kirim Kode OTP"}
                   </button>
                </motion.form>
              )}

              {/* --- STEP 2: OTP (8 DIGIT) --- */}
              {step === 2 && (
                <motion.form 
                  key="step2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  onSubmit={handleVerifyOtp} 
                  className="space-y-4"
                >
                   <div>
                      <div className="relative group">
                         <Hash size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-lime-500 transition-colors" />
                         <input 
                           type="text" required maxLength={8}
                           value={otp} onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))} // Hanya angka
                           className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-sm tracking-widest font-mono focus:border-lime-500 focus:ring-1 focus:ring-lime-500 outline-none transition-all placeholder:text-gray-400 dark:text-white"
                           placeholder="00000000"
                         />
                      </div>
                   </div>

                   <button 
                     type="submit" disabled={loading || otp.length < 8}
                     className="w-full py-3.5 bg-lime-500 hover:bg-lime-400 text-black font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-lime-500/20 disabled:opacity-70 mt-4"
                   >
                     {loading ? <Loader2 className="animate-spin" size={20} /> : "Verifikasi Kode"}
                   </button>
                </motion.form>
              )}

              {/* --- STEP 3: PASSWORD BARU --- */}
              {step === 3 && (
                <motion.form 
                  key="step3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  onSubmit={handleUpdatePassword} 
                  className="space-y-4"
                >
                   <div>
                      <div className="relative group">
                         <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-lime-500 transition-colors" />
                         <input 
                           type={showPassword ? "text" : "password"} required minLength={6}
                           value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                           className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-3.5 pl-11 pr-12 text-sm focus:border-lime-500 focus:ring-1 focus:ring-lime-500 outline-none transition-all placeholder:text-gray-400 dark:text-white"
                           placeholder="Password Baru"
                         />
                         <button 
                           type="button"
                           onClick={() => setShowPassword(!showPassword)}
                           className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-lime-500 transition-colors"
                        >
                           {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      <p className="text-[10px] text-gray-400 mt-2 ml-1">
                        Gunakan kombinasi huruf dan angka agar lebih aman.
                      </p>
                   </div>

                   <button 
                     type="submit" disabled={loading}
                     className="w-full py-3.5 bg-lime-500 hover:bg-lime-400 text-black font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-lime-500/20 disabled:opacity-70 mt-4"
                   >
                     {loading ? <Loader2 className="animate-spin" size={20} /> : (
                       <>Simpan Password Baru <CheckCircle2 size={18} /></>
                     )}
                   </button>
                </motion.form>
              )}

            </AnimatePresence>

         </div>
      </div>
    </div>
  );
}