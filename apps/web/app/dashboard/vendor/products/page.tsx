import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { SectionHeader } from "@/components/dashboard/section-header";
import { SoftCard } from "@/components/dashboard/soft-card";
import { fetchVendorDashboard, formatNaira } from "@/lib/dashboard";

export const metadata = { title: "Vendor products" };

export default async function VendorProductsPage() {
  const data = await fetchVendorDashboard();

  return (
    <DashboardShell role="vendor" title="Products" subtitle="Catalog synced from your shop listings and inventory rules.">
      <SectionHeader title="Catalog" subtitle="Low-stock items surface first so you can restock before sellouts." actionHref="/sell" actionLabel="Add listing" />
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {data.products.map((p) => (
          <SoftCard key={p.id} className="space-y-3">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-extrabold">{p.name}</h3>
              <span className="dash-pill bg-[var(--dash-mint-soft)] text-[var(--dash-mint)]">{p.status.replaceAll("_", " ")}</span>
            </div>
            <p className="text-2xl font-extrabold tracking-tight">{formatNaira(p.priceMinor)}</p>
            <p className="text-sm text-[var(--dash-muted)]">{p.stock} units available</p>
          </SoftCard>
        ))}
      </div>
    </DashboardShell>
  );
}
