"use client";

import { membershipPlans } from "@/utils";
import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Button } from "../ui/button";
import { createPriceIdAction } from "@/actions";

function Membership() {
  async function handlePayment(getCurrentPlan) {
    const extractPriceId = await createPriceIdAction({
      amount: Number(getCurrentPlan?.price),
    });

    console.log(extractPriceId);
    
  }

  return (
    <div className="mx-auto max-w-7xl mt-[70px] px-6 lg:px-8">
      <div className="flex items-baseline justify-between border-b pb-6 pt-24">
        <h1 className="text-4xl font-bold tracking-tight text-gray-950">
          Choose Your Besr Plan
        </h1>
      </div>
      <div className="py-20 pb-24 pt-6">
        <div className="container mx-auto p-0 space-y-8">
          <div className="grid grid-cols-1 gap-x-4 md:grid-cols-2 lg:grid-cols-3">
            {membershipPlans.map((plan) => (
              <CommonCard
                icon={
                  <div className="flex justify-between">
                    <div>
                      <JobIcon />
                    </div>
                    <h1 className="font-bold text-2xl">{plan.heading}</h1>
                  </div>
                }
                title={`Rs ${plan.price} / yr`}
                description={plan.type}
                footerContent={
                  <Button
                    onClick={() => handlePayment(plan)}
                    className="flex h-11 items-center justify-center px-5"
                  >
                    Get Premium
                  </Button>
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Membership;
