import React, { useEffect, useState } from "react";
import {
	Button,
	FormControlLabel,
	Radio,
	IconButton,
	InputAdornment,
	Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { formData } from "@/data/data";
import { useSignupUserMutation } from "@/store/storeApi";
import { useGlobalContext } from "@/context/globalState";
import { Toaster, toast } from "sonner";
import Loading from "../../Common/Loading";

const RegisterForm = () => {
	const [register, { isLoading, isError, data, isSuccess }] =
		useSignupUserMutation();

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm();
	const { setSignupModel, setLoginModel } = useGlobalContext();
	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword(!showPassword);

	const onSubmit = async (formData) => {
		try {
			const response = await register(formData);
			if (response.error) {
				toast.error(response.error.data.message, {
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
		} catch (error) {
			console.error("Error occurred:", error);
		}
	};

	useEffect(() => {
		if (isSuccess) {
			localStorage.setItem("userId", JSON.stringify(data.user._id));
			toast.success("Signup successful!", {
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
			setSignupModel(false);
			setLoginModel(true);
		}
	}, [isSuccess]);
	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmit)}
				noValidate
				className="w-full flex flex-col gap-2 my-2"
			>
				{formData.map((field, index) => (
					<div key={index} className="mb-4 ">
						<label
							htmlFor={field.name}
							className="block text-sm font-medium text-gray-700"
						>
							{field.label}
						</label>
						<Controller
							name={field.name}
							control={control}
							defaultValue=""
							rules={field.rules}
							render={({ field: controllerField }) => (
								<div className="relative">
									<input
										id={field.name}
										type={
											field.type === "password"
												? showPassword
													? "text"
													: "password"
												: field.type
										}
										required
										{...controllerField}
										className={`mt-1 block w-full rounded-lg text-[2.5vw] md:text-[1.3vw] lg:text-[0.8vw] py-3 px-6  outline-none shadow-sm placeholder:text-[#A3A3A3] bg-[#FAFAFA] ${
											errors[controllerField.name]
												? "border-red-500"
												: "border-gray-300"
										}`}
										placeholder={
											(index === 0 && "e.g San Address") ||
											(index === 1 && "e.g sanandreas@gmail.com") ||
											(index === 2 && "Must be at least 8 character")
										}
									/>
									{field.type === "password" && (
										<InputAdornment
											position="end"
											className="absolute inset-y-0 right-0 flex items-center  pr-3 top-[3.6vw] md:top-[2.6vw] lg:top-[1.3vw]"
										>
											<IconButton
												aria-label="toggle password visibility"
												onClick={handleClickShowPassword}
												edge="end"
												size="small"
												style={{ padding: "0.3vw" }}
											>
												{showPassword ? <Visibility /> : <VisibilityOff />}
											</IconButton>
										</InputAdornment>
									)}
								</div>
							)}
						/>
					</div>
				))}
				<FormControlLabel
					value="female"
					control={<Radio size="small" />}
					label={
						<Typography sx={{ fontSize: 14 }}>
							Opt out of emails about latest product updates
						</Typography>
					}
				/>
				<Button
					type="submit"
					size="large"
					className="w-full mt-4 text-sm bg-[#FF387A] hover:bg-[#FF387A] text-white capitalize px-6 py-3 rounded-md font-medium"
					disabled={isLoading}
				>
					{isLoading ? <Loading /> : "Sign Up"}
				</Button>
			</form>
		</>
	);
};

export default RegisterForm;
