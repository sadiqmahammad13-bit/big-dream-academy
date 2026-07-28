// The "Growth Ring" — this app's signature visual element.
// A conic-gradient ring in the green accent represents progress anywhere
// it appears: dashboard XP, course completion %, profile stats. Filling
// gold at 100% ties completion back to the certificate/reward moment.

interface ProgressRingProps {
  percent: number; // 0–100
  size?: number;
  label?: string;
  sublabel?: string;
}

export default function ProgressRing({ percent, size = 120, label, sublabel }: ProgressRingProps) {
  const clamped = Math.max(0, Math.min(100, percent));
  const isComplete = clamped >= 100;

  return (
    <div
      className="relative flex items-center justify-center rounded-full transition-all duration-700"
      style={{
        width: size,
        height: size,
        ["--pct" as string]: `${clamped * 3.6}deg`,
        background: isComplete
          ? "conic-gradient(from -90deg, #D4AF37 360deg, #1F2626 0)"
          : "conic-gradient(from -90deg, #1FA971 var(--pct), #1F2626 0)",
      }}
    >
      <div className="flex flex-col items-center justify-center rounded-full bg-ink-950" style={{ width: size - 14, height: size - 14 }}>
        <span className="font-display text-xl font-bold text-bone">{clamped}%</span>
        {label && <span className="text-[11px] text-smoke">{label}</span>}
      </div>
      {sublabel && (
        <span className="absolute -bottom-6 whitespace-nowrap text-xs text-smoke">{sublabel}</span>
      )}
    </div>
  );
}
