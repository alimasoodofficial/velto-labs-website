'use client';

import Link from "next/link";
import { Github, Twitter, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: "About Us", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Use", href: "/terms" },
      { label: "Cookies Policy", href: "/cookies" },
    ],
    social: [
      { icon: Twitter, href: "https://twitter.com/veltolabs", label: "Twitter" },
      { icon: Linkedin, href: "https://linkedin.com/company/veltolabs", label: "LinkedIn" },
      { icon: Github, href: "https://github.com/veltolabs", label: "GitHub" },
    ],
  };

  return (
    <footer className="bg-brand-navy text-white pt-20 pb-10 border-t border-white/5">
      <div className="container-wide mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <Image src="/images/logo-white.png" alt="Velto Labs" width={160} height={80} className="h-20 w-auto" />
            </Link>
            <p className="text-brand-slate text-sm leading-relaxed max-w-xs">
              Cybersecurity and compliance uplift for organisations that need evidence to stand up in high-trust environments.
            </p>
            <div className="flex space-x-4">
              {footerLinks.social.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-teal transition-all duration-300 group"
                  aria-label={item.label}
                >
                  <item.icon className="w-5 h-5 text-brand-slate group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-white font-bold text-lg">Company</h4>
            <nav className="flex flex-col space-y-3">
              {footerLinks.company.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-brand-slate hover:text-brand-teal text-sm transition-colors flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-brand-teal mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Legal Links */}
          <div className="space-y-6">
            <h4 className="text-white font-bold text-lg">Legal</h4>
            <nav className="flex flex-col space-y-3">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-brand-slate hover:text-brand-teal text-sm transition-colors flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-brand-teal mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-white font-bold text-lg">Contact Us</h4>
            <div className="space-y-4">
              <a href="mailto:contact@veltolabs.com" className="flex items-center space-x-3 text-brand-slate hover:text-brand-teal transition-colors group">
                <Mail className="w-5 h-5 text-brand-teal" />
                <span className="text-sm">contact@veltolabs.com</span>
              </a>
              <div className="flex items-start space-x-3 text-brand-slate">
                <MapPin className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                <span className="text-sm leading-relaxed">Melbourne, Victoria<br />Australia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-center md:text-left">
          <p className="text-brand-slate text-xs">
            © {currentYear} Velto Labs. All rights reserved. Developed by <a href="https://dataexperts360.com" target="_blank" rel="noopener noreferrer" className="text-brand-teal hover:text-white transition-colors">Data Experts 360</a>
          </p>
        </div>
      </div>
    </footer>
  );
};
