"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { signIn } from "@/app/actions/auth";
import { Eye, EyeOff, Zap, Lock, Mail, ArrowRight, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await signIn(formData);
      if (result?.error) setError(result.error);
    });
  }

  return (
    <div className="min-h-screen grid-bg flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl animate-float"
        style={{ background: "radial-gradient(circle, #00f5ff, transparent)" }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-10 blur-3xl animate-float"
        style={{ background: "radial-gradient(circle, #bf00ff, transparent)", animationDelay: "3s" }} />

      {/* Rotating ring decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-cyan-500/5 animate-spin-slow pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-purple-500/5 animate-spin-slow pointer-events-none"
        style={{ animationDirection: "reverse", animationDuration: "30s" }} />

      <div className="w-full max-w-md animate-slide-in relative z-10">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center animate-pulse-glow"
              style={{ background: "linear-gradient(135deg, #00f5ff, #bf00ff)" }}>
              <Zap size={22} className="text-black" />
            </div>
            <span className="text-2xl font-black tracking-tight neon-text-cyan">
              DRIZZLE<span className="text-white">HQ</span>
            </span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back</h1>
          <p className="text-slate-400 text-sm">
            Sign in to your AI command center
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl p-8 card-glow" style={{ border: "1px solid rgba(0,245,255,0.12)" }}>
          <form action={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
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
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
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

            {/* Error */}
            {error && (
              <div className="rounded-xl px-4 py-3 text-sm animate-fade-in"
                style={{
                  background: "rgba(255,0,128,0.08)",
                  border: "1px solid rgba(255,0,128,0.3)",
                  color: "#ff6b9d",
                }}>
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
                  Authenticating...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px" style={{ background: "rgba(0,245,255,0.1)" }} />
            <span className="text-xs text-slate-600">or</span>
            <div className="flex-1 h-px" style={{ background: "rgba(0,245,255,0.1)" }} />
          </div>

          <p className="text-center text-sm text-slate-500">
            No account yet?{" "}
            <Link
              href="/auth/signup"
              className="font-semibold transition-all hover:opacity-80"
              style={{ color: "#00f5ff" }}
            >
              Create one
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-700 mt-6">
          Protected by Supabase Auth · End-to-end encrypted
        </p>
      </div>
    </div>
  );
}
