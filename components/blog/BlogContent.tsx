'use client';

import { useState } from "react";
import Link from "next/link";
import { PageBanner } from "@/components/layout/PageBanner";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { BlogIllustration } from "@/components/illustrations/BannerIllustrations";
import { motion } from "framer-motion";

const categories = ["All", "ISO 27001", "Essential Eight", "Vendor Risk", "AI Governance"];

const blogPosts = [
  {
    id: 1,
    title: "Getting Started with ISO 27001: A Practical Guide for SMBs",
    excerpt: "A no-nonsense approach to implementing ISO 27001 without the complexity or consultant-speak.",
    category: "ISO 27001",
    date: "Feb 1, 2026",
    slug: "getting-started-iso-27001",
  },
  {
    id: 2,
    title: "Essential Eight Maturity Model: What Level Do You Actually Need?",
    excerpt: "Not everyone needs maturity level 3. Here's how to figure out what your organisation should target.",
    category: "Essential Eight",
    date: "Jan 28, 2026",
    slug: "essential-eight-maturity-levels",
  },
  {
    id: 3,
    title: "How to Answer Security Questionnaires Without Losing Your Mind",
    excerpt: "A repeatable process for handling vendor security assessments efficiently.",
    category: "Vendor Risk",
    date: "Jan 22, 2026",
    slug: "security-questionnaires-guide",
  },
  {
    id: 4,
    title: "AI Governance: What Boards Need to Know in 2026",
    excerpt: "Key questions board members should be asking about AI risk and governance.",
    category: "AI Governance",
    date: "Jan 15, 2026",
    slug: "ai-governance-boards-2026",
  },
  {
    id: 5,
    title: "Building a Vendor Risk Program from Scratch",
    excerpt: "Step-by-step guide to assessing and managing third-party security risk.",
    category: "Vendor Risk",
    date: "Jan 8, 2026",
    slug: "vendor-risk-program-guide",
  },
  {
    id: 6,
    title: "ISMS Lite: Security Management for Growing Teams",
    excerpt: "You don't need a 500-page manual. Here's how to build a lightweight but effective ISMS.",
    category: "ISO 27001",
    date: "Jan 2, 2026",
    slug: "isms-lite-guide",
  },
];

export function BlogContent() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = activeCategory === "All"
    ? blogPosts
    : blogPosts.filter((post) => post.category === activeCategory);

  return (
    <>
      <PageBanner
        label="Blog"
        title="Insights"
        subtitle="Practical guidance on cybersecurity, compliance, and risk management."
        illustration={<BlogIllustration />}
      />

      {/* Categories */}
      <section className="px-6 lg:px-8 pb-8 bg-background">
        <div className="container-wide mx-auto">
          <AnimatedSection>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                    activeCategory === category
                      ? "bg-brand-teal text-white shadow-md shadow-brand-teal/20"
                      : "bg-secondary text-foreground hover:bg-secondary/80"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="section-padding bg-brand-surface">
        <div className="container-wide mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredPosts.map((post, index) => (
              <AnimatedSection key={post.id} delay={index * 0.05}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block h-full p-6 lg:p-8 rounded-2xl border border-border bg-card transition-all duration-300 hover:border-brand-teal/30 hover:shadow-lg hover:shadow-brand-teal/5"
                  >
                    <Badge
                      variant="secondary"
                      className="mb-4 bg-brand-teal/10 text-brand-teal border-0"
                    >
                      {post.category}
                    </Badge>
                    <h2 className="text-xl font-semibold text-foreground mb-3 leading-snug group-hover:text-brand-teal transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{post.date}</span>
                      <span className="text-sm font-medium text-foreground group-hover:text-brand-teal transition-colors inline-flex items-center">
                        Read
                        <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
