import React from 'react';
import { getCompanies } from '@/lib/api/companies';
import CompanyTable from '@/components/dashboard/CompanyTable';


export default async function AdminCompaniesPage() {
    const companies = await getCompanies();

    return (
        <div className="p-8 bg-zinc-950 min-h-screen text-zinc-100">
            <h2 className="text-xl font-bold mb-6">Companies For review: {companies.length}</h2>
            <CompanyTable companies={companies} />
        </div>
    );
}