'use client';

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { SplitText } from "@/components/ui/SplitText";

interface PageBannerProps {
  title: string;
  subtitle: string;
  label?: string;
  illustration: ReactNode;
}

export const PageBanner = ({ title, subtitle, label, illustration }: PageBannerProps) => {
  return (
    <section className="section-padding bg-background overflow-hidden relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(hsl(var(--brand-teal)) 1px, transparent 1px)`,
        backgroundSize: '30px 30px',
      }} />

      <div className="container-wide mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center min-h-[40vh]">
          {/* Text */}
          <div>
            {label && (
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-block text-sm font-medium tracking-widest uppercase text-brand-teal mb-4"
              >
                {label}
              </motion.span>
            )}
            <SplitText
              text={title}
              tag="h1"
              className="text-4xl md:text-6xl lg:text-7xl font-black text-brand-navy leading-[1.1] tracking-tight mb-8 max-w-2xl"
              splitType="words"
              delay={0.1}
              duration={0.6}
              stagger={0.06}
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl"
            >
              {subtitle}
            </motion.p>
          </div>

          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex items-center justify-center"
          >
            {illustration}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
