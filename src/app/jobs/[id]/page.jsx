import { getJobById } from "@/lib/api/jobs";
import Link from "next/link";
import {
  Briefcase,
  MapPin,
  Calendar,
  ArrowLeft,
} from "@gravity-ui/icons";

const formatSalary = (min, max, currency) => {
  if (!min || !max) return "Negotiable";

  const format = (num) =>
    new Intl.NumberFormat("en-US").format(num);

  return `${format(min)} - ${format(max)} ${currency}`;
};

const formatDate = (date) => {
  if (!date) return "Not specified";

  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default async function JobDetailsPage({ params }) {
  const { id } = await params;
  const job = await getJobById(id);

  if (!job) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="max-w-md rounded-3xl border border-red-500/20 bg-red-50 p-10 text-center shadow-lg shadow-red-500/5 transition-all dark:bg-red-950/20">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-500/20">
            <Briefcase className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-red-600 dark:text-red-400">
            Job Not Found
          </h2>
          <p className="mb-6 text-zinc-500 dark:text-zinc-400">
            The requested job does not exist, has expired, or has been removed from our platform.
          </p>
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 rounded-xl bg-zinc-200 px-6 py-3 font-medium text-zinc-700 transition hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Browse Other Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50 pb-20 pt-8 dark:bg-zinc-950">
      <section className="mx-auto max-w-7xl px-4 md:px-6">
        
        {/* Top Navigation */}
        <div className="mb-6">
          <Link
            href="/jobs"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-zinc-500 shadow-sm transition-all hover:bg-zinc-100 hover:text-zinc-900 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Jobs
          </Link>
        </div>

        {/* Hero Header Section */}
        <div className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 md:p-12">
          {/* Decorative background element */}
          <div className="absolute right-0 top-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl" />

          <div className="relative z-10">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-blue-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-700 dark:bg-blue-900/40 dark:text-blue-400">
                {job.category}
              </span>
              <span className="rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">
                {job.type}
              </span>
              {job.isRemote && (
                <span className="rounded-full bg-amber-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 dark:bg-amber-900/40 dark:text-amber-400">
                  Remote Allowed
                </span>
              )}
            </div>

            <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white md:text-5xl lg:text-6xl">
              {job.title}
            </h1>

            <p className="text-xl font-medium text-zinc-600 dark:text-zinc-400">
              {job.companyName}
            </p>

            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 rounded-2xl bg-zinc-50 p-5 dark:bg-zinc-800/50">
              {/* Employment Type Icon & Text */}
              <div className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
                  <Briefcase className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500">Employment Type</p>
                  <p className="font-semibold">{job.type}</p>
                </div>
              </div>

              {/* Location Icon & Text */}
              <div className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
                  <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500">Location</p>
                  <p className="font-semibold">
                    {job.isRemote
                      ? "Remote"
                      : `${job.location?.city || ""} ${
                          job.location?.country || ""
                        }`}
                  </p>
                </div>
              </div>

              {/* Deadline Icon & Text */}
              <div className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
                  <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500">Apply Before</p>
                  <p className="font-semibold">{formatDate(job.deadline)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          
          {/* Left Content (Job Description) */}
          <div className="space-y-8 lg:col-span-2">
            
            <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 md:p-10">
              <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-zinc-900 dark:text-white">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
                  1
                </span>
                Responsibilities
              </h2>
              <div className="prose prose-zinc max-w-none whitespace-pre-line leading-relaxed text-zinc-600 dark:prose-invert dark:text-zinc-400">
                {job.responsibilities}
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 md:p-10">
              <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-zinc-900 dark:text-white">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
                  2
                </span>
                Requirements
              </h2>
              <div className="prose prose-zinc max-w-none whitespace-pre-line leading-relaxed text-zinc-600 dark:prose-invert dark:text-zinc-400">
                {job.requirements}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <aside className="relative">
            <div className="sticky top-24 rounded-3xl border border-zinc-200 bg-white p-6 shadow-md dark:border-zinc-800 dark:bg-zinc-900 md:p-8">
              
              <h3 className="mb-6 text-xl font-bold text-zinc-900 dark:text-white">
                Job Overview
              </h3>

              <div className="space-y-5 rounded-2xl bg-zinc-50 p-5 dark:bg-zinc-800/50">
                
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-zinc-500">Salary Range</p>
                  <p className="text-lg font-bold text-zinc-900 dark:text-white">
                    {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
                  </p>
                </div>
                
                <hr className="border-zinc-200 dark:border-zinc-700" />

                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-zinc-500">Category</p>
                  <p className="text-right font-semibold text-zinc-900 dark:text-white">{job.category}</p>
                </div>

                <hr className="border-zinc-200 dark:border-zinc-700" />

                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-zinc-500">Employment</p>
                  <p className="text-right font-semibold text-zinc-900 dark:text-white">{job.type}</p>
                </div>

                <hr className="border-zinc-200 dark:border-zinc-700" />

                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-zinc-500">Work Mode</p>
                  <p className="text-right font-semibold text-zinc-900 dark:text-white">
                    {job.isRemote ? "Remote" : "On-site"}
                  </p>
                </div>
              </div>

              {/* Solid Color Apply Button */}
              <Link
                href={`/jobs/${id}/apply`}
                className="group mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:scale-[1.02] hover:bg-blue-700 hover:shadow-blue-600/40 active:scale-[0.98]"
              >
                Apply for this job
                <svg 
                  className="h-5 w-5 transition-transform group-hover:translate-x-1" 
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              
              <p className="mt-4 text-center text-xs text-zinc-400">
                Application closes on <br/>
                <span className="font-medium text-zinc-500 dark:text-zinc-300">{formatDate(job.deadline)}</span>
              </p>
            </div>
          </aside>

        </div>
      </section>
    </main>
  );
}