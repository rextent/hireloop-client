"use client";

import React, { useState } from 'react';
import { Table } from '@heroui/react';
import { Check, Xmark } from '@gravity-ui/icons';

export default function CompanyTable({ companies }) {
    const [companyList, setCompanyList] = useState(companies);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = companyList.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(companyList.length / rowsPerPage);

    const handleStatusUpdate = async (id, newStatus) => {
        console.log("Button clicked for ID:", id);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/companies/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });

            console.log("Response status:", res.status);

            if (!res.ok) {
                const errorText = await res.text();
                console.error("Update failed:", errorText);
                return;
            }

            setCompanyList(prev =>
                prev.map(company =>
                    company._id === id
                        ? { ...company, status: newStatus }
                        : company
                )
            );

        } catch (error) {
            console.error("Error:", error);
        }
    };

    // লোগো বা নামের প্রথম অক্ষরের ফাংশন
    const getInitials = (name) => {
        return name.split(' ').map(word => word[0]).slice(0, 2).join('').toUpperCase();
    };

    // স্ট্যাটাস কালার লজিক
    const getStatusStyles = (status) => {
        switch (status?.toLowerCase()) {
            case 'approved': return 'bg-emerald-950/40 text-emerald-400 border-emerald-900';
            case 'rejected': case 'suspended': return 'bg-red-950/40 text-red-400 border-red-900';
            default: return 'bg-amber-950/40 text-amber-400 border-amber-900';
        }
    };

    return (
        <div className="w-full">
            <Table>
                <Table.ScrollContainer>
                    <Table.Content aria-label="Company approval table">
                        <Table.Header>
                            <Table.Column isRowHeader>Company</Table.Column>
                            <Table.Column>Industry</Table.Column>
                            <Table.Column>Submitted</Table.Column>
                            <Table.Column>Status</Table.Column>
                            <Table.Column>Actions</Table.Column>
                        </Table.Header>
                        <Table.Body>
                            {currentRows.map((company) => (
                                <Table.Row key={company._id}>
                                    <Table.Cell>
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center text-[13px] font-bold text-zinc-300 border border-zinc-700">
                                                {getInitials(company.name)}
                                            </div>
                                            <div>
                                                <div className="font-semibold text-zinc-100 text-sm">{company.name}</div>
                                                <div className="text-[11px] text-zinc-500">{company.website}</div>
                                            </div>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell className="text-zinc-400 text-xs">{company.industry}</Table.Cell>
                                    <Table.Cell className="text-zinc-400 text-xs">{new Date(company.createdAt).toLocaleDateString()}</Table.Cell>
                                    <Table.Cell>
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${getStatusStyles(company.status)}`}>
                                            {company.status || 'Pending'}
                                        </span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="flex gap-2">
                                            <button onClick={() => handleStatusUpdate(company._id, 'Approved')} className="flex items-center gap-1 bg-emerald-900/20 hover:bg-emerald-900/40 text-emerald-400 px-3 py-1.5 rounded-md text-[11px] font-bold transition-all border border-emerald-900/50">
                                                <Check size={14} /> Approve
                                            </button>
                                            <button onClick={() => handleStatusUpdate(company._id, 'Rejected')} className="flex items-center gap-1 bg-red-900/20 hover:bg-red-900/40 text-red-400 px-3 py-1.5 rounded-md text-[11px] font-bold transition-all border border-red-900/50">
                                                <Xmark size={14} /> Reject
                                            </button>
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>

                <Table.Footer>
                    <div className="flex justify-between items-center px-4 py-4 border-t border-zinc-800">
                        <span className="text-[11px] text-zinc-500">Showing {indexOfFirstRow + 1}-{Math.min(indexOfLastRow, companies.length)} of {companies.length}</span>
                        <div className="flex gap-1">
                            <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="px-3 py-1.5 border border-zinc-800 rounded-md text-[11px] hover:bg-zinc-900 disabled:opacity-30 cursor-pointer">Prev</button>
                            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="px-3 py-1.5 border border-zinc-800 rounded-md text-[11px] hover:bg-zinc-900 disabled:opacity-30 cursor-pointer">Next</button>
                        </div>
                    </div>
                </Table.Footer>
            </Table>
        </div>
    );
}