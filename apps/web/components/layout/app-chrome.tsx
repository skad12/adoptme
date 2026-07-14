"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  if (isDashboard) {
    return <div className="min-h-screen font-[family-name:var(--font-jakarta)]">{children}</div>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="motion-page flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
