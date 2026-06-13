import {
  Briefcase,
  Factory,
  Magnifier,
  Star,
} from "@gravity-ui/icons";

const stats = [
  {
    icon: Briefcase,
    value: "50K",
    label: "Active Jobs",
  },
  {
    icon: Factory,
    value: "12K",
    label: "Companies",
  },
  {
    icon: Magnifier,
    value: "2M",
    label: "Job Seekers",
  },
  {
    icon: Star,
    value: "97%",
    label: "Satisfaction Rate",
  },
];

export default function StatsSection() {
  return (
    <section className="relative -mt-12 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative">
          {/* Stars */}
          <div
            className="absolute inset-0 opacity-70"
            style={{
              backgroundImage:
                "radial-gradient(#4f46e5 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          {/* Purple Glow */}
          <div
            className="
              absolute
              left-1/2
              top-[280px]
              h-[300px]
              w-[1000px]
              -translate-x-1/2
              rounded-full
              bg-[#5B4CF0]/40
              blur-[140px]
            "
          />

          {/* Globe Container */}
          <div className="relative h-[700px] overflow-hidden">
            <img
              src="/globe.png"
              alt="Globe"
              className="
                absolute
                left-1/2
                bottom-[-520px]
                w-[1500px]
                max-w-none
                -translate-x-1/2
              "
            />
          </div>

          {/* Text */}
          <div className="absolute left-1/2 top-[330px] z-20 -translate-x-1/2 text-center">
            <h2 className="max-w-4xl text-[44px] font-medium leading-tight text-white">
              Assisting over 15,000 job seekers
              <br />
              find their dream positions.
            </h2>
          </div>
        </div>

        {/* Cards */}
        <div className="relative z-30 -mt-[170px] grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="
                  min-h-[200px]
                  rounded-[20px]
                  border
                  border-white/10
                  bg-gradient-to-b
                  from-[#111111]
                  to-[#080808]
                  p-8
                  backdrop-blur-xl
                "
              >
                <Icon className="h-5 w-5 text-zinc-400" />

                <h3 className="mt-12 text-[54px] font-semibold leading-none text-white">
                  {item.value}
                </h3>

                <p className="mt-3 text-sm text-zinc-400">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}