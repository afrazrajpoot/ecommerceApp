"use client";
import { createPasswordForm } from "@/data/data";
import { useUpdatePasswordMutation } from "@/store/storeApi";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import Loading from "../../Common/Loading";

const CreatePasswordForm = () => {
  const [id, setId] = useState("");
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const newPassword = watch("newPassword");
  const [updatePassword, { isLoading, isError, isSuccess }] = useUpdatePasswordMutation();

  const onSubmit = async (data) => {
    try {
      const formData = {
        oldPassword: data?.oldPassword,
        id: id,
        newPassword: data?.newPassword,
      };
      await updatePassword(formData);
      reset();
    } catch (err) {
      toast.error("Failed to update password", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        style: { marginTop: 40 },
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password updated successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        style: { marginTop: 40 },
      });
    }
    if (isError) {
      toast.error("Your credential is wrong please enter correct password", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        style: { marginTop: 40 },
      });
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user"));
    // console.log(userId?._id, "user local");
    setId(userId?._id);
  }, []);
  //   console.log(id, "user id which i update password");
  return (
    <main className="">
      <h1 className="font-semibold sm:text-[3vw] lg:text-[1.5vw]">Create new Password</h1>
      <div className="mt-5">
        <form onSubmit={handleSubmit(onSubmit)} className="mt-[1.5vw]">
          {createPasswordForm?.map((field, index) => (
            <div key={index} className="mb-5">
              <label
                htmlFor={field.name}
                className="block font-medium text-[#1B1B1B] sm:text-[2.5vw] text-[4vw] lg:text-[0.8vw]"
              >
                {field.label}
              </label>
              <Controller
                name={field.name}
                control={control}
                defaultValue=""
                rules={{
                  ...field.rules,
                  validate: (value) =>
                    field.name === "confirmPassword"
                      ? value === newPassword || "Passwords do not match"
                      : true,
                }}
                render={({ field: controllerField }) => (
                  <input
                    id={controllerField.name}
                    type={field.type}
                    required
                    {...controllerField}
                    className={`mt-1 block w-full rounded-sm sm:text-[2.5vw] px-4 py-3  outline-none shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm placeholder:text-[0.8vw] placeholder:text-[#A3A3A3] bg-[#FAFAFA] ${
                      errors[controllerField.name] ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                )}
              />
              {errors[field.name] && (
                <p className="text-red-500 sm:text-[2vw] lg:text-[0.8vw]">
                  {errors[field.name].message}
                </p>
              )}
              {field.name === "oldPassword" && (
                <div className="border border-[#EEEEEE] my-8 w-full h-[1px]"></div>
              )}
            </div>
          ))}
          <Button
            type="submit"
            size="large"
            className="w-full mt-4 text-sm px-4 py-2 bg-[#FF387A] hover:bg-[#FF387A] text-white capitalize"
          >
            {isLoading ? <Loading /> : "Save changes"}
          </Button>
        </form>
      </div>
    </main>
  );
};

export default CreatePasswordForm;
