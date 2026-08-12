"use client";

import { useEffect, useState } from "react";
import { Star, FileText, Lock, ShoppingCart, Download, BookOpen } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardShell from "@/components/DashboardShell";
import { useAuth } from "@/lib/auth-context";
import { getUserProfile, grantEbookAccess, recordPurchase, UserProfile } from "@/lib/firestore-helpers";
import { ebooks, Ebook } from "@/data/ebooks";

declare global {
  interface Window {
    PaystackPop: {
      setup: (options: {
        key: string;
        email: string;
        amount: number;
        currency: string;
        ref: string;
        callback: (response: { reference: string }) => void;
        onClose: () => void;
      }) => { openIframe: () => void };
    };
  }
}

 const PAYSTACK_PUBLIC_KEY = "pk_live_0528952d591b9b9a60aec57ce9baab779ee53402";

export default function EbooksPage() {
  return (
    <ProtectedRoute>
      <DashboardShell>
        <EbooksContent />
      </DashboardShell>
    </ProtectedRoute>
  );
}

function EbooksContent() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [buyingId, setBuyingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) getUserProfile(user.uid).then(setProfile);
  }, [user]);

  function handlePaymentSuccess(ebook: Ebook) {
    if (!user) return;
    Promise.all([
      grantEbookAccess(user.uid, ebook.id),
      recordPurchase(user.uid, {
        type: "ebook",
        itemId: ebook.id,
        itemLabel: ebook.title,
        amount: ebook.amount,
        purchasedAt: new Date().toISOString(),
      }),
    ])
      .then(() => getUserProfile(user.uid))
      .then((updated) => setProfile(updated))
      .catch((err) => console.error("Failed to record eBook purchase:", err))
      .finally(() => setBuyingId(null));
  }

  function openCheckout(ebook: Ebook) {
    if (!user?.email) return;

    const handler = window.PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: user.email,
      amount: ebook.amount,
      currency: "NGN",
      ref: `bda-ebook-${ebook.id}-${Date.now()}`,
      callback: function () {
        handlePaymentSuccess(ebook);
      },
      onClose: function () {
        setBuyingId(null);
      },
    });

    handler.openIframe();
  }

  function handleBuy(ebook: Ebook) {
    if (!user?.email || ebook.status !== "available") return;
    setError(null);
    setBuyingId(ebook.id);

    let attempts = 0;
    const maxAttempts = 20;
    const tryOpen = () => {
      attempts += 1;
      if (typeof window.PaystackPop !== "undefined") {
        try {
          openCheckout(ebook);
        } catch (err) {
          console.error("Paystack checkout failed to open:", err);
          setError("Couldn't open the payment window. Please try again.");
          setBuyingId(null);
        }
        return;
      }
      if (attempts >= maxAttempts) {
        setError("Payment is taking longer than expected to load. Please refresh the page and try again.");
        setBuyingId(null);
        return;
      }
      setTimeout(tryOpen, 200);
    };
    tryOpen();
  }

  return (
    <div className="animate-rise">
      <h1 className="font-display text-2xl font-bold text-bone">eBooks</h1>
      <p className="mt-1 text-smoke">Downloadable guides to go deeper on each skill.</p>

      {error && (
        <p className="mt-4 rounded-xl border border-red-900 bg-red-950/30 px-4 py-2 text-sm text-red-400">
          {error}
        </p>
      )}

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ebooks.map((ebook) => {
          const owned = profile?.ownedEbooks?.includes(ebook.id);
          const isBuying = buyingId === ebook.id;
          const comingSoon = ebook.status === "coming-soon";

          return (
            <div key={ebook.id} className="card p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink-850 text-gold-500">
                <FileText className="h-5 w-5" />
              </div>
              <h3 className="mt-3 font-display text-base font-semibold text-bone">{ebook.title}</h3>

              {ebook.rating > 0 && (
                <div className="mt-1 flex items-center gap-1 text-xs text-smoke">
                  <Star className="h-3.5 w-3.5 fill-gold-500 text-gold-500" /> {ebook.rating.toFixed(1)}
                  <span className="ml-2">{ebook.pages} pages</span>
                </div>
              )}

              <p className="mt-3 font-display text-xl font-bold text-bone">{ebook.price}</p>

              {comingSoon ? (
                <div className="mt-4 flex items-center gap-2 rounded-full border border-ink-700 py-2 text-center text-sm text-smoke">
                  <Lock className="mx-auto h-4 w-4" /> <span className="mx-auto">Coming soon</span>
                </div>
              ) : owned ? (
                <div className="mt-4 flex flex-col gap-2">
                  <button className="btn-outline flex items-center justify-center gap-2 text-sm">
                    <BookOpen className="h-4 w-4" /> Read Book
                  </button>
                  <button className="flex items-center justify-center gap-2 rounded-full border border-ink-700 py-2 text-sm text-smoke transition-colors hover:border-grow-500 hover:text-grow-400">
                    <Download className="h-4 w-4" /> Download PDF
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleBuy(ebook)}
                  disabled={isBuying}
                  className="btn-gold mt-4 flex w-full items-center justify-center gap-2 text-sm disabled:opacity-60"
                >
                  <ShoppingCart className="h-4 w-4" /> {isBuying ? "Loading…" : "Buy Now"}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
