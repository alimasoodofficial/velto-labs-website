"use client";

import { useState, useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Loader2,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  Home,
  Eye,
  EyeOff,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasSubmitted = useRef(false);
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    // If auth state is known, redirect away from login
    if (!authLoading && user) {
      router.replace(`/admin`);
    }
  }, [user, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (hasSubmitted.current) return;
    hasSubmitted.current = true;
    setSubmitting(true);
    setError(null);

    const toastId = toast.loading("Authenticating — please wait...", {
      style: {
        borderRadius: "1rem",
        fontWeight: "700",
        fontSize: "0.8rem",
        letterSpacing: "0.05em",
      },
    });

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.dismiss(toastId);
        toast.error("Incorrect credentials. Please try again.", {
          style: { borderRadius: "1rem", fontWeight: "700", fontSize: "0.8rem" },
        });
        setError("The credentials provided are incorrect. Please try again.");
        hasSubmitted.current = false;
        setSubmitting(false);
      } else {
        toast.loading("Redirecting to dashboard...", { id: toastId });
        router.push(`/admin`);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.dismiss(toastId);
      toast.error("A system error occurred. Please contact tech support.", {
        style: { borderRadius: "1rem", fontWeight: "700", fontSize: "0.8rem" },
      });
      setError("A system error occurred. Please contact tech support.");
      hasSubmitted.current = false;
      setSubmitting(false);
    }
  };

  return (
    <>
    <Toaster position="top-center" />
    <div className="min-h-screen flex items-center justify-center bg-slate-100 relative overflow-hidden">
      {/* 🎨 Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl -ml-64 -mb-64" />

      <div className="w-full max-w-xl px-6 shadow-2xl shadow-slate-200/50 rounded-[2.5rem] overflow-hidden bg-white relative z-10 transition-all duration-700">
        {/* 🔐 Login Form */}
        <div className="p-8 sm:p-12 lg:p-16 bg-white flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full">
            <div className="mb-10 text-center">
              <Image
                src="/images/logo-main.png"
                alt="Velto Labs Logo"
                width={120}
                height={50}
                className="mx-auto block object-contain"
              />
            </div>

            <div className="mb-10 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full mb-4">
                <ShieldCheck size={14} />
                Secure Access Portal
              </div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Admin <span className="text-primary ">Login</span>
              </h2>
              <p className="text-slate-500 font-medium mt-2">
                Cyber Security Operations Center Access
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert className="bg-red-50 border-red-100 text-red-600 rounded-2xl animate-in fade-in slide-in-from-top-2">
                  <AlertDescription className="text-xs font-bold">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-2 group">
                <Label
                  htmlFor="email"
                  className="text-xs font-black uppercase tracking-widest text-slate-400 group-focus-within:text-primary transition-colors"
                >
                  Email Address
                </Label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <Mail size={18} />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@veltolabs.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={submitting}
                    className="h-14 pl-12 pr-4 bg-slate-50 border-slate-100 focus:bg-white focus:border-primary focus:ring-primary/10 rounded-2xl font-medium transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2 group">
                <div className="flex justify-between items-center">
                  <Label
                    htmlFor="password"
                    className="text-xs font-black uppercase tracking-widest text-slate-400 group-focus-within:text-primary transition-colors"
                  >
                    Security Key
                  </Label>

                </div>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <Lock size={18} />
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={submitting}
                    className="h-14 pl-12 pr-12 bg-slate-50 border-slate-100 focus:bg-white focus:border-primary focus:ring-primary/10 rounded-2xl font-medium transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-14 bg-slate-900 hover:bg-primary text-white font-black text-sm uppercase tracking-widest rounded-2xl shadow-xl shadow-slate-900/10 hover:shadow-primary/20 transition-all duration-300 group disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <span className="flex items-center justify-center gap-2 cursor-pointer">
                    Sign In
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </span>
                )}
              </Button>
            </form>

            <div className="mt-8">
              <Button
                asChild
                variant="outline"
                className="w-full h-12 border-slate-200 hover:bg-slate-50 hover:border-primary text-slate-700 font-bold rounded-2xl transition-all duration-300 group"
              >
                <Link href="/">
                  <Home className="mr-2 h-4 w-4 group-hover:text-primary transition-colors" />
                  <span className="group-hover:text-primary transition-colors">
                    Back to Website
                  </span>
                </Link>
              </Button>
            </div>

            <div className="mt-12 text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                &copy; {new Date().getFullYear()} Velto Labs Security
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
