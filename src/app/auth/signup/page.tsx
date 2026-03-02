"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { signUp } from "@/app/actions/auth";
import {
  Eye,
  EyeOff,
  Zap,
  Lock,
  Mail,
  User,
  ArrowRight,
  Loader2,
  CheckCircle,
} from "lucide-react";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    setError(null);
    setSuccess(null);
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    startTransition(async () => {
      const result = await signUp(formData);
      if (result?.error) setError(result.error);
      if (result?.success) setSuccess(result.success);
    });
  }

  return (
    <div className="min-h-screen grid-bg flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background orbs */}
      <div
        className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl animate-float"
        style={{ background: "radial-gradient(circle, #bf00ff, transparent)" }}
      />
      <div
        className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full opacity-10 blur-3xl animate-float"
        style={{
          background: "radial-gradient(circle, #00ff88, transparent)",
          animationDelay: "2s",
        }}
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-purple-500/5 animate-spin-slow pointer-events-none" />

      <div className="w-full max-w-md animate-slide-in relative z-10">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center animate-pulse-glow"
              style={{
                background: "linear-gradient(135deg, #bf00ff, #00f5ff)",
              }}
            >
              <Zap size={22} className="text-black" />
            </div>
            <span className="text-2xl font-black tracking-tight neon-text-purple">
              DRIZZLE<span className="text-white">HQ</span>
            </span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Create account
          </h1>
          <p className="text-slate-400 text-sm">
            Join the AI-powered marketing command center
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8 card-glow"
          style={{ border: "1px solid rgba(191,0,255,0.15)" }}
        >
          {success ? (
            <div className="text-center py-6 animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                style={{ background: "rgba(0,255,136,0.1)", border: "1px solid rgba(0,255,136,0.3)" }}>
                <CheckCircle size={32} style={{ color: "#00ff88" }} />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">
                Check your inbox
              </h2>
              <p className="text-slate-400 text-sm mb-6">{success}</p>
              <Link
                href="/auth/login"
                className="glow-btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold"
              >
                Sign In <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <form action={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Full Name
                </label>
                <div className="relative">
                  <User
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                  <input
                    name="fullName"
                    type="text"
                    required
                    placeholder="Alex Johnson"
                    className="neon-input w-full pl-10 pr-4 py-3 rounded-xl text-sm"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Email
                </label>
                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="you@drizzle.com"
                    className="neon-input w-full pl-10 pr-4 py-3 rounded-xl text-sm"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={8}
                    placeholder="Min 8 characters"
                    className="neon-input w-full pl-10 pr-12 py-3 rounded-xl text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyan-400 transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                  <input
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Repeat password"
                    className="neon-input w-full pl-10 pr-4 py-3 rounded-xl text-sm"
                  />
                </div>
              </div>

              {/* Error */}
              {error && (
                <div
                  className="rounded-xl px-4 py-3 text-sm animate-fade-in"
                  style={{
                    background: "rgba(255,0,128,0.08)",
                    border: "1px solid rgba(255,0,128,0.3)",
                    color: "#ff6b9d",
                  }}
                >
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isPending}
                className="glow-btn-primary w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 mt-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isPending ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          )}

          {!success && (
            <>
              <div className="my-6 flex items-center gap-3">
                <div
                  className="flex-1 h-px"
                  style={{ background: "rgba(191,0,255,0.1)" }}
                />
                <span className="text-xs text-slate-600">or</span>
                <div
                  className="flex-1 h-px"
                  style={{ background: "rgba(191,0,255,0.1)" }}
                />
              </div>

              <p className="text-center text-sm text-slate-500">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="font-semibold transition-all hover:opacity-80"
                  style={{ color: "#bf00ff" }}
                >
                  Sign in
                </Link>
              </p>
            </>
          )}
        </div>

        <p className="text-center text-xs text-slate-700 mt-6">
          Protected by Supabase Auth · End-to-end encrypted
        </p>
      </div>
    </div>
  );
}
