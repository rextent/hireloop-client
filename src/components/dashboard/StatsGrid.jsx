import StatCard from "./StatCard";

export default function StatsGrid({
  stats,
}) {
  return (
    <div
      className="
        grid
        grid-cols-1
        gap-6
        sm:grid-cols-2
        xl:grid-cols-4
      "
    >
      {stats.map((item) => (
        <StatCard
          key={item.title}
          icon={item.icon}
          title={item.title}
          value={item.value}
        />
      ))}
    </div>
  );
}