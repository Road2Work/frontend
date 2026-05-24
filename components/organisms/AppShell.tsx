import type { ReactNode } from 'react'
import SiteFooter from '@/components/organisms/SiteFooter'
import SiteNavbar from '@/components/organisms/SiteNavbar'

export default function AppShell({ children, withFooter = true }: { children: ReactNode; withFooter?: boolean }) {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <SiteNavbar />
      {children}
      {withFooter && <SiteFooter />}
    </div>
  )
}
