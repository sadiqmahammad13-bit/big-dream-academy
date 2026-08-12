"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Flame, Award, BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardShell from "@/components/DashboardShell";
import ProgressRing from "@/components/ProgressRing";
import CourseCard from "@/components/CourseCard";
import { useAuth } from "@/lib/auth-context";
import { getUserProfile, UserProfile } from "@/lib/firestore-helpers";
import { courses } from "@/data/courses";

const WELCOME_TEXT = `🏛️ KA KARANTA WANNAN KAFIN KA FARA KARATU

Barka da zuwa Big Dream Academy.

Idan ka shiga wannan academy, kada ka ɗauke ta a matsayin wani website da ka yi register kawai ka manta da shi.

Ka ɗauke ta a matsayin wurin da za ka fara gina kanka.

Wataƙila yau ba ka da wata babbar skill.
Wataƙila ba ka san coding ba.
Wataƙila ba ka san AI, marketing, design ko online business ba.

Ba matsala.

Abin da ya fi muhimmanci shi ne ka yanke shawarar cewa daga yau za ka fara koya.

A Big Dream Academy, ba ma son ka zama mutum mai yawan kallon courses amma babu abin da ya canza a rayuwarsa.

Muna son idan ka kammala course, ka iya cewa:

"Na koyi wannan. Na gwada shi. Zan iya amfani da shi."

Saboda haka, kada ka yi gaggawar kammala lessons.

Ka fahimta.
Ka rubuta notes.
Ka yi assignments.
Ka yi practice.
Ka tambaya idan ba ka fahimta ba.
Ka sake kallon lesson idan ya zama dole.

Kuma kada ka koyi skill saboda kawai kana son certificate.

Certificate takarda ce.
Skill ɗin da ka samu shi ne darajar da za ta bi ka.

🚫 ABIN DA BA MU SON KA YI

Kada ka shiga academy ka yi register sannan ka daina dawowa.

Kada ka tsallake lessons kawai domin ka kai ƙarshen course.

Kada ka kwafi aikin wani ka ce naka ne.

Kada ka yi amfani da ilimin da ka koya wajen yaudarar mutane.

Kada ka sayar ko ka raba course materials na academy ba tare da izini ba.

Kada ka yi amfani da account ɗinka wajen karya dokokin academy.

Kuma kada ka bari "ban iya ba" ya zama dalilin da zai hana ka fara.

🤝 ABIN DA MUKE BUKATA DAGA GARE KA

Ba muna neman ka zama perfect ba.

Muna neman ka kasance serious.

Idan ka yi kuskure, ka koya.

Idan ka kasa fahimta, ka tambaya.

Idan lesson ya yi maka wahala, ka sake gwadawa.

Idan ka fara jin kamar ba za ka iya ba, ka tuna dalilin da ya sa ka fara.

Domin babban buri baya farawa da babban mataki.

Yana farawa da ƙaramin mataki da aka ɗauka kullum.

🧠 KA RIƘE WANNAN A ZUCIYA

AI ba sihiri ba ne.
Online income ba kuɗin gaggawa ba ne.
Certificate ba guarantee na aiki ba ne.
Kuma Big Dream Academy ba ta yi maka alkawarin samun kuɗi cikin dare ɗaya.

Abin da muke maka shi ne:

Ilimi.
Skills.
Practical knowledge.
Guidance.
Da kuma hanyar da za ka fara aiki da abin da ka koya.

Sakamakon ƙarshe yana buƙatar aikin ka.

🌟 KA SAN ME YA SA AKA KIRA TA "BIG DREAM"?

Saboda mun yi imani cewa mutum zai iya fara daga ƙarami ya gina wani abu mai girma.

Ba sai kana da laptop mafi tsada ba.

Ba sai kana da kuɗi masu yawa ba.

Ba sai ka riga ka san komai ba.

Amma dole ka fara.

Ka koyi skill ɗaya.

Ka gina project ɗaya.

Ka taimaki mutum ɗaya.

Ka samu client ɗaya.

Ka ƙirƙiri abu ɗaya.

Sannan ka ci gaba.

👑 DAGA YAU, KA ƊAUKI KANKA A MATSAYIN ƊALIBI

Ka shiga academy da niyyar cewa:

"Ba zan shiga nan domin in kammala course kawai ba. Zan shiga domin in canza abin da na sani zuwa abin da zan iya yi."

Idan ka yi haka, Big Dream Academy ba za ta zama wani website kawai a wayarka ba.

Za ta zama wani ɓangare na tafiyar ka.

Barka da zuwa.

Wannan ba ƙarshen tafiya ba ne.

Wannan shi ne farkon ginin babban burinka.

🚀 LEARN. BUILD. GROW. DREAM BIG.

— BIG DREAM ACADEMY`;

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardShell>
        <DashboardContent />
      </DashboardShell>
    </ProtectedRoute>
  );
}

function WelcomeBanner() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="card mb-8 overflow-hidden border-gold-700 p-5 shadow-gold">
      <h2 className="font-display text-lg font-bold text-gold-400">Ka Karanta Wannan Kafin Ka Fara</h2>
      <div className="mt-3 aspect-video overflow-hidden rounded-xl border border-ink-700 bg-ink-900">
        <iframe
          src="https://www.youtube.com/embed/DZpEHZ3lWe4"
          title="Ka Karanta Wannan Kafin Ka Fara Karatu"
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className={`relative mt-4 text-sm text-smoke ${expanded ? "" : "max-h-40 overflow-hidden"}`}>
        <div className="whitespace-pre-line">{WELCOME_TEXT}</div>
        {!expanded && (
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-ink-900 to-transparent" />
        )}
      </div>

      <button
        onClick={() => setExpanded((v) => !v)}
        className="mt-3 flex items-center gap-1 text-sm font-medium text-grow-400"
      >
        {expanded ? (
          <>Rufe <ChevronUp className="h-4 w-4" /></>
        ) : (
          <>Karanta duka <ChevronDown className="h-4 w-4" /></>
        )}
      </button>
    </div>
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

      <div className="mt-6">
        <WelcomeBanner />
      </div>

      {/* Stat cards */}
      <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-3">
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
