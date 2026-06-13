import { Magnifier, MapPin } from "@gravity-ui/icons";

const trendingPositions = [
  "Product Designer",
  "AI Engineering",
  "Dev-ops Engineer",
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-20 pb-12">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(91,76,240,0.18),transparent_55%)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="mb-8 flex items-center gap-3 rounded-full border border-white/10 bg-[#111111] px-5 py-2 backdrop-blur-md">
            <span>💼</span>

            <span className="font-semibold text-white">
              50,000+
            </span>

            <span className="text-xs uppercase tracking-[0.15em] text-zinc-400">
              New Jobs This Month
            </span>
          </div>

          {/* Heading */}
          <h1 className="max-w-4xl text-[56px] font-semibold leading-[1.1] tracking-tight text-white md:text-[72px]">
            Find Your Dream Job Today
          </h1>

          {/* Description */}
          <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-400">
            HireLoop connects top talent with world-class companies.
            Browse thousands of curated opportunities and land your
            next role — faster.
          </p>

          {/* Search Box */}
          <div className="mt-10 w-full max-w-[820px]">
            <div className="flex h-14 items-center rounded-2xl border border-white/10 bg-[#0E1016] px-2">
              {/* Job Search */}
              <div className="flex flex-1 items-center gap-3 px-4">
                <Magnifier className="text-zinc-500" />

                <input
                  type="text"
                  placeholder="Job title, skill or company"
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
                />
              </div>

              {/* Divider */}
              <div className="h-6 w-px bg-white/10" />

              {/* Location */}
              <div className="flex flex-1 items-center gap-3 px-4">
                <MapPin className="text-zinc-500" />

                <input
                  type="text"
                  placeholder="Location or Remote"
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
                />
              </div>

              {/* Search Button */}
              <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#5B4CF0] text-white transition hover:bg-[#6D5DFC]">
                <Magnifier />
              </button>
            </div>
          </div>

          {/* Trending Positions */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <span className="text-sm text-zinc-500">
              Trending Position
            </span>

            {trendingPositions.map((item) => (
              <button
                key={item}
                className="rounded-full border border-white/10 bg-[#111111] px-4 py-2 text-xs text-zinc-300 transition hover:border-white/20 hover:text-white"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}