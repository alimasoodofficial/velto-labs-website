import { Metadata } from "next";
import { Layout } from "@/components/layout/Layout";
import { ServicesContent } from "@/components/services/ServicesContent";

export const metadata: Metadata = {
  title: "Services | Velto Labs",
  description: "Practical cybersecurity work that produces tangible outcomes and evidence.",
};

export default function ServicesPage() {
  return (
    <Layout>
      <ServicesContent />
    </Layout>
  );
}
