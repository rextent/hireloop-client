"use client";

import React from "react";
import { Briefcase, ChevronRight } from "@gravity-ui/icons";
import Link from "next/link";

export default function ApplicationTable({ applications = [] }) {
  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-zinc-800 bg-[#18181b]">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-zinc-800 text-zinc-400 text-xs uppercase tracking-wider">
            <th className="px-6 py-4 font-medium">Job Title</th>
            <th className="px-6 py-4 font-medium">Company</th>
            <th className="px-6 py-4 font-medium">Applied</th>
            <th className="px-6 py-4 font-medium">Status</th>
            <th className="px-6 py-4 font-medium text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800">
          {applications.map((app) => (
            <tr key={app._id} className="hover:bg-zinc-900/50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-zinc-800 rounded-lg text-zinc-400">
                    <Briefcase size={20} />
                  </div>
                  <div>
                    <div className="font-medium text-white">{app.jobTitle}</div>
                    <div className="text-xs text-zinc-500">Full-time • Remote</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-zinc-300">Tech Corp Inc.</td>
              <td className="px-6 py-4 text-zinc-300">
                {new Date(app.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4">
                <span className="px-3 py-1 rounded-full text-xs bg-zinc-800 text-zinc-300 border border-zinc-700 capitalize">
                  {app.status}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <Link href={`/dashboard/seeker/jobs/${app.jobId}`} className="text-blue-400 hover:text-blue-300 flex items-center justify-end gap-1">
                  Details <ChevronRight size={16} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}