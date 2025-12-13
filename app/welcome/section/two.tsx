"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";

export default function SkillsSection() {
  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-black mb-4">
          My <span className="text-lime-600">Creative Arsenal</span>
        </h2>
        <p className="text-neutral-700 max-w-lg mx-auto text-sm">
          I really like some of the technology that I find helpful
        </p>
      </div>

      <div className="flex flex-row flex-wrap items-center justify-center w-full gap-6 mx-auto max-w-6xl">
        
        <Card title="Architecture" icon={<AceternityIcon />}>
          <CanvasRevealEffect
            animationSpeed={5.1}
            containerClassName="bg-emerald-500"
            colors={[[0, 255, 127]]}
          />
        </Card>

        <Card title="UI/UX Design" icon={<AceternityIcon />}>
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-pink-500"
            colors={[[236, 72, 153], [232, 121, 249]]}
            dotSize={2}
          />
        </Card>

        <Card title="Technology" icon={<AceternityIcon />}>
          <CanvasRevealEffect
            animationSpeed={4}
            containerClassName="bg-amber-500"
            colors={[[245, 158, 11]]}
          />
        </Card>

      </div>
    </section>
  );
}

const Card = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
}) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border border-black/20 group/canvas-card flex items-center justify-center w-full md:w-64 h-[20rem] relative bg-white shadow-md rounded-xl"
    >
      <Icon className="absolute h-5 w-5 -top-2 -left-2 text-black/40" />
      <Icon className="absolute h-5 w-5 -bottom-2 -left-2 text-black/40" />
      <Icon className="absolute h-5 w-5 -top-2 -right-2 text-black/40" />
      <Icon className="absolute h-5 w-5 -bottom-2 -right-2 text-black/40" />
      
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full w-full absolute inset-0 rounded-xl overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20">
        <div className="text-center group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0 transition duration-200 w-full mx-auto flex items-center justify-center">
          {icon}
        </div>

        <h2 className="text-black text-lg opacity-0 group-hover/canvas-card:opacity-100 relative z-10 mt-2 font-bold transition duration-200 group-hover/canvas-card:-translate-y-2">
          {title}
        </h2>
      </div>
    </div>
  );
};

const AceternityIcon = () => {
  return (
    <svg
      width="66"
      height="65"
      viewBox="0 0 66 65"
      fill="none"
      className="h-8 w-8 text-black"
    >
      <path
        d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
        stroke="currentColor"
        strokeWidth="15"
        strokeMiterlimit="3.86874"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const Icon = ({ className, ...rest }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};
