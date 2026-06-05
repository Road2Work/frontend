import Link from "next/link"

interface LogoProps {
  className?: string
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 ${className}`}>
      <span className="relative flex h-8 w-8 items-center justify-center">
        <span className="absolute inset-0 rounded-[10px] bg-[#B91C1C]" />
        <span className="absolute inset-[3px] rounded-[7px] border border-white/30" />
        <svg
          viewBox="0 0 24 24"
          className="relative h-4 w-4 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 18 L10 10 L14 14 L20 6" />
          <circle cx="20" cy="6" r="1.5" fill="currentColor" />
        </svg>
      </span>
      <span className="text-base font-semibold tracking-tight text-[#111111]">
        Road2Work<span className="text-[#B91C1C]">.</span>
        <span className="font-medium text-[#525252]">ai</span>
      </span>
    </Link>
  )
}
