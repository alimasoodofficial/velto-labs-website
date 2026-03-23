import { Metadata } from "next";
import { Layout } from "@/components/layout/Layout";
import { ContactContent } from "@/components/contact/ContactContent";

export const metadata: Metadata = {
  title: "Contact Us | Velto Labs",
  description: "Book a professional consultation or send us a detailed enquiry.",
};

export default function ContactPage() {
  return (
    <Layout>
      <ContactContent />
    </Layout>
  );
}
