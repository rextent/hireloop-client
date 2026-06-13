'use server'

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server"

export const createCompany = async(newCompanyData)=>{
    return serverMutation('/api/companies', newCompanyData);
}

export const updateCompany = async (companyId, data) => {
  // আপনার index.js এ PUT রাউট থাকলে এভাবে কল করুন
  return serverMutation(`/api/companies/${companyId}`, {
    ...data,
    method: 'PUT' // অথবা সরাসরি fetch ব্যবহার করে PUT মেথড পাঠাতে পারেন
  });
};

export const updateCompanyStatus = async (id, data) => {
  const result = await serverMutation(`/api/companies/${id}`, data, 'PATCH');
  revalidatePath('/dashboard/admin/companies');
  return result;
};

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
// export const createCompany = async(newCompanyData) =>{
//     const res = await fetch(`${baseUrl}/api/companies`,{
//         method: "POST",
//         headers: {
//             'Content-Type':'application/json'
//         },
//         body: JSON.stringify(newCompanyData),
//     });
//     return res.json();
// }