import { IconMoneybag } from "@tabler/icons-react";
import { 
  Layout, Globe, Bell, User, Book, FolderArchive, LandPlot,
  LifeBuoy, HelpCircle, Shield, FileText, MessageCircleMore,
  Layers, MessageSquare, Zap, Brush, Briefcase,
  Grid, BarChart2, Gamepad, Component, HandFist,
  ToolCase,
  Pen,
  BottleWine,
  Blinds,
} from "lucide-react";

export const exploreMenu = [
  {
    category: "Halaman",
    icon: Layout, 
    items: [
      { label: "Blog", href: "/more/blog", badge: null , icon: Globe },
      { label: "Testimonial", href: "/more/testimonials", badge: null, icon: Bell },
      { label: "Langganan", href: "/more/pricing", badge: null , icon: IconMoneybag },
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
      { label: "Freebies", href: "/more/freebies", badge: null, icon: FileText },
      { label: "My Qoutes", href: "/more/qoutes", badge: null, icon: FileText },
      { label: "Events", href: "/more/events", badge: null, icon: FileText },
      { label: "Musik", href: "/more/music", badge: null, icon: FileText },
    ]
  },
  {
    category: "Lainnya",
    icon: Grid,
    items: [
      { label: "Catatan Rilis", href: "/more/releases", badge: null , icon: Layers },
      { label: "Laboratorium Kami", href: "/more/labs", badge: null, icon: Blinds },
      { label: "Alat Bantu Kami", href: "/more/uses", badge: null, icon: Gamepad },
    ]
  }
];