"use client";

import {
  getCandidateDetailsByIdSction,
  updateJobApplicationAction,
} from "@/actions";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter } from "../ui/dialog";
import { createClient } from "@supabase/supabase-js";
import { get } from "mongoose";

const { Fragment } = require("react");

const supabaseClient = createClient(
  "https://mhsewkstowqkpyubvtdp.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oc2V3a3N0b3dxa3B5dWJ2dGRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI1OTMyMjksImV4cCI6MjAzODE2OTIyOX0.Kj8bv-VuJwxQYaeZuT--QlMKDMCYxkO1catr7tHiHkM"
);

function CandidateList({
  currentCandidiateDetails,
  setCurrentCandidateDetails,
  showCurrentCandidateDetailsModel,
  setShowCurrentCandidateDetailsModel,
  jobApplications,
}) {
  async function handleFetchCandidateDetails(currentCandidiateId) {
    const data = await getCandidateDetailsByIdSction(currentCandidiateId);

    if (data) {
      setCurrentCandidateDetails(data);
      setShowCurrentCandidateDetailsModel(true);
    }
  }

  console.log(currentCandidiateDetails);

  function handlePreviewResume() {
    const { data } = supabaseClient.storage
      .from("job-elevate-public")
      .getPublicUrl(currentCandidiateDetails?.candidateInfo?.resume);
    console.log(data, "resume");

    const a = document.createElement("a");
    a.href = data?.publicUrl;
    a.setAttribute("download", "resume.pdf");
    a.setAttribute("target", "_blank");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  async function handleUpdateJobStatus(getCurrentStatus) {
    let cpyJobApplicants = [...jobApplications]; // Make sure this is an array copy
    const indexOfCurrentJobApplication = cpyJobApplicants.findIndex(
      (item) => item.candidateUserId === currentCandidiateDetails?.userId
    );

    const jobApplicantsToUpdate = {
      ...cpyJobApplicants[indexOfCurrentJobApplication],
      status:
        cpyJobApplicants[indexOfCurrentJobApplication].status.concat(
          getCurrentStatus
        ),
    };
    console.log(jobApplicantsToUpdate, "jobApplicantsToUpdate");
    await updateJobApplicationAction(jobApplicantsToUpdate, "/jobs");
    console.log(jobApplications, "jobApplications");
  }

  return (
    <Fragment>
      <div className="grid grid-cols-1 gap-3 p-10 md:grid-cols-2 lg:grid-cols-3">
        {jobApplications && jobApplications.length > 0
          ? jobApplications.map((jobApplicantItem) => (
              <div className="bg-white shadow-lg w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4">
                <div className="px-4 my-6 flex justify-between items-center">
                  <div className="flex flex-col">
                    <h3 className="text-lg font-bold">
                      {jobApplicantItem?.name}
                    </h3>
                    <p className="text-md font-light overflow-hidden">
                      {jobApplicantItem?.email}
                    </p>
                  </div>
                  <Button
                    onClick={() =>
                      handleFetchCandidateDetails(
                        jobApplicantItem?.candidateUserId
                      )
                    }
                    className="flex h-11 items-center justify-center px-5"
                  >
                    View Profile
                  </Button>
                </div>
              </div>
            ))
          : null}
      </div>
      <Dialog
        open={showCurrentCandidateDetailsModel}
        onOpenChange={() => {
          setCurrentCandidateDetails(null);
          setShowCurrentCandidateDetailsModel(false);
        }}
      >
        <DialogContent>
          <div>
            <h1 className="text-3xl font-bold text-black">
              {currentCandidiateDetails?.candidateInfo?.name}
            </h1>
            <h1 className="text-2xl font-thin text-black mb-2">
              {currentCandidiateDetails?.email}
            </h1>
            <p className="text-xl font-medium text-black">
              {currentCandidiateDetails?.candidateInfo?.currentCompany}
            </p>
            <p className="text-sm font-normal text-black mb-1">
              {currentCandidiateDetails?.candidateInfo?.currentJobLocation}
            </p>
            <p>
              Salary: {currentCandidiateDetails?.candidateInfo?.currentSalary}{" "}
              LPA
            </p>
            <p>
              Total Experience:{" "}
              {currentCandidiateDetails?.candidateInfo?.totalExperience} Years
            </p>
            <p>
              Notice Period:{" "}
              {currentCandidiateDetails?.candidateInfo?.noticePeriod} Days
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-1">
              <h1>Previous Companies:</h1>
              {currentCandidiateDetails?.candidateInfo?.previousCompanies
                .split(",")
                .map((skillItem) => (
                  <h2 className="text-[16px] font-medium text-black">
                    {skillItem}{" "}
                  </h2>
                ))}
            </div>
            <div className="flex flex-wrap items-center gap-4 mt-1">
              <h1>Skills:</h1>
              {currentCandidiateDetails?.candidateInfo?.skills
                .split(",")
                .map((skillItem) => (
                  <h2 className="text-[16px] font-medium text-black">
                    {skillItem}
                    {","}
                  </h2>
                ))}
            </div>
          </div>
          <div className="flex justify-between">
            <Button
              onClick={handlePreviewResume}
              className="flex h-11 items-center justify-center px-5 mt-6"
            >
              Resume
            </Button>
            <div className="flex gap-3">
              <Button
                onClick={() => handleUpdateJobStatus("selected")}
                className="disabled:opacity-65 flex h-11 items-center justify-center px-5 mt-6"
                disabled={
                  jobApplications
                    .find(
                      (item) =>
                        item.candidateUserId ===
                        currentCandidiateDetails?.userId
                    )
                    ?.status.includes("selected") ||
                  jobApplications
                    .find(
                      (item) =>
                        item.candidateUserId ===
                        currentCandidiateDetails?.userId
                    )
                    ?.status.includes("rejected")
                    ? true
                    : false
                }
              >
                {jobApplications
                  .find(
                    (item) =>
                      item.candidateUserId === currentCandidiateDetails?.userId
                  )
                  ?.status.includes("selected")
                  ? "Selected"
                  : "Select"}
              </Button>
              <Button
                onClick={() => handleUpdateJobStatus("rejected")}
                className="disabled:opacity-65 flex h-11 items-center justify-center px-5 mt-6"
                disabled={
                  jobApplications
                    .find(
                      (item) =>
                        item.candidateUserId ===
                        currentCandidiateDetails?.userId
                    )
                    ?.status.includes("selected") ||
                  jobApplications
                    .find(
                      (item) =>
                        item.candidateUserId ===
                        currentCandidiateDetails?.userId
                    )
                    ?.status.includes("rejected")
                    ? true
                    : false
                }
              >
                {jobApplications
                  .find(
                    (item) =>
                      item.candidateUserId === currentCandidiateDetails?.userId
                  )
                  ?.status.includes("rejected")
                  ? "Rejected"
                  : "Reject"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

export default CandidateList;
