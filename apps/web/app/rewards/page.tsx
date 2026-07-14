import Link from "next/link";
import { formatMoney, REWARDS } from "@/lib/money";
import { Card } from "@/components/ui/card";

export default function RewardsPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-12 px-4 py-12 sm:px-6">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">PawRewards</h1>
        <p className="mx-auto max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
          Earn points with every purchase, plus personalized offers, free shipping, and member-only pricing.
        </p>
        <div className="flex justify-center gap-3">
          <Link href="/login" className="inline-flex h-11 items-center rounded-full bg-emerald-600 px-6 text-sm font-semibold text-white hover:bg-emerald-700">
            Sign in
          </Link>
          <Link href="/login" className="inline-flex h-11 items-center rounded-full border border-zinc-300 px-6 text-sm font-semibold dark:border-zinc-700">
            Create account
          </Link>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        {[
          { step: "1", title: "Activate offers", body: "Get the most from PawRewards by activating personalized offers in your account." },
          { step: "2", title: "Shop & earn", body: `Earn ${REWARDS.pointsPerNaira} points per ₦1 on merch & services — plus tier bonuses.` },
          { step: "3", title: "Redeem savings", body: `Every ${REWARDS.redeemPoints.toLocaleString()} points = ${formatMoney(REWARDS.redeemValueMinor)} in savings.` },
        ].map((item) => (
          <Card key={item.step} className="space-y-2 p-5 text-center">
            <span className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-sm font-semibold text-white">{item.step}</span>
            <h2 className="font-semibold text-zinc-900 dark:text-zinc-50">{item.title}</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.body}</p>
          </Card>
        ))}
      </div>

      <Card className="overflow-x-auto p-0">
        <table className="w-full min-w-[540px] text-left text-sm">
          <thead className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
            <tr>
              <th className="p-4 font-semibold">Annual spend</th>
              {REWARDS.tiers.map((t) => (
                <th key={t.id} className="p-4 font-semibold">
                  {t.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-zinc-100 dark:border-zinc-800">
              <td className="p-4 text-zinc-600">Spend range</td>
              {REWARDS.tiers.map((t) => (
                <td key={t.id} className="p-4">
                  {t.maxSpendMinor
                    ? `${formatMoney(t.minSpendMinor)} – ${formatMoney(t.maxSpendMinor)}`
                    : `${formatMoney(t.minSpendMinor)}+`}
                </td>
              ))}
            </tr>
            <tr className="border-b border-zinc-100 dark:border-zinc-800">
              <td className="p-4 text-zinc-600">Tier bonus (pts/₦1)</td>
              {REWARDS.tiers.map((t) => (
                <td key={t.id} className="p-4">
                  +{t.bonusPerNaira}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 text-zinc-600">Free ship to home</td>
              {REWARDS.tiers.map((t) => (
                <td key={t.id} className="p-4">
                  Orders {formatMoney(REWARDS.freeShippingThresholdMinor)}+
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </Card>

      <p className="text-center text-xs text-zinc-500">
        Gift cards, shipping, and veterinary services may be excluded from earning points. See help center for full terms.
      </p>
    </div>
  );
}
