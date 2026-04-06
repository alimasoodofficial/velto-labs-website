"use server";

import { createClient } from "@/lib/supabase/server";

export interface Article {
  id: string;
  slug: string;
  pageTitle: string;
  metaTitle: string;
  image: string;
  category: string;
  pageDescription: string;
  created_at: string;
  status: string;
}

export async function getArticles(): Promise<Article[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching articles:", error);
    return [];
  }

  // Map database underscored names to the camelCase used in the admin UI if needed
  return (data || []).map((a: any) => ({
    ...a,
    pageTitle: a.page_title || a.pageTitle,
    metaTitle: a.meta_title || a.metaTitle,
    pageDescription: a.page_description || a.pageDescription,
  }));
}

export async function deleteArticle(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("articles").delete().eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function saveArticle(article: any) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return { success: false, error: "Unauthorized" };

  // Prepare data for database (underscored)
  const dbData = {
    id: article.id || undefined,
    slug: article.slug,
    page_title: article.pageTitle,
    meta_title: article.metaTitle,
    page_description: article.pageDescription,
    image: article.image,
    category: article.category,
    status: article.status || 'published',
    user_id: user.id,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("articles")
    .upsert(dbData)
    .select()
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data };
}
