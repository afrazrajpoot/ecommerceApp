"use client";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
// import Sidebar from "../components/Common/Sidebar/Sidebar";
import Sidebar from "@/app/components/Common/Sidebar/Sidebar";
import { useGlobalContext } from "@/context/globalState";
import Link from "next/link";
// import Loading from "../components/Common/Loading";
import Loading from "@/app/components/Common/Loading";

const DownloadProduct = ({ img, desc, productId, orderKey, downloadKey, email }) => {
  // console.log(productId, orderKey, downloadKey, email, "downloads");
  // console.log(downloadKey, "downloadskey");
  return (
    <main className="flex w-full max-w-[80vw] sm:max-w-[30vw] lg:max-w-[20vw] flex-col items-center lg:items-start">
      <figure className="w-full max-w-[80vw] sm:max-w-[50vw] lg:max-w-[15vw]">
        <img src={img} alt="img product" className="w-full" />
      </figure>
      <p className="text-[4.5vw] sm:text-[2vw] lg:text-[1vw] mt-[2vw] lg:mt-[1vw] font-medium text-center lg:text-left ml-[12%] mr-[30%]">
        {desc}
      </p>
      <Link
        href={`https://develop.sonduckfilm.com/?download_file=${productId}&order=${orderKey}&email=${email}&key=${downloadKey}`}
        target="_blank"
      >
        <Button
          variant="outlined"
          style={{ textTransform: "capitalize" }}
          className="py-[2vw] lg:py-[0.4vw] px-[5vw] lg:px-[1vw] w-full lg:w-auto text-[4vw] sm:text-[1.5vw] lg:text-[1vw] text-[#FF387A] hover:bg-[#FF387A] hover:text-white hover:border-white border-[#FF387A] rounded-lg mt-[2vw] lg:mt-[1vw] lg:ml-[2.5vw]"
        >
          Download now
        </Button>
      </Link>
    </main>
  );
};

const Page = () => {
  const { customerID, fetchWooCommerceData, state, setPaymentActive } = useGlobalContext();
  const [fetchedPersonalOrders, setFetchedPersonalOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (customerID && customerID !== "null") {
      const fetchOrders = async () => {
        setLoading(true);
        try {
          const data = await fetchWooCommerceData(`wc/v3/orders/?customer=${customerID}`);
          setFetchedPersonalOrders(data);
        } catch (error) {
          console.error("Error fetching orders:", error);
        } finally {
          setLoading(false);
          setPaymentActive(false);
        }
      };
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [customerID, state]);
  // console.log(fetchedPersonalOrders, "fetch orders");
  return (
    <main className="bg-[#FAFAFA] w-full max-h-[500vh]">
      <Sidebar />
      <section className="rounded-lg w-full lg:max-w-[70vw] max-w-[90vw] lg:translate-x-[26vw] translate-x-[5vw] p-[2vw]">
        <h1 className="font-bold text-[6vw] sm:text-[3vw] lg:text-[2vw] ml-[5vw] lg:ml-0 translate-y-[15vw] lg:translate-y-[5vw] lg:translate-x-0 sm:translate-y-[8vw] sm:ml-[1vw]">
          Downloads
        </h1>
        <div className="p-[2vw] w-full bg-white border-[1px] border-[#F5F5F5] mt-[1vw] translate-y-[20vw] sm:translate-y-[8vw] lg:translate-y-[5vw] rounded-lg">
          {loading ? (
            <Loading />
          ) : fetchedPersonalOrders?.data && fetchedPersonalOrders?.data.length > 0 ? (
            <div className="flex flex-col lg:grid lg:grid-cols-3 sm:flex-row lg:gap-[1vw] gap-[5vw] items-center">
              {fetchedPersonalOrders?.data?.map((elem, ind) => (
                <DownloadProduct
                  key={ind}
                  img={elem?.line_items[0]?.image?.src}
                  desc={elem?.line_items[0]?.name}
                  downloadKey={elem?.billing.address_2}
                  productId={elem?.line_items[0]?.product_id}
                  orderKey={elem?.order_key}
                  email={elem?.billing.email}
                />
              ))}
            </div>
          ) : (
            <p className="text-[#FF387A] text-center font-bold lg:text-[1.5vw] text-[1.5vw] sm:text-[2vw]">
              No Downloads
            </p>
          )}
        </div>
      </section>
    </main>
  );
};

export default Page;
