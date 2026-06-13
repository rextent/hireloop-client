"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
    Check,
    ChevronDown,
    CircleCheckFill,
    CircleInfo,
    Rocket,
    ShieldCheck,
    Star
} from '@gravity-ui/icons';

const PricingPage = () => {
    // Toggle State: 'seeker' or 'recruiter'
    const [activeTab, setActiveTab] = useState('seeker');
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const data = {
        seeker: [
            {
                name: 'Free',
                id:'seeker_free',
                price: '$0',
                duration: '/forever',
                desc: 'Perfect for exploring the platform.',
                features: ['Browse & save up to 10 jobs', 'Apply up to 3 jobs per month', 'Basic profile setup', 'Email job alerts'],
                button: 'Get Started',
                highlight: false,
            },
            {
                name: 'Pro',
                id: 'seeker_pro',
                price: '$19',
                duration: '/month',
                desc: 'Accelerate your job search.',
                features: ['Apply up to 30 jobs per month', 'Unlimited saved jobs', 'Application tracking', 'Salary insights'],
                button: 'Start Pro Trial',
                highlight: true,
            },
            {
                name: 'Premium',
                id: 'seeker_premium',
                price: '$39',
                duration: '/month',
                desc: 'Maximum visibility and results.',
                features: ['Everything in Pro + Unlimited apps', 'Profile boost to recruiters', 'Early access to new jobs', 'Priority support'],
                button: 'Go Premium',
                highlight: false,
            },
        ],
        recruiter: [
            {
                name: 'Free',
                id: 'recruiter_free',
                price: '$0',
                duration: '/forever',
                desc: 'Great for a company’s first hire.',
                features: ['Up to 3 active job posts', 'Basic applicant management', 'Standard listing visibility'],
                button: 'Start Posting',
                highlight: false,
            },
            {
                name: 'Growth',
                id: 'recruiter_growth',
                price: '$49',
                duration: '/month',
                desc: 'Scalable hiring for growing teams.',
                features: ['Up to 10 active job posts', 'Applicant tracking system', 'Basic analytics', 'Email support'],
                button: 'Start Growth',
                highlight: true,
            },
            {
                name: 'Enterprise',
                id: 'recruiter_enterprise',
                price: '$149',
                duration: '/month',
                desc: 'Full-cycle recruitment power.',
                features: ['Up to 50 active job posts', 'Advanced analytics dashboard', 'Featured job listings', 'Team collaboration', 'Custom branding', 'Priority support'],
                button: 'Contact Sales',
                highlight: false,
            },
        ]
    };

    const faqs = [
        { q: "Can I cancel my subscription anytime?", a: "Yes, you can cancel your subscription at any time from your account settings. You'll maintain access until the end of your billing period." },
        { q: "Do you offer refunds?", a: "We offer a 7-day money-back guarantee for all our premium plans if you're not satisfied with the features." },
        { q: "What payment methods do you accept?", a: "We accept all major credit cards, PayPal, and Stripe for secure global payments." },
        { q: "Can I switch between plans?", a: "Absolutely! You can upgrade or downgrade your plan at any time. The price difference will be prorated." },
    ];

    return (
        <main className="min-h-screen bg-zinc-50 pb-20 pt-16 dark:bg-zinc-950">
            <div className="mx-auto max-w-7xl px-4 md:px-6">

                {/* Header Section */}
                <div className="mb-16 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white md:text-6xl">
                        Choose the <span className="text-blue-600">Perfect Plan</span>
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-500 dark:text-zinc-400">
                        Whether you are looking for your dream job or the perfect candidate, we have a plan that fits your needs.
                    </p>

                    {/* Toggle Tab */}
                    <div className="mt-10 flex justify-center">
                        <div className="relative flex rounded-2xl bg-zinc-200 p-1 dark:bg-zinc-800">
                            <button
                                onClick={() => setActiveTab('seeker')}
                                className={`relative z-10 w-40 rounded-xl py-3 text-sm font-bold transition-all ${activeTab === 'seeker' ? 'bg-white text-blue-600 shadow-md dark:bg-zinc-700 dark:text-white' : 'text-zinc-500'}`}
                            >
                                For Job Seekers
                            </button>
                            <button
                                onClick={() => setActiveTab('recruiter')}
                                className={`relative z-10 w-40 rounded-xl py-3 text-sm font-bold transition-all ${activeTab === 'recruiter' ? 'bg-white text-blue-600 shadow-md dark:bg-zinc-700 dark:text-white' : 'text-zinc-500'}`}
                            >
                                For Recruiters
                            </button>
                        </div>
                    </div>
                </div>

                {/* Pricing Cards Grid */}
                <div className="grid gap-8 md:grid-cols-3">
                    {data[activeTab].map((plan, idx) => (
                        <div
                            key={idx}
                            className={`relative flex flex-col rounded-[32px] border p-8 transition-all duration-300 hover:shadow-xl ${plan.highlight ? 'border-blue-600 bg-white shadow-lg ring-4 ring-blue-600/5 dark:bg-zinc-900' : 'border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900'}`}
                        >
                            {plan.highlight && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-xs font-bold text-white uppercase">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">{plan.name}</h3>
                                <div className="mt-4 flex items-baseline">
                                    <span className="text-5xl font-extrabold text-zinc-900 dark:text-white">{plan.price}</span>
                                    <span className="ml-1 text-zinc-500">{plan.duration}</span>
                                </div>
                                <p className="mt-3 text-sm text-zinc-500">{plan.desc}</p>
                            </div>

                            <div className="mb-8 flex-grow space-y-4">
                                {plan.features.map((feature, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <CircleCheckFill className="mt-1 h-5 w-5 text-blue-600 shrink-0" />
                                        <span className="text-sm text-zinc-600 dark:text-zinc-300">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Stripe Checkout form */}
                            <form action="/api/checkout_sessions" method="POST">
                            <input type="hidden" name="plan_id" value={plan.id} />
                                <section>
                                    <button className={`w-full rounded-2xl py-4 font-bold transition-all active:scale-95 ${plan.highlight ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 hover:bg-blue-700' : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700'}`} type="submit" role="link">
                                        Checkout
                                    </button>
                                </section>
                            </form>

                            
                        </div>
                    ))}
                </div>

                {/* FAQ Section */}
                <div className="mt-32">
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">Frequently Asked Questions</h2>
                        <p className="mt-2 text-zinc-500">Find answers to common questions about our plans and billing.</p>
                    </div>

                    <div className="mx-auto max-w-3xl space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
                            >
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="flex w-full items-center justify-between p-6 text-left"
                                >
                                    <span className="font-semibold text-zinc-900 dark:text-white">{faq.q}</span>
                                    <ChevronDown className={`h-5 w-5 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                                </button>
                                {openFaq === index && (
                                    <div className="border-t border-zinc-100 p-6 text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Support Banner */}
                <div className="mt-20 rounded-[40px] bg-blue-600 p-10 text-center text-white shadow-2xl shadow-blue-600/20 md:p-16">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
                        <CircleInfo className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold md:text-4xl">Still have questions?</h2>
                    <p className="mx-auto mt-4 max-w-xl text-blue-100">
                        Can't find what you're looking for? Our friendly support team is here to help you 24/7.
                    </p>
                    <button className="mt-10 rounded-2xl bg-white px-10 py-4 font-bold text-blue-600 transition-all hover:bg-blue-50">
                        Contact Support
                    </button>
                </div>

            </div>
        </main>
    );
};

export default PricingPage;