import { serverFetch } from "../core/server";

export const getPlanById = async (planId) => {
    // এখানে '=' চিহ্নটি যোগ করা হয়েছে
    return serverFetch(`/api/plans?plan_id=${planId}`);
}