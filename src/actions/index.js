 "use server"

import connectToDB from "@/database"
import Job from "@/models/job";
import Profile from "@/models/profile";
import { revalidatePath } from "next/cache";

//  Create profile action

export async function createProfileAction(formData,pathToRevalidate){
    await connectToDB();
    await Profile.create(formData);
    revalidatePath(pathToRevalidate);
}

//  fetch profile action 

export async function fetchProfileAction(id){
    await connectToDB();
    const result = await Profile.findOne({userId : id});
    return JSON.parse(JSON.stringify(result));
}

// Post job Action

export async function PostJobAction(formData,pathToRevalidate){
    await connectToDB();
    await Job.create(formData);
    revalidatePath(pathToRevalidate);
}

// fetch jon action
// recruiter
export async function fetchJobsForRecruiterAction(id){
    await connectToDB();
    const result = await Job.find({recruiterId : id })
    return JSON.parse(JSON.stringify(result));
}

// candidate
export async function fetchJobsForCandidateAction(){
    await connectToDB();
    const result = await Job.find({});
    return JSON.parse(JSON.stringify(result));
}
