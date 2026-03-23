import { Layout } from "@/components/layout/Layout";
import { PageBanner } from "@/components/layout/PageBanner";
import { BlogIllustration } from "@/components/illustrations/BannerIllustrations";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Post | Velto Labs",
};

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  
  return (
    <Layout>
      <PageBanner
        label="Blog Post"
        title={slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
        subtitle="Detailed insights into this cybersecurity topic."
        illustration={<BlogIllustration />}
      />
      <section className="section-padding bg-background">
        <div className="container-narrow mx-auto">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Content for the post "{slug}" will go here. This is a placeholder for the blog post content.
          </p>
        </div>
      </section>
    </Layout>
  );
}
