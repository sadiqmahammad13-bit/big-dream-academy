"use client";

import { useState, FormEvent } from "react";
import { ShieldCheck, Search, CheckCircle2, XCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { verifyCertificate, CertificateLookupResult } from "@/lib/firestore-helpers";
import { getCourseById } from "@/data/courses";

export default function VerifyPage() {
  const [certificateId, setCertificateId] = useState("");
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [result, setResult] = useState<CertificateLookupResult | null>(null);

  async function handleSearch(e: FormEvent) {
    e.preventDefault();
    if (!certificateId.trim()) return;

    setLoading(true);
    setSearched(false);
    try {
      const found = await verifyCertificate(certificateId);
      setResult(found);
    } catch (err) {
      console.error("Certificate lookup failed:", err);
      setResult(null);
    }
    setSearched(true);
    setLoading(false);
  }

  const course = result ? getCourseById(result.courseId) : undefined;

  return (
    <>
      <Navbar />
      <main className="mx-auto min-h-screen max-w-2xl px-5 py-14">
        <div className="text-center">
          <ShieldCheck className="mx-auto h-10 w-10 text-gold-500" />
          <h1 className="mt-3 font-display text-2xl font-bold text-bone md:text-3xl">Verify a Certificate</h1>
          <p className="mt-2 text-smoke">Enter a Big Dream Academy certificate ID to confirm it's genuine.</p>
        </div>

        <form onSubmit={handleSearch} className="mt-8 flex flex-col gap-3 sm:flex-row">
          <input
            value={certificateId}
            onChange={(e) => setCertificateId(e.target.value)}
            placeholder="e.g. BDA-AIF-A1B2-C3D4E5"
            className="input-field flex-1"
          />
          <button type="submit" disabled={loading} className="btn-gold flex items-center justify-center gap-2 disabled:opacity-60">
            <Search className="h-4 w-4" /> {loading ? "Checking…" : "Verify"}
          </button>
        </form>

        {searched && (
          <div className="mt-8 animate-rise">
            {result ? (
              <div className="card border-grow-700 p-6 shadow-grow">
                <div className="flex items-center gap-2 text-grow-400">
                  <CheckCircle2 className="h-5 w-5" />
                  <p className="font-display text-sm font-semibold">Valid certificate</p>
                </div>
                <div className="mt-4 flex flex-col gap-2 text-sm">
                  <p><span className="text-smoke">Student:</span> <span className="text-bone">{result.studentName}</span></p>
                  <p><span className="text-smoke">Course:</span> <span className="text-bone">{course?.title || result.courseId}</span></p>
                  <p><span className="text-smoke">Score:</span> <span className="text-bone">{result.score}%</span></p>
                  <p>
                    <span className="text-smoke">Completed:</span>{" "}
                    <span className="text-bone">
                      {new Date(result.completedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                    </span>
                  </p>
                  <p><span className="text-smoke">Certificate ID:</span> <span className="text-bone">{result.certificateId}</span></p>
                </div>
              </div>
            ) : (
              <div className="card flex items-center gap-2 border-red-900 p-6 text-red-400">
                <XCircle className="h-5 w-5 shrink-0" />
                <p className="text-sm">No certificate found with that ID. Double-check it and try again.</p>
              </div>
            )}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
