// Small wrapper around Meta Pixel's fbq() so pages don't need to know
// about the global window.fbq directly. Safe to call even before the
// Pixel script has loaded — it just no-ops if fbq isn't ready yet.

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackRegistration() {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "CompleteRegistration");
  }
}

export function trackPurchase(amountKobo: number) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Purchase", {
      value: amountKobo / 100,
      currency: "NGN",
    });
  }
}
