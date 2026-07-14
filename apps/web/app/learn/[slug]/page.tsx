import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { fetchArticle, PET_TYPE_LABELS, type PetTypeSlug } from "@/lib/catalog";

type PageProps = { params: Promise<{ slug: string }> };

const ARTICLE_BODY: Record<string, string[]> = {
  "what-should-i-feed-my-dog": [
    "Choosing the right dog food depends on your dog's age, size, activity level, and any health conditions.",
    "Look for AAFCO-complete formulas with a named protein as the first ingredient. Puppies need higher protein and fat; seniors may benefit from joint support.",
    "Transition gradually over 7–10 days when switching foods to avoid digestive upset.",
  ],
  "puppy-potty-training-dos-and-donts": [
    "Establish a consistent schedule — take your puppy out after meals, naps, and play sessions.",
    "Reward immediately with praise and treats when they go outside. Never punish accidents.",
    "Use a crate appropriately sized so your puppy can stand and turn around comfortably.",
  ],
  "bringing-home-a-new-dog": [
    "Puppy-proof your home before arrival: secure cables, remove toxic plants, and set up a quiet rest area.",
    "Schedule a vet visit within the first week for vaccinations and a wellness check.",
    "Introduce family members and other pets slowly in neutral spaces.",
  ],
};

export default async function LearnArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await fetchArticle(slug);
  if (!article) notFound();

  const paragraphs = ARTICLE_BODY[slug] ?? [
    article.summary,
    "This guide covers essential care topics to help you provide the best environment for your pet.",
    "Visit your local AdoptMe store or browse our shop for recommended products mentioned in this article.",
  ];

  return (
    <article className="mx-auto max-w-3xl space-y-8 px-4 py-12 sm:px-6">
      <nav className="text-sm text-zinc-500">
        <Link href="/learn">Learning Center</Link> / <span className="text-zinc-900 dark:text-zinc-100">{article.title}</span>
      </nav>

      <header className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50">{article.title}</h1>
        <p className="text-sm text-zinc-500">
          {PET_TYPE_LABELS[article.petType as PetTypeSlug] ?? article.petType} · {article.readMinutes} min read
        </p>
      </header>

      <div className="space-y-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        {paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 border-t border-zinc-200 pt-8 dark:border-zinc-800">
        <Link href={`/shop/${article.petType}`} className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
          Shop {PET_TYPE_LABELS[article.petType as PetTypeSlug]} supplies →
        </Link>
        <Link href="/new-pet" className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
          New pet checklist →
        </Link>
      </div>
    </article>
  );
}
