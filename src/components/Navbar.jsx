"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { Bars, Xmark } from "@gravity-ui/icons";
import { useSession, signOut } from "@/lib/auth-client";

const baseNavItems = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/plans" },
];

const dashboardLinks = {
  seeker: '/dashboard/seeker',
  recruiter: '/dashboard/recruiter',
  admin: '/dashboard/admin'
};

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  // স্ক্রিন রিসাইজ করলে মোবাইল মেনু অটো বন্ধ হবে
  useEffect(() => {
    const handleResize = () => setIsOpen(false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = async () => {
    await signOut();
  };

  // লজিক: সেশন ডাটা লোড হওয়া পর্যন্ত অপেক্ষা করুন
  const navItems = [...baseNavItems];
  if (!isPending && session?.user) {
    navItems.push({
      label: 'Dashboard',
      href: dashboardLinks[session.user.role || 'seeker']
    });
  }

  return (
    <header className="sticky top-0 z-50 w-full py-6">
      <div className="mx-auto max-w-7xl px-4">
        <nav className="relative flex h-20 items-center justify-between rounded-3xl border border-white/5 bg-[#121212]/90 px-6 lg:px-8 backdrop-blur-xl">
          
          <Link href="/" className="shrink-0">
            <h1 className="text-3xl font-bold tracking-tight">
              <span className="text-[#1E90FF]">hire</span>
              <span className="text-[#FF7A00]">loop</span>
            </h1>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-10 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[15px] font-medium text-zinc-300 transition-colors duration-200 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop Right Side */}
          <div className="hidden items-center lg:flex gap-8">
            <div className="h-5 w-px bg-white/15"></div>
            {!isPending ? (
              !session ? (
                <>
                  <Link href="/signin" className="text-[15px] font-medium text-[#7C4DFF] hover:text-[#9D7BFF]">Sign In</Link>
                  <Button as={Link} href="/signup" radius="lg" className="h-12 min-w-[145px] rounded-xl bg-gradient-to-r from-[#6D5DFC] to-[#7C4DFF] text-white">
                    Get Started
                  </Button>
                </>
              ) : (
                <>
                  <span className="text-sm text-zinc-300">{session.user.name}</span>
                  <Button onPress={handleLogout} variant="bordered" className="border-red-500/30 text-red-400">Logout</Button>
                </>
              )
            ) : null}
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-white" aria-label="Toggle Menu">
            {isOpen ? <Xmark width={24} height={24} /> : <Bars width={24} height={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <div className={`overflow-hidden transition-all duration-300 lg:hidden ${isOpen ? "mt-3 max-h-[500px]" : "max-h-0"}`}>
          <div className="rounded-3xl border border-white/10 bg-[#121212]/95 p-6 backdrop-blur-xl flex flex-col gap-5">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)} className="text-base font-medium text-zinc-300 hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}