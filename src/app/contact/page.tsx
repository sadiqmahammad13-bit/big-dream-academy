"use client";

import { useState, FormEvent } from "react";
import { Mail, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  // In production, POST this to a Firestore `messages` collection or an
  // email API route — kept local-only here since there's no backend wired up.
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto min-h-screen max-w-3xl px-5 py-14">
        <h1 className="font-display text-2xl font-bold text-bone md:text-3xl">Get in touch</h1>
        <p className="mt-2 text-smoke">Questions about a course, billing, or partnerships — we read everything.</p>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          <form onSubmit={handleSubmit} className="card flex flex-col gap-4 p-6">
            <input className="input-field" placeholder="Your name" required />
            <input type="email" className="input-field" placeholder="Your email" required />
            <textarea className="input-field min-h-[120px] resize-none" placeholder="Your message" required />
            <button type="submit" className="btn-gold">Send message</button>
            {sent && <p className="text-sm text-grow-400">Thanks — we&apos;ll reply within one business day.</p>}
          </form>

          <div className="flex flex-col gap-4">
            <div className="card flex items-center gap-3 p-5">
              <Mail className="h-5 w-5 text-gold-500" />
              <div>
                <p className="text-sm font-medium text-bone">Email</p>
                <p className="text-sm text-smoke">support@bigdreamacademy.com</p>
              </div>
            </div>
            <div className="card flex items-center gap-3 p-5">
              <MessageCircle className="h-5 w-5 text-grow-400" />
              <div>
                <p className="text-sm font-medium text-bone">Live chat</p>
                <p className="text-sm text-smoke">Available for enrolled students, in-app</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
