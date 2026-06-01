import Link from "next/link";
import { Card } from "@/components/ui/card";

export default async function EscrowCheckoutPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params;

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-12 sm:px-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Escrow checkout</h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Order reference <span className="font-mono text-xs text-zinc-800 dark:text-zinc-200">{orderId}</span>. Use escrow to protect both sides while health records, transport plans, and handover details are confirmed.
        </p>
      </div>
      <Card className="space-y-4">
        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Escrow timeline</h2>
        <ol className="list-decimal space-y-2 pl-5 text-sm text-zinc-600 dark:text-zinc-400">
          <li>Buyer funds escrow before final handover.</li>
          <li>Seller or breeder coordinates safe pickup, delivery, or transport.</li>
          <li>Delivery confirmation starts the release window.</li>
          <li>Funds release minus platform fee, unless a dispute is opened.</li>
        </ol>
      </Card>
      <Link href="/dashboard" className="text-sm font-semibold text-emerald-700 hover:underline dark:text-emerald-400">
        Go to dashboard
      </Link>
    </div>
  );
}
