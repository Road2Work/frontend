"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";
import { toast } from "sonner";
import { FiEye, FiEyeOff, FiMic, FiZap } from "react-icons/fi";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import Logo from "@/components/atoms/Logo";
import ProgressBar from "@/components/molecules/ProgressBar";
import { authService } from "@/services/auth.service";

const floatingRoles = [
  { label: "Data Analyst", className: "left-10 top-40 rotate-[-8deg]" },
  { label: "AI Engineer", className: "right-12 top-24 rotate-[7deg]" },
  { label: "Backend Dev", className: "right-16 bottom-32 rotate-[-6deg]" },
]

export default function AuthTemplate({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isLogin = mode === "login";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    const name = String(formData.get("name") ?? "");

    setIsSubmitting(true);
    try {
      const response = isLogin
        ? await authService.login({ email, password })
        : await authService.signup({ name, email, password });

      const requiresEmailVerification = 'requiresEmailVerification' in response.data && response.data.requiresEmailVerification;
      if (!response.data.accessToken || requiresEmailVerification) {
        toast.success("Akun berhasil dibuat", {
          description: "Cek email kamu untuk mengaktifkan akun Road2Work.id.",
        });
        router.push(`/verify-email?sent=1&email=${encodeURIComponent(email)}`);
        return;
      }

      localStorage.setItem("token", response.data.accessToken);
      const refreshToken = "refreshToken" in response.data ? response.data.refreshToken : undefined;
      if (typeof refreshToken === "string" && refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      }
      localStorage.setItem("user", JSON.stringify(response.data.user));
      document.cookie = `token=${response.data.accessToken}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
      document.cookie = `userRole=${response.data.user.role ?? "user"}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;

      toast.success("Berhasil masuk", {
        description: response.data.user.role === "admin" ? "Kamu akan diarahkan ke Admin Panel." : "Kamu akan diarahkan ke Readiness Hub.",
      });
      router.push(response.data.user.role === "admin" ? "/admin" : "/hub");
    } catch (error) {
      toast.error(isLogin ? "Gagal masuk" : "Gagal membuat akun", {
        description: error instanceof Error ? error.message : "Coba lagi beberapa saat lagi.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="grid min-h-screen bg-paper lg:grid-cols-2">
      <section className="relative hidden overflow-hidden bg-ink p-12 text-white lg:flex lg:flex-col">
        <div className="road-line absolute left-0 right-0 top-1/2 opacity-20" />
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand-red/20 blur-3xl" />
        <div className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-brand-red/10 blur-3xl" />

        <Logo dark />

        <div className="relative flex flex-1 items-center justify-center">
          {floatingRoles.map((role, index) => (
            <motion.div
              key={role.label}
              className={`absolute rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm font-bold text-white/75 shadow-[0_18px_40px_rgba(0,0,0,0.18)] backdrop-blur ${role.className}`}
              animate={{ y: [0, -12, 0], rotate: [0, index % 2 ? 4 : -4, 0] }}
              transition={{ duration: 4 + index, repeat: Infinity, ease: "easeInOut" }}
            >
              {role.label}
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-md rounded-[28px] border border-white/10 bg-white/8 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur"
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="font-mono text-[0.62rem] font-bold uppercase tracking-widest text-white/35">Skor Kesiapan</p>
                <h1 className="mt-3 font-display text-2xl font-black">Hampir Siap</h1>
              </div>
              <motion.div
                className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-red font-display text-xl font-black"
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              >
                72%
              </motion.div>
            </div>

            <div className="space-y-4">
              <ProgressBar label="Struktur STAR" value={82} tone="green" inverse />
              <ProgressBar label="Bukti Jawaban" value={61} inverse />
              <ProgressBar label="Relevansi Role" value={75} tone="amber" inverse />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <FiMic className="mb-3 h-5 w-5 text-brand-red" />
                <p className="text-sm font-bold">Berbasis Suara</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <FiZap className="mb-3 h-5 w-5 text-brand-red" />
                <p className="text-sm font-bold">Feedback cepat</p>
              </div>
            </div>
          </motion.div>
        </div>

        <p className="relative text-xs text-white/30">(c) 2026 Road2Work.id</p>
      </section>

      <section className="flex items-center justify-center px-5 py-12">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md"
        >
          <div className="mb-10 lg:hidden">
            <Logo />
          </div>

          <div className="mb-7">
            <div className="mb-4 inline-flex rounded-full bg-brand-red/10 px-3 py-1 font-mono text-[0.62rem] font-bold uppercase tracking-widest text-brand-red">
              {isLogin ? "Masuk" : "Daftar"}
            </div>
            <h2 className="font-display text-4xl font-black leading-tight text-ink">
              {isLogin ? "Lanjut latihanmu." : "Mulai latihanmu."}
            </h2>
            <p className="mt-3 text-sm text-muted">
              {isLogin ? "Belum punya akun? " : "Sudah punya akun? "}
              <Link href={isLogin ? "/signup" : "/login"} className="font-bold text-brand-red">
                {isLogin ? "Daftar" : "Masuk"}
              </Link>
            </p>
          </div>

          <form
            className="space-y-5"
            onSubmit={handleSubmit}
          >
            {!isLogin && (
              <div>
                <Label htmlFor="name" required>
                  Nama
                </Label>
                <Input id="name" name="name" placeholder="Nama kamu" autoComplete="name" required />
              </div>
            )}
            <div>
              <Label htmlFor="email" required>
                Email
              </Label>
              <Input id="email" name="email" type="email" placeholder="you@email.com" autoComplete="email" required />
            </div>
            <div>
              <Label htmlFor="password" required>
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 karakter"
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  className="pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted transition hover:text-ink"
                  aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full" withArrow={!isSubmitting} loading={isSubmitting}>
              {isLogin ? "Masuk" : "Buat Akun"}
            </Button>
          </form>

          <Button
            type="button"
            variant="secondary"
            className="mt-4 w-full"
            onClick={() => {
              window.location.href = authService.googleUrl();
            }}
          >
            Lanjut dengan Google
          </Button>

          <p className="mt-6 text-center text-xs leading-6 text-muted">
            Dengan melanjutkan, kamu menyetujui Ketentuan Layanan dan Kebijakan Privasi Road2Work.id.
          </p>
        </motion.div>
      </section>
    </main>
  );
}



