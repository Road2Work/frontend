import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { Logo } from "./Logo";

interface AppHeaderProps {
  backTo?: string;
  backLabel?: string;
  right?: React.ReactNode;
}

export function AppHeader({
  backTo = "/hub",
  backLabel = "Back to Hub",
  right,
}: AppHeaderProps) {
  return (
    <header
      className="sticky top-0 z-40 px-6 h-16 flex items-center justify-between border-b"
      style={{ backgroundColor: "#FDFDFD", borderColor: "#D9DDE6" }}
    >
      <Logo />
      <div className="flex items-center gap-4">
        {right}
        <Link
          to={backTo}
          className="text-sm no-underline flex items-center gap-1.5 transition-colors"
          style={{ color: "#656565" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#1F2937")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#656565")}
        >
          <ArrowLeft size={14} />
          {backLabel}
        </Link>
      </div>
    </header>
  );
}
