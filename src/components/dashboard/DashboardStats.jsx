import StatsGrid from "@/components/dashboard/StatsGrid";

import {
  Persons,
  Briefcase,
  CircleCheck,
  FileText,
} from "@gravity-ui/icons";

const recruiterStats = [
  {
    title: "Total Job Posts",
    value: "48",
    icon: FileText,
  },
  {
    title: "Total Applicants",
    value: "1,284",
    icon: Persons,
  },
  {
    title: "Active Jobs",
    value: "18",
    icon: Briefcase,
  },
  {
    title: "Jobs Closed",
    value: "32",
    icon: CircleCheck,
  },
];

export default function RecruiterDashboard() {
  return (
    <section className="mt-8">
      <StatsGrid stats={recruiterStats} />
    </section>
  );
}