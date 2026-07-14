import Link from "next/link";
import { fetchArticles, PET_TYPE_LABELS, type PetTypeSlug } from "@/lib/catalog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function LearnPage() {
  const { items } = await fetchArticles();

  const byPet = items.reduce<Record<string, typeof items>>((acc, article) => {
    const key = article.petType;
    if (!acc[key]) acc[key] = [];
    acc[key].push(article);
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-6xl space-y-12 px-4 py-12 sm:px-6">
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">Learning Center</p>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Pet care guides & tips</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Training guides, health FAQs, nutrition tips, and seasonal advice for every pet type.
        </p>
      </div>

      {Object.entries(byPet).map(([petType, articles]) => (
        <section key={petType} className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            {petType === "general" ? "General" : (PET_TYPE_LABELS[petType as PetTypeSlug] ?? petType)}
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Card key={article.id} className="flex flex-col gap-3 p-5">
                <div className="flex flex-wrap gap-2">
                  {article.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} className="border-zinc-200 bg-zinc-50 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Link href={`/learn/${article.slug}`} className="text-base font-semibold text-zinc-900 hover:text-emerald-700 dark:text-zinc-50 dark:hover:text-emerald-400">
                  {article.title}
                </Link>
                <p className="flex-1 text-sm text-zinc-600 dark:text-zinc-400">{article.summary}</p>
                <p className="text-xs text-zinc-400">{article.readMinutes} min read</p>
              </Card>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
