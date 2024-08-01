 "use server"

import connectToDB from "@/database"
import Profile from "@/models/profile";
import { revalidatePath } from "next/cache";

//  Create profile action

export async function createProfileAction(formData,pathToRevalidate){
    await connectToDB();
    await Profile.create(formData);
    revalidatePath(pathToRevalidate);
}

export async function fetchProfileAction(id){
    await connectToDB();
    const result = await Profile.findOne({userId : id});
    return JSON.parse(JSON.stringify(result));
}