import Header from "./site/components/header";

import Hero from "./site/hero";

import AdsSection from "./page/ads/page"; 

import About from "./site/about/page";
import Edu from "./site/education/page";
import Skills from "./site/skills/page";
import Projects from "./site/projects/page";
import Certificates from "./site/sertificate/page";
import Media from "./site/media/page";
import Other from "./site/sitemap/page";

import Footer from "./site/components/footer";

export default function Home() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      
      <Header />

      <Hero />

      <AdsSection />
      
      <About />
      <Edu />
      <Skills />
      <Projects />
      <Certificates />
      <Media />
      <Other />

      <Footer />
      
    </main>
  );
}