import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-ink-800 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 text-sm text-smoke md:flex-row">
        <p>&copy; {new Date().getFullYear()} Big Dream Academy. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/contact" className="hover:text-bone">Contact</Link>
          <Link href="/courses" className="hover:text-bone">Courses</Link>
          <Link href="/login" className="hover:text-bone">Log in</Link>
        </div>
      </div>
    </footer>
  );
}
