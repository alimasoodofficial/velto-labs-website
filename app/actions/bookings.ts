"use server";

import { createClient } from "@/lib/supabase/server";

export interface Booking {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  date: string;
  status: "pending" | "confirmed" | "cancelled";
  created_at: string;
}

export async function getBookings(): Promise<Booking[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching bookings:", error);
    return [];
  }

  return data || [];
}

export async function updateBookingStatus(id: string, status: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("bookings")
    .update({ status })
    .eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function deleteBooking(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function rescheduleBooking(id: string, newDate: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("bookings")
    .update({ date: newDate, status: "confirmed" })
    .eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}
