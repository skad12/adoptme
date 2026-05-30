import { Card } from "@/components/ui/card";

export default function SupportPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-12 sm:px-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Help center</h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
          Policies, escrow FAQs, adoption expectations, and safety reporting. Connect this hub to your CMS or Markdown content pipeline.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="space-y-2">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Escrow &amp; disputes</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Explain funding, delivery confirmation, release windows, and how moderators intervene — aligned with `docs/PAYMENT-FLOWS.md`.
          </p>
        </Card>
        <Card className="space-y-2">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Safety &amp; reporting</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Surface `Report` intake and escalation paths. Consider integrating with human moderation tooling at scale.
          </p>
        </Card>
      </div>
    </div>
  );
}
