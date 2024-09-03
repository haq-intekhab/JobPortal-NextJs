"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useEffect } from "react";

function HomePageButton({ user, profileInfo }) {
  const router = useRouter();

  useEffect(()=> {
    router.refresh();
  },[]);

  return (
    <div className="flex space-x-4">
      <Button
        onClick={() => router.push("/jobs")}
        className="flex h-11 items-center justify-center px-5 mt-6"
      >
        {user
          ? profileInfo?.role === "candidate"
            ? "Browse Jobs"
            : "Jobs Dashboard"
          : "Find Jobs"}
      </Button>
      <Button
        onClick={() =>
          router.push(
            user
              ? profileInfo?.role === "candidate"
                ? "/activity"
                : "/jobs"
              : "/jobs"
          )
        }
        className="flex h-11 items-center justify-center px-5 mt-6"
      >
        {user
          ? profileInfo?.role === "candidate"
            ? "View Activity"
            : "Post New Job"
          : "Post New Job"}
      </Button>
    </div>
  );
}

export default HomePageButton;
