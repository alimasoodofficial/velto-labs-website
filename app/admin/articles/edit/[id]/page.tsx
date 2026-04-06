import { getArticles } from "@/app/actions/articles";
import ArticleForm from "../../ArticleForm";
import { notFound } from "next/navigation";

export default async function EditArticlePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const articles = await getArticles();
    const article = articles.find(a => a.id === id);

    if (!article) {
        notFound();
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-black mb-8 text-slate-900 uppercase tracking-tight">Edit Insight</h1>
            <ArticleForm article={article} />
        </div>
    );
}

