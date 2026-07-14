import Link from "next/link";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/card";
import { SafeImage } from "@/components/ui/safe-image";
import { fetchService, SERVICE_LABELS } from "@/lib/catalog";
import { formatMoney } from "@/lib/money";

type PageProps = { params: Promise<{ slug: string }> };

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = await fetchService(slug);
  if (!service) notFound();

  return (
    <div className="mx-auto max-w-4xl space-y-10 px-4 py-12 sm:px-6">
      <nav className="text-sm text-zinc-500">
        <Link href="/services">Services</Link> / <span className="text-zinc-900 dark:text-zinc-100">{service.name}</span>
      </nav>

      <div className="relative h-64 overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900">
        <SafeImage src={service.imageUrl} alt={service.name} fill priority sizes="100vw" />
      </div>

      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">{SERVICE_LABELS[service.type]}</p>
        <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50">{service.name}</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">{service.summary}</p>
        <p className="text-xl font-semibold text-emerald-700 dark:text-emerald-400">
          From {formatMoney(service.priceFromMinor, service.currency)} · {service.duration}
        </p>
      </div>

      <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{service.description}</p>

      <Card className="space-y-4 p-6">
        <h2 className="font-semibold text-zinc-900 dark:text-zinc-50">How booking works</h2>
        <ol className="space-y-3">
          {service.bookingSteps.map((step, i) => (
            <li key={step} className="flex gap-3 text-sm text-zinc-600 dark:text-zinc-400">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-semibold text-white">{i + 1}</span>
              {step}
            </li>
          ))}
        </ol>
      </Card>

      <div className="flex flex-wrap gap-3">
        <Link href="/stores" className="inline-flex h-11 items-center rounded-full bg-emerald-600 px-8 text-sm font-semibold text-white hover:bg-emerald-700">
          Select a store & book
        </Link>
        <Link href="/login" className="inline-flex h-11 items-center rounded-full border border-zinc-300 px-6 text-sm font-semibold text-zinc-800 dark:border-zinc-700 dark:text-zinc-100">
          Sign in for estimated pricing
        </Link>
      </div>
    </div>
  );
}
