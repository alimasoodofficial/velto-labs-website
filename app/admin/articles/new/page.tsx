import ArticleForm from "../ArticleForm";

export default async function NewArticlePage() {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-black mb-8 text-slate-900 uppercase tracking-tight">Create New Insight</h1>
            <ArticleForm />
        </div>
    );
}

