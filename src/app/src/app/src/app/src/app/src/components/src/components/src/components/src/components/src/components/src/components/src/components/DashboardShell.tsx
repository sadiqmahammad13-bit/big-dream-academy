"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Download,
  User,
  CreditCard,
  Shield,
  LogOut,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/courses", label: "Courses", icon: BookOpen },
  { href: "/downloads", label: "Downloads", icon: Download },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/payment", label: "Billing", icon: CreditCard },
];

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  async function handleLogout() {
    await logout();
    router.push("/");
  }

  return (
    <div className="flex min-h-screen bg-ink-950">
      {/* Sidebar — desktop */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-ink-800 p-6 md:flex">
        <Link href="/dashboard" className="mb-8 flex items-center gap-2 font-display text-lg font-bold">
          <Sparkles className="h-5 w-5 text-gold-500" />
          Big Dream
        </Link>
        <nav className="flex flex-1 flex-col gap-1">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                pathname === href
                  ? "bg-ink-900 text-grow-400"
                  : "text-smoke hover:bg-ink-900 hover:text-bone"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-ink-800 pt-4">
          <p className="truncate text-xs text-smoke">{user?.email}</p>
          <button
            onClick={handleLogout}
            className="mt-3 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-smoke transition-colors hover:bg-ink-900 hover:text-bone"
          >
            <LogOut className="h-4 w-4" /> Log out
          </button>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 pb-20 md:pb-0">
        <div className="mx-auto max-w-6xl px-5 py-8">{children}</div>
      </div>

      {/* Bottom nav — mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-ink-800 bg-ink-950/95 py-2 backdrop-blur-md md:hidden">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center gap-1 px-2 py-1 text-[10px] ${
              pathname === href ? "text-grow-400" : "text-smoke"
            }`}
          >
            <Icon className="h-5 w-5" />
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
