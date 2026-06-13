'use server'

import { serverMutation } from "../core/server"

export const createApplication = async(applicationData)=>{
    return serverMutation('/api/applications', applicationData);
}