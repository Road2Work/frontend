import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { Mic, MicOff, X, Square } from "lucide-react";
import { Logo } from "../components/Logo";
import { motion, AnimatePresence } from "motion/react";

// ─── Types & data ──────────────────────────────────────────────────────────
type InterviewState = "asking" | "listening" | "thinking" | "clarifying";

const questions = [
  "Can you describe a project where you used SQL to solve a real business problem — and what was the measurable outcome?",
  "How did you communicate your findings to non-technical stakeholders? Walk me through a specific example.",
  "Tell me about a time you found an unexpected insight in the data. What was the impact, and how did you act on it?",
  "What tools do you use for data visualization and why — have you ever switched tools mid-project?",
  "How do you ensure data quality before starting an analysis? Give me a concrete process you've followed.",
];

const clarifyingQuestion =
  "You mentioned the dashboard was helpful — can you be more specific about the scale of the data, and the measurable impact on the team's workflow?";

const stateConfig: Record<InterviewState, { label: string; color: string; badgeBg: string; badgeBorder: string; ringColor: string; glowColor: string; hint: string }> = {
  asking: {
    label: "Asking",
    color: "rgba(255,255,255,0.55)",
    badgeBg: "rgba(255,255,255,0.094)",
    badgeBorder: "rgba(255,255,255,0.188)",
    ringColor: "rgba(255,255,255,0.12)",
    glowColor: "rgba(100,120,200,0.12)",
    hint: "Press the mic when you're ready to answer",
  },
  listening: {
    label: "Listening",
    color: "#22C55E",
    badgeBg: "rgba(34,197,94,0.094)",
    badgeBorder: "rgba(34,197,94,0.188)",
    ringColor: "#22C55E",
    glowColor: "rgba(34,197,94,0.14)",
    hint: "Speaking… press again when you're done",
  },
  thinking: {
    label: "Thinking",
    color: "#F59E0B",
    badgeBg: "rgba(245,158,11,0.094)",
    badgeBorder: "rgba(245,158,11,0.188)",
    ringColor: "#F59E0B",
    glowColor: "rgba(245,158,11,0.12)",
    hint: "Your AI HRD is evaluating your answer…",
  },
  clarifying: {
    label: "Clarifying",
    color: "#E63946",
    badgeBg: "rgba(230,57,70,0.094)",
    badgeBorder: "rgba(230,57,70,0.188)",
    ringColor: "#E63946",
    glowColor: "rgba(230,57,70,0.14)",
    hint: "Follow-up question — press mic to respond",
  },
};

// ─── Pulse rings ───────────────────────────────────────────────────────────
function PulseRings({ active, color }: { active: boolean; color: string }) {
  return (
    <>
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{ border: `1.5px solid ${color}` }}
          animate={
            active
              ? { scale: [1, 1 + i * 0.28], opacity: [0.55, 0] }
              : { scale: 1, opacity: 0 }
          }
          transition={{ duration: 2, delay: i * 0.5, repeat: Infinity, ease: "easeOut" }}
        />
      ))}
    </>
  );
}

// ─── Waveform bars ─────────────────────────────────────────────────────────
function WaveformBars({ active, color = "#22C55E" }: { active: boolean; color?: string }) {
  const heights = [4, 10, 18, 28, 22, 36, 26, 16, 30, 20, 12, 24, 32, 16, 7];
  return (
    <div className="flex items-end justify-center gap-1" style={{ height: 48, width: "100%" }}>
      {heights.map((h, i) => (
        <motion.div
          key={i}
          className="rounded-full flex-1"
          style={{ maxWidth: 4, backgroundColor: color }}
          animate={
            active
              ? { height: [h * 0.3, h, h * 1.5, h * 0.8, h * 0.3], opacity: [0.3, 0.8, 1, 0.7, 0.3] }
              : { height: 3, opacity: active ? 0.2 : 0.1 }
          }
          transition={
            active
              ? { duration: 0.6 + (i % 5) * 0.1, repeat: Infinity, ease: "easeInOut", delay: i * 0.035 }
              : { duration: 0.3 }
          }
        />
      ))}
    </div>
  );
}

// ─── Progress dots ─────────────────────────────────────────────────────────
function ProgressDots({ total, current }: { total: number; current: number }) {
  return (
    <div className="flex items-center justify-center gap-0 px-6 py-4">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center">
          <motion.div
            className="rounded-full transition-all duration-400"
            animate={{
              width: i === current ? 28 : 8,
              height: 8,
              backgroundColor:
                i < current
                  ? "#E63946"
                  : i === current
                  ? "#E63946"
                  : "rgba(255,255,255,0.12)",
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
          {i < total - 1 && (
            <div
              className="h-px"
              style={{
                width: 20,
                backgroundColor: i < current ? "rgba(230,57,70,0.5)" : "rgba(255,255,255,0.08)",
                transition: "background-color 0.4s",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── HRD Video Frame ───────────────────────────────────────────────────────
function HRDFrame({ state, cfg }: { state: InterviewState; cfg: typeof stateConfig[InterviewState] }) {
  const isActive = state === "listening" || state === "clarifying";
  const isSpeaking = state === "asking" || state === "clarifying";

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        borderRadius: 28,
        // Slot for actual WebM: <video autoPlay loop muted playsInline src="hrd.webm" className="absolute inset-0 w-full h-full object-cover" />
        background: "radial-gradient(ellipse at 50% 38%, #1A1E30 0%, #0D0F18 55%, #080A10 100%)",
        border: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "0 40px 100px rgba(0,0,0,0.6), 0 8px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
        minHeight: "clamp(260px, 46vh, 420px)",
      }}
    >
      {/* State-reactive ambient glow */}
      <AnimatePresence mode="sync">
        <motion.div
          key={state + "-glow"}
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            background: `radial-gradient(ellipse at 50% 50%, ${cfg.glowColor} 0%, transparent 65%)`,
          }}
        />
      </AnimatePresence>

      {/* Bokeh environment (simulates an office background) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { w: 160, h: 100, x: "8%", y: "12%", blur: 40, op: 0.025 },
          { w: 80, h: 80, x: "78%", y: "20%", blur: 28, op: 0.02 },
          { w: 120, h: 70, x: "60%", y: "65%", blur: 35, op: 0.018 },
          { w: 60, h: 60, x: "20%", y: "72%", blur: 22, op: 0.02 },
        ].map((b, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: b.w,
              height: b.h,
              left: b.x,
              top: b.y,
              background: "white",
              filter: `blur(${b.blur}px)`,
              opacity: b.op,
            }}
          />
        ))}
      </div>

      {/* Studio light top gradient */}
      <div
        className="absolute inset-x-0 top-0 pointer-events-none"
        style={{
          height: "35%",
          background: "linear-gradient(to bottom, rgba(255,255,255,0.025) 0%, transparent 100%)",
        }}
      />

      {/* Corner vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(0,0,0,0.45) 100%)",
        }}
      />

      {/* Subtle horizontal scan lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.025) 3px, rgba(0,0,0,0.025) 4px)",
          mixBlendMode: "multiply",
        }}
      />

      {/* ── Central avatar ─────────────────────────────────────────────── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="relative flex items-center justify-center" style={{ width: 148, height: 148 }}>
          {/* Pulse rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative" style={{ width: 148, height: 148 }}>
              <PulseRings active={isActive || isSpeaking} color={cfg.ringColor} />
            </div>
          </div>

          {/* Outer ring (static, state-colored border) */}
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            animate={{ borderColor: cfg.ringColor, opacity: isActive ? 0.5 : 0.15 }}
            style={{ border: `1.5px solid ${cfg.ringColor}` }}
            transition={{ duration: 0.5 }}
          />

          {/* Avatar circle */}
          <motion.div
            className="w-28 h-28 rounded-full flex items-center justify-center relative z-10"
            animate={{
              boxShadow: isActive
                ? `0 0 0 3px ${cfg.ringColor}30, 0 0 48px ${cfg.glowColor.replace("0.14", "0.35")}`
                : `0 0 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)`,
            }}
            transition={{ duration: 0.5 }}
            style={{
              background: "linear-gradient(145deg, #1C2034 0%, #242845 100%)",
            }}
          >
            {/* Inner orb */}
            <motion.div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              animate={{
                background:
                  state === "thinking"
                    ? "linear-gradient(135deg, #F59E0B 0%, #B45309 100%)"
                    : state === "listening"
                    ? "linear-gradient(135deg, #22C55E 0%, #16A34A 100%)"
                    : "linear-gradient(135deg, #E63946 0%, #A50F17 100%)",
              }}
              style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}
              transition={{ duration: 0.5 }}
            >
              <AnimatePresence mode="wait">
                {state === "thinking" ? (
                  <motion.div
                    key="thinking"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
                      className="w-7 h-7 rounded-full"
                      style={{
                        border: "2.5px solid rgba(255,255,255,0.25)",
                        borderTopColor: "white",
                      }}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="mic"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Mic size={26} className="text-white" strokeWidth={2} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>

        {/* HRD label below avatar */}
        <motion.div
          className="mt-5 uppercase tracking-widest"
          animate={{ opacity: state === "thinking" ? 0.3 : 0.4 }}
          style={{
            color: "rgba(255,255,255,0.4)",
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.58rem",
            letterSpacing: "0.14em",
          }}
        >
          AI HRD
        </motion.div>
      </div>

      {/* ── Overlays ───────────────────────────────────────────────────── */}

      {/* Bottom info strip */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-5 pb-4 pt-14 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)" }}
      >
        <div>
          <div
            style={{
              color: "rgba(255,255,255,0.85)",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600,
              fontSize: "0.82rem",
              letterSpacing: "-0.01em",
            }}
          >
            Ayu Rahayu
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.35)",
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.56rem",
              letterSpacing: "0.06em",
              marginTop: 2,
            }}
          >
            AI HRD · Road2Work
          </div>
        </div>

        {/* State badge */}
        <motion.div
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full"
          animate={{ backgroundColor: cfg.badgeBg, borderColor: cfg.badgeBorder }}
          style={{ border: "1px solid", backdropFilter: "blur(8px)" }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: cfg.color }}
            animate={
              state === "listening" || state === "thinking"
                ? { scale: [1, 1.6, 1], opacity: [0.7, 1, 0.7] }
                : {}
            }
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span
            style={{
              color: cfg.color,
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.58rem",
              letterSpacing: "0.1em",
              fontWeight: 600,
            }}
          >
            {cfg.label.toUpperCase()}
          </span>
        </motion.div>
      </div>

      {/* REC indicator (top-right, only when listening) */}
      <AnimatePresence>
        {state === "listening" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full"
            style={{ backgroundColor: "rgba(230,57,70,0.9)", backdropFilter: "blur(8px)" }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-white"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span
              style={{
                color: "white",
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.58rem",
                letterSpacing: "0.1em",
                fontWeight: 600,
              }}
            >
              REC
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HRD waveform (shown when HRD is speaking — asking/clarifying) */}
      <div className="absolute top-4 left-4">
        <AnimatePresence>
          {(state === "asking" || state === "clarifying") && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-end gap-0.5"
              style={{ height: 20 }}
            >
              {[3, 7, 12, 9, 15, 10, 6, 13, 8, 4].map((h, i) => (
                <motion.div
                  key={i}
                  className="rounded-full"
                  style={{ width: 2, backgroundColor: state === "clarifying" ? "rgba(230,57,70,0.7)" : "rgba(255,255,255,0.3)" }}
                  animate={{ height: [h * 0.4, h, h * 1.2, h, h * 0.4] }}
                  transition={{ duration: 0.8 + (i % 3) * 0.15, repeat: Infinity, ease: "easeInOut", delay: i * 0.06 }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────
export default function InterviewStage() {
  const navigate = useNavigate();
  const [state, setState] = useState<InterviewState>("asking");
  const [qIndex, setQIndex] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [showEnd, setShowEnd] = useState(false);
  const [didClarify, setDidClarify] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  const handleMic = () => {
    if (state === "asking") {
      setState("listening");
    } else if (state === "listening") {
      setState("thinking");
      setTimeout(() => {
        if (!didClarify && qIndex % 2 === 0) {
          setDidClarify(true);
          setState("clarifying");
        } else {
          setDidClarify(false);
          if (qIndex < questions.length - 1) {
            setQIndex((q) => q + 1);
            setState("asking");
          } else {
            navigate("/results");
          }
        }
      }, 2400);
    } else if (state === "clarifying") {
      setState("listening");
    }
  };

  const canMic = state !== "thinking";
  const cfg = stateConfig[state];
  const displayQ = state === "clarifying" ? clarifyingQuestion : questions[qIndex];

  return (
    <div
      className="min-h-screen flex flex-col select-none"
      style={{ backgroundColor: "#080A10" }}
    >
      {/* ── Top bar ────────────────────────────────────────────────────── */}
      <header
        className="shrink-0 flex items-center justify-between px-5 sm:px-8 h-14"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <Logo dark />

        <div className="flex items-center gap-3 sm:gap-5">
          {/* Target role */}
          <div
            className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full"
            style={{
              backgroundColor: "rgba(230,57,70,0.1)",
              border: "1px solid rgba(230,57,70,0.2)",
            }}
          >
            <div className="w-1 h-1 rounded-full" style={{ backgroundColor: "#E63946" }} />
            <span
              style={{
                color: "rgba(230,57,70,0.9)",
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.62rem",
                letterSpacing: "0.06em",
                fontWeight: 600,
              }}
            >
              Data Analyst
            </span>
          </div>

          {/* Question counter */}
          <div
            className="px-3 py-1 rounded-full"
            style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <span
              style={{
                color: "rgba(255,255,255,0.5)",
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.68rem",
                letterSpacing: "0.06em",
              }}
            >
              Q{qIndex + 1}/{questions.length}
            </span>
          </div>

          {/* Timer */}
          <span
            className="tabular-nums hidden sm:block"
            style={{
              color: "rgba(255,255,255,0.3)",
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.72rem",
              letterSpacing: "0.04em",
            }}
          >
            {fmt(seconds)}
          </span>

          {/* End button */}
          <button
            onClick={() => setShowEnd(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all"
            style={{
              color: "rgba(255,255,255,0.3)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.65)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.18)";
              (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.04)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.3)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
              (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
            }}
          >
            <Square size={11} />
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.04em" }}>
              End
            </span>
          </button>
        </div>
      </header>

      {/* ── Progress dots ──────────────────────────────────────────────── */}
      <ProgressDots total={questions.length} current={qIndex} />

      {/* ── Main content ───────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center px-5 sm:px-8 pb-10 min-h-0 overflow-auto" style={{ gap: "1.25rem" }}>
        <div className="w-full flex flex-col items-center" style={{ maxWidth: 660 }}>

          {/* ── HRD Video Frame ────────────────────────────────────────── */}
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <HRDFrame state={state} cfg={cfg} />
          </motion.div>

          {/* ── Question bubble ────────────────────────────────────────── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={displayQ}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.32 }}
              className="w-full"
            >
              <div
                className="w-full rounded-2xl px-5 py-4"
                style={{
                  backgroundColor: "rgba(255,255,255,0.038)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
                }}
              >
                {/* Follow-up badge */}
                {state === "clarifying" && (
                  <div
                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full mb-3"
                    style={{
                      backgroundColor: "rgba(230,57,70,0.1)",
                      border: "1px solid rgba(230,57,70,0.22)",
                    }}
                  >
                    <div className="w-1 h-1 rounded-full" style={{ backgroundColor: "#E63946" }} />
                    <span
                      style={{
                        color: "#E63946",
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "0.56rem",
                        letterSpacing: "0.12em",
                        fontWeight: 600,
                      }}
                    >
                      FOLLOW-UP
                    </span>
                  </div>
                )}

                <p
                  style={{
                    color:
                      state === "listening"
                        ? "rgba(255,255,255,0.45)"
                        : "rgba(255,255,255,0.78)",
                    fontSize: "0.9rem",
                    lineHeight: 1.75,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    transition: "color 0.4s",
                  }}
                >
                  "{displayQ}"
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ── Voice controls area ────────────────────────────────────── */}
          <div className="w-full flex flex-col items-center" style={{ gap: "1rem" }}>

            {/* Waveform — user's voice output */}
            <div
              className="w-full px-4 py-3 rounded-2xl flex items-center"
              style={{
                backgroundColor: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.05)",
                minHeight: 72,
              }}
            >
              <WaveformBars
                active={state === "listening"}
                color={state === "listening" ? "#22C55E" : "rgba(255,255,255,0.08)"}
              />
            </div>

            {/* Mic button + flanking elements */}
            <div className="flex items-center gap-8 w-full justify-center">
              {/* Left decoration */}
              <div className="hidden sm:flex items-center gap-1.5">
                {[16, 10, 6, 3].map((w, i) => (
                  <div
                    key={i}
                    className="h-px rounded-full"
                    style={{
                      width: w,
                      backgroundColor: state === "listening" ? "rgba(34,197,94,0.3)" : "rgba(255,255,255,0.08)",
                      transition: "background-color 0.4s",
                    }}
                  />
                ))}
              </div>

              {/* Mic button */}
              <div className="relative flex items-center justify-center">
                {/* Outer pulse (listening/clarifying) */}
                {(state === "listening" || state === "clarifying") && (
                  <>
                    {[1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="absolute rounded-full pointer-events-none"
                        style={{
                          width: 104,
                          height: 104,
                          border: `1.5px solid ${state === "listening" ? "#22C55E" : "#E63946"}`,
                        }}
                        animate={{ scale: [1, 1 + i * 0.35], opacity: [0.5, 0] }}
                        transition={{ duration: 1.6, delay: i * 0.5, repeat: Infinity, ease: "easeOut" }}
                      />
                    ))}
                  </>
                )}

                <motion.button
                  onClick={handleMic}
                  disabled={!canMic}
                  whileTap={{ scale: canMic ? 0.92 : 1 }}
                  className="relative rounded-full flex items-center justify-center"
                  style={{
                    width: 96,
                    height: 96,
                    cursor: canMic ? "pointer" : "default",
                  }}
                  animate={{
                    backgroundColor:
                      state === "thinking"
                        ? "rgba(255,255,255,0.05)"
                        : state === "listening"
                        ? "#16A34A"
                        : "#E63946",
                    boxShadow:
                      state === "thinking"
                        ? "0 4px 24px rgba(0,0,0,0.3)"
                        : state === "listening"
                        ? "0 8px 40px rgba(22,163,74,0.4), 0 2px 8px rgba(0,0,0,0.3)"
                        : "0 8px 40px rgba(230,57,70,0.45), 0 2px 8px rgba(0,0,0,0.3)",
                  }}
                  transition={{ duration: 0.4 }}
                >
                  {state === "thinking" ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
                      className="w-8 h-8 rounded-full"
                      style={{
                        border: "2.5px solid rgba(255,255,255,0.15)",
                        borderTopColor: "rgba(255,255,255,0.55)",
                      }}
                    />
                  ) : state === "listening" ? (
                    <MicOff size={34} className="text-white" strokeWidth={1.8} />
                  ) : (
                    <Mic size={34} className="text-white" strokeWidth={1.8} />
                  )}
                </motion.button>
              </div>

              {/* Right decoration */}
              <div className="hidden sm:flex items-center gap-1.5">
                {[3, 6, 10, 16].map((w, i) => (
                  <div
                    key={i}
                    className="h-px rounded-full"
                    style={{
                      width: w,
                      backgroundColor: state === "listening" ? "rgba(34,197,94,0.3)" : "rgba(255,255,255,0.08)",
                      transition: "background-color 0.4s",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Hint text */}
            <AnimatePresence mode="wait">
              <motion.p
                key={cfg.hint}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="text-center"
                style={{
                  color: "rgba(255,255,255,0.22)",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.62rem",
                  letterSpacing: "0.05em",
                  maxWidth: 300,
                }}
              >
                {cfg.hint}
              </motion.p>
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* ── End confirm modal ──────────────────────────────────────────── */}
      <AnimatePresence>
        {showEnd && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-5 pb-5 sm:pb-0"
            style={{ backgroundColor: "rgba(0,0,0,0.8)", backdropFilter: "blur(4px)" }}
            onClick={() => setShowEnd(false)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="rounded-3xl p-7 w-full"
              style={{
                backgroundColor: "#13151F",
                maxWidth: 380,
                border: "1px solid rgba(255,255,255,0.09)",
                boxShadow: "0 32px 80px rgba(0,0,0,0.7)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center mx-auto mb-5"
                style={{ backgroundColor: "rgba(230,57,70,0.1)", border: "1px solid rgba(230,57,70,0.18)" }}
              >
                <Square size={20} style={{ color: "#E63946" }} />
              </div>
              <h3
                className="text-center font-bold mb-2"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: "white",
                  fontSize: "1.1rem",
                  letterSpacing: "-0.02em",
                }}
              >
                End interview?
              </h3>
              <p
                className="text-center text-sm mb-6 leading-relaxed"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                {qIndex > 0
                  ? `You've answered ${qIndex} of ${questions.length} questions. Your progress will be evaluated.`
                  : "Your progress so far will be evaluated and a partial result will be shown."}
              </p>

              {/* Progress bar in modal */}
              <div
                className="rounded-full overflow-hidden mb-6"
                style={{ height: 4, backgroundColor: "rgba(255,255,255,0.07)" }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${((qIndex + 1) / questions.length) * 100}%`,
                    backgroundColor: "#E63946",
                    transition: "width 0.5s",
                  }}
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowEnd(false)}
                  className="flex-1 py-3 rounded-full text-sm font-medium transition-all"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.06)",
                    color: "rgba(255,255,255,0.55)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.1)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.06)")}
                >
                  Keep going
                </button>
                <button
                  onClick={() => navigate("/results")}
                  className="flex-1 py-3 rounded-full text-sm font-bold text-white transition-all"
                  style={{
                    backgroundColor: "#E63946",
                    boxShadow: "0 4px 16px rgba(230,57,70,0.3)",
                    fontFamily: "'Space Grotesk', sans-serif",
                    letterSpacing: "-0.01em",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "#C1121F")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "#E63946")}
                >
                  End Interview
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
