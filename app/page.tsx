import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/home/Hero";
import { RealitySection } from "@/components/home/RealitySection";
import { WhatWeDoSection } from "@/components/home/WhatWeDoSection";
import { HowWeWorkSection } from "@/components/home/HowWeWorkSection";
import { IndustriesSection } from "@/components/home/IndustriesSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Velto Labs | Cybersecurity and Compliance Uplift for Legal, Health, SaaS and NDIS",
  description: "Velto Labs helps legal, healthcare, SaaS, and NDIS providers lift cyber posture, reduce compliance pain, and produce evidence that stands up to clients, insurers, and audits.",
};

export default function IndexPage() {
  return (
    <Layout>
      <Hero />
      <RealitySection />
      <WhatWeDoSection />
      <HowWeWorkSection />
      <IndustriesSection />
    </Layout>
  );
}
