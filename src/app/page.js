import { fetchProfileAction } from "@/actions";
import HomePageButton from "@/components/home-page-button";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Fragment } from "react";

export default async function Home() {
  const user = await currentUser();
  console.log(user, "currentUser");

  const profileInfo = await fetchProfileAction(user?.id);

  if (user && !profileInfo?._id) redirect("/onboard");

  return (
    <Fragment>
      <div className="bg-whilte mt-[50px]">
        <div className="relative w-full px-6 lg:px-8">
          <div className="min-h-screen flex">
            <div className="container m-auto p-0">
              <div className="flex items-center flex-wrap gap-12 lg:gap-0">
                <div className="lg:w-5/12 space-y-8">
                  <span className="flex space-x-2">
                    <span className="block w-14 mb-2 border-b-2 border-gray-700"></span>
                    <span className="font-medium text-gray-600">One Stop Solution to Find Jobs</span>
                  </span>
                  <h1 className="text-4xl font-bold md:text-6xl">
                    The Best <br/> Job Portal App
                  </h1>
                  <p className="text-xl text-gray-700">
                    Find Best Jobs From Top Product Based Companies and Build Your Career
                  </p>
                  <HomePageButton user={JSON.parse(JSON.stringify(user))} profileInfo={profileInfo} />
                </div>
                <div className="hidden relative md:block lg:w-7/12">
                  <img 
                    src="https://shorturl.at/msw07"
                    alt="Job Portal"
                    className="relative ml-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
