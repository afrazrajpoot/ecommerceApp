"use client";

import Sidebar from "../../components/Common/Sidebar/Sidebar";
import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useDeleteSubscriptionMutation, useGetSubscriptionDataByIdQuery } from "@/store/storeApi";
import { toast } from "sonner";
import Loading from "@/app/components/Common/Loading";
import jsPDF from "jspdf";
import Link from "next/link";
import { RiBox3Line } from "react-icons/ri";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#FF689A" : "#FF689A",
  },
}));

const page = () => {
  const [id, setId] = useState(null); // Initialize with null
  const { data, isLoading } = useGetSubscriptionDataByIdQuery(id, {
    skip: !id,
  });

  const startDate = new Date(data?.subscription?.startDate);
  const formattedTime = startDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const [deletePlan] = useDeleteSubscriptionMutation();
  async function cancelPlan() {
    if (!id) {
      toast.error("No plan selected to delete.", {
        position: "top-right",
        style: { marginTop: 40 },
      });
      return;
    }
    let confirm;
    confirm = window.confirm("Are you sure you want to delete this plan?");
    try {
      if (confirm) {
        await deletePlan(id);
        toast.success("Plan deleted successfully!", {
          style: { marginTop: 40 },
        });
      }
      localStorage.removeItem("subscriptionId");
      window.location.reload();
    } catch (err) {
      toast.error("Failed to delete plan. Please try again later.", {
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        style: { marginTop: 40 },
      });
    }
  }
  const handleDownload = () => {
    const doc = new jsPDF();

    // Add a title
    doc.setFontSize(18);
    doc.addImage("/img/Logo.png", "PNG", 10, 10, 45, 15);
    doc.text("Invoice", 105, 20, null, null, "center");
    // Add a horizontal line
    doc.setLineWidth(0.5);
    doc.line(10, 25, 200, 25);
    // Set font size for the details
    doc.setFontSize(12);
    // Define the start positions
    const startX = 20;
    const startY = 35;
    const lineSpacing = 10;
    // Add the details
    const details = [
      `User Name: ${data?.subscription?.username || ""}`,
      `Price: $${data?.subscription?.price || ""}`,
      `Plan Type: ${data?.subscription?.planType || ""}`,
      `Email: ${data?.subscription?.email || ""}`,
    ];
    details.forEach((detail, index) => {
      doc.text(detail, startX, startY + index * lineSpacing);
    });
    doc.save("invoice.pdf");
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.subscriptionId) {
      setId(user?.subscriptionId);
    }
  }, []);

  return (
    <main className="bg-[#FAFAFA] ">
      <Sidebar />
      <div className=" w-full lg:max-w-[59vw] max-w-[80vw] m-auto lg:ml-[30vw] lg:translate-y-[6vw] translate-y-[25vw] sm:translate-y-[10vw]">
        <h1 className="font-bold lg:text-[1.5vw] text-[4vw] sm:text-[3vw]">Billing Status</h1>
        <aside className="w-full bg-white mt-[2vw] shadow-md rounded-[10px] p-5">
          <section className="w-full border border-[#EEEEEE] rounded-[6px] p-5">
            <nav className="bg-[#F5F5F5] border border-[#E5E5E5] p-[2vw] lg:p-[0.7vw] rounded-[0.5vw] shadow-sm w-full">
              <div className="flex justify-between mx-2">
                <div className="flex items-center">
                  <span className="p-2 bg-white rounded-full border border-[#EEEEEE]">
                    <RiBox3Line size={28} />
                  </span>
                  <section>
                    <h1 className="font-semibold lg:text-[1.5vw] text-[3.2vw] sm:text-[2.8vw] ml-[0.5vw]">
                      {!isLoading && !data?.subscription?.planType
                        ? "No plan subscribed "
                        : data?.subscription?.planType}
                    </h1>
                    <p className="lg:text-[1vw] text-[2.6vw] sm:text-[2.5vw] ml-[0.5vw] text-gray-500">
                      Current Plan
                    </p>
                  </section>
                </div>
                <aside className="flex flex-col sm:flex-row justify-center my-[2vw] items-center gap-6">
                  <button
                    onClick={cancelPlan}
                    className="text-center  rounded-md text-[#ED544E] hover:bg-white px-4 py-2 font-semibold whitespace-nowrap"
                  >
                    Cancel Plan
                  </button>
                  <Link href="/subscription" className="w-full block">
                    <button className="hover:bg-[#FF689A] hover:text-white text-center rounded-md text-[#FF689A]  border border-[#FF689A] px-4 py-2 font-semibold whitespace-nowrap">
                      {!data ? "Subscribe" : "Change Plan"}
                    </button>
                  </Link>
                </aside>
              </div>
              <div className="lg:mt-[2vw] mt-[3vw]">
                {data?.subscription?.planType && (
                  <BorderLinearProgress
                    variant="determinate"
                    value={
                      data?.subscription?.planType === "Basic" ||
                      data?.subscription?.planType === "MONTHLY" ||
                      data?.subscription?.planType === "Regular"
                        ? 30
                        : data?.subscription?.planType === "Premium"
                        ? 70
                        : data?.subscription?.planType === "40 PACK BUNDLE" ||
                          data?.subscription?.planType === "ANNUAL"
                        ? 100
                        : 0
                    }
                  />
                )}
              </div>
              <article className="flex flex-col sm:flex-row items-center w-full mt-[0.7vw]">
                <aside className="p-[2.2vw] sm:p-[1.2vw] rounded-[1.2vw] bg-[#ffff] m-[2.5vw] sm:m-[0.5vw] w-full">
                  <p className="text-[14px] text-gray-500">Daily Download</p>
                  <h1 className="text-[20px] font-semibold text-[#151515]">
                    {data?.subscription?.planType === "Regular" ||
                    data?.subscription?.planType === "MONTHLY"
                      ? "5"
                      : data?.subscription?.planType === "Basic"
                      ? "10"
                      : data?.subscription?.planType === "Premium"
                      ? "15"
                      : data?.subscription?.planType === "40 PACK BUNDLE" ||
                        data?.subscription?.planType === "ANNUAL"
                      ? "Unlimited"
                      : "0"}
                  </h1>
                </aside>
                <aside className="p-[2.2vw] sm:p-[1.2vw] rounded-[1.2vw] bg-[#ffff] m-[2.5vw] sm:m-[0.5vw] w-full">
                  <p className="text-[14px] text-gray-500">Quota Left</p>
                  <h1 className="text-[20px] font-semibold text-[#151515]">
                    {isLoading ? (
                      <Loading />
                    ) : !data?.subscription?.downloadLimit ? (
                      0
                    ) : data?.subscription?.downloadLimit > 0 ? (
                      data?.subscription?.downloadLimit === 10000 ? (
                        "No limit"
                      ) : (
                        data?.subscription?.downloadLimit
                      )
                    ) : (
                      0
                    )}
                  </h1>
                </aside>
              </article>
            </nav>
            <figure className="my-[4vw] sm:my-[2vw]">
              <hr />
            </figure>
            {data?.subscription?.startDate && (
              <section className="w-full my-4">
                <h1 className="font-medium lg:text-[1.4vw] text-[4vw] sm:text-[3.2vw]">
                  Billing History
                </h1>
                <div className="flex items-center my-4">
                  <section className="text-[#7F7F7F]">
                    <h1 className="lg:text-[1vw] text-[3vw] sm:text-[2vw]">
                      {isLoading ? "00/00/00" : startDate.toLocaleDateString()}
                    </h1>
                    <p className="lg:text-[1vw] text-[3vw] sm:text-[2.5vw]">{formattedTime}</p>
                  </section>
                  <section className="ml-[2vw]">
                    <h1 className="font-semimedium lg:text-[1.1vw] text-[3vw] sm:text-[2.2vw] ml-[0.5vw]">
                      ${data?.subscription?.price}
                    </h1>
                    <p
                      onClick={handleDownload}
                      className="lg:text-[1vw] text-[3vw] sm:text-[2.5vw] text-[#FF689A] ml-[0.5vw] hover:cursor-pointer font-medium"
                    >
                      Download invoice
                    </p>
                  </section>
                </div>
              </section>
            )}
          </section>
        </aside>
      </div>
    </main>
  );
};

export default page;
