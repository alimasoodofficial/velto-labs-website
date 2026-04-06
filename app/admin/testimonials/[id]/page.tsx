import { createClient } from "@supabase/supabase-js";
import TestimonialFormClient from "../TestimonialFormClient";
import { notFound } from "next/navigation";

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function EditTestimonialPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const { data, error } = await supabaseAdmin
        .from("testimonials")
        .select("*")
        .eq("id", id)
        .single();

    if (error || !data) {
        notFound();
    }

    return <TestimonialFormClient isNew={false} initialData={data} />;
}
