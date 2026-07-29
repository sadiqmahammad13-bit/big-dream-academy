"use client";

import { useState } from "react";
import { Check, ShieldCheck } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardShell from "@/components/DashboardShell";
import { useAuth } from "@/lib/auth-context";

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

// Paystack test public key — replace with your live key (pk_live_...) once
// you're ready to accept real payments. Never put the Secret Key here.
const PAYSTACK_PUBLIC_KEY = "pk_test_46b692b386841ac8169bf05db7ffe38205423710";

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

  const activePlan = plans.find((p) => p.id === selected)!;

  function handleCheckout() {
    if (!user?.email) return;
    setProcessing(true);

    const handler = window.PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: user.email,
      amount: activePlan.amount, // amount is in kobo (₦1 = 100 kobo)
      currency: "NGN",
      ref: `bda-${activePlan.id}-${Date.now()}`,
      callback: () => {
        setProcessing(false);
        setDone(true);
      },
      onClose: () => {
        setProcessing(false);
      },
    });

    handler.openIframe();
  }

  return (
    <div className="animate-rise">
      <h1 className="font-display text-2xl font-bold text-bone">Billing</h1>
      <p className="mt-1 text-smoke">Choose a plan to unlock courses and certificates.</p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
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
            {processing ? "Processing…" : `Pay ${activePlan.price}`}
          </button>
        )}
      </div>
    </div>
  );
}
