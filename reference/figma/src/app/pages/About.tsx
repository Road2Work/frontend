import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, Heart, Target, Zap } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

const card = {
  backgroundColor: "#FDFDFD",
  border: "1px solid rgba(0,0,0,0.07)",
  borderRadius: 20,
  boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 6px 24px rgba(0,0,0,0.05)",
};

function SectionLabel({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div
      className="flex items-center gap-3"
      style={{
        color: dark ? "rgba(255,255,255,0.35)" : "#E63946",
        fontFamily: "'DM Mono', monospace",
        fontSize: "0.65rem",
        letterSpacing: "0.12em",
        fontWeight: 600,
      }}
    >
      <div className="w-8 h-px" style={{ backgroundColor: dark ? "rgba(255,255,255,0.35)" : "#E63946" }} />
      {children}
    </div>
  );
}

export default function About() {
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
            <SectionLabel>ABOUT ROAD2WORK</SectionLabel>
            <h1
              className="mt-5"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
                fontWeight: 800,
                color: "#1F2937",
                lineHeight: 1.05,
                letterSpacing: "-0.04em",
                maxWidth: 760,
              }}
            >
              Helping young talent turn real experience into{" "}
              <span style={{ color: "#E63946" }}>career-ready communication.</span>
            </h1>
            <p
              className="mt-7 text-lg leading-relaxed"
              style={{ color: "#656565", maxWidth: 580 }}
            >
              Road2Work is an AI-powered interview readiness platform built for
              students, fresh graduates, and early career switchers who have
              real experience — but struggle to articulate it clearly in
              high-stakes interview settings.
            </p>
          </motion.div>

          {/* Road divider */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16"
          >
            <svg width="100%" height="32" viewBox="0 0 800 32" preserveAspectRatio="none">
              <rect x="0" y="12" width="800" height="8" rx="4" fill="#1F2937" opacity="0.04" />
              <line x1="0" y1="16" x2="800" y2="16" stroke="#E63946" strokeWidth="1.5" strokeDasharray="16 8" opacity="0.35" />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 px-6" style={{ backgroundColor: "#FDFDFD" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionLabel>OUR MISSION</SectionLabel>
              <h2
                className="mt-5"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "clamp(1.7rem, 3vw, 2.3rem)",
                  fontWeight: 800,
                  color: "#1F2937",
                  lineHeight: 1.15,
                  letterSpacing: "-0.04em",
                }}
              >
                The interview gap is a communication problem, not a skills problem.
              </h2>
              <p
                className="mt-6 leading-relaxed"
                style={{ color: "#656565" }}
              >
                Thousands of talented students and early career professionals
                get overlooked in interviews — not because they lack capability,
                but because they don't know how to translate their experience
                into the language that hiring managers are looking for.
              </p>
              <p
                className="mt-4 leading-relaxed"
                style={{ color: "#656565" }}
              >
                Road2Work bridges that gap. By giving candidates a realistic,
                personalized voice interview experience with an adaptive AI HRD,
                we help them practice the actual skill of communicating their
                experience clearly, confidently, and with evidence.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              {[
                {
                  icon: Heart,
                  title: "Built for early career talent",
                  desc: "Specifically designed for students, fresh grads, and career switchers — not experienced executives.",
                },
                {
                  icon: Target,
                  title: "Context-first, not generic",
                  desc: "Every interview session is built around your actual experience, not a one-size-fits-all question bank.",
                },
                {
                  icon: Zap,
                  title: "Practice that mirrors reality",
                  desc: "Voice-based, adaptive, and evidence-focused — because that's how real interviews actually work.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
                  className="rounded-2xl p-5 flex items-start gap-4 transition-all"
                  style={{
                    backgroundColor: "#FAF7F2",
                    border: "1px solid rgba(0,0,0,0.06)",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.07)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 2px rgba(0,0,0,0.03)";
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "rgba(230,57,70,0.08)" }}
                  >
                    <item.icon size={20} style={{ color: "#E63946" }} />
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
                      {item.title}
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "#656565" }}>
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-6" style={{ backgroundColor: "#FAF7F2" }}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <SectionLabel>THE PROBLEM WE'RE SOLVING</SectionLabel>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                stat: "73%",
                label: "of fresh grads",
                desc: "feel underprepared for their first real interview",
              },
              {
                stat: "1st round",
                label: "elimination",
                desc: "happens most often due to unclear communication, not lack of skills",
              },
              {
                stat: "< 3%",
                label: "of prep tools",
                desc: "offer context-aware, voice-based adaptive practice",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-2xl p-8 transition-all"
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
                <div
                  className="mb-2"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "2.2rem",
                    fontWeight: 800,
                    color: "#E63946",
                    letterSpacing: "-0.04em",
                  }}
                >
                  {item.stat}
                </div>
                <div
                  className="font-bold text-sm mb-2"
                  style={{ color: "#1F2937", fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {item.label}
                </div>
                <p className="text-sm" style={{ color: "#656565", lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-6" style={{ backgroundColor: "#FDFDFD" }}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <SectionLabel>THE TEAM</SectionLabel>
            <h2
              className="mt-5"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(1.7rem, 3vw, 2.3rem)",
                fontWeight: 800,
                color: "#1F2937",
                letterSpacing: "-0.04em",
              }}
            >
              Built by people who remember the struggle.
            </h2>
            <p
              className="mt-4"
              style={{ color: "#656565", maxWidth: 480 }}
            >
              Road2Work was created by a team of product builders, educators,
              and former hiring managers who wanted to level the playing field.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { initials: "AR", name: "Aditya R.", role: "Founder & CEO" },
              { initials: "SK", name: "Sinta K.", role: "Head of Product" },
              { initials: "BW", name: "Bagas W.", role: "AI Lead" },
              { initials: "DP", name: "Dita P.", role: "Head of Growth" },
            ].map((person, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="text-center"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-lg font-bold mx-auto mb-3"
                  style={{
                    background:
                      i % 2 === 0
                        ? "linear-gradient(135deg, #E63946 0%, #A50F17 100%)"
                        : "linear-gradient(135deg, #1F2937 0%, #374151 100%)",
                    color: "white",
                    fontFamily: "'Space Grotesk', sans-serif",
                    boxShadow: i % 2 === 0
                      ? "0 4px 12px rgba(230,57,70,0.3)"
                      : "0 4px 12px rgba(0,0,0,0.15)",
                  }}
                >
                  {person.initials}
                </div>
                <div
                  className="font-bold text-sm"
                  style={{ color: "#1F2937", fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {person.name}
                </div>
                <div className="text-xs mt-0.5" style={{ color: "#A0A0A0" }}>
                  {person.role}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6" style={{ backgroundColor: "#1F2937" }}>
        <div className="max-w-4xl mx-auto">
          {/* Road decorative */}
          <div className="mb-12 opacity-10">
            <svg width="100%" height="24" viewBox="0 0 800 24" preserveAspectRatio="none">
              <rect x="0" y="8" width="800" height="8" rx="4" fill="white" />
              <line x1="0" y1="12" x2="800" y2="12" stroke="#E63946" strokeWidth="2" strokeDasharray="20 10" />
            </svg>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <SectionLabel dark>OUR VALUES</SectionLabel>
            <h2
              className="mt-5"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(1.7rem, 3vw, 2.3rem)",
                fontWeight: 800,
                color: "white",
                letterSpacing: "-0.04em",
              }}
            >
              What we stand for.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                title: "Honesty over hype",
                desc: "We tell candidates what they need to hear, not just what feels good. Honest feedback is the only way to actually improve.",
              },
              {
                title: "Practice over theory",
                desc: "Real readiness comes from doing — not from reading interview guides. We build for practice, not passive consumption.",
              },
              {
                title: "Equity of opportunity",
                desc: "Interview coaching shouldn't only be available to those who can afford career coaches. We're building something accessible.",
              },
            ].map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-2xl p-6 transition-all"
                style={{
                  backgroundColor: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.08)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.05)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                <div
                  className="w-1.5 h-6 rounded-full mb-4"
                  style={{ backgroundColor: "#E63946" }}
                />
                <h3
                  className="font-bold mb-3"
                  style={{
                    color: "white",
                    fontFamily: "'Space Grotesk', sans-serif",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {v.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6" style={{ backgroundColor: "#FAF7F2" }}>
        <div className="max-w-xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="mb-4"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                fontWeight: 800,
                color: "#1F2937",
                letterSpacing: "-0.04em",
              }}
            >
              Join the next generation of confident candidates.
            </h2>
            <p className="mb-10" style={{ color: "#656565" }}>
              Start practicing today. Your next interview deserves better
              preparation.
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white no-underline transition-all"
              style={{
                backgroundColor: "#E63946",
                fontFamily: "'Space Grotesk', sans-serif",
                boxShadow: "0 4px 20px rgba(230,57,70,0.32), 0 1px 3px rgba(0,0,0,0.1)",
                letterSpacing: "-0.01em",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "#C1121F";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(230,57,70,0.4), 0 2px 6px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "#E63946";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(230,57,70,0.32), 0 1px 3px rgba(0,0,0,0.1)";
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
