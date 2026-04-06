"use client";

import { useState, useEffect, useRef } from "react";
import { Article, ArticleSection, saveArticle, SectionType, uploadArticleImage } from "@/app/actions/articles";
import { getCategories, Category } from "@/app/actions/categories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Plus,
    Trash2,
    Save,
    ChevronLeft,
    Type,
    Layout,
    Tag,
    Image as ImageIcon,
    AlignLeft,
    Sparkles,
    Trash,
    Upload,
    List as ListIcon,
    ChevronDown,
    FileText,
    PlusCircle,
    Youtube,
    Code2,
    MousePointer2,
    Link2
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
    article?: Article;
}

export default function ArticleForm({ article }: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const heroImageRef = useRef<HTMLInputElement>(null);
    const sectionImageRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

    const [formData, setFormData] = useState<Partial<Article>>(
        article || {
            id: Date.now().toString(),
            slug: "",
            metaTitle: "",
            metaDescription: "",
            pageTitle: "",
            pageDescription: "",
            category: "Energy",
            tags: [],
            image: "",
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
            readTime: "5 min read",
            sections: [{ id: "1", type: "paragraph", heading: "", description: "" }]
        }
    );

    const [tagsInput, setTagsInput] = useState(formData.tags?.join(", ") || "");

    useEffect(() => {
        const fetchCats = async () => {
            const cats = await getCategories();
            setCategories(cats);
            if (cats.length > 0 && !formData.category) {
                setFormData(prev => ({ ...prev, category: cats[0].name }));
            }
        };
        fetchCats();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const dataToSave = {
                ...formData,
                tags: tagsInput.split(",").map(t => t.trim()).filter(Boolean),
                metaTitle: formData.metaTitle || formData.pageTitle,
                metaDescription: formData.metaDescription || formData.pageDescription
            } as Article;

            dataToSave.slug = (dataToSave.pageTitle || "")
                .toLowerCase()
                .trim()
                .replace(/ /g, "-")
                .replace(/[^\w-]+/g, "");

            const res = await saveArticle(dataToSave);
            if (res.success) {
                toast.success("Article published successfully!");
                router.push(`/admin/articles`);
                router.refresh();
            } else {
                toast.error(res.error || "Failed to save article");
            }
        } catch (error) {
            toast.error("Failed to save article");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const addSection = () => {
        setFormData({
            ...formData,
            sections: [
                ...(formData.sections || []),
                { id: Date.now().toString(), type: "paragraph", heading: "", description: "" }
            ]
        });
        toast.success("New section added", { position: "bottom-right", icon: '✍️' });
    };

    const removeSection = (index: number) => {
        const newSections = [...(formData.sections || [])];
        newSections.splice(index, 1);

        if (newSections.length === 0) {
            newSections.push({ id: Date.now().toString(), type: "paragraph", heading: "", description: "" });
        }

        setFormData({ ...formData, sections: newSections });
        toast.error("Section removed", { position: "bottom-right", icon: <Trash className="h-4 w-4 text-red-500" /> });
    };

    const updateSection = (index: number, field: keyof ArticleSection, value: any) => {
        const newSections = [...(formData.sections || [])];
        newSections[index] = { ...newSections[index], [field]: value };
        setFormData({ ...formData, sections: newSections });
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, target: "hero" | { index: number }) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const uploadData = new FormData();
        uploadData.append('file', file);

        const toastId = toast.loading("Uploading image...");
        const res = await uploadArticleImage(uploadData);

        if (res.url) {
            if (target === "hero") {
                setFormData({ ...formData, image: res.url });
            } else {
                updateSection(target.index, "imageUrl", res.url);
            }
            toast.success("Image uploaded", { id: toastId });
        } else {
            toast.error(res.error || "Upload failed", { id: toastId });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-12 pb-24 h-full">
            {/* 🛠️ Top Sticky Bar */}
            <div className="sticky top-20 z-30 flex items-center justify-between bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-slate-100 shadow-sm mb-8">
                <Button variant="ghost" size="sm" asChild className="rounded-full hover:bg-slate-100">
                    <Link href={`/admin/articles`}>
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Exit Editor
                    </Link>
                </Button>


                <div className="flex items-center gap-3">
                    <div className="hidden md:flex flex-col items-end mr-4">
                        <span className="text-[10px] font-black uppercase tracking-tighter text-slate-400 font-sans">Status</span>
                        <span className="text-xs font-bold text-emerald-500 flex items-center gap-1 font-sans">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Drafting Insight
                        </span>
                    </div>
                    <Button
                        type="submit"
                        className="bg-slate-900 hover:bg-primary text-white px-8 rounded-full shadow-lg transition-all font-black uppercase tracking-widest text-[10px] h-11"
                        disabled={loading}
                    >
                        {loading ? "Publishing..." : (
                            <>
                                <Save className="h-4 w-4 mr-2" />
                                Save & Publish
                            </>
                        )}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* 📝 Main Writing Area */}
                <div className="lg:col-span-8 space-y-10">
                    <div className="space-y-4">
                        <label className="text-[11px] font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2 font-sans">
                            <Sparkles className="h-3 w-3" /> Headline & Visuals
                        </label>
                        <Input
                            placeholder="Enter a compelling title..."
                            value={formData.pageTitle}
                            onChange={e => setFormData({ ...formData, pageTitle: e.target.value })}
                            className="bg-transparent border-none text-4xl md:text-5xl font-black p-0 h-auto focus-visible:ring-0 placeholder:text-slate-200 shadow-none hover:shadow-none"
                            required
                        />
                        <Textarea
                            placeholder="Write a brief, powerful introduction to hook your readers..."
                            value={formData.pageDescription}
                            onChange={e => setFormData({ ...formData, pageDescription: e.target.value })}
                            className="bg-transparent border-none text-xl text-slate-500 p-0 h-auto focus-visible:ring-0 placeholder:text-slate-200 italic min-h-[80px] resize-none shadow-none hover:shadow-none"
                        />
                    </div>

                    <div className="space-y-6 pt-10 border-t border-slate-100">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-xs font-black uppercase tracking-widest text-slate-900 flex items-center gap-2 font-sans">
                                <AlignLeft className="h-4 w-4 text-primary" />
                                Content narrative
                            </h2>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={addSection}
                                className="rounded-full bg-white shadow-sm border-slate-200 hover:border-primary hover:text-primary transition-all font-black text-[10px] uppercase tracking-widest h-8"
                            >
                                <Plus className="h-3.5 w-3.5 mr-1" /> Add Section
                            </Button>
                        </div>

                        <div className="space-y-6">
                            <AnimatePresence initial={false}>
                                {formData.sections?.map((section, index) => (
                                    <motion.div
                                        key={section.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Card className="group border-none shadow-sm hover:shadow-md transition-shadow ring-1 ring-slate-100 relative overflow-visible">
                                            {/* Delete Button */}
                                            <Button
                                                type="button"
                                                variant="secondary"
                                                size="icon"
                                                className="absolute -right-3 -top-3 h-8 w-8 rounded-full shadow-lg bg-white border border-slate-100 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all scale-100 md:scale-0 md:group-hover:scale-100 z-10"
                                                onClick={() => removeSection(index)}
                                            >
                                                <Trash2 className="h-3.5 w-3.5" />
                                            </Button>

                                            <CardContent className="p-0 overflow-hidden rounded-3xl">
                                                {/* Section Header with Type Selector */}
                                                <div className="bg-slate-50/50 p-4 border-b border-slate-100 flex items-center justify-between">
                                                    <div className="flex gap-1 p-1 bg-white rounded-lg border border-slate-200 shadow-sm">
                                                        <Button
                                                            type="button"
                                                            variant={section.type === 'paragraph' ? 'default' : 'ghost'}
                                                            size="sm"
                                                            className={`h-7 px-3 rounded-md text-[10px] font-black uppercase tracking-tight ${section.type === 'paragraph' ? 'bg-slate-900' : 'text-slate-500'}`}
                                                            onClick={() => updateSection(index, 'type', 'paragraph')}
                                                        >
                                                            <FileText className="h-3 w-3 mr-1" /> Text
                                                        </Button>
                                                        <Button
                                                            type="button"
                                                            variant={section.type === 'list' ? 'default' : 'ghost'}
                                                            size="sm"
                                                            className={`h-7 px-3 rounded-md text-[10px] font-black uppercase tracking-tight ${section.type === 'list' ? 'bg-slate-900' : 'text-slate-500'}`}
                                                            onClick={() => updateSection(index, 'type', 'list')}
                                                        >
                                                            <ListIcon className="h-3 w-3 mr-1" /> Mixed List
                                                        </Button>
                                                        <Button
                                                            type="button"
                                                            variant={section.type === 'image' ? 'default' : 'ghost'}
                                                            size="sm"
                                                            className={`h-7 px-3 rounded-md text-[10px] font-black uppercase tracking-tight ${section.type === 'image' ? 'bg-slate-900' : 'text-slate-500'}`}
                                                            onClick={() => updateSection(index, 'type', 'image')}
                                                        >
                                                            <ImageIcon className="h-3 w-3 mr-1" /> Media
                                                        </Button>
                                                        <Button
                                                            type="button"
                                                            variant={section.type === 'embed' ? 'default' : 'ghost'}
                                                            size="sm"
                                                            className={`h-7 px-3 rounded-md text-[10px] font-black uppercase tracking-tight ${section.type === 'embed' ? 'bg-slate-900' : 'text-slate-500'}`}
                                                            onClick={() => updateSection(index, 'type', 'embed')}
                                                        >
                                                            <Youtube className="h-3 w-3 mr-1" /> Embed
                                                        </Button>
                                                    </div>
                                                </div>

                                                <div className="p-8 space-y-6">
                                                    <div className="space-y-4">
                                                        <input
                                                            placeholder="Section Subheading..."
                                                            value={section.heading}
                                                            onChange={e => updateSection(index, "heading", e.target.value)}
                                                            className="w-full text-2xl font-bold bg-transparent outline-none placeholder:text-slate-200 border-none p-0 focus:ring-0"
                                                        />

                                                        {section.type === 'embed' && (
                                                            <div className="space-y-4">
                                                                <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl relative overflow-hidden group/embed">
                                                                    <div className="flex items-center gap-3 mb-4">
                                                                        <div className="p-2 bg-red-500/10 rounded-lg">
                                                                            <Youtube className="h-5 w-5 text-red-500" />
                                                                        </div>
                                                                        <div>
                                                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">YouTube / Iframe Integration</p>
                                                                            <p className="text-[8px] text-slate-500 font-medium">Paste the HTML embed code from your provider</p>
                                                                        </div>
                                                                    </div>
                                                                    <Textarea
                                                                        placeholder='<iframe width="560" height="315" src="https://www.youtube.com/embed/..." ...'
                                                                        value={section.embedCode || ""}
                                                                        onChange={e => updateSection(index, "embedCode", e.target.value)}
                                                                        className="bg-black/50 border-slate-800 text-slate-300 font-mono text-xs min-h-[120px] rounded-xl focus-visible:ring-red-500/20"
                                                                    />
                                                                    {section.embedCode && (
                                                                        <div className="mt-4 aspect-video rounded-xl overflow-hidden bg-black flex items-center justify-center border border-slate-800">
                                                                            <div className="text-center">
                                                                                <Sparkles className="h-6 w-6 text-slate-700 mx-auto mb-2" />
                                                                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">Embed Logic Active</p>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )}

                                                        {section.type === 'image' && (
                                                            <div className="space-y-4">
                                                                <div className="relative aspect-video rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden group/img">
                                                                    {section.imageUrl ? (
                                                                        <>
                                                                            <img src={section.imageUrl} className="w-full h-full object-cover" />
                                                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                                                                                <Button
                                                                                    type="button"
                                                                                    variant="secondary"
                                                                                    size="sm"
                                                                                    onClick={() => sectionImageRefs.current[section.id]?.click()}
                                                                                    className="rounded-full"
                                                                                >
                                                                                    Change Media
                                                                                </Button>
                                                                            </div>
                                                                        </>
                                                                    ) : (
                                                                        <div className="text-center space-y-2">
                                                                            <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                                                                                <ImageIcon className="h-6 w-6" />
                                                                            </div>
                                                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Section visual artifact</p>
                                                                            <Button
                                                                                type="button"
                                                                                variant="outline"
                                                                                size="sm"
                                                                                onClick={() => sectionImageRefs.current[section.id]?.click()}
                                                                                className="rounded-full shadow-sm"
                                                                            >
                                                                                <Upload className="h-3 w-3 mr-1" /> Upload Image
                                                                            </Button>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                    <div className="space-y-1.5">
                                                                        <label className="text-[8px] font-bold uppercase tracking-widest text-slate-400 ml-1">Media URL</label>
                                                                        <Input
                                                                            placeholder="External image URL..."
                                                                            value={section.imageUrl || ""}
                                                                            onChange={e => updateSection(index, "imageUrl", e.target.value)}
                                                                            className="bg-slate-50 border-none text-xs rounded-xl h-10"
                                                                        />
                                                                    </div>
                                                                    <div className="space-y-1.5">
                                                                        <label className="text-[8px] font-bold uppercase tracking-widest text-slate-400 ml-1">Attachment Link (Optional)</label>
                                                                        <Input
                                                                            placeholder="https://example.com/..."
                                                                            value={section.linkUrl || ""}
                                                                            onChange={e => updateSection(index, "linkUrl", e.target.value)}
                                                                            className="bg-slate-50 border-none text-xs rounded-xl h-10"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <input
                                                                    type="file"
                                                                    className="hidden"
                                                                    ref={el => { sectionImageRefs.current[section.id] = el; }}
                                                                    accept="image/*"
                                                                    onChange={e => handleFileUpload(e, { index })}
                                                                />
                                                            </div>
                                                        )}

                                                        <div className="space-y-6">
                                                            <div className="relative">
                                                                <Textarea
                                                                    placeholder={
                                                                        section.type === 'list'
                                                                            ? "Add bullet points here (one per line)..."
                                                                            : "Share your technical expertise and insights here..."
                                                                    }
                                                                    value={section.description}
                                                                    onChange={e => updateSection(index, "description", e.target.value)}
                                                                    className={`border-none bg-slate-50/50 rounded-xl focus-visible:ring-primary/10 leading-relaxed text-slate-600 p-6 shadow-none hover:shadow-none transition-all ${section.type === 'list' ? 'font-mono text-sm' : 'min-h-[200px]'
                                                                        }`}
                                                                />
                                                                {section.type === 'list' && (
                                                                    <div className="absolute left-0 top-6 bottom-6 w-1 bg-primary/20 rounded-full" />
                                                                )}
                                                            </div>

                                                            {/* Limitless Buttons UI */}
                                                            <div className="space-y-4 pt-4 border-t border-slate-100">
                                                                <div className="flex items-center justify-between">
                                                                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                                                                        <MousePointer2 className="h-3 w-3 text-primary" /> Interactive Call-to-Actions
                                                                    </label>
                                                                    <Button
                                                                        type="button"
                                                                        variant="ghost"
                                                                        size="sm"
                                                                        onClick={() => {
                                                                            const newButtons = [...(section.buttons || []), { label: "", url: "" }];
                                                                            updateSection(index, "buttons", newButtons);
                                                                        }}
                                                                        className="h-7 text-[8px] font-black uppercase tracking-tighter text-primary hover:bg-primary/5 rounded-lg"
                                                                    >
                                                                        + Add New Button
                                                                    </Button>
                                                                </div>

                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                    {section.buttons?.map((btn, btnIdx) => (
                                                                        <div key={btnIdx} className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm space-y-3 relative group/btn">
                                                                            <Button
                                                                                type="button"
                                                                                variant="ghost"
                                                                                size="icon"
                                                                                onClick={() => {
                                                                                    const newButtons = [...(section.buttons || [])];
                                                                                    newButtons.splice(btnIdx, 1);
                                                                                    updateSection(index, "buttons", newButtons);
                                                                                }}
                                                                                className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-red-50 text-red-400 opacity-0 group-hover/btn:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                                                                            >
                                                                                <Trash2 className="h-3 w-3" />
                                                                            </Button>
                                                                            <div className="space-y-1">
                                                                                <label className="text-[7px] font-black uppercase text-slate-300 ml-1">Button Label</label>
                                                                                <Input
                                                                                    placeholder="Click Here..."
                                                                                    value={btn.label}
                                                                                    onChange={e => {
                                                                                        const newButtons = [...(section.buttons || [])];
                                                                                        newButtons[btnIdx].label = e.target.value;
                                                                                        updateSection(index, "buttons", newButtons);
                                                                                    }}
                                                                                    className="h-8 text-xs border-slate-50 bg-slate-50/50 rounded-lg shadow-none"
                                                                                />
                                                                            </div>
                                                                            <div className="space-y-1">
                                                                                <label className="text-[7px] font-black uppercase text-slate-300 ml-1">Destination URL</label>
                                                                                <div className="relative">
                                                                                    <Link2 className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-slate-400" />
                                                                                    <Input
                                                                                        placeholder="https://..."
                                                                                        value={btn.url}
                                                                                        onChange={e => {
                                                                                            const newButtons = [...(section.buttons || [])];
                                                                                            newButtons[btnIdx].url = e.target.value;
                                                                                            updateSection(index, "buttons", newButtons);
                                                                                        }}
                                                                                        className="h-8 text-xs border-slate-50 bg-slate-50/50 rounded-lg shadow-none pl-8"
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        <Button
                            type="button"
                            variant="ghost"
                            onClick={addSection}
                            className="w-full h-24 border-2 border-dashed border-slate-200 rounded-3xl hover:border-primary hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-2 group"
                        >
                            <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors shadow-sm">
                                <Plus className="h-5 w-5" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-primary font-sans">Append Narrative Section</span>
                        </Button>
                    </div>
                </div>

                {/* ⚙️ Sidebar Configuration */}
                <div className="lg:col-span-4 space-y-8">
                    {/* Meta & Configuration */}
                    <Card className="border-none shadow-xl shadow-slate-200/50 ring-1 ring-slate-100 rounded-3xl sticky top-40 overflow-hidden">
                        <CardHeader className="border-b border-slate-50 bg-slate-50/30">
                            <CardTitle className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-slate-900 font-sans">
                                <Layout className="h-4 w-4 text-primary" />
                                Publishing details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            <div className="space-y-3">
                                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 font-sans">Cover Photo</label>

                                <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-100 shadow-inner bg-slate-50 flex items-center justify-center group/hero">
                                    {formData.image ? (
                                        <>
                                            <img src={formData.image} alt="Preview" className="object-cover w-full h-full" />
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/hero:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                <Button type="button" size="sm" variant="secondary" className="rounded-full shadow-lg" onClick={() => heroImageRef.current?.click()}>
                                                    <Upload className="h-3 w-3 mr-1" /> Change
                                                </Button>
                                            </div>
                                        </>
                                    ) : (
                                        <Button type="button" variant="ghost" className="h-full w-full flex flex-col gap-2 text-slate-400" onClick={() => heroImageRef.current?.click()}>
                                            <Upload className="h-6 w-6" />
                                            <span className="text-[8px] font-black uppercase tracking-widest">Upload Hero Media</span>
                                        </Button>
                                    )}
                                    <input
                                        type="file"
                                        className="hidden"
                                        ref={heroImageRef}
                                        accept="image/*"
                                        onChange={e => handleFileUpload(e, "hero")}
                                    />
                                </div>

                                <Input
                                    placeholder="Or paste external image URL..."
                                    value={formData.image}
                                    onChange={e => setFormData({ ...formData, image: e.target.value })}
                                    className="bg-slate-50 border-none h-11 text-xs shadow-none hover:shadow-none rounded-xl"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 font-sans">Category</label>
                                <Select

                                    value={formData.category}
                                    onValueChange={(val) => setFormData({ ...formData, category: val })}
                                >
                                    <SelectTrigger className="bg-slate-50 border-none h-11 text-xs shadow-none hover:shadow-none rounded-xl font-bold">
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl border-slate-100 shadow-xl bg-white z-50">
                                        {categories.map((cat) => (
                                            <SelectItem key={cat.id} value={cat.name} className="text-xs font-medium  focus:bg-primary/5 focus:text-primary">
                                                {cat.name}
                                            </SelectItem>
                                        ))}
                                        {categories.length === 0 && (
                                            <SelectItem value="Uncategorized" disabled>No categories found</SelectItem>
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 font-sans">Read Time estimation</label>
                                <Input
                                    value={formData.readTime}
                                    onChange={e => setFormData({ ...formData, readTime: e.target.value })}
                                    className="bg-slate-50 border-none h-11 text-xs shadow-none hover:shadow-none rounded-xl font-bold"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 font-sans">Meta tags</label>
                                <Input
                                    placeholder="Solar, Tech, Vision 2030"
                                    value={tagsInput}
                                    onChange={e => setTagsInput(e.target.value)}
                                    className="bg-slate-50 border-none h-11 text-xs shadow-none hover:shadow-none rounded-xl font-bold"
                                />
                            </div>

                            <div className="pt-6 border-t border-slate-100">
                                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 mb-4 font-sans">
                                    <Type className="h-3 w-3" /> SEO Infrastructure
                                </label>
                                <div className="space-y-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[8px] font-bold uppercase tracking-widest text-slate-300 font-sans">Browser Title</label>
                                        <Input
                                            value={formData.metaTitle}
                                            placeholder={formData.pageTitle || "Article Title..."}
                                            onChange={e => setFormData({ ...formData, metaTitle: e.target.value })}
                                            className="h-10 text-xs border-slate-100 rounded-xl shadow-none hover:shadow-none font-medium"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[8px] font-bold uppercase tracking-widest text-slate-300 font-sans">Crawler Description</label>
                                        <Textarea
                                            value={formData.metaDescription}
                                            placeholder={formData.pageDescription || "Article description summary..."}
                                            onChange={e => setFormData({ ...formData, metaDescription: e.target.value })}
                                            className="text-xs min-h-[80px] border-slate-100 rounded-xl shadow-none hover:shadow-none font-medium leading-relaxed"
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </form>
    );
}
