'use client';

'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Lock, CheckCircle } from "lucide-react";
import { SplitText } from "@/components/ui/SplitText";
import TextType from "@/components/TextType";
import { HeroIllustration } from "@/components/illustrations/HeroIllustration";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-background overflow-hidden ">
      {/* Background Elements */}
      <div className="absolute inset-0 modern-grid opacity-[0.4] z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-1"></div>
      <div className="absolute -top-[10%] -right-[5%] w-[40%] h-[40%] bg-brand-teal/5 blur-[120px] rounded-full z-0 animate-pulse"></div>
      <div className="absolute top-[20%] -left-[5%] w-[30%] h-[30%] bg-brand-navy/5 blur-[100px] rounded-full z-0"></div>

      <div className="container-wide mx-auto relative z-10 section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text content */}
          <div className="flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-brand-teal/10 border border-brand-teal/20 mb-8"
            >
              <ShieldCheck className="w-4 h-4 text-brand-teal animate-pulse" />
              <span className="text-xs font-bold tracking-widest uppercase text-brand-teal">
                Trusted Cyber Security Partners
              </span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-navy leading-[1.05]  mb-8">
              Cybersecurity that holds up when someone<br />{" "}
              <TextType
                text={["asks questions.", "needs answers.", "audit calls."]}
                as="span"
                className="text-brand-teal"
                cursorClassName="text-brand-teal"
                typingSpeed={80}
                deletingSpeed={40}
                pauseDuration={2000}
                showCursor={true}
              />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-xl text-justify md:text-left mb-12 leading-relaxed"
            >
              Velto Labs helps legal, healthcare, SaaS, and NDIS providers lift cyber posture, reduce compliance pain, and produce evidence that stands up to clients, insurers, and audits.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto"
            >
              <Button
                asChild
                size="lg"
                className="bg-brand-navy hover:bg-brand-navy/90 text-white font-bold h-14 px-10 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group"
              >
                <Link href="/contact#book" className="flex items-center">
                  Book a Cyber Snapshot
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-brand-navy/10 bg-white/50 backdrop-blur-sm hover:bg-brand-teal hover:border-brand-teal hover:text-white text-brand-navy font-bold h-14 px-10 rounded-2xl transition-all duration-300 hover:-translate-y-1 shadow-sm"
              >
                <Link href="/services">View Services</Link>
              </Button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap items-center gap-8 mt-16 pt-10 border-t border-brand-navy/5 w-full"
            >
              {[
                { icon: CheckCircle, value: "50+", label: "Clients Secured" },
                { icon: Lock, value: "ISO", label: "27001 Aligned" },
                { icon: ShieldCheck, value: "24/7", label: "Expert Support" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-navy/5 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-brand-teal" />
                  </div>
                  <div>
                    <span className="block text-xl font-black text-brand-navy leading-none">{stat.value}</span>
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative order-first lg:order-last"
          >
            <div className="absolute inset-0 bg-brand-teal/5 blur-[100px] rounded-full z-0"></div>
            <HeroIllustration />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
