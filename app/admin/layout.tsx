"use client";

import { useEffect, useCallback, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AuthProvider, useAuth } from "@/lib/auth/AuthContext";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  FileText,
  Image as ImageIcon,
  Calendar,
  LogOut,
  Menu,
  X,
  Settings,
  Bell,
  Search,
  User,
  Globe,
  Home,
  CheckCircle,
  MessageSquareQuote,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  children: React.ReactNode;
}

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname() || "";
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user && !pathname.includes("/admin/login")) {
      router.push(`/admin/login`);
    }
  }, [user, loading, router, pathname]);

  const handleSignOut = useCallback(async () => {
    await signOut();
    router.push(`/admin/login`);
  }, [signOut, router]);

  const handleSidebarToggle = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const handleCloseSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  if (pathname.includes("/admin/login")) {
    return <div className="min-h-screen bg-slate-50">{children}</div>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const navigation = [
    { name: "Dashboard", href: `/admin`, icon: LayoutDashboard },
    { name: "Services", href: `/admin/services`, icon: Globe },
    { name: "Testimonials", href: `/admin/testimonials`, icon: MessageSquareQuote },
    { name: "Articles", href: `/admin/articles`, icon: FileText },
    // { name: "Bookings", href: `/admin/bookings`, icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 🌑 Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-60 bg-slate-900/10 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={handleCloseSidebar}
        />
      )}

      {/* 🚀 Modern Light Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-70 w-72 bg-white shadow-2xl shadow-slate-200/50 transform transition-all duration-500 ease-in-out lg:translate-x-0 border-r border-slate-100 flex flex-col",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Logo Section */}
        <div className="p-8 pb-4">
          <Link
            href={`/admin`}
            className="flex items-center gap-3 group"
          >
            <div className="relative h-12 w-full">
              <Image
                src="/images/logo-main.png"
                alt="Velto Labs Logo"
                fill
                className="object-contain"
              />
            </div>
          </Link>
          <div className="mt-8 px-2">
            <div className="h-px w-full bg-linear-to-r from-transparent via-slate-100 to-transparent" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto custom-scrollbar">
          <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">
            Security Ops Hub
          </p>
          {navigation.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== `/admin` &&
                pathname.startsWith(item.href));

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group relative flex items-center px-4 py-3.5 text-sm font-bold rounded-2xl transition-all duration-300",
                  isActive
                    ? "bg-slate-900 text-white shadow-xl shadow-slate-900/20"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50",
                )}
                onClick={handleCloseSidebar}
              >
                <item.icon
                  className={cn(
                    "relative z-10 mr-3 h-5 w-5 transition-transform duration-300",
                    isActive ? "scale-110" : "group-hover:scale-110",
                  )}
                />
                <span className="relative z-10">{item.name}</span>
                {!isActive && (
                  <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-primary scale-0 group-hover:scale-100 transition-transform duration-300" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Account */}
        <div className="p-6 mt-auto">
          <div className="bg-slate-50 rounded-3xl p-5 border border-slate-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mr-4 -mt-4 w-20 h-20 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />

            <div className="flex items-center gap-4 mb-4 relative z-10">
              <div className="h-12 w-12 rounded-2xl bg-linear-to-br from-slate-800 to-slate-950 flex items-center justify-center shadow-lg">
                <span className="text-lg font-black text-white">
                  {user.email?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black text-slate-900 truncate">
                  Administrator
                </p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight truncate">
                  Active Session
                </p>
              </div>
            </div>

            <Button
              asChild
              variant="outline"
              className="w-full bg-white hover:bg-primary/5 hover:text-primary hover:border-primary border-slate-200 transition-all duration-300 rounded-xl py-6 mb-3 cursor-pointer"
            >
              <a href={`/`}>
                <Home className="mr-2 h-4 w-4" />
                <span className="text-xs font-black uppercase tracking-wider">
                  Back to Website
                </span>
              </a>
            </Button>

            <Button
              onClick={handleSignOut}
              variant="outline"
              className="w-full bg-white hover:bg-red-50 hover:text-red-600 hover:border-red-100 border-slate-200 transition-all duration-300 rounded-xl py-6 cursor-pointer"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span className="text-xs font-black uppercase tracking-wider ">
                Sign Out
              </span>
            </Button>
          </div>
        </div>
      </aside>

      {/* 🖥️ Main Dashboard Container */}
      <div className="lg:pl-72 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-100 h-20">
          <div className="flex items-center justify-between h-full px-8">
          <div className="flex items-center gap-3">
              <button
                className="lg:hidden p-2 rounded-xl bg-slate-100 text-slate-600"
                onClick={handleSidebarToggle}
              >
                <Menu className="h-6 w-6" />
              </button>
              {/* Back to Dashboard button — only visible on child pages */}
              {pathname !== `/admin` && (
                <Link
                  href={`/admin`}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-900 text-slate-600 hover:text-white text-sm font-bold transition-all duration-200 group"
                >
                  <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
                  <span className="hidden sm:inline">Back to Dashboard</span>
                </Link>
              )}
            </div>

            <div className="flex items-center gap-4">
              
              <div className="h-8 w-px bg-slate-100 mx-2" />
              <button className="flex items-center gap-3 p-1.5 pr-4 pl-1.5 rounded-2xl hover:bg-slate-50 transition-all group">
                <div className="h-9 w-9 rounded-xl bg-slate-900 flex items-center justify-center shadow-lg shadow-slate-900/20 group-hover:scale-105 transition-transform">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-xs font-black text-slate-900">
                    {user.email}
                  </p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                    Verified
                  </p>
                </div>
              </button>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-6 lg:p-10">
          <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AuthProvider>
  );
}

