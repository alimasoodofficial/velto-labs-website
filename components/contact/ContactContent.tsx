'use client';

import { useEffect, useState } from "react";
import { PageBanner } from "@/components/layout/PageBanner";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ContactIllustration } from "@/components/illustrations/BannerIllustrations";

export function ContactContent() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    sector: "",
    message: "",
    phone: "",
    honeypot: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const element = document.querySelector(window.location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return;

    if (!formData.fullName || !formData.email || !formData.sector || !formData.message) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    console.log("Form submitted:", formData);
    toast({
      title: "Message sent",
      description: "We'll get back to you within 24 hours.",
    });

    setFormData({
      fullName: "",
      email: "",
      company: "",
      sector: "",
      message: "",
      phone: "",
      honeypot: "",
    });
  };

  return (
    <>
      <PageBanner
        label="Get in Touch"
        title="Let's Secure Your Future"
        subtitle="Book a professional consultation or send us a detailed enquiry. We're here to help you stand up to audit."
        illustration={<ContactIllustration />}
      />

      {/* Global background decoration */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-brand-teal/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[20%] left-[-10%] w-[50%] h-[50%] bg-brand-navy/5 blur-[120px] rounded-full"></div>
      </div>

      {/* Book Section */}
      <section id="book" className="section-padding bg-transparent relative overflow-hidden">
        <div className="absolute inset-0 modern-grid opacity-[0.2] -z-10"></div>
        <div className="container-wide mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <AnimatedSection>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-teal/10 mb-8 shadow-inner">
                <Calendar className="h-8 w-8 text-brand-teal" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-brand-navy mb-6 tracking-tight">
                Book a Cyber Snapshot
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl">
                A high-impact 30-minute consultation to assess your current posture and identify immediate quick wins. No sales jargon, just clarity.
              </p>
              <div className="space-y-4">
                {[
                  "Quick security posture assessment",
                  "Identify your high-priority gaps",
                  "Practical, evidence-backed next steps"
                ].map((item) => (
                  <div key={item} className="flex items-center p-4 rounded-2xl bg-white/50 border border-white/20 backdrop-blur-sm hover:shadow-md transition-all duration-300">
                    <div className="h-2 w-2 rounded-full bg-brand-teal mr-4 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                    <span className="font-medium text-brand-navy/80">{item}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="relative">
                <div className="absolute -inset-4 bg-brand-teal/10 rounded-[2.5rem] blur-2xl -z-10"></div>
                <div className="p-2 rounded-[2rem] border border-border bg-white/80 backdrop-blur-md shadow-2xl">
                  <div className="aspect-[4/3] flex items-center justify-center bg-brand-surface rounded-[1.8rem] border border-dashed border-border text-muted-foreground">
                    <div className="text-center px-10">
                      <div className="w-20 h-20 rounded-full bg-brand-teal/10 flex items-center justify-center mx-auto mb-6">
                        <Calendar className="h-10 w-10 text-brand-teal" />
                      </div>
                      <h4 className="text-xl font-bold text-brand-navy mb-2">Schedule Your Session</h4>
                      <p className="text-sm">Calendly Widget Placeholder</p>
                      <div className="mt-8 border border-brand-teal/20 rounded-full py-2 px-6 inline-block bg-white text-brand-teal font-bold text-xs uppercase tracking-widest">
                        Secured Link
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Message Section */}
      <section id="message" className="section-padding bg-background relative">
        <div className="container-wide mx-auto lg:max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5">
              <AnimatedSection>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-teal/10 mb-8">
                  <Send className="h-8 w-8 text-brand-teal" />
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-brand-navy mb-6 tracking-tight">
                  Send a Message
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Prefer direct communication? Fill out the form and our specialized compliance team will respond within 24 business hours.
                </p>

                <div className="p-8 rounded-3xl bg-brand-navy text-white shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
                    <Send className="w-20 h-20" />
                  </div>
                  <h4 className="text-xl text-white font-bold mb-4">Direct Contact</h4>
                  <div className="space-y-2 text-brand-slate text-sm">
                    <p>Email: hi@veltolabs.com</p>
                    <p>Sydney, NSW, Australia</p>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            <div className="lg:col-span-7">
              <AnimatedSection delay={0.2}>
                <form onSubmit={handleSubmit} className="space-y-8 p-10 lg:p-12 rounded-[2.5rem] bg-white border border-border shadow-2xl hover:shadow-teal/5 transition-all duration-500">
                  <input
                    type="text"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="fullName" className="text-sm font-black text-brand-navy uppercase tracking-widest ml-1">Full Name *</label>
                      <Input
                        id="fullName"
                        className="h-14 rounded-2xl border-border/60 bg-brand-surface focus:bg-white focus:ring-brand-teal transition-all"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        required
                        placeholder="Jane Smith"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-black text-brand-navy uppercase tracking-widest ml-1">Work Email *</label>
                      <Input
                        id="email"
                        type="email"
                        className="h-14 rounded-2xl border-border/60 bg-brand-surface focus:bg-white focus:ring-brand-teal transition-all"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        placeholder="jane@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="company" className="text-sm font-black text-brand-navy uppercase tracking-widest ml-1">Company</label>
                      <Input
                        id="company"
                        className="h-14 rounded-2xl border-border/60 bg-brand-surface focus:bg-white focus:ring-brand-teal transition-all"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Company name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="sector" className="text-sm font-black text-brand-navy uppercase tracking-widest ml-1">Sector *</label>
                      <Select value={formData.sector} onValueChange={(value) => setFormData({ ...formData, sector: value })}>
                        <SelectTrigger className="h-14 rounded-2xl bg-brand-surface border-border/60 focus:bg-white focus:ring-brand-teal"><SelectValue placeholder="Select your sector" /></SelectTrigger>
                        <SelectContent className="bg-white border-border rounded-xl">
                          <SelectItem value="legal">Legal</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="saas">SaaS</SelectItem>
                          <SelectItem value="ndis">NDIS</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-black text-brand-navy uppercase tracking-widest ml-1">Your Enquiry *</label>
                    <Textarea
                      id="message"
                      className="rounded-2xl border-border/60 bg-brand-surface focus:bg-white focus:ring-brand-teal pt-4 transition-all"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={5}
                      placeholder="Tell us about your challenges..."
                    />
                  </div>

                  <div className="p-4 rounded-2xl border-2 border-dashed border-border/50 bg-brand-surface text-center text-xs font-bold text-muted-foreground uppercase tracking-widest">
                    Spam Protection Active
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full h-16 rounded-2xl bg-brand-navy hover:bg-brand-teal text-white font-black uppercase tracking-[0.2em] text-sm shadow-xl hover:shadow-brand-teal/20 transition-all duration-500"
                  >
                    Send Message
                  </Button>
                </form>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
