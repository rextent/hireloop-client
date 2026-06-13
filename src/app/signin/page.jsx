"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "@/lib/auth-client";

import { At } from "@gravity-ui/icons";
import { Lock } from "@gravity-ui/icons";
import { Eye } from "@gravity-ui/icons";
import { EyeSlash } from "@gravity-ui/icons";
import { Check } from "@gravity-ui/icons";

export default function SigninPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || "/";

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignin = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const result = await signIn.email({
        email,
        password,
      });

      if (result?.error) {
        setError(
          result.error.message || "Invalid email or password"
        );
        return;
      }

      setSuccess("Login successful!");

      setTimeout(() => {
        router.push(redirectTo);
      }, 1000);
    } catch (err) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[180px]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 py-10">
        <div className="grid w-full gap-12 lg:grid-cols-2">
          {/* LEFT SIDE */}
          <div className="hidden lg:flex flex-col justify-center">
            <span className="mb-5 inline-flex w-fit rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
              🔐 Welcome Back
            </span>

            <h1 className="text-6xl font-bold leading-tight">
              Continue Your
              <span className="block text-violet-500">
                Career Journey
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-lg text-zinc-400">
              Access your dashboard, track applications,
              manage your profile, and discover new
              opportunities.
            </p>

            <div className="mt-10 space-y-5">
              {[
                "Track job applications",
                "Manage your professional profile",
                "Get matched with employers",
                "Access your dashboard instantly",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-4"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-500/20">
                    <Check className="text-violet-400" />
                  </div>

                  <span className="text-zinc-300">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md rounded-[32px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-2xl">
              <div className="mb-8 text-center">
                <h2 className="text-4xl font-bold">
                  Sign In
                </h2>

                <p className="mt-3 text-zinc-400">
                  Access your HireLoop account
                </p>
              </div>

              <form
                onSubmit={handleSignin}
                className="space-y-5"
              >
                {/* Email */}
                <div className="relative">
                  <At className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />

                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 pl-12 pr-4 outline-none transition-all focus:border-violet-500"
                  />
                </div>

                {/* Password */}
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />

                  <input
                    type={
                      showPassword ? "text" : "password"
                    }
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 pl-12 pr-12 outline-none transition-all focus:border-violet-500"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500"
                  >
                    {showPassword ? (
                      <EyeSlash />
                    ) : (
                      <Eye />
                    )}
                  </button>
                </div>

                {/* Forgot Password */}
                <div className="flex justify-end">
                  <Link
                    href="/forgot-password"
                    className="text-sm text-violet-400 hover:text-violet-300"
                  >
                    Forgot Password?
                  </Link>
                </div>

                {error && (
                  <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-400">
                    {success}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="h-14 w-full rounded-2xl bg-violet-600 font-semibold transition hover:bg-violet-700 disabled:opacity-50"
                >
                  {loading
                    ? "Signing In..."
                    : "Sign In"}
                </button>
              </form>

              <div className="mt-6 text-center text-zinc-400">
                Don't have an account?{" "}
                <Link
                  href={`/signup?redirect=${redirectTo}`}
                  className="font-medium text-violet-400 hover:text-violet-300"
                >
                  Create Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}