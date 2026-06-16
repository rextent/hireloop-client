"use client";

import React, { useState } from 'react';
import { Table, Chip } from '@heroui/react';
// নতুন আইকন Shield যুক্ত করা হয়েছে অ্যাডমিনের জন্য
import { Person, Briefcase, Shield, ChevronLeft, ChevronRight } from '@gravity-ui/icons';
import { updateUserRole } from '@/lib/actions/users';

export default function AdminUsersTable({ users }) {
    // বাই ডিফল্ট সবাইকে 'Active' স্ট্যাটাস দেওয়ার জন্য স্টেট ইনিশিয়ালাইজেশন
    

    // তারিখ ফরম্যাট করার হেল্পার ফাংশন (যেমন: Oct 12, 2023)
    const formatDate = (dateObj) => {
        const dateString = dateObj?.$date || dateObj; 
        if (!dateString) return 'N/A';
        
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric'
        });
    };

    // ইউজারের আইডি বের করার হেল্পার ফাংশন
    const getUserId = (user) => user._id?.$oid || user.id;

    // রোল এবং স্ট্যাটাস চেঞ্জ করার ফাংশন
    const handleRoleChange = async (userId, newRole) => {
        const data = await updateUserRole(userId, newRole);
    };

    const handleStatusChange = async (userId, newStatus) => {
        setUsers(prev => prev.map(u => getUserId(u) === userId ? { ...u, status: newStatus } : u));
        console.log(`API Call: Changing status for user ${userId} to ${newStatus}`);
    };

    // রোল অনুযায়ী আইকন এবং কালার নির্ধারণের জন্য হেল্পার ফাংশন
    const getRoleStyling = (role) => {
        switch (role) {
            case 'admin':
                return {
                    color: "warning",
                    icon: <Shield width={14} />,
                    label: "Admin"
                };
            case 'recruiter':
                return {
                    color: "primary",
                    icon: <Briefcase width={14} />,
                    label: "Recruiter"
                };
            default:
                return {
                    color: "default",
                    icon: <Person width={14} />,
                    label: "Seeker"
                };
        }
    };

    return (
        <div className="bg-[#18181b] rounded-xl border border-default-200 overflow-hidden w-full">
            <Table>
                <Table.ScrollContainer>
                    <Table.Content aria-label="Admin User Management Table">
                        {/* টেবিল হেডার */}
                        <Table.Header className="bg-[#18181b] border-b border-default-200">
                            <Table.Column isRowHeader className="text-default-400 bg-transparent py-4 text-left">User Name</Table.Column>
                            <Table.Column className="text-default-400 bg-transparent py-4 text-left">Email Address</Table.Column>
                            <Table.Column className="text-default-400 bg-transparent py-4 text-left">Role</Table.Column>
                            <Table.Column className="text-default-400 bg-transparent py-4 text-left">Join Date</Table.Column>
                            <Table.Column className="text-default-400 bg-transparent py-4 text-left">Status</Table.Column>
                            <Table.Column className="text-default-400 bg-transparent py-4 text-right">Actions</Table.Column>
                        </Table.Header>

                        {/* টেবিল বডি */}
                        <Table.Body>
                            {users.map((user) => {
                                const currentUserId = getUserId(user);
                                const currentRole = user.role?.toLowerCase() || 'seeker';
                                const roleStyle = getRoleStyling(currentRole);

                                return (
                                    <Table.Row 
                                        key={currentUserId} 
                                        className="border-b border-default-100 hover:bg-default-100/10 transition-colors"
                                    >
                                        {/* ইউজারের নাম এবং অ্যাভাটার */}
                                        <Table.Cell className="py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-default-200 text-default-700 font-medium text-xs">
                                                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                                                </div>
                                                <span className="text-sm font-medium text-white">
                                                    {user.name || "Unknown User"}
                                                </span>
                                            </div>
                                        </Table.Cell>

                                        {/* ইমেইল */}
                                        <Table.Cell className="text-sm text-default-400">
                                            {user.email}
                                        </Table.Cell>

                                        {/* ডায়নামিক রোল ব্যাজ (রঙ এবং আইকন সহ) */}
                                        <Table.Cell>
                                            <Chip
                                                size="sm"
                                                variant="flat"
                                                color={roleStyle.color}
                                                className="border-none px-1"
                                            >
                                                <div className="flex items-center gap-1.5 font-medium">
                                                    {roleStyle.icon}
                                                    <span className="capitalize">{roleStyle.label}</span>
                                                </div>
                                            </Chip>
                                        </Table.Cell>

                                        {/* জয়েন করার তারিখ */}
                                        <Table.Cell className="text-sm text-default-400">
                                            {formatDate(user.createdAt)}
                                        </Table.Cell>

                                        {/* স্ট্যাটাস ইন্ডিকেটর */}
                                        <Table.Cell>
                                            <Chip
                                                size="sm"
                                                variant="dot"
                                                color={user.status === "Active" ? "success" : "danger"}
                                                className="border-none text-default-400"
                                            >
                                                {user.status}
                                            </Chip>
                                        </Table.Cell>

                                        {/* ডায়নামিক অ্যাকশন বাটনসমূহ */}
                                        <Table.Cell>
                                            <div className="flex items-center justify-end gap-3 text-xs font-medium">
                                                
                                                {/* বর্তমান রোল অ্যাডমিন হলে */}
                                                {currentRole === 'admin' && (
                                                    <>
                                                        <button
                                                            onClick={() => handleRoleChange(currentUserId, 'recruiter')}
                                                            className="text-default-400 hover:text-white transition-colors"
                                                        >
                                                            Make Recruiter
                                                        </button>
                                                        <button
                                                            onClick={() => handleRoleChange(currentUserId, 'seeker')}
                                                            className="text-default-400 hover:text-white transition-colors"
                                                        >
                                                            Make Seeker
                                                        </button>
                                                    </>
                                                )}

                                                {/* বর্তমান রোল রিক্রুটার হলে */}
                                                {currentRole === 'recruiter' && (
                                                    <>
                                                        <button
                                                            onClick={() => handleRoleChange(currentUserId, 'admin')}
                                                            className="text-default-400 hover:text-white transition-colors"
                                                        >
                                                            Make Admin
                                                        </button>
                                                        <button
                                                            onClick={() => handleRoleChange(currentUserId, 'seeker')}
                                                            className="text-default-400 hover:text-white transition-colors"
                                                        >
                                                            Make Seeker
                                                        </button>
                                                    </>
                                                )}

                                                {/* বর্তমান রোল সিকার হলে */}
                                                {currentRole !== 'admin' && currentRole !== 'recruiter' && (
                                                    <>
                                                        <button
                                                            onClick={() => handleRoleChange(currentUserId, 'admin')}
                                                            className="text-default-400 hover:text-white transition-colors"
                                                        >
                                                            Make Admin
                                                        </button>
                                                        <button
                                                            onClick={() => handleRoleChange(currentUserId, 'recruiter')}
                                                            className="text-default-400 hover:text-white transition-colors"
                                                        >
                                                            Make Recruiter
                                                        </button>
                                                    </>
                                                )}

                                                {/* সাসপেন্ড বা অ্যাক্টিভেট করার বাটন (বর্ডার দিয়ে আলাদা করা হয়েছে) */}
                                                <button
                                                    onClick={() => handleStatusChange(currentUserId, user.status === 'Active' ? 'Suspended' : 'Active')}
                                                    className={`ml-2 border-l border-default-200/50 pl-3 transition-colors ${user.status === 'Suspended' ? 'text-success-500 hover:text-success-400' : 'text-danger-500 hover:text-danger-400'}`}
                                                >
                                                    {user.status === 'Active' ? 'Suspend' : 'Activate'}
                                                </button>

                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                );
                            })}
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>

                {/* টেবিল ফুটার এবং পেজিনেশন */}
                <Table.Footer>
                    <div className="p-4 flex justify-between items-center text-sm text-default-500 w-full">
                        <span>Showing 1 to {users.length} users</span>
                        <div className="flex items-center gap-2">
                            <button className="px-1 hover:text-white"><ChevronLeft width={16} /></button>
                            <button className="w-6 h-6 bg-white text-black rounded flex items-center justify-center">1</button>
                            <button className="px-2 hover:text-white">2</button>
                            <button className="px-1 hover:text-white"><ChevronRight width={16} /></button>
                        </div>
                    </div>
                </Table.Footer>
            </Table>
        </div>
    );
}