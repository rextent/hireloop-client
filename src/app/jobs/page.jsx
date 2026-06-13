import React from 'react';
import { getJobs } from '@/lib/api/jobs';
import JobClientLayout from '@/components/jobs/JobClientLayout';

export default async function JobsPage() {
  const jobs = (await getJobs()) || [];

  return (
    <div className="min-h-screen bg-[#09090b] text-white py-12 px-4 sm:px-6 lg:px-8 antialiased">
      <div className="max-w-7xl mx-auto">
        
        {/* Modern Minimalist Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800/60 pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
              Explore Opportunities
            </h1>
            <p className="mt-2 text-sm text-zinc-400">
              Find your next career move from our curated list of tech opportunities.
            </p>
          </div>
          
          {/* Active Counters */}
          <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-xl self-start md:self-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-medium text-zinc-400">
              Live Vacancies: <strong className="text-zinc-100 font-semibold">{jobs.length}</strong>
            </span>
          </div>
        </div>

        {/* Filter and Content Layout */}
        <JobClientLayout initialJobs={jobs} />

      </div>
    </div>
  );
}