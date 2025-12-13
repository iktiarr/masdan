"use client";
import React from "react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Box, Lock, Search, Settings, Sparkles } from "lucide-react";

export default function ServicesSection() {
  return (
    <section className="py-10 w-full bg-white">
      <div className="max-w-7xl mx-auto mb-16 text-right">
        <h2 className="text-3xl md:text-5xl font-bold text-black mb-4">
          What am I <span className="text-lime-600">Doing</span> now?
        </h2>
        <p className="text-neutral-600 text-sm md:text-base max-w-lg ml-auto">
          Building a work must be fast, safe, function well and must be pleasing to everyone's eyes.
        </p>
      </div>

      <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2 max-w-7xl mx-auto">
        <GridItem
          area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
          icon={<Box className="h-5 w-5 text-blue-600" />}
          title="Clean Architecture"
          description="Building a work that is easy by ensuring that each core works according to its responsibility."
        />

        <GridItem
          area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
          icon={<Settings className="h-5 w-5 text-violet-600" />}
          title="AI Integration"
          description="AI can help us to automate the systems we create to make them easier to apply."
        />

        <GridItem
          area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
          icon={<Lock className="h-5 w-5 text-stone-600" />}
          title="Security First"
          description="We must maintain system security so that it is not misused by foreign parties."
        />

        <GridItem
          area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
          icon={<Sparkles className="h-5 w-5 text-pink-600" />}
          title="Modern UI/UX"
          description="When creating a design, you have to consider all the elements to create a composition that is appropriate and in accordance with the initial goal."
        />

        <GridItem
          area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
          icon={<Search className="h-5 w-5 text-amber-600" />}
          title="SEO Optimized"
          description="To optimize content, we must delve into the keywords that are the entry point for our work."
        />
      </ul>
    </section>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <div className="relative h-full rounded-2xl border border-neutral-200 p-2 md:rounded-3xl md:p-3 bg-white">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.05}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 shadow-none">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-neutral-300 p-2 bg-neutral-100/50">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="font-sans text-xl font-semibold text-black">
                {title}
              </h3>
              <h2 className="font-sans text-sm text-neutral-600 leading-relaxed">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
