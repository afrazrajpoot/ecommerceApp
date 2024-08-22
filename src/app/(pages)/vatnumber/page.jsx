"use client";
import { Button } from "@mui/material";
import Sidebar from "../../components/Common/Sidebar/Sidebar";
import { useState } from "react";
import { useUpdateVatNumberMutation } from "@/store/storeApi";
import { toast } from "sonner";
import { useGlobalContext } from "@/context/globalState";
import Loading from "@/app/components/Common/Loading";
import { useForm } from "react-hook-form";

const Page = () => {
	const { customerDetails } = useGlobalContext();
	const [vatNumber, setVatNumber] = useState(customerDetails.vatNumber || "");

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			vatNumber: customerDetails.vatNumber || "",
			email: customerDetails.email,
		},
	});

	const [updateVatNumber, { isLoading }] = useUpdateVatNumberMutation();

	const handleChange = (e) => {
		setVatNumber(e.target.value);
	};

	const onSubmit = async (data) => {
		try {
			if (vatNumber && customerDetails.email) {
				await updateVatNumber({
					vatNumber: vatNumber,
					email: customerDetails.email,
				});
				const userFromLocal = JSON.parse(localStorage.getItem("user"));
				userFromLocal.vatNumber = vatNumber;
				localStorage.setItem("user", JSON.stringify(userFromLocal));
				toast.success("VAT number updated successfully", {
					position: "top-right",
					closeButton: true,
					progressBar: true,
					style: { marginTop: 40 },
				});
			}
		} catch (error) {
			toast.error("Something went wrong", {
				position: "top-right",
				closeButton: true,
				progressBar: true,
				style: { marginTop: 40 },
			});
		}
	};

	return (
		<main className="bg-[#FAFAFA] ">
			<Sidebar />
			<div className="w-full lg:max-w-[29vw] max-w-[70vw] m-auto lg:ml-[30vw] lg:translate-y-[6vw] translate-y-[25vw] sm:translate-y-[10vw]">
				<h1 className="font-bold lg:text-[1.5vw] text-[4vw] sm:text-[3vw]">
					VAT Number
				</h1>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="bg-white border-[1px] border-[#F5F5F5] rounded-lg p-[1vw] lg:mt-[1vw] mt-[3vw]"
				>
					<p className="lg:text-[1vw] lg:mt-[0vw] mt-[3vw] text-[4vw] sm:text-[2.5vw]">
						VAT Number
					</p>
					<input
						type="text"
						{...register("vatNumber", {
							required: true,
							minLength: 8,
							maxLength: 12,
						})}
						value={vatNumber}
						onChange={handleChange}
						className="bg-[#FAFAFA] p-[0.7vw] w-full focus:outline-none border-[1px] rounded-sm border-[#F5F5F5]"
					/>
					{errors.vatNumber && (
						<p className="text-red-500 text-[4vw] md:text-[1vw]">
							VAT number is required and must be 9 characters long
						</p>
					)}
					<Button
						type="submit"
						size="large"
						className="w-full mt-4 text-sm bg-[#FF387A] hover:bg-[#FF387A] text-white capitalize"
					>
						{isLoading ? <Loading /> : "Save Changes"}
					</Button>
				</form>
			</div>
		</main>
	);
};

export default Page;
