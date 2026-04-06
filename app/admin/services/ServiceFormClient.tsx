"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, ArrowLeft, Plus, Trash2, Link as LinkIcon, Save, Image as ImageIcon } from "lucide-react";
import { toast } from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import slugify from "slugify";

interface ServiceFormProps {
    initialData?: any;
    isNew?: boolean;
}

export default function ServiceFormClient({ initialData, isNew }: ServiceFormProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        slug: initialData?.slug || "",
        title_en: initialData?.title_en || "",
        description_en: initialData?.description_en || "",
        overview_en: initialData?.overview_en || "",
        image_url: initialData?.image_url || "",
        icon_name: initialData?.icon_name || "FileSearch",
        core_services_en: initialData?.core_services_en || [],
        related_fields_en: initialData?.related_fields_en || [],
        tools_en: initialData?.tools_en || [],
        is_published: initialData?.is_published !== undefined ? initialData.is_published : true,
    });

    // Array Handlers
    const handleArrayChange = (field: string, index: number, value: string) => {
        setFormData((prev: any) => {
            const newArray = [...prev[field]];
            newArray[index] = value;
            return { ...prev, [field]: newArray };
        });
    };

    const addArrayItem = (field: string) => {
        setFormData((prev: any) => ({ ...prev, [field]: [...prev[field], ""] }));
    };

    const removeArrayItem = (field: string, index: number) => {
        setFormData((prev: any) => {
            const newArray = [...prev[field]];
            newArray.splice(index, 1);
            return { ...prev, [field]: newArray };
        });
    };

    // Image Upload
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            if (!e.target.files || e.target.files.length === 0) return;

            const file = e.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError, data } = await supabase.storage
                .from('general-media')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: publicUrlData } = supabase.storage
                .from('general-media')
                .getPublicUrl(filePath);

            setFormData(prev => ({ ...prev, image_url: publicUrlData.publicUrl }));
            toast.success("Image uploaded successfully!");
        } catch (error: any) {
            toast.error(error.message || "Error uploading image");
        }
    };

    const generateSlug = () => {
        if (!formData.title_en) return;
        const slug = slugify(formData.title_en, {
            lower: true,
            strict: true,
            trim: true,
        });
        setFormData(prev => ({ ...prev, slug }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const { data, error } = isNew
                ? await supabase.from('services').insert([formData])
                : await supabase.from('services').update(formData).eq('id', initialData.id);

            if (error) throw error;

            toast.success(`Service ${isNew ? 'created' : 'updated'} successfully!`);
            router.push(`/admin/services`);
            router.refresh();
        } catch (error: any) {
            toast.error(error.message || "Something went wrong.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-8 pb-12">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href={`/admin/services`} className="p-2 bg-white rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">
                        <ArrowLeft className="w-5 h-5 text-slate-600" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">
                            {isNew ? "Create New Service" : "Edit Service"}
                        </h1>
                        <p className="text-slate-500 mt-1">Configure service details, content, and media.</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        className="rounded-xl border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                        onClick={() => setFormData(prev => ({ ...prev, is_published: !prev.is_published }))}
                    >
                        {formData.is_published ? "Published" : "Draft"}
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="rounded-xl bg-primary text-white cursor-pointer hover:bg-primary-dark"
                    >
                        {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                        Save Service
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Main Details */}
                <div className="lg:col-span-2 space-y-6">
                    <form id="serviceForm" onSubmit={handleSubmit} className="space-y-6">

                        {/* Base Info */}
                        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
                            <h3 className="text-xl font-bold text-slate-900 mb-4">Base Information</h3>

                            <div className="space-y-4">
                                <div>
                                    <Label className="text-slate-700 font-bold">URL Slug</Label>
                                    <div className="flex gap-3 mt-2">
                                        <div className="relative flex-1">
                                            <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                            <Input
                                                value={formData.slug}
                                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                                className="pl-10 rounded-xl bg-slate-50 border-slate-200"
                                                placeholder="e.g. environmental-impact-assessment"
                                                required
                                            />
                                        </div>
                                        <Button type="button" variant="default" onClick={generateSlug} className="rounded-xl text-white shrink-0">
                                            Auto-generate
                                        </Button>
                                    </div>
                                    <p className="text-xs text-slate-500 mt-2">URL slug will be generated based on the title.</p>
                                </div>

                                {/* <div>
                                    <Label className="text-slate-700 font-bold">Icon Name (Lucide React)</Label>
                                    <Input
                                        value={formData.icon_name}
                                        onChange={(e) => setFormData({ ...formData, icon_name: e.target.value })}
                                        className="mt-2 rounded-xl bg-slate-50 border-slate-200"
                                        placeholder="e.g. Leaf, Globe, Waves"
                                    />
                                    <p className="text-xs text-slate-500 mt-2">Find icons at lucide.dev/icons</p>
                                </div> */}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                                <h3 className="text-xl font-bold text-slate-900">Content</h3>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <Label className="text-slate-700 font-bold">Service Title</Label>
                                    <Input
                                        value={formData.title_en}
                                        onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                                        className="mt-2 text-lg rounded-xl bg-slate-50 border-slate-200"
                                        required
                                    />
                                </div>

                                <div>
                                    <Label className="text-slate-700 font-bold">Short Description</Label>
                                    <Textarea
                                        value={formData.description_en}
                                        onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                                        className="mt-2 rounded-xl bg-slate-50 border-slate-200 min-h-[100px]"
                                        placeholder="Brief description for cards and lists..."
                                    />
                                </div>

                                <div>
                                    <Label className="text-slate-700 font-bold">Full Overview</Label>
                                    <Textarea
                                        value={formData.overview_en}
                                        onChange={(e) => setFormData({ ...formData, overview_en: e.target.value })}
                                        className="mt-2 rounded-xl bg-slate-50 border-slate-200 min-h-[200px]"
                                        placeholder="Detailed explanation of the service..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Dynamic Arrays */}
                        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-10">
                            {/* Core Services */}
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-bold text-slate-900">Core Services</h3>
                                    <Button type="button" size="sm" variant="outline" onClick={() => addArrayItem(`core_services_en`)} className="rounded-lg">
                                        <Plus className="w-4 h-4 mr-2" /> Add Item
                                    </Button>
                                </div>
                                <div className="space-y-3">
                                    {formData.core_services_en.map((item: string, idx: number) => (
                                        <div key={idx} className="flex gap-3">
                                            <Input
                                                value={item}
                                                onChange={(e) => handleArrayChange(`core_services_en`, idx, e.target.value)}
                                                className="rounded-xl bg-slate-50 border-slate-200"
                                                placeholder="e.g. Environmental Impact Assessment"
                                            />
                                            <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem(`core_services_en`, idx)} className="text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl">
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    ))}
                                    {formData.core_services_en.length === 0 && (
                                        <p className="text-slate-400 text-sm italic py-2 text-center border-2 border-dashed border-slate-100 rounded-xl">No core services added yet.</p>
                                    )}
                                </div>
                            </div>

                            {/* Related Fields */}
                            <div className="pt-8 border-t border-slate-100">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-bold text-slate-900">Related Fields</h3>
                                    <Button type="button" size="sm" variant="outline" onClick={() => addArrayItem(`related_fields_en`)} className="rounded-lg">
                                        <Plus className="w-4 h-4 mr-2" /> Add Item
                                    </Button>
                                </div>
                                <div className="space-y-3">
                                    {formData.related_fields_en.map((item: string, idx: number) => (
                                        <div key={idx} className="flex gap-3">
                                            <Input
                                                value={item}
                                                onChange={(e) => handleArrayChange(`related_fields_en`, idx, e.target.value)}
                                                className="rounded-xl bg-slate-50 border-slate-200"
                                                placeholder="e.g. Oil & Gas"
                                            />
                                            <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem(`related_fields_en`, idx)} className="text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl">
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Tools & Tech */}
                            <div className="pt-8 border-t border-slate-100">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-bold text-slate-900">Tools & Technologies</h3>
                                    <Button type="button" size="sm" variant="outline" onClick={() => addArrayItem(`tools_en`)} className="rounded-lg">
                                        <Plus className="w-4 h-4 mr-2" /> Add Item
                                    </Button>
                                </div>
                                <div className="space-y-3">
                                    {formData.tools_en.map((item: string, idx: number) => (
                                        <div key={idx} className="flex gap-3">
                                            <Input
                                                value={item}
                                                onChange={(e) => handleArrayChange(`tools_en`, idx, e.target.value)}
                                                className="rounded-xl bg-slate-50 border-slate-200"
                                                placeholder="e.g. ArcGIS"
                                            />
                                            <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem(`tools_en`, idx)} className="text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl">
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Right Column - Media */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm sticky top-24">
                        <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <ImageIcon className="w-5 h-5 text-primary" /> Feature Image
                        </h3>

                        <div className="space-y-4">
                            {formData.image_url ? (
                                <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-200 shadow-inner group">
                                    <Image src={formData.image_url} alt="Preview" fill className="object-cover" />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <Button variant="destructive" size="sm" onClick={() => setFormData({ ...formData, image_url: "" })} className="rounded-lg">
                                            Remove Image
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="aspect-video rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400">
                                    <ImageIcon className="w-8 h-8 mb-2" />
                                    <p className="text-sm">No image selected</p>
                                </div>
                            )}

                            <div>
                                <Label className="text-slate-700 font-bold">Image URL or Upload</Label>
                                <Input
                                    value={formData.image_url}
                                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                                    className="mt-2 mb-3 rounded-xl bg-slate-50 border-slate-200"
                                    placeholder="https://example.com/image.jpg"
                                />

                                <div className="relative">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <Button variant="outline" className="w-full rounded-xl border-dashed border-2 py-6 text-slate-600 hover:bg-slate-50 hover:text-primary hover:border-primary/50 transition-colors">
                                        <Plus className="w-4 h-4 mr-2" /> Upload from Computer
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
