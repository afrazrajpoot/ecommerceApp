"use client";
import { useGlobalContext } from "@/context/globalState";
import { Button } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";

const Otp = ({ length = 5 }) => {
	const { otpReset, setOtpReset, setOtpModel, setResetModel } =
		useGlobalContext();
	const initialOtp = new Array(length).fill("");
	const [otp, setOtp] = useState(initialOtp);
	const [focusedIndex, setFocusedIndex] = useState(0);
	const inputRefs = useRef([]);

	useEffect(() => {
		inputRefs.current[0]?.focus(); // Focus on the first input field when the component mounts
	}, []);

	const handleChange = (index, value) => {
		if (!isNaN(value) && value !== "") {
			const otpCopy = [...otp];
			otpCopy[index] = value;
			setOtp(otpCopy);

			if (index < length - 1 && value !== "") {
				inputRefs.current[index + 1]?.focus();
			}
		}
	};

	const handleKeyDown = (index, event) => {
		if (event.key === "Backspace" && index > 0 && otp[index] === "") {
			setOtp((prevOtp) => {
				const otpCopy = [...prevOtp];
				otpCopy[index - 1] = "";
				return otpCopy;
			});
			inputRefs.current[index - 1].focus();
		} else if (event.key === "Backspace" && index >= 0) {
			setOtp((prevOtp) => {
				const otpCopy = [...prevOtp];
				otpCopy[index] = "";
				return otpCopy;
			});
			if (index > 0) {
				inputRefs.current[index - 1].focus();
			}
		}
	};

	const handlePaste = (event) => {
		event.preventDefault();
		const paste = event.clipboardData.getData("text");
		const digits = paste.match(/\d/g); // Extract only digits from paste

		if (digits && digits.length === length) {
			const otpCopy = [...initialOtp];
			digits.forEach((digit, index) => {
				otpCopy[index] = digit;
			});
			setOtp(otpCopy);
		}
	};

	const handleFocus = (index) => {
		setFocusedIndex(index);
	};

	const handleNext = () => {
		// Combine the OTP digits into a string
		const otpValue = otp.join("");
		setOtpReset(otpValue); // Set the otpReset state
		setOtpModel(false);
		setResetModel(true);
	};

	useEffect(() => {
		console.log(otpReset, "myotp"); // This will log the updated OTP state
	}, [otpReset]); // Log otpReset whenever it changes

	return (
		<>
			<div className="flex justify-center items-center space-x-4">
				{otp.map((digit, index) => (
					<div key={index} className="relative">
						<input
							ref={(el) => (inputRefs.current[index] = el)}
							type="text"
							inputMode="numeric"
							pattern="[0-9]*"
							maxLength={1}
							className={`w-9 h-9 text-center bg-[#FAFAFA] rounded-full focus:outline-none ${
								focusedIndex === index ? "" : "bg-[#FAFAFA]"
							}`}
							value={digit}
							onChange={(e) => handleChange(index, e.target.value)}
							onKeyDown={(e) => handleKeyDown(index, e)}
							onPaste={handlePaste}
							onFocus={() => handleFocus(index)}
						/>
						{digit === "" && focusedIndex !== index && (
							<div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-black rounded-full"></div>
						)}
					</div>
				))}
			</div>
			<Button
				size="large"
				className="w-full mt-4 text-[2vw] md:text-[1.5vw] lg:text-[0.8vw] bg-[#FF387A] hover:bg-[#FF387A] text-white capitalize"
				onClick={handleNext}
			>
				Next
			</Button>
			<Button
				size="large"
				variant="outlined"
				sx={{
					color: "#FF387A",
					border: "none",
					"&:hover": { border: "none" },
				}}
				className="w-full text-[2vw] md:text-[1.5vw] lg:text-[0.8vw] mt-[1vw] capitalize"
			>
				Resend
			</Button>
		</>
	);
};

export default Otp;
