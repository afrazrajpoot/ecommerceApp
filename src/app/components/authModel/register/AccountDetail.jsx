"use client";
import { Button } from "@mui/material";
import React from "react";
import AccountForm from "./AccountForm";

const AccountDetail = () => {
  return (
    <>
      <div className=" w-full max-w-[30vw] ml-[30vw] absolute top-[6vw]">
        <div className="">
          <div className=" p-[1vw] mt-[1vw]">
            <header className="flex items-start gap-[2vw]">
              <div className="">
                <img src="/img/accountAvatar.png" alt="avatar" className="" />
              </div>
              <div>
                <p className="text-[1vw] text-[#64748B]">
                  We only support .JPG, .JPEG, or .PNG file.
                </p>
                <div className="mt-[1vw] flex gap-[1vw]">
                  <Button
                    size="small"
                    variant="contained"
                    className="bg-[#FF387A] text-white md:text-[0.7vw] text-[10vw] font-bold hover:bg-black"
                  >
                    upload photo
                  </Button>

                  <Button
                    size="small"
                    variant="outlined"
                    className=" md:text-[0.7vw] text-[#FF387A] border-[1.5px] font-bold border-[#FF387A] hover:border-[#FF387A]"
                  >
                    delete photo
                  </Button>
                </div>
              </div>
            </header>
            <section>
              <div>
                <AccountForm />
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountDetail;
