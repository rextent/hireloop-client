'use client';

import React, { useState, useMemo } from 'react';
import JobCard from './JobCard';
import { Funnel, CircleCheck, Magnifier } from '@gravity-ui/icons';

export default function JobClientLayout({ initialJobs }) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

  // ইউনিক ক্যাটাগরি এবং টাইপ বের করার জন্য (ডাইনামিক ড্রপডাউন)
  const categories = useMemo(() => {
    const list = initialJobs.map(j => j.category).filter(Boolean);
    return ['All', ...new Set(list)];
  }, [initialJobs]);

  const types = useMemo(() => {
    const list = initialJobs.map(j => j.type).filter(Boolean);
    return ['All', ...new Set(list)];
  }, [initialJobs]);

  // সার্চ এবং ফিল্টার লজিক
  const filteredJobs = useMemo(() => {
    return initialJobs.filter(job => {
      const matchesSearch = job.title?.toLowerCase().includes(search.toLowerCase()) || 
                            job.companyName?.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || job.category === selectedCategory;
      const matchesType = selectedType === 'All' || job.type === selectedType;
      
      return matchesSearch && matchesCategory && matchesType;
    });
  }, [search, selectedCategory, selectedType, initialJobs]);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      
      {/* Sidebar Filter Section */}
      <aside className="w-full lg:w-64 shrink-0 bg-[#121214] border border-zinc-800/80 p-5 rounded-2xl h-fit sticky top-6">
        <div className="flex items-center gap-2 pb-4 mb-4 border-b border-zinc-800/60">
          <Funnel className="w-4 h-4 text-cyan-400" />
          <h2 className="text-sm font-semibold tracking-wide uppercase text-zinc-200">Filters</h2>
        </div>

        {/* Search Input */}
        <div className="mb-5">
          <label className="text-xs text-zinc-400 font-medium mb-1.5 block">Search Job / Company</label>
          <div className="relative">
            <input 
              type="text"
              placeholder="e.g. Frontend..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#18181b] border border-zinc-800 rounded-xl pl-9 pr-4 py-2 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
            />
            <Magnifier className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-5">
          <label className="text-xs text-zinc-400 font-medium mb-1.5 block">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-[#18181b] border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:border-cyan-500/50"
          >
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>

        {/* Job Type Filter */}
        <div>
          <label className="text-xs text-zinc-400 font-medium mb-1.5 block">Job Type</label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full bg-[#18181b] border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:border-cyan-500/50"
          >
            {types.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </aside>

      {/* Main Content: Jobs Grid */}
      <main className="flex-1">
        <div className="flex justify-between items-center mb-5">
          <p className="text-xs text-zinc-400">
            Showing <span className="text-zinc-200 font-medium">{filteredJobs.length}</span> results
          </p>
        </div>

        {filteredJobs.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/10">
            <p className="text-zinc-500 font-medium text-sm">No jobs match your filter criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredJobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </main>

    </div>
  );
}