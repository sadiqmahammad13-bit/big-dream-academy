import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import Script from "next/script";
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

        {/* Paystack Inline checkout script — used by the Billing/eBooks pages */}
        <Script src="https://js.paystack.co/v1/inline.js" strategy="afterInteractive" />

        {/* Meta Pixel — tracks page views by default; specific events
            (CompleteRegistration, Purchase) are fired from the pages
            where those actions happen. See src/lib/meta-pixel.ts. */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1534996761080692');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1534996761080692&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </body>
    </html>
  );
}
