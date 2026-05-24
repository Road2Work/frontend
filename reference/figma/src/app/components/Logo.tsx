import { Link } from "react-router";

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2 no-underline">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
        style={{ backgroundColor: "#E63946" }}
      >
        <span
          className="text-white text-xs"
          style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}
        >
          R2
        </span>
      </div>
      <span
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 600,
          fontSize: "1.05rem",
          color: dark ? "#FDFDFD" : "#1F2937",
        }}
      >
        Road2Work
        <span style={{ color: "#E63946" }}>.id</span>
      </span>
    </Link>
  );
}
