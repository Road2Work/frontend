'use client'

import Link from 'next/link'
import { ArrowUp } from 'lucide-react'
import Button from '@/components/atoms/Button'
import Logo from '@/components/atoms/Logo'

const platformLinks = [
  { label: 'Beranda', href: '/' },
  { label: 'Cara Kerja', href: '/how-it-works' },
  { label: 'Fitur', href: '/#features' },
  { label: 'Role', href: '/start' },
  { label: 'Tim', href: '/about' },
]

const availableRoles = ['Data Analyst', 'Data Scientist', 'AI Engineer', 'ML Engineer', 'Backend Developer']

export default function SiteFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-paper pb-8 pt-10 text-ink">
      <div className="w-full rounded-t-[36px] bg-[#f6f2ec] px-3 pb-8 pt-16 sm:px-5 lg:px-8">
        <div className="overflow-hidden rounded-[22px] bg-gradient-to-r from-[#ff6b5f] via-brand-red to-[#f45b2e] py-12 shadow-[0_20px_60px_rgba(230,57,70,0.22)]">
          <div className="whitespace-nowrap font-display text-[clamp(2.7rem,6.2vw,5.4rem)] font-black leading-none text-white">
            <div className="animate-[footer-marquee_18s_linear_infinite]">
              <span className="mx-8">Siap berlatih hari ini? Mulai dari role tujuanmu.</span>
              <span className="mx-8">Siap berlatih hari ini? Mulai dari role tujuanmu.</span>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-6 max-w-6xl border-t border-ink/10 pt-9">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.65fr_0.8fr_0.9fr_1.25fr]">
            <div>
              <Logo />
              <p className="mt-5 max-w-sm text-sm leading-7 text-muted">
                AI Interview Readiness Platform untuk mahasiswa, fresh graduate, dan career switcher. Berlatih interview sesuai role tujuan dengan AI HRD berbasis suara.
              </p>
              <p className="mt-5 text-sm text-muted">
                <span className="font-bold text-ink">Email:</span> hello@road2work.id
              </p>
            </div>

            <FooterColumn title="Platform">
              {platformLinks.map(link => (
                <Link key={link.label} href={link.href} className="text-sm text-muted transition hover:text-brand-red">
                  {link.label}
                </Link>
              ))}
            </FooterColumn>

            <FooterColumn title="Role Tersedia">
              {availableRoles.map(role => (
                <Link key={role} href="/start" className="text-sm text-muted transition hover:text-brand-red">
                  {role}
                </Link>
              ))}
            </FooterColumn>

            <div>
              <h3 className="font-display text-sm font-bold text-ink">Mulai Latihan</h3>
              <p className="mt-5 max-w-xs text-sm leading-6 text-ink/80">
                Bergabung dan latih interview kamu sekarang. Gratis untuk memulai.
              </p>
              <Button href="/signup" size="lg" className="mt-6">
                Mulai Latihan
              </Button>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-6xl flex-col gap-4 border-t border-ink/10 pt-7 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <span>(c) Copyright 2026 Road2Work.id - All Rights Reserved. Developed as part of DBS Dicoding Capstone Project.</span>
          <span className="font-bold text-brand-red">Your Roadmap to a Better Career</span>
        </div>
      </div>

      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Kembali ke atas"
        className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border-2 border-brand-red bg-paper text-brand-red shadow-[0_10px_28px_rgba(31,41,55,0.12)] transition hover:-translate-y-1 hover:bg-brand-red hover:text-white"
      >
        <ArrowUp className="h-6 w-6" />
      </button>
    </footer>
  )
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-display text-sm font-bold text-ink">{title}</h3>
      <div className="mt-5 flex flex-col gap-5">{children}</div>
    </div>
  )
}
