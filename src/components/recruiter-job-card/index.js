"use client";

import { useState } from "react";
import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Button } from "../ui/button";
import JobApplicants from "../job-applicants";

function RecruiterJobCard({ jobItem, jobApplications }) {

  const [showApplicantsDrawer, setShowApplicantsDrawer] = useState(false);
  const [currentCandidiateDetails, setCurrentCandidateDetails] = useState(null);
  const [
    showCurrentCandidateDetailsModel,
    setShowCurrentCandidateDetailsModel,
  ] = useState(false);

  return (
    <div>
      <CommonCard
        icon={<JobIcon />}
        title={jobItem?.title}
        footerContent={
          <Button
            onClick={() => setShowApplicantsDrawer(true)}
            className="disabled:opacity-55 flex h-11 items-center justify-center px-5 mt-6"
            disabled={
              jobApplications.filter((item) => item.jobId === jobItem._id)
                .length === 0
            }
          >
            {
              jobApplications.filter((item) => item.jobId === jobItem._id)
                .length
            }{" "}
            Applicants
          </Button>
        }
      />
      <JobApplicants
        showApplicantsDrawer={showApplicantsDrawer}
        setShowApplicantsDrawer={setShowApplicantsDrawer}
        currentCandidiateDetails={currentCandidiateDetails}
        setCurrentCandidateDetails={setCurrentCandidateDetails}
        showCurrentCandidateDetailsModel={showCurrentCandidateDetailsModel}
        setShowCurrentCandidateDetailsModel={
          setShowCurrentCandidateDetailsModel
        }
        jobItem={jobItem}
        jobApplications={jobApplications.filter(
          (JobApplicantItem) => JobApplicantItem.jobId === jobItem?._id
        )}
      />
    </div>
  );
}

export default RecruiterJobCard;
