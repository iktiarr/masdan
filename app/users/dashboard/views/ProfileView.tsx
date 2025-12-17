"use client";

import { useState, useRef } from "react";
import { supabase } from "@/app/lib/supabase";
import { motion } from "framer-motion";
import { 
  User, Mail, Save, Loader2, Camera, Shield, KeyRound, UploadCloud 
} from "lucide-react";
import { toast, Toaster } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Props {
  profile: any;
  onUpdate: () => void; // <--- Tambahkan Tipe Props Baru
}

export default function ProfileView({ profile, onUpdate }: Props) {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Timestamp agar gambar refresh otomatis
  const [avatarKey, setAvatarKey] = useState(Date.now());

  const [formData, setFormData] = useState({
    nama_lengkap: profile?.nama_lengkap || "",
    nomor_hp: profile?.nomor_hp || "",
    alamat: profile?.alamat || "",
    avatar_url: profile?.avatar_url || "",
  });

  const [newEmail, setNewEmail] = useState("");

  // --- 1. UPLOAD FOTO ---
  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;

    if (!profile?.id) {
      toast.error("ID User hilang. Refresh halaman.");
      return;
    }

    const file = event.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${profile.id}-${Date.now()}.${fileExt}`; // Nama file unik
    const filePath = `${fileName}`;

    setLoading(true);
    const toastId = toast.loading("Mengupload foto...");

    try {
      // A. Upload
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw new Error("Gagal Upload: " + uploadError.message);

      // B. Ambil URL
      const { data: publicUrlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const publicUrl = publicUrlData.publicUrl;

      // C. Update Database
      const { error: dbError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', profile.id);

      if (dbError) throw new Error("Gagal Update DB: " + dbError.message);

      // D. Update State Lokal & Parent
      setFormData(prev => ({ ...prev, avatar_url: publicUrl }));
      setAvatarKey(Date.now()); // Refresh gambar lokal
      onUpdate(); // <--- PANGGIL INI AGAR DASHBOARD JUGA TAU
      
      toast.success("Foto Berhasil Diubah!", { id: toastId });

    } catch (error: any) {
      console.error(error);
      toast.error("Gagal", { id: toastId, description: error.message });
    } finally {
      setLoading(false);
    }
  };

  // --- 2. SIMPAN DATA DIRI ---
  const handleSaveProfile = async () => {
    if (!profile?.id) return;
    setLoading(true);
    const toastId = toast.loading("Menyimpan data...");

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          nama_lengkap: formData.nama_lengkap,
          nomor_hp: formData.nomor_hp,
          alamat: formData.alamat,
        })
        .eq('id', profile.id);

      if (error) throw error;

      onUpdate(); // <--- PANGGIL INI JUGA
      toast.success("Profil disimpan!", { id: toastId });
      
    } catch (error: any) {
      toast.error("Gagal menyimpan", { id: toastId, description: error.message });
    } finally {
      setLoading(false);
    }
  };

  // --- 3. UPDATE EMAIL ---
  const handleUpdateEmail = async () => {
    if (!newEmail) return toast.error("Isi email baru");
    setLoading(true);
    const toastId = toast.loading("Memproses...");

    try {
      const { error } = await supabase.auth.updateUser({ email: newEmail });
      if (error) throw error;
      
      toast.success("Cek Inbox Email!", { id: toastId, description: "Konfirmasi dikirim ke email lama & baru." });
      setNewEmail("");
    } catch (error: any) {
      toast.error("Gagal", { id: toastId, description: error.message });
    } finally {
      setLoading(false);
    }
  };

  // --- 4. RESET PASSWORD ---
  const handleResetPassword = async () => {
    setLoading(true);
    const toastId = toast.loading("Mengirim...");
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(profile.email, {
        redirectTo: `${window.location.origin}/users/page/password`,
      });
      if (error) throw error;
      toast.success("Link Terkirim!", { id: toastId, description: `Cek email ${profile.email}` });
    } catch (error: any) {
      toast.error("Gagal", { id: toastId, description: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto pb-10">
      
      {/* TOASTER WAJIB ADA */}
      <Toaster position="top-center" richColors closeButton />

      <Tabs defaultValue="umum" className="w-full">
        <TabsList className="mb-6 bg-gray-100 dark:bg-white/5 p-1 rounded-xl">
          <TabsTrigger value="umum" className="rounded-lg px-6">Data Diri</TabsTrigger>
          <TabsTrigger value="keamanan" className="rounded-lg px-6">Keamanan & Akun</TabsTrigger>
        </TabsList>

        <TabsContent value="umum" className="space-y-6">
          {/* FOTO */}
          <div className="bg-background border rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-center gap-8">
            <div className="relative group">
              {/* Tambahkan key={avatarKey} agar gambar reload */}
              <Avatar key={avatarKey} className="h-32 w-32 border-4 border-lime-100 dark:border-lime-900 shadow-xl">
                <AvatarImage 
                  src={formData.avatar_url || ""} 
                  className="object-cover" 
                />
                <AvatarFallback className="text-4xl bg-gradient-to-br from-lime-400 to-emerald-600 text-white font-bold">
                  {formData.nama_lengkap?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              
              <input type="file" ref={fileInputRef} onChange={handleAvatarUpload} className="hidden" accept="image/*" />
              
              <button onClick={() => fileInputRef.current?.click()} className="absolute bottom-0 right-0 p-2 bg-white dark:bg-zinc-800 rounded-full shadow-lg border hover:scale-110 transition-transform text-gray-600 dark:text-gray-200" disabled={loading}>
                <Camera size={18} />
              </button>
            </div>

            <div className="text-center md:text-left flex-1">
              <h3 className="font-bold text-lg">Foto Profil</h3>
              <p className="text-sm text-muted-foreground mb-4">Format JPG/PNG. Maks 2MB.</p>
              <Button variant="outline" onClick={() => fileInputRef.current?.click()} disabled={loading}>
                {loading ? <Loader2 className="animate-spin mr-2" /> : <UploadCloud size={16} className="mr-2" />}
                {loading ? "Sedang Upload..." : "Upload Foto Baru"}
              </Button>
            </div>
          </div>

          {/* FORM */}
          <div className="bg-background border rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><User size={18} className="text-lime-600" /> Informasi Pribadi</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-muted-foreground">Nama Lengkap</label>
                <Input value={formData.nama_lengkap} onChange={(e) => setFormData({...formData, nama_lengkap: e.target.value})} placeholder="Nama Lengkap" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-muted-foreground">Nomor HP</label>
                <Input value={formData.nomor_hp} onChange={(e) => setFormData({...formData, nomor_hp: e.target.value})} placeholder="08xxxxxxxx" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-muted-foreground">Alamat</label>
              <Textarea value={formData.alamat} onChange={(e) => setFormData({...formData, alamat: e.target.value})} placeholder="Alamat lengkap..." className="resize-none" />
            </div>
            <div className="pt-4 flex justify-end">
              <Button onClick={handleSaveProfile} disabled={loading} className="bg-lime-600 hover:bg-lime-500 text-white font-bold">
                {loading ? <Loader2 className="animate-spin mr-2" /> : <Save size={16} className="mr-2" />} Simpan Perubahan
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="keamanan" className="space-y-6">
          {/* Email & Password Section (Sama seperti sebelumnya) */}
          <div className="bg-background border rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Mail size={18} className="text-lime-600" /> Ganti Email</h3>
            <p className="text-sm text-muted-foreground mb-4">Email saat ini: <strong>{profile?.email}</strong></p>
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="w-full">
                <Input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="email@baru.com" />
              </div>
              <Button onClick={handleUpdateEmail} disabled={loading} variant="secondary">Ubah Email</Button>
            </div>
          </div>
          <div className="bg-background border rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><KeyRound size={18} className="text-lime-600" /> Reset Password</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Lupa password?</p>
                <p className="text-sm text-muted-foreground">Kirim link reset ke email Anda.</p>
              </div>
              <Button onClick={handleResetPassword} disabled={loading} variant="outline" className="border-red-200 text-red-600 hover:bg-red-50"><Shield size={16} className="mr-2" /> Kirim Link</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}