"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, XCircle, Award, ArrowLeft } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/lib/auth-context";
import { submitQuizResult } from "@/lib/firestore-helpers";
import { getCourseById } from "@/data/courses";

export default function QuizPage({ params }: { params: { id: string } }) {
  return (
    <ProtectedRoute>
      <QuizContent courseId={params.id} />
    </ProtectedRoute>
  );
}

function QuizContent({ courseId }: { courseId: string }) {
  const course = getCourseById(courseId);
  const { user } = useAuth();
  const router = useRouter();

  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ score: number; passed: boolean } | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  if (!course) {
    return <p className="p-10 text-center text-smoke">Course not found.</p>;
  }

  const allAnswered = course.quiz.every((q) => answers[q.id] !== undefined);

  function selectAnswer(questionId: string, optionIndex: number) {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  }

  async function handleSubmit() {
    if (!user || !course) return;
    setSubmitting(true);
    setSaveError(null);

    const correctCount = course.quiz.filter((q) => answers[q.id] === q.correctIndex).length;
    const score = Math.round((correctCount / course.quiz.length) * 100);
    const passed = score >= 80;

    try {
      await submitQuizResult(user.uid, course.id, score, user.displayName || "Student");
    } catch (err) {
      console.error("Failed to save quiz result:", err);
      setSaveError("Your score was calculated, but we couldn't save it to your profile. Please check your connection and try again from your dashboard.");
    }

    setResult({ score, passed });
    setSubmitting(false);
  }

  if (result) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-ink-950 px-5">
        <div className="card w-full max-w-md p-8 text-center animate-rise">
          {result.passed ? (
            <>
              <Award className="mx-auto h-14 w-14 text-gold-500" />
              <h1 className="mt-4 font-display text-2xl font-bold text-bone">Congratulations!</h1>
              <p className="mt-2 text-smoke">
                You scored <span className="text-grow-400 font-semibold">{result.score}%</span> — you passed and earned a certificate.
              </p>
              {saveError && (
                <p className="mt-3 rounded-xl border border-red-900 bg-red-950/30 px-3 py-2 text-xs text-red-400">
                  {saveError}
                </p>
              )}
              <Link href={`/profile?certified=${course.id}`} className="btn-gold mt-6 inline-flex">
                View your certificate
              </Link>
            </>
          ) : (
            <>
              <XCircle className="mx-auto h-14 w-14 text-smoke" />
              <h1 className="mt-4 font-display text-2xl font-bold text-bone">Not quite yet</h1>
              <p className="mt-2 text-smoke">
                You scored <span className="text-bone font-semibold">{result.score}%</span>. You need 80% or higher to earn the certificate — review the lessons and try again.
              </p>
              <Link href={`/lesson/${course.id}`} className="btn-gold mt-6 inline-flex">
                Review lessons
              </Link>
            </>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-ink-950 px-5 py-8">
      <div className="mx-auto max-w-2xl">
        <Link href={`/lesson/${course.id}`} className="mb-4 flex items-center gap-2 text-sm text-smoke hover:text-bone">
          <ArrowLeft className="h-4 w-4" /> Back to lessons
        </Link>

        <h1 className="font-display text-xl font-bold text-bone">{course.title} — Quiz</h1>
        <p className="mt-1 text-sm text-smoke">Score 80% or higher to earn your certificate.</p>

        <div className="mt-6 flex flex-col gap-5">
          {course.quiz.map((q, qIndex) => (
            <div key={q.id} className="card p-5">
              <p className="font-medium text-bone">{qIndex + 1}. {q.question}</p>
              <div className="mt-3 flex flex-col gap-2">
                {q.options.map((option, optIndex) => {
                  const selected = answers[q.id] === optIndex;
                  return (
                    <button
                      key={optIndex}
                      onClick={() => selectAnswer(q.id, optIndex)}
                      className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-left text-sm transition-colors ${
                        selected
                          ? "border-grow-500 bg-ink-850 text-bone"
                          : "border-ink-700 text-smoke hover:border-ink-600"
                      }`}
                    >
                      {selected ? (
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-grow-400" />
                      ) : (
                        <span className="h-4 w-4 shrink-0 rounded-full border border-ink-700" />
                      )}
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={!allAnswered || submitting}
          className="btn-gold mt-6 w-full disabled:opacity-60"
        >
          {submitting ? "Submitting…" : "Submit Quiz"}
        </button>
        {!allAnswered && (
          <p className="mt-2 text-center text-xs text-smoke">Answer every question to submit.</p>
        )}
      </div>
    </main>
  );
}
