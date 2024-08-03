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
                  <h3 className="text-lg font-bold">
                    {jobApplicantItem?.name}
                  </h3>
                  <Button
                    onClick={() =>
                      handleFetchCandidateDetails(
                        jobApplicantItem?.candidateUserId
                      )
                    }
                    className="flex h-11 items-center justify-center px-5 mt-6"
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
            <h1 className="text-2xl font-bold text-black">
              {currentCandidiateDetails?.candidateInfo?.name},{" "}
              {currentCandidiateDetails?.email}
            </h1>
            <p className="text-xl font-medium text-black">
              {currentCandidiateDetails?.candidateInfo?.currentCompany}
            </p>
            <p className="text-sm font-normal text-black">
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
            <div className="flex flex-wrap items-center gap-4 mt-6">
              <h1>Previous Companies</h1>
              {currentCandidiateDetails?.candidateInfo?.previousCompanies
                .split(",")
                .map((skillItem) => (
                  <div className="w-[100px] flex justify-center items-center h-[35px] bg-black rounded-[4px]">
                    <h2 className="text-[13px] font-medium text-white">
                      {skillItem}
                    </h2>
                  </div>
                ))}
            </div>
            <div className="flex flex-wrap gap-4 mt-6">
              {currentCandidiateDetails?.candidateInfo?.skills
                .split(",")
                .map((skillItem) => (
                  <div className="w-[100px] flex justify-center items-center h-[35px] bg-black rounded-[4px]">
                    <h2 className="text-[13px] font-medium text-white">
                      {skillItem}
                    </h2>
                  </div>
                ))}
            </div>
          </div>
          <DialogFooter>
            <div className="flex gap-3">
              <Button className="flex h-11 items-center justify-center px-5 mt-6">
                Resume
              </Button>
              <Button className="flex h-11 items-center justify-center px-5 mt-6">
                Select
              </Button>
              <Button className="flex h-11 items-center justify-center px-5 mt-6">
                Reject
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

export default CandidateList;
