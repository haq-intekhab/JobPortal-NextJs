 "use server"

import connectToDB from "@/database"
import Application from "@/models/application";
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

// fetch job action
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

// create job Application
export async function createJobApplicationAction(data,pathToRevalidate){
    await connectToDB();
    await Application.create(data);
    revalidatePath(pathToRevalidate);
}

// fetch job Application
// candidate
export async function fetchJobApplicationsForCandidate(candidateID){
    await connectToDB();
    const result = await Application.find({candidateUserId : candidateID});
    return JSON.parse(JSON.stringify(result));
}

// recruiter
export async function fetchJobApplicationsForRecruiter(recruiterID){
    await connectToDB();
    const result = await Application.find({recruiterUserId : recruiterID});
    return JSON.parse(JSON.stringify(result));
}

// update job Application

// get Candidate details by ID
export async function getCandidateDetailsByIdSction(candidateId){
    await connectToDB();
    const result = await Profile.findOne({userId : candidateId})
    return JSON.parse(JSON.stringify(result));
}
