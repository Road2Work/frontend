import { useState } from "react";
import { useNavigate } from "react-router";
import { Mic, Volume2, MessageSquare, Star, ArrowRight, Check, Shield } from "lucide-react";
import { AppHeader } from "../components/AppHeader";
import { motion } from "motion/react";

const card = {
  backgroundColor: "#FDFDFD",
  border: "1px solid rgba(0,0,0,0.07)",
  borderRadius: 20,
  boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 6px 24px rgba(0,0,0,0.05)",
};

const checklist = [
  {
    icon: Mic,
    label: "Microphone ready",
    desc: "Check that your mic is connected and working.",
  },
  {
    icon: Volume2,
    label: "Quiet room",
    desc: "Find a space with minimal background noise.",
  },
  {
    icon: MessageSquare,
    label: "Answer naturally",
    desc: "Speak as you would in a real interview — no need to be perfect.",
  },
  {
    icon: Star,
    label: "Use examples and evidence",
    desc: "The AI HRD looks for specific, concrete details in your answers.",
  },
];

export default function InterviewOnboarding() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  const toggleCheck = (i: number) => {
    setChecked((c) => ({ ...c, [i]: !c[i] }));
  };

  const allChecked = checklist.every((_, i) => checked[i]);
  const checkedCount = Object.values(checked).filter(Boolean).length;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAF7F2" }}>
      <AppHeader backTo="/setup" backLabel="Back to Setup" />

      <main className="max-w-xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Section label */}
          <div
            className="flex items-center gap-3 mb-4"
            style={{
              color: "#E63946",
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.12em",
              fontWeight: 600,
            }}
          >
            <div className="w-8 h-px" style={{ backgroundColor: "#E63946" }} />
            ALMOST THERE
          </div>

          <h1
            className="mb-2"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(1.6rem, 3vw, 2rem)",
              fontWeight: 800,
              color: "#1F2937",
              letterSpacing: "-0.04em",
            }}
          >
            Ready to go live?
          </h1>
          <p className="mb-8 text-sm leading-relaxed" style={{ color: "#656565" }}>
            Run through the checklist below, then start your live session.
          </p>

          {/* Session summary card */}
          <div
            className="rounded-2xl p-6 mb-5"
            style={card}
          >
            <div
              className="text-xs font-semibold uppercase tracking-widest mb-5 flex items-center gap-2"
              style={{
                color: "#E63946",
                fontFamily: "'DM Mono', monospace",
                letterSpacing: "0.1em",
              }}
            >
              YOUR SESSION
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Role", value: "Data Analyst", mono: false },
                { label: "Duration", value: "~15 min", mono: true },
                { label: "Questions", value: "5 main", mono: true },
              ].map((item) => (
                <div key={item.label}>
                  <div
                    className="text-xs mb-1"
                    style={{
                      color: "#A0A0A0",
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.6rem",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    className="font-bold"
                    style={{
                      color: "#1F2937",
                      fontFamily: item.mono ? "'DM Mono', monospace" : "'Space Grotesk', sans-serif",
                      letterSpacing: item.mono ? "0" : "-0.01em",
                    }}
                  >
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Mini progress bar */}
            <div className="mt-5 pt-5" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
              <div className="flex items-center justify-between mb-2">
                <span
                  className="text-xs"
                  style={{
                    color: "#A0A0A0",
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.6rem",
                    letterSpacing: "0.06em",
                  }}
                >
                  CHECKLIST
                </span>
                <span
                  className="text-xs font-bold"
                  style={{
                    color: allChecked ? "#22C55E" : "#E63946",
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.65rem",
                  }}
                >
                  {checkedCount}/{checklist.length}
                </span>
              </div>
              <div
                className="w-full rounded-full overflow-hidden"
                style={{ height: 4, backgroundColor: "#F0F0F0" }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: allChecked ? "#22C55E" : "#E63946" }}
                  animate={{ width: `${(checkedCount / checklist.length) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>
          </div>

          {/* How it works note */}
          <div
            className="rounded-2xl p-5 mb-6"
            style={{
              backgroundColor: "rgba(230,57,70,0.03)",
              border: "1px solid rgba(230,57,70,0.13)",
              borderRadius: 16,
            }}
          >
            <div
              className="flex items-center gap-2 mb-2"
              style={{
                color: "#E63946",
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.6rem",
                letterSpacing: "0.1em",
                fontWeight: 600,
              }}
            >
              <div className="w-3 h-px" style={{ backgroundColor: "#E63946" }} />
              HOW IT WORKS
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "#1F2937" }}>
              Answer each question by <strong>voice</strong>. Your AI HRD listens and may ask
              follow-up questions if your answer needs more detail or stronger evidence.
              Be specific — use real examples from your experience.
            </p>
          </div>

          {/* Checklist */}
          <div className="space-y-3 mb-8">
            {checklist.map((item, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.07 }}
                onClick={() => toggleCheck(i)}
                className="w-full text-left rounded-2xl flex items-center gap-4 transition-all"
                style={{
                  padding: "1rem 1.25rem",
                  backgroundColor: checked[i] ? "rgba(34,197,94,0.04)" : "#FDFDFD",
                  border: checked[i] ? "2px solid rgba(34,197,94,0.25)" : "1px solid rgba(0,0,0,0.07)",
                  borderRadius: 16,
                  boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
                }}
                onMouseEnter={(e) => {
                  if (!checked[i]) {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 12px rgba(0,0,0,0.07)";
                  }
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 2px rgba(0,0,0,0.03)";
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all"
                  style={{
                    backgroundColor: checked[i]
                      ? "rgba(34,197,94,0.12)"
                      : "rgba(230,57,70,0.07)",
                  }}
                >
                  {checked[i] ? (
                    <Check size={18} style={{ color: "#22C55E" }} />
                  ) : (
                    <item.icon size={18} style={{ color: "#E63946" }} />
                  )}
                </div>
                <div className="flex-1">
                  <div
                    className="font-semibold text-sm transition-all"
                    style={{
                      color: "#1F2937",
                      fontFamily: "'Space Grotesk', sans-serif",
                      textDecoration: checked[i] ? "line-through" : "none",
                      opacity: checked[i] ? 0.4 : 1,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {item.label}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "#A0A0A0" }}>
                    {item.desc}
                  </div>
                </div>
                <div
                  className="w-5 h-5 rounded-full shrink-0 flex items-center justify-center transition-all"
                  style={{
                    backgroundColor: checked[i] ? "#22C55E" : "transparent",
                    border: checked[i] ? "none" : "2px solid #E0E0E0",
                  }}
                >
                  {checked[i] && <Check size={11} className="text-white" />}
                </div>
              </motion.button>
            ))}
          </div>

          {!allChecked && (
            <p className="text-center text-sm mb-4" style={{ color: "#A0A0A0" }}>
              Check all {checklist.length} items to unlock your session
            </p>
          )}

          <motion.button
            onClick={() => navigate("/interview")}
            disabled={!allChecked}
            className="w-full py-4 rounded-full font-bold text-white flex items-center justify-center gap-2 transition-all"
            style={{
              backgroundColor: allChecked ? "#E63946" : "#E0E0E0",
              cursor: allChecked ? "pointer" : "not-allowed",
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: "-0.01em",
              boxShadow: allChecked
                ? "0 4px 20px rgba(230,57,70,0.32), 0 1px 3px rgba(0,0,0,0.1)"
                : "none",
            }}
            animate={{
              backgroundColor: allChecked ? "#E63946" : "#E0E0E0",
            }}
            onMouseEnter={(e) => {
              if (allChecked) {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(230,57,70,0.38), 0 2px 6px rgba(0,0,0,0.12)";
                (e.currentTarget as HTMLElement).style.backgroundColor = "#C1121F";
              }
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              if (allChecked) {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(230,57,70,0.32), 0 1px 3px rgba(0,0,0,0.1)";
                (e.currentTarget as HTMLElement).style.backgroundColor = "#E63946";
              }
            }}
          >
            {allChecked ? "Start Live Interview" : `Complete checklist (${checkedCount}/${checklist.length})`}
            {allChecked && <ArrowRight size={18} />}
          </motion.button>

          <div
            className="flex items-center justify-center gap-2 mt-4 text-xs"
            style={{ color: "#C0C0C0" }}
          >
            <Shield size={12} />
            Session evaluated privately. No data shared externally.
          </div>
        </motion.div>
      </main>
    </div>
  );
}
