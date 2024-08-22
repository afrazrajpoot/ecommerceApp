"use client";
import React from "react";
import SignupModel from "../../components/authModel/register/SignupModel";
import SigninModel from "../../components/authModel/register/SigninModel";
import ForgetModel from "../../components/authModel/forgotPassword/ForgetModel";
import OtpModel from "../../components/authModel/otp/OtpModel";
import ResetModel from "../../components/authModel/resetModal/ResetModel";

const page = () => {
  return (
    <main className="absolute top-[8vw]">
      <SignupModel />
      <SigninModel />
      <ForgetModel />
      <OtpModel />
      <ResetModel />
    </main>
  );
};

export default page;
