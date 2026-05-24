import { Link } from "react-router";
import { Logo } from "./Logo";
import { Twitter, Linkedin, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer style={{ backgroundColor: "#1F2937" }}>
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <Logo dark />
            <p
              className="mt-4 text-sm leading-relaxed"
              style={{ color: "rgba(255,255,255,0.45)", maxWidth: 320 }}
            >
              AI-powered interview readiness platform for students, fresh
              graduates, and early career switchers.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[Twitter, Linkedin, Instagram].map((Icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                  style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.backgroundColor =
                      "#E63946")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.backgroundColor =
                      "rgba(255,255,255,0.08)")
                  }
                >
                  <Icon size={15} className="text-white" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-5"
              style={{
                color: "rgba(255,255,255,0.28)",
                fontFamily: "'DM Mono', monospace",
              }}
            >
              Product
            </p>
            <div className="flex flex-col gap-3">
              {[
                { label: "How It Works", to: "/how-it-works" },
                { label: "Features", to: "/#features" },
                { label: "Role Coverage", to: "/" },
                { label: "Pricing", to: "/" },
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="text-sm no-underline transition-colors"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "white")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,0.45)")
                  }
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-5"
              style={{
                color: "rgba(255,255,255,0.28)",
                fontFamily: "'DM Mono', monospace",
              }}
            >
              Company
            </p>
            <div className="flex flex-col gap-3">
              {[
                { label: "About", to: "/about" },
                { label: "Blog", to: "/" },
                { label: "Privacy Policy", to: "/" },
                { label: "Terms of Service", to: "/" },
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="text-sm no-underline transition-colors"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "white")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,0.45)")
                  }
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div
          className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.28)" }}>
            © 2026 Road2Work.id — All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.28)" }}>
            Built for the next generation of talent.
          </p>
        </div>
      </div>
    </footer>
  );
}
