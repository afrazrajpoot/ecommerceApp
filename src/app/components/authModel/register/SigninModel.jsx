"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Image from "next/image";
import SigninForm from "./SigninForm";
import { useGlobalContext } from "@/context/globalState";
import { signIn, signOut } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

export default function SigninModel() {
	const { setLoginModel, openLoginModel } = useGlobalContext();
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setLoginModel(false);
	};

	return (
		<div className="w-full relative">
			<Modal
				open={openLoginModel}
				// onClose={closeLoginModel}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<div className="relative flex justify-center items-center h-screen">
					<div className="relative bg-white md:-mt-10 rounded-[0.5vw] px-8 pb-8 pt-8 md:pt-4 w-full md:h-fit h-full md:w-[450px] shadow-lg flex flex-col">
						<div className="relative w-[300px] md:w-[250px] h-[80px] my-2 mx-auto">
							<Image
								src="/img/11.png"
								alt="logo"
								fill
								className="object-contain ml-[-15%]"
							/>
						</div>
						<h1 className="font-bold text-xl md:text-base text-center mb-1 md:mb-2">
							Great to have you back!
						</h1>
						<p className="text-center text-sm md:text-xs">
							Great to have you back!{" "}
							<span className="text-[#FF387A]">Log in</span>
						</p>
						<SigninForm />
						<div className="flex items-center w-full gap-[0.3vw] my-1 md:my-2">
							<div className="border flex-grow mt-[3vw] md:mt-[1.25vw] lg:mt-[0vw]"></div>
							<div className="px-[0.5vw] py-[0.3vw] text-sm md:text-xs mt-[3vw] md:mt-[1.25vw] lg:mt-[0vw] text-[#737373]">
								Or Sign In with
							</div>
							<div className="border flex-grow mt-[3vw] md:mt-[1.25vw] lg:mt-[0vw]"></div>
						</div>
						<div className="flex w-full gap-5 lg:mt-[0vw] md:mt-[2vw] mt-[5vw] justify-center items-center">
							<Button
								onClick={() =>
									signIn("google", {
										prompt: "consent",
									})
								}
								variant="outlined"
								className="flex items-center justify-between px-4 py-2 text-center w-full border-[1px] border-[#E5E5E5]"
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
								onClick={() => signOut("google")}
								variant="outlined"
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
						<Button className="absolute top-[1%] md:top-auto md:bottom-[-10%] right-2 md:right-0 md:left-0">
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
