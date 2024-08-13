import {
  createFilterCategoriesAction,
  fetchJobApplicationsForCandidate,
  fetchJobApplicationsForRecruiter,
  fetchJobsForCandidateAction,
  fetchJobsForRecruiterAction,
  fetchProfileAction,
} from "@/actions";
import JobListing from "@/components/job-listing";
import { currentUser } from "@clerk/nextjs/server";

async function JobsPage() {
  const user = await currentUser();
  const profileInfo = await fetchProfileAction(user?.id);
  const jobList =
    profileInfo.role === "candidate"
      ? await fetchJobsForCandidateAction()
      : await fetchJobsForRecruiterAction(user?.id);

  const getJobApplicationList =
    profileInfo?.role === "candidate"
      ? await fetchJobApplicationsForCandidate(user?.id)
      : await fetchJobApplicationsForRecruiter(user?.id);

      const fetchFilterCategories = await createFilterCategoriesAction();

  return (
    <JobListing
      jobList={jobList}
      profileInfo={profileInfo}
      user={JSON.parse(JSON.stringify(user))}
      jobApplications={getJobApplicationList}
      filterCategories={fetchFilterCategories}
    />
  );
}

export default JobsPage;
