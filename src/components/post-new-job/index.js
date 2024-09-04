"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { postNewJobFormControls, postNewJobFormData } from "@/utils";
import CommonForm from "../common-form";
import { PostJobAction } from "@/actions";
import { useToast } from "@/components/hooks/use-toast";
import Link from "next/link";

function PostNewJob({ profileInfo, user, jobList }) {
  console.log(jobList, "joblist");

  const [showJobDialog, setShowJobDialog] = useState(false);
  const [jobFormData, setJobFormData] = useState({
    ...postNewJobFormData,
    companyName: profileInfo?.recruiterInfo?.companyName,
  });

  function handlePostNewBtnValid() {
    return Object.keys(jobFormData).every(
      (control) => jobFormData[control].trim() !== ""
    );
  }

  const { toast } = useToast();

  function handleAddNewJob() {
    console.log("inside clickt");
    if (!profileInfo?.isPremiumUser && jobList.length >= 2) {
      toast({
        variant: "destructive",
        title: "You can post max 2 jobs",
        description: "Please opt for premium plan to post more jobs",
        action: <Link href={"/membership"}>See Plans</Link>,
      });
      return;
    }
    setShowJobDialog(true);
  }

  async function createNewJob() {
    await PostJobAction(
      {
        ...jobFormData,
        recruiterId: user?.id,
        applicant: [],
      },
      "/jobs"
    );

    setJobFormData({
      ...postNewJobFormData,
      companyName: profileInfo?.recruiterInfo?.companyName,
    });
    setShowJobDialog(false);
  }

  return (
    <div>
      <Button
        onClick={handleAddNewJob}
        className="flex h-11 items-center justify-center px-5 mt-6"
      >
        Post A Job
      </Button>
      <Dialog
        open={showJobDialog}
        onOpenChange={() => {
          setShowJobDialog(false);
          setJobFormData({
            ...postNewJobFormData,
            companyName: profileInfo?.recruiterInfo?.companyName,
          });
        }}
      >
        <DialogContent className="sm:max-w-screen-md h-[500px] overflow-auto">
          <DialogHeader>Post New Job</DialogHeader>
          <div className="grid gap-4 py-4">
            <CommonForm
              buttonText={"Add"}
              formData={jobFormData}
              setFormData={setJobFormData}
              formControls={postNewJobFormControls}
              isBtnDisabled={!handlePostNewBtnValid()}
              action={createNewJob}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PostNewJob;
