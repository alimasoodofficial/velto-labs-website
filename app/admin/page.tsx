import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { DashboardClient } from './DashboardClient';

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Silently ignore in read-only contexts
          }
        },
      },
    }
  );

  const [articlesResult, imagesResult, bookingsResult, servicesResult] = await Promise.all([
    supabase
      .from('articles')
      .select('id, page_title, created_at')
      .order('created_at', { ascending: false }),
    supabase
      .from('gallery_images')
      .select('id', { count: 'exact', head: true }),
    supabase
      .from('bookings')
      .select('id, status, created_at')
      .order('created_at', { ascending: false }),
    supabase
      .from('services')
      .select('id, is_published'),
  ]);

  const rawArticles = articlesResult.data ?? [];
  const articles = rawArticles.map((a: any) => ({
    id: a.id,
    title_en: a.page_title || 'Untitled',
    status: 'published', // Articles don't have a status field currently, assuming published
    created_at: a.created_at
  }));
  const bookings = bookingsResult.data ?? [];
  const services = servicesResult.data ?? [];

  // Generate chart data for the last 30 days
  const last30Days = [...Array(30)].map((_, i) => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - (29 - i));
    return d.toISOString().split('T')[0];
  });

  const chartData = last30Days.map(date => {
    const dayBookings = bookings.filter((b: any) =>
      b.created_at && b.created_at.split('T')[0] === date
    );
    return {
      date,
      pending: dayBookings.filter((b: any) => b.status === 'pending').length,
      confirmed: dayBookings.filter((b: any) => b.status === 'confirmed').length,
    };
  });

  const stats = {
    articles: articles.length,
    published: articles.length, // All are published
    images: imagesResult.count ?? 0,
    bookings: bookings.length,
    pending: bookings.filter((b: any) => b.status === 'pending').length,
    services: services.length,
    publishedServices: services.filter((s: any) => s.is_published).length,
  };

  return (
    <DashboardClient
      stats={stats}
      recentArticles={articles.slice(0, 5)}
      chartData={chartData}
    />
  );
}
