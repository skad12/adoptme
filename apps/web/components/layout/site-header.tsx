import Link from "next/link";
import { LogIn, Menu, PawPrint } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const linkBtn =
  "inline-flex h-9 items-center justify-center rounded-lg px-3 text-sm font-medium transition border border-transparent";

const links = [
  { href: "/marketplace", label: "Marketplace" },
  { href: "/adoption", label: "Adoption" },
  { href: "/donations", label: "Donations" },
  { href: "/support", label: "Support" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm shadow-emerald-600/30">
            <PawPrint className="h-5 w-5" aria-hidden />
          </span>
          <span className="hidden sm:inline">AdoptMe</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-300 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="transition hover:text-emerald-700 dark:hover:text-emerald-400">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/login"
            className={cn(linkBtn, "hidden gap-2 text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900 sm:inline-flex")}
          >
            <LogIn className="h-4 w-4" />
            Login
          </Link>
          <Link
            href="/dashboard"
            className={cn(linkBtn, "hidden text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900 sm:inline-flex")}
          >
            Dashboard
          </Link>
          <Link
            href="/sell"
            className={cn(
              linkBtn,
              "hidden bg-emerald-600 px-4 text-white shadow-sm shadow-emerald-600/25 hover:bg-emerald-700 sm:inline-flex",
            )}
          >
            Sell
          </Link>
          <Button variant="outline" size="icon" className="md:hidden" aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
