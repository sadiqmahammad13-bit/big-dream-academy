"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { PlayCircle, CheckCircle2, ArrowLeft, Lock } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/lib/auth-context";
import { markLessonComplete, getUserProfile, UserProfile } from "@/lib/firestore-helpers";
import { getCourseById } from "@/data/courses";
import { getUnlockedCourseIds } from "@/data/plans";

export default function LessonPage({ params }: { params: { id: string } }) {
  return (
    <ProtectedRoute>
      <LessonContent courseId={params.id} />
    </ProtectedRoute>
  );
}

function LessonContent({ courseId }: { courseId: string }) {
  const course = getCourseById(courseId);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [profileLoaded, setProfileLoaded] = useState(false);

  useEffect(() => {
    if (user) {
      getUserProfile(user.uid)
        .then(setProfile)
        .finally(() => setProfileLoaded(true));
    }
  }, [user]);

  const requestedLessonId = searchParams.get("lesson");
  const initialIndex = Math.max(
    0,
    course?.lessons.findIndex((l) => l.id === requestedLessonId) ?? 0
  );
  const [activeIndex, setActiveIndex] = useState(initialIndex === -1 ? 0 : initialIndex);
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [saving, setSaving] = useState(false);

  if (!course) {
    return <p className="p-10 text-center text-smoke">Course not found.</p>;
  }

  // Figure out which plan(s) this student has purchased, then check
  // whether THIS specific course is included in any of them.
  const purchasedPlanIds = (profile?.purchases ?? [])
    .filter((p) => p.type === "plan")
    .map((p) => p.itemId);
  const unlockedCourseIds = getUnlockedCourseIds(purchasedPlanIds);
  const hasPaidForThisCourse =
    unlockedCourseIds.has("__ALL__") || unlockedCourseIds.has(course.id);

  const activeLesson = course.lessons[activeIndex];
  const isLastLesson = activeIndex === course.lessons.length - 1;
  // First lesson is always a free preview — everything after requires this
  // specific course to be covered by a purchased plan.
  const isLocked = activeIndex > 0 && !hasPaidForThisCourse;

  async function handleMarkComplete() {
    if (!user || saving || isLocked) return;
    setSaving(true);

    try {
      await markLessonComplete(user.uid, course!.id, activeLesson.id);
    } catch (err) {
      console.error("Failed to save lesson progress:", err);
    }

    setCompleted((prev) => new Set(prev).add(activeLesson.id));
    setSaving(false);

    if (isLastLesson) {
      router.push(`/quiz/${course!.id}`);
      return;
    }
    setActiveIndex((i) => Math.min(i + 1, course!.lessons.length - 1));
  }

  return (
    <main className="min-h-screen bg-ink-950">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-5 py-8 lg:grid-cols-3">
        {/* Video area */}
        <div className="lg:col-span-2">
          <Link href={`/courses/${course.id}`} className="mb-4 flex items-center gap-2 text-sm text-smoke hover:text-bone">
            <ArrowLeft className="h-4 w-4" /> Back to course
          </Link>

          {!profileLoaded ? (
            <div className="flex aspect-video items-center justify-center rounded-2xl border border-ink-700 bg-ink-900">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-ink-700 border-t-grow-500" />
            </div>
          ) : isLocked ? (
            <div className="flex aspect-video flex-col items-center justify-center gap-3 rounded-2xl border border-ink-700 bg-ink-900 px-6 text-center">
              <Lock className="h-12 w-12 text-gold-500" />
              <p className="font-display text-lg font-semibold text-bone">This lesson is locked</p>
              <p className="max-w-sm text-sm text-smoke">
                You've watched the free preview lesson. Unlock this course with a plan that includes it.
              </p>
              <Link href="/payment" className="btn-gold mt-2">
                View plans
              </Link>
            </div>
          ) : activeLesson.videoUrl ? (
            <div className="aspect-video overflow-hidden rounded-2xl border border-ink-700 bg-ink-900">
              <iframe
                key={activeLesson.id}
                src={`https://www.youtube.com/embed/${activeLesson.videoUrl}`}
                title={activeLesson.title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="flex aspect-video items-center justify-center rounded-2xl border border-ink-700 bg-ink-900">
              <PlayCircle className="h-16 w-16 text-grow-500/60" />
            </div>
          )}

          <h1 className="mt-5 font-display text-xl font-bold text-bone">{activeLesson.title}</h1>
          <p className="mt-1 text-sm text-smoke">
            {course.title} &middot; {activeLesson.duration}
            {activeIndex === 0 && <span className="ml-2 text-grow-400">&middot; Free preview</span>}
          </p>

          {!isLocked && (
            <button onClick={handleMarkComplete} disabled={saving} className="btn-gold mt-6 disabled:opacity-60">
              {saving ? "Saving…" : isLastLesson ? "Finish lessons & take quiz" : "Mark complete & continue"}
            </button>
          )}
        </div>

        {/* Playlist */}
        <aside className="card h-fit p-4">
          <h2 className="mb-3 px-1 font-display text-sm font-semibold text-bone">Lessons</h2>
          <ul className="flex flex-col gap-1">
            {course.lessons.map((lesson, i) => {
              const done = completed.has(lesson.id);
              const active = i === activeIndex;
              const locked = i > 0 && !hasPaidForThisCourse;
              return (
                <li key={lesson.id}>
                  <button
                    onClick={() => setActiveIndex(i)}
                    className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                      active ? "bg-ink-850 text-bone" : "text-smoke hover:bg-ink-900"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {locked ? (
                        <Lock className="h-4 w-4 shrink-0 text-gold-500" />
                      ) : done ? (
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-grow-400" />
                      ) : (
                        <PlayCircle className="h-4 w-4 shrink-0" />
                      )}
                      {lesson.title}
                    </span>
                    <span className="shrink-0 text-xs">{lesson.duration}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>
      </div>
    </main>
  );
}
