"use client";

import { useEffect, useState } from "react";
import { Users, BookOpen, DollarSign, ShieldAlert } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardShell from "@/components/DashboardShell";
import { useAuth } from "@/lib/auth-context";
import { getUserProfile, UserProfile } from "@/lib/firestore-helpers";
import { courses } from "@/data/courses";

// Admin access is gated two ways:
// 1) Client-side: this page checks profile.role === "admin" before rendering
//    anything sensitive (below).
// 2) Server-side (the part that actually matters): Firestore Security Rules
//    must also check request.auth.token.role == "admin" (set via a custom
//    claim, or a lookup against the users/{uid} doc) before allowing reads
//    or writes to admin-only collections. The client check alone is not
//    security — it only improves UX for non-admins who land here by mistake.
export default function AdminPage() {
  return (
    <ProtectedRoute>
      <DashboardShell>
        <AdminGate />
      </DashboardShell>
    </ProtectedRoute>
  );
}

function AdminGate() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (user) {
      getUserProfile(user.uid).then((p) => {
        setProfile(p);
        setChecked(true);
      });
    }
  }, [user]);

  if (!checked) {
    return <div className="h-10 w-10 animate-spin rounded-full border-2 border-ink-700 border-t-grow-500" />;
  }

  if (profile?.role !== "admin") {
    return (
      <div className="card flex flex-col items-center gap-3 p-10 text-center">
        <ShieldAlert className="h-8 w-8 text-smoke" />
        <p className="text-smoke">This area is restricted to administrators.</p>
      </div>
    );
  }

  return <AdminContent />;
}

// Static placeholders — wire these to real Firestore aggregate queries
// (or a Cloud Function that maintains a `stats` doc) once you have users.
const stats = [
  { label: "Students", value: "—", icon: Users },
  { label: "Active courses", value: courses.length.toString(), icon: BookOpen },
  { label: "Revenue (MTD)", value: "—", icon: DollarSign },
];

function AdminContent() {
  return (
    <div className="animate-rise">
      <h1 className="font-display text-2xl font-bold text-bone">Admin Dashboard</h1>
      <p className="mt-1 text-smoke">Platform overview and course management.</p>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="card flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ink-850 text-gold-500">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-smoke">{label}</p>
              <p className="font-display text-lg font-semibold text-bone">{value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="font-display text-lg font-semibold text-bone">Courses</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[500px] text-left text-sm">
            <thead>
              <tr className="border-b border-ink-800 text-smoke">
                <th className="py-2 font-medium">Title</th>
                <th className="py-2 font-medium">Category</th>
                <th className="py-2 font-medium">Level</th>
                <th className="py-2 font-medium">Lessons</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((c) => (
                <tr key={c.id} className="border-b border-ink-900 text-bone">
                  <td className="py-3">{c.title}</td>
                  <td className="py-3 text-smoke">{c.category}</td>
                  <td className="py-3 text-smoke">{c.level}</td>
                  <td className="py-3 text-smoke">{c.lessons.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
