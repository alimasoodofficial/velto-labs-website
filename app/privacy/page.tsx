import { Layout } from "@/components/layout/Layout";
import { PageBanner } from "@/components/layout/PageBanner";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { PrivacyIllustration } from "@/components/illustrations/BannerIllustrations";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Velto Labs",
  description: "Privacy Policy for Velto Labs.",
};

export default function PrivacyPage() {
  return (
    <Layout>
      <PageBanner
        label="Legal"
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your personal information."
        illustration={<PrivacyIllustration />}
      />

      <section className="section-padding bg-brand-surface">
        <div className="container-narrow mx-auto">
          <AnimatedSection>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="text-lg mb-6">Last updated: February 2026</p>

              {[
                { title: "1. Information We Collect", content: "We collect information you provide directly to us, such as when you fill out a contact form, book a consultation, or subscribe to our newsletter. This may include your name, email address, phone number, company name, and any other information you choose to provide." },
                { title: "2. How We Use Your Information", content: "We use the information we collect to:", list: ["Respond to your enquiries and provide our services", "Send you technical notices and support messages", "Communicate with you about services, offers, and events", "Improve our website and services"] },
                { title: "3. Information Sharing", content: "We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as necessary to provide our services or as required by law." },
                { title: "4. Data Security", content: "We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction." },
                { title: "5. Your Rights", content: "You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us at contact@veltolabs.com." },
                { title: "6. Contact Us", content: "If you have any questions about this Privacy Policy, please contact us at:", email: "contact@veltolabs.com" },
              ].map((section) => (
                <div key={section.title} className="mb-8 p-6 rounded-xl border border-border bg-card">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">{section.title}</h2>
                  <p className="mb-4">{section.content}</p>
                  {section.list && (
                    <ul className="list-disc pl-6 space-y-2">
                      {section.list.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  )}
                  {section.email && (
                    <p>Email: <a href={`mailto:${section.email}`} className="text-brand-teal underline">{section.email}</a></p>
                  )}
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
}
