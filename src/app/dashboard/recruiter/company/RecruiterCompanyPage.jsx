"use client";

import React, { useState, useEffect } from 'react';
// আপনার প্রজেক্টের সঠিক আইকন এবং অ্যাকশন ইম্পোর্ট করা হলো
import { Pencil, CloudArrowUpIn, ShieldCheck, Xmark, Plus } from '@gravity-ui/icons';
// স্ক্রিনশট অনুযায়ী lib/actions/companies.js থেকে createCompany ইম্পোর্ট
import { createCompany } from '@/lib/actions/companies';

export default function RecruiterCompanyPage({ recruiter, recruiterCompany }) {
    // স্টেট ম্যানেজমেন্ট
    const [company, setCompany] = useState(recruiterCompany);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [logoPreview, setLogoPreview] = useState('');
    const [isInitialLoading, setIsInitialLoading] = useState(true);

    // ১. পেজ লোড হওয়ার সময় লোকালস্টোরেজ বা এপিআই থেকে অলরেডি রেজিস্টার্ড কোম্পানি চেক করার মেকানিজম
    useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                // টেস্টিং বা সেশনের জন্য যদি লোকাল স্টেট থাকে (বাস্তব ক্ষেত্রে এখানে কারেন্ট ইউজারের কোম্পানি চেক হবে)
                const savedCompany = localStorage.getItem('registered_company');
                if (savedCompany) {
                    const data = JSON.parse(savedCompany);
                    setCompany(data);
                    setLogoPreview(data.logo || '');
                }
            } catch (err) {
                console.error("Error fetching company:", err);
            } finally {
                setIsInitialLoading(false);
            }
        };

        fetchCompanyData();
    }, []);

    // ২. ImgBB API-তে লোগো আপলোড প্রসেস 
    const handleLogoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setLoading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            // আপনার ImgBB API Key এখানে বসাবেন
            const imgbbApiKey = 'YOUR_IMGBB_API_KEY_HERE';
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            if (result.success) {
                setLogoPreview(result.data.url);
            } else {
                setLogoPreview(URL.createObjectURL(file));
            }
        } catch (err) {
            console.error("ImgBB Upload error:", err);
            setLogoPreview(URL.createObjectURL(file));
        } finally {
            setLoading(false);
        }
    };

    // ৩. MongoDB-তে সেভ করার ফাইনাল লজিক (আপনার অ্যাকশন ব্যবহার করে)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        const payload = {
            name: formData.get('name'),
            industry: formData.get('industry'),
            website: formData.get('website'),
            location: formData.get('location'),
            employeeCount: formData.get('employeeCount'),
            description: formData.get('description'),
            logo: logoPreview,
            status: company && company.status ? company.status : 'Pending',
            recruiterId: recruiter.id
        };

        try {
            // আইডি কনসোল লগ দিয়ে দেখুন আইডিটি undefined কি না
            const targetId = company?._id || company?.id;
            console.log("Updating Company ID:", targetId);

            if (targetId) {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/companies/${targetId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (res.ok) {
                    alert("Update Successful!");
                    setCompany({ ...company, ...payload }); // আগের ডাটার সাথে নতুন ডাটা মার্জ করা
                    setIsEditing(false);
                }
            } else {
                // আইডি নেই, তাই নতুন তৈরি করুন
                await createCompany(payload);
                setIsEditing(false);
            }
        } catch (err) {
            console.error("Error:", err);
        } finally {
            setLoading(false);
        }
    };

    const getStatusStyles = (status) => {
        switch (status?.toLowerCase()) {
            case 'approved': return 'bg-emerald-950/40 text-emerald-400 border-emerald-800/40';
            case 'rejected': return 'bg-red-950/40 text-red-400 border-red-800/40';
            default: return 'bg-amber-950/40 text-amber-400 border-amber-800/40';
        }
    };

    if (isInitialLoading) {
        return (
            <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center text-xs text-zinc-500 tracking-widest uppercase">
                Loading Workspace...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 sm:p-8">
            <div className="max-w-3xl mx-auto space-y-6">

                {/* পেজ হেডার */}
                <div>
                    <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-zinc-50 to-zinc-400 bg-clip-text text-transparent">
                        Company Workspace
                    </h2>
                    <p className="text-xs text-zinc-400 mt-1">Setup and review your institutional configurations.</p>
                </div>

                {/* CONDITION 1: কোম্পানি রেজিস্টার্ড না থাকলে (Prompt View) */}
                {!company && !isEditing && (
                    <div className="border border-dashed border-zinc-800 bg-zinc-900/10 rounded-2xl p-10 text-center flex flex-col items-center justify-center space-y-4 shadow-xl backdrop-blur-md">
                        <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center text-zinc-500">
                            <ShieldCheck style={{ width: '22px', height: '22px' }} />
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-base font-bold text-zinc-200">No Company Registered Yet</h3>
                            <p className="text-xs text-zinc-500 max-w-sm mx-auto">To start hosting corporate vacancies and hiring talents, you need to set up a verified business entity profile first.</p>
                        </div>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="flex items-center gap-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-950 text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg transition-all active:scale-[0.98]"
                        >
                            <Plus style={{ width: '14px', height: '14px' }} />
                            Register Your Company
                        </button>
                    </div>
                )}

                {/* CONDITION 2: রেজিস্ট্রেশন ফর্ম ভিউ (যা আপনার image_36d860.png এর হুবহু ডিজাইন) */}
                {isEditing && (
                    <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 backdrop-blur-md relative shadow-2xl transition-all">
                        {company && (
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="absolute top-4 right-4 p-1.5 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-zinc-200 transition-colors"
                            >
                                <Xmark style={{ width: '16px', height: '16px' }} />
                            </button>
                        )}

                        <div className="mb-5">
                            <h3 className="text-base font-bold text-zinc-100">Register New Company</h3>
                            <p className="text-[11px] text-zinc-500 mt-0.5">Enter your business details to start hiring on HireLoop.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Company Name */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-zinc-400">Company Name <span className="text-red-500">*</span></label>
                                    <input required name="name" defaultValue={company?.name} placeholder="e.g. Acme Corp" className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-zinc-700 transition-colors" />
                                </div>

                                {/* Industry */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-zinc-400">Industry / Category <span className="text-red-500">*</span></label>
                                    <select name="industry" defaultValue={company?.industry || "Technology"} className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-zinc-700 transition-colors">
                                        <option value="Technology">Technology</option>
                                        <option value="Finance">Finance</option>
                                        <option value="Healthcare">Healthcare</option>
                                        <option value="Education">Education</option>
                                    </select>
                                </div>

                                {/* Website URL */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-zinc-400">Website URL</label>
                                    <div className="flex rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950">
                                        <span className="bg-zinc-900 text-zinc-500 px-3 py-2 text-sm select-none border-r border-zinc-800">https://</span>
                                        <input name="website" defaultValue={company?.website?.replace('https://', '')} placeholder="www.company.com" className="bg-transparent w-full px-3 py-2 text-sm text-zinc-200 focus:outline-none" />
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-zinc-400">Location <span className="text-red-500">*</span></label>
                                    <input required name="location" defaultValue={company?.location} placeholder="City, Country" className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-zinc-700 transition-colors" />
                                </div>

                                {/* Employee Count */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-zinc-400">Employee Count Range</label>
                                    <select name="employeeCount" defaultValue={company?.employeeCount || "1-10 employees"} className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-zinc-700 transition-colors">
                                        <option value="1-10 employees">1-10 employees</option>
                                        <option value="11-50 employees">11-50 employees</option>
                                        <option value="51-200 employees">51-200 employees</option>
                                        <option value="201+ employees">201+ employees</option>
                                    </select>
                                </div>

                                {/* Logo Component */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-zinc-400">Company Logo</label>
                                    <div className="flex items-center gap-3 bg-zinc-950 border border-zinc-800 rounded-xl p-2">
                                        <label className="w-12 h-12 rounded-lg bg-zinc-900 border border-zinc-800 flex flex-col items-center justify-center cursor-pointer hover:bg-zinc-800/80 transition-colors overflow-hidden relative group">
                                            {logoPreview ? (
                                                <img src={logoPreview} alt="Logo Preview" className="w-full h-full object-cover" />
                                            ) : (
                                                <CloudArrowUpIn className="text-zinc-500 group-hover:text-zinc-300 transition-colors" style={{ width: '18px', height: '18px' }} />
                                            )}
                                            <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                                        </label>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-medium text-zinc-300">{loading ? "Uploading..." : "Upload image"}</span>
                                            <span className="text-[10px] text-zinc-500">PNG, JPG up to 5MB</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Brief Description */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-semibold text-zinc-400">Brief Description</label>
                                <textarea name="description" rows={3} defaultValue={company?.description} placeholder="Tell us about your company's mission and culture..." className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-zinc-700 transition-colors resize-none" />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-zinc-100 hover:bg-zinc-200 text-zinc-950 font-bold text-sm py-2.5 rounded-xl transition-all shadow-lg active:scale-[0.99] disabled:opacity-50"
                            >
                                {loading ? "Saving to MongoDB..." : (company ? "Save Changes" : "Register Company")}
                            </button>
                        </form>
                    </div>
                )}

                {/* CONDITION 3: কোম্পানির প্রোফাইল ডিটেইলস ভিউ */}
                {company && !isEditing && (
                    <div className="bg-zinc-900/20 border border-zinc-800/60 rounded-2xl p-6 backdrop-blur-md space-y-6 shadow-xl">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800/60 pb-5">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden shadow-inner flex items-center justify-center p-1">
                                    {company.logo ? (
                                        <img src={company.logo} alt={company.name} className="w-full h-full object-contain rounded-lg" />
                                    ) : (
                                        <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-500 font-bold text-xl">{company.name[0]}</div>
                                    )}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2.5 flex-wrap">
                                        <h3 className="text-xl font-bold text-zinc-100">{company.name}</h3>
                                        <span className={`inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${getStatusStyles(company.status)}`}>
                                            <span className="w-1 h-1 rounded-full bg-current" />
                                            {company.status || "Pending"}
                                        </span>
                                    </div>
                                    <p className="text-xs text-zinc-400 mt-1">{company.industry} • {company.employeeCount}</p>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsEditing(true)}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-xs font-semibold text-zinc-300 rounded-xl transition-all shadow"
                            >
                                <Pencil style={{ width: '12px', height: '12px' }} />
                                Edit Profile
                            </button>
                        </div>

                        {/* এডিশনাল মেটা গ্রিড */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                            <div className="bg-zinc-900/40 border border-zinc-800/40 rounded-xl p-3">
                                <span className="text-zinc-500 block mb-1">HQ Location</span>
                                <span className="text-zinc-200 font-medium">📍 {company.location || 'Not Specified'}</span>
                            </div>
                            <div className="bg-zinc-900/40 border border-zinc-800/40 rounded-xl p-3">
                                <span className="text-zinc-500 block mb-1">Official Website</span>
                                {company.website ? (
                                    <a href={company.website.startsWith('http') ? company.website : `https://${company.website}`} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline font-medium break-all">
                                        🌐 {company.website}
                                    </a>
                                ) : (
                                    <span className="text-zinc-400 italic">No URL provided</span>
                                )}
                            </div>
                        </div>

                        {/* ডেসক্রিপশন বক্স */}
                        <div className="bg-zinc-900/40 border border-zinc-800/40 rounded-xl p-4 space-y-2">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                                <ShieldCheck style={{ width: '14px', height: '14px' }} className="text-zinc-500" />
                                Corporate Description
                            </h4>
                            <p className="text-xs text-zinc-300 leading-relaxed whitespace-pre-line">
                                {company.description || "No description set yet. Click 'Edit Profile' to add company bio."}
                            </p>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}