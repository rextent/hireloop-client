import Link from "next/link";
import {
  LogoFacebook,
  LogoLinkedin,
  MapPin,
} from "@gravity-ui/icons";

export default function Footer() {
  return (
    <footer className="bg-[#050816]">
      <div className="mx-auto max-w-7xl px-6 py-24">
        {/* Top Footer */}
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link href="/">
              <h2 className="text-[52px] font-bold leading-none">
                <span className="text-[#1E90FF]">hire</span>
                <span className="text-[#FF8A00]">loop</span>
              </h2>
            </Link>

            <p className="mt-8 max-w-[340px] text-[18px] leading-9 text-zinc-500">
              The AI-native career platform. Built for people who take their
              work seriously.
            </p>

            <div className="mt-16 flex items-center gap-4">
              <Link
                href="#"
                aria-label="Facebook"
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#12141f] text-zinc-400 transition-all duration-300 hover:bg-[#1c1f2d] hover:text-white"
              >
                <LogoFacebook className="h-5 w-5" />
              </Link>

              <Link
                href="#"
                aria-label="Pinterest"
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#5B4CF0] text-white transition-all duration-300 hover:opacity-90"
              >
                <MapPin className="h-5 w-5" />
              </Link>

              <Link
                href="#"
                aria-label="LinkedIn"
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#12141f] text-zinc-400 transition-all duration-300 hover:bg-[#1c1f2d] hover:text-white"
              >
                <LogoLinkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-8 text-lg font-semibold text-[#5B4CF0]">
              Product
            </h3>

            <ul className="space-y-5">
              <li>
                <Link
                  href="/jobs"
                  className="text-zinc-500 transition hover:text-white"
                >
                  Job Discovery
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="text-zinc-500 transition hover:text-white"
                >
                  Worker AI
                </Link>
              </li>

              <li>
                <Link
                  href="/companies"
                  className="text-zinc-500 transition hover:text-white"
                >
                  Companies
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="text-zinc-500 transition hover:text-white"
                >
                  Salary Data
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigations */}
          <div>
            <h3 className="mb-8 text-lg font-semibold text-[#5B4CF0]">
              Navigations
            </h3>

            <ul className="space-y-5">
              <li>
                <Link
                  href="#"
                  className="text-zinc-500 transition hover:text-white"
                >
                  Help Center
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="text-zinc-500 transition hover:text-white"
                >
                  Career Library
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="text-zinc-500 transition hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-8 text-lg font-semibold text-[#5B4CF0]">
              Resources
            </h3>

            <ul className="space-y-5">
              <li>
                <Link
                  href="#"
                  className="text-zinc-500 transition hover:text-white"
                >
                  Brand Guideline
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="text-zinc-500 transition hover:text-white"
                >
                  Newsroom
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-20 flex flex-col gap-4 border-t border-white/5 pt-8 text-sm text-zinc-600 md:flex-row md:items-center md:justify-between">
          <p>Copyright 2026 — HireLoop</p>

          <div className="flex items-center gap-8">
            <Link
              href="#"
              className="transition-colors duration-300 hover:text-white"
            >
              Terms & Policy
            </Link>

            <Link
              href="#"
              className="transition-colors duration-300 hover:text-white"
            >
              Privacy Guideline
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}