"use client";
import React from "react";
import { Timeline } from "@/components/ui/timeline";

export default function TimelineDemo() {
  const data = [
    {
      title: "2024",
      content: (
        <div>
          <p className="mb-8 text-xs md:text-sm text-neutral-300">
            Built and launched Aceternity UI and Aceternity UI Pro from scratch.
          </p>

          <div className="grid grid-cols-2 gap-4">
            {["startup-1.webp","startup-2.webp","startup-3.webp","startup-4.webp"].map((img, i) => (
              <img
                key={i}
                src={`https://assets.aceternity.com/templates/${img}`}
                alt="template"
                className="h-20 w-full rounded-lg object-cover border border-neutral-700/60 shadow-lg md:h-44 lg:h-60"
              />
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Early 2023",
      content: (
        <div>
          <p className="mb-6 text-xs md:text-sm text-neutral-300">
            I usually run out of copy, but when I see content this big, I try to
            integrate lorem ipsum.
          </p>
          <p className="mb-8 text-xs md:text-sm text-neutral-300">
            Lorem ipsum is for people who are too lazy to write copy. But we are
            not. Here are more example designs.
          </p>

          <div className="grid grid-cols-2 gap-4">
            {[
              "pro/hero-sections.png",
              "features-section.png",
              "pro/bento-grids.png",
              "cards.png",
            ].map((img, i) => (
              <img
                key={i}
                src={`https://assets.aceternity.com/${img}`}
                alt="template"
                className="h-20 w-full rounded-lg object-cover border border-neutral-700/60 shadow-lg md:h-44 lg:h-60"
              />
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Changelog",
      content: (
        <div>
          <p className="mb-6 text-xs md:text-sm text-neutral-300">
            Deployed 5 new components on Aceternity today.
          </p>

          <div className="mb-8 space-y-2">
            {[
              "Card grid component",
              "Startup template Aceternity",
              "Random file upload lol",
              "Himesh Reshammiya Music CD",
              "Salman Bhai Fan Club registrations open",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-xs md:text-sm text-neutral-400"
              >
                <span style={{ color: "#ffcb74" }}>✔</span> {item}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              "pro/hero-sections.png",
              "features-section.png",
              "pro/bento-grids.png",
              "cards.png",
            ].map((img, i) => (
              <img
                key={i}
                src={`https://assets.aceternity.com/${img}`}
                alt="template"
                className="h-20 w-full rounded-lg object-cover border border-neutral-700/60 shadow-lg md:h-44 lg:h-60"
              />
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="relative w-full bg-black py-10 md:py-20">
      <Timeline data={data} />
    </div>
  );
}
