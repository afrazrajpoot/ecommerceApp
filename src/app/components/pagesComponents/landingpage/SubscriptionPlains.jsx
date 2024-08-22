import React from "react";
import SubscriptionCard from "../../Cards/SubscriptionCard";
import { useGlobalContext } from "@/context/globalState";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

const SubscriptionPlans = () => {
  const router = useRouter();
  const { setSelectedPlan, setActive, login, customerID } = useGlobalContext();

  const subscriptionPlans = [
    {
      title: "Regular",
      monthly: {
        price: "25",
        available: "Regular",
        features: [
          "5 downloads per day",
          "Access to all products",
          "Access to new releases",
          "25% renewal discount",
        ],
      },
      yearly: {
        limit: "year",
        price: 25 + 25,
        available: "Regular",
        features: [
          "10 downloads per day",
          "Access to all products",
          "Access to new releases",
          "50% renewal discount",
        ],
      },
    },
    {
      title: "Basic",
      monthly: {
        price: "50",
        available: "Basic",
        features: [
          "10 downloads per day",
          "Access to all products",
          "Access to new releases",
          "25% renewal discount",
        ],
      },
      yearly: {
        limit: "year",
        price: 50 + 50,
        available: "Regular",
        features: [
          "20 downloads per day",
          "Access to all products",
          "Access to new releases",
          "80% renewal discount",
        ],
      },
    },
    {
      title: "Premium",
      monthly: {
        price: "320",
        available: "Premium",
        features: [
          "5 downloads per day",
          "Access to all products",
          "Access to new releases",
          "25% renewal discount",
        ],
      },
      yearly: {
        limit: "year",
        price: 320 + 320,
        available: "Premium",
        features: [
          "25 downloads per day",
          "Access to all products",
          "Access to new releases",
          "90% renewal discount",
        ],
      },
    },
    // ... (other plans)
  ];

  const handlePlanSelect = (index, price, features, available) => {
    if (!login) {
      toast.error("Please login first", {
        position: "top-right",
        style: { marginTop: 40 },
      });
      return;
    } else if (!customerID) {
      toast.error("Please register yourself as a customer", {
        position: "top-right",
        style: { marginTop: 40 },
      });
      router.push("/accountdetails");
      return;
    } else {
      const newSelectedPlan = {
        index,
        price,
        features,
        available,
        limit: subscriptionPlans[0].yearly.limit,
      };
      setSelectedPlan(newSelectedPlan);
      setActive(true);
      router.push("/payment");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center p-[2vw]">
      {/* ... (rest of the JSX) */}
      <section className="w-full max-w-[80vw] mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[10vw] md:gap-[5vw] lg:gap-[2vw] items-center">
        {subscriptionPlans.map((plan, index) => (
          <div key={index}>
            <SubscriptionCard
              title={plan.title}
              monthlyData={plan.monthly}
              yearlyData={plan.yearly}
              onPlanSelect={handlePlanSelect}
              limit={plan.yearly?.limit}
              index={index}
            />
          </div>
        ))}
      </section>
      {/* ... (rest of the JSX) */}
    </main>
  );
};

export default SubscriptionPlans;
