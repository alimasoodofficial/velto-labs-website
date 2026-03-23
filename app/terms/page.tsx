import { Layout } from "@/components/layout/Layout";
import { PageBanner } from "@/components/layout/PageBanner";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { TermsIllustration } from "@/components/illustrations/BannerIllustrations";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use | Velto Labs",
  description: "Terms of Use for Velto Labs.",
};

export default function TermsPage() {
  return (
    <Layout>
      <PageBanner
        label="Legal"
        title="Terms of Use"
        subtitle="The terms and conditions governing use of the Velto Labs website."
        illustration={<TermsIllustration />}
      />

      <section className="section-padding bg-brand-surface">
        <div className="container-narrow mx-auto">
          <AnimatedSection>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="text-lg mb-6">Last updated: February 2026</p>

              {[
                { title: "1. Acceptance of Terms", content: "By accessing and using the Velto Labs website, you accept and agree to be bound by the terms and conditions of this agreement. If you do not agree to these terms, please do not use our website." },
                { title: "2. Use of Website", content: "You may use our website for lawful purposes only. You agree not to use the website in any way that could damage, disable, or impair the website or interfere with any other party's use of the website." },
                { title: "3. Intellectual Property", content: "All content on this website, including text, graphics, logos, and images, is the property of Velto Labs and is protected by Australian and international copyright laws. You may not reproduce, distribute, or create derivative works without our express written permission." },
                { title: "4. Disclaimer", content: "The information provided on this website is for general informational purposes only. It should not be construed as professional advice. We make no representations or warranties of any kind about the completeness, accuracy, reliability, or suitability of the information." },
                { title: "5. Limitation of Liability", content: "Velto Labs shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or use of, or inability to access or use, the website." },
                { title: "6. Governing Law", content: "These terms shall be governed by and construed in accordance with the laws of Australia, without regard to its conflict of law provisions." },
                { title: "7. Contact Us", content: "If you have any questions about these Terms of Use, please contact us at:", email: "contact@veltolabs.com" },
              ].map((section) => (
                <div key={section.title} className="mb-8 p-6 rounded-xl border border-border bg-card">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">{section.title}</h2>
                  <p className="mb-4">{section.content}</p>
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
