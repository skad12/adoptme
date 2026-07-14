import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[color-mix(in_srgb,var(--ui-primary)_25%,transparent)] bg-[var(--ui-primary-soft)] px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-[var(--ui-primary)] backdrop-blur-sm",
        className,
      )}
      {...props}
    />
  );
}
