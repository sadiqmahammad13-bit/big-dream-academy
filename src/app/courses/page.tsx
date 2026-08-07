"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CourseCard from "@/components/CourseCard";
import { courses } from "@/data/courses";

const categories = ["All", ...Array.from(new Set(courses.map((c) => c.category)))];

export default function CourseLibraryPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const matchesQuery = c.title.toLowerCase().includes(query.toLowerCase()) ||
        c.tagline.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "All" || c.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  return (
    <>
      <Navbar />
      <main className="mx-auto min-h-screen max-w-6xl px-5 py-12">
        <h1 className="font-display text-2xl font-bold text-bone md:text-3xl">Course Library</h1>
        <p className="mt-1 text-smoke">Every skill we teach, all in one place. Plans start from ₦1,000 — paid securely via Paystack.</p>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-smoke" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search courses…"
              className="input-field pl-11"
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input-field sm:w-56"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {filtered.length === 0 ? (
          <p className="mt-16 text-center text-smoke">No courses match your search.</p>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
