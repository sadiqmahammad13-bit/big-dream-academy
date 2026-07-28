import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-ink-950 px-5 text-center">
      <p className="font-display text-6xl font-extrabold text-gold-500">404</p>
      <h1 className="font-display text-xl font-semibold text-bone">This page hasn&apos;t been built yet</h1>
      <p className="text-smoke">Let&apos;s get you back to something that has.</p>
      <Link href="/" className="btn-gold mt-2">Back to home</Link>
    </main>
  );
}
