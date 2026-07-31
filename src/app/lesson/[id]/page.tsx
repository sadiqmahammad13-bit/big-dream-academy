"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { PlayCircle, CheckCircle2, ArrowLeft } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/lib/auth-context";
import { markLessonComplete } from "@/lib/firestore-helpers";
import { getCourseById } from "@/data/courses";

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

  const requestedLessonId = searchParams.get("lesson");
  const initialIndex = Math.max(
    0,
    course?.lessons.findIndex((l) => l.id === requestedLessonId) ?? 0
  );
  const [activeIndex, setActiveIndex] = useState(initialIndex === -1 ? 0 : initialIndex);
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  if (!course) {
    return <p className="p-10 text-center text-smoke">Course not found.</p>;
  }

  const activeLesson = course.lessons[activeIndex];
  const isLastLesson = activeIndex === course.lessons.length - 1;

  async function handleMarkComplete() {
    if (!user) return;
    await markLessonComplete(user.uid, course!.id, activeLesson.id);
    setCompleted((prev) => new Set(prev).add(activeLesson.id));

    if (isLastLesson) {
      // All lessons done — send the student to the quiz instead of
      // granting the certificate directly. The quiz page handles scoring
      // and certificate generation once they score 80% or higher.
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

          {/* Placeholder video player — swap `src` for a hosted MP4, YouTube unlisted embed, or Mux stream */}
          <div className="flex aspect-video items-center justify-center rounded-2xl border border-ink-700 bg-ink-900">
            <PlayCircle className="h-16 w-16 text-grow-500/60" />
          </div>

          <h1 className="mt-5 font-display text-xl font-bold text-bone">{activeLesson.title}</h1>
          <p className="mt-1 text-sm text-smoke">{course.title} &middot; {activeLesson.duration}</p>

          <button onClick={handleMarkComplete} className="btn-gold mt-6">
            {isLastLesson ? "Finish lessons & take quiz" : "Mark complete & continue"}
          </button>
        </div>

        {/* Playlist */}
        <aside className="card h-fit p-4">
          <h2 className="mb-3 px-1 font-display text-sm font-semibold text-bone">Lessons</h2>
          <ul className="flex flex-col gap-1">
            {course.lessons.map((lesson, i) => {
              const done = completed.has(lesson.id);
              const active = i === activeIndex;
              return (
                <li key={lesson.id}>
                  <button
                    onClick={() => setActiveIndex(i)}
                    className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                      active ? "bg-ink-850 text-bone" : "text-smoke hover:bg-ink-900"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {done ? (
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
