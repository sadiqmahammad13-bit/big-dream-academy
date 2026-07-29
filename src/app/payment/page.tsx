"use client";

import { useState } from "react";
import { Check, ShieldCheck } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardShell from "@/components/DashboardShell";

const plans = [
  { id: "starter", name: "Starter", price: "₦2,000", period: "/month", perks: ["All 7 courses", "Certificates", "Downloads"] },
  { id: "annual", name: "Annual", price: "₦15,000", period: "/year", perks: ["Everything in Starter", "2 months free", "Priority support"], featured: true },
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
  const [selected, setSelected] = useState("starter");
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);

  // Placeholder checkout handler — swap for a real Paystack or Flutterwave
  // call. Both support NGN directly and are the standard choice for
  // Nigerian founders (unlike Stripe, which isn't available in Nigeria).
  // Paystack: https://paystack.com/docs/payments/accept-payments
  // Flutterwave: https://developer.flutterwave.com/docs
  // Never handle raw card numbers directly in this frontend — both
  // providers give you a hosted checkout/inline popup that does that part.
  async function handleCheckout() {
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 1200));
    setProcessing(false);
    setDone(true);
  }

  return (
    <div className="animate-rise">
      <h1 className="font-display text-2xl font-bold text-bone">Billing</h1>
      <p className="mt-1 text-smoke">Choose a plan to unlock every course and certificate.</p>

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
                Best value
              </span>
            )}
            <p className="font-display text-base font-semibold text-bone">{plan.name}</p>
            <p className="mt-2">
              <span className="font-display text-3xl font-bold text-bone">{plan.price}</span>
              <span className="text-sm text-smoke">{plan.period}</span>
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
          <ShieldCheck className="h-3.5 w-3.5 text-grow-400" /> Payments are securely processed via Paystack or Flutterwave — card details never touch our servers.
        </p>

        {/* Replace this button with Paystack's inline popup or a Flutterwave
            hosted checkout redirect. Both take the amount + plan and return
            a success callback you can use to update the user's subscription
            status in Firestore. */}
        <button onClick={handleCheckout} disabled={processing} className="btn-gold mt-5 w-full disabled:opacity-60">
          {done
            ? "Payment confirmed ✓"
            : processing
            ? "Processing…"
            : `Pay ${plans.find((p) => p.id === selected)?.price}${plans.find((p) => p.id === selected)?.period}`}
        </button>
      </div>
    </div>
  );
}
