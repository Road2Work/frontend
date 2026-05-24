import { Link } from "react-router";
import { motion } from "motion/react";
import {
  FileSearch,
  BrainCircuit,
  Mic,
  MessageCircle,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

const card = {
  backgroundColor: "#FDFDFD",
  border: "1px solid rgba(0,0,0,0.07)",
  borderRadius: 20,
  boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 6px 24px rgba(0,0,0,0.05)",
};

const steps = [
  {
    num: "01",
    icon: FileSearch,
    title: "Context Extraction",
    desc: "Road2Work reads your CV or short profile and extracts relevant work experience, skills, projects, and achievements. This becomes the foundation for your personalized interview.",
    detail: "The AI identifies role-relevant signals: specific tools used, project scale, team context, and measurable outcomes.",
  },
  {
    num: "02",
    icon: BrainCircuit,
    title: "Role-Specific Question Generation",
    desc: "Based on your target role and extracted context, the system generates 5 main interview questions tailored specifically to your background — not generic templates.",
    detail: "Questions are calibrated to your seniority level and experience, targeting areas most relevant to the role.",
  },
  {
    num: "03",
    icon: Mic,
    title: "Voice Answer Processing",
    desc: "You answer each question by speaking naturally. The AI transcribes your voice answer in real time and analyzes the content, structure, and evidence quality of your response.",
    detail: "Speech-to-text processing captures nuance, filler words, and pacing to give you full communication feedback.",
  },
  {
    num: "04",
    icon: MessageCircle,
    title: "Adaptive Clarifying Questions",
    desc: "If your answer is vague, missing key evidence, or needs elaboration, the AI HRD asks a targeted follow-up question — exactly like a real interviewer would.",
    detail: "The clarifying question is generated dynamically based on the specific gap detected in your answer.",
  },
  {
    num: "05",
    icon: BrainCircuit,
    title: "AI Evaluation",
    desc: "After the interview, your answers are scored across 6 dimensions: Role Relevance, STAR Structure, Evidence Specificity, Technical Accuracy, Communication Clarity, and Self-Awareness.",
    detail: "Each dimension is scored independently, giving you a precise picture of your strengths and weaknesses.",
  },
  {
    num: "06",
    icon: BarChart3,
    title: "Readiness Dashboard",
    desc: "Your final readiness score is presented with a full breakdown, a before-after answer comparison, and a specific recommendation for your next practice session.",
    detail: "The dashboard is designed to be actionable — not just a score, but a clear path to improvement.",
  },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex items-center gap-3"
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
    </div>
  );
}

export default function HowItWorks() {
  return (
    <div style={{ backgroundColor: "#FAF7F2" }}>
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel>HOW IT WORKS</SectionLabel>
            <h1
              className="mt-5"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
                fontWeight: 800,
                color: "#1F2937",
                lineHeight: 1.05,
                letterSpacing: "-0.04em",
                maxWidth: 720,
              }}
            >
              The system behind{" "}
              <span style={{ color: "#E63946" }}>your readiness score.</span>
            </h1>
            <p
              className="mt-6 text-lg leading-relaxed"
              style={{ color: "#656565", maxWidth: 560 }}
            >
              Context-aware AI that generates and evaluates a personalized voice
              interview — from CV parsing to final dashboard. Here's exactly how
              it works.
            </p>
          </motion.div>

          {/* Road connector */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-14"
          >
            <svg width="100%" height="32" viewBox="0 0 800 32" preserveAspectRatio="none">
              <rect x="0" y="12" width="800" height="8" rx="4" fill="#1F2937" opacity="0.05" />
              <line x1="0" y1="16" x2="800" y2="16" stroke="#E63946" strokeWidth="1.5" strokeDasharray="16 8" opacity="0.4" />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="pb-28 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-5">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="rounded-3xl overflow-hidden transition-all"
                style={card}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.08), 0 24px 48px rgba(0,0,0,0.06)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = card.boxShadow as string;
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-5">
                  {/* Step number + icon */}
                  <div
                    className="md:col-span-1 p-8 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r"
                    style={{
                      borderColor: "rgba(0,0,0,0.06)",
                      backgroundColor: i % 2 === 0 ? "#FAF7F2" : "#FDFDFD",
                    }}
                  >
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3"
                      style={{ backgroundColor: "rgba(230,57,70,0.08)" }}
                    >
                      <step.icon size={26} style={{ color: "#E63946" }} />
                    </div>
                    <div
                      style={{
                        color: "#E63946",
                        fontFamily: "'DM Mono', monospace",
                        fontWeight: 700,
                        fontSize: "0.8rem",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {step.num}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="md:col-span-4 p-8">
                    <h3
                      className="font-bold mb-3"
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        color: "#1F2937",
                        fontSize: "1.2rem",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="leading-relaxed mb-4"
                      style={{ color: "#656565", fontSize: "0.95rem" }}
                    >
                      {step.desc}
                    </p>
                    <div
                      className="flex items-start gap-3 px-4 py-3 rounded-xl text-sm"
                      style={{
                        backgroundColor: "rgba(230,57,70,0.04)",
                        border: "1px solid rgba(230,57,70,0.1)",
                        color: "#656565",
                      }}
                    >
                      <div
                        className="w-1 h-1 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: "#E63946" }}
                      />
                      {step.detail}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Evaluation framework */}
      <section className="py-24 px-6" style={{ backgroundColor: "#FDFDFD" }}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <SectionLabel>EVALUATION FRAMEWORK</SectionLabel>
            <h2
              className="mt-5"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                fontWeight: 800,
                color: "#1F2937",
                letterSpacing: "-0.04em",
              }}
            >
              Six dimensions of interview readiness.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                label: "Role Relevance",
                desc: "How well your answers demonstrate understanding of the target role's key responsibilities and context.",
              },
              {
                label: "STAR Structure",
                desc: "How clearly you use Situation, Task, Action, Result framing to structure your behavioral answers.",
              },
              {
                label: "Evidence Specificity",
                desc: "The quality and specificity of examples, numbers, outcomes, and concrete details in your answers.",
              },
              {
                label: "Technical Accuracy",
                desc: "Correctness of technical claims about tools, methodologies, and domain-specific concepts.",
              },
              {
                label: "Communication Clarity",
                desc: "How clear, concise, and well-organized your verbal communication is throughout the session.",
              },
              {
                label: "Self-Awareness",
                desc: "How well you reflect on your actions, acknowledge gaps, and show learning and growth mindset.",
              },
            ].map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="rounded-2xl border p-6 flex items-start gap-4 transition-all"
                style={{
                  backgroundColor: "#FDFDFD",
                  borderColor: "#E8E8E8",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.07)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(230,57,70,0.2)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 2px rgba(0,0,0,0.03)";
                  (e.currentTarget as HTMLElement).style.borderColor = "#E8E8E8";
                }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold mt-0.5"
                  style={{
                    backgroundColor: "rgba(230,57,70,0.08)",
                    color: "#E63946",
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.75rem",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <div
                    className="font-bold mb-1"
                    style={{
                      color: "#1F2937",
                      fontFamily: "'Space Grotesk', sans-serif",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {d.label}
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "#656565" }}>
                    {d.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6" style={{ backgroundColor: "#1F2937" }}>
        <div className="max-w-xl mx-auto text-center relative">
          {/* Road SVG */}
          <div className="absolute inset-x-0 top-0 pointer-events-none" style={{ opacity: 0.12 }}>
            <svg width="100%" height="60" viewBox="0 0 600 60" preserveAspectRatio="none">
              <rect x="0" y="24" width="600" height="12" rx="6" fill="white" />
              <line x1="0" y1="30" x2="600" y2="30" stroke="#E63946" strokeWidth="2" strokeDasharray="20 10" />
            </svg>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative z-10 pt-8"
          >
            <div
              className="text-xs font-semibold uppercase tracking-widest mb-5 flex items-center justify-center gap-3"
              style={{
                color: "rgba(255,255,255,0.35)",
                fontFamily: "'DM Mono', monospace",
              }}
            >
              <div className="w-6 h-px" style={{ backgroundColor: "rgba(255,255,255,0.35)" }} />
              GET STARTED
              <div className="w-6 h-px" style={{ backgroundColor: "rgba(255,255,255,0.35)" }} />
            </div>
            <h2
              className="mb-4"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                fontWeight: 800,
                color: "white",
                letterSpacing: "-0.04em",
              }}
            >
              Ready to see it in action?
            </h2>
            <p className="mb-10" style={{ color: "rgba(255,255,255,0.5)" }}>
              Start your first practice session and experience exactly how the
              system evaluates your interview performance.
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white no-underline transition-all"
              style={{
                backgroundColor: "#E63946",
                fontFamily: "'Space Grotesk', sans-serif",
                boxShadow: "0 4px 20px rgba(230,57,70,0.4), 0 1px 3px rgba(0,0,0,0.2)",
                letterSpacing: "-0.01em",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "#C1121F";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(230,57,70,0.5), 0 2px 6px rgba(0,0,0,0.25)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "#E63946";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(230,57,70,0.4), 0 1px 3px rgba(0,0,0,0.2)";
              }}
            >
              Start Interview Practice
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
