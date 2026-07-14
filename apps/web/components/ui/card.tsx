import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "motion-card ui-glass relative overflow-hidden p-6 text-[var(--ui-ink)]",
        className,
      )}
      {...props}
    />
  );
}
