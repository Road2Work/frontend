import { Link } from "react-router";
import { ArrowRight, Flame, Target, BarChart2, Lightbulb, ChevronRight } from "lucide-react";
import { AppHeader } from "../components/AppHeader";
import { motion } from "motion/react";

const card = {
  backgroundColor: "#FDFDFD",
  border: "1px solid rgba(0,0,0,0.07)",
  borderRadius: 20,
  boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 6px 24px rgba(0,0,0,0.05)",
};

function MiniScoreRing({ score, size = 48 }: { score: number; size?: number }) {
  const sw = 4;
  const r = (size - sw * 2) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#F0F0F0" strokeWidth={sw} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E63946" strokeWidth={sw}
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text
        x="50%" y="50%" textAnchor="middle" dy="0.35em"
        fontSize={size / 4.2} fontWeight="700" fill="#1F2937"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {score}%
      </text>
    </svg>
  );
}

const statCards = [
  { icon: BarChart2, label: "Last Score", value: "72%", sub: "Almost Ready", iconColor: "#E63946", iconBg: "rgba(230,57,70,0.08)" },
  { icon: Target, label: "Target Role", value: "Data Analyst", sub: "Information Technology", iconColor: "#1F2937", iconBg: "rgba(31,41,55,0.07)" },
  { icon: Flame, label: "Practice Streak", value: "3 days", sub: "Keep it going! 🔥", iconColor: "#F97316", iconBg: "rgba(249,115,22,0.08)" },
  { icon: Lightbulb, label: "Next Focus", value: "Evidence", sub: "Specificity gap", iconColor: "#8B5CF6", iconBg: "rgba(139,92,246,0.08)" },
];

export default function ReadinessHub() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAF7F2" }}>
      <AppHeader
        backTo="/"
        backLabel="Back to Home"
        right={
          <div className="flex items-center gap-3">
            <span className="text-sm hidden sm:block" style={{ color: "#656565" }}>
              Sari Dewi
            </span>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
              style={{
                background: "linear-gradient(135deg, #E63946 0%, #A50F17 100%)",
                color: "white",
                fontFamily: "'Space Grotesk', sans-serif",
                boxShadow: "0 2px 8px rgba(230,57,70,0.25)",
              }}
            >
              S
            </div>
          </div>
        }
      />

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div
            className="text-xs font-medium mb-2"
            style={{
              color: "#E63946",
              fontFamily: "'DM Mono', monospace",
              letterSpacing: "0.08em",
            }}
          >
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </div>
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(1.7rem, 3vw, 2.2rem)",
              fontWeight: 800,
              color: "#1F2937",
              letterSpacing: "-0.04em",
            }}
          >
            Hi Sari, ready to practice? 👋
          </h1>
          <p className="mt-2" style={{ color: "#656565" }}>
            Your last session was 2 days ago. Keep the momentum going.
          </p>
        </motion.div>

        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.06 }}
        >
          <Link to="/start" className="no-underline block mb-5">
            <div
              className="rounded-3xl p-8 text-white flex items-center justify-between group transition-all"
              style={{
                background: "linear-gradient(135deg, #E63946 0%, #A50F17 100%)",
                boxShadow: "0 8px 32px rgba(230,57,70,0.25), 0 2px 8px rgba(0,0,0,0.1)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 12px 40px rgba(230,57,70,0.35), 0 4px 12px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 8px 32px rgba(230,57,70,0.25), 0 2px 8px rgba(0,0,0,0.1)";
              }}
            >
              <div>
                <div
                  className="text-xs font-semibold mb-2 uppercase tracking-widest opacity-70"
                  style={{ fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em" }}
                >
                  CONTINUE PRACTICE
                </div>
                <h2
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "1.5rem",
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                  }}
                >
                  Start New Interview
                </h2>
                <p className="mt-1 opacity-60 text-sm">
                  Data Analyst · 5 questions · ~15 min
                </p>
              </div>
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-all"
                style={{ backgroundColor: "rgba(255,255,255,0.18)" }}
              >
                <ArrowRight size={20} className="text-white" />
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
          {statCards.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
              className="rounded-2xl p-5 transition-all"
              style={card}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 4px 16px rgba(0,0,0,0.08), 0 24px 48px rgba(0,0,0,0.06)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = card.boxShadow;
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                style={{ backgroundColor: c.iconBg }}
              >
                <c.icon size={16} style={{ color: c.iconColor }} />
              </div>
              <div className="text-xs mb-1" style={{ color: "#A0A0A0", fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.06em" }}>
                {c.label}
              </div>
              <div
                className="font-bold text-sm leading-tight"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: "#1F2937",
                  letterSpacing: "-0.02em",
                }}
              >
                {c.value}
              </div>
              <div className="text-xs mt-0.5" style={{ color: "#A0A0A0", fontSize: "0.72rem" }}>
                {c.sub}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent sessions */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="rounded-2xl overflow-hidden mb-5"
          style={card}
        >
          <div
            className="flex items-center justify-between px-6 py-4 border-b"
            style={{ borderColor: "rgba(0,0,0,0.06)" }}
          >
            <h3
              className="font-bold"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: "#1F2937",
                letterSpacing: "-0.02em",
              }}
            >
              Recent Sessions
            </h3>
            <Link
              to="/results"
              className="text-xs no-underline font-medium flex items-center gap-1"
              style={{ color: "#E63946" }}
            >
              View all <ChevronRight size={12} />
            </Link>
          </div>
          {[
            { role: "Data Analyst", date: "2 days ago", score: 72, status: "Almost Ready", statusColor: "#B45309", statusBg: "rgba(234,179,8,0.1)" },
            { role: "Data Scientist", date: "5 days ago", score: 58, status: "Needs Practice", statusColor: "#DC2626", statusBg: "rgba(239,68,68,0.08)" },
          ].map((session, i) => (
            <Link
              key={i}
              to="/results"
              className="no-underline flex items-center justify-between px-6 py-4 border-b last:border-b-0 transition-all"
              style={{ borderColor: "rgba(0,0,0,0.05)" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.backgroundColor = "#FAF7F2")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.backgroundColor = "transparent")
              }
            >
              <div className="flex items-center gap-4">
                <MiniScoreRing score={session.score} />
                <div>
                  <div className="font-semibold text-sm" style={{ color: "#1F2937", letterSpacing: "-0.01em" }}>
                    {session.role}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "#A0A0A0" }}>
                    {session.date}
                  </div>
                </div>
              </div>
              <div
                className="px-3 py-1 rounded-full text-xs font-semibold"
                style={{ backgroundColor: session.statusBg, color: session.statusColor }}
              >
                {session.status}
              </div>
            </Link>
          ))}
        </motion.div>

        {/* Next practice recommendation */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="rounded-2xl p-6"
          style={{
            backgroundColor: "rgba(230,57,70,0.03)",
            border: "1px solid rgba(230,57,70,0.13)",
            borderRadius: 20,
          }}
        >
          <div
            className="flex items-center gap-2 mb-3"
            style={{
              color: "#E63946",
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.62rem",
              letterSpacing: "0.12em",
              fontWeight: 600,
            }}
          >
            <div className="w-4 h-px" style={{ backgroundColor: "#E63946" }} />
            SUGGESTED NEXT PRACTICE
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "#1F2937" }}>
            Focus on <strong>evidence specificity</strong> — use the STAR method
            and include specific numbers or measurable outcomes in your next
            session.
          </p>
          <Link
            to="/start"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold no-underline"
            style={{ color: "#E63946" }}
          >
            Practice now <ArrowRight size={14} />
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
