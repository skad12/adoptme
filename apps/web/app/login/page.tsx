import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = {
  title: "Login",
  description: "Access your AdoptMe buyer, seller, adopter, or admin workspace.",
};

export default function LoginPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-6xl items-center px-4 py-12 sm:px-6">
      <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,0.9fr)_420px] lg:items-center">
        <div className="space-y-4">
          <p className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-200">
            Account access
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">Login to manage your listings and messages.</h1>
          <p className="max-w-xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Sign in to follow pet inquiries, adoption applications, breeder conversations, donation updates, and care handover messages.
          </p>
        </div>
        <Card className="space-y-5">
          <div>
            <h2 className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">Welcome back</h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Demo password: ChangeMeNow!1</p>
          </div>
          <form className="space-y-4">
            <label className="space-y-2">
              <span className="text-sm font-medium">Email</span>
              <Input type="email" defaultValue="seller@adoptme.local" />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium">Password</span>
              <Input type="password" defaultValue="ChangeMeNow!1" />
            </label>
            <Link
              href="/dashboard"
              className="inline-flex h-10 w-full items-center justify-center rounded-lg bg-emerald-600 px-4 text-sm font-semibold text-white shadow-sm shadow-emerald-600/20 transition hover:bg-emerald-700"
            >
              Continue to dashboard
            </Link>
          </form>
          <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
            Use account access to keep pet records, contact details, and family conversations organized in one place.
          </p>
        </Card>
      </div>
    </div>
  );
}
