import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-xl border border-[var(--ui-border-strong)] bg-[var(--ui-surface-solid)] px-3.5 text-[15px] text-[var(--ui-ink)] shadow-sm outline-none transition",
        "placeholder:text-[color-mix(in_srgb,var(--ui-muted)_80%,transparent)]",
        "hover:border-[color-mix(in_srgb,var(--ui-primary)_25%,var(--ui-border-strong))]",
        "focus:border-[var(--ui-primary)] focus:ring-4 focus:ring-[color-mix(in_srgb,var(--ui-primary)_18%,transparent)]",
        "disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
      {...props}
    />
  );
}
