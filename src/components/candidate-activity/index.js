"use client";

import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

function CandidateActivity({ jobList, jobApplicants }) {
  console.log(jobList, jobApplicants);

  const uniqueStatusArray = [
    ...new Set(
      jobApplicants.map((jobApplicantsItem) => jobApplicantsItem.status).flat(1)
    ),
  ];
  console.log(uniqueStatusArray);

  return (
    <div className="mx-auto max-w-7xl mt-[70px]">
      <Tabs defaultValue="Applied" className="w-full">
        <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6 px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-950">
            Your Activity
          </h1>
          <TabsList>
            {uniqueStatusArray.map((statusItem) => {
              return <TabsTrigger value={statusItem}>{statusItem}</TabsTrigger>;
            })}
          </TabsList>
        </div>
        <div className="w-full pb-24 pt-6 px-6 lg:px-8">
          <div className="flex flex-col">
            {uniqueStatusArray.map((status) => (
              <TabsContent value={status} className="space-y-8">
                {jobList
                  .filter(
                    (jobItem) =>
                      jobApplicants
                        .filter(
                          (jobApplication) =>
                            jobApplication.status.indexOf(status) > -1
                        )
                        .findIndex(
                          (filteredItemByStatus) =>
                            jobItem._id === filteredItemByStatus.jobId
                        ) > -1
                  )
                  .map((finalFilteredItem) => (
                    <CommonCard icon={<JobIcon />}
                    title={finalFilteredItem.title}
                    description={finalFilteredItem.companyName}
                    />
                  ))}
              </TabsContent>
            ))}
          </div>
        </div>
      </Tabs>
    </div>
  );
}

export default CandidateActivity;
