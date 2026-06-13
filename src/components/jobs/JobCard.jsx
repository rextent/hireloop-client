import React from 'react';
import { Card } from "@heroui/react";
// Gravity UI Icons ইমপোর্ট করা হয়েছে
import { Briefcase, ArrowRight, MapPin, BroadcastSignal } from '@gravity-ui/icons';
import Link from 'next/link';

export default function JobCard({ job }) {
  // MongoDB ডেটা স্ট্রাকচার থেকে Destructuring
  const {
    _id,
    title,
    companyName,
    category,
    type,
    salaryMin,
    salaryMax,
    currency,
    isRemote,
    location,
    deadline
  } = job;

  // স্যালারি সুন্দরভাবে ফরম্যাট করার জন্য হেল্পার (যেমন: 25k–35k BDT)
  const formatSalary = (min, max, curr) => {
    if (!min || !max) return "Negotiable";
    const toK = (num) => num >= 1000 ? `${(num / 1000).toFixed(0)}k` : num;
    return `${toK(min)}–${toK(max)} ${curr}`;
  };

  // ডেডলাইন ডেট ফরম্যাট করার জন্য
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Card className="max-w-[400px] bg-[#121214] text-white border border-zinc-800/80 p-6 rounded-2xl shadow-xl hover:border-zinc-700 hover:shadow-2xl transition-all duration-300 group">
      
      {/* Header Section */}
      <Card.Header className="flex flex-col items-start gap-1 p-0 pb-4">
        {/* Category Badge */}
        <span className="text-[11px] font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-md mb-2">
          {category || "General"}
        </span>
        
        {/* Job Title */}
        <Card.Title className="text-xl font-bold text-zinc-100 tracking-tight leading-snug group-hover:text-cyan-400 transition-colors duration-200">
          {title}
        </Card.Title>
        
        {/* Company Name */}
        <Card.Description className="text-sm font-medium text-zinc-400 mt-1">
          {companyName || "Unknown Company"}
        </Card.Description>
      </Card.Header>

      {/* Content Section (Tags/Pills) */}
      <Card.Content className="p-0 py-4 flex flex-wrap gap-2.5">
        {/* Location / Remote Pill */}
        <div className="flex items-center gap-1.5 bg-zinc-800/50 border border-zinc-700/40 px-3 py-1.5 rounded-full text-xs font-medium text-zinc-300">
          <MapPin className="w-3.5 h-3.5 text-zinc-400" />
          <span>{isRemote ? "Remote" : (location?.city || "On-site")}</span>
        </div>

        {/* Job Type Pill */}
        <div className="flex items-center gap-1.5 bg-zinc-800/50 border border-zinc-700/40 px-3 py-1.5 rounded-full text-xs font-medium text-zinc-300">
          <Briefcase className="w-3.5 h-3.5 text-zinc-400" />
          <span>{type || "Full-time"}</span>
        </div>

        {/* Salary Pill */}
        <div className="flex items-center gap-1.5 bg-zinc-800/50 border border-zinc-700/40 px-3 py-1.5 rounded-full text-xs font-medium text-zinc-300">
          <BroadcastSignal className="w-3.5 h-3.5 text-zinc-400" />
          <span>{formatSalary(salaryMin, salaryMax, currency)}</span>
        </div>
      </Card.Content>

      {/* Footer Section */}
      <Card.Footer className="p-0 pt-4 flex items-center justify-between border-t border-zinc-800/60 mt-2">
        {/* Deadline */}
        <div className="flex flex-col">
          <span className="text-[10px] uppercase text-zinc-500 font-medium tracking-wider">Deadline</span>
          <span className="text-xs text-zinc-400 font-semibold">{formatDate(deadline)}</span>
        </div>

        {/* Apply Action */}
        <Link href={`/jobs/${_id}`} className="flex items-center gap-1.5 text-sm font-semibold text-zinc-200 hover:text-white transition-colors duration-200">
          View Details
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
      </Card.Footer>

    </Card>
  );
}