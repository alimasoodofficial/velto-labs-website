"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  ImageIcon,
  Calendar,
  Plus,
  ArrowUpRight,
  Clock,
  CheckCircle,
  AlertCircle,
  Briefcase,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface Article {
  id: string;
  status: string;
  title_en: string;
  created_at: string;
}

interface DashboardStats {
  articles: number;
  published: number;
  images: number;
  bookings: number;
  pending: number;
  services: number;
  publishedServices: number;
}

interface ChartData {
  date: string;
  pending: number;
  confirmed: number;
}

interface Props {
  stats: DashboardStats;
  recentArticles: Article[];
  chartData: ChartData[];
}

const BookingChart = ({ data }: { data: ChartData[] }) => {
  const maxVal = Math.max(...data.map((d) => d.pending + d.confirmed), 5);

  return (
    <Card className="border-none shadow-2xl bg-white rounded-[2.5rem] overflow-hidden p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            Booking <span className="text-primary">Analytics</span>
          </h2>
          <p className="text-sm text-slate-500 font-medium">
            Real-time visualization of the last 30 days
          </p>
        </div>
        <div className="flex items-center gap-6 bg-slate-50 px-5 py-3 rounded-2xl border border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-primary" />
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-wider">
              Confirmed
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-wider">
              Pending
            </span>
          </div>
        </div>
      </div>

      <div className="h-64 flex items-end gap-1 sm:gap-2 relative">
        {data.map((day, i) => {
          const confirmedH = (day.confirmed / maxVal) * 100;
          const pendingH = (day.pending / maxVal) * 100;

          return (
            <div
              key={i}
              className="flex-1 flex flex-col items-center group relative h-full justify-end"
            >
              <div className="w-full flex flex-col justify-end gap-0.5 rounded-t-lg overflow-hidden h-full max-w-[12px] sm:max-w-[20px] mx-auto">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${pendingH}%` }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.03,
                    ease: "easeOut",
                  }}
                  className="bg-amber-400/80 w-full hover:bg-amber-400 transition-colors"
                />
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${confirmedH}%` }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.03,
                    ease: "easeOut",
                  }}
                  className="bg-primary/80 w-full hover:bg-primary transition-colors"
                />
              </div>

              {/* Tooltip */}
              <div className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 bg-slate-900 text-white p-3 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none min-w-[140px] border border-white/10 backdrop-blur-sm">
                <p className="text-[10px] font-black uppercase text-slate-400 mb-2 border-b border-white/5 pb-1">
                  {new Date(day.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <div className="space-y-1">
                  <div className="flex justify-between items-center gap-4">
                    <span className="text-[10px] font-bold text-white/70">
                      Confirmed
                    </span>
                    <span className="text-xs font-black text-primary-light">
                      {day.confirmed}
                    </span>
                  </div>
                  <div className="flex justify-between items-center gap-4">
                    <span className="text-[10px] font-bold text-white/70">
                      Pending
                    </span>
                    <span className="text-xs font-black text-amber-400">
                      {day.pending}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between mt-8 px-1 border-t border-slate-50 pt-5">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          {new Date(data[0].date).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
          })}
        </span>
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          {new Date(data[14].date).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
          })}
        </span>
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          {new Date(data[29].date).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
          })}
        </span>
      </div>
    </Card>
  );
};

const STAT_CARDS = [
  {
    key: "articles",
    title: "Content Repository",
    label: "Total Articles",
    icon: FileText,
    color: "bg-blue-500",
    gradient: "from-blue-600 to-cyan-500",
  },
  {
    key: "images",
    title: "Visual Assets",
    label: "Media Files",
    icon: ImageIcon,
    color: "bg-emerald-500",
    gradient: "from-emerald-600 to-teal-500",
  },
  {
    key: "bookings",
    title: "Active Schedules",
    label: "Client Bookings",
    icon: Calendar,
    color: "bg-primary",
    gradient: "from-primary to-primary-light",
  },
  {
    key: "services",
    title: "Eco Services",
    label: "Environmental Services",
    icon: Briefcase,
    color: "bg-amber-500",
    gradient: "from-amber-600 to-orange-500",
  },
] as const;

const getSubtitle = (key: string, stats: DashboardStats) => {
  const subtitles: Record<string, string> = {
    articles: `${stats.published} articles are live`,
    images: "Stored in secure gallery",
    bookings: `${stats.pending} waiting for review`,
    services: `${stats.publishedServices} services are published`,
  };
  return subtitles[key] ?? "";
};

export function DashboardClient({
  stats,
  recentArticles,
  chartData,
}: Props) {
  return (
    <div className="space-y-10">
      {/* 👋 Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Dashboard <span className="text-primary  ">Overview</span>
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            Welcome back! Here's what's happening with your environment today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-2xl shadow-sm text-sm font-bold text-slate-600">
            <Clock className="w-4 h-4 text-primary" />
            {new Date().toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>
        </div>
      </div>

      {/* 📊 Creative Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {STAT_CARDS.map(({ key, title, label, icon: Icon, gradient }) => (
          <Card
            key={key}
            className="group relative overflow-hidden border-none shadow-2xl bg-white rounded-[2.5rem] transition-all duration-500 hover:scale-[1.02]"
          >
            <div
              className={cn(
                "absolute top-0 right-0 w-32 h-32 opacity-10 blur-3xl rounded-full -mr-16 -mt-16 bg-linear-to-br",
                gradient,
              )}
            />
            <CardContent className="p-8 pt-10">
              <div className="flex justify-between items-start mb-8">
                <div
                  className={cn(
                    "p-4 rounded-3xl bg-linear-to-br text-white shadow-xl rotate-3 group-hover:rotate-0 transition-transform duration-500",
                    gradient,
                  )}
                >
                  <Icon size={32} />
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-black text-slate-400 uppercase tracking-widest">
                  {label}
                </p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-4xl font-black text-slate-900">
                    {stats[key as keyof DashboardStats]}
                  </h3>
                  <span className="text-slate-400 font-bold">units</span>
                </div>
                <div className="text-xs text-slate-500 font-medium pt-2 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {getSubtitle(key, stats)}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 📈 Booking Analytics Chart */}
      <BookingChart data={chartData} />

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-1 space-y-6">
          <div className="px-2">
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
              Quick <span className="text-primary  ">Actions</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <Button
              asChild
              className="h-16 rounded-2xl bg-primary hover:bg-primary-dark text-white font-black text-base shadow-xl shadow-primary/20 transition-all duration-300"
            >
              <Link href={`/admin/articles/new`}>
                <Plus className="h-5 w-5 mr-3" />
                Draft New Article
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-16 rounded-2xl bg-white border-slate-200 hover:bg-slate-50 text-slate-900 font-black text-base transition-all duration-300"
            >
              <Link href={`/admin/gallery/new`}>
                <ImageIcon className="h-5 w-5 mr-3 text-emerald-500" />
                Upload to Gallery
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-16 rounded-2xl bg-white border-slate-200 hover:bg-slate-50 text-slate-900 font-black text-base transition-all duration-300"
            >
              <Link href={`/admin/bookings`}>
                <Calendar className="h-5 w-5 mr-3 text-blue-500" />
                View Bookings
              </Link>
            </Button>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
              Recent <span className="text-primary  ">Activity</span>
            </h2>
            <Link
              href={`/admin/articles`}
              className="text-sm font-bold text-primary hover:underline"
            >
              View All
            </Link>
          </div>

          <Card className="border-none shadow-2xl bg-white rounded-[2.5rem] overflow-hidden">
            <CardContent className="p-4 sm:p-8 space-y-4">
              {recentArticles.length > 0 ? (
                recentArticles.slice(0, 5).map((article) => (
                  <div
                    key={article.id}
                    className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 md:p-6 rounded-4xl bg-slate-50 hover:bg-slate-100 transition-all duration-300 border border-transparent hover:border-slate-200"
                  >
                    <div className="flex items-center gap-5">
                      <div
                        className={cn(
                          "h-12 w-12 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:rotate-12",
                          article.status === "published"
                            ? "bg-emerald-500/10 text-emerald-500"
                            : "bg-amber-500/10 text-amber-500",
                        )}
                      >
                        {article.status === "published" ? (
                          <CheckCircle size={24} />
                        ) : (
                          <AlertCircle size={24} />
                        )}
                      </div>
                      <div>
                        <h4 className="font-black text-slate-900 truncate max-w-[200px] sm:max-w-[300px]">
                          {article.title_en}
                        </h4>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-tight mt-1">
                          Article ID: {article.id.split("-")[0]} •{" "}
                          {new Date(article.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 self-end sm:self-center">
                      <span
                        className={cn(
                          "px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full",
                          article.status === "published"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700",
                        )}
                      >
                        {article.status}
                      </span>
                      <button className="p-2 rounded-xl text-slate-400 hover:text-primary hover:bg-white transition-all">
                        <ArrowUpRight size={20} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10">
                  <p className="text-slate-500 font-bold">
                    No recent activities found.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

