import { cn } from "@/lib/utils";

const variants = {
  primary:
    "ui-btn-primary border-0 font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ui-primary)]",
  secondary:
    "border-0 bg-[var(--ui-accent)] font-semibold text-[var(--ui-ink)] shadow-sm hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ui-accent)]",
  outline:
    "border border-[var(--ui-border-strong)] bg-[var(--ui-surface-solid)] text-[var(--ui-ink)] shadow-sm hover:bg-[var(--ui-mist)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ui-primary)]",
  ghost:
    "border border-transparent bg-transparent text-[var(--ui-ink)] hover:bg-[var(--ui-mist)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ui-primary)]",
  danger:
    "border-0 bg-[var(--ui-danger)] font-semibold text-white shadow-md shadow-red-500/20 hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ui-danger)]",
};

const sizes = {
  sm: "h-9 rounded-full px-3.5 text-sm",
  md: "h-11 rounded-full px-5 text-[15px]",
  lg: "h-12 rounded-full px-6 text-base",
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
