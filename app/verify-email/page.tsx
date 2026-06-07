"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import Logo from "@/components/atoms/Logo";
import { authService } from "@/services/auth.service";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get("email") ?? "";
  const sent = searchParams.get("sent");
  const [email, setEmail] = useState(initialEmail);
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const helperText = useMemo(() => {
    if (isVerified) return "Email berhasil diverifikasi. Kamu sudah bisa masuk dan mulai membangun profil latihan.";
    if (sent) return "Kami mengirim kode 6 digit ke email kamu. Masukkan kode itu untuk mengaktifkan akun.";
    return "Masukkan email dan kode OTP yang kamu terima untuk mengaktifkan akun Road2Work.";
  }, [isVerified, sent]);

  const normalizedOtp = otp.replace(/\D/g, "").slice(0, 6);
  const canSubmit = email.trim().length > 3 && normalizedOtp.length === 6 && !isVerifying && !isVerified;

  const verifyOtp = async () => {
    if (!canSubmit) return;
    setIsVerifying(true);
    try {
      await authService.verifyEmail(email.trim(), normalizedOtp);
      setIsVerified(true);
      toast.success("Email berhasil diverifikasi");
    } catch (error) {
      toast.error("Kode belum cocok", {
        description: error instanceof Error ? error.message : "Cek lagi kode OTP atau kirim ulang kode baru.",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const resend = async () => {
    if (!email || isResending) return;
    setIsResending(true);
    try {
      await authService.resendVerification(email.trim());
      setOtp("");
      toast.success("Kode OTP baru sudah dikirim");
    } catch (error) {
      toast.error("Gagal mengirim ulang", {
        description: error instanceof Error ? error.message : "Coba lagi beberapa saat lagi.",
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-5 py-10">
      <section className="w-full max-w-md rounded-[28px] border border-black/[0.07] bg-white p-8 shadow-[0_18px_60px_rgba(0,0,0,0.08)]">
        <div className="mb-8">
          <Logo />
        </div>
        <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.22em] text-brand-red">Verifikasi Email</p>
        <h1 className="mt-3 font-display text-3xl font-black text-ink">Masukkan kode OTP.</h1>
        <p className="mt-4 text-sm leading-7 text-muted">{helperText}</p>

        <div className="mt-7 space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
              placeholder="you@email.com"
              disabled={isVerified}
            />
          </div>

          <div>
            <Label htmlFor="otp">Kode OTP</Label>
            <Input
              id="otp"
              inputMode="numeric"
              autoComplete="one-time-code"
              value={normalizedOtp}
              onChange={event => setOtp(event.target.value)}
              placeholder="6 digit kode"
              className="text-center font-mono text-2xl font-bold tracking-[0.35em]"
              disabled={isVerified}
            />
          </div>

          <Button type="button" onClick={verifyOtp} loading={isVerifying} disabled={!canSubmit} className="w-full">
            Verifikasi Akun
          </Button>

          <button
            type="button"
            onClick={resend}
            disabled={!email || isResending || isVerified}
            className="w-full rounded-full px-4 py-3 text-center text-sm font-bold text-ink/70 transition hover:text-brand-red disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isResending ? "Mengirim kode..." : "Kirim ulang kode OTP"}
          </button>
        </div>

        <Button href="/login" variant="secondary" className="mt-5 w-full">
          Masuk ke Akun
        </Button>
      </section>
    </main>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <main className="flex min-h-screen items-center justify-center bg-paper px-5">
        <p className="text-sm text-muted">Memuat halaman verifikasi...</p>
      </main>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}
