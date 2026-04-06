"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, ArrowLeft, Save, User2, Plus, Star } from "lucide-react";
import { toast } from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";

interface TestimonialFormProps {
    initialData?: any;
    isNew?: boolean;
}

export default function TestimonialFormClient({
    initialData,
    isNew,
}: TestimonialFormProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        position: initialData?.position || "",
        company: initialData?.company || "",
        review: initialData?.review || "",
        rating: initialData?.rating ?? 5,
        avatar_url: initialData?.avatar_url || "",
    });

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        setIsUploadingAvatar(true);
        try {
            const file = e.target.files[0];
            const fileExt = file.name.split(".").pop();
            const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
            const filePath = `testimonials/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from("general-media")
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: publicUrlData } = supabase.storage
                .from("general-media")
                .getPublicUrl(filePath);

            setFormData((prev) => ({ ...prev, avatar_url: publicUrlData.publicUrl }));
            toast.success("Avatar uploaded!");
        } catch (error: any) {
            toast.error(error.message || "Error uploading avatar");
        } finally {
            setIsUploadingAvatar(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name.trim() || !formData.review.trim()) {
            toast.error("Name and review are required.");
            return;
        }
        setIsSubmitting(true);

        try {
            const { error } = isNew
                ? await supabase.from("testimonials").insert([formData])
                : await supabase
                    .from("testimonials")
                    .update(formData)
                    .eq("id", initialData.id);

            if (error) throw error;

            toast.success(`Testimonial ${isNew ? "created" : "updated"} successfully!`);
            router.push(`/admin/testimonials`);
            router.refresh();
        } catch (error: any) {
            toast.error(error.message || "Something went wrong.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-8 pb-12">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link
                        href={`/admin/testimonials`}
                        className="p-2 bg-white rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-slate-600" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">
                            {isNew ? "Add Testimonial" : "Edit Testimonial"}
                        </h1>
                        <p className="text-slate-500 mt-1">
                            {isNew
                                ? "Add a new client review to the homepage carousel."
                                : "Update client review details."}
                        </p>
                    </div>
                </div>
                <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="rounded-xl bg-primary text-white cursor-pointer hover:bg-primary-dark h-12 px-8 font-bold shadow-lg shadow-primary/20"
                >
                    {isSubmitting ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                        <Save className="w-4 h-4 mr-2" />
                    )}
                    Save Review
                </Button>
            </div>
            {/* Rest of component remains same... skipping unchanged JSX layout for brevity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Main fields */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                        <h3 className="text-xl font-bold text-slate-900 mb-6 pb-4 border-b border-slate-100">
                            Review Details
                        </h3>

                        <div className="space-y-6">
                            {/* Name */}
                            <div>
                                <Label className="text-slate-700 font-bold mb-2 block">
                                    Client Name <span className="text-red-400">*</span>
                                </Label>
                                <Input
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                    className="rounded-xl bg-slate-50 border-slate-200 h-12"
                                    placeholder="e.g. Ahmed Al-Saeed"
                                    required
                                />
                            </div>

                            {/* Position + Company on same row */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-slate-700 font-bold mb-2 block">
                                        Position / Title
                                    </Label>
                                    <Input
                                        value={formData.position}
                                        onChange={(e) =>
                                            setFormData({ ...formData, position: e.target.value })
                                        }
                                        className="rounded-xl bg-slate-50 border-slate-200 h-12"
                                        placeholder="e.g. CEO"
                                    />
                                </div>
                                <div>
                                    <Label className="text-slate-700 font-bold mb-2 block">
                                        Company
                                    </Label>
                                    <Input
                                        value={formData.company}
                                        onChange={(e) =>
                                            setFormData({ ...formData, company: e.target.value })
                                        }
                                        className="rounded-xl bg-slate-50 border-slate-200 h-12"
                                        placeholder="e.g. GreenTech Industries"
                                    />
                                </div>
                            </div>

                            {/* Review text */}
                            <div>
                                <Label className="text-slate-700 font-bold mb-2 block">
                                    Review <span className="text-red-400">*</span>
                                </Label>
                                <Textarea
                                    value={formData.review}
                                    onChange={(e) =>
                                        setFormData({ ...formData, review: e.target.value })
                                    }
                                    className="rounded-xl bg-slate-50 border-slate-200 min-h-[140px]"
                                    placeholder="Write the client's testimonial here..."
                                    required
                                />
                            </div>

                            {/* Star rating */}
                            <div>
                                <Label className="text-slate-700 font-bold mb-3 block">
                                    Rating
                                </Label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() =>
                                                setFormData({ ...formData, rating: star })
                                            }
                                            className="focus:outline-none transition-transform hover:scale-110"
                                        >
                                            <Star
                                                size={32}
                                                className={
                                                    star <= formData.rating
                                                        ? "text-amber-400 fill-amber-400"
                                                        : "text-slate-300 fill-slate-100"
                                                }
                                            />
                                        </button>
                                    ))}
                                    <span className="ml-2 self-center text-slate-500 font-medium text-sm">
                                        {formData.rating} / 5
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Avatar */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm sticky top-24">
                        <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <User2 className="w-5 h-5 text-primary" /> Client Avatar
                        </h3>

                        <div className="space-y-4">
                            {/* Preview */}
                            <div className="flex justify-center mb-4">
                                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                                    {formData.avatar_url ? (
                                        <Image
                                            src={formData.avatar_url}
                                            alt="Avatar preview"
                                            width={96}
                                            height={96}
                                            className="object-cover w-full h-full"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                                            <User2 size={40} />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Direct URL */}
                            <div>
                                <Label className="text-slate-700 font-bold mb-2 block">
                                    Avatar URL
                                </Label>
                                <Input
                                    value={formData.avatar_url}
                                    onChange={(e) =>
                                        setFormData({ ...formData, avatar_url: e.target.value })
                                    }
                                    className="rounded-xl bg-slate-50 border-slate-200 mb-4"
                                    placeholder="https://..."
                                />
                            </div>

                            {/* Upload button */}
                            <div className="relative">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAvatarUpload}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                />
                                <Button
                                    variant="outline"
                                    disabled={isUploadingAvatar}
                                    className="w-full rounded-xl border-dashed border-2 py-6 text-slate-600 hover:bg-slate-50 hover:text-primary hover:border-primary/50 transition-colors"
                                >
                                    {isUploadingAvatar ? (
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    ) : (
                                        <Plus className="w-4 h-4 mr-2" />
                                    )}
                                    Upload Photo
                                </Button>
                            </div>

                            {formData.avatar_url && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    className="w-full text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl"
                                    onClick={() =>
                                        setFormData({ ...formData, avatar_url: "" })
                                    }
                                >
                                    Remove Avatar
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

