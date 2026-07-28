import Link from "next/link";
import { Clock, Heart } from "lucide-react";
import { Course } from "@/data/courses";

interface CourseCardProps {
  course: Course;
  progress?: number; // 0–100, shown if enrolled
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

const levelColor: Record<Course["level"], string> = {
  Beginner: "text-grow-400 border-grow-700",
  Intermediate: "text-gold-400 border-gold-700",
  Advanced: "text-bone border-ink-700",
};

export default function CourseCard({ course, progress, isFavorite, onToggleFavorite }: CourseCardProps) {
  return (
    <div className="card group relative overflow-hidden p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-grow">
      {onToggleFavorite && (
        <button
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          onClick={onToggleFavorite}
          className="absolute right-4 top-4 z-10 rounded-full bg-ink-950/70 p-2"
        >
          <Heart className={`h-4 w-4 ${isFavorite ? "fill-gold-500 text-gold-500" : "text-smoke"}`} />
        </button>
      )}

      <span className={`inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${levelColor[course.level]}`}>
        {course.level}
      </span>

      <h3 className="mt-3 font-display text-lg font-semibold text-bone">{course.title}</h3>
      <p className="mt-1 text-sm text-smoke">{course.tagline}</p>

      <div className="mt-4 flex items-center justify-between text-xs text-smoke">
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" /> {course.hours}h
        </span>
        <span>{course.category}</span>
      </div>

      {typeof progress === "number" && (
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-ink-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-grow-500 to-gold-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <Link
        href={`/courses/${course.id}`}
        className="mt-4 block rounded-full border border-ink-700 py-2 text-center text-sm font-medium text-bone transition-colors group-hover:border-grow-500 group-hover:text-grow-400"
      >
        {typeof progress === "number" ? "Continue" : "View course"}
      </Link>
    </div>
  );
}
