"use client";

import {
  candidateInitialFormData,
  candidateOnboardFormControl,
  recruiterInitialOnboardFormControl,
  recruiterOnboardFromControl,
} from "@/utils";
import { useEffect, useState } from "react";
import CommonForm from "../common-form";
import { updateProfileAction } from "@/actions";

function AccountInfo({ profileInfo }) {
  const [candidateFormData, setCandidateFormData] = useState(
    candidateInitialFormData
  );
  const [recruiterFormData, setRecruiterFormData] = useState(
    recruiterInitialOnboardFormControl
  );

  useEffect(() => {
    if (profileInfo?.role === "recruiter") {
      setRecruiterFormData(profileInfo?.recruiterInfo);
    } else {
      setCandidateFormData(profileInfo?.candidateInfo);
    }
  }, [profileInfo]);

  console.log(candidateFormData, profileInfo);

  async function handleUpdateProfile() {
    await updateProfileAction(
      profileInfo?.role === "candidate"
        ? {
            _id : profileInfo?._id,
            userId: profileInfo?.userId,
            role: profileInfo?.role,
            email: profileInfo?.email,
            isPremiumUser: profileInfo?.isPremiumUser,
            memberShipType: profileInfo?.memberShipType,
            memberShipStartDate: profileInfo?.memberShipStartDate,
            memberShipEndDate: profileInfo?.memberShipEndDate,
            candidateInfo: {
              ...candidateFormData,
              resume: profileInfo?.candidateInfo?.resume,
            },
          }
        : {
            _id : profileInfo?._id,
            userId: profileInfo?.userId,
            role: profileInfo?.role,
            email: profileInfo?.email,
            isPremiumUser: profileInfo?.isPremiumUser,
            memberShipType: profileInfo?.memberShipType,
            memberShipStartDate: profileInfo?.memberShipStartDate,
            memberShipEndDate: profileInfo?.memberShipEndDate,
            recruiterInfo: {
                ...recruiterFormData,
            },
          },
      "/account"
    );
  }

  return (
    <div className="mx-auto max-w-7xl mt-[70px] px-6 lg:px-8">
      <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6 ">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Account Details
        </h1>
      </div>
      <div className="py-20 pb-24 pt-6">
        <div className="container mx-auto p-0 space-y-8 -z-10">
          <CommonForm
            action={handleUpdateProfile}
            formControls={
              profileInfo?.role === "recruiter"
                ? recruiterOnboardFromControl
                : candidateOnboardFormControl.filter(
                    (formControl) => formControl.name !== "resume"
                  )
            }
            formData={
              profileInfo?.role === "candidate"
                ? candidateFormData
                : recruiterFormData
            }
            setFormData={
              profileInfo?.role === "candidate"
                ? setCandidateFormData
                : setRecruiterFormData
            }
            buttonText="Update Profile"
          />
        </div>
      </div>
    </div>
  );
}

export default AccountInfo;
