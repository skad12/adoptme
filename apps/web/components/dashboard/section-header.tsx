import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function SectionHeader({
  title,
  subtitle,
  actionHref,
  actionLabel,
  className,
}: {
  title: string;
  subtitle?: string;
  actionHref?: string;
  actionLabel?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between", className)}>
      <div className="max-w-xl">
        <h2 className="text-xl font-bold tracking-tight sm:text-[1.35rem]">{title}</h2>
        {subtitle ? <p className="mt-1.5 text-sm leading-relaxed text-[var(--dash-muted)]">{subtitle}</p> : null}
      </div>
      {actionHref && actionLabel ? (
        <Link href={actionHref} className="dash-btn-ghost shrink-0">
          {actionLabel}
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      ) : null}
    </div>
  );
}
