import { Link } from "react-router";
import { motion } from "motion/react";
import {
  Mic,
  BrainCircuit,
  BarChart3,
  MessageCircle,
  ArrowLeftRight,
  LayoutDashboard,
  Target,
  FileUp,
  Mic2,
  PieChart,
  ArrowRight,
  ChevronRight,
  FileText,
} from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

// ─── Design tokens ─────────────────────────────────────────────────────────
const card = {
  backgroundColor: "#FDFDFD",
  border: "1px solid rgba(0,0,0,0.07)",
  borderRadius: 20,
  boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 6px 24px rgba(0,0,0,0.05)",
};
const ctaShadow = "0 4px 20px rgba(230,57,70,0.28), 0 1px 3px rgba(0,0,0,0.1)";

// ─── Reusable pieces ───────────────────────────────────────────────────────
function SectionLabel({ children, center = false }: { children: React.ReactNode; center?: boolean }) {
  return (
    <div
      className={`flex items-center gap-3 mb-4 ${center ? "justify-center" : ""}`}
      style={{
        color: "#E63946",
        fontFamily: "'DM Mono', monospace",
        fontSize: "0.65rem",
        letterSpacing: "0.12em",
        fontWeight: 600,
      }}
    >
      <div className="w-8 h-px" style={{ backgroundColor: "#E63946" }} />
      {children}
      {center && <div className="w-8 h-px" style={{ backgroundColor: "#E63946" }} />}
    </div>
  );
}

function ScoreRing({ score, size = 72 }: { score: number; size?: number }) {
  const sw = size < 80 ? 5 : 7;
  const r = (size - sw * 2) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#EBEBEB" strokeWidth={sw} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E63946" strokeWidth={sw}
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text
        x="50%" y="50%" textAnchor="middle" dy="0.35em"
        fontSize={size / 5.2} fontWeight="700" fill="#1F2937"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {score}%
      </text>
    </svg>
  );
}

// ─── Roadmap + Product Card (Hero Right Panel) ─────────────────────────────
function HeroCard() {
  const dims = [
    { label: "STAR Structure", val: 78, color: "#22C55E" },
    { label: "Evidence Depth", val: 55, color: "#E63946" },
    { label: "Communication", val: 82, color: "#22C55E" },
  ];

  return (
    <div className="relative w-full" style={{ maxWidth: 580 }}>
      {/* Main card */}
      <div
        className="rounded-3xl overflow-hidden"
        style={{
          boxShadow: "0 20px 80px rgba(0,0,0,0.13), 0 4px 12px rgba(0,0,0,0.07)",
          border: "1px solid rgba(0,0,0,0.07)",
        }}
      >
        {/* ── Zone 1: Roadmap path ─────────────────────────────────── */}
        <div
          className="px-7 pt-6 pb-7"
          style={{ backgroundColor: "#FDFDFD", borderBottom: "1px solid rgba(0,0,0,0.06)" }}
        >
          <div
            className="flex items-center gap-2 mb-5"
            style={{
              color: "#E63946",
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.12em",
              fontWeight: 600,
            }}
          >
            <div className="w-4 h-px" style={{ backgroundColor: "#E63946" }} />
            YOUR CAREER ROADMAP
          </div>

          {/* 3 nodes + road */}
          <div className="relative flex items-start justify-between">
            {/* Road line (behind nodes) */}
            <div
              className="absolute pointer-events-none"
              style={{ left: 36, right: 36, top: 28 }}
            >
              <svg width="100%" height="14" viewBox="0 0 320 14" preserveAspectRatio="none">
                <rect x="0" y="3" width="320" height="8" rx="4" fill="rgba(31,41,55,0.06)" />
                <line x1="0" y1="7" x2="320" y2="7" stroke="#E63946" strokeWidth="2" strokeDasharray="14 7" strokeOpacity="0.55" />
              </svg>
            </div>

            {/* Node 1: Experience */}
            <div className="flex flex-col items-center gap-2 relative z-10" style={{ width: 72 }}>
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{
                  backgroundColor: "#FAF7F2",
                  border: "2px solid rgba(230,57,70,0.2)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                }}
              >
                <FileText size={22} style={{ color: "#E63946" }} />
              </div>
              <div className="text-center">
                <div
                  className="font-bold"
                  style={{
                    color: "#1F2937",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "0.72rem",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Experience
                </div>
                <div style={{ color: "#B0B0B0", fontSize: "0.6rem", fontFamily: "'DM Mono', monospace" }}>
                  CV or profile
                </div>
              </div>
            </div>

            {/* Node 2: Interview (active) */}
            <div className="flex flex-col items-center gap-2 relative z-10" style={{ width: 72 }}>
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center relative"
                style={{
                  backgroundColor: "#E63946",
                  boxShadow: "0 4px 18px rgba(230,57,70,0.45)",
                }}
              >
                <Mic size={22} className="text-white" />
                {/* Active glow */}
                <div
                  className="absolute -inset-1 rounded-2xl pointer-events-none"
                  style={{ border: "2px solid rgba(230,57,70,0.25)", borderRadius: 20 }}
                />
              </div>
              <div className="text-center">
                <div
                  className="font-bold"
                  style={{
                    color: "#E63946",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "0.72rem",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Interview
                </div>
                <div style={{ color: "#B0B0B0", fontSize: "0.6rem", fontFamily: "'DM Mono', monospace" }}>
                  AI HRD live
                </div>
              </div>
            </div>

            {/* Node 3: Readiness Score */}
            <div className="flex flex-col items-center gap-2 relative z-10" style={{ width: 72 }}>
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{
                  backgroundColor: "#FAF7F2",
                  border: "2px solid rgba(34,197,94,0.25)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                }}
              >
                <BarChart3 size={22} style={{ color: "#22C55E" }} />
              </div>
              <div className="text-center">
                <div
                  className="font-bold"
                  style={{
                    color: "#1F2937",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "0.72rem",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Readiness
                </div>
                <div style={{ color: "#B0B0B0", fontSize: "0.6rem", fontFamily: "'DM Mono', monospace" }}>
                  score + report
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Zone 2: Product mockup ───────────────────────────────── */}
        <div className="grid" style={{ gridTemplateColumns: "3fr 2fr", minHeight: 240 }}>
          {/* Interview stage */}
          <div
            className="p-5 flex flex-col"
            style={{ backgroundColor: "#0B0D12" }}
          >
            {/* Status bar */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1.5">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: "#E63946" }}
                />
                <span
                  style={{
                    color: "rgba(255,255,255,0.35)",
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.55rem",
                    letterSpacing: "0.12em",
                  }}
                >
                  LIVE
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'DM Mono', monospace", fontSize: "0.55rem" }}>
                  Q2/5
                </span>
                <span style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'DM Mono', monospace", fontSize: "0.55rem" }}>
                  04:21
                </span>
              </div>
            </div>

            {/* AI HRD area */}
            <div className="flex-1 flex flex-col items-center justify-center">
              {/* Avatar */}
              <div className="relative mb-3">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{ border: "1.5px solid rgba(34,197,94,0.2)", transform: "scale(1.4)" }}
                />
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(145deg, #1A1D26, #22263A)",
                    border: "2px solid rgba(34,197,94,0.3)",
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #E63946, #A50F17)" }}
                  >
                    <span style={{ fontSize: "1.2rem" }}>🎤</span>
                  </div>
                </div>
                <div
                  className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center"
                  style={{ backgroundColor: "#22C55E", borderColor: "#0B0D12" }}
                >
                  <div className="w-1 h-1 rounded-full bg-white" />
                </div>
              </div>

              <div
                className="mb-3 uppercase"
                style={{
                  color: "rgba(255,255,255,0.25)",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.5rem",
                  letterSpacing: "0.1em",
                }}
              >
                AI HRD · Listening
              </div>

              {/* Question bubble */}
              <div
                className="w-full rounded-xl p-3 mb-3"
                style={{
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <p
                  style={{
                    color: "rgba(255,255,255,0.55)",
                    fontSize: "0.62rem",
                    lineHeight: 1.65,
                  }}
                >
                  "Tell me about a project where you improved data quality at
                  scale — what was the measurable impact?"
                </p>
              </div>

              {/* Waveform */}
              <div className="flex items-end justify-center gap-px">
                {[3, 8, 14, 22, 16, 26, 19, 13, 22, 15, 9, 18, 23, 13, 5].map((h, i) => (
                  <div
                    key={i}
                    className="w-1 rounded-full"
                    style={{
                      height: h * 1.6,
                      backgroundColor: `rgba(230,57,70,${0.22 + (h / 26) * 0.6})`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Dashboard panel */}
          <div className="p-4 flex flex-col" style={{ backgroundColor: "#F8F8F8" }}>
            <div
              className="text-xs font-semibold mb-3"
              style={{
                color: "#1F2937",
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.7rem",
                letterSpacing: "-0.01em",
              }}
            >
              Readiness Score
            </div>

            <div className="flex justify-center mb-2">
              <ScoreRing score={72} size={64} />
            </div>

            <div
              className="rounded-full py-1 text-center mb-4"
              style={{
                backgroundColor: "rgba(234,179,8,0.12)",
                color: "#B45309",
                fontSize: "0.58rem",
                fontWeight: 600,
              }}
            >
              Almost Ready
            </div>

            <div className="space-y-2.5">
              {dims.map((d) => (
                <div key={d.label}>
                  <div className="flex justify-between mb-1">
                    <span style={{ color: "#888", fontSize: "0.55rem" }}>{d.label}</span>
                    <span
                      style={{
                        color: d.color,
                        fontSize: "0.55rem",
                        fontWeight: 700,
                        fontFamily: "'DM Mono', monospace",
                      }}
                    >
                      {d.val}%
                    </span>
                  </div>
                  <div className="h-1 rounded-full overflow-hidden" style={{ backgroundColor: "#E8E8E8" }}>
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${d.val}%`, backgroundColor: d.color }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Practice note */}
            <div
              className="mt-auto pt-3"
              style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}
            >
              <div
                className="text-xs"
                style={{
                  color: "#E63946",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.52rem",
                  letterSpacing: "0.06em",
                  fontWeight: 600,
                }}
              >
                NEXT: Focus on Evidence
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating badge — top right */}
      <div
        className="absolute -top-3 -right-3 px-3 py-1.5 rounded-full flex items-center gap-1.5"
        style={{
          backgroundColor: "#E63946",
          boxShadow: "0 4px 14px rgba(230,57,70,0.4)",
        }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-white opacity-90" />
        <span
          style={{
            color: "white",
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.06em",
            fontWeight: 600,
          }}
        >
          LIVE PREVIEW
        </span>
      </div>

      {/* Floating badge — bottom left */}
      <div
        className="absolute -bottom-3 -left-3 px-3 py-2 rounded-2xl"
        style={{
          backgroundColor: "#FDFDFD",
          border: "1px solid rgba(0,0,0,0.08)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <div className="text-xs font-semibold" style={{ color: "#1F2937", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.65rem" }}>
          2,000+ sessions
        </div>
        <div style={{ color: "#A0A0A0", fontSize: "0.55rem", fontFamily: "'DM Mono', monospace" }}>
          completed this month
        </div>
      </div>
    </div>
  );
}

// ─── Large Product Showcase ────────────────────────────────────────────────
function ProductShowcase() {
  const breakdown = [
    { label: "Role Relevance", score: 70 },
    { label: "STAR Structure", score: 78 },
    { label: "Evidence Specificity", score: 55 },
    { label: "Technical Accuracy", score: 62 },
    { label: "Communication Clarity", score: 82 },
    { label: "Self-Awareness", score: 68 },
  ];

  return (
    <div
      className="rounded-3xl overflow-hidden"
      style={{
        border: "1px solid rgba(0,0,0,0.07)",
        boxShadow: "0 8px 48px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      {/* Browser chrome */}
      <div
        className="h-9 flex items-center px-4 gap-3"
        style={{ backgroundColor: "#E2E2E2", borderBottom: "1px solid rgba(0,0,0,0.08)" }}
      >
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#FF5F57" }} />
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#FEBC2E" }} />
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#28C840" }} />
        </div>
        <div
          className="flex-1 mx-4 h-5 rounded flex items-center px-3"
          style={{ backgroundColor: "#D0D0D0" }}
        >
          <span style={{ color: "#666", fontFamily: "'DM Mono', monospace", fontSize: "0.6rem" }}>
            road2work.id/results
          </span>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: "55fr 45fr" }}>
        {/* Interview replay panel — dark */}
        <div
          className="p-8 flex flex-col justify-between"
          style={{ backgroundColor: "#0B0D12", minHeight: 380 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#E63946" }} />
              <span style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.1em" }}>
                SESSION COMPLETE
              </span>
            </div>
            <span style={{ color: "rgba(255,255,255,0.2)", fontFamily: "'DM Mono', monospace", fontSize: "0.62rem" }}>
              Data Analyst · Q5/5
            </span>
          </div>

          {/* Before / After answer preview */}
          <div className="space-y-4 my-6">
            <div
              className="rounded-2xl p-4"
              style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div
                className="mb-2"
                style={{ color: "rgba(230,57,70,0.7)", fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.08em" }}
              >
                YOUR ANSWER
              </div>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.8rem", lineHeight: 1.65 }}>
                "I built a dashboard that helped the team track sales better. It was used pretty often
                and they said it was helpful."
              </p>
            </div>

            <div
              className="rounded-2xl p-4"
              style={{ backgroundColor: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.15)" }}
            >
              <div
                className="mb-2"
                style={{ color: "rgba(34,197,94,0.8)", fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.08em" }}
              >
                STRONGER VERSION
              </div>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.8rem", lineHeight: 1.65 }}>
                "I built a real-time sales dashboard in Tableau tracking <strong style={{ color: "white" }}>
                4 KPIs across 3 regions</strong> for a 20-person team. It reduced weekly reporting time by{" "}
                <strong style={{ color: "white" }}>60%</strong> and became the primary tool for Monday
                pipeline reviews."
              </p>
            </div>
          </div>

          <div
            className="flex items-center gap-3 px-4 py-3 rounded-xl"
            style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.05)" }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: "rgba(230,57,70,0.15)" }}
            >
              <MessageCircle size={15} style={{ color: "#E63946" }} />
            </div>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.75rem", lineHeight: 1.6 }}>
              Evidence gap detected — missing measurable outcomes and team scale.
            </p>
          </div>
        </div>

        {/* Dashboard panel — light */}
        <div className="p-8 flex flex-col gap-6" style={{ backgroundColor: "#FDFDFD" }}>
          {/* Score + label */}
          <div className="flex items-center gap-5">
            <ScoreRing score={72} size={88} />
            <div>
              <div
                className="font-bold mb-1"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: "#1F2937",
                  fontSize: "1.1rem",
                  letterSpacing: "-0.03em",
                }}
              >
                Interview Readiness
              </div>
              <div
                className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2"
                style={{ backgroundColor: "rgba(234,179,8,0.1)", color: "#B45309" }}
              >
                Almost Ready
              </div>
              <div className="text-xs" style={{ color: "#A0A0A0" }}>
                Data Analyst · Technical Round
              </div>
            </div>
          </div>

          {/* Score breakdown */}
          <div>
            <div
              className="mb-4"
              style={{
                color: "#A0A0A0",
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.6rem",
                letterSpacing: "0.1em",
                fontWeight: 600,
              }}
            >
              SCORE BREAKDOWN
            </div>
            <div className="space-y-3.5">
              {breakdown.map((d) => (
                <div key={d.label}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-xs" style={{ color: "#656565" }}>{d.label}</span>
                    <span
                      className="text-xs font-bold"
                      style={{
                        color: d.score >= 75 ? "#22C55E" : "#E63946",
                        fontFamily: "'DM Mono', monospace",
                      }}
                    >
                      {d.score}%
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "#F0F0F0" }}>
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${d.score}%`,
                        backgroundColor: d.score >= 75 ? "#22C55E" : "#E63946",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next steps */}
          <div
            className="rounded-2xl px-4 py-3"
            style={{ backgroundColor: "rgba(230,57,70,0.04)", border: "1px solid rgba(230,57,70,0.12)" }}
          >
            <div
              className="mb-1"
              style={{
                color: "#E63946",
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.58rem",
                letterSpacing: "0.08em",
                fontWeight: 600,
              }}
            >
              NEXT FOCUS
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "#1F2937" }}>
              Practice <strong>evidence specificity</strong> — add numbers, scale,
              and measurable outcomes to your answers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Data ──────────────────────────────────────────────────────────────────
const features = [
  {
    icon: BrainCircuit,
    title: "Adaptive HRD Interview",
    desc: "Your AI HRD reads your context and asks questions tailored to your actual role and experience — not generic templates.",
  },
  {
    icon: Mic,
    title: "Voice-Only Practice",
    desc: "Answer by speaking naturally. No typing, no scripts — just you and your AI interviewer in a real-feeling session.",
  },
  {
    icon: BarChart3,
    title: "Evidence Ladder Scoring",
    desc: "Every answer is scored on the quality of evidence you provide — not just whether you used the right keywords.",
  },
  {
    icon: MessageCircle,
    title: "Clarifying Follow-Ups",
    desc: "Vague answers get follow-up questions. The AI HRD pushes back when it needs more depth — exactly like a real HRD.",
  },
  {
    icon: ArrowLeftRight,
    title: "Before–After Improvement",
    desc: "See exactly how your original answer compares to a stronger version with better structure and real evidence.",
  },
  {
    icon: LayoutDashboard,
    title: "Readiness Dashboard",
    desc: "A complete score across 6 dimensions with specific next steps. Not just a number — a roadmap for improvement.",
  },
];

const steps = [
  {
    icon: Target,
    num: "01",
    title: "Choose Target Role",
    desc: "Pick from Data & AI, Software Engineering, and more. We'll customize everything to your target.",
  },
  {
    icon: FileUp,
    num: "02",
    title: "Upload CV or Fill Profile",
    desc: "Give your AI HRD context — upload your CV or fill a short 4-field profile about your experience.",
  },
  {
    icon: Mic2,
    num: "03",
    title: "Live Voice Interview",
    desc: "Enter the interview room and practice with an adaptive AI HRD that listens and follows up in real time.",
  },
  {
    icon: PieChart,
    num: "04",
    title: "Get Your Dashboard",
    desc: "Receive a full readiness report with scores, insights, and a targeted next practice recommendation.",
  },
];

const roles = ["Data Analyst", "Data Scientist", "AI Engineer", "ML Engineer", "Backend Developer"];

// ─── Page ──────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div style={{ backgroundColor: "#FAF7F2" }}>
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="pt-32 pb-24 px-6 overflow-hidden" style={{ backgroundColor: "#FAF7F2" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-11 gap-12 xl:gap-20 items-center">

            {/* ── Left text (5/11) ─────────────────────────────────────── */}
            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
            >
              {/* Eyebrow */}
              <div
                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border mb-8"
                style={{
                  backgroundColor: "rgba(230,57,70,0.05)",
                  borderColor: "rgba(230,57,70,0.2)",
                  color: "#E63946",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.62rem",
                  letterSpacing: "0.08em",
                  fontWeight: 600,
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#E63946" }} />
                AI-POWERED INTERVIEW READINESS
              </div>

              {/* Headline */}
              <h1
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "clamp(2.8rem, 5vw, 4.4rem)",
                  fontWeight: 800,
                  lineHeight: 1.0,
                  letterSpacing: "-0.045em",
                  color: "#1F2937",
                }}
              >
                From experience
                <br />
                to readiness —
                <br />
                <span style={{ color: "#E63946" }}>in one session.</span>
              </h1>

              <p
                className="mt-7 leading-relaxed"
                style={{
                  color: "#656565",
                  maxWidth: 420,
                  fontSize: "1.05rem",
                  lineHeight: 1.78,
                }}
              >
                Practice role-specific interviews with an adaptive AI HRD that
                listens, pushes back, and scores your readiness across 6
                dimensions — all from your actual experience.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-start gap-3 mt-9">
                <Link
                  to="/signup"
                  className="px-7 py-4 rounded-full font-bold text-white no-underline inline-flex items-center gap-2 transition-all"
                  style={{
                    backgroundColor: "#E63946",
                    boxShadow: ctaShadow,
                    fontSize: "0.95rem",
                    fontFamily: "'Space Grotesk', sans-serif",
                    letterSpacing: "-0.01em",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "#C1121F";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(230,57,70,0.38), 0 2px 6px rgba(0,0,0,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "#E63946";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = ctaShadow;
                  }}
                >
                  Start Interview Practice
                  <ArrowRight size={15} />
                </Link>
                <Link
                  to="/how-it-works"
                  className="px-7 py-4 rounded-full font-medium no-underline inline-flex items-center gap-2 transition-all border"
                  style={{
                    color: "#1F2937",
                    borderColor: "rgba(0,0,0,0.1)",
                    backgroundColor: "#FDFDFD",
                    fontSize: "0.95rem",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#1F2937";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.07)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.1)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 2px rgba(0,0,0,0.04)";
                  }}
                >
                  See How It Works
                  <ChevronRight size={15} />
                </Link>
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-4 mt-8 pt-8" style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}>
                <div className="flex -space-x-2">
                  {["#E63946", "#1F2937", "#E63946", "#374151"].map((c, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold text-white"
                      style={{ backgroundColor: c, borderColor: "#FAF7F2" }}
                    >
                      {["S", "A", "D", "R"][i]}
                    </div>
                  ))}
                </div>
                <p style={{ color: "#656565", fontSize: "0.82rem" }}>
                  Joined by <strong style={{ color: "#1F2937" }}>2,000+</strong>{" "}
                  early career professionals
                </p>
              </div>
            </motion.div>

            {/* ── Right visual (6/11) ──────────────────────────────────── */}
            <motion.div
              className="lg:col-span-6 flex justify-center lg:justify-end"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, delay: 0.12 }}
            >
              <HeroCard />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Trust strip ──────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#1F2937" }} className="py-5 relative overflow-hidden">
        <div className="absolute inset-y-0 left-0 right-0 flex items-center pointer-events-none">
          <svg width="100%" height="4" viewBox="0 0 1440 4" preserveAspectRatio="none" style={{ opacity: 0.08 }}>
            <line x1="0" y1="2" x2="1440" y2="2" stroke="#E63946" strokeWidth="2" strokeDasharray="20 10" />
          </svg>
        </div>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-14">
            {[
              "Role-Specific Questions",
              "Voice-Based Practice",
              "Evidence-Focused Scoring",
              "Adaptive Follow-Ups",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div className="w-1 h-1 rounded-full" style={{ backgroundColor: "#E63946", opacity: 0.9 }} />
                <span
                  className="text-sm font-medium whitespace-nowrap"
                  style={{
                    color: "rgba(255,255,255,0.65)",
                    fontFamily: "'Space Grotesk', sans-serif",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Problem ──────────────────────────────────────────────────── */}
      <section className="py-28 px-6" style={{ backgroundColor: "#FAF7F2" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <SectionLabel>THE PROBLEM</SectionLabel>
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                color: "#1F2937",
                lineHeight: 1.08,
                maxWidth: 680,
              }}
            >
              You have the experience.{" "}
              <span style={{ color: "#E63946" }}>The challenge is proving it.</span>
            </h2>
            <p
              className="mt-5 leading-relaxed"
              style={{ color: "#656565", maxWidth: 500, fontSize: "1.05rem", lineHeight: 1.72 }}
            >
              Most candidates fail not because they lack skills — but because
              they can't articulate their experience clearly under pressure.
              Generic prep doesn't fix that.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: "💬",
                label: "Vague answers",
                desc: "Without clear structure, strong experience sounds weak to hiring managers.",
                num: "01",
              },
              {
                icon: "📋",
                label: "No evidence",
                desc: "Stories without data, scale, or measurable outcomes lack credibility.",
                num: "02",
              },
              {
                icon: "🔍",
                label: "Unprepared follow-ups",
                desc: "Real HRDs dig deeper when answers are thin. Most candidates aren't ready for that.",
                num: "03",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl p-7 relative overflow-hidden transition-all"
                style={card}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.08), 0 24px 48px rgba(0,0,0,0.06)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = card.boxShadow;
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-0.5"
                  style={{ backgroundColor: "#E63946", opacity: 0.35 }}
                />
                <div
                  className="absolute top-4 right-5 font-black opacity-[0.04]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#E63946", fontSize: "2.5rem" }}
                >
                  {item.num}
                </div>
                <div className="text-2xl mb-5">{item.icon}</div>
                <div
                  className="font-bold mb-2"
                  style={{
                    color: "#1F2937",
                    fontFamily: "'Space Grotesk', sans-serif",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {item.label}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "#656565", lineHeight: 1.7 }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Large Product Showcase ────────────────────────────────────── */}
      <section className="py-28 px-6" style={{ backgroundColor: "#FDFDFD" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <SectionLabel>THE PRODUCT</SectionLabel>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <h2
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  color: "#1F2937",
                  lineHeight: 1.1,
                  maxWidth: 520,
                }}
              >
                Every session ends with a clear path forward.
              </h2>
              <p style={{ color: "#656565", maxWidth: 280, fontSize: "0.95rem", lineHeight: 1.7 }}>
                See the interview replay, understand your gaps, and know exactly
                what to work on next.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
            <ProductShowcase />
          </motion.div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────── */}
      <section id="features" className="py-28 px-6" style={{ backgroundColor: "#FAF7F2" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <SectionLabel>FEATURES</SectionLabel>
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                color: "#1F2937",
                maxWidth: 560,
                lineHeight: 1.1,
              }}
            >
              Everything you need to interview with confidence.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="rounded-2xl p-7 transition-all cursor-default"
                style={card}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.08), 0 24px 48px rgba(0,0,0,0.07)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = card.boxShadow;
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: "rgba(230,57,70,0.08)" }}
                >
                  <f.icon size={20} style={{ color: "#E63946" }} />
                </div>
                <h3
                  className="font-bold mb-2.5"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    color: "#1F2937",
                    letterSpacing: "-0.02em",
                    fontSize: "1rem",
                  }}
                >
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#656565", lineHeight: 1.72 }}>
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────── */}
      <section className="py-28 px-6" style={{ backgroundColor: "#FDFDFD" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <SectionLabel>HOW IT WORKS</SectionLabel>
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                color: "#1F2937",
                lineHeight: 1.1,
              }}
            >
              Four steps to interview readiness.
            </h2>
          </motion.div>

          <div className="relative">
            {/* Road connector (desktop) */}
            <div className="absolute top-11 left-0 right-0 hidden lg:block pointer-events-none">
              <div style={{ paddingLeft: "13%", paddingRight: "13%" }}>
                <svg width="100%" height="22" viewBox="0 0 800 22" preserveAspectRatio="none">
                  <rect x="0" y="7" width="800" height="8" rx="4" fill="rgba(31,41,55,0.06)" />
                  <line x1="0" y1="11" x2="800" y2="11" stroke="#E63946" strokeWidth="2" strokeDasharray="24 14" strokeOpacity="0.4" />
                </svg>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="relative z-10 mb-6">
                    <div
                      className="flex items-center justify-center"
                      style={{
                        width: 88,
                        height: 88,
                        backgroundColor: "#FDFDFD",
                        border: "1px solid rgba(0,0,0,0.08)",
                        borderRadius: 24,
                        boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 8px 28px rgba(0,0,0,0.07)",
                      }}
                    >
                      <step.icon size={30} style={{ color: "#E63946" }} />
                    </div>
                    <div
                      className="absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: "#E63946",
                        color: "white",
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        boxShadow: "0 2px 8px rgba(230,57,70,0.35)",
                      }}
                    >
                      {i + 1}
                    </div>
                  </div>
                  <div
                    className="text-xs font-bold uppercase mb-1.5"
                    style={{
                      color: "#E63946",
                      fontFamily: "'DM Mono', monospace",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {step.num}
                  </div>
                  <h3
                    className="font-bold mb-2"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      color: "#1F2937",
                      letterSpacing: "-0.02em",
                      fontSize: "1rem",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm" style={{ color: "#656565", lineHeight: 1.68 }}>
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-16"
          >
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-bold text-white no-underline transition-all"
              style={{
                backgroundColor: "#E63946",
                boxShadow: ctaShadow,
                fontFamily: "'Space Grotesk', sans-serif",
                letterSpacing: "-0.01em",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "#C1121F";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(230,57,70,0.38)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "#E63946";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = ctaShadow;
              }}
            >
              Start Interview Practice
              <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Role Coverage ─────────────────────────────────────────────── */}
      <section className="py-20 px-6" style={{ backgroundColor: "#FAF7F2" }}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel>ROLE COVERAGE</SectionLabel>
            <h2
              className="mb-8"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                color: "#1F2937",
                lineHeight: 1.1,
              }}
            >
              Practice for the roles that matter.
            </h2>
            <div className="flex flex-wrap items-center gap-3">
              {roles.map((role, i) => (
                <div
                  key={i}
                  className="px-5 py-2.5 rounded-full text-sm font-medium transition-all cursor-default"
                  style={{
                    backgroundColor: "#FDFDFD",
                    border: "1px solid rgba(0,0,0,0.08)",
                    color: "#1F2937",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04)",
                    letterSpacing: "-0.01em",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  {role}
                </div>
              ))}
              <div
                className="px-5 py-2.5 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: "rgba(230,57,70,0.05)",
                  color: "#E63946",
                  border: "1px dashed rgba(230,57,70,0.3)",
                  letterSpacing: "-0.01em",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                + More coming soon
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────── */}
      <section className="py-28 px-6" style={{ backgroundColor: "#1F2937" }}>
        <div className="max-w-3xl mx-auto text-center relative">
          {/* Road decoration */}
          <div className="absolute inset-x-0 -top-1 opacity-12 pointer-events-none">
            <svg width="100%" height="10" viewBox="0 0 800 10" preserveAspectRatio="none">
              <rect x="0" y="1" width="800" height="8" rx="4" fill="white" opacity="0.05" />
              <line x1="0" y1="5" x2="800" y2="5" stroke="#E63946" strokeWidth="2" strokeDasharray="20 10" opacity="0.4" />
            </svg>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="flex items-center justify-center gap-3 mb-8"
              style={{
                color: "rgba(255,255,255,0.25)",
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.62rem",
                letterSpacing: "0.14em",
              }}
            >
              <div className="w-8 h-px" style={{ backgroundColor: "rgba(255,255,255,0.25)" }} />
              START YOUR PRACTICE
              <div className="w-8 h-px" style={{ backgroundColor: "rgba(255,255,255,0.25)" }} />
            </div>

            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
                fontWeight: 800,
                letterSpacing: "-0.045em",
                color: "white",
                lineHeight: 1.05,
              }}
            >
              Ready to practice like
              <br />
              it's the{" "}
              <span style={{ color: "#E63946" }}>real interview?</span>
            </h2>

            <p
              className="mt-6 text-lg"
              style={{
                color: "rgba(255,255,255,0.45)",
                maxWidth: 420,
                margin: "1.5rem auto 0",
                lineHeight: 1.75,
              }}
            >
              Build confidence before it counts. A session built around your
              actual experience — not generic prep.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
              <Link
                to="/signup"
                className="px-8 py-4 rounded-full font-bold text-white no-underline inline-flex items-center gap-2 transition-all"
                style={{
                  backgroundColor: "#E63946",
                  boxShadow: ctaShadow,
                  fontFamily: "'Space Grotesk', sans-serif",
                  letterSpacing: "-0.01em",
                  fontSize: "1rem",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "#C1121F";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(230,57,70,0.45)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "#E63946";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = ctaShadow;
                }}
              >
                Start Interview Practice
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/login"
                className="text-sm no-underline font-medium transition-all"
                style={{ color: "rgba(255,255,255,0.4)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
              >
                Already have an account? Sign in →
              </Link>
            </div>

            {/* Bottom road divider */}
            <div className="mt-16 flex items-center justify-center gap-2">
              {[20, 12, 7, 4, 2].map((w, i) => (
                <div
                  key={i}
                  className="h-px rounded-full"
                  style={{ width: w, backgroundColor: "#E63946", opacity: 0.35 - i * 0.05 }}
                />
              ))}
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#E63946", opacity: 0.4 }} />
              {[2, 4, 7, 12, 20].map((w, i) => (
                <div
                  key={i}
                  className="h-px rounded-full"
                  style={{ width: w, backgroundColor: "#E63946", opacity: 0.1 + i * 0.05 }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
