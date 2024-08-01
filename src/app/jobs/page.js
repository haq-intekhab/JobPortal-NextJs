import { fetchProfileAction } from "@/actions";
import JobListing from "@/components/job-listing";
import { currentUser } from "@clerk/nextjs/server";

async function JobsPage(){
    const user = await currentUser();
    const profileInfo = await fetchProfileAction(user?.id);
    return (
        <JobListing profileInfo={profileInfo} user={JSON.parse(JSON.stringify(user))}/>
    );
}

export default JobsPage;