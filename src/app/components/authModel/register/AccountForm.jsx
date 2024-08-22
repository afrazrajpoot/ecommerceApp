"use client";

import { useGlobalContext } from "@/context/globalState";
import { accountForm2, accoutForm } from "@/data/data";
import { Avatar, Button } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  useDeleteImageMutation,
  useUpdateCustomerIDMutation,
  useUploadImageMutation,
} from "@/store/storeApi";
import Loading from "../../Common/Loading";

const FormInput = ({ label, type, name, value, onChange }) => {
  return (
    <div>
      <label htmlFor={label} className="lg:text-[0.9vw] sm:text-[2.5vw] text-[4vw] text-[#1B1B1B]">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="bg-[#FAFAFA] p-[4vw] lg:p-[0.7vw] sm:text-[2vw] sm:p-[2vw] w-full focus:outline-none border-[1px] rounded-sm border-[#F5F5F5] lg:text-[0.9vw] text-[3.5vw] sm:w-[42vw] lg:w-[13vw]"
      />
    </div>
  );
};

const AccountForm = () => {
  const ref = useRef();
  const session = useSession();
  const [user, setUser] = useState({});
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [profileImage, setProfileImage] = useState(false);
  const navigate = useRouter();
  const [
    deleteImage,
    { isSuccess: successfullImageDelete, isError: deleteImageError, isLoading: isLoadingImage },
  ] = useDeleteImageMutation();
  const {
    CreateWooCommerceData,
    updateWooCommerceData,
    loggedUser,
    customerDetails,
    customerID,
    setCustomerID,
    setSidebarImage,
    setCustomerDetails,
  } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const [uploadTheImage, { isLoading, isSuccess, data }] = useUploadImageMutation();
  const [textValue, setTextValue] = useState(false);
  const [updateCustomerId] = useUpdateCustomerIDMutation();
  const [googleImage, setGoogleImage] = useState("");
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      username:
        loggedUser?.fullName || customerDetails?.username || session?.data?.user?.name || "",
      email: loggedUser?.email || customerDetails?.email || session.data?.user?.email || "",
      phone: customerDetails?.phone || "",
      address1: customerDetails?.address1 || "",
      city: customerDetails?.city || "",
      postcode: customerDetails?.postcode || "",
      country: customerDetails?.country || "",
      first_name: customerDetails?.first_name || "",
      last_name: customerDetails?.last_name || "",
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails({ ...customerDetails, [name]: value });
  };

  const onSubmit = async (data) => {
    const userFromLocal = JSON.parse(localStorage.getItem("user"));
    try {
      const requestData = {
        username: customerDetails?.username,
        first_name: customerDetails?.first_name || data?.first_name,
        last_name: customerDetails?.last_name || data?.last_name,
        email: customerDetails?.email,
        billing: {
          phone: customerDetails?.phone || data?.phone,
          address_1: customerDetails?.address1 || data?.address1,
          postcode: customerDetails?.postcode || data?.postcode,
          city: customerDetails?.city || data?.city,
          country: customerDetails?.country || data?.country,
        },
      };

      setLoading(true);

      const handleSuccess = (message) => {
        toast.success(message, {
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
        navigate.push("/dashboard");
        reset();
      };

      const handleError = (message) => {
        toast.error(message, {
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
      };

      if (customerID) {
        const idToUpdate = customerID || userFromLocal.user._id;
        try {
          await updateWooCommerceData(`wc/v3/customers`, idToUpdate, requestData);
          handleSuccess("Updated successfully");
        } catch (updateError) {
          handleError(`Update failed: ${updateError.message}`);
        }
      } else {
        try {
          const newUser = await CreateWooCommerceData("wc/v3/customers", {
            ...requestData,
            password: "12345678",
          });

          if (newUser.id) {
            await updateCustomerId({
              email: newUser?.email,
              customerId: newUser?.id,
              fullName: newUser?.username,
            });
            userFromLocal.username = newUser.username;
            userFromLocal.fullName = newUser.username;
            userFromLocal.email = newUser.email;
            userFromLocal.customerId = newUser.id;
            localStorage.setItem("user", JSON.stringify(userFromLocal));
            setCustomerID(newUser.id);
          }

          handleSuccess("Registered successfully");
        } catch (createError) {
          handleError(
            `An account is already registered with that username or display name. Please choose another.`
          );
        }
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(`An error occurred: ${error.message}`, {
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

  function uploadImage() {
    ref.current.click();
  }
  const uploadImageOnServer = async () => {
    setTextValue(false);
    try {
      const userFromLocal = JSON.parse(localStorage.getItem("user"));
      if (!file) {
        toast.error("Please select the image to upload", {
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
        return;
      }
      const formData = new FormData();
      formData.append("file", file);
      formData.append("id", userFromLocal._id);
      const uploadedImageUrl = await uploadTheImage(formData); // Ensure the upload function returns the URL
      const imageUrl = uploadedImageUrl.data.img;
      userFromLocal.img = imageUrl; // Directly assign the image URL to img
      localStorage.setItem("user", JSON.stringify(userFromLocal));
      setUser({ ...user, img: imageUrl });
    } catch (error) {
      // console.log(error.message, "error");/
      toast.error("Failed to upload image", {
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

  const handleImageChange = (e) => {
    setFile(e.target.files[0]);
    const imageUrl = URL.createObjectURL(e.target.files[0]);
    setUrl(imageUrl);
    setTextValue(true);
    setProfileImage(true);
  };
  function deletePhoto() {
    deleteImage({ id: user?._id });
  }
  useEffect(() => {
    const userFromLocal = JSON.parse(localStorage.getItem("user"));
    setUser(userFromLocal);
    setGoogleImage(session?.data?.user?.image);
  }, []);

  useEffect(() => {
    if (isSuccess) {
      const userFromLocal = JSON.parse(localStorage.getItem("user"));
      userFromLocal.img = data;
      localStorage.setItem("user", JSON.stringify(userFromLocal));
      setSidebarImage(true);
      toast.success("Image upload successfully", {
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
  }, [isSuccess]);

  useEffect(() => {
    if (successfullImageDelete) {
      toast.success("Image deleted successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      const userFromLocal = JSON.parse(localStorage.getItem("user"));
      userFromLocal.img.img = '';
      localStorage.setItem("user", JSON.stringify(userFromLocal));
      setProfileImage(false);
      setSidebarImage(false);
      setUrl("");
      setUser({ ...user, img: "" });
    }
    if (deleteImageError) {
      toast.error("Failed to delete image", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    window.addEventListener("load", () => {
      setProfileImage(false);
    });

    return () => {
      window.removeEventListener("load", () => {
        setProfileImage(false);
      });
    };
  }, [successfullImageDelete, deleteImageError]);

  return (
    <>
      <main className="mt-[3vw] lg:mt-[1vw]">
        <header className="flex items-start gap-[1vw] w-full">
          <input
            type="file"
            className="hidden"
            accept=".jpg, .jpeg, .png"
            onChange={handleImageChange}
            ref={ref}
          />
          <figure className="hover:cursor-pointer">
            <Avatar className="w-[5vw] h-[5vw]">
              {profileImage ? (
                <img
                  src={url || session?.user?.image || user?.img?.img}
                  alt="avatar"
                  className="w-full h-full"
                />
              ) : (
                <img
                  src={user?.img?.img || user?.img || url}
                  alt="avatar"
                  className="w-full h-full"
                />
              )}
            </Avatar>
          </figure>
          <div>
            <p className="lg:text-[1vw] text-[4vw] sm:text-[2.5vw] text-[#64748B] mb-2">
              We only support .JPG, .JPEG, or .PNG file.
            </p>
            <div className="mt-[1vw] flex gap-4">
              {textValue ? (
                <>
                  <Button
                    onClick={uploadImageOnServer}
                    className="bg-[#FF387A] capitalize text-white text-sm font-bold hover:bg-[#FF387A] py-1 px-4 rounded-lg"
                  >
                    {isLoading ? <Loading /> : <p>Save</p>}
                  </Button>
                </>
              ) : (
                <Button
                  onClick={uploadImage}
                  className="relative group hover:text-black bg-[#FF387A] capitalize text-white text-sm font-bold border-[1px] border-[#FF387A] hover:border-[#FF387A] py-1 px-4 rounded-lg"
                >
                  <span className="z-[10]">{isLoading ? <Loading /> : <p>upload photo</p>}</span>
                  <div className="absolute group-hover:w-full w-[0%] transition-all h-full rounded-lg left-0 top-0 z-[0]"></div>
                </Button>
              )}
              <Button
                onClick={deletePhoto}
                variant="outlined"
                className="relative group border-[1px] border-[#FF387A] hover:border-[#FF387A] hover:text-white capitalize text-sm py-1 px-4 font-bold rounded-lg text-[#FF387A]"
              >
                <span className="z-[10]">{isLoadingImage ? <Loading /> : <p>Delete photo</p>}</span>
                <div className="absolute bg-[#FF387A] group-hover:w-full w-[0%] transition-all h-full rounded-md left-0 top-0 z-[0]"></div>
              </Button>
            </div>
          </div>
        </header>
        <form onSubmit={handleSubmit(onSubmit)}>
          {accoutForm?.map((item, index) => (
            <div className="mt-10" key={index}>
              <div className="mb-4 sm:mb-6">
                <label
                  htmlFor={item.name}
                  className="lg:text-[0.9vw] sm:text-[2.5vw] text-[4vw] text-[#1B1B1B] font-medium"
                >
                  {item.label}
                </label>
                <div className="">
                  <Controller
                    name={item?.name}
                    control={control}
                    rules={item?.rules}
                    render={({ field }) => (
                      <input
                        {...field}
                        value={customerDetails?.[item?.name]}
                        onChange={(e) => {
                          handleInputChange(e);
                          field.onChange(e);
                        }}
                        type={item.type}
                        className="bg-[#FAFAFA] lg:p-[0.7vw] sm:text-[2vw] sm:p-[2vw] p-[4vw] w-full focus:outline-none border-[1px] rounded-sm border-[#F5F5F5] lg:text-[0.9vw] text-[3.5vw] font-medium"
                      />
                    )}
                  />
                  {errors[item?.name] && (
                    <p className="text-red-500">{errors[item?.name]?.message}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div className="flex gap-[2vw] mb-4">
            <section className="font-medium">
              <Controller
                control={control}
                name="first_name"
                render={({ field }) => (
                  <FormInput
                    {...field}
                    value={customerDetails?.first_name}
                    onChange={(e) => {
                      handleInputChange(e);
                      field.onChange(e);
                    }}
                    label="First Name"
                    type="text"
                  />
                )}
              />
              {errors?.first_name && <p className="text-red-500">{errors?.first_name?.message}</p>}
            </section>
            <section className="font-medium">
              <Controller
                control={control}
                name="last_name"
                render={({ field }) => (
                  <FormInput
                    {...field}
                    value={customerDetails?.last_name}
                    name="last_name"
                    onChange={(e) => {
                      handleInputChange(e);
                      field.onChange(e);
                    }}
                    label="Last Name"
                    type="text"
                  />
                )}
              />
              {errors?.last_name && <p className="text-red-500">{errors?.last_name?.message}</p>}
            </section>
          </div>
          {accountForm2?.map((item, index) => (
            <div className="font-medium" key={index}>
              <div className="mb-4 flex flex-col">
                <label
                  htmlFor={item?.name}
                  className="lg:text-[0.9vw] sm:text-[2.5vw] text-[4vw] text-[#1B1B1B]"
                >
                  {item?.label}
                </label>
                {item?.name === "phone" ? (
                  <>
                    <div className="">
                      <Controller
                        name={item.name}
                        control={control}
                        defaultValue={customerDetails?.[item?.name]}
                        render={({ field }) => (
                          <PhoneInput
                            {...field}
                            country={"us"}
                            inputProps={{
                              name: item.name,
                              id: item.name,
                            }}
                            value={customerDetails?.[item?.name]}
                            inputStyle={{
                              border: "none",
                              backgroundColor: "#FAFAFA",
                            }}
                            onChange={(phone) => {
                              handleInputChange({
                                target: { name: item.name, value: phone },
                              });
                              field.onChange(phone);
                            }}
                          />
                        )}
                      />
                    </div>
                  </>
                ) : (
                  <div className={""}>
                    <Controller
                      control={control}
                      rules={item?.rules}
                      name={item?.name}
                      render={({ field }) => (
                        <input
                          {...field}
                          value={customerDetails[item?.name]}
                          onChange={(e) => {
                            handleInputChange(e);
                            field.onChange(e);
                          }}
                          // name={item.name}
                          type={item.type}
                          className="bg-[#FAFAFA] lg:p-[0.7vw] sm:text-[2vw] sm:p-[2vw] p-[4vw] w-full focus:outline-none border-[1px] rounded-sm border-[#F5F5F5] lg:text-[0.9vw] text-[3.5vw]"
                        />
                      )}
                    />
                    {errors[item?.name] && (
                      <p className="text-red-500">{errors[item?.name]?.message}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
          <div className="flex gap-[2vw] mb-4">
            <section className="font-medium">
              <Controller
                control={control}
                name="postcode"
                render={({ field }) => (
                  <FormInput
                    {...field}
                    value={customerDetails?.postcode}
                    // name="postcode"
                    onChange={(e) => {
                      handleInputChange(e);
                      field.onChange(e);
                    }}
                    label="Postal code"
                    type="text"
                  />
                )}
              />
              {errors?.postcode && <p className="text-red-500">{errors?.postcode?.message}</p>}
            </section>
            <section className="font-medium">
              <Controller
                control={control}
                name="city"
                render={({ field }) => (
                  <FormInput
                    {...field}
                    value={customerDetails.city}
                    // name="city"
                    onChange={(e) => {
                      handleInputChange(e);
                      field.onChange(e);
                    }}
                    label="City"
                    type="text"
                  />
                )}
              />
              {errors?.city && <p className="text-red-500">{errors?.city?.message}</p>}
            </section>
          </div>
          <Button
            type="submit"
            size="small"
            variant="outlined"
            className="relative group capitalize text-sm text-[#FF387A] hover:text-white border-[1.5px] font-bold border-[#FF387A] hover:border-white py-2 px-6 rounded-md overflow-hidden"
          >
            <span className="z-[10] relative">
              {loading ? <Loading /> : customerID ? "Update" : "Create"}
            </span>
            <div className="absolute bg-[#FF387A] group-hover:w-full w-[0%] transition-all duration-300 ease-in-out h-full rounded-md left-0 top-0 z-[0]"></div>
          </Button>
        </form>
      </main>
    </>
  );
};

export default AccountForm;
