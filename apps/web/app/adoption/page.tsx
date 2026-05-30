import Link from "next/link";
import { Card } from "@/components/ui/card";

export default function AdoptionPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-12 sm:px-6">
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Adoption center</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Applications are reviewed with animal welfare in mind. The API stores structured JSON payloads so you can adapt questions per region without schema churn.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="space-y-3">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Applicant journey</h2>
          <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            <li>Browse adoption listings in the marketplace.</li>
            <li>Submit an application referencing the listing ID.</li>
            <li>Moderators and shelters review against your policy rubric.</li>
            <li>Approved adopters receive secure messaging threads.</li>
          </ol>
        </Card>
        <Card className="space-y-3">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">API hook</h2>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs dark:bg-zinc-900">POST /v1/adoption/applications</code> with a JWT. Wire your UI form to this endpoint and persist documents via{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs dark:bg-zinc-900">/v1/uploads/pet-asset</code>.
          </p>
          <Link className="text-sm font-semibold text-emerald-700 hover:underline dark:text-emerald-400" href="/marketplace?type=ADOPTION">
            View adoption listings
          </Link>
        </Card>
      </div>
    </div>
  );
}
