import "./globals.css";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Padhaai — Educate all",
  description: "Padhaai Trust is a Registered Public Charitable Trust providing educational assistance to children who desire to study but lack the economic resources."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1 w-full">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
