'use client';

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SplitText } from "@/components/ui/SplitText";
import { motion } from "framer-motion";
import {
  SnapshotIllustration,
  PlanIllustration,
  DeliverIllustration,
  EvidenceIllustration,
} from "@/components/illustrations/SectionIllustrations";

const steps = [
  {
    number: "01",
    title: "Snapshot",
    description: "We assess where you are and what gaps matter most to your business.",
    Illustration: SnapshotIllustration,
  },
  {
    number: "02",
    title: "Plan",
    description: "We build a practical roadmap that fits your specific resources.",
    Illustration: PlanIllustration,
  },
  {
    number: "03",
    title: "Deliver",
    description: "We execute the uplift work with minimal disruption to your ops.",
    Illustration: DeliverIllustration,
  },
  {
    number: "04",
    title: "Evidence",
    description: "We produce artefacts that prove your security posture to anyone.",
    Illustration: EvidenceIllustration,
  },
];

export const HowWeWorkSection = () => {
  return (
    <section className="section-padding bg-brand-surface relative overflow-hidden">
      {/* Subtle modern grid background */}
      <div className="absolute inset-0 modern-grid opacity-[0.3] z-0"></div>

      <div className="container-wide mx-auto relative z-10">
        <AnimatedSection className="text-center mb-24">
          <SplitText
            text="How We Work"
            tag="h2"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-navy mb-6"
            splitType="chars"
            delay={0.2}
            duration={0.5}
            stagger={0.04}
            from={{ opacity: 0, y: 30 }}
            to={{ opacity: 1, y: 0 }}
          />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A clear, predictable process from initial assessment to audit-ready evidence.
          </p>
        </AnimatedSection>

        {/* Timeline layout */}
        <div className="relative">
          {/* Connecting line - desktop */}
          <div className="hidden lg:block absolute top-[45%] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-brand-teal/20 to-transparent z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 relative z-10">
            {steps.map((step, index) => (
              <AnimatedSection key={step.number} delay={index * 0.15}>
                <motion.div
                  whileHover={{ y: -12 }}
                  className="group relative bg-card h-full border border-border rounded-3xl p-10 text-center cursor-default transition-all duration-500 hover:shadow-2xl shadow-md hover:shadow-brand-teal/30 hover:border-brand-teal/30"
                >
                  {/* Step number badge */}
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-2xl bg-brand-navy text-white text-sm font-black flex items-center justify-center shadow-xl group-hover:bg-brand-teal group-hover:rotate-12 transition-all duration-300">
                    {step.number}
                  </div>

                  {/* Illustration placeholder/container */}
                  <div className="mb-8 mt-4 transform group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100">
                    <step.Illustration />
                  </div>

                  <h3 className="text-2xl font-bold text-brand-navy mb-4 group-hover:text-brand-teal transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    {step.description}
                  </p>

                  {/* Subtle hover indicator */}
                  <div className="mt-8 h-1 w-0 group-hover:w-full bg-brand-teal/30 mx-auto transition-all duration-500 rounded-full" />
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
