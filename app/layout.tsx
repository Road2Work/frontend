import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/providers/ThemeProvider'
import QueryProvider from '@/providers/QueryProvider'
import Toaster from '@/components/ui/sonner'

export const metadata: Metadata = {
  title: 'Road2Work',
  description:
    'Platform berbasis AI yang membantu job seeker di Indonesia mempersiapkan interview kerja secara lebih terarah, terukur, dan realistis.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/logo/Logor2w-normal.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [{ url: '/logo/Logor2w-normal.png', type: 'image/png' }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className="light" suppressHydrationWarning>
      <body
        className="antialiased bg-paper text-ink"
        suppressHydrationWarning
      >
        <QueryProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  )
}
