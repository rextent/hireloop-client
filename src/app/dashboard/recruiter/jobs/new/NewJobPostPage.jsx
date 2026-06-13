"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Form,
  Card,
  Input,
  Switch,
} from "@heroui/react";
import { createJob } from "@/lib/actions/jobs";

export default function NewJobPostPage({ company }) {
  // ডাটা চেক করার জন্য কনসোল লগ
  console.log("Passed Company Props Data:", company);

  const router = useRouter();
  const [isRemote, setIsRemote] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // প্ল্যান ও লিমিট হিসাব (শুধু ব্যাকএন্ডে পাঠানোর জন্য বা ট্র্যাকিংয়ের জন্য রাখা হলো)
  const planLimits = { Free: 3, Growth: 10, Enterprise: 50 };
  const currentPlan = company?.plan || "Free";
  const currentLimit = planLimits[currentPlan] || 0;
  const activeJobsCount = company?.activeJobsCount || 0;

  const handleRemoteToggle = () => {
    setIsRemote((prev) => !prev);
  };

  // ফর্ম সাবমিশন হ্যান্ডলার
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // পে-লোড কনফিগারেশন
    const jobPostPayload = {
      ...data,
      salaryMin: Number(data.salaryMin),
      salaryMax: Number(data.salaryMax),
      isRemote: isRemote,
      location: isRemote
        ? { city: "Remote", country: "Remote" }
        : { city: data.city, country: data.country },

      // কোম্পানি রিলেশন ম্যাপিং
      companyId: company?._id || company?.id,
      companyName: company?.name || "Unknown Corporate",

      status: "active",
      isPubliclyVisible: true,
      createdAt: new Date(),
    };

    setIsSubmitting(true);

    try {
      // MongoDB সার্ভার অ্যাকশন কল
      // ৬৩ নম্বর লাইন থেকে এভাবে লিখুন:
      const res = await createJob(jobPostPayload);

      // এখন কন্ডিশনটি চেক করুন res এবং res.insertedId আছে কি না
      if (res) {
        alert("Success! Job posted successfully.");
        form.reset();
        setIsRemote(false);
        router.push("/dashboard/recruiter");
      } else {
        alert("Failed to save job. Check backend logs.");
      }
    } catch (error) {
      console.error("Submission failed:", error);
      alert("An error occurred during submission.");
    } finally {
      setIsSubmitting(false);
    }
  };
  if (!company) {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center">
                <h2 className="text-2xl font-bold text-white mb-3">
                    Company Verification Required
                </h2>

                <p className="text-zinc-300">
                    Your company profile has not been registered yet.
                </p>

                <p className="text-zinc-500 mt-3">
                    To publish job listings on HireLoop, you must first register your company and receive approval from our administration team.
                </p>

                <button
                    onClick={() => router.push('/dashboard/recruiter/company')}
                    className="mt-6 px-5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium"
                >
                    Register Company
                </button>
            </div>
        </div>
    );
}

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* 🛠️ DEVELOPER DEBUGGING PANEL (সব ঠিক হয়ে গেলে এই ব্লকটি ডিলিট করে দিতে পারেন) */}
        <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-xl text-xs space-y-1 font-mono">
          <p className="text-amber-400 font-bold mb-1">🔧 Developer Debug Info:</p>
          <p>Company ID: <span className="text-zinc-400">{company?._id || company?.id || "Not Found"}</span></p>
          <p>Company Status: <span className="text-zinc-400">{company?.status || "No Status"}</span></p>
          <p>Current Plan: <span className="text-zinc-400">{currentPlan} (Limit: {currentLimit})</span></p>
          <p>Active Jobs: <span className="text-zinc-400">{activeJobsCount}</span></p>
        </div>

        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-zinc-800/80 pb-6 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-zinc-50 via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              Create a Job Listing
            </h1>
            <p className="mt-2 text-sm text-zinc-400">
              Publish as: <span className="text-cyan-400 font-semibold">{company?.name || "Loading Company..."}</span>
            </p>
          </div>
        </div>

        {company?.status !== 'Approved' && <div>Please wait to get approval</div>}

        {/* Core Form Engine */}
        {company?.status === 'Approved' && <Form onSubmit={handleSubmit} validationBehavior="native" className="space-y-6">

          {/* Section 1: Core Architecture */}
          <Card className="p-6 bg-zinc-900/40 border border-zinc-800/60 rounded-2xl space-y-6">
            <div>
              <h2 className="text-lg font-bold text-zinc-100">01. Core Architecture</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Job Title */}
              <div className="flex flex-col w-full">
                <label className="text-xs font-semibold text-zinc-400 mb-2">Job Title *</label>
                <Input
                  name="title"
                  required
                  placeholder="e.g., Lead Systems Architect"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100"
                  variant="bordered"
                />
              </div>

              {/* Job Category */}
              <div className="flex flex-col">
                <label className="text-xs font-semibold text-zinc-400 mb-2">Job Category *</label>
                <select name="category" required className="w-full h-10 px-3 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-zinc-200 focus:outline-none focus:ring-1 focus:ring-cyan-500/50">
                  <option value="">Select Category</option>
                  <option value="Software Engineering">Software Engineering</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Data Science">Data Science</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Product Management">Product Management</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </div>

              {/* Job Type */}
              <div className="flex flex-col">
                <label className="text-xs font-semibold text-zinc-400 mb-2">Job Type *</label>
                <select name="type" required className="w-full h-10 px-3 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-zinc-200 focus:outline-none focus:ring-1 focus:ring-cyan-500/50">
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contractual Basis</option>
                </select>
              </div>

              {/* Application Deadline */}
              <div className="flex flex-col w-full">
                <label className="text-xs font-semibold text-zinc-400 mb-2">Application Deadline *</label>
                <Input
                  name="deadline"
                  required
                  type="date"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200"
                  variant="bordered"
                />
              </div>
            </div>

            {/* Compensation Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col w-full">
                <label className="text-xs font-semibold text-zinc-400 mb-2">Minimum Compensation *</label>
                <Input
                  name="salaryMin"
                  required
                  type="number"
                  placeholder="Floor e.g., 60000"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100"
                  variant="bordered"
                />
              </div>

              <div className="flex flex-col w-full">
                <label className="text-xs font-semibold text-zinc-400 mb-2">Maximum Compensation *</label>
                <Input
                  name="salaryMax"
                  required
                  type="number"
                  placeholder="Ceiling e.g., 110000"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100"
                  variant="bordered"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-semibold text-zinc-400 mb-2">Currency Unit</label>
                <select name="currency" required className="w-full h-10 px-3 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-zinc-200 focus:outline-none">
                  <option value="BDT">BDT (৳)</option>
                  <option value="USD">USD ($)</option>
                </select>
              </div>
            </div>

            {/* Remote Switch Selector */}
            <div className="space-y-4">
              <div onClick={handleRemoteToggle} className="flex items-center justify-between p-4 bg-zinc-950 border border-zinc-800 rounded-xl cursor-pointer select-none">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-zinc-200 block">Remote Job Configuration</span>
                  <p className="text-[11px] text-zinc-500">Enable this if the candidate can work completely from anywhere.</p>
                </div>
                <div className="pointer-events-none scale-105">
                  <Switch isSelected={isRemote} aria-label="Toggle Remote">
                    <div className={`relative w-11 h-6 rounded-full border ${isRemote ? "bg-blue-600 border-blue-500" : "bg-zinc-800 border-zinc-700"}`}>
                      <div className={`absolute top-[2px] left-[2px] bg-white w-4 h-4 rounded-full transition-transform ${isRemote ? "translate-x-5" : "translate-x-0"}`} />
                    </div>
                  </Switch>
                </div>
              </div>

              {isRemote ? (
                <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-900/30 text-center text-xs text-blue-400 font-semibold">
                  Remote Alignment Active. Location parameters locked.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col w-full">
                    <label className="text-xs font-semibold text-zinc-400 mb-2">Target City Location *</label>
                    <Input
                      name="city"
                      required={!isRemote}
                      placeholder="e.g., Dhaka"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100"
                      variant="bordered"
                    />
                  </div>

                  <div className="flex flex-col w-full">
                    <label className="text-xs font-semibold text-zinc-400 mb-2">Target Country Region *</label>
                    <Input
                      name="country"
                      required={!isRemote}
                      placeholder="e.g., Bangladesh"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100"
                      variant="bordered"
                    />
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Section 2: Textual Details */}
          <Card className="p-6 bg-zinc-900/40 border border-zinc-800/60 rounded-2xl space-y-6">
            <div className="flex flex-col w-full">
              <label className="text-xs font-semibold text-zinc-400 mb-2">Core Responsibilities *</label>
              <textarea
                name="responsibilities"
                required
                placeholder="Itemize tasks..."
                rows={4}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl text-zinc-100 p-3 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-700"
              />
            </div>

            <div className="flex flex-col w-full">
              <label className="text-xs font-semibold text-zinc-400 mb-2">Prerequisite Requirements *</label>
              <textarea
                name="requirements"
                required
                placeholder="Itemize requirements..."
                rows={4}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl text-zinc-100 p-3 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-700"
              />
            </div>
          </Card>

          {/* Action Buttons Area */}
          <div className="flex justify-end items-center gap-4 pt-4 border-t border-zinc-900">
            <Button
              type="button"
              onClick={() => router.push("/dashboard/recruiter/jobs")}
              className="px-6 h-11 rounded-xl font-medium text-xs bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              Cancel
            </Button>

            {/* Post Job Button (সবসময় অ্যাক্টিভ থাকবে) */}
            <Button
              type="submit"
              className="px-8 h-11 rounded-xl font-semibold text-xs tracking-wide shadow-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
              isLoading={isSubmitting}
            >
              {isSubmitting ? "Posting..." : "Post Job"}
            </Button>
          </div>

        </Form>}
      </div>
    </div>
  );
}