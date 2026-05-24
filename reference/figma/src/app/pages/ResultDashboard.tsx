import { Link } from "react-router";
import { motion } from "motion/react";
import {
  RotateCcw,
  ArrowRight,
  Target,
  Zap,
  BarChart2,
  Clock,
  MessageSquare,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Lightbulb,
  TrendingUp,
  Award,
  BookOpen,
  Eye,
  Cpu,
  Volume2,
} from "lucide-react";
import { AppHeader } from "../components/AppHeader";

// ─── Design tokens ─────────────────────────────────────────────────────────────
const card = {
  backgroundColor: "#FDFDFD",
  border: "1px solid rgba(0,0,0,0.07)",
  borderRadius: 20,
  boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 6px 24px rgba(0,0,0,0.05)",
};
const ctaShadow = "0 4px 20px rgba(230,57,70,0.28), 0 1px 3px rgba(0,0,0,0.1)";

// ─── Score ring ────────────────────────────────────────────────────────────────
function ScoreRing({ score, size = 192, strokeWidth = 10 }: { score: number; size?: number; strokeWidth?: number }) {
  const r = (size - strokeWidth * 2) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  const ringColor = score >= 80 ? "#22C55E" : score >= 65 ? "#F59E0B" : "#E63946";

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${ringColor}18 0%, transparent 65%)`,
          transform: "scale(1.5)",
        }}
      />
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ position: "relative" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth={strokeWidth} />
        <motion.circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none"
          stroke={ringColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          initial={{ strokeDasharray: `0 ${circ}` }}
          animate={{ strokeDasharray: `${dash} ${circ}` }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.4 }}
        />
        <text
          x="50%" y="44%"
          textAnchor="middle"
          dy="0.35em"
          fontSize={size / 4}
          fontWeight="800"
          fill="#1F2937"
          style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.04em" }}
        >
          {score}
        </text>
        <text
          x="50%" y="63%"
          textAnchor="middle"
          fontSize={size / 14}
          fill="#A0A0A0"
          style={{ fontFamily: "'DM Mono', monospace", letterSpacing: "0.06em" }}
        >
          KESIAPAN
        </text>
      </svg>
    </div>
  );
}

// ─── Score bar ─────────────────────────────────────────────────────────────────
type LucideIcon = React.ComponentType<{ size?: number; style?: React.CSSProperties }>;

function ScoreBar({
  label,
  score,
  icon: Icon,
  delay = 0,
}: {
  label: string;
  score: number;
  icon?: LucideIcon;
  delay?: number;
}) {
  const isGood = score >= 75;
  const isMid = score >= 60;
  const barColor = isGood ? "#22C55E" : isMid ? "#F59E0B" : "#E63946";
  const textColor = isGood ? "#16A34A" : isMid ? "#B45309" : "#DC2626";

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2.5">
          {Icon && (
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${barColor}18` }}
            >
              <Icon size={11} style={{ color: barColor }} />
            </div>
          )}
          <span className="text-sm" style={{ color: "#4B5563", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {label}
          </span>
        </div>
        <span
          className="text-sm"
          style={{ color: textColor, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, letterSpacing: "-0.01em" }}
        >
          {score}
        </span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "#F0F0F0" }}>
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: barColor }}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.9, delay: delay + 0.4, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

// ─── Data ──────────────────────────────────────────────────────────────────────
const scoreBreakdown = [
  { label: "Relevansi Peran", score: 70, icon: Target },
  { label: "Struktur STAR", score: 78, icon: BookOpen },
  { label: "Spesifisitas Bukti", score: 55, icon: BarChart2 },
  { label: "Akurasi Teknis", score: 62, icon: Cpu },
  { label: "Kejelasan Komunikasi", score: 82, icon: Volume2 },
  { label: "Kesadaran Diri", score: 68, icon: Eye },
];

const strengths = [
  { text: "Kejelasan komunikasi konsisten di semua jawaban", tag: "P2, P3, P5" },
  { text: "Struktur STAR diterapkan dengan baik di pertanyaan kunci", tag: "P2, P4" },
  { text: "Pemahaman industri dan peran yang baik", tag: "P1, P3" },
];

const improvements = [
  { text: "Spesifisitas bukti — tambahkan angka, skala, dan hasil nyata", priority: "Tinggi" as const },
  { text: "Kedalaman teknis — jelaskan lebih detail tools dan metodologi yang digunakan", priority: "Sedang" as const },
  { text: "Kesadaran diri — refleksikan pelajaran yang dipetik secara eksplisit", priority: "Sedang" as const },
];

const practiceSteps = [
  "Untuk setiap jawaban, sertakan minimal satu metrik spesifik: %, Rp, durasi, atau skala.",
  "Tulis ulang jawaban P1 menggunakan template S-T-A-R-R — tambahkan kalimat Hasil kedua.",
  "Rekam respons 90 detik untuk P3, lalu dengarkan kembali dan tandai bagian yang masih samar.",
];

const sessionStats = [
  { icon: MessageSquare, label: "Pertanyaan", value: "5 / 5" },
  { icon: Clock, label: "Durasi", value: "14 menit" },
  { icon: Calendar, label: "Tanggal", value: "15 Jul 2025" },
];

// ─── Highlighted span ──────────────────────────────────────────────────────────
function Mark({ children }: { children: React.ReactNode }) {
  return (
    <mark
      style={{
        backgroundColor: "rgba(34,197,94,0.14)",
        color: "#15803D",
        borderRadius: 3,
        padding: "0 3px",
        fontWeight: 600,
      }}
    >
      {children}
    </mark>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ResultDashboard() {
  const overallScore = 72;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAF7F2" }}>
      <AppHeader backTo="/hub" backLabel="Kembali ke Hub" />

      <main className="max-w-5xl mx-auto px-5 py-10 space-y-4">

        {/* ── HERO SCORE CARD ───────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="rounded-3xl p-7 md:p-8 overflow-hidden relative"
          style={card}
        >
          {/* Corner glow */}
          <div
            className="absolute top-0 left-0 pointer-events-none"
            style={{
              width: 340,
              height: 340,
              background: "radial-gradient(circle at 0% 0%, rgba(230,57,70,0.055) 0%, transparent 65%)",
            }}
          />

          {/* Label */}
          <div
            className="inline-flex items-center gap-2 mb-6"
            style={{
              color: "#E63946",
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.14em",
            }}
          >
            <div className="w-5 h-px" style={{ backgroundColor: "#E63946" }} />
            HASIL WAWANCARA
          </div>

          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 xl:gap-12">

            {/* Ring */}
            <ScoreRing score={overallScore} size={184} strokeWidth={10} />

            {/* Center text */}
            <div className="flex-1 text-center lg:text-left">
              {/* Status badges */}
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-4">
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs"
                  style={{
                    backgroundColor: "rgba(31,41,55,0.05)",
                    color: "#374151",
                    border: "1px solid rgba(0,0,0,0.08)",
                    fontFamily: "'DM Mono', monospace",
                    letterSpacing: "0.04em",
                  }}
                >
                  <Target size={10} />
                  Analis Data · Sesi Teknikal
                </div>
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{
                    backgroundColor: "rgba(234,179,8,0.1)",
                    color: "#B45309",
                    border: "1px solid rgba(234,179,8,0.22)",
                  }}
                >
                  <Zap size={10} />
                  Hampir Siap
                </div>
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{
                    backgroundColor: "rgba(230,57,70,0.07)",
                    color: "#E63946",
                    border: "1px solid rgba(230,57,70,0.16)",
                  }}
                >
                  <BarChart2 size={10} />
                  Bukti: Lemah
                </div>
              </div>

              {/* Headline */}
              <h1
                className="mb-3"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "clamp(1.4rem, 2.6vw, 1.85rem)",
                  fontWeight: 800,
                  color: "#1F2937",
                  lineHeight: 1.18,
                  letterSpacing: "-0.04em",
                }}
              >
                Fondasi kuat —
                <br />
                perkuat bukti nyata.
              </h1>
              <p className="text-sm leading-relaxed" style={{ color: "#656565", maxWidth: 400 }}>
                Struktur dan komunikasi kamu sudah bagus. Celah utama: tambahkan angka nyata dan hasil terukur di setiap jawaban. Itu yang membawamu dari Hampir Siap ke Siap Kerja.
              </p>
            </div>

            {/* Session stats */}
            <div
              className="flex flex-row lg:flex-col gap-5 lg:gap-4 shrink-0 border-t lg:border-t-0 lg:border-l pt-5 lg:pt-0 lg:pl-8 w-full lg:w-auto justify-center lg:justify-start"
              style={{ borderColor: "rgba(0,0,0,0.06)" }}
            >
              {sessionStats.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "rgba(0,0,0,0.04)" }}
                  >
                    <Icon size={14} style={{ color: "#9CA3AF" }} />
                  </div>
                  <div>
                    <div
                      className="text-xs"
                      style={{ color: "#A0A0A0", fontFamily: "'DM Mono', monospace", letterSpacing: "0.06em" }}
                    >
                      {label}
                    </div>
                    <div
                      className="text-sm"
                      style={{ color: "#1F2937", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, letterSpacing: "-0.01em" }}
                    >
                      {value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── STRENGTHS + IMPROVEMENT AREAS ─────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Strengths */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl p-6"
            style={{ ...card, borderTop: "3px solid #22C55E" }}
          >
            <div
              className="flex items-center gap-2 mb-5"
              style={{
                color: "#16A34A",
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.62rem",
                letterSpacing: "0.12em",
              }}
            >
              <Award size={11} style={{ color: "#22C55E" }} />
              KEKUATAN
            </div>
            <div className="space-y-4">
              {strengths.map((s, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" }}
                  >
                    <CheckCircle2 size={10} style={{ color: "#22C55E" }} />
                  </div>
                  <div>
                    <p className="text-sm leading-snug" style={{ color: "#1F2937" }}>{s.text}</p>
                    <span
                      className="text-xs mt-1 inline-block"
                      style={{ color: "#A0A0A0", fontFamily: "'DM Mono', monospace", letterSpacing: "0.04em" }}
                    >
                      {s.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Improvement areas */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="rounded-2xl p-6"
            style={{ ...card, borderTop: "3px solid #E63946" }}
          >
            <div
              className="flex items-center gap-2 mb-5"
              style={{
                color: "#E63946",
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.62rem",
                letterSpacing: "0.12em",
              }}
            >
              <TrendingUp size={11} style={{ color: "#E63946" }} />
              AREA PERBAIKAN
            </div>
            <div className="space-y-4">
              {improvements.map((s, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: "rgba(230,57,70,0.07)", border: "1px solid rgba(230,57,70,0.15)" }}
                  >
                    <ChevronRight size={10} style={{ color: "#E63946" }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm leading-snug" style={{ color: "#1F2937" }}>{s.text}</p>
                    <span
                      className="inline-block mt-1.5 text-xs px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: s.priority === "High" ? "rgba(230,57,70,0.07)" : "rgba(245,158,11,0.08)",
                        color: s.priority === "High" ? "#E63946" : "#B45309",
                        fontFamily: "'DM Mono', monospace",
                        letterSpacing: "0.04em",
                      }}
                    >
                      Prioritas {s.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── BEFORE → AFTER ────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-2xl p-6"
          style={card}
        >
          <div className="flex items-center justify-between mb-5">
            <div
              className="flex items-center gap-2"
              style={{
                color: "#9CA3AF",
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.62rem",
                letterSpacing: "0.12em",
              }}
            >
              <div className="w-4 h-px" style={{ backgroundColor: "#9CA3AF", opacity: 0.6 }} />
              PERBAIKAN JAWABAN: SEBELUM → SESUDAH
            </div>
            <div
              className="text-xs px-2.5 py-1 rounded-full"
              style={{
                backgroundColor: "rgba(0,0,0,0.04)",
                color: "#9CA3AF",
                fontFamily: "'DM Mono', monospace",
                letterSpacing: "0.04em",
              }}
            >
              P1 · Proyek SQL
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Before */}
            <div>
              <div
                className="flex items-center gap-2 mb-2.5 text-xs"
                style={{ color: "#DC2626", fontFamily: "'DM Mono', monospace", letterSpacing: "0.06em" }}
              >
                <div
                  className="w-4 h-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.2)" }}
                >
                  <span style={{ fontSize: 9, lineHeight: 1 }}>✗</span>
                </div>
                JAWABAN KAMU
              </div>
              <div
                className="rounded-xl p-4 text-sm leading-relaxed"
                style={{
                  backgroundColor: "rgba(239,68,68,0.03)",
                  border: "1px solid rgba(239,68,68,0.1)",
                  color: "#6B7280",
                  lineHeight: 1.75,
                  fontStyle: "italic",
                }}
              >
                "Saya banyak pakai SQL waktu magang dan membantu meningkatkan database kami. Saya menjalankan beberapa query dan memperbaiki masalah performa."
              </div>
              <div
                className="mt-2.5 text-xs px-3 py-2 rounded-lg"
                style={{ backgroundColor: "rgba(239,68,68,0.04)", color: "#DC2626" }}
              >
                Kurang: nama perusahaan, skala, angka spesifik, hasil terukur
              </div>
            </div>

            {/* After */}
            <div>
              <div
                className="flex items-center gap-2 mb-2.5 text-xs"
                style={{ color: "#16A34A", fontFamily: "'DM Mono', monospace", letterSpacing: "0.06em" }}
              >
                <div
                  className="w-4 h-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" }}
                >
                  <span style={{ fontSize: 9, lineHeight: 1 }}>✓</span>
                </div>
                JAWABAN YANG DIPERBAIKI
              </div>
              <div
                className="rounded-xl p-4 text-sm"
                style={{
                  backgroundColor: "rgba(34,197,94,0.03)",
                  border: "1px solid rgba(34,197,94,0.14)",
                  color: "#374151",
                  lineHeight: 1.8,
                }}
              >
                "Saat magang di PT XYZ, saya mengoptimalkan{" "}
                <Mark>3 query SQL</Mark> pada database PostgreSQL yang menangani{" "}
                <Mark>2 juta transaksi per hari</Mark>, sehingga waktu query berkurang dari{" "}
                <Mark>4 detik → 0,3 detik</Mark> dan tim analis hemat{" "}
                <Mark>~2 jam/hari</Mark>."
              </div>
              <div
                className="mt-2.5 text-xs px-3 py-2 rounded-lg"
                style={{ backgroundColor: "rgba(34,197,94,0.04)", color: "#16A34A" }}
              >
                Ditambahkan: nama perusahaan, skala, angka spesifik, waktu yang dihemat
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── SCORE BREAKDOWN + NEXT PRACTICE ──────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

          {/* Score breakdown — 3 cols */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="md:col-span-3 rounded-2xl p-6"
            style={card}
          >
            <div
              className="flex items-center gap-2 mb-6"
              style={{
                color: "#9CA3AF",
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.62rem",
                letterSpacing: "0.12em",
              }}
            >
              <div className="w-4 h-px" style={{ backgroundColor: "#9CA3AF", opacity: 0.6 }} />
              RINCIAN SKOR
            </div>
            <div className="space-y-4">
              {scoreBreakdown.map((d, i) => (
                <ScoreBar key={d.label} label={d.label} score={d.score} icon={d.icon} delay={i * 0.07} />
              ))}
            </div>
          </motion.div>

          {/* Next practice — 2 cols (dark card) */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-2 rounded-2xl p-6 flex flex-col"
            style={{ backgroundColor: "#1F2937", borderRadius: 20 }}
          >
            <div
              className="flex items-center gap-2 mb-1"
              style={{
                color: "rgba(255,255,255,0.35)",
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.62rem",
                letterSpacing: "0.12em",
              }}
            >
              <Lightbulb size={11} style={{ color: "#E63946" }} />
              LATIHAN BERIKUTNYA
            </div>
            <h3
              className="mb-5"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: "#FFFFFF",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                fontSize: "1.05rem",
              }}
            >
              Fokus: Bukti &amp; Dampak
            </h3>

            <div className="space-y-3.5 flex-1">
              {practiceSteps.map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs"
                    style={{
                      backgroundColor: "rgba(230,57,70,0.2)",
                      border: "1px solid rgba(230,57,70,0.3)",
                      color: "#E63946",
                      fontFamily: "'DM Mono', monospace",
                      fontWeight: 700,
                      minWidth: 20,
                    }}
                  >
                    {i + 1}
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
                    {step}
                  </p>
                </div>
              ))}
            </div>

            {/* Estimated gain */}
            <div
              className="mt-6 pt-4"
              style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div
                className="text-xs mb-1"
                style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'DM Mono', monospace", letterSpacing: "0.06em" }}
              >
                ESTIMASI PENINGKATAN
              </div>
              <div className="flex items-baseline gap-2">
                <span
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "1.3rem",
                    fontWeight: 800,
                    color: "#22C55E",
                    letterSpacing: "-0.03em",
                  }}
                >
                  +12–18 pts
                </span>
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                  di sesi berikutnya
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── CTAs ─────────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 pb-10"
        >
          <Link
            to="/start"
            className="px-7 py-3.5 rounded-full font-semibold text-white no-underline inline-flex items-center gap-2 transition-all"
            style={{
              backgroundColor: "#E63946",
              boxShadow: ctaShadow,
              fontSize: "0.9rem",
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: "-0.01em",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 8px 28px rgba(230,57,70,0.38), 0 2px 6px rgba(0,0,0,0.12)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = ctaShadow;
            }}
          >
            <RotateCcw size={14} />
            Latihan Lagi
          </Link>
          <Link
            to="/start"
            className="px-7 py-3.5 rounded-full font-medium no-underline inline-flex items-center gap-2 transition-all border"
            style={{
              color: "#1F2937",
              borderColor: "rgba(0,0,0,0.12)",
              backgroundColor: "#FDFDFD",
              fontSize: "0.9rem",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "#1F2937";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(0,0,0,0.12)";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
            }}
          >
            Coba Peran Lain
            <ArrowRight size={14} />
          </Link>
        </motion.div>

      </main>
    </div>
  );
}
