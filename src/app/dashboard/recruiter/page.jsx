'use client'

import { useSession } from '@/lib/auth-client';
import DashboardStats from '@/components/dashboard/DashboardStats';

import {
  Persons,
  Briefcase,
  CircleCheck,
  FileText,
} from '@gravity-ui/icons';

const RecruiterDashboardHomePage = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <div>Loading...</div>;
  }

  const user = session?.user;

  const stats = [
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

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-semibold">
        Welcome Back, {user?.name}
      </h2>

      <DashboardStats stats={stats} />
    </div>
  );
};

export default RecruiterDashboardHomePage;