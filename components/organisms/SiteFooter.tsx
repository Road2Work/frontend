'use client'

import Link from 'next/link'
import { ArrowUp } from 'lucide-react'
import Button from '@/components/atoms/Button'
import Logo from '@/components/atoms/Logo'

const platformLinks = [
  { label: 'Produk', href: '/#product' },
  { label: 'Cara Kerja', href: '/#workflow' },
  { label: 'Fitur', href: '/#features' },
  { label: 'Demo', href: '/#demo' },
]

const legalLinks = [
  { label: 'Pusat Bantuan', href: '#' },
  { label: 'Tanya Jawab (FAQ)', href: '#' },
  { label: 'Syarat & Ketentuan', href: '#' },
  { label: 'Kebijakan Privasi', href: '#' },
]

export default function SiteFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-paper pb-8 pt-10 text-ink">
      <div className="w-full rounded-t-[36px] bg-[#f6f2ec] px-3 pb-8 pt-10 sm:px-5 lg:px-8">
        <div className="mx-auto max-w-6xl border-t border-ink/10 pt-9">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.65fr_0.8fr_0.9fr_1.25fr]">
            <div>
              <Logo />
              <p className="mt-5 max-w-sm text-sm leading-7 text-muted">
                Platform kesiapan karier untuk membaca profil, menemukan role yang relevan, melatih jawaban interview, dan memahami langkah perbaikan berikutnya.
              </p>
              <p className="mt-5 text-sm text-muted">
                <span className="font-bold text-ink">Email:</span> hello@road2work.id
              </p>
              <div className="mt-7 rounded-2xl border border-brand-red/15 bg-brand-red/5 p-4 transition-colors hover:bg-brand-red/10">
                <p className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-brand-red">
                  Capstone Project
                </p>
                <p className="mt-2 text-xs font-medium leading-5 text-ink/70">
                  Dikembangkan oleh Tim <span className="font-bold text-ink">CC26-PSU050</span> untuk mendukung tema <span className="font-bold italic text-ink">Future-Ready Work & Economy</span>.
                </p>
              </div>
            </div>

            <FooterColumn title="Platform">
              {platformLinks.map(link => (
                <Link key={link.label} href={link.href} className="text-sm text-muted transition hover:text-brand-red">
                  {link.label}
                </Link>
              ))}
            </FooterColumn>

            <FooterColumn title="Legal & Bantuan">
              {legalLinks.map(link => (
                <Link key={link.label} href={link.href} className="text-sm text-muted transition hover:text-brand-red">
                  {link.label}
                </Link>
              ))}
            </FooterColumn>

            <div>
              <h3 className="font-display text-sm font-bold text-ink">Mulai dari Profil</h3>
              <p className="mt-5 max-w-xs text-sm leading-6 text-ink/80">
                Bangun profil latihan lebih dulu, lalu lanjut ke role fit dan interview berbasis suara.
              </p>
              <Button href="/signup" size="lg" className="mt-6">
                Mulai Bangun Profil
              </Button>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-6xl flex-col gap-4 border-t border-ink/10 pt-7 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <span>(c) 2026 Road2Work.id. All rights reserved.</span>
          <span className="font-bold text-brand-red">Your Roadmap to Interview Readiness</span>
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
