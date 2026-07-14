import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Login",
  description: "Access your AdoptMe buyer, vendor, veterinarian, or admin workspace.",
};

export default function LoginPage() {
  return <LoginForm />;
}
