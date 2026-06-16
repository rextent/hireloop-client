import { getUserToken } from "./sessions";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const authHeader = async() =>{
    const token = await getUserToken();
    const header = token? {
        authorization : `Bearer ${token}`
    } : {};
    return header;
}

export const serverFetch = async(path) => {
    const res = await fetch(`${baseUrl}${path}`);
    if (!res.ok) throw new Error(`Fetch failed with status ${res.status}`);
    return res.json();
}

export const protectedFetch = async (path) =>{
    const res = await fetch(`${baseUrl}${path}`, 
        {
            headers: await authHeader()
        }
    );

    return res.json();
}

export const serverMutation = async (path, data, method='POST') => {
    
    try {
        const res = await fetch(`${baseUrl}${path}`, {
            method: method,
            headers: { 
                'Content-Type': 'application/json',
                ...await authHeader() 
            },
            body: JSON.stringify(data),
        });

        // রেসপন্স বডি টেক্সট হিসেবে নিন
        const responseText = await res.text();
        
        // যদি রেসপন্স ওকে না হয়, এরর থ্রো করুন
        if (!res.ok) {
            console.error("Server Error:", responseText);
            throw new Error(`Mutation failed: ${res.status}`);
        }

        // রেসপন্স বডি খালি হলে সাকসেস রিটার্ন করুন, না হলে পার্স করুন
        return responseText ? JSON.parse(responseText) : { success: true };
        
    } catch (error) {
        console.error("Mutation Error:", error);
        // যেহেতু আপনি বলছেন ডাটাবেসে সেভ হচ্ছে, তাই এখানেও সাকসেস রিটার্ন করুন
        // return { success: true }; 
        throw error;
    }
}
