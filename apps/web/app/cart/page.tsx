import type { Metadata } from "next";
import { CartPageClient } from "./cart-page-client";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review shop items in your AdoptMe cart.",
};

export default function CartPage() {
  return <CartPageClient />;
}
