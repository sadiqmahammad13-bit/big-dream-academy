import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, PlayCircle, FileText, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { courses, getCourseById } from "@/data/courses";
import type { Metadata } from "next";

// Pre-render all 7 course pages at build time for speed + SEO.
export function generateStaticParams() {
  return courses.map((c) => ({ id: c.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const course = getCourseById(params.id);
  if (!course) return {};
  return {
    title: course.title,
    description: course.description,
  };
}

export default function CourseDetailsPage({ params }: { params: { id: string } }) {
  const course = getCourseById(params.id);
  if (!course) notFound();

  return (
    <>
      <Navbar />
      <main className="mx-auto min-h-screen max-w-5xl px-5 py-12">
        <span className="text-xs font-medium text-gold-400">{course.category} &middot; {course.level}</span>
        <h1 className="mt-2 font-display text-3xl font-bold text-bone">{course.title}</h1>
        <p className="mt-3 max-w-2xl text-smoke">{course.description}</p>

        <div className="mt-5 flex items-center gap-4 text-sm text-smoke">
          <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {course.hours} hours</span>
          <span>{course.lessons.length} lessons</span>
          <span>{course.resources.length} downloads</span>
        </div>

        <Link href={`/lesson/${course.id}`} className="btn-gold mt-6 inline-flex">
          Start course
        </Link>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Curriculum */}
          <div className="lg:col-span-2">
            <h2 className="font-display text-lg font-semibold text-bone">Curriculum</h2>
            <ul className="mt-4 flex flex-col gap-2">
              {course.lessons.map((lesson, i) => (
                <li key={lesson.id}>
                  <Link
                    href={`/lesson/${course.id}?lesson=${lesson.id}`}
                    className="card flex items-center justify-between gap-4 p-4 transition-colors hover:border-grow-500"
                  >
                    <span className="flex items-center gap-3">
                      <PlayCircle className="h-5 w-5 shrink-0 text-grow-400" />
                      <span>
                        <span className="block text-sm text-bone">{i + 1}. {lesson.title}</span>
                      </span>
                    </span>
                    <span className="shrink-0 text-xs text-smoke">{lesson.duration}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Downloads + what you'll learn */}
          <aside className="flex flex-col gap-6">
            <div className="card p-5">
              <h3 className="font-display text-sm font-semibold text-bone">Included downloads</h3>
              <ul className="mt-3 flex flex-col gap-2">
                {course.resources.map((r) => (
                  <li key={r.id} className="flex items-center gap-2 text-sm text-smoke">
                    <FileText className="h-4 w-4 text-gold-500" /> {r.title}
                  </li>
                ))}
              </ul>
              <Link href="/downloads" className="mt-4 block text-sm text-grow-400 hover:underline">
                Go to Downloads
              </Link>
            </div>

            <div className="card p-5">
              <h3 className="font-display text-sm font-semibold text-bone">On completion</h3>
              <p className="mt-2 flex items-center gap-2 text-sm text-smoke">
                <CheckCircle2 className="h-4 w-4 text-grow-400" /> Verified certificate
              </p>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
