'use client';

import React, { useState, useEffect, useMemo } from 'react';
import JobCard from './JobCard';
import { Funnel, Magnifier } from '@gravity-ui/icons';
import { useRouter, useSearchParams } from 'next/navigation';

const ITEMS_PER_PAGE = 9;

export default function JobClientLayout({ initialJobs }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  // Dynamic Categories
  const categories = useMemo(() => {
    const list = initialJobs.map((job) => job.category).filter(Boolean);
    return ['All', ...new Set(list)];
  }, [initialJobs]);

  // Dynamic Types
  const types = useMemo(() => {
    const list = initialJobs.map((job) => job.type).filter(Boolean);
    return ['All', ...new Set(list)];
  }, [initialJobs]);

  // Load values from URL on initial render
  useEffect(() => {
    const searchValue = searchParams.get('search') || '';
    const categoryValue = searchParams.get('category') || 'All';
    const typeValue = searchParams.get('type') || 'All';
    const pageValue = Number(searchParams.get('page')) || 1;

    setSearch(searchValue);
    setSelectedCategory(categoryValue);
    setSelectedType(typeValue);
    setCurrentPage(pageValue);
  }, [searchParams]);

  // Filter Jobs
  const filteredJobs = useMemo(() => {
    return initialJobs.filter((job) => {
      const matchesSearch =
        job.title?.toLowerCase().includes(search.toLowerCase()) ||
        job.companyName?.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' ||
        job.category === selectedCategory;

      const matchesType =
        selectedType === 'All' ||
        job.type === selectedType;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesType
      );
    });
  }, [
    search,
    selectedCategory,
    selectedType,
    initialJobs,
  ]);

  // Pagination
  const totalPages = Math.ceil(
    filteredJobs.length / ITEMS_PER_PAGE
  );

  // Fix invalid page
  useEffect(() => {
    if (
      currentPage > totalPages &&
      totalPages > 0
    ) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedJobs = useMemo(() => {
    const startIndex =
      (currentPage - 1) * ITEMS_PER_PAGE;

    return filteredJobs.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );
  }, [filteredJobs, currentPage]);

  // Update URL
  useEffect(() => {
    const params = new URLSearchParams();

    if (search.trim()) {
      params.set('search', search);
    }

    if (selectedCategory !== 'All') {
      params.set('category', selectedCategory);
    }

    if (selectedType !== 'All') {
      params.set('type', selectedType);
    }

    params.set('page', currentPage.toString());

    router.replace(`/jobs?${params.toString()}`, {
      scroll: false,
    });
  }, [
    search,
    selectedCategory,
    selectedType,
    currentPage,
    router,
  ]);

  return (
    <div className="flex flex-col lg:flex-row gap-8">

      {/* Sidebar */}
      <aside className="w-full lg:w-64 shrink-0 bg-[#121214] border border-zinc-800/80 p-5 rounded-2xl h-fit sticky top-6">

        <div className="flex items-center gap-2 pb-4 mb-4 border-b border-zinc-800/60">
          <Funnel className="w-4 h-4 text-cyan-400" />
          <h2 className="text-sm font-semibold tracking-wide uppercase text-zinc-200">
            Filters
          </h2>
        </div>

        {/* Search */}
        <div className="mb-5">
          <label className="text-xs text-zinc-400 font-medium mb-1.5 block">
            Search Job / Company
          </label>

          <div className="relative">
            <input
              type="text"
              placeholder="e.g. Frontend Developer"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-[#18181b] border border-zinc-800 rounded-xl pl-9 pr-4 py-2 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
            />

            <Magnifier className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Category */}
        <div className="mb-5">
          <label className="text-xs text-zinc-400 font-medium mb-1.5 block">
            Category
          </label>

          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-[#18181b] border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:border-cyan-500/50"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Job Type */}
        <div>
          <label className="text-xs text-zinc-400 font-medium mb-1.5 block">
            Job Type
          </label>

          <select
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-[#18181b] border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:border-cyan-500/50"
          >
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

      </aside>

      {/* Main Content */}
      <main className="flex-1">

        <div className="flex justify-between items-center mb-5">
          <p className="text-xs text-zinc-400">
            Showing{' '}
            <span className="text-zinc-200 font-medium">
              {filteredJobs.length}
            </span>{' '}
            results
          </p>
        </div>

        {filteredJobs.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/10">
            <p className="text-zinc-500 font-medium text-sm">
              No jobs match your filter criteria.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {paginatedJobs.map((job) => (
                <JobCard
                  key={job._id}
                  job={job}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 flex-wrap mt-10">

                <button
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((prev) => prev - 1)
                  }
                  className="px-4 py-2 rounded-xl border border-zinc-700 text-zinc-300 disabled:opacity-40 disabled:cursor-not-allowed hover:border-cyan-500 transition"
                >
                  Previous
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, i) => i + 1
                ).map((page) => (
                  <button
                    key={page}
                    onClick={() =>
                      setCurrentPage(page)
                    }
                    className={`w-10 h-10 rounded-xl text-sm font-medium transition ${
                      currentPage === page
                        ? 'bg-cyan-500 text-black'
                        : 'bg-[#18181b] border border-zinc-800 text-zinc-300 hover:border-cyan-500'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  disabled={
                    currentPage === totalPages
                  }
                  onClick={() =>
                    setCurrentPage((prev) => prev + 1)
                  }
                  className="px-4 py-2 rounded-xl border border-zinc-700 text-zinc-300 disabled:opacity-40 disabled:cursor-not-allowed hover:border-cyan-500 transition"
                >
                  Next
                </button>

              </div>
            )}
          </>
        )}

      </main>

    </div>
  );
}