'use client';

import Link from "next/link";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SplitText } from "@/components/ui/SplitText";
import { ArrowRight, Layers, FileCheck, Settings, Shield } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    icon: Layers,
    title: "Build it",
    description: "You need a proper baseline and uplift, not scattered fixes. We build foundations that last.",
    cta: "Start an uplift",
    href: "/services#build",
  },
  {
    icon: FileCheck,
    title: "Prove it",
    description: "You are being asked to show evidence and answer security questions. We help you stand up to audit.",
    cta: "Get an evidence pack",
    href: "/services#prove",
  },
  {
    icon: Settings,
    title: "Run it",
    description: "You want ongoing security leadership and continuity without hiring. We act as your fractional CISO.",
    cta: "Talk retainers",
    href: "/services#run",
  },
  {
    icon: Shield,
    title: "Govern AI",
    description: "You are using AI and want sensible guardrails before it becomes a risk. We secure your future.",
    cta: "Set AI guardrails",
    href: "/services#ai",
  },
];

export const WhatWeDoSection = () => {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-teal/5 blur-[120px] rounded-full z-0"></div>

      <div className="container-wide mx-auto relative z-10">
        <AnimatedSection className="text-center mb-20">
          <SplitText
            text="How We Help"
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
            Practical, evidence-backed cybersecurity that fits your specific business context.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {services.map((service, index) => (
            <AnimatedSection key={service.title} delay={index * 0.1}>
              <Link
                href={service.href}
                className="group relative p-8 lg:p-12 rounded-3xl border border-border bg-card hover-card-effect flex flex-col h-full overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-300 group-hover:scale-110">
                  <service.icon className="w-24 h-24 text-brand-navy" />
                </div>

                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-teal/10 mb-8 group-hover:bg-brand-teal group-hover:scale-110 transition-all duration-300">
                  <service.icon className="h-8 w-8 text-brand-teal group-hover:text-white transition-colors" />
                </div>

                <h3 className="text-2xl lg:text-3xl font-bold text-brand-navy mb-4">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed max-w-sm">
                  {service.description}
                </p>

                <div className="mt-auto inline-flex items-center text-brand-navy font-bold group-hover:text-brand-teal transition-colors">
                  <span className="border-b-2 border-brand-teal/30 group-hover:border-brand-teal transition-colors pb-1">
                    {service.cta}
                  </span>
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};
