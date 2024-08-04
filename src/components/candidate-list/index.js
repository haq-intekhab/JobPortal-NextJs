"use client";

import { getCandidateDetailsByIdSction } from "@/actions";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter } from "../ui/dialog";

const { Fragment } = require("react");

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
                    <p className="text-md font-light overflow-hidden">{jobApplicantItem?.email}</p>
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
          <DialogFooter>
            <div className="flex justify-between">
              <Button className="flex h-11 items-center justify-center px-5 mt-6">
                Resume
              </Button>
              <div className="flex gap-3">
                <Button className="flex h-11 items-center justify-center px-5 mt-6">
                  Select
                </Button>
                <Button className="flex h-11 items-center justify-center px-5 mt-6">
                  Reject
                </Button>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

export default CandidateList;
