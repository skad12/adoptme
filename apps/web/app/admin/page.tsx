import { Card } from "@/components/ui/card";

export default function AdminDashboardPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-12 sm:px-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Admin console</h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
          This shell maps to documented admin modules. Use JWTs that include the <code className="rounded bg-zinc-100 px-1 text-xs dark:bg-zinc-900">ADMIN</code> or{" "}
          <code className="rounded bg-zinc-100 px-1 text-xs dark:bg-zinc-900">MODERATOR</code> role to call <code className="rounded bg-zinc-100 px-1 text-xs dark:bg-zinc-900">/v1/admin/*</code> endpoints.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Moderation queue</p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Backed by `GET /v1/admin/moderation/queue` returning `PENDING_REVIEW` listings.</p>
        </Card>
        <Card className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Metrics</p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Backed by `GET /v1/admin/metrics/summary` for high-level KPIs.</p>
        </Card>
      </div>
    </div>
  );
}
