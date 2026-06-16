import { getJobById } from '@/lib/api/jobs';
import { getUserSession } from '@/lib/core/sessions';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import React from 'react';
import JobApply from './JobApply';
import { ArrowLeft } from '@gravity-ui/icons';
import { getApplicationsByApplicant } from '@/lib/api/applications';
import { getPlanById } from '@/lib/api/plans';

export const dynamic = 'force-dynamic';

const ApplyPage = async ({ params }) => {
  const { id } = await params;
  const sessionUser = await getUserSession();

  if (!sessionUser) {
    redirect(`/signin?redirect=/jobs/${id}/apply`);
  }

  // ১. ইউজার ডেটা ফেচিং
  let user;
  try {
    const userRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${sessionUser.id}?t=${Date.now()}`, {
      cache: 'no-store',
      headers: { 'Cache-Control': 'no-cache' }
    });
    if (!userRes.ok) throw new Error("Failed to fetch user");
    user = await userRes.json();
  } catch (error) {
    console.error("Error fetching user data:", error);
    redirect('/signin');
  }

  const userId = user?._id || user?.id;
  const normalizedUser = {
    ...user,
    id: user?._id || user?.id,
  };
  console.log("USER OBJECT:", user);



  // ২. অ্যাপ্লিকেশন এবং জব ফেচিং
  const [applications, job] = await Promise.all([
    getApplicationsByApplicant(userId),
    getJobById(id)
  ]);

  const alreadyApplied = applications.some(
    app => app.jobId === id
  );

  const totalApplications = Array.isArray(applications) ? applications.length : 0;

  // ৩. লেটেস্ট প্ল্যান ডেটা ফেচিং
  const planId = user?.plan || 'seeker_free';
  const fetchedPlan = await getPlanById(planId);

  // গুরুত্বপূর্ণ ডিবাগিং: ডাটাবেজ থেকে কী আসছে তা চেক করার জন্য
  console.log("DEBUG: Plan ID being fetched:", planId);
  console.log("DEBUG: Plan Object received:", fetchedPlan);

  // লজিক ঠিক করা: 'fetchedPlan' যদি ডাটাবেজ থেকে সরাসরি আসে, 
  // তবে সেটি অবজেক্ট হিসেবেই থাকে। 
  const plan = fetchedPlan || { name: 'Free', maxApplicationsPerMonth: 3 };

  // ৪. লিমিট ক্যালকুলেশন
  const limit = plan?.maxApplicationsPerMonth || 3;
  const limitReached = totalApplications >= limit;
  const progressPercentage = Math.min((totalApplications / limit) * 100, 100);

  if (!job) {
    return <div className="flex min-h-[60vh] items-center justify-center text-zinc-500">Job not found.</div>;
  }

  return (

    <main className="min-h-screen bg-zinc-50 py-10 dark:bg-zinc-950">
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <Link href={`/jobs/${id}`} className="group mb-8 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-zinc-500 hover:bg-zinc-100 dark:bg-zinc-900">
          <ArrowLeft className="h-4 w-4" /> Back to Job Details
        </Link>

        {/* Plan Usage Card */}
        <div className="mb-8 flex flex-col justify-between gap-6 rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 md:flex-row md:items-center">
          <div>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase text-blue-700 dark:bg-blue-900/40">
              {plan?.name || 'Free'} Plan
            </span>
            <h2 className="mt-2 text-xl font-bold text-zinc-900 dark:text-white">Application Limit</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              You have used {totalApplications} out of {limit} applications.
            </p>
          </div>

          <div className="w-full md:w-64">
            <div className="flex justify-between text-sm font-medium mb-2 text-zinc-900 dark:text-white">
              <span>{totalApplications} / {limit}</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
              <div
                className={`h-full rounded-full transition-all duration-500 ${limitReached ? 'bg-red-500' : 'bg-blue-600'}`}
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>


        {!limitReached ? (

          <JobApply applicant={normalizedUser} job={job} alreadyApplied={alreadyApplied} />
        ) : (
          <div className="rounded-3xl border border-violet-500/20 bg-violet-50 p-10 text-center dark:bg-violet-500/5">
            <h3 className="text-3xl font-bold mb-4 text-zinc-900 dark:text-white">Application Limit Reached</h3>
            <p className="mb-8 text-lg text-zinc-600 dark:text-zinc-400">Upgrade your plan to apply for more jobs.</p>
            <Link href="/plans" className="px-8 py-4 bg-violet-600 text-white rounded-2xl font-bold">View Pricing</Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default ApplyPage;