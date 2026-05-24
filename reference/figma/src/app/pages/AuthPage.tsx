import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Eye, EyeOff, ArrowRight, Check } from "lucide-react";
import { Logo } from "../components/Logo";
import { motion } from "motion/react";

export default function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === "/login";
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/hub");
  };

  return (
    <div
      className="min-h-screen grid grid-cols-1 lg:grid-cols-2"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* Left: brand panel */}
      <div
        className="hidden lg:flex flex-col justify-between p-12 relative overflow-hidden"
        style={{ backgroundColor: "#1F2937" }}
      >
        {/* Subtle grid */}
        <div className="absolute inset-0" style={{ opacity: 0.03 }}>
          <svg width="100%" height="100%">
            <defs>
              <pattern id="auth-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#auth-grid)" />
          </svg>
        </div>

        {/* Road lane dashes — multiple rows */}
        {[30, 50, 70].map((pct, i) => (
          <div
            key={i}
            className="absolute left-0 right-0 pointer-events-none"
            style={{ top: `${pct}%`, opacity: 0.08 + i * 0.03 }}
          >
            <svg width="100%" height="6" viewBox="0 0 600 6">
              <line x1="0" y1="3" x2="600" y2="3" stroke="#E63946" strokeWidth="1.5" strokeDasharray="16 8" />
            </svg>
          </div>
        ))}

        <div className="relative z-10">
          <Logo dark />
        </div>

        {/* Score card mockup */}
        <div className="relative z-10 my-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-2xl p-5"
            style={{
              backgroundColor: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(8px)",
              maxWidth: 320,
            }}
          >
            <div
              className="text-xs mb-4 flex items-center gap-2"
              style={{
                color: "rgba(255,255,255,0.35)",
                fontFamily: "'DM Mono', monospace",
                letterSpacing: "0.08em",
              }}
            >
              <div className="w-4 h-px" style={{ backgroundColor: "rgba(255,255,255,0.35)" }} />
              READINESS SCORE
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <svg width="64" height="64" viewBox="0 0 64 64">
                  <circle cx="32" cy="32" r="27" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="5" />
                  <circle
                    cx="32" cy="32" r="27" fill="none" stroke="#E63946" strokeWidth="5"
                    strokeDasharray="115 170" strokeLinecap="round"
                    transform="rotate(-90 32 32)"
                  />
                </svg>
                <div
                  className="absolute inset-0 flex items-center justify-center font-bold"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "0.95rem",
                    color: "white",
                  }}
                >
                  72%
                </div>
              </div>
              <div>
                <div
                  className="font-bold text-white"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}
                >
                  Almost Ready
                </div>
                <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Data Analyst · Session 3
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {[
                { label: "STAR Structure", score: 82 },
                { label: "Evidence", score: 61 },
                { label: "Role Relevance", score: 75 },
              ].map((dim) => (
                <div key={dim.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'DM Mono', monospace", fontSize: "0.6rem" }}>
                      {dim.label}
                    </span>
                    <span className="text-xs font-bold" style={{ color: "white", fontFamily: "'DM Mono', monospace", fontSize: "0.65rem" }}>
                      {dim.score}%
                    </span>
                  </div>
                  <div className="rounded-full overflow-hidden" style={{ height: 3, backgroundColor: "rgba(255,255,255,0.1)" }}>
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${dim.score}%`,
                        backgroundColor: dim.score >= 75 ? "#22C55E" : dim.score >= 60 ? "#E63946" : "#F97316",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="absolute -top-4 -right-4 px-3 py-1.5 rounded-full flex items-center gap-1.5"
            style={{
              backgroundColor: "#E63946",
              boxShadow: "0 4px 12px rgba(230,57,70,0.4)",
            }}
          >
            <Check size={11} className="text-white" />
            <span
              className="text-xs font-bold text-white"
              style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.04em" }}
            >
              LIVE
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative z-10"
        >
          <div
            className="text-xs font-semibold uppercase tracking-widest mb-5"
            style={{
              color: "rgba(255,255,255,0.3)",
              fontFamily: "'DM Mono', monospace",
            }}
          >
            {isLogin ? "WELCOME BACK" : "GET STARTED FREE"}
          </div>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "2.2rem",
              fontWeight: 800,
              color: "white",
              lineHeight: 1.15,
              letterSpacing: "-0.04em",
            }}
          >
            Build confidence
            <br />
            <span style={{ color: "#E63946" }}>
              before the real interview.
            </span>
          </h2>
          <p
            className="mt-5 leading-relaxed text-sm"
            style={{ color: "rgba(255,255,255,0.4)", maxWidth: 300 }}
          >
            Your AI HRD is ready. Pick a role, add your context, and practice
            like it actually matters.
          </p>
          <div className="mt-8 flex flex-col gap-3">
            {[
              { icon: "🎯", text: "Personalized to your target role" },
              { icon: "🎙️", text: "Voice-based, adaptive interview session" },
              { icon: "📊", text: "Detailed readiness score after each session" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-base">{item.icon}</span>
                <span className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="text-xs relative z-10" style={{ color: "rgba(255,255,255,0.2)" }}>
          © 2026 Road2Work.id
        </div>
      </div>

      {/* Right: auth form */}
      <div
        className="flex items-center justify-center p-8 lg:p-16"
        style={{ backgroundColor: "#FAF7F2" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full"
          style={{ maxWidth: 400 }}
        >
          <div className="lg:hidden mb-8">
            <Logo />
          </div>

          <div
            className="flex items-center gap-3 mb-5"
            style={{
              color: "#E63946",
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.12em",
              fontWeight: 600,
            }}
          >
            <div className="w-6 h-px" style={{ backgroundColor: "#E63946" }} />
            {isLogin ? "SIGN IN" : "CREATE ACCOUNT"}
          </div>

          <h1
            className="mb-2"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "1.9rem",
              fontWeight: 800,
              color: "#1F2937",
              letterSpacing: "-0.04em",
            }}
          >
            {isLogin ? "Welcome back" : "Get started free"}
          </h1>
          <p className="mb-8 text-sm" style={{ color: "#656565" }}>
            {isLogin
              ? "Don't have an account? "
              : "Already have an account? "}
            <Link
              to={isLogin ? "/signup" : "/login"}
              className="no-underline font-semibold"
              style={{ color: "#E63946" }}
            >
              {isLogin ? "Sign up free" : "Sign in"}
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label
                  className="block text-sm font-medium mb-1.5"
                  style={{ color: "#1F2937" }}
                >
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border outline-none text-sm transition-all"
                  style={{
                    borderColor: "#D9DDE6",
                    backgroundColor: "#FDFDFD",
                    color: "#1F2937",
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
            )}

            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: "#1F2937" }}>
                Email
              </label>
              <input
                type="email"
                placeholder="you@email.com"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border outline-none text-sm transition-all"
                style={{
                  borderColor: "#D9DDE6",
                  backgroundColor: "#FDFDFD",
                  color: "#1F2937",
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
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: "#1F2937" }}>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  className="w-full px-4 py-3 pr-12 rounded-xl border outline-none text-sm transition-all"
                  style={{
                    borderColor: "#D9DDE6",
                    backgroundColor: "#FDFDFD",
                    color: "#1F2937",
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
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  style={{ color: "#A0A0A0" }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="text-right">
                <Link to="#" className="text-xs no-underline" style={{ color: "#A0A0A0" }}>
                  Forgot password?
                </Link>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 rounded-full font-bold text-white flex items-center justify-center gap-2 transition-all mt-2"
              style={{
                backgroundColor: "#E63946",
                fontFamily: "'Space Grotesk', sans-serif",
                letterSpacing: "-0.01em",
                boxShadow: "0 4px 20px rgba(230,57,70,0.32), 0 1px 3px rgba(0,0,0,0.1)",
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
              {isLogin ? "Sign In" : "Create Account"}
              <ArrowRight size={16} />
            </button>
          </form>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex-1 h-px" style={{ backgroundColor: "#E8E8E8" }} />
            <span className="text-xs" style={{ color: "#A0A0A0" }}>
              or continue with
            </span>
            <div className="flex-1 h-px" style={{ backgroundColor: "#E8E8E8" }} />
          </div>

          <button
            className="mt-4 w-full py-3.5 rounded-full border font-medium text-sm flex items-center justify-center gap-3 transition-all"
            style={{
              borderColor: "#E0E0E0",
              backgroundColor: "#FDFDFD",
              color: "#1F2937",
              boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#1F2937";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.07)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#E0E0E0";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 2px rgba(0,0,0,0.04)";
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" />
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853" />
              <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>

          <p className="text-center text-xs mt-8" style={{ color: "#A0A0A0" }}>
            By continuing, you agree to Road2Work's{" "}
            <Link to="#" className="no-underline" style={{ color: "#1F2937" }}>
              Terms
            </Link>{" "}
            and{" "}
            <Link to="#" className="no-underline" style={{ color: "#1F2937" }}>
              Privacy Policy
            </Link>
            .
          </p>
        </motion.div>
      </div>
    </div>
  );
}
