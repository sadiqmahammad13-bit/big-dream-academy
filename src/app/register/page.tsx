"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError("Use a password with at least 6 characters.");
      return;
    }

    setSubmitting(true);
    try {
      await register(name, email, password);
      router.push("/dashboard");
    } catch (err) {
      setError("Couldn't create that account. The email may already be in use.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink-950 px-5 py-10">
      <div className="w-full max-w-sm animate-rise">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2 font-display text-lg font-bold">
          <Sparkles className="h-5 w-5 text-gold-500" />
          Big Dream Academy
        </Link>

        <div className="card p-7">
          <h1 className="font-display text-xl font-bold text-bone">Create your account</h1>
          <p className="mt-1 text-sm text-smoke">Start your first course in under a minute.</p>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-smoke">Full name</label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-smoke">Email</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1.5 block text-xs font-medium text-smoke">Password</label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="At least 6 characters"
              />
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <button type="submit" disabled={submitting} className="btn-gold mt-2 disabled:opacity-60">
              {submitting ? "Creating account…" : "Create account"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-smoke">
          Already have an account?{" "}
          <Link href="/login" className="text-grow-400 hover:underline">Log in</Link>
        </p>
      </div>
    </main>
  );
}
