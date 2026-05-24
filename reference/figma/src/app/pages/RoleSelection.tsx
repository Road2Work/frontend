import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronRight, ArrowLeft, Check } from "lucide-react";
import { AppHeader } from "../components/AppHeader";
import { motion, AnimatePresence } from "motion/react";

const card = {
  backgroundColor: "#FDFDFD",
  border: "1px solid rgba(0,0,0,0.07)",
  borderRadius: 20,
  boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 6px 24px rgba(0,0,0,0.05)",
};

const domains = [
  {
    id: "it",
    label: "Information Technology",
    desc: "Data, AI, Software, Cloud & Infrastructure",
    icon: "💻",
    tag: "Most popular",
  },
  {
    id: "business",
    label: "Business & Management",
    desc: "Marketing, Operations, Product, Strategy",
    icon: "📊",
    soon: true,
  },
  {
    id: "design",
    label: "Design & Creative",
    desc: "UI/UX, Brand, Motion, Visual Design",
    icon: "🎨",
    soon: true,
  },
];

const roleFamilies: Record<string, { id: string; label: string; desc: string; icon: string }[]> = {
  it: [
    { id: "data-ai", label: "Data & AI", desc: "Data analysis, machine learning, AI engineering", icon: "📈" },
    { id: "software", label: "Software Engineering", desc: "Backend, frontend, full-stack development", icon: "⚙️" },
    { id: "cloud", label: "Cloud & DevOps", desc: "Infrastructure, CI/CD, cloud platforms", icon: "☁️" },
  ],
};

const roles: Record<string, string[]> = {
  "data-ai": ["Data Analyst", "Data Scientist", "AI Engineer", "ML Engineer"],
  software: ["Backend Developer", "Frontend Developer", "Full-Stack Developer"],
  cloud: ["DevOps Engineer", "Cloud Engineer", "SRE"],
};

const stepLabels = ["Domain", "Family", "Role"];

export default function RoleSelection() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState<{
    domain: string;
    family: string;
    role: string;
  }>({ domain: "", family: "", role: "" });

  const currentFamilies =
    roleFamilies[selected.domain as keyof typeof roleFamilies] || [];
  const currentRoles =
    roles[selected.family as keyof typeof roles] || [];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAF7F2" }}>
      <AppHeader />

      <main className="max-w-2xl mx-auto px-6 py-12">
        {/* Step indicator with road-style connector */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center mb-12"
        >
          {stepLabels.map((label, i) => (
            <div key={i} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm transition-all"
                  style={{
                    backgroundColor:
                      step > i + 1
                        ? "#22C55E"
                        : step === i + 1
                        ? "#E63946"
                        : "transparent",
                    color: step >= i + 1 ? "white" : "#A0A0A0",
                    border: step <= i ? "2px solid #D9DDE6" : "none",
                    fontFamily: "'DM Mono', monospace",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    boxShadow: step === i + 1
                      ? "0 4px 12px rgba(230,57,70,0.35)"
                      : "none",
                    transition: "all 0.3s",
                  }}
                >
                  {step > i + 1 ? <Check size={15} /> : i + 1}
                </div>
                <div
                  className="text-xs mt-2 text-center hidden sm:block whitespace-nowrap"
                  style={{
                    color: step === i + 1 ? "#E63946" : step > i + 1 ? "#22C55E" : "#A0A0A0",
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.62rem",
                    letterSpacing: "0.05em",
                    fontWeight: 600,
                  }}
                >
                  {label}
                </div>
              </div>
              {i < stepLabels.length - 1 && (
                <div className="flex-1 mx-3 relative" style={{ height: 2 }}>
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: "#E8E8E8" }}
                  />
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{ backgroundColor: step > i + 1 ? "#22C55E" : "#E63946" }}
                    initial={{ width: 0 }}
                    animate={{ width: step > i + 1 ? "100%" : step === i + 1 ? "50%" : "0%" }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              )}
            </div>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.28 }}
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
              STEP {step} OF 3
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
              {step === 1
                ? "Choose your domain"
                : step === 2
                ? "Choose a role family"
                : "Choose your target role"}
            </h1>
            <p className="mb-8 text-sm leading-relaxed" style={{ color: "#656565" }}>
              {step === 1
                ? "What field are you targeting for your next role?"
                : step === 2
                ? "Which area best fits your background and goals?"
                : "Which specific role would you like to practice for?"}
            </p>

            <div className="space-y-3">
              {step === 1 &&
                domains.map((d, i) => (
                  <motion.button
                    key={d.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.06 }}
                    disabled={!!d.soon}
                    onClick={() => {
                      setSelected((s) => ({ ...s, domain: d.id }));
                      setStep(2);
                    }}
                    className="w-full text-left rounded-2xl transition-all flex items-center justify-between group"
                    style={{
                      ...card,
                      padding: "1.25rem 1.5rem",
                      opacity: d.soon ? 0.5 : 1,
                      cursor: d.soon ? "not-allowed" : "pointer",
                      border: selected.domain === d.id ? "2px solid #E63946" : "1px solid rgba(0,0,0,0.07)",
                    }}
                    onMouseEnter={(e) => {
                      if (!d.soon) {
                        (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                        (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.08), 0 24px 48px rgba(0,0,0,0.06)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!d.soon) {
                        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                        (e.currentTarget as HTMLElement).style.boxShadow = card.boxShadow;
                      }
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 text-xl"
                        style={{ backgroundColor: "rgba(230,57,70,0.06)" }}
                      >
                        {d.icon}
                      </div>
                      <div>
                        <div
                          className="font-bold flex items-center gap-2"
                          style={{
                            color: "#1F2937",
                            fontFamily: "'Space Grotesk', sans-serif",
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {d.label}
                          {d.tag && !d.soon && (
                            <span
                              className="text-xs px-2 py-0.5 rounded-full"
                              style={{
                                backgroundColor: "rgba(230,57,70,0.08)",
                                color: "#E63946",
                                fontFamily: "'DM Mono', monospace",
                                fontSize: "0.6rem",
                                letterSpacing: "0.04em",
                              }}
                            >
                              {d.tag}
                            </span>
                          )}
                          {d.soon && (
                            <span
                              className="text-xs px-2 py-0.5 rounded-full"
                              style={{
                                backgroundColor: "rgba(31,41,55,0.06)",
                                color: "#656565",
                                fontFamily: "'DM Mono', monospace",
                                fontSize: "0.6rem",
                              }}
                            >
                              Soon
                            </span>
                          )}
                        </div>
                        <div className="text-sm mt-0.5" style={{ color: "#A0A0A0" }}>
                          {d.desc}
                        </div>
                      </div>
                    </div>
                    {!d.soon && (
                      <ChevronRight
                        size={18}
                        style={{ color: "#D0D0D0" }}
                        className="shrink-0 group-hover:text-red-400 transition-colors"
                      />
                    )}
                  </motion.button>
                ))}

              {step === 2 &&
                currentFamilies.map((f, i) => (
                  <motion.button
                    key={f.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.07 }}
                    onClick={() => {
                      setSelected((s) => ({ ...s, family: f.id }));
                      setStep(3);
                    }}
                    className="w-full text-left rounded-2xl transition-all flex items-center justify-between group"
                    style={{
                      ...card,
                      padding: "1.25rem 1.5rem",
                      border: selected.family === f.id ? "2px solid #E63946" : "1px solid rgba(0,0,0,0.07)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.08), 0 24px 48px rgba(0,0,0,0.06)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                      (e.currentTarget as HTMLElement).style.boxShadow = card.boxShadow;
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 text-xl"
                        style={{ backgroundColor: "rgba(230,57,70,0.06)" }}
                      >
                        {f.icon}
                      </div>
                      <div>
                        <div
                          className="font-bold"
                          style={{
                            color: "#1F2937",
                            fontFamily: "'Space Grotesk', sans-serif",
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {f.label}
                        </div>
                        <div className="text-sm mt-0.5" style={{ color: "#A0A0A0" }}>
                          {f.desc}
                        </div>
                      </div>
                    </div>
                    <ChevronRight size={18} style={{ color: "#D0D0D0" }} className="shrink-0" />
                  </motion.button>
                ))}

              {step === 3 &&
                currentRoles.map((role, i) => (
                  <motion.button
                    key={role}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.07 }}
                    onClick={() => setSelected((s) => ({ ...s, role }))}
                    className="w-full text-left rounded-2xl transition-all flex items-center justify-between"
                    style={{
                      ...card,
                      padding: "1.25rem 1.5rem",
                      backgroundColor: selected.role === role ? "rgba(230,57,70,0.03)" : "#FDFDFD",
                      border: selected.role === role ? "2px solid #E63946" : "1px solid rgba(0,0,0,0.07)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.08), 0 24px 48px rgba(0,0,0,0.06)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                      (e.currentTarget as HTMLElement).style.boxShadow = card.boxShadow;
                    }}
                  >
                    <span
                      className="font-bold"
                      style={{
                        color: "#1F2937",
                        fontFamily: "'Space Grotesk', sans-serif",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {role}
                    </span>
                    {selected.role === role ? (
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                        style={{ backgroundColor: "#E63946", boxShadow: "0 2px 8px rgba(230,57,70,0.35)" }}
                      >
                        <Check size={13} className="text-white" />
                      </div>
                    ) : (
                      <div
                        className="w-7 h-7 rounded-full shrink-0"
                        style={{ border: "2px solid #E8E8E8" }}
                      />
                    )}
                  </motion.button>
                ))}
            </div>

            {step > 1 && (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="mt-6 flex items-center gap-1.5 text-sm font-medium transition-colors"
                style={{ color: "#A0A0A0" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#1F2937")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#A0A0A0")}
              >
                <ArrowLeft size={14} /> Back
              </button>
            )}

            {step === 3 && selected.role && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-8"
              >
                <div
                  className="mb-5 px-5 py-4 rounded-2xl flex items-center gap-3"
                  style={{
                    backgroundColor: "rgba(230,57,70,0.04)",
                    border: "1px solid rgba(230,57,70,0.15)",
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "rgba(230,57,70,0.1)" }}
                  >
                    <Check size={15} style={{ color: "#E63946" }} />
                  </div>
                  <div className="text-sm">
                    <span style={{ color: "#A0A0A0" }}>Practicing for: </span>
                    <strong style={{ color: "#1F2937", fontFamily: "'Space Grotesk', sans-serif" }}>
                      {selected.role}
                    </strong>
                  </div>
                </div>
                <button
                  onClick={() => navigate("/setup")}
                  className="w-full py-4 rounded-full font-bold text-white flex items-center justify-center gap-2 transition-all"
                  style={{
                    backgroundColor: "#E63946",
                    fontFamily: "'Space Grotesk', sans-serif",
                    boxShadow: "0 4px 20px rgba(230,57,70,0.32), 0 1px 3px rgba(0,0,0,0.1)",
                    letterSpacing: "-0.01em",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "#C1121F";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(230,57,70,0.38), 0 2px 6px rgba(0,0,0,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "#E63946";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(230,57,70,0.32), 0 1px 3px rgba(0,0,0,0.1)";
                  }}
                >
                  Continue to Interview Setup
                  <ChevronRight size={16} />
                </button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
