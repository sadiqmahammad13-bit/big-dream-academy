"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

// Wrap any page that requires a signed-in user. Redirects to /login when
// there's no user once the initial auth check has finished loading.
// requireAdmin adds a second check against the Firestore profile role —
// pages that use it should pass the already-loaded profile role in.
export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink-950">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-ink-700 border-t-grow-500" />
      </div>
    );
  }

  return <>{children}</>;
}
