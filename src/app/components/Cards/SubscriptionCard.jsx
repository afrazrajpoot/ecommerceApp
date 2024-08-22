import React, { useState } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useGlobalContext } from "@/context/globalState";

const SubscriptionCard = ({ title, monthlyData, yearlyData, onPlanSelect, index }) => {
  const [isYearly, setIsYearly] = useState(false);
  const { setSelectedPlan, setActive, login, customerID } = useGlobalContext();

  const currentPlan = isYearly ? yearlyData : monthlyData;

  return (
    <main className="bg-[#fff] w-full sm:max-w-[40vw] lg:max-w-[22vw] rounded-[5vw] md:rounded-[1vw] px-10 pt-10 pb-1">
      <p className="text-[4vw] sm:text-[2vw] lg:text-[1vw] font-medium text-[#FF387A]">{title}</p>
      <div className="flex mt-[0.6vw] text-[#171717] items-center">
        <h1 className="text-[8.5vw] sm:text-[5vw] lg:text-[2.5vw] font-semibold ">
          ${currentPlan.price}
        </h1>
        <span className="text-[3.8vw] sm:text-[1.8vw] lg:text-[0.8vw] font-medium self-end mb-3">
          /{isYearly ? "year" : "month"}
        </span>
      </div>
      <p className="text-[4vw] sm:text-[2vw] lg:text-[1vw] mt-[0.6vw] text-[#171717]">
        For new creators building their list
      </p>
      <section className="relative my-4 w-full rounded-full lg:max-w-[22vw] flex items-center bg-[#F5F5F5] overflow-hidden">
        <div
          className={`absolute top-0 bottom-0 left-0 w-1/2 bg-black rounded-full transition-transform duration-300 ease-in-out ${
            !isYearly ? "transform translate-x-0" : "transform translate-x-full"
          }`}
        ></div>

        <button
          onClick={() => setIsYearly(false)}
          className={`relative z-10 text-[4vw] sm:text-[2vw] lg:text-[1vw] ${
            !isYearly ? "text-white" : "text-[#171717]"
          } p-[2vw] md:p-[0.2vw] mr-[0.5vw] w-full max-w-[35vw] sm:max-w-[30vw] lg:max-w-[10vw] rounded-full`}
        >
          Monthly
        </button>
        <button
          onClick={() => {
            setIsYearly(true);
          }}
          className={`relative z-10 text-[4vw] sm:text-[2vw] lg:text-[1vw] ${
            isYearly ? "text-white" : "text-[#171717]"
          } p-[2vw] md:p-[0.2vw] ml-[0.5vw] w-full max-w-[35vw] sm:max-w-[30vw] lg:max-w-[10vw] rounded-full`}
        >
          Yearly
        </button>
      </section>
      <article className="w-full border-t-[1px] border-gray-300">
        {currentPlan.features &&
          currentPlan.features.map((item, index) => (
            <section key={index} className="flex items-center mt-[5vw] sm:mt-[2vw] lg:mt-[1vw]">
              <CheckCircleOutlineIcon className="text-[#FF387A] text-[4.3vw] sm:text-[2.3vw] lg:text-[1.3vw]" />
              <p className="text-[4vw] sm:text-[2vw] lg:text-[1vw] font-medium text-[#171717] ml-[0.5vw]">
                {item}
              </p>
            </section>
          ))}
        <button
          className="bg-[#FF387A] text-[4vw] sm:text-[2vw] lg:text-[1vw] mt-8 hover:shadow-md hover:bg-[#ff387af1] text-[#fff] py-2 px-6 rounded-md w-full text-center"
          onClick={() =>
            onPlanSelect(index, currentPlan.price, currentPlan.features, currentPlan.available)
          }
        >
          Select Plan
        </button>
      </article>
    </main>
  );
};

export default SubscriptionCard;
