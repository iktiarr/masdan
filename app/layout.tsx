import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

import AnnouncementBar from "@/app/page/anouncements/AnnouncementBar";
// import AnnouncementBar2 from "@/app/page/anouncements/bar2/page";
// import Steper from "@/app/page/steper/Onboarding";
import ScrollProgress from "@/app/components/ScrollProgress";
import UpdatePopup from "@/app/components/UpdatePopup";
import CookieBanner from "@/app/components/CookieBanner";
// import CustomCursor from "@/app/components/CustomCursor";
// import BackToTop from "@/app/components/BackToTop";
import { ThemeProvider } from "@/components/theme-provider";
// import MaintenanceNotification from '@/app/components/MaintenanceNotification';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  scrollRestoration: "auto",
};

export const metadata: Metadata = {
  metadataBase: new URL('https://masdan.vercel.app'), 

  title: {
    default: "Iktiar Ramadani - Masdan",
    template: "%s | Iktiar Ramadani",
  },
  description: "Portfolio resmi Iktiar Ramadani (Masdan). Seorang Fullstack Developer, Content Creator, dan Founder Komunitas Masdan. Temukan hal baru berupa fitur, halamaan, project, event, dan sharing seputar teknologi serta hal menarik lainnya di sini.",
  keywords: [
    "Iktiar Ramadani", 
    "Masdan", 
    "Masdaner", 
    "Web Developer Indonesia", 
    "Frontend Developer", 
    "Next.js Portfolio",
    "Komunitas Masdan",
    "website tiar",
    "website masdan",
    "website masdaner",
    "website iktiar ramadani",
    "abang tiar",
    "mas dani",
    "iktiar pamekasan",
    "tiar",
    "rama",
    ""  
  ],
  authors: [{ name: "Iktiar Ramadani", url: "https://masdan.vercel.app" }],
  creator: "Iktiar Ramadani",

  openGraph: {
    title: "Iktiar Ramadani (Masdan) - Personal Web",
    description: "Halo, saya Iktiar Ramadani. Lihat karya, tulisan, dan aktivitas saya di sini.",
    url: "https://masdan.vercel.app",
    siteName: "Masdan Portfolio",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/post1.png",
        width: 1200,
        height: 630,
        alt: "Iktiar Ramadani Profile",
      },
    ],
  },
  
  icons: {
    icon: "/favicon.ico",
  },
  
  verification: {
    google: 'GrgnqlATFXKcX3K3SCDhYsjH8py0OKsT0ioiKKsmd2g',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Iktiar Ramadani",
    "alternateName": "Masdan",
    "url": "https://masdan.vercel.app",
    "jobTitle": "Fullstack Developer",
    "description": "Mahasiswa dan Web Developer yang aktif membangun komunitas teknologi.",
    "sameAs": [
      "https://www.instagram.com/iktiarramadani",
      "https://www.linkedin.com/in/iktiarramadani",
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 dark:bg-[#0a0a0a] text-slate-900 dark:text-white transition-colors duration-300`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          
          <Analytics/>
          <SpeedInsights/>

          <UpdatePopup/>
          {/* <MaintenanceNotification /> */}
          {/* <Steper /> */}
          <AnnouncementBar />
          <CookieBanner />
          {/* <AnnouncementBar2 /> */}
          {/* <BackToTop /> */}
          <ScrollProgress />
          {/* <CustomCursor /> */}
          
        </ThemeProvider>
      </body>
    </html>
  );
}