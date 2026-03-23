'use client';

import { useEffect } from "react";
import Link from "next/link";
import { PageBanner } from "@/components/layout/PageBanner";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Layers, FileCheck, Settings, Shield, CheckCircle2 } from "lucide-react";
import { ServicesIllustration } from "@/components/illustrations/BannerIllustrations";
import { motion } from "framer-motion";

const services = [
  {
    id: "build",
    icon: Layers,
    title: "Build it",
    description: "For organisations that want a clean baseline and uplift.",
    items: [
      "Security Foundations Uplift",
      "Policy Pack Development",
      "Risk and Asset Registers",
      "Staff Awareness",
      "ISMS Lite",
    ],
  },
  {
    id: "prove",
    icon: FileCheck,
    title: "Prove it",
    description: "For when you're being asked to show evidence now.",
    items: [
      "Security Questionnaire Support",
      "Client Assurance Pack",
      "Audit Readiness",
      "Vendor Risk Pack",
      "Trust Centre Setup",
    ],
  },
  {
    id: "run",
    icon: Settings,
    title: "Run it",
    description: "Ongoing progress and calm oversight.",
    items: [
      "vCISO Advisory",
      "Board Reporting",
      "Access Reviews",
      "Threat Monitoring",
    ],
  },
  {
    id: "ai",
    icon: Shield,
    title: "Govern AI",
    description: "If AI touches your data, clients, or decisions.",
    items: [
      "AI Risk Snapshot",
      "Acceptable Use Policies",
      "Human Oversight Model",
      "AI Vendor Risk",
    ],
  },
];

export function ServicesContent() {
  useEffect(() => {
    if (window.location.hash) {
      const element = document.querySelector(window.location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, []);

  return (
    <>
      <PageBanner
        label="Our Services"
        title="Services"
        subtitle="Practical cybersecurity work that produces tangible outcomes and evidence."
        illustration={<ServicesIllustration />}
      />

      {/* Service Sections */}
      {services.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={`section-padding ${index % 2 === 0 ? "bg-brand-surface" : "bg-background"}`}
        >
          <div className="container-wide mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <AnimatedSection>
                <motion.div
                  whileHover={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.4 }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-teal/10 mb-6"
                >
                  <service.icon className="h-8 w-8 text-brand-teal" />
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
                  {service.title}
                </h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {service.description}
                </p>
                <Button
                  asChild
                  className="bg-brand-teal hover:bg-brand-teal-hover text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-brand-teal/20 hover:-translate-y-0.5"
                >
                  <Link href="/contact#book">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <ul className="space-y-3">
                  {service.items.map((item, itemIndex) => (
                    <motion.li
                      key={item}
                      whileHover={{ x: 4, scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className="flex items-center gap-4 p-5 rounded-xl border border-border bg-card cursor-default transition-all duration-300 hover:border-brand-teal/30 hover:shadow-md hover:shadow-brand-teal/5"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-brand-teal/10 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-brand-teal" />
                      </div>
                      <span className="text-foreground font-medium">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </AnimatedSection>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="section-padding bg-brand-surface">
        <div className="container-wide mx-auto">
          <AnimatedSection className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Not sure where to start?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Book a free 30-minute Cyber Snapshot. We'll assess your situation and recommend practical next steps.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-brand-teal hover:bg-brand-teal-hover text-white font-medium px-10 transition-all duration-300 hover:shadow-lg hover:shadow-brand-teal/20 hover:-translate-y-0.5"
            >
              <Link href="/contact#book">
                Book a Cyber Snapshot
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
