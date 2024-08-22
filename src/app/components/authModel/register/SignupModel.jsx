"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import Form from "./RegisterForm";
import Image from "next/image";
import { useGlobalContext } from "@/context/globalState";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

export default function SignupModel() {
	const [open, setOpen] = React.useState(false);
	const { openSignupModel, setSignupModel } = useGlobalContext();
	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setSignupModel(false);
	};

	return (
		<div className="w-full relative">
			{/* <Button onClick={handleOpen}>Signup modal</Button> */}
			<Modal
				open={openSignupModel}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<div className="flex flex-col justify-center items-center h-screen">
					<div className="relative bg-white md:-mt-10 rounded-[0.5vw] px-8 pb-8 pt-8 md:pt-4 w-full md:h-fit h-full md:w-[450px] shadow-lg flex flex-col">
						<div className="relative w-[300px] md:w-[250px] h-[80px] my-1 mx-auto">
							<Image
								src="/img/11.png"
								alt="logo"
								fill
								className="object-contain ml-[-15%]"
							/>
						</div>
						<h1 className="font-bold text-xl md:text-base text-center mb-1 md:mb-2">
							Great to see you here!
						</h1>
						<p className="text-center text-sm md:text-xs max-w-[240px] mx-auto">
							It’s free to create an account. Already have an account?{" "}
							<span className="text-[#FF387A]">Log in</span>
						</p>
						<Form />
						<div className="flex items-center w-full gap-[0.3vw] my-1 md:my-2">
							<div className="border flex-grow mt-[3vw] md:mt-[1.25vw] lg:mt-[0vw]"></div>
							<div className="px-[0.5vw] py-[0.3vw] text-sm md:text-xs mt-[3vw] md:mt-[1.25vw] lg:mt-[0vw] text-[#737373]">
								Or Sign Up with
							</div>
							<div className="border flex-grow mt-[3vw] md:mt-[1.25vw] lg:mt-[0vw]"></div>
						</div>
						<div className="flex w-full gap-5 lg:mt-[0vw] md:mt-[2vw] mt-[5vw] justify-center items-center">
							<Button
								onClick={() => signIn("google")}
								variant="outlined"
								className="flex items-center justify-between py-2 px-4 w-full border-[1px] border-[#E5E5E5]"
								style={{
									backgroundColor: "#FAFAFA",
									color: "#171717",
									fontSize: "0.8vw",
									fontWeight: "bold",
								}}
							>
								<FcGoogle size={25} />
								<p className="text-base md:text-sm capitalize w-full">Google</p>
							</Button>
							<Button
								variant="outlined"
								onClick={() => signIn("facebook")}
								className="flex items-center justify-between py-2 px-4 w-full border-[1px] border-[#E5E5E5]"
								style={{
									backgroundColor: "#FAFAFA",
									color: "#171717",
									fontSize: "0.8vw",
									fontWeight: "bold",
								}}
							>
								<FaFacebook size={20} className="text-[#3C5A9A]" />
								<p className="text-base  md:text-sm capitalize w-full">
									Facebook
								</p>
							</Button>
						</div>
						<Button className="absolute top-[1%] md:top-auto md:bottom-[-60px] right-2 md:right-0 md:left-0">
							<IconButton
								onClick={handleClose}
								style={{
									backgroundColor: "white",
									border: "1px solid #ccc",
									borderRadius: "50%",
									width: "40px",
									height: "40px",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<IoMdClose />
							</IconButton>
						</Button>
					</div>
				</div>
			</Modal>
		</div>
	);
}
