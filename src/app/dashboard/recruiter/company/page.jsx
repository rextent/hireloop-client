import React from 'react';
import RecruiterCompanyPage from './RecruiterCompanyPage';
import { getUserSession } from '@/lib/core/sessions';
import { getRecruiterCompany } from '@/lib/api/companies';

const CompanyPage = async () => {

    const user = await getUserSession();
    const company = await getRecruiterCompany(user?.id);
    console.log('COmpany before create', company)

    return (
        <div>
            <RecruiterCompanyPage recruiter={user} recruiterCompany={company}></RecruiterCompanyPage>
        </div>
    );
};

export default CompanyPage;