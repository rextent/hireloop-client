import { getUserSession } from "@/lib/core/sessions";
import { Bars, Bell, Bookmark, Briefcase, CreditCard, Envelope, FileText, Gear, House, Magnifier, Person } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import Link from "next/link";

export async function DashboardSidebar() {
    const user = await getUserSession();

    // সেশন না থাকলে 'seeker' ডিফল্ট হিসেবে ধরা হবে
    const role = user?.role || 'seeker';

    const navLinksMap = {
        seeker: [
            { icon: House, href: '/dashboard/seeker', label: "Dashboard" },
            { icon: Magnifier, href: '/dashboard/seeker/jobs', label: "Jobs" },
            { icon: Bookmark, href: '/dashboard/seeker/saved-jobs', label: "Saved Jobs" },
            { icon: FileText, href: '/dashboard/seeker/applications', label: "Applications" },
            { icon: CreditCard, href: '/dashboard/seeker/billing', label: "Billing" },
            { icon: Gear, href: '/dashboard/seeker/settings', label: "Settings" },
        ],
        recruiter: [
            { icon: House, href: '/dashboard/recruiter', label: "Home" },
            { icon: Magnifier, href: '/dashboard/recruiter/jobs', label: "Jobs" },
            { icon: Bell, href: '/dashboard/recruiter/jobs/new', label: "Create a Job" },
            { icon: Briefcase, href: '/dashboard/recruiter/company', label: "Company profile" }, // এটি যোগ করা হয়েছে
            { icon: Envelope, href: '/dashboard/recruiter', label: "Messages" }, // এটি যোগ করা হয়েছে
            { icon: Person, href: '/dashboard/recruiter/', label: "Profile" },   // এটি যোগ করা হয়েছে
            { icon: Gear, href: '/dashboard/recruiter/settings', label: "Settings" }, // href ঠিক করা হয়েছে
        ],
        // আপনার navLinksMap অবজেক্টের ভেতরে এটি যোগ করুন:
        admin: [
            { icon: House, href: '/dashboard/admin', label: "Dashboard" },
            { icon: Person, href: '/dashboard/admin/users', label: "Users" },
            { icon: Briefcase, href: '/dashboard/admin/companies', label: "Companies" }, // আপনার স্ক্রিনশট অনুযায়ী
            { icon: Magnifier, href: '/dashboard/admin/jobs', label: "Jobs" },
            { icon: CreditCard, href: '/dashboard/admin/payments', label: "Payments" },
            { icon: Gear, href: '/dashboard/admin/settings', label: "Settings" },
        ],
    };

    const items = navLinksMap[role] || navLinksMap.seeker;

    return (
        <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block h-full">
            <nav className="flex flex-col gap-1">
                {items.map((item) => (
                    <Link
                        key={item.label}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                        href={item.href}
                    >
                        <item.icon className="size-5 text-muted" />
                        {item.label}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}