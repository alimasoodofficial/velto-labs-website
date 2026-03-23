import { Metadata } from "next";
import { Layout } from "@/components/layout/Layout";
import { BlogContent } from "@/components/blog/BlogContent";

export const metadata: Metadata = {
  title: "Blog | Velto Labs",
  description: "Practical guidance on cybersecurity, compliance, and risk management.",
};

export default function BlogPage() {
  return (
    <Layout>
      <BlogContent />
    </Layout>
  );
}
