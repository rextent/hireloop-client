"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Person, At, Link as LinkIcon, Check } from '@gravity-ui/icons';
import { createApplication } from '@/lib/actions/applications';
// import { getApplicationsByApplicant } from '@/lib/api/applications';

const JobApply = ({ job, applicant, alreadyApplied }) => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: applicant?.name || '',
        email: applicant?.email || '',
        phone: '',
        resumeUrl: '',
        portfolioUrl: '',
        coverLetter: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    // const [alreadyApplied, setAlreadyApplied] = useState(false); // নতুন স্টেট

//     // জবে অলরেডি অ্যাপ্লাই করা আছে কি না তা চেক করার জন্য
//     useEffect(() => {
//     const checkApplication = async () => {
//         try {
//             if (!applicantId) return;

//             const apps = await getApplicationsByApplicant(applicantId);

//             const exists = apps.find(
//                 app => app.jobId === (job._id || job.id)
//             );

//             if (exists) setAlreadyApplied(true);

//         } catch (err) {
//             console.error("Error checking applications:", err);
//         }
//     };

//     checkApplication();
// }, [applicantId, job._id, job.id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (alreadyApplied) return; // ডাবল সাবমিশন রোধ

        if (!formData.phone || !formData.resumeUrl || !formData.coverLetter) {
            setError("Please fill out all required fields.");
            return;
        }

        try {
            setLoading(true);

            const applicationPayload = {
                jobId: job._id || job.id,
                jobTitle: job.title,
                companyName: job.companyName,
                applicantId: applicant._id || applicant.id, // ✅
                applicantName: formData.name,
                applicantEmail: formData.email,
                phone: formData.phone,
                resumeUrl: formData.resumeUrl,
                portfolioUrl: formData.portfolioUrl,
                coverLetter: formData.coverLetter,
                status: 'pending'
            };
            console.log("PAYLOAD:", applicationPayload);

            const res = await createApplication(applicationPayload);

            if (res?.error) {
                setError(res.error || "Failed to submit application.");
                return;
            }

            setSuccess(true);
            router.refresh(); // পেজ রিলোড ছাড়াই UI আপডেট করবে

        } catch (err) {
            console.error("Application Error:", err);
            setError(err?.message || "Failed to submit application.");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="rounded-3xl border border-green-500/20 bg-white p-10 text-center shadow-sm dark:bg-zinc-900 md:p-16">
                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                    <Check className="h-12 w-12 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="mb-4 text-3xl font-bold text-zinc-900 dark:text-white">Application Submitted!</h2>
                <p className="mb-8 text-lg text-zinc-500 dark:text-zinc-400">
                    You have successfully applied for the <span className="font-semibold">{job.title}</span> position.
                </p>
                <button
                    onClick={() => router.push('/jobs')}
                    className="rounded-2xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700"
                >
                    Browse More Jobs
                </button>
            </div>
        );
    }

    return (
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 md:p-10">
            <div className="mb-8 border-b border-zinc-100 pb-8 dark:border-zinc-800">
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white md:text-4xl">Apply for {job.title}</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                    <input type="text" name="name" value={formData.name} readOnly className="h-14 w-full rounded-2xl border border-zinc-200 bg-zinc-50 pl-12 pr-4 text-zinc-500 outline-none" />
                    <input type="email" name="email" value={formData.email} readOnly className="h-14 w-full rounded-2xl border border-zinc-200 bg-zinc-50 pl-12 pr-4 text-zinc-500 outline-none" />
                </div>

                <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="h-14 w-full rounded-2xl border border-zinc-200 px-4 outline-none" required />
                <input type="url" name="resumeUrl" placeholder="Resume URL" value={formData.resumeUrl} onChange={handleChange} className="h-14 w-full rounded-2xl border border-zinc-200 px-4 outline-none" required />
                <textarea name="coverLetter" rows="6" placeholder="Why should we hire you?" value={formData.coverLetter} onChange={handleChange} className="w-full rounded-2xl border border-zinc-200 p-4 outline-none" required></textarea>

                {error && <div className="p-4 text-sm text-red-500 bg-red-500/10 rounded-2xl">{error}</div>}

                <button
                    type="submit"
                    disabled={loading || alreadyApplied}
                    className={`h-14 w-full rounded-2xl font-bold text-white transition-all ${alreadyApplied ? 'bg-zinc-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                    {alreadyApplied ? "Already Applied" : (loading ? "Submitting..." : "Submit Application")}
                </button>
            </form>
        </div>
    );
};

export default JobApply;