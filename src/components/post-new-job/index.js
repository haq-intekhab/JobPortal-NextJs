"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { postNewJobFormControls, postNewJobFormData } from "@/utils";
import CommonForm from "../common-form";
import { PostJobAction } from "@/actions";

function PostNewJob({ profileInfo, user }) {
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
    setShowJobDialog(false)
  }

  return (
    <div>
      <Button
        onClick={() => setShowJobDialog(true)}
        className="disabled:opacity-60 flex h-11 items-center justify-center px-5 mt-6"
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
