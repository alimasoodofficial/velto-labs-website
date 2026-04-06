"use server";

import { createClient } from "@/lib/supabase/server";

export interface Category {
  id: string;
  name: string;
  slug: string;
  created_at?: string;
}

export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  return data || [];
}

export async function saveCategory(category: Category) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .upsert({
      ...category,
      id: isNaN(Number(category.id)) ? category.id : undefined, // If numeric-looking ID, maybe let DB assign unique ID or use it as-is? Actually many code snippets use Date.now().toString() so we should keep it stringy.
    })
    .select()
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data };
}

export async function deleteCategory(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("categories").delete().eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}
