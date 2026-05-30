"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" aria-label="Toggle theme" className="border-zinc-200 dark:border-zinc-800">
        <Sun className="h-4 w-4" />
      </Button>
    );
  }

  const next = resolvedTheme === "dark" ? "light" : "dark";
  return (
    <Button
      variant="outline"
      size="icon"
      aria-label={`Switch to ${next} mode`}
      className="border-zinc-200 dark:border-zinc-800"
      onClick={() => setTheme(next)}
    >
      {resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      <span className="sr-only">Toggle color theme</span>
    </Button>
  );
}
