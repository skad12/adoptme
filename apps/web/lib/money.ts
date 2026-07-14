export const DEFAULT_CURRENCY = "NGN";

/** Minor units: kobo for NGN (same field name as legacy priceCents). */
export function formatMoney(minorUnits: number | null, currency = DEFAULT_CURRENCY): string {
  if (minorUnits == null) return "Contact for price";
  return new Intl.NumberFormat("en-NG", { style: "currency", currency }).format(minorUnits / 100);
}

export function nairaToMinor(naira: number): number {
  return Math.round(naira * 100);
}

export function minorToNaira(minorUnits: number): number {
  return minorUnits / 100;
}

export const REWARDS = {
  pointsPerNaira: 10,
  redeemPoints: 1000,
  redeemValueMinor: 310_000,
  freeShippingThresholdMinor: 7_600_000,
  tiers: [
    { id: "member", name: "Member", minSpendMinor: 0, maxSpendMinor: 77_345_000, bonusPerNaira: 0 },
    { id: "bestie", name: "Bestie", minSpendMinor: 77_500_000, maxSpendMinor: 154_845_000, bonusPerNaira: 2 },
    { id: "vipp", name: "VIPP", minSpendMinor: 155_000_000, maxSpendMinor: null, bonusPerNaira: 4 },
  ],
} as const;
