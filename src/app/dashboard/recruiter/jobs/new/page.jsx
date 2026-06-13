import React from 'react';
import NewJobPostPage from './NewJobPostPage';
import { getLoggedInRecruiterCompany } from '@/lib/api/companies';

const PostJobPage = async() => {

    const company = await getLoggedInRecruiterCompany();

    return (
        <div>
            <NewJobPostPage company={company}></NewJobPostPage>
        </div>
    );
};

export default PostJobPage;