"use server";

import connectToDB from "@/database";
import Application from "@/models/application";
import Job from "@/models/job";
import Profile from "@/models/profile";
import { revalidatePath } from "next/cache";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//  Create profile action

export async function createProfileAction(formData, pathToRevalidate) {
  await connectToDB();
  await Profile.create(formData);
  revalidatePath(pathToRevalidate);
}

//  fetch profile action

export async function fetchProfileAction(id) {
  await connectToDB();
  const result = await Profile.findOne({ userId: id });
  return JSON.parse(JSON.stringify(result));
}

// Post job Action

export async function PostJobAction(formData, pathToRevalidate) {
  await connectToDB();
  await Job.create(formData);
  revalidatePath(pathToRevalidate);
}

// fetch job action
// recruiter
export async function fetchJobsForRecruiterAction(id) {
  await connectToDB();
  const result = await Job.find({ recruiterId: id });
  return JSON.parse(JSON.stringify(result));
}

// candidate
export async function fetchJobsForCandidateAction(filterParams = {}) {
  await connectToDB();
  let updatedParams = {};
  Object.keys(filterParams).forEach((key) => {
    if (filterParams[key].length > 0) {
      updatedParams[key] = {
        $in: filterParams[key].split(","),
      };
    }
  });
  console.log(updatedParams, "updatedParams");

  const result = await Job.find(
    filterParams && Object.keys(updatedParams).length > 0 ? updatedParams : {}
  );
  return JSON.parse(JSON.stringify(result));
}

// create job Application
export async function createJobApplicationAction(data, pathToRevalidate) {
  await connectToDB();
  await Application.create(data);
  revalidatePath(pathToRevalidate);
}

// fetch job Application
// candidate
export async function fetchJobApplicationsForCandidate(candidateID) {
  await connectToDB();
  const result = await Application.find({ candidateUserId: candidateID });
  return JSON.parse(JSON.stringify(result));
}

// recruiter
export async function fetchJobApplicationsForRecruiter(recruiterID) {
  await connectToDB();
  const result = await Application.find({ recruiterUserId: recruiterID });
  return JSON.parse(JSON.stringify(result));
}

// update job Application
export async function updateJobApplicationAction(data, pathToRevalidate) {
  await connectToDB();
  const {
    recruiterUserId,
    name,
    email,
    candidateUserId,
    status,
    jobId,
    _id,
    jobAppliedDate,
  } = data;
  await Application.findByIdAndUpdate(
    { _id },
    {
      recruiterUserId,
      name,
      email,
      candidateUserId,
      status,
      jobId,
      jobAppliedDate,
    },
    { new: true }
  );
  revalidatePath(pathToRevalidate);
}

// get Candidate details by ID
export async function getCandidateDetailsByIdSction(candidateId) {
  await connectToDB();
  const result = await Profile.findOne({ userId: candidateId });
  return JSON.parse(JSON.stringify(result));
}

// create filter categories
export async function createFilterCategoriesAction() {
  await connectToDB();
  const result = await Job.find({});
  return JSON.parse(JSON.stringify(result));
}

// update profile action
export async function updateProfileAction(data, pathToRevalidate) {
  await connectToDB();
  const {
    userId,
    role,
    email,
    isPremiumUser,
    memberShipType,
    memberShipStartDate,
    memberShipEndDate,
    recruiterInfo,
    candidateInfo,
    _id,
  } = data;

  await Profile.findByIdAndUpdate(
    { _id },
    {
      userId,
      role,
      email,
      isPremiumUser,
      memberShipType,
      memberShipStartDate,
      memberShipEndDate,
      recruiterInfo,
      candidateInfo,
    },
    { new: true }
  );
  revalidatePath(pathToRevalidate);
}

// create stripe price id based on package type
export async function createPriceIdAction(data) {
  const session = await stripe.prices.create({
    currency: "inr",
    unit_amount: data?.amount * 100,
    product_data: {
      name: "Premium Plan",
    },
    recurring: {
      interval: "year",
    },
  });

  return {
    success: true,
    id: session?.id,
  };
}

// create payment logic
export async function createPaymentAction(data) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: data?.lineItems,
    mode: "subscription",
    success_url: 'http://localhost:3000/membership' + "?status=success",
    cancel_url: 'http://localhost:3000/membership' + "?status=cancel",
  });

  return {
    success: true,
    id: session?.id,
  };
}
