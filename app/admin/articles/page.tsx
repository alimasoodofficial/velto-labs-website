import { getArticles } from "@/app/actions/articles";
import AdminArticlesList from "./AdminArticlesList";

export default async function AdminArticlesPage() {
    const articles = await getArticles();

    return (
        <div className="p-6">
            <AdminArticlesList initialArticles={articles} />
        </div>
    );
}

