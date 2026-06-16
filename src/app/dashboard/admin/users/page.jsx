import { getUsersList } from '@/lib/api/users';
import React from 'react';

import { Button } from '@heroui/react';
import AdminUsersTable from '@/components/dashboard/AdminUsersTable';

export default async function AdminUsersPage() {
    // Data fetch
    const data = await getUsersList();
    const users = data?.users || [];

    return (
        <div className="p-6 max-w-[1400px] mx-auto w-full flex flex-col gap-8 bg-[#0a0a0a] min-h-screen text-white">

            {/* Page Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold tracking-tight text-white">User Management</h1>
                    <p className="text-sm text-default-500">Review, filter, and manage platform access for all users.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="bordered" className="border-default-200 text-white">
                        All Roles
                    </Button>
                    <Button variant="flat" className="bg-default-100/20 text-white border border-default-200/50 hover:bg-default-200/30">
                        Export List
                    </Button>
                </div>
            </div>

            {/* Stats Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Total Active Users"
                    value={users.length.toLocaleString()}
                    sub="+12% vs last month"
                    subColor="text-success"
                />
                <StatCard
                    title="Recruiter Growth"
                    value="843"
                    sub="High demand"
                    subColor="text-success"
                />
                <StatCard
                    title="Suspended Accounts"
                    value="124"
                    sub="0.8% of total"
                    subColor="text-default-500"
                />
                <StatCard
                    title="New Signups (24h)"
                    value="42"
                    sub="Steady activity"
                    subColor="text-warning"
                />
            </div>

            {/* Client Component: Users Table */}
            <AdminUsersTable users={users} />

        </div>
    );
}

// Reusable Stat Card Component
function StatCard({ title, value, sub, subColor }) {
    return (
        <div className="bg-[#18181b] border border-default-200 rounded-xl p-5 flex flex-col gap-3">
            <span className="text-sm text-default-400 font-medium">{title}</span>
            <span className="text-3xl font-semibold text-white">{value}</span>
            <span className={`text-xs ${subColor}`}>{sub}</span>
        </div>
    );
}