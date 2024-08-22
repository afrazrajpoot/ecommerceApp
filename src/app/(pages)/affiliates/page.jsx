"use client";
import Link from "next/link";
import React, { useState } from "react";

const page = () => {
  const linksData = [
    {
      url: "/affiliates",
      title: "Affiliates URLs",
    },
    {
      url: "/statistics",
      title: "Statistics",
    },
    {
      url: "/graphs",
      title: "Graphs",
    },
    {
      url: "/referrals",
      title: "Referrals",
    },
    {
      url: "/payouts",
      title: "Payouts",
    },
    {
      url: "/visits",
      title: "Visits",
    },
    {
      url: "/settings",
      title: "Settings",
    },
    {
      url: "/logout",
      title: "Log out",
    },
  ];
  const affiliateData = [
    {
      title: "Affiliate URLs",
      desc1: "Your affiliate ID is: 45",
      desc2: "Your referral URL is: https://develop.sonduckfilm.com/?ref=45",
    },
    {
      title: "Referral URL Generator",
      desc1:
        "Enter any URL from this website in the form below to generate a referral link!",
    },
  ];

  return (
    <main className=" bg-white pb-[2vw]">
      <section className="w-full flex justify-center gap-[3vw] translate-y-[8vw] items-center flex-col">
        <h1 className="text-[2vw]">SONDUCK AFFILIATES</h1>
        <p className="text-[3vw] font-bold">BECOME A SONDUCK PARTNER</p>
        <p className="text-[1.5vw]">
          Join our affiliate community and earn money through referring
          individual digital assets.
        </p>
      </section>
      <section className="flex p-[1.5vw] mt-[15vw]">
        <figure>
          <img
            src="https://develop.sonduckfilm.com/wp-content/uploads/2021/07/Affilates-Benefits2.jpg"
            alt="affiliate"
          />
        </figure>
        <figure>
          <img
            src="https://develop.sonduckfilm.com/wp-content/uploads/2021/07/9-Pack-Bundle2.jpg"
            alt="affiliate"
          />
        </figure>
      </section>
      <section className="flex flex-col items-center gap-[3vw]">
        <p className="text-[1.3vw]">
          Sign up below and starting selling now! If you fit our ideal
          affiliate, we will send you any product on our site for free.
        </p>

        <iframe
          width="760"
          height="515"
          src="https://www.youtube.com/embed/MsqscsOcm88?si=y5nr_KgWhQyDwOfU&controls=0"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </section>
      <section className="ml-[3vw] mt-[5vw]">
        <nav className="flex gap-[2vw]">
          {linksData.map((link, index) => (
            <div key={index}>
              <p className="text-[1.5vw] font-medium   text-pink-500 ">
                <Link href={link.url}>{link.title}</Link>
              </p>
            </div>
          ))}
        </nav>
        <article className="mt-[4vw] flex ">
          <div className="flex gap-[2vw] flex-col">
            {affiliateData?.map((ele, ind) => (
              <div key={ind} className="">
                <h2 className="text-[1.5vw] font-medium   text-pink-500">
                  {ele.title}
                </h2>
                <div className="mt-[1vw]">
                  <p className="text-[1.2vw]">{ele.desc1}</p>
                  <p className="text-[1.2vw]">{ele.desc2}</p>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
      <form
        action=""
        className="w-full max-w-[93vw] mt-[2vw] m-auto flex flex-col gap-[1.5vw]"
      >
        <div>
          <label htmlFor="" className="text-[1.3vw] ">
            Page URL
          </label>
        </div>
        <div className="w-full">
          <input
            type="text"
            className="p-[1vw] w-full border-[1px] border-black focus:border-pink-500"
            name=""
          />
        </div>
        <div>
          <label htmlFor="" className="text-[1.3vw] ">
            Campaign Name (optional)
          </label>
        </div>
        <div className="w-full">
          <input
            type="text"
            className="p-[1vw] w-full border-[1px] border-black focus:border-pink-500 "
            name=""
            id=""
          />
        </div>
      </form>
      <div className="w-full max-w-[93vw] m-auto mt-[3vw]">
        <button className="bg-[#eaeaea] w-full">Generate url</button>
      </div>
    </main>
  );
};

export default page;
