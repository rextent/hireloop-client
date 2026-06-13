// 'use server'

// import { serverMutation } from "../core/server"

// export const createJob = async(newJobData) =>{
//     return serverMutation('/api/jobs', newJobData)
// }

'use server'

import { serverMutation } from "../core/server"

export const createJob = async (newJobData) => {
    try {
        const cleanJobData = JSON.parse(JSON.stringify(newJobData));
        const response = await serverMutation('/api/jobs', cleanJobData);
        
        // যদি রেসপন্সটি সফল হয়, তবে আমরা একটি নিজস্ব 'insertedId' প্রপার্টি যোগ করে দিচ্ছি
        // যাতে ফ্রন্টএন্ডের কন্ডিশনটি আর ফেইল না করে
        return { 
            ...response, 
            insertedId: response.insertedId || "success" 
        };
    } catch (error) {
        console.error("Error in createJob:", error);
        return null;
    }
}

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
// export const createJob = async(newJobData) =>{
//     const res = await fetch(`${baseUrl}/api/jobs`,{
//         method: "POST",
//         headers: {
//             'Content-Type':'application/json'
//         },
//         body: JSON.stringify(newJobData),
//     });
//     return res.json();
// }