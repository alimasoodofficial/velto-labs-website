"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2, MessageSquareQuote, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-hot-toast";

interface Testimonial {
    id: string;
    name: string;
    position: string;
    company: string;
    review: string;
    rating: number;
    avatar_url: string | null;
    created_at: string;
}

export default function TestimonialsClient() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const { data, error } = await supabase
                .from("testimonials")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            setTestimonials(data || []);
        } catch (error: any) {
            toast.error(error.message || "Failed to load testimonials");
        } finally {
            setIsLoading(false);
        }
    };

    const deleteTestimonial = async (id: string) => {
        if (!confirm("Are you sure you want to delete this testimonial?")) return;

        try {
            const { error } = await supabase.from("testimonials").delete().eq("id", id);
            if (error) throw error;
            toast.success("Testimonial deleted");
            fetchTestimonials();
        } catch (error: any) {
            toast.error(error.message || "Failed to delete testimonial");
        }
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                        Testimonials Management
                    </h1>
                    <p className="text-slate-500 mt-1 font-medium">
                        Manage client reviews displayed on the homepage carousel.
                    </p>
                </div>
                <Button
                    asChild
                    className="shrink-0 bg-primary hover:bg-primary-dark text-white rounded-xl shadow-lg shadow-primary/20 transition-all font-bold h-12 px-6"
                >
                    <Link href={`/admin/testimonials/new`}>
                        <Plus className="w-5 h-5 mr-2" />
                        Add New Review
                    </Link>
                </Button>
            </div>

            {/* Content */}
            <div className="bg-white rounded-[2.5rem] p-4 sm:p-8 shadow-2xl border-none">
                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                    </div>
                ) : testimonials.length === 0 ? (
                    <div className="text-center py-24 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200">
                        <MessageSquareQuote className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-slate-900 mb-2">No testimonials yet</h3>
                        <p className="text-slate-500 mb-6 max-w-sm mx-auto">
                            Add your first client review to showcase on the homepage carousel.
                        </p>
                        <Button asChild variant="outline" className="rounded-xl border-slate-200">
                            <Link href={`/admin/testimonials/new`}>Add First Review</Link>
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {testimonials.map((t) => (
                            <div
                                key={t.id}
                                className="group bg-slate-50 p-6 rounded-3xl border border-transparent hover:border-slate-200 hover:shadow-xl transition-all duration-300 flex flex-col gap-4 relative overflow-hidden"
                            >
                                {/* Header row */}
                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-200 shrink-0">
                                        {t.avatar_url ? (
                                            <Image
                                                src={t.avatar_url}
                                                alt={t.name}
                                                width={56}
                                                height={56}
                                                className="object-cover w-full h-full"
                                            />
                                        ) : (
                                            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                                                {t.name.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-slate-900 truncate">{t.name}</h3>
                                        <p className="text-sm text-slate-500 truncate">
                                            {t.position}, {t.company}
                                        </p>
                                        <div className="flex gap-0.5 mt-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={13}
                                                    className={i < t.rating ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200"}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Review text */}
                                <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                                    &ldquo;{t.review}&rdquo;
                                </p>

                                {/* Actions */}
                                <div className="flex gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button
                                        asChild
                                        variant="outline"
                                        className="flex-1 py-2 rounded-xl bg-white border-slate-200 hover:text-primary hover:border-primary/50 text-slate-600"
                                    >
                                        <Link href={`/admin/testimonials/${t.id}`}>
                                            <Edit2 className="w-4 h-4 mr-2" />
                                            Edit
                                        </Link>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="flex-1 py-2 rounded-xl bg-white border-slate-200 hover:text-red-600 hover:bg-red-50 text-slate-600 hover:border-red-200"
                                        onClick={() => deleteTestimonial(t.id)}
                                    >
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

