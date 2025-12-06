import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AnnouncementBar from "@/app/page/anouncements/AnnouncementBar";
// import AnnouncementBar2 from "@/app/page/anouncements/bar2/page";
import Steper from "@/app/page/steper/Onboarding";
import ScrollProgress from "@/app/components/ScrollProgress";
import CustomCursor from "@/app/components/CustomCursor";
import BackToTop from "@/app/components/BackToTop";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IKTIAR RAMADANI",
  description: "Self made with premium code",
  icons: {
    icon: "/app/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 dark:bg-[#0a0a0a] text-slate-900 dark:text-white transition-colors duration-300`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <BackToTop />
          <ScrollProgress />
          <CustomCursor />
          <AnnouncementBar />
          {/* <AnnouncementBar2 /> */}
          <Steper />
          
        </ThemeProvider>
      </body>
    </html>
  );
}