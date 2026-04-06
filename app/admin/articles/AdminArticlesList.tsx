"use client";

import { useState, useEffect } from "react";
import { Article, deleteArticle, saveArticle } from "@/app/actions/articles";
import { getCategories, saveCategory, deleteCategory, Category } from "@/app/actions/categories";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit2, Trash2, FileText, ExternalLink, Tag, X, Copy, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
    initialArticles: Article[];
}

export default function AdminArticlesList({ initialArticles }: Props) {
    const [articles, setArticles] = useState(initialArticles);
    const [categories, setCategories] = useState<Category[]>([]);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [isDuplicating, setIsDuplicating] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchCats = async () => {
            const cats = await getCategories();
            setCategories(cats);
        };
        fetchCats();
    }, []);

    const handleDuplicate = async (article: Article) => {
        if (isDuplicating) return;
        setIsDuplicating(article.id);

        const newSlug = `${article.slug}-copy-${Date.now()}`;

        const duplicatedArticle: Article = {
            ...article,
            id: "", // Supabase will generate a new UUID
            slug: newSlug,
            pageTitle: `${article.pageTitle} (Copy)`,
            metaTitle: `${article.metaTitle} (Copy)`,
        };

        const res = await saveArticle(duplicatedArticle);

        if (res.success) {
            toast.success("Article duplicated successfully");
            router.refresh();
            // Manually reload after a short delay to ensure DB sync is visible
            setTimeout(() => {
                window.location.reload();
            }, 500);
        } else {
            toast.error("Failed to duplicate article: " + res.error);
        }
        setIsDuplicating(null);
    };

    const handleAddCategory = async () => {
        if (!newCategoryName.trim()) return;
        const newCat = {
            id: Date.now().toString(),
            name: newCategoryName,
            slug: newCategoryName.toLowerCase().replace(/ /g, "-")
        };
        const res = await saveCategory(newCat);
        if (res.success) {
            setCategories([...categories, newCat]);
            setNewCategoryName("");
            toast.success("Category added");
        }
    };

    const handleDeleteCategory = async (id: string) => {
        const res = await deleteCategory(id);
        if (res.success) {
            setCategories(categories.filter(c => c.id !== id));
            toast.success("Category removed");
        }
    };

    const handleDelete = async (id: string) => {
        setDeletingId(id);
        const res = await deleteArticle(id);
        if (res.success) {
            setArticles(articles.filter(a => a.id !== id));
            toast.success("Article deleted successfully");
            router.refresh();
        } else {
            toast.error("Failed to delete article");
        }
        setDeletingId(null);
    };

    const confirmDelete = (id: string) => {
        toast(
            (t) => (
                <div className="flex flex-col gap-3 p-1 ">
                    <div className="flex flex-col">
                        <span className="font-semibold text-slate-50">Delete Article?</span>
                        <span className="text-sm text-slate-50">
                            This action cannot be undone.
                        </span>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="destructive"
                            size="sm"
                            className="flex-1 bg-red-500 hover:bg-red-600"
                            onClick={() => {
                                toast.dismiss(t.id);
                                handleDelete(id);
                            }}
                        >
                            Delete
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="flex-1 bg-gray-500 hover:bg-gray-600"
                            onClick={() => toast.dismiss(t.id)}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            ),
            {
                duration: 5000,
                position: "top-center",
                style: {
                    minWidth: "300px",
                    padding: "16px",
                    borderRadius: "12px",
                    boxShadow:
                        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                    background: "#1e293b",

                },
            },
        );
    };

    return (
        <div className="space-y-12 pb-12">
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                        <Tag className="h-6 w-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Taxonomy & Categories</h2>
                        <p className="text-sm text-slate-500">Manage classification for your technical insights</p>
                    </div>
                </div>

                <Card className="border-none shadow-xl shadow-slate-200/50 ring-1 ring-slate-100 overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex flex-wrap gap-3 mb-8">
                            <AnimatePresence>
                                {categories.map((cat) => (
                                    <motion.div
                                        key={cat.id}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.5 }}
                                        className="group flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 rounded-full hover:border-primary/20 hover:bg-primary/5 transition-all"
                                    >
                                        <span className="text-xs font-black uppercase tracking-widest text-slate-600 group-hover:text-primary">{cat.name}</span>
                                        <button
                                            onClick={() => handleDeleteCategory(cat.id)}
                                            className="text-slate-300 hover:text-red-500 transition-colors"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        <div className="flex max-w-md gap-2">
                            <Input
                                placeholder="Add new category (e.g. Sustainability)"
                                value={newCategoryName}
                                onChange={(e) => setNewCategoryName(e.target.value)}
                                className="rounded-full bg-slate-50 border-none h-11 px-6 text-sm"
                                onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
                            />
                            <Button
                                onClick={handleAddCategory}
                                className="rounded-full bg-slate-900 text-white px-6 h-11 font-bold text-xs uppercase tracking-widest"
                            >
                                Add
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                            <FileText className="h-6 w-6" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight">The Insight Depository</h2>
                            <p className="text-sm text-slate-500">Manage and oversee your technical publications ({articles.length})</p>
                        </div>
                    </div>
                    <Button
                        asChild
                        size="lg"
                        className="shadow-lg bg-primary hover:bg-primary/90 text-white rounded-full font-black uppercase tracking-widest text-[10px] px-8 h-12"
                    >
                        <Link href={`/admin/articles/new`}>
                            <Plus className="h-5 w-5 mr-2" />
                            Write Insight
                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map((article) => (
                        <Card key={article.id} className="overflow-hidden group border-none shadow-md hover:shadow-xl transition-all duration-300 bg-white ring-1 ring-slate-100 rounded-3xl">
                            <div className="relative aspect-video overflow-hidden">
                                <Image
                                    src={article.image}
                                    alt={article.pageTitle}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute top-3 right-3 flex gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                    <Button
                                        size="icon"
                                        variant="secondary"
                                        className="h-9 w-9 rounded-full shadow-lg bg-emerald-500 hover:bg-emerald-600 text-white"
                                        onClick={() => handleDuplicate(article)}
                                        disabled={isDuplicating === article.id}
                                    >
                                        {isDuplicating === article.id ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <Copy className="h-4 w-4" />
                                        )}
                                    </Button>
                                    <Button
                                        size="icon"
                                        variant="secondary"
                                        className="h-9 w-9 rounded-full shadow-lg bg-white/95 backdrop-blur-sm hover:bg-white text-slate-700"
                                        asChild
                                    >
                                        <Link href={`/admin/articles/edit/${article.id}`}>
                                            <Edit2 className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                    <Button
                                        size="icon"
                                        variant="destructive"
                                        className="h-9 w-9 rounded-full shadow-lg bg-red-600 hover:bg-red-700"
                                        onClick={() => confirmDelete(article.id)}
                                        disabled={deletingId === article.id}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                                <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button
                                        asChild
                                        size="sm"
                                        className="rounded-full bg-slate-900/40 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest border border-white/20 h-8"
                                    >
                                        <Link href={`/articles/${article.slug}`} target="_blank">
                                            <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                                            View Live
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                            <CardContent className="p-6">
                                <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black rounded-full uppercase tracking-widest mb-4 inline-block">
                                    {article.category}
                                </span>
                                <h3 className="text-lg font-bold text-slate-900 line-clamp-1 mb-2 group-hover:text-primary transition-colors">
                                    {article.pageTitle}
                                </h3>
                                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                                    {article.pageDescription}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}

