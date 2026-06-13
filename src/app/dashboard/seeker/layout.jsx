import { requireRole } from '@/lib/core/sessions';
import React from 'react';

const SeekerLayout = async({children}) => {
    await requireRole('seeker')
    return children
};

export default SeekerLayout;