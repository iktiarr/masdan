"use client";

import { useEffect, useState, useCallback } from "react"; // Tambah useCallback
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";

import Sidebar from "./sidebar"; 
import Navbar from "./navbar";
import DashboardIntro from "./views/DashboardIntro";
import HomeStats from "./views/HomeStats";
import ProfileView from "./views/ProfileView";
import SettingsView from "./views/SettingsView";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [activeMenu, setActiveMenu] = useState("dashboard"); 

  // --- 1. FUNGSI AMBIL DATA (Dipisah biar bisa dipanggil ulang) ---
  const fetchUserData = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      router.replace("/users/page/login");
      return;
    }

    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    
    // Gabungkan data agar ID selalu ada
    setProfile({
      ...profileData,
      id: user.id,
      email: user.email
    });

    setLoading(false);
  }, [router]);

  // --- 2. Panggil saat pertama kali load ---
  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/users/page/login");
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background text-muted-foreground animate-pulse">
        Memuat Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#09090b] font-sans flex">
      
      <Sidebar 
        activeMenu={activeMenu} 
        onMenuClick={setActiveMenu} 
        userName={profile?.nama_lengkap || "User"}
        userEmail={profile?.email}
        onLogout={handleLogout}
      />

      <div className="flex-1 flex flex-col min-h-screen transition-all duration-300 md:ml-64 w-full">
        
        {/* Header Mobile */}
        <div className="md:hidden sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b px-4 py-3 flex items-center justify-between shadow-sm">
           <div className="font-bold text-lime-600 tracking-tight">MASDANER</div>
           <Sidebar 
                activeMenu={activeMenu} 
                onMenuClick={setActiveMenu} 
                userName={profile?.nama_lengkap} 
                userEmail={profile?.email}
                onLogout={handleLogout}
           />
        </div>
        
        <Navbar nama={profile?.nama_lengkap} />

        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          
          {activeMenu === "dashboard" && (
            <DashboardIntro 
              nama={profile?.nama_lengkap} 
              onStart={() => setActiveMenu("home")} 
            />
          )}

          {activeMenu === "home" && <HomeStats />}
          
          {/* PERBAIKAN DI SINI: Kita kirim fungsi refresh (onUpdate) ke ProfileView */}
          {activeMenu === "profil" && (
             <ProfileView 
                profile={profile} 
                onUpdate={fetchUserData} // <--- INI KUNCINYA
             />
          )}
          
          {activeMenu === "setting" && <SettingsView />}

        </main>
      </div>
    </div>
  );
}