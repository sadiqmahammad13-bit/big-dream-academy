"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Flame, Award, BookOpen } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardShell from "@/components/DashboardShell";
import ProgressRing from "@/components/ProgressRing";
import CourseCard from "@/components/CourseCard";
import { useAuth } from "@/lib/auth-context";
import { getUserProfile, UserProfile } from "@/lib/firestore-helpers";
import { courses } from "@/data/courses";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardShell>
        <DashboardContent />
      </DashboardShell>
    </ProtectedRoute>
  );
}

function DashboardContent() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (user) getUserProfile(user.uid).then(setProfile);
  }, [user]);

  const enrolled = courses.filter((c) => profile?.enrolledCourses.includes(c.id));
  const overallPercent = profile
    ? Math.min(100, Math.round((profile.completedCourses.length / Math.max(profile.enrolledCourses.length, 1)) * 100))
    : 0;

  return (
    <div className="animate-rise">
      <h1 className="font-display text-2xl font-bold text-bone">
        Welcome back, {user?.displayName?.split(" ")[0] || "there"} 👋
      </h1>
      <p className="mt-1 text-smoke">Here&apos;s where your learning stands today.</p>

      {/* Stat cards */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="card flex items-center gap-4 p-5">
          <ProgressRing percent={overallPercent} size={72} />
          <div>
            <p className="text-xs text-smoke">Overall progress</p>
            <p className="font-display text-lg font-semibold text-bone">{overallPercent}% complete</p>
          </div>
        </div>
        <div className="card flex items-center gap-4 p-5">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-ink-850 text-gold-500">
            <Flame className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs text-smoke">XP earned</p>
            <p className="font-display text-lg font-semibold text-bone">{profile?.xp ?? 0} XP</p>
          </div>
        </div>
        <div className="card flex items-center gap-4 p-5">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-ink-850 text-grow-400">
            <Award className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs text-smoke">Certificates</p>
            <p className="font-display text-lg font-semibold text-bone">{profile?.completedCourses.length ?? 0} earned</p>
          </div>
        </div>
      </div>

      {/* Continue learning */}
      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-bone">Continue learning</h2>
          <Link href="/courses" className="text-sm text-grow-400 hover:underline">Browse all</Link>
        </div>

        {enrolled.length === 0 ? (
          <div className="card mt-4 flex flex-col items-center gap-3 p-10 text-center">
            <BookOpen className="h-8 w-8 text-smoke" />
            <p className="text-smoke">You haven&apos;t started a course yet.</p>
            <Link href="/courses" className="btn-gold !py-2 !px-5 text-sm">Browse courses</Link>
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {enrolled.map((course) => (
              <CourseCard key={course.id} course={course} progress={45} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
