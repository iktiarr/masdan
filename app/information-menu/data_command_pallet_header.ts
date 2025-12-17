import { 
  Home, User, Code2, Box, Image as ImageIcon,
  Github, Instagram, Linkedin, ExternalLink,
  Sun, Moon, Laptop, LogOut,
  Book,
  Star,
  BookAlert,
  BookCheck,
  Globe2
} from "lucide-react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const navItems = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "education", label: "Educations" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Products" },
  { id: "certificates", label: "Docs" },
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
      { icon: Home, label: "Go to Home", action: () => scrollToSection("hero") },
      { icon: User, label: "Go to About", action: () => scrollToSection("about") },
      { icon: Book, label: "Go to Educations", action: () => scrollToSection("education") },
      { icon: Code2, label: "Go to Skills", action: () => scrollToSection("skills") },
      { icon: Box, label: "Go to Products", action: () => scrollToSection("projects") },
      { icon: User, label: "Go to Documents", action: () => scrollToSection("certificates") },
      { icon: ImageIcon, label: "Go to Media", action: () => scrollToSection("media") },
      { icon: Star, label: "Go to Menu Explore", action: () => scrollToSection("other") },
    ]
  },
  {
    heading: "Lainnya",
    items: [
      { icon: BookCheck, label: "Go To Blog", action: () => router.push("/certificates") },
      { icon: LogOut, label: "Whats In Here / Go To Instagram", action: () => router.push("/page/logout") },
    ]
  },
  {
    heading: "The Next Page",
    items: [
      { icon: Globe2, label: "Welcome Page", action: () => router.push("/welcome") },
    ]
  },
  {
    heading: "Social Media",
    items: [
      { icon: Github, label: "GitHub", action: () => window.open("https://github.com/masdan-dev", "_blank") },
      { icon: Instagram, label: "Instagram", action: () => window.open("https://instagram.com/masdan", "_blank") },
      { icon: Linkedin, label: "LinkedIn", action: () => window.open("https://linkedin.com/in/masdan", "_blank") },
    ]
  },
  {
    heading: "Pengaturan Tema",
    items: [
      { icon: Sun, label: "Light Mode", action: () => setTheme("light") },
      { icon: Moon, label: "Dark Mode", action: () => setTheme("dark") },
      { icon: Laptop, label: "System Default", action: () => setTheme("system") },
    ]
  },
];