import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";

export const getUserSession = async () => {
    try {
        // next/headers থেকে headers() এখন একটি Promise রিটার্ন করে
        const headerList = await headers();
        
        const session = await auth.api.getSession({
            headers: headerList
        });

        return session?.user || null;
    } catch (error) {
        console.error("Session Error:", error);
        return null;
    }
};

export const getUserToken = async() =>{
    const session = await auth.api.getSession({
        headers: await headers()
    })
    console.log("GET USER TOKEN SESSION:", session);

    return session?.session?.token || null;
}

export const requireRole = async (role) => {
    const user = await getUserSession();

    // ১. ইউজার না থাকলে রিডাইরেক্ট
    if (!user) {
        redirect('/signin');
    }

    // ২. ইউজার আছে কিন্তু রোল চেক (optional chaining দিয়ে নিরাপদ করা)
    if (user.role !== role) {
        redirect('/unauthorized');
    }

    return user;
};