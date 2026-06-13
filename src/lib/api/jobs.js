import { serverFetch } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getJobs = async()=>{
    return serverFetch('/api/jobs');
}

export const getJobById = async(jobId) =>{
    return serverFetch(`/api/jobs/${jobId}`);
}


export const getCompanyJobs =async(companyID, status = 'active') =>{
    const res = await fetch(`${baseUrl}/api/jobs?companyId=${companyID}&status=${status}`);
    return res.json();
}