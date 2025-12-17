"use client";

import { useState } from "react";
import { cn } from "@/lib/utils"; 
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { 
  LayoutDashboard, 
  Home, // Icon Home
  User, 
  Settings, 
  Menu, 
  LogOut, 
  CreditCard, 
  Bell 
} from "lucide-react";

interface SidebarProps {
  activeMenu: string;
  onMenuClick: (menu: string) => void;
  userName: string;
  userEmail?: string;
  onLogout: () => void;
}

// --- UPDATE MENU ---
// Dashboard = Sapaan awal
// Home = Statistik / Konten Utama
const mainMenus = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard }, 
  { id: "home", label: "Home", icon: Home }, 
  { id: "transaksi", label: "Transaksi", icon: CreditCard },
  { id: "notifikasi", label: "Notifikasi", icon: Bell },
];

const bottomMenus = [
  { id: "profil", label: "Profil Saya", icon: User },
  { id: "setting", label: "Pengaturan", icon: Settings },
];

export default function Sidebar({ activeMenu, onMenuClick, userName, userEmail, onLogout }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-background text-foreground border-r">
      <div className="p-6 pb-2">
        <h1 className="text-2xl font-black tracking-tighter text-lime-600 dark:text-lime-500">
          MASDANER
        </h1>
        <div className="mt-1 flex flex-col">
          <span className="text-sm font-semibold truncate">{userName}</span>
          <span className="text-[10px] text-muted-foreground truncate">{userEmail || "Member"}</span>
        </div>
      </div>

      <Separator className="my-2 opacity-50" />

      <div className="flex-1 overflow-auto py-2 px-3">
        <nav className="space-y-1">
          <p className="px-4 text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">
            Menu Utama
          </p>
          {mainMenus.map((menu) => (
            <Button
              key={menu.id}
              variant={activeMenu === menu.id ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 transition-all duration-200",
                activeMenu === menu.id 
                  ? "bg-lime-100 text-lime-900 hover:bg-lime-200 dark:bg-lime-900/20 dark:text-lime-400 font-bold border-l-4 border-lime-500 rounded-l-none shadow-sm" 
                  : "hover:bg-gray-100 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400"
              )}
              onClick={() => {
                onMenuClick(menu.id);
                setIsOpen(false);
              }}
            >
              <menu.icon size={18} />
              {menu.label}
            </Button>
          ))}
        </nav>
      </div>

      <Separator className="my-2 opacity-50" />

      <div className="p-3 pb-6">
        <p className="px-4 text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">
          Lainnya
        </p>
        <div className="space-y-1">
          {bottomMenus.map((menu) => (
            <Button
              key={menu.id}
              variant={activeMenu === menu.id ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 transition-all",
                activeMenu === menu.id 
                  ? "bg-gray-100 dark:bg-white/10 font-bold" 
                  : "text-gray-500 dark:text-gray-400 hover:text-foreground"
              )}
              onClick={() => {
                onMenuClick(menu.id);
                setIsOpen(false);
              }}
            >
              <menu.icon size={18} />
              {menu.label}
            </Button>
          ))}

          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 mt-4"
            onClick={onLogout}
          >
            <LogOut size={18} />
            Keluar
          </Button>
        </div>
        
        <div className="mt-6 text-center text-[10px] text-muted-foreground opacity-50">
          &copy; 2025 Masdan Project v1.0
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* DESKTOP SIDEBAR (FIXED) */}
      <aside className="hidden md:flex h-screen w-64 flex-col fixed inset-y-0 left-0 z-50 bg-background shadow-xl">
        <SidebarContent />
      </aside>

      {/* MOBILE TRIGGER & SHEET */}
      <div className="md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72 border-r-0">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}