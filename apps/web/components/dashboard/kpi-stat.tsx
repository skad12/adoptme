import type { LucideIcon } from "lucide-react";
import { SoftCard } from "@/components/dashboard/soft-card";
import { cn } from "@/lib/utils";

export function KpiStat({
  label,
  value,
  delta,
  icon: Icon,
  tone = "mint",
  sparkline,
}: {
  label: string;
  value: string;
  delta?: string;
  icon: LucideIcon;
  tone?: "mint" | "coral" | "amber";
  sparkline?: number[];
}) {
  const peak = sparkline?.length ? Math.max(...sparkline, 1) : 1;

  return (
    <SoftCard className="space-y-5">
      <div className="flex items-start justify-between gap-3">
        <span
          className={cn(
            "dash-icon-tile",
            tone === "mint" && "bg-[var(--dash-mint-soft)] text-[var(--dash-mint)] shadow-inner",
            tone === "coral" && "bg-[var(--dash-coral-soft)] text-[var(--dash-coral)] shadow-inner",
            tone === "amber" && "bg-[color-mix(in_srgb,var(--dash-amber)_18%,transparent)] text-[var(--dash-amber)] shadow-inner",
          )}
        >
          <Icon className="h-5 w-5" aria-hidden />
        </span>
        {delta ? (
          <span
            className={cn(
              "dash-pill",
              tone === "mint" && "bg-[var(--dash-mint-soft)] text-[var(--dash-mint)]",
              tone === "coral" && "bg-[var(--dash-coral-soft)] text-[var(--dash-coral)]",
              tone === "amber" && "bg-[color-mix(in_srgb,var(--dash-amber)_18%,transparent)] text-[var(--dash-amber)]",
            )}
          >
            {delta}
          </span>
        ) : null}
      </div>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--dash-muted)]">{label}</p>
        <p className="dash-kpi-value mt-1.5">{value}</p>
      </div>
      {sparkline && sparkline.length > 0 ? (
        <div className="flex h-8 items-end gap-1" aria-hidden>
          {sparkline.map((v, i) => (
            <span
              key={`${label}-spark-${i}`}
              className={cn(
                "flex-1 rounded-sm",
                tone === "coral" ? "bg-[var(--dash-coral)]/70" : tone === "amber" ? "bg-[var(--dash-amber)]/70" : "bg-[var(--dash-mint)]/70",
              )}
              style={{ height: `${Math.max(18, (v / peak) * 100)}%` }}
            />
          ))}
        </div>
      ) : null}
    </SoftCard>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <SoftCard interactive={false} className="flex flex-col items-start gap-3 border-dashed p-8">
      <p className="text-lg font-semibold tracking-tight">{title}</p>
      <p className="max-w-md text-sm leading-relaxed text-[var(--dash-muted)]">{description}</p>
      {action}
    </SoftCard>
  );
}
