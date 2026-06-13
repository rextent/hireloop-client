"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signUp } from "@/lib/auth-client";

import { Person } from "@gravity-ui/icons";
import { At } from "@gravity-ui/icons";
import { Lock } from "@gravity-ui/icons";
import { Eye } from "@gravity-ui/icons";
import { EyeSlash } from "@gravity-ui/icons";
import { Check } from "@gravity-ui/icons";
import { Description, Label, Radio, RadioGroup } from "@heroui/react";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("seeker");

  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  // Updated regex to include '#'
  const hasMinLength = password.length >= 6;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[@$!%*?&#]/.test(password);

  const handleSignup = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const plan = role === 'seeker' ? 'seeker_free' : 'recruiter_free';

    if (!name || !email || !password) {
      setError("Please fill all fields");
      return;
    }

    // Checking validation using the UI states directly
    if (!hasMinLength || !hasUppercase || !hasNumber || !hasSpecial) {
      setError(
        "Password must contain at least 6 characters, 1 uppercase letter, 1 number, and 1 special character."
      );
      return;
    }

    try {
      setLoading(true);

      const result = await signUp.email({
        name,
        email,
        password,
        role,
        plan
      });

      if (result?.error) {
        setError(result.error.message || "Signup failed");
        return;
      }

      setSuccess("Account created successfully!");

      // Use redirectTo to navigate back properly
      setTimeout(() => {
        router.push(redirectTo);
      }, 1500);
    } catch (err) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background */}
      <div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[180px]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 py-10">
        <div className="grid w-full gap-12 lg:grid-cols-2">
          {/* LEFT SECTION */}
          <div className="hidden flex-col justify-center lg:flex">
            <span className="mb-5 inline-flex w-fit rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
              🚀 Join HireLoop Today
            </span>

            <h1 className="text-6xl font-bold leading-tight">
              Build Your
              <span className="block text-violet-500">Dream Career</span>
            </h1>

            <p className="mt-6 max-w-lg text-lg text-zinc-400">
              Connect with top companies, discover new opportunities, and manage
              your professional journey in one powerful platform.
            </p>

            <div className="mt-10 space-y-5">
              {[
                "Access thousands of jobs worldwide",
                "Track your applications in real-time",
                "Get discovered by top employers",
                "Build your professional profile",
              ].map((item) => (
                <div key={item} className="flex items-center gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-500/20">
                    <Check className="text-violet-400" />
                  </div>

                  <span className="text-zinc-300">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md rounded-[32px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-2xl">
              <div className="mb-8 text-center">
                <h2 className="text-4xl font-bold">Create Account</h2>

                <p className="mt-3 text-zinc-400">
                  Start your journey with HireLoop
                </p>
              </div>

              <form onSubmit={handleSignup} className="space-y-5">
                {/* Name */}
                <div className="relative">
                  <Person className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />

                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 pl-12 pr-4 outline-none transition-all focus:border-violet-500"
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <At className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />

                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 pl-12 pr-4 outline-none transition-all focus:border-violet-500"
                  />
                </div>

                {/* Password */}
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 pl-12 pr-12 outline-none transition-all focus:border-violet-500"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500"
                  >
                    {showPassword ? <EyeSlash /> : <Eye />}
                  </button>
                </div>

                {/* Role */}
                <div className="flex flex-col gap-4">
                  <Label className="font-medium text-zinc-300">
                    Account Type
                  </Label>

                  <div className="flex gap-6">
                    <label className="flex cursor-pointer items-center gap-2">
                      <input
                        type="radio"
                        name="role"
                        value="seeker"
                        checked={role === "seeker"}
                        onChange={(e) => setRole(e.target.value)}
                      />
                      Job Seeker
                    </label>

                    <label className="flex cursor-pointer items-center gap-2">
                      <input
                        type="radio"
                        name="role"
                        value="recruiter"
                        checked={role === "recruiter"}
                        onChange={(e) => setRole(e.target.value)}
                      />
                      Recruiter
                    </label>
                  </div>
                </div>

                {/* Password Requirements */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="mb-3 text-sm font-medium text-zinc-300">
                    Password Requirements
                  </p>

                  <div className="space-y-2 text-sm">
                    <p
                      className={
                        hasMinLength ? "text-green-400" : "text-zinc-400"
                      }
                    >
                      {hasMinLength ? "✓" : "•"} Minimum 6 characters
                    </p>

                    <p
                      className={
                        hasUppercase ? "text-green-400" : "text-zinc-400"
                      }
                    >
                      {hasUppercase ? "✓" : "•"} One uppercase letter
                    </p>

                    <p
                      className={hasNumber ? "text-green-400" : "text-zinc-400"}
                    >
                      {hasNumber ? "✓" : "•"} One number
                    </p>

                    <p
                      className={
                        hasSpecial ? "text-green-400" : "text-zinc-400"
                      }
                    >
                      {hasSpecial ? "✓" : "•"} One special character
                    </p>
                  </div>
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
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
              </form>

              <div className="mt-6 text-center text-zinc-400">
                Already have an account?{" "}
                <Link
                  href={`/signin?redirect=${redirectTo}`}
                  className="font-medium text-violet-400 hover:text-violet-300"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}