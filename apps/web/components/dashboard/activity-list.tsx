import { SoftCard } from "@/components/dashboard/soft-card";
import { SafeImage } from "@/components/ui/safe-image";
import { cn } from "@/lib/utils";

export type ActivityItem = {
  id: string;
  title: string;
  meta: string;
  status?: string;
  tone?: "mint" | "coral" | "neutral";
};

export function ActivityList({ items }: { items: ActivityItem[] }) {
  return (
    <SoftCard interactive={false} className="divide-y divide-[var(--dash-border)] !p-0 overflow-hidden">
      {items.length === 0 ? (
        <p className="p-6 text-sm leading-relaxed text-[var(--dash-muted)]">Nothing here yet.</p>
      ) : (
        items.map((item) => (
          <div key={item.id} className="dash-activity-row flex items-center justify-between gap-4 px-5 py-4">
            <div className="min-w-0">
              <p className="truncate text-[15px] font-semibold tracking-tight">{item.title}</p>
              <p className="mt-1 truncate text-[13px] leading-snug text-[var(--dash-muted)]">{item.meta}</p>
            </div>
            {item.status ? (
              <span
                className={cn(
                  "dash-pill shrink-0",
                  item.tone === "coral"
                    ? "bg-[var(--dash-coral-soft)] text-[var(--dash-coral)]"
                    : item.tone === "neutral"
                      ? "bg-[var(--dash-border)] text-[var(--dash-muted)]"
                      : "bg-[var(--dash-mint-soft)] text-[var(--dash-mint)]",
                )}
              >
                {item.status}
              </span>
            ) : null}
          </div>
        ))
      )}
    </SoftCard>
  );
}

export function PetAvatar({
  name,
  imageUrl,
  size = "md",
}: {
  name: string;
  imageUrl?: string | null;
  size?: "sm" | "md" | "lg";
}) {
  const dim = size === "sm" ? "h-10 w-10" : size === "lg" ? "h-16 w-16" : "h-12 w-12";
  const sizes = size === "lg" ? "64px" : size === "sm" ? "40px" : "48px";
  return (
    <span
      className={cn(
        "relative inline-block shrink-0 overflow-hidden rounded-full ring-2 ring-[var(--dash-mint)]/35 shadow-md shadow-[color-mix(in_srgb,var(--dash-mint)_20%,transparent)] transition duration-300 group-hover:scale-105",
        dim,
      )}
    >
      {imageUrl ? (
        <SafeImage src={imageUrl} alt={name} fill sizes={sizes} className="transition duration-500 group-hover:scale-110" />
      ) : (
        <span className="flex h-full w-full items-center justify-center bg-[var(--dash-mint-soft)] text-sm font-bold text-[var(--dash-mint)]">
          {name.slice(0, 1).toUpperCase()}
        </span>
      )}
    </span>
  );
}

export function SimpleChart({
  label,
  values,
  max,
}: {
  label: string;
  values: number[];
  max?: number;
}) {
  const peak = max ?? Math.max(...values, 1);
  return (
    <SoftCard>
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--dash-muted)]">{label}</p>
      <div className="mt-5 flex h-32 items-end gap-2.5">
        {values.map((value, index) => (
          <div key={`${label}-${index}`} className="flex flex-1 flex-col items-center justify-end">
            <div
              className="dash-chart-bar w-full min-h-2"
              style={{ height: `${Math.max(10, (value / peak) * 100)}%` }}
              title={String(value)}
            />
          </div>
        ))}
      </div>
    </SoftCard>
  );
}

export function PreviewBadge({ children = "Preview" }: { children?: string }) {
  return <span className="dash-pill bg-[var(--dash-coral-soft)] text-[var(--dash-coral)]">{children}</span>;
}
