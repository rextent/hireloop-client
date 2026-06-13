import { requireRole } from '@/lib/core/sessions';
import React from 'react';

const DashboardLayout = async ({children}) => {
    await requireRole('recruiter')
    return children;
};

export default DashboardLayout;