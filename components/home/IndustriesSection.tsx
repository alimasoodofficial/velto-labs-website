'use client';

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SplitText } from "@/components/ui/SplitText";
import { Scale, Heart, Code, Users, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const industries = [
  { icon: Scale, name: "Legal services", description: "Secure client confidentiality with top-tier compliance automation." },
  { icon: Heart, name: "Healthcare providers", description: "Protect patient data and adhere to strict health regulations." },
  { icon: Code, name: "SaaS teams", description: "Build trust with your customers by showing evidence of your security." },
  { icon: Users, name: "NDIS providers", description: "Simplify compliance and focus on delivering care safely." },
];

export const IndustriesSection = () => {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Subtle modern grid background */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-brand-light to-transparent opacity-50"></div>
      <div className="absolute inset-0 modern-grid opacity-[0.4]"></div>

      <div className="container-wide mx-auto relative z-10">
        <AnimatedSection className="text-center mb-20">
          <SplitText
            text="High Trust Environments"
            tag="h2"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-navy mb-6"
            splitType="words"
            delay={0.2}
            duration={0.5}
            stagger={0.08}
            from={{ opacity: 0, y: 30 }}
            to={{ opacity: 1, y: 0 }}
          />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We work with organisations where data protection isn't optional, but a foundational requirement for success.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {industries.map((industry, index) => {
            return (
              <AnimatedSection key={industry.name} delay={index * 0.1}>
                <motion.div
                  initial={{ y: -12 }}
                  whileHover={{ y: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group relative h-full p-8 lg:p-10 rounded-[2rem] border flex flex-col items-start text-left transition-all duration-500 bg-card border-brand-teal/20 shadow-2xl shadow-brand-teal/30 hover:border-border hover:shadow-none"
                >
                  <div className="mb-8 w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 bg-brand-teal rotate-6 shadow-lg shadow-brand-teal/20 group-hover:bg-brand-teal/5 group-hover:rotate-0 group-hover:shadow-none">
                    <industry.icon className="h-8 w-8 transition-colors duration-500 text-white group-hover:text-brand-teal" />
                  </div>

                  <h3 className="text-2xl font-bold text-brand-navy mb-4 transition-colors group-hover:text-brand-teal">
                    {industry.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                    {industry.description}
                  </p>

                  <div className="mt-auto flex items-center justify-center px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-500 cursor-pointer w-full bg-brand-teal text-white shadow-lg shadow-brand-teal/20 group-hover:bg-transparent group-hover:border-2 group-hover:border-brand-teal group-hover:text-brand-teal group-hover:shadow-none hover:scale-[1.03] active:scale-95">
                    Learn More
                    <ArrowUpRight className="ml-2 w-4 h-4 stroke-[3] transition-all duration-500 opacity-100" />
                  </div>
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
};
