"use client";

import { useEffect, useState } from "react";
import { Users, BookOpen, DollarSign, ShieldAlert, Award } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardShell from "@/components/DashboardShell";
import { useAuth } from "@/lib/auth-context";
import { getUserProfile, getAllUserProfiles, UserProfile, Purchase } from "@/lib/firestore-helpers";
import { courses } from "@/data/courses";

// Admin access is gated two ways:
// 1) Client-side: this page checks profile.role === "admin" before rendering
//    anything sensitive (below).
// 2) Server-side (the part that actually matters): Firestore Security Rules
//    must also check request.auth.token.role == "admin" before allowing
//    reads of every user's document (getAllUserProfiles below reads the
//    whole users collection). The client check alone is not security.
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

interface PurchaseRow extends Purchase {
  studentName: string;
  studentEmail: string;
}

function AdminContent() {
  const [users, setUsers] = useState<(UserProfile & { uid: string })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllUserProfiles()
      .then(setUsers)
      .finally(() => setLoading(false));
  }, []);

  const totalStudents = users.filter((u) => u.role === "student").length;
  const totalCertificates = users.reduce(
    (sum, u) => sum + (u.completedCourses?.length ?? 0),
    0
  );

  const allPurchases: PurchaseRow[] = users
    .flatMap((u) =>
      (u.purchases ?? []).map((p) => ({
        ...p,
        studentName: u.name || "Unknown",
        studentEmail: u.email,
      }))
    )
    .sort((a, b) => new Date(b.purchasedAt).getTime() - new Date(a.purchasedAt).getTime());

  const totalRevenue = allPurchases.reduce((sum, p) => sum + p.amount, 0) / 100; // kobo -> naira

  const stats = [
    { label: "Students", value: totalStudents.toString(), icon: Users },
    { label: "Active courses", value: courses.length.toString(), icon: BookOpen },
    { label: "Revenue", value: `₦${totalRevenue.toLocaleString()}`, icon: DollarSign },
    { label: "Certificates issued", value: totalCertificates.toString(), icon: Award },
  ];

  return (
    <div className="animate-rise">
      <h1 className="font-display text-2xl font-bold text-bone">Admin Dashboard</h1>
      <p className="mt-1 text-smoke">Platform overview and course management.</p>

      {loading ? (
        <div className="mt-10 h-10 w-10 animate-spin rounded-full border-2 border-ink-700 border-t-grow-500" />
      ) : (
        <>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
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

          {/* Purchase log */}
          <div className="mt-10">
            <h2 className="font-display text-lg font-semibold text-bone">Recent purchases</h2>
            {allPurchases.length === 0 ? (
              <p className="mt-3 text-sm text-smoke">No purchases yet.</p>
            ) : (
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[600px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-ink-800 text-smoke">
                      <th className="py-2 font-medium">Student</th>
                      <th className="py-2 font-medium">Item</th>
                      <th className="py-2 font-medium">Type</th>
                      <th className="py-2 font-medium">Amount</th>
                      <th className="py-2 font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allPurchases.map((p, i) => (
                      <tr key={i} className="border-b border-ink-900 text-bone">
                        <td className="py-3">
                          <p className="text-sm">{p.studentName}</p>
                          <p className="text-xs text-smoke">{p.studentEmail}</p>
                        </td>
                        <td className="py-3 text-smoke">{p.itemLabel}</td>
                        <td className="py-3 text-smoke capitalize">{p.type}</td>
                        <td className="py-3 text-grow-400">₦{(p.amount / 100).toLocaleString()}</td>
                        <td className="py-3 text-smoke">
                          {new Date(p.purchasedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Courses table */}
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
        </>
      )}
    </div>
  );
}
