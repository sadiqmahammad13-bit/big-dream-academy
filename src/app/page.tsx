import Link from "next/link";
import { ArrowRight, ShieldCheck, Award, Search, BellRing, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CourseCard from "@/components/CourseCard";
import ProgressRing from "@/components/ProgressRing";
import { courses } from "@/data/courses";

const features = [
  { icon: Search, title: "Search & discover", body: "Find the exact skill you need across every course in seconds." },
  { icon: Award, title: "Real certificates", body: "Finish a course and earn a certificate you can actually show." },
  { icon: BellRing, title: "Stay on track", body: "Notifications and progress tracking keep momentum going." },
  { icon: ShieldCheck, title: "Ethical by design", body: "Every course teaches sustainable, honest ways to earn online." },
];

const plans = [
  { name: "Starter", price: "₦1,000", perks: ["1 course", "1 eBook", "Certificate"] },
  { name: "Standard", price: "₦2,000", perks: ["3 courses", "eBooks included", "Certificate", "Downloads"], featured: true },
  { name: "Premium", price: "₦5,000", perks: ["All courses", "All eBooks", "Lifetime updates", "Premium support"] },
];

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main className="bg-ink-950">
        {/* Hero */}
        <section className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-5 pb-16 pt-16 md:flex-row md:pt-24">
          <div className="max-w-xl animate-rise text-center md:text-left">
            <span className="inline-block rounded-full border border-gold-700 px-3 py-1 text-xs font-medium text-gold-400">
              🎓 Video Lessons + Quizzes + Certificates
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight text-bone md:text-5xl">
              Learn AI & Digital Skills{" "}
              <span className="bg-gold-green bg-clip-text text-transparent">from your phone</span>
            </h1>
            <p className="mt-5 text-base text-smoke md:text-lg">
              7 practical courses — AI, marketing, e-commerce, and design — taught step by step,
              with quizzes and certificates to prove what you've learned. Courses from ₦1,000.
            </p>
            <div className="mt-6 rounded-xl border border-grow-700 bg-grow-700/10 px-4 py-3 text-sm text-grow-400">
              ✓ Start your first lesson FREE — no payment required to try.
            </div>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row md:justify-start">
              <Link href="/register" className="btn-gold w-full sm:w-auto">
                Start learning free <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/courses" className="btn-outline w-full sm:w-auto">
                Browse courses
              </Link>
            </div>
          </div>

          <div className="flex flex-1 items-center justify-center gap-6 animate-rise" style={{ animationDelay: "150ms" }}>
            <div className="card flex flex-col items-center gap-3 p-6">
              <ProgressRing percent={72} label="XP" />
              <p className="text-xs text-smoke">Meta Ads &middot; in progress</p>
            </div>
            <div className="card mt-10 flex flex-col items-center gap-3 p-6">
              <ProgressRing percent={100} label="Done" />
              <p className="text-xs text-smoke">Canva Design &middot; certified</p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-y border-ink-800 bg-ink-900/40 py-16">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, body }) => (
              <div key={title} className="text-center sm:text-left">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-ink-850 text-grow-400 sm:mx-0">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-bone">{title}</h3>
                <p className="mt-1 text-sm text-smoke">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Course preview */}
        <section className="mx-auto max-w-6xl px-5 py-16">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-2xl font-bold text-bone md:text-3xl">Popular courses</h2>
            <Link href="/courses" className="text-sm text-grow-400 hover:underline">View all</Link>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.slice(0, 6).map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="border-y border-ink-800 bg-ink-900/40 py-16">
          <div className="mx-auto max-w-6xl px-5">
            <div className="text-center">
              <h2 className="font-display text-2xl font-bold text-bone md:text-3xl">Pricing</h2>
              <p className="mt-2 text-smoke">Simple, one-time plans — no hidden fees. Paid securely via Paystack.</p>
              <p className="mt-1 text-sm text-grow-400">The first lesson of every course is free to try before you pay.</p>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`card relative p-6 text-left ${plan.featured ? "border-grow-500 shadow-grow" : ""}`}
                >
                  {plan.featured && (
                    <span className="absolute -top-3 right-6 rounded-full bg-gold-green px-3 py-0.5 text-[11px] font-semibold text-ink-950">
                      Most popular
                    </span>
                  )}
                  <p className="font-display text-base font-semibold text-bone">{plan.name}</p>
                  <p className="mt-2 font-display text-3xl font-bold text-bone">{plan.price}</p>
                  <ul className="mt-4 flex flex-col gap-2">
                    {plan.perks.map((perk) => (
                      <li key={perk} className="flex items-center gap-2 text-sm text-smoke">
                        <Check className="h-4 w-4 text-grow-400" /> {perk}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-sm text-smoke">
              We also sell standalone eBooks from ₦1,000 each — see the{" "}
              <Link href="/register" className="text-grow-400 hover:underline">eBooks store</Link> after signing up.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-4xl px-5 pb-24 pt-16 text-center">
          <div className="card p-10 shadow-gold">
            <h2 className="font-display text-2xl font-bold text-bone md:text-3xl">
              Your first lesson is free — try it now
            </h2>
            <p className="mx-auto mt-3 max-w-md text-smoke">
              Create a free account, watch your first lesson, and decide if it's for you — no payment required to start.
            </p>
            <Link href="/register" className="btn-gold mt-6 inline-flex">
              Create free account
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
