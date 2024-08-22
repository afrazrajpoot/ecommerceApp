import React from "react";
import { Button, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { forgetForm } from "@/data/data";
import { useForgotPasswordMutation } from "@/store/storeApi";
import { useGlobalContext } from "@/context/globalState";
import { toast } from "sonner";
import Loading from "../../Common/Loading";

const ForgetForm = () => {
	const { dataForResetPassword, setDataForResetPassword } = useGlobalContext();

	const [forgot, { isLoading, isError, isSuccess }] =
		useForgotPasswordMutation();
	const { setOtpModel, setForgetModel } = useGlobalContext();
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		// Handle form submission
		forgot(data); // Assuming this triggers the mutation
		setDataForResetPassword({ ...dataForResetPassword, email: data.email });
	};

	// Handle success state
	React.useEffect(() => {
		if (isSuccess) {
			setOtpModel(true); // Show OTP model upon successful submission
			setForgetModel(false); // Close forget model
		}
		if (isError) {
			toast.error("something wrong please try again", {
				position: "top-right",
				style: { marginTop: 40 },
			});
		}
	}, [isSuccess, setOtpModel, setForgetModel]);

	return (
		<form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full">
			{forgetForm.map((field, index) => (
				<div key={index} className="mb-4">
					<label
						htmlFor={field.name}
						className="block text-sm font-medium text-gray-700 text-[2vw] lg:text-[0.8vw]"
					>
						{field.label}
					</label>
					<Controller
						name={field.name}
						control={control}
						defaultValue=""
						rules={field.rules}
						render={({ field }) => (
							<input
								id={field.name}
								type={field.type}
								required
								{...field}
								className={`mt-1 block w-full rounded-md sm:p-[2vw] sm:text-[2vw] outline-none shadow-sm focus:border-indigo-500 focus:ring-indigo-500 lg:text-[0.8vw] p-[2vw] text-[4vw] lg:placeholder:text-[0.8vw] placeholder:text-[3vw] sm:placeholder:text-[2vw] placeholder:text-[#A3A3A3] bg-[#FAFAFA] lg:p-[0.5vw] ${
									errors[field.name] ? "border-red-500" : "border-gray-300"
								}`}
								placeholder={"Must be at least 8 character"}
							/>
						)}
					/>
				</div>
			))}

			<Button
				type="submit"
				size="large"
				className="w-full mt-4 text-[2vw] md:text-[1.5vw] lg:text-[0.8vw] bg-[#FF387A] hover:bg-[#FF387A] text-white capitalize"
				disabled={isLoading}
			>
				{isLoading ? <Loading /> : "Send me a reset link"}
			</Button>
		</form>
	);
};

export default ForgetForm;
