import Button from '@/components/atoms/Button'

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-5">
      <div className="max-w-md text-center">
        <p className="text-sm font-bold uppercase text-brand-red">404</p>
        <h1 className="mt-3 font-display text-4xl font-black text-ink">Halaman tidak ditemukan</h1>
        <p className="mt-4 text-sm leading-7 text-muted">
          Halaman yang kamu cari tidak tersedia atau sudah dipindahkan.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/">Kembali ke Beranda</Button>
        </div>
      </div>
    </main>
  )
}
