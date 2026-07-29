"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Award, Heart, PartyPopper } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardShell from "@/components/DashboardShell";
import { useAuth } from "@/lib/auth-context";
import { getUserProfile, UserProfile } from "@/lib/firestore-helpers";
import { courses, getCourseById } from "@/data/courses";

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <DashboardShell>
        <ProfileContent />
      </DashboardShell>
    </ProtectedRoute>
  );
}

function ProfileContent() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const searchParams = useSearchParams();
  const justCertifiedId = searchParams.get("certified");
  const justCertifiedCourse = justCertifiedId ? getCourseById(justCertifiedId) : undefined;

  useEffect(() => {
    if (user) getUserProfile(user.uid).then(setProfile);
  }, [user]);

  const favoriteCourses = courses.filter((c) => profile?.favorites.includes(c.id));
  const completedCourses = courses.filter((c) => profile?.completedCourses.includes(c.id));

  return (
    <div className="animate-rise">
      {justCertifiedCourse && (
        <div className="card mb-6 flex items-center gap-3 border-gold-700 p-4 shadow-gold">
          <PartyPopper className="h-5 w-5 text-gold-500" />
          <p className="text-sm text-bone">
            Congratulations — you earned a certificate for <strong>{justCertifiedCourse.title}</strong>!
          </p>
        </div>
      )}

      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-green font-display text-xl font-bold text-ink-950">
          {(user?.displayName || user?.email || "?")[0].toUpperCase()}
        </div>
        <div>
          <h1 className="font-display text-xl font-bold text-bone">{user?.displayName || "Student"}</h1>
          <p className="text-sm text-smoke">{user?.email}</p>
        </div>
      </div>

      {/* Certificates */}
      <section className="mt-10">
        <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-bone">
          <Award className="h-5 w-5 text-gold-500" /> Certificates
        </h2>
        {completedCourses.length === 0 ? (
          <p className="mt-3 text-sm text-smoke">Complete a course to earn your first certificate.</p>
        ) : (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {completedCourses.map((c) => (
              <div key={c.id} className="card flex items-center justify-between p-4 shadow-gold">
                <div>
                  <p className="text-sm font-medium text-bone">{c.title}</p>
                  <p className="text-xs text-smoke">Certified</p>
                </div>
                <Award className="h-6 w-6 text-gold-500" />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Favorites */}
      <section className="mt-10">
        <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-bone">
          <Heart className="h-5 w-5 text-grow-400" /> Favorites
        </h2>
        {favoriteCourses.length === 0 ? (
          <p className="mt-3 text-sm text-smoke">Tap the heart on any course to save it here.</p>
        ) : (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {favoriteCourses.map((c) => (
              <div key={c.id} className="card p-4">
                <p className="text-sm font-medium text-bone">{c.title}</p>
                <p className="text-xs text-smoke">{c.category}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
