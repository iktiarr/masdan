import { 
  Home, User, Code2, Box, Image as ImageIcon,
  Sun, Moon, Laptop, LogOut,
  Book,
  Star,
  Globe2,
  BookCopy,
  BookAudio,
  User2,
  ToolCaseIcon,
  Pencil,
  NotebookTabs,
  Group,
  Hotel,
  FileQuestion,
  GalleryHorizontal,
  HelpCircle,
  Music2,
  DollarSign,
  HandGrab,
  BookDashed,
  BrainCircuit
} from "lucide-react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { 
  FaTiktok, 
  FaInstagram, 
  FaFacebook, 
  FaYoutube, 
  FaLinkedin, 
  FaTelegram, 
  FaDiscord, 
  FaWhatsapp, 
  FaXTwitter, 
  FaThreads,
  FaLemon,
  FaGithub,
  FaPeopleGroup,
  FaMoneyBill1,
  FaBottleDroplet,
} from "react-icons/fa6";



export const navItems = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "education", label: "Educations" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certificates", label: "Documents" },
  { id: "media", label: "Medias" },
];

interface CommandGroupParams {
  router: AppRouterInstance;
  scrollToSection: (id: string) => void;
  setTheme: (theme: string) => void;
}

export const getCommandGroups = ({ router, scrollToSection, setTheme }: CommandGroupParams) => [
  {
    heading: "Navigasi Halaman",
    items: [
      { icon: Home, label: "Home / Beranda", action: () => scrollToSection("hero") },
      { icon: User, label: "About / Tentang", action: () => scrollToSection("about") },
      { icon: Book, label: "Education / Pendidikan", action: () => scrollToSection("education") },
      { icon: Code2, label: "Skills / Keahlian", action: () => scrollToSection("skills") },
      { icon: Box, label: "Projects / Proyek", action: () => scrollToSection("projects") },
      { icon: BookCopy, label: "Documents / Berkas", action: () => scrollToSection("certificates") },
      { icon: ImageIcon, label: "Media / Galeri", action: () => scrollToSection("media") },
      { icon: Star, label: "Explore / Lainnya", action: () => scrollToSection("other") },
    ]
  },
  {
    heading: "Halaman Lainnya",
    items: [
      { icon: BookAudio, label: "Blog / Artikel", action: () => router.push("/more/more/blog") },
      { icon: Group, label: "Komunitas / Community", action: () => router.push("/more/comunity") },
      { icon: FaMoneyBill1, label: "Bantuan Donasi Kemanusiaan / Donation", action: () => router.push("/more/donation") },
      { icon: Hotel, label: "Acara Kegiatan / Events", action: () => router.push("/more/events") },
      { icon: FileQuestion, label: "FAQ / Pertanyaan", action: () => router.push("/more/faq") },
      { icon: GalleryHorizontal, label: "Koleksi Gratis Pengguna / Freebies", action: () => router.push("/more/freebies") },
      { icon: HelpCircle, label: "Layanan Bantuan / Help Center", action: () => router.push("/more/help") },
      { icon: FaBottleDroplet, label: "Laboratorium / Laboratory", action: () => router.push("/more/labs") },
      { icon: Music2, label: "Pustaka Musik / Music Library", action: () => router.push("/more/music") },
      { icon: DollarSign, label: "Langganan / Pricing", action: () => router.push("/more/pricing") },
      { icon: HandGrab, label: "Kebijakan Privasi / Privacy Policy", action: () => router.push("/more/privacy") },
      { icon: BookDashed, label: "Syarat & Ketentuan / Terms of Service", action: () => router.push("/more/terms-of-service") },
      { icon: BrainCircuit, label: "Kata Kata / Quotes", action: () => router.push("/more/qoutes") },
      { icon: NotebookTabs, label: "Catatan Rilis / Releases", action: () => router.push("/more/releases") },
      { icon: Pencil, label: "Ulasan / Testimonials", action: () => router.push("/more/testimonials") },
      { icon: ToolCaseIcon, label: "Alat Yang Digunakan / Uses", action: () => router.push("/more/uses") },
    ]
  },
  {
    heading: "Halaman Khusus",
    items: [
      { icon: Globe2, label: "Welcome / Sambutan", action: () => router.push("/welcome") },
      { icon: LogOut, label: "Instagram / Sosial", action: () => router.push("/page/logout") },
      { icon: User2, label: "Halaman Pengguna", action: () => router.push("/users") },
    ]
  },
  {
    heading: "Social Media",
    items: [
      { icon: FaTiktok, label: "TikTok", action: () => window.open("https://tiktok.com/@iktiarramadani", "_blank") },
      { icon: FaInstagram, label: "Instagram", action: () => window.open("https://instagram.com/iktiarramadani", "_blank") },
      { icon: FaThreads, label: "Threads", action: () => window.open("https://threads.net/@iktiarramadani", "_blank") },
      { icon: FaFacebook, label: "Facebook", action: () => window.open("https://facebook.com/iktiar.ramadani.5", "_blank") },
      { icon: FaYoutube, label: "YouTube", action: () => window.open("https://youtube.com/@iktiarramadani", "_blank") },
      { icon: FaLinkedin, label: "LinkedIn", action: () => window.open("https://linkedin.com/in/iktiarramadani", "_blank") },
      { icon: FaLemon, label: "Lemon8", action: () => window.open("https://s.lemon8-app.com/al/GgsvfRvbUb", "_blank") },
      { icon: FaXTwitter, label: "X / Twitter", action: () => window.open("https://x.com/iktiarramadanii", "_blank") },
    ]
  },
  {
    heading: "Sosial Diskusi",
    items: [
      { icon: FaTelegram, label: "Komunitas Telegram", action: () => window.open("https://t.me/+YgfJsvI4v24zYjE1", "_blank") },
      { icon: FaDiscord, label: "Discord Server", action: () => window.open("https://discord.gg/7rHNREb8a", "_blank") },
      { icon: FaWhatsapp, label: "Saluran WhatsApp", action: () => window.open("https://whatsapp.com/channel/0029VaAw5cq9cDDdEbpc063x", "_blank") },
      { icon: FaGithub, label: "Github Organisasi", action: () => window.open("https://github.com/Masdaner", "_blank") },
    ]
  },
  {
    heading: "Pengaturan Tema",
    items: [
      { icon: Sun, label: "Light / Terang", action: () => setTheme("light") },
      { icon: Moon, label: "Dark / Gelap", action: () => setTheme("dark") },
      { icon: Laptop, label: "System / Default", action: () => setTheme("system") },
    ]
  },
];
