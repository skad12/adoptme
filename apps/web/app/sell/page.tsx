import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { SellForm } from "./sell-form";

export const metadata: Metadata = {
  title: "Sell or Exchange a Pet",
  description: "Create a responsible AdoptMe listing with health, temperament, microchip, vaccination, and transfer details.",
};

const guidance = [
  "Use recent, clear photos that show the animal's full body, face, markings, and living setup.",
  "Disclose health issues, medication, behavior concerns, and compatibility honestly.",
  "Include vaccination, microchip, vet check, spay/neuter, and transfer documents where applicable.",
  "Meet safely, verify buyer readiness, and follow local welfare and licensing laws.",
];

export default function SellPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6">
      <section className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,0.45fr)] lg:items-start">
        <div className="space-y-4">
          <p className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-200">
            Seller intake
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">List a pet for sale or exchange</h1>
          <p className="max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            This form is designed around responsible marketplace standards: identity, health records, vaccination status, microchip information,
            temperament, compatibility, photos, contact details, and owner attestation.
          </p>
        </div>
        <Card className="space-y-3 bg-zinc-50/80 dark:bg-zinc-950">
          <h2 className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">Before you publish</h2>
          <ul className="space-y-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {guidance.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <SellForm />
    </div>
  );
}
