import { 
  Layout, Globe, Bell, User, Book, FolderArchive, LandPlot,
  LifeBuoy, HelpCircle, Shield, FileText, MessageCircleMore,
  Layers, MessageSquare, Zap, Brush, Briefcase,
  Grid, BarChart2, Gamepad, Component, HandFist
} from "lucide-react";

export const exploreMenu = [
  {
    category: "Halaman",
    icon: Layout, 
    items: [
      { label: "Blog", href: "/more/blog", badge: null , icon: Globe },
      { label: "Testimonial", href: "/more/testimonials", badge: null, icon: Bell },
      // { label: "Galeri", href: "/page/new", badge: "segera", icon: User },
      // { label: "Sertifikat", href: "/page/coming", badge: "update", icon: Book },
      // { label: "Pendidikan", href: "/page/coming", badge: "update", icon: FolderArchive },
      // { label: "Alat Gratis", href: "/page/new", badge: "segera", icon: LandPlot },
    ]
  },
  {
    category: "Bantuan",
    icon: LifeBuoy,
    items: [
      { label: "Pusat Bantuan", href: "/more/help", badge: null, icon: HelpCircle },
      { label: "Kebijakan Privasi", href: "/more/privacy", badge: null, icon: Shield },
      { label: "Syarat & Ketentuan", href: "/more/terms-of-service", badge: null, icon: FileText },
      { label: "FAQ", href: "/more/faq", badge: null, icon: MessageCircleMore },
    ]
  },
  {
    category: "Ekosistem",
    icon: Layers,
    items: [
      { label: "Komunitas", href: "/more/comunity", badge: null , icon: MessageSquare },
      // { label: "Langganan Belajar", href: "/page/coming", badge: "update", icon: Zap },
      // { label: "Pesanan Kostum", href: "/page/new", badge: "segera", icon: Brush },
      // { label: "Karir", href: "/page/new", badge: "segera", icon: Briefcase },
    ]
  },
  {
    category: "Lainnya",
    icon: Grid,
    items: [
      { label: "Catatan Rilis", href: "/more/releases", badge: null , icon: Layers },
      // { label: "Analisis Data", href: "/analytics", badge: "segera", icon: BarChart2 },
      // { label: "Permainan", href: "/page/new", badge: "segera", icon: Gamepad },
      // { label: "Chat Ai", href: "/page/new", badge: "segera", icon: Component },
      // { label: "Tim Kerja", href: "/page/new", badge: "segera", icon: HandFist },
    ]
  }
];