"use client";

import { billingAddressFrom } from "@/data/data";
import { Button } from "@mui/material";
import { toast } from "sonner";
import { useGlobalContext } from "@/context/globalState";
import { Controller, useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const BillingForm = () => {
	const {
		CreateWooCommerceData,
		updateWooCommerceData,
		customerDetails,
		setCustomerDetails,
		customerID,
		loggedUser,
		setCustomerID,
	} = useGlobalContext();

	const {
		handleSubmit,
		control,
		formState: { errors },
		reset,
		trigger,
	} = useForm({
		defaultValues: {
			username: customerDetails?.username || loggedUser?.fullName || "",
			email: customerDetails?.email || loggedUser?.email || "",
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
		trigger(name);
	};

	const onSubmit = async (data) => {
		try {
			const requestData = {
				username: customerDetails?.username || data?.username,
				first_name: customerDetails?.first_name || data?.first_name,
				last_name: customerDetails?.last_name || data?.last_name,
				email: customerDetails?.email || data?.email,
				billing: {
					phone: customerDetails?.phone || data?.phone,
					address_1: customerDetails?.address1 || data?.address1,
					postcode: customerDetails?.postcode || data?.postcode,
					city: customerDetails?.city || data?.city,
					country: customerDetails?.country || data?.country,
				},
			};

			if (customerID) {
				await updateWooCommerceData(`wc/v3/customers`, customerID, requestData);
				toast.success("account updated successfully", {
					position: "top-right",
					style: { marginTop: 40 },
				});
			} else {
				const user = await CreateWooCommerceData("wc/v3/customers", {
					...requestData,
					password: "12345678",
				});
				const userFromLocal = localStorage.getItem("user");
				userFromLocal.customerId = user?.id;
				localStorage.setItem("user", JSON.stringify(userFromLocal));
				setCustomerID(user?.id);
				toast.success("account updated successfully", {
					position: "top-right",
					style: { marginTop: 40 },
				});
			}
			reset();
		} catch (error) {
			toast.error(error.message, { style: { marginTop: 40 } });
		}
	};

	return (
		<main className="">
			<form onSubmit={handleSubmit(onSubmit)}>
				{billingAddressFrom?.map((item, index) => (
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
									<div>
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
														width: "100%",
														padding: "22px 0px 22px 50px",
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
										<p className="text-red-500">
											{errors[item?.name]?.message}
										</p>
									)}
								</div>
							)}
						</div>
					</div>
				))}
				<div className="flex gap-[4vw] lg:gap-[2vw] ">
					<div className="flex flex-col">
						<label
							htmlFor=""
							className="font-bold text-[4vw] sm:text-[2.5vw] lg:text-[0.9vw]"
						>
							City
						</label>
						<Controller
							name={"city"}
							control={control}
							render={({ field }) => (
								<input
									{...field}
									type="text"
									onChange={(e) => handleInputChange(e)}
									value={customerDetails?.city}
									className="bg-[#FAFAFA] p-[3vw] lg:p-[0.7vw] sm:text-[2vw] sm:p-[2vw] w-full focus:outline-none border-[1px] rounded-sm border-[#F5F5F5] lg:text-[0.9vw] text-[3.5vw] lg:w-[22vw] sm:w-[41vw]"
								/>
							)}
						/>
					</div>
					<div className="flex flex-col mb-6">
						<label
							htmlFor=""
							className="font-bold text-[4vw] sm:text-[2.5vw] lg:text-[0.9vw]"
						>
							Postal code
						</label>
						<Controller
							name={"postcode"}
							control={control}
							render={({ field }) => (
								<input
									{...field}
									type="text"
									onChange={(e) => handleInputChange(e)}
									value={customerDetails?.postcode}
									className="bg-[#FAFAFA] p-[3vw] lg:p-[0.7vw] sm:text-[2vw] sm:p-[2vw] w-full focus:outline-none border-[1px] rounded-sm border-[#F5F5F5] lg:text-[0.9vw] text-[3.5vw] lg:w-[22vw] sm:w-[41vw]"
								/>
							)}
						/>
					</div>
				</div>
				<Button
					type="submit"
					size="small"
					variant="outlined"
					className=" lg:text-[0.7vw] text-[4vw] sm:text-[1.5vw] text-[#FF387A] border-[1.5px] font-bold border-[#FF387A] hover:border-[#FF387A] py-[0.6vw] px-[1vw] "
					style={{ textTransform: "capitalize" }}
				>
					Edit
				</Button>
			</form>
		</main>
	);
};

export default BillingForm;
