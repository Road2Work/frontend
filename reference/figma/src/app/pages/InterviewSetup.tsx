import { useState } from "react";
import { useNavigate } from "react-router";
import { Upload, FileText, Lock, ArrowRight, X, Check, Shield } from "lucide-react";
import { AppHeader } from "../components/AppHeader";
import { motion, AnimatePresence } from "motion/react";

type Mode = "select" | "upload" | "profile";

const card = {
  backgroundColor: "#FDFDFD",
  border: "1px solid rgba(0,0,0,0.07)",
  borderRadius: 20,
  boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 6px 24px rgba(0,0,0,0.05)",
};

export default function InterviewSetup() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("select");
  const [dragging, setDragging] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [form, setForm] = useState({
    experience: "",
    skills: "",
    projects: "",
    achievements: "",
  });

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    setUploaded(true);
  };

  const profileFilled =
    form.experience.trim() &&
    form.skills.trim() &&
    form.projects.trim() &&
    form.achievements.trim();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAF7F2" }}>
      <AppHeader backTo="/start" backLabel="Back to Role Selection" />

      <main className="max-w-2xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
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
            INTERVIEW CONTEXT
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
            Give your AI HRD enough context
          </h1>
          <p className="mb-8 text-sm leading-relaxed" style={{ color: "#656565" }}>
            Upload your CV, or fill a short profile if you prefer not to upload a
            file. This helps your AI HRD ask personalized, evidence-based questions.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {mode === "select" && (
            <motion.div
              key="select"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              {/* Upload CV card */}
              <button
                onClick={() => setMode("upload")}
                className="w-full text-left rounded-2xl transition-all group"
                style={card}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.08), 0 24px 48px rgba(0,0,0,0.06)";
                  (e.currentTarget as HTMLElement).style.border = "1px solid rgba(230,57,70,0.3)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = card.boxShadow;
                  (e.currentTarget as HTMLElement).style.border = card.border;
                }}
              >
                <div className="flex items-start gap-5 p-6">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "rgba(230,57,70,0.08)" }}
                  >
                    <Upload size={22} style={{ color: "#E63946" }} />
                  </div>
                  <div className="flex-1">
                    <div
                      className="font-bold mb-1"
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        color: "#1F2937",
                        fontSize: "1.05rem",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      Upload CV
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "#656565" }}>
                      Best for personalized questions and stronger evidence
                      analysis. Your AI HRD extracts your experience automatically.
                    </p>
                    <div
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold"
                      style={{ color: "#E63946" }}
                    >
                      Upload CV <ArrowRight size={13} />
                    </div>
                  </div>
                </div>
              </button>

              {/* Fill profile card */}
              <button
                onClick={() => setMode("profile")}
                className="w-full text-left rounded-2xl transition-all"
                style={card}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.08), 0 24px 48px rgba(0,0,0,0.06)";
                  (e.currentTarget as HTMLElement).style.border = "1px solid rgba(31,41,55,0.2)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = card.boxShadow;
                  (e.currentTarget as HTMLElement).style.border = card.border;
                }}
              >
                <div className="flex items-start gap-5 p-6">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "rgba(31,41,55,0.06)" }}
                  >
                    <FileText size={22} style={{ color: "#1F2937" }} />
                  </div>
                  <div className="flex-1">
                    <div
                      className="font-bold mb-1"
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        color: "#1F2937",
                        fontSize: "1.05rem",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      Fill Short Profile
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "#656565" }}>
                      A privacy-friendly way to tell us about your experience in
                      your own words. Takes about 3–5 minutes.
                    </p>
                    <div
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold"
                      style={{ color: "#1F2937" }}
                    >
                      Fill Profile <ArrowRight size={13} />
                    </div>
                  </div>
                </div>
              </button>

              <div
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm"
                style={{
                  backgroundColor: "rgba(31,41,55,0.04)",
                  color: "#A0A0A0",
                  border: "1px solid rgba(0,0,0,0.05)",
                }}
              >
                <Shield size={13} style={{ color: "#A0A0A0" }} className="shrink-0" />
                Your data is only used to personalize your interview practice.
                Never shared or sold.
              </div>
            </motion.div>
          )}

          {mode === "upload" && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    color: "#1F2937",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Upload your CV
                </h2>
                <button
                  onClick={() => {
                    setMode("select");
                    setUploaded(false);
                  }}
                  className="flex items-center gap-1 text-sm"
                  style={{ color: "#A0A0A0" }}
                >
                  <X size={14} /> Change
                </button>
              </div>

              {!uploaded ? (
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragging(true);
                  }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => setUploaded(true)}
                  className="rounded-2xl border-2 border-dashed p-12 text-center transition-all cursor-pointer"
                  style={{
                    borderColor: dragging ? "#E63946" : "#D9DDE6",
                    backgroundColor: dragging ? "rgba(230,57,70,0.03)" : "#FDFDFD",
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: dragging ? "rgba(230,57,70,0.08)" : "rgba(0,0,0,0.04)" }}
                  >
                    <Upload
                      size={26}
                      style={{ color: dragging ? "#E63946" : "#C0C0C0" }}
                    />
                  </div>
                  <p className="font-semibold mb-1" style={{ color: "#1F2937", fontFamily: "'Space Grotesk', sans-serif" }}>
                    Drop your CV here or click to browse
                  </p>
                  <p className="text-sm" style={{ color: "#A0A0A0" }}>
                    PDF or DOCX · Max 5MB
                  </p>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-2xl border p-6 flex items-center gap-4"
                  style={{
                    backgroundColor: "rgba(34,197,94,0.04)",
                    borderColor: "rgba(34,197,94,0.2)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "rgba(34,197,94,0.1)" }}
                  >
                    <Check size={20} style={{ color: "#22C55E" }} />
                  </div>
                  <div>
                    <div className="font-semibold" style={{ color: "#1F2937" }}>
                      my-cv-2026.pdf
                    </div>
                    <div className="text-sm mt-0.5" style={{ color: "#A0A0A0" }}>
                      Uploaded successfully · 284 KB
                    </div>
                  </div>
                  <button
                    onClick={() => setUploaded(false)}
                    className="ml-auto"
                    style={{ color: "#A0A0A0" }}
                  >
                    <X size={16} />
                  </button>
                </motion.div>
              )}

              {uploaded && (
                <motion.button
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => navigate("/onboarding")}
                  className="mt-6 w-full py-4 rounded-full font-bold text-white flex items-center justify-center gap-2 transition-all"
                  style={{
                    backgroundColor: "#E63946",
                    fontFamily: "'Space Grotesk', sans-serif",
                    letterSpacing: "-0.01em",
                    boxShadow: "0 4px 20px rgba(230,57,70,0.32), 0 1px 3px rgba(0,0,0,0.1)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "#C1121F";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "#E63946";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }}
                >
                  Continue to Interview Setup
                  <ArrowRight size={16} />
                </motion.button>
              )}
            </motion.div>
          )}

          {mode === "profile" && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    color: "#1F2937",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Fill your short profile
                </h2>
                <button
                  onClick={() => setMode("select")}
                  className="flex items-center gap-1 text-sm"
                  style={{ color: "#A0A0A0" }}
                >
                  <X size={14} /> Change
                </button>
              </div>

              <div className="space-y-5">
                {[
                  {
                    key: "experience" as const,
                    label: "Most relevant experience",
                    placeholder: "e.g. 1 year as a data analyst intern at XYZ, focusing on sales dashboard development",
                    rows: 3,
                  },
                  {
                    key: "skills" as const,
                    label: "Skills & tools you've used",
                    placeholder: "e.g. Python, SQL, Tableau, Power BI, Excel, pandas",
                    rows: 2,
                  },
                  {
                    key: "projects" as const,
                    label: "Project, internship, org, or freelance experience",
                    placeholder: "e.g. Built a churn prediction model for a startup's 50K user dataset; volunteered as data lead for student org",
                    rows: 3,
                  },
                  {
                    key: "achievements" as const,
                    label: "Result, achievement, or impact",
                    placeholder: "e.g. Reduced reporting time by 60%, dashboard used daily by 20+ stakeholders",
                    rows: 2,
                  },
                ].map((field, i) => (
                  <motion.div
                    key={field.key}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.06 }}
                  >
                    <label
                      className="block text-sm font-medium mb-1.5"
                      style={{ color: "#1F2937" }}
                    >
                      {field.label}
                    </label>
                    <textarea
                      rows={field.rows}
                      placeholder={field.placeholder}
                      value={form[field.key]}
                      onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border outline-none text-sm transition-all resize-none"
                      style={{
                        borderColor: "#D9DDE6",
                        backgroundColor: "#FDFDFD",
                        color: "#1F2937",
                        lineHeight: 1.6,
                        boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#E63946";
                        e.target.style.boxShadow = "0 0 0 3px rgba(230,57,70,0.08)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#D9DDE6";
                        e.target.style.boxShadow = "0 1px 2px rgba(0,0,0,0.03)";
                      }}
                    />
                  </motion.div>
                ))}
              </div>

              <button
                onClick={() => navigate("/onboarding")}
                disabled={!profileFilled}
                className="mt-6 w-full py-4 rounded-full font-bold text-white flex items-center justify-center gap-2 transition-all"
                style={{
                  backgroundColor: profileFilled ? "#E63946" : "#E0E0E0",
                  cursor: profileFilled ? "pointer" : "not-allowed",
                  fontFamily: "'Space Grotesk', sans-serif",
                  letterSpacing: "-0.01em",
                  boxShadow: profileFilled
                    ? "0 4px 20px rgba(230,57,70,0.32), 0 1px 3px rgba(0,0,0,0.1)"
                    : "none",
                }}
                onMouseEnter={(e) => {
                  if (profileFilled) {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "#C1121F";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (profileFilled) {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "#E63946";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }
                }}
              >
                Build Interview Context
                <ArrowRight size={16} />
              </button>

              {!profileFilled && (
                <p className="text-center text-xs mt-3" style={{ color: "#A0A0A0" }}>
                  Fill in all fields to continue
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
