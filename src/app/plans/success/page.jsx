import { stripe } from '@/lib/stripe';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { CircleCheckFill, ArrowRight, BookOpen } from '@gravity-ui/icons';
import { getUserSession } from '@/lib/core/sessions';

export default async function Success({ searchParams }) {
    // 1. প্যারামিটার থেকে session_id নেওয়া
    const resolvedParams = await searchParams;
    const { session_id } = resolvedParams;
    
    const user = await getUserSession();

    if (!session_id) {
        redirect('/plans');
    }

    // 2. স্ট্রাইপ থেকে সেশন রিট্রিভ করা
    const session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items', 'payment_intent'],
    });

    if (session.status === 'open') {
        return redirect('/plans');
    }

    // 3. এখানেই planId ডিফাইন করা হয়েছে (সবচেয়ে গুরুত্বপূর্ণ)
    const planId = session.metadata?.planId;
    console.log("DEBUG 1: Stripe Metadata PlanID:", planId); // এটি চেক করুন

    // 4. এখন planId এবং user.id চেক করে API কল করুন
    if (planId && user?.id) {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/update-plan`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id, planId }),
                cache: 'no-store'
            });
            console.log("Plan updated successfully for:", user.id);
        } catch (error) {
            console.error("Failed to update user plan:", error);
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 py-20 dark:bg-zinc-950">
            <div className="w-full max-w-lg rounded-[40px] border border-zinc-200 bg-white p-8 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900 md:p-12">
                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 dark:bg-green-500/20">
                    <CircleCheckFill className="h-12 w-12 text-green-600 dark:text-green-400" />
                </div>

                <h1 className="mb-3 text-3xl font-extrabold text-zinc-900 dark:text-white">
                    Payment Successful!
                </h1>
                
                <p className="mb-8 text-zinc-500 dark:text-zinc-400">
                    Thank you for your purchase. Your subscription is now active.
                </p>

                <div className="flex flex-col gap-3">
                    <Link href="/dashboard" className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 font-bold text-white transition-all hover:bg-blue-700">
                        Go to Dashboard <ArrowRight className="h-5 w-5" />
                    </Link>
                    <Link href="/jobs" className="flex w-full items-center justify-center gap-2 rounded-2xl bg-zinc-100 px-6 py-4 font-bold text-zinc-700 transition-all hover:bg-zinc-200">
                        <BookOpen className="h-5 w-5" /> Browse Jobs
                    </Link>
                </div>
            </div>
        </main>
    );
}