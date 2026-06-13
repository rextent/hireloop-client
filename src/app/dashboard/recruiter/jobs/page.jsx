import React from 'react';
import { getCompanyJobs } from '@/lib/api/jobs';
// Gravity UI এর অফিশিয়াল আইকন
import { Eye, Pencil } from '@gravity-ui/icons';
import { getLoggedInRecruiterCompany } from '@/lib/api/companies';

const RecruiterJobs = async () => {
    // ১. লগ-ইন করা রিক্রুটারের কোম্পানি ডেটা ফেচ করা
    const companyRes = await getLoggedInRecruiterCompany();
    
    // ব্যাকএন্ড রেসপন্স স্ট্রাকচার (যেমন: companyRes.data) অনুযায়ী সেফলি কোম্পানি আইডি বের করা
    const company = companyRes?.data || companyRes; 
    const companyId = company?._id || company?.id;
    
    // ২. ডাইনামিক কোম্পানি আইডির সাহায্যে জব ফেচ করা
    let rawJobs = [];
    if (companyId) {
        try {
            // আপনার API যদি শুধু active জব চায়, তবে দ্বিতীয় প্যারামিটার 'active' দিন
            rawJobs = await getCompanyJobs(companyId); 
        } catch (err) {
            console.error("Error fetching jobs:", err);
        }
    }

    // ৩. ব্যাকএন্ড থেকে আসা ডাটা সেফলি অ্যারে ফরম্যাটে কনভার্ট করা
    const jobs = Array.isArray(rawJobs) 
        ? rawJobs 
        : (rawJobs?.data && Array.isArray(rawJobs.data) ? rawJobs.data : []);

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 sm:p-8">
            <div className="max-w-6xl mx-auto space-y-6">
                
                {/* ড্যাশবোর্ড টপ হেডার পার্ট */}
                <div className="flex justify-between items-center border-b border-zinc-800/60 pb-5">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-zinc-50 to-zinc-400 bg-clip-text text-transparent">
                            Recruiter Management
                        </h2>
                        <p className="text-xs text-zinc-400 mt-1">
                            {company?.name ? `Managing openings for ${company.name}` : "Review and manage your company's active openings."}
                        </p>
                    </div>
                    <div className="text-xs bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-xl font-medium text-zinc-300">
                        Total Positions: {jobs.length}
                    </div>
                </div>

                {/* প্রিমিয়াম কাস্টম ডার্ক থিম টেবিল কন্টেইনার */}
                <div className="w-full border border-zinc-800/60 rounded-2xl overflow-hidden shadow-xl bg-zinc-900/20 backdrop-blur-md">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-zinc-900/80 border-b border-zinc-800/80">
                                    <th className="py-4 px-5 text-zinc-400 font-semibold text-xs tracking-wider uppercase">ROLE / TITLE</th>
                                    <th className="py-4 px-5 text-zinc-400 font-semibold text-xs tracking-wider uppercase">CATEGORY</th>
                                    <th className="py-4 px-5 text-zinc-400 font-semibold text-xs tracking-wider uppercase">LOCATION</th>
                                    <th className="py-4 px-5 text-zinc-400 font-semibold text-xs tracking-wider uppercase">COMPENSATION</th>
                                    <th className="py-4 px-5 text-zinc-400 font-semibold text-xs tracking-wider uppercase">STATUS</th>
                                    <th className="py-4 px-5 text-zinc-400 font-semibold text-xs tracking-wider uppercase text-center">ACTIONS</th>
                                </tr>
                            </thead>
                            
                            <tbody>
                                {jobs.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="py-12 text-center text-zinc-500 text-sm font-medium">
                                            {!companyId ? "Company profile not found. Please setup your company first." : "No premium jobs deployed yet."}
                                        </td>
                                    </tr>
                                ) : (
                                    jobs.map((job) => (
                                        <tr key={job._id || job.id || Math.random()} className="border-b border-zinc-800/40 hover:bg-zinc-900/40 transition-colors group">
                                            
                                            {/* Role / Title */}
                                            <td className="py-4 px-5">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-zinc-100 group-hover:text-cyan-400 transition-colors">
                                                        {job.title || "Untitled Position"}
                                                    </span>
                                                    <span className="text-[11px] text-zinc-500 mt-0.5">{job.type || "N/A"}</span>
                                                </div>
                                            </td>

                                            {/* Category */}
                                            <td className="py-4 px-5">
                                                <span className="text-xs font-medium text-zinc-300 bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded-lg">
                                                    {job.category || "General"}
                                                </span>
                                            </td>

                                            {/* Location */}
                                            <td className="py-4 px-5">
                                                <span className="text-xs text-zinc-300">
                                                    {job.isRemote ? (
                                                        <span className="text-blue-400 font-medium">🌐 Remote</span>
                                                    ) : (
                                                        `📍 ${job.location?.city || job.city || 'N/A'}, ${job.location?.country || job.country || ''}`
                                                    )}
                                                </span>
                                            </td>

                                            {/* Compensation */}
                                            <td className="py-4 px-5">
                                                <span className="text-xs font-mono text-emerald-400 font-semibold">
                                                    {job.currency === "USD" ? "$" : "৳"}{job.salaryMin?.toLocaleString() || 0} - {job.salaryMax?.toLocaleString() || 0}
                                                </span>
                                            </td>

                                            {/* Status */}
                                            <td className="py-4 px-5">
                                                <span className={`inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                                                    job.status === 'active' 
                                                        ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-800/40' 
                                                        : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                                                }`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${job.status === 'active' ? 'bg-emerald-400' : 'bg-zinc-500'}`} />
                                                    {job.status || "Draft"}
                                                </span>
                                            </td>

                                            {/* Action Buttons */}
                                            <td className="py-4 px-5 text-center">
                                                <div className="flex items-center justify-center gap-1.5">
                                                    <button className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-zinc-200 transition-colors" title="View Details">
                                                        <Eye style={{ width: '16px', height: '16px' }} />
                                                    </button>
                                                    <button className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-zinc-200 transition-colors" title="Edit Job">
                                                        <Pencil style={{ width: '16px', height: '16px' }} />
                                                    </button>
                                                </div>
                                            </td>

                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default RecruiterJobs;