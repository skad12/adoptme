import { cn } from "@/lib/utils";

const variants = {
  primary: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm shadow-emerald-600/20",
  outline: "border border-zinc-300 bg-transparent hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900",
  ghost: "bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-900",
};

const sizes = {
  sm: "h-9 rounded-lg px-3 text-sm",
  md: "h-10 rounded-lg px-4 text-sm",
  icon: "h-9 w-9 rounded-lg",
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

export function Button({ className, variant = "primary", size = "md", ...props }: ButtonProps) {
  return <button className={cn("inline-flex items-center justify-center font-medium transition", variants[variant], sizes[size], className)} {...props} />;
}
