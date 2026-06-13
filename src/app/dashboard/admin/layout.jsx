import { requireRole } from '@/lib/core/sessions';
import React from 'react';

const AsminDashboardLayout =async ({children}) => {
    await requireRole('admin')
    return children;
};

export default AsminDashboardLayout;