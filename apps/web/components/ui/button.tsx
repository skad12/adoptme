import { cn } from "@/lib/utils";

const variants = {
  primary:
    "ui-btn-primary border-0 font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ui-primary)]",
  secondary:
    "border-0 bg-gradient-to-br from-[var(--ui-accent)] to-[#fb923c] font-semibold text-white shadow-md shadow-orange-500/20 hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ui-accent)]",
  outline:
    "border border-[var(--ui-border-strong)] bg-[var(--ui-surface-solid)] text-[var(--ui-ink)] shadow-sm hover:border-[color-mix(in_srgb,var(--ui-primary)_35%,var(--ui-border))] hover:bg-[var(--ui-primary-soft)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ui-primary)]",
  ghost:
    "border border-transparent bg-transparent text-[var(--ui-ink)] hover:bg-[var(--ui-primary-soft)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ui-primary)]",
  danger:
    "border-0 bg-gradient-to-br from-[var(--ui-danger)] to-[#f87171] font-semibold text-white shadow-md shadow-red-500/20 hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ui-danger)]",
};

const sizes = {
  sm: "h-9 rounded-xl px-3.5 text-sm",
  md: "h-11 rounded-xl px-5 text-[15px]",
  lg: "h-12 rounded-2xl px-6 text-base",
  icon: "h-10 w-10 rounded-xl",
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

export function Button({ className, variant = "primary", size = "md", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 transition-[transform,box-shadow,filter,background-color,border-color] duration-200 ease-[var(--ui-ease)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
