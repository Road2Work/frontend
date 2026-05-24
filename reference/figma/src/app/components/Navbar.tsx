import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: "#FDFDFD",
        borderBottom: scrolled ? "1px solid #D9DDE6" : "1px solid transparent",
        boxShadow: scrolled ? "0 1px 12px rgba(0,0,0,0.06)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Logo />

        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "How It Works", to: "/how-it-works" },
            { label: "Features", to: "/#features" },
            { label: "About", to: "/about" },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="text-sm no-underline transition-colors"
              style={{ color: "#656565" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "#1F2937")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "#656565")
              }
            >
              {item.label}
            </Link>
          ))}
          <div className="w-px h-5" style={{ backgroundColor: "#D9DDE6" }} />
          <Link
            to="/login"
            className="text-sm no-underline font-medium"
            style={{ color: "#1F2937" }}
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="px-5 py-2 rounded-full text-sm font-medium text-white no-underline transition-all"
            style={{ backgroundColor: "#E63946" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.backgroundColor =
                "#C1121F")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.backgroundColor =
                "#E63946")
            }
          >
            Start Interview Practice
          </Link>
        </div>

        <button
          className="md:hidden p-2 rounded-lg"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ color: "#1F2937" }}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <div
          className="md:hidden px-6 pb-4 flex flex-col gap-3"
          style={{
            backgroundColor: "#FDFDFD",
            borderTop: "1px solid #D9DDE6",
          }}
        >
          <Link
            to="/how-it-works"
            className="text-sm no-underline py-2"
            style={{ color: "#656565" }}
            onClick={() => setMenuOpen(false)}
          >
            How It Works
          </Link>
          <Link
            to="/about"
            className="text-sm no-underline py-2"
            style={{ color: "#656565" }}
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/login"
            className="text-sm no-underline py-2 font-medium"
            style={{ color: "#1F2937" }}
            onClick={() => setMenuOpen(false)}
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="px-5 py-2.5 rounded-full text-sm font-medium text-white text-center no-underline"
            style={{ backgroundColor: "#E63946" }}
            onClick={() => setMenuOpen(false)}
          >
            Start Interview Practice
          </Link>
        </div>
      )}
    </nav>
  );
}
