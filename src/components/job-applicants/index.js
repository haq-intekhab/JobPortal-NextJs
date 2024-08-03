"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "../ui/scroll-area";
import CandidateList from "../candidate-list";

function JobApplicants({
  showApplicantsDrawer,
  setShowApplicantsDrawer,
  currentCandidiateDetails,
  setCurrentCandidateDetails,
  showCurrentCandidateDetailsModel,
  setShowCurrentCandidateDetailsModel,
  jobItem,
  jobApplications,
}) {
  return (
    <Drawer open={showApplicantsDrawer} onOpenChange={setShowApplicantsDrawer}>
      <DrawerContent className="max-h-[50vh]">
        <ScrollArea className="h-auto overflow-y-auto ">
          <CandidateList
            currentCandidiateDetails={currentCandidiateDetails}
            setCurrentCandidateDetails={setCurrentCandidateDetails}
            showCurrentCandidateDetailsModel={showCurrentCandidateDetailsModel}
            setShowCurrentCandidateDetailsModel={setShowCurrentCandidateDetailsModel}
            jobApplications={jobApplications}
          />
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}

export default JobApplicants;
