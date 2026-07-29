"use client";

import { useState } from "react";
import { FileText, LayoutTemplate, Download } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardShell from "@/components/DashboardShell";
import { courses } from "@/data/courses";

type Filter = "all" | "pdf" | "template";

export default function DownloadsPage() {
  return (
    <ProtectedRoute>
      <DashboardShell>
        <DownloadsContent />
      </DashboardShell>
    </ProtectedRoute>
  );
}

function DownloadsContent() {
  const [filter, setFilter] = useState<Filter>("all");

  const allResources = courses.flatMap((course) =>
    course.resources.map((r) => ({ ...r, courseTitle: course.title }))
  );
  const filtered = allResources.filter((r) => filter === "all" || r.type === filter);

  return (
    <div className="animate-rise">
      <h1 className="font-display text-2xl font-bold text-bone">Downloads</h1>
      <p className="mt-1 text-smoke">PDFs and templates from every course you can access.</p>

      <div className="mt-6 flex gap-2">
        {(["all", "pdf", "template"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full border px-4 py-1.5 text-sm capitalize transition-colors ${
              filter === f
                ? "border-grow-500 text-grow-400"
                : "border-ink-700 text-smoke hover:text-bone"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {filtered.map((resource) => (
          <div key={`${resource.courseTitle}-${resource.id}`} className="card flex items-center justify-between gap-4 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink-850 text-gold-500">
                {resource.type === "pdf" ? <FileText className="h-5 w-5" /> : <LayoutTemplate className="h-5 w-5" />}
              </div>
              <div>
                <p className="text-sm font-medium text-bone">{resource.title}</p>
                <p className="text-xs text-smoke">{resource.courseTitle}</p>
              </div>
            </div>
            {/* fileUrl comes from Firebase Storage in production */}
            <a
              href={resource.fileUrl || "#"}
              className="flex items-center gap-1 rounded-full border border-ink-700 px-3 py-1.5 text-xs text-smoke transition-colors hover:border-grow-500 hover:text-grow-400"
            >
              <Download className="h-3.5 w-3.5" /> Get
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
