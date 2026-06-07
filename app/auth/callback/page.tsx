"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import Button from "@/components/atoms/Button";
import Logo from "@/components/atoms/Logo";
import { authService } from "@/services/auth.service";

const persistAuth = (response: Awaited<ReturnType<typeof authService.exchangeOauthCode>>) => {
  const { accessToken, refreshToken, user } = response.data;

  if (!accessToken) throw new Error("Token login tidak diterima dari server.");

  localStorage.setItem("token", accessToken);
  if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("user", JSON.stringify(user));
  document.cookie = `token=${accessToken}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
  document.cookie = `userRole=${user.role ?? "user"}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;

  return user;
};

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("Menyelesaikan login Google...");

  useEffect(() => {
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error) {
      setMessage("Login Google dibatalkan atau gagal diproses.");
      return;
    }

    if (!code) {
      setMessage("Kode login Google tidak ditemukan.");
      return;
    }

    authService.exchangeOauthCode(code)
      .then(response => {
        const user = persistAuth(response);
        toast.success("Berhasil masuk dengan Google");
        router.replace(user.role === "admin" ? "/admin" : "/hub");
      })
      .catch(error => {
        setMessage(error instanceof Error ? error.message : "Login Google belum bisa diproses.");
      });
  }, [router, searchParams]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-5">
      <section className="w-full max-w-md rounded-[28px] border border-black/[0.07] bg-white p-8 text-center shadow-[0_18px_60px_rgba(0,0,0,0.08)]">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.22em] text-brand-red">Google Login</p>
        <h1 className="mt-3 font-display text-3xl font-black text-ink">Sedang masuk ke Road2Work.</h1>
        <p className="mt-4 text-sm leading-7 text-muted">{message}</p>
        <Button href="/login" variant="secondary" className="mt-8 w-full">
          Kembali ke Login
        </Button>
      </section>
    </main>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <main className="flex min-h-screen items-center justify-center bg-paper px-5">
        <p className="text-sm text-muted">Menyelesaikan login Google...</p>
      </main>
    }>
      <AuthCallbackContent />
    </Suspense>
  );
}
