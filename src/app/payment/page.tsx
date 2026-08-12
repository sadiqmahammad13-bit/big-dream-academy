"use client";

import { useState } from "react";
import { Check, ShieldCheck } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardShell from "@/components/DashboardShell";
import { useAuth } from "@/lib/auth-context";
import { recordPurchase } from "@/lib/firestore-helpers";

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

const  PAYSTACK_PUBLIC_KEY = "pk_live_0528952d591b9b9a60aec57ce9baab779ee53402";

const plans = [
  { id: "starter", name: "Starter", price: "₦1,000", amount: 100000, perks: ["1 course", "1 eBook", "Certificate"] },
  { id: "standard", name: "Standard", price: "₦2,000", amount: 200000, perks: ["3 courses", "eBooks included", "Certificate", "Downloads"], featured: true },
  { id: "premium", name: "Premium", price: "₦5,000", amount: 500000, perks: ["All courses", "All eBooks", "Lifetime updates", "Premium support"] },
];

export default function PaymentPage() {
  return (
    <ProtectedRoute>
      <DashboardShell>
        <PaymentContent />
      </DashboardShell>
    </ProtectedRoute>
  );
}

function PaymentContent() {
  const { user } = useAuth();
  const [selected, setSelected] = useState("standard");
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activePlan = plans.find((p) => p.id === selected)!;

  function handlePaymentSuccess() {
    if (!user) return;
    recordPurchase(user.uid, {
      type: "plan",
      itemId: activePlan.id,
      itemLabel: `${activePlan.name} plan`,
      amount: activePlan.amount,
      purchasedAt: new Date().toISOString(),
    })
      .catch((err) => console.error("Failed to record purchase:", err))
      .finally(() => {
        setProcessing(false);
        setDone(true);
      });
  }

  function openCheckout() {
    if (!user?.email) return;

    const handler = window.PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: user.email,
      amount: activePlan.amount,
      currency: "NGN",
      ref: `bda-${activePlan.id}-${Date.now()}`,
      callback: function () {
        handlePaymentSuccess();
      },
      onClose: function () {
        setProcessing(false);
      },
    });

    handler.openIframe();
  }

  function handleCheckout() {
    if (!user?.email) return;
    setError(null);
    setProcessing(true);

    let attempts = 0;
    const maxAttempts = 20;
    const tryOpen = () => {
      attempts += 1;
      if (typeof window.PaystackPop !== "undefined") {
        try {
          openCheckout();
        } catch (err) {
          console.error("Paystack checkout failed to open:", err);
          setError("Couldn't open the payment window. Please try again.");
          setProcessing(false);
        }
        return;
      }
      if (attempts >= maxAttempts) {
        setError("Payment is taking longer than expected to load. Please refresh and try again.");
        setProcessing(false);
        return;
      }
      setTimeout(tryOpen, 200);
    };
    tryOpen();
  }

  return (
    <div className="animate-rise">
      <h1 className="font-display text-2xl font-bold text-bone">Billing</h1>
      <p className="mt-1 text-smoke">Choose a plan to unlock courses and certificates.</p>

      {error && (
        <p className="mt-4 rounded-xl border border-red-900 bg-red-950/30 px-4 py-2 text-sm text-red-400">
          {error}
        </p>
      )}

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {plans.map((plan) => (
          <button
            key={plan.id}
            onClick={() => setSelected(plan.id)}
            className={`card relative p-6 text-left transition-all ${
              selected === plan.id ? "border-grow-500 shadow-grow" : "hover:border-ink-700"
            }`}
          >
            {plan.featured && (
              <span className="absolute -top-3 right-6 rounded-full bg-gold-green px-3 py-0.5 text-[11px] font-semibold text-ink-950">
                Mafi shahara
              </span>
            )}
            <p className="font-display text-base font-semibold text-bone">{plan.name}</p>
            <p className="mt-2">
              <span className="font-display text-3xl font-bold text-bone">{plan.price}</span>
            </p>
            <ul className="mt-4 flex flex-col gap-2">
              {plan.perks.map((perk) => (
                <li key={perk} className="flex items-center gap-2 text-sm text-smoke">
                  <Check className="h-4 w-4 text-grow-400" /> {perk}
                </li>
              ))}
            </ul>
          </button>
        ))}
      </div>

      <div className="card mt-8 max-w-md p-6">
        <h2 className="font-display text-sm font-semibold text-bone">Payment details</h2>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-smoke">
          <ShieldCheck className="h-3.5 w-3.5 text-grow-400" /> Payments are securely processed via Paystack — card details never touch our servers.
        </p>

        {done ? (
          <div className="mt-5 rounded-xl border border-grow-700 bg-grow-700/10 p-4">
            <p className="text-sm font-medium text-grow-400">✓ An karɓi biyan ku!</p>
            <p className="mt-2 text-sm text-smoke">
              Tuntuɓe mu domin samun access:
            </p>
            <p className="mt-1 text-sm text-bone">WhatsApp: 08087516590</p>
            <p className="text-sm text-bone">Email: sadiqmahammad13@gmail.com</p>
          </div>
        ) : (
          <button onClick={handleCheckout} disabled={processing} className="btn-gold mt-5 w-full disabled:opacity-60">
            {processing ? "Loading…" : `Pay ${activePlan.price}`}
          </button>
        )}
      </div>
    </div>
  );
}
