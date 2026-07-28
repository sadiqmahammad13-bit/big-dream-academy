"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";

const links = [
  { href: "/courses", label: "Courses" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-800 bg-ink-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold">
          <Sparkles className="h-5 w-5 text-gold-500" />
          Big Dream <span className="text-grow-400">Academy</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-smoke transition-colors hover:text-bone">
              {l.label}
            </Link>
          ))}
          <Link href="/login" className="text-sm text-smoke transition-colors hover:text-bone">
            Log in
          </Link>
          <Link href="/register" className="btn-gold !py-2 !px-5 text-sm">
            Get Started
          </Link>
        </nav>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          className="text-bone md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-ink-800 px-5 py-4 md:hidden animate-rise">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="rounded-lg px-3 py-2 text-smoke hover:bg-ink-900 hover:text-bone" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link href="/login" className="rounded-lg px-3 py-2 text-smoke hover:bg-ink-900 hover:text-bone" onClick={() => setOpen(false)}>
            Log in
          </Link>
          <Link href="/register" className="btn-gold mt-2 text-sm" onClick={() => setOpen(false)}>
            Get Started
          </Link>
        </nav>
      )}
    </header>
  );
}
