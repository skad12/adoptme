import { cn } from "@/lib/utils";

export function SoftCard({
  className,
  interactive = true,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { interactive?: boolean }) {
  return (
    <div
      className={cn("dash-soft-card p-5", !interactive && "dash-soft-card-static", className)}
      {...props}
    />
  );
}
