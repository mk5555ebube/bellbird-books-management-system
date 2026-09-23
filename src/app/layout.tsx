import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { SiteHeader } from "@/components/layout/site-header";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Bellbird Books",
    template: "%s | Bellbird Books",
  },
  description:
    "Book catalogue, stock, customer and order management for Bellbird Books.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} antialiased`}>
        <a
          href="#main-content"
          className="sr-only z-50 rounded bg-stone-950 px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>

        <SiteHeader />

        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
