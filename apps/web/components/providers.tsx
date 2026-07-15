"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as NextThemeProvider, type ThemeProviderProps } from "next-themes";
import { type ComponentType, type PropsWithChildren, useState } from "react";
import { CartProvider } from "@/components/shop/cart-provider";

const ThemeProvider = NextThemeProvider as unknown as ComponentType<PropsWithChildren<ThemeProviderProps>>;

export function Providers({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <QueryClientProvider client={queryClient}>
        <CartProvider>{children}</CartProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
