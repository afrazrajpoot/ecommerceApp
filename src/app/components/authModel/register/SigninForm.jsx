"use client";
import React, { useEffect, useState } from "react";
import {
	Button,
	FormControlLabel,
	Radio,
	IconButton,
	InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { loginFormData } from "@/data/data";
import { useGlobalContext } from "@/context/globalState";
import { useLoginUserMutation } from "@/store/storeApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Loading from "../../Common/Loading";

const SigninForm = () => {
	const navigate = useRouter();
	const {
		tokenInLocal,
		setLoginModel,
		setForgetModel,
		customerID,
		setLogedUsername,
		setCustomerDetails,
	} = useGlobalContext();
	const [showPassword, setShowPassword] = useState(false);
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm();
	const [login, { isLoading, isError, isSuccess, data }] =
		useLoginUserMutation();

	const handleClickShowPassword = () => setShowPassword(!showPassword);

	const onSubmit = async (formData) => {
		try {
			const res = await login(formData);
			setLogedUsername(res.data.user.fullName);
			localStorage.setItem("user", JSON.stringify(res.data.user));
			setCustomerDetails(res.data.user);
		} catch (error) {
			toast.error("Failed to login", {
				position: "top-right",
				style: { marginTop: 40 },
			});
		}
	};
	useEffect(() => {
		if (isError) {
			setLoginModel(true);
			toast.error("Please enter correct details", {
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
		if (isSuccess) {
			setLoginModel(false);

			toast.success("Login Successful", {
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
			tokenInLocal(data);

			if (customerID) {
				navigate.push("/");
			} else {
				window.location.href = "/accountdetails";
			}
		}
	}, [isError, isSuccess]);

	return (
		<form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full mt-5">
			{loginFormData.map((field, index) => (
				<div key={index} className="mb-4">
					<label
						htmlFor={field.name}
						className="block text-sm font-medium text-gray-700 text-[0.8vw]"
					>
						{field.label}
					</label>
					<div className="relative">
						<Controller
							name={field.name}
							control={control}
							defaultValue=""
							rules={{
								required: `${field.label} is required`,
								pattern:
									field.type === "email"
										? { value: /\S+@\S+\.\S+/, message: "Email is not valid" }
										: {},
								minLength:
									field.type === "password"
										? {
												value: 8,
												message: "Password must be at least 8 characters",
										  }
										: {},
							}}
							render={({ field: controllerField }) => (
								<input
									{...controllerField}
									id={field.name}
									type={
										field.type === "password"
											? showPassword
												? "text"
												: "password"
											: field.type
									}
									className={`mt-1 block w-full rounded-lg text-[3vw] lg:text-[0.8vw] px-6 py-3 outline-none shadow-sm  lg:placeholder:text-[0.8vw] placeholder:text-[#A3A3A3] bg-[#FAFAFA] border-gray-300 ${
										errors[field.name] ? "border-red-500" : ""
									}`}
									placeholder={
										(index === 0 && "e.g sanandreas@gmail.com") ||
										(index === 1 && "Must be at least 8 characters")
									}
								/>
							)}
						/>
						{errors[field.name] && (
							<p className="text-red-500 text-[0.7vw]">
								{errors[field.name].message}
							</p>
						)}
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
									{showPassword ? <VisibilityOff /> : <VisibilityOff />}
								</IconButton>
							</InputAdornment>
						)}
					</div>
				</div>
			))}
			<p
				onClick={() => {
					setForgetModel(true);
					setLoginModel(false);
				}}
				className="hover:cursor-pointer text-xs text-[#FF387A] font-bold w-full text-right"
			>
				Forgot password?
			</p>
			<Button
				type="submit"
				size="large"
				className="w-full mt-4 text-sm bg-[#FF387A] hover:bg-[#FF387A] text-white capitalize px-6 py-3 rounded-md font-medium"
				disabled={isLoading}
			>
				{isLoading ? <Loading /> : "sign in"}
			</Button>
		</form>
	);
};

export default SigninForm;
