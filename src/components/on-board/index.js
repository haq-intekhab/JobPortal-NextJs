"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import CommonForm from "../common-form";
import {
  candidateInitialOnboardFormData,
  candidateOnboardFormControl,
  recruiterInitialOnboardFormControl,
  recruiterOnboardFromControl,
} from "@/utils";
import { createProfileAction } from "@/actions";
import { useUser } from "@clerk/nextjs";

function OnBoard() {
  const [currentTab, setCurrentTab] = useState("candidate");
  const [recruiterFormData, setRecruiterFormData] = useState(
    recruiterInitialOnboardFormControl
  );
  const [candidateFormData, setCandidateFormData] = useState(
    candidateInitialOnboardFormData
  );

  const currentAuthUser = useUser();
  const {user} = currentAuthUser;
  console.log(currentAuthUser)

  function handleTabChange(value) {
    setCurrentTab(value);
  }

  console.log(recruiterFormData, "recruiterFormData");

  function handleRecruiterFormValid() {
    return (
      recruiterFormData &&
      recruiterFormData.name.trim() !== "" &&
      recruiterFormData.companyName.trim() !== "" &&
      recruiterFormData.companyRole.trim() !== ""
    );
  }

  async function createProfile(){
    const data = {
      recruiterInfo : recruiterFormData,
      role : 'recruiter',
      isPremiumUser : false,
      userId : user?.id,
      email : user?.primaryEmailAddress?.emailAddress,
    };

    await createProfileAction(data, '/onboard');
  }

  return (
    <div className="bg-white p-6 lg:px-8 mt-1">
      <Tabs value={currentTab} onValueChange={handleTabChange}>
        <div className="w-full">
          <div className="flex items-baseline justify-between border-b pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Welcome to onboarding
            </h1>
            <TabsList>
              <TabsTrigger value="candidate">Candidate</TabsTrigger>
              <TabsTrigger value="recruiter">Recruiter</TabsTrigger>
            </TabsList>
          </div>
        </div>
        <TabsContent value="candidate">
          <CommonForm
            formControls={candidateOnboardFormControl}
            buttonText={"Onboard as candidate"}
            formData={candidateFormData}
            setFormData={setCandidateFormData}
          />
        </TabsContent>
        <TabsContent value="recruiter">
          <CommonForm
            formControls={recruiterOnboardFromControl}
            buttonText={"Onboard as recruiter"}
            formData={recruiterFormData}
            setFormData={setRecruiterFormData}
            isBtnDisabled={!handleRecruiterFormValid()}
            action={createProfile}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default OnBoard;
