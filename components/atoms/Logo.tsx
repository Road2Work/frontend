import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const logoSources = {
  normal: '/logo/Logor2w-normal.png',
  light: '/logo/Logor2w-light.png',
}

export default function Logo({ dark = false }: { dark?: boolean }) {
  const logoSrc = dark ? logoSources.light : logoSources.normal

  return (
    <Link href="/" className="inline-flex items-center gap-2.5">
      <Image
        src={logoSrc}
        alt="Road2Work.id logo"
        width={34}
        height={40}
        className="h-9 w-8 shrink-0 object-contain"
        priority
        unoptimized
      />
      <span className={cn('font-display text-[1.05rem] font-semibold tracking-normal', dark ? 'text-white' : 'text-ink')}>
        Road2Work<span className="text-brand-red">.id</span>
      </span>
    </Link>
  )
}
