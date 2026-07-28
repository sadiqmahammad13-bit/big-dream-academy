import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";

// Display face: Sora (geometric, confident — used for headings & numbers)
// Body face: Inter (neutral, highly legible at small mobile sizes)
const sora = Sora({ subsets: ["latin"], variable: "--font-sora", weight: ["400", "600", "700", "800"] });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", weight: ["400", "500", "600"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://bigdreamacademy.com"),
  title: {
    default: "Big Dream Academy — Learn Digital Skills, Earn Online",
    template: "%s | Big Dream Academy",
  },
  description:
    "Big Dream Academy teaches practical digital skills — AI, affiliate marketing, e-commerce, ads, and design — so you can build a real income online, ethically.",
  keywords: [
    "learn digital skills",
    "earn money online",
    "AI courses",
    "affiliate marketing course",
    "Shopify dropshipping course",
    "Meta ads course",
    "Canva design course",
  ],
  openGraph: {
    title: "Big Dream Academy — Learn Digital Skills, Earn Online",
    description:
      "Practical, ethical digital skills training: AI, marketing, e-commerce, ads, and design.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable}`}>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
