"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import Form from "../register/RegisterForm";
import Image from "next/image";
import SigninForm from "../register/SigninForm";
import ForgetForm from "./ForgetForm";
import { useGlobalContext } from "@/context/globalState";

export default function ForgetModel() {
	const { openForgetModel, setForgetModel } = useGlobalContext();
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setForgetModel(false);
	};

	return (
		<div className="w-full relative">
			{/* <Button onClick={handleOpen}>Forget password modal</Button> */}
			<Modal
				open={openForgetModel}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<div className="flex flex-col justify-center items-center h-screen">
					<div className="relative bg-white rounded-[0.5vw] px-8 py-10 w-full md:h-fit h-full md:w-[450px] xl:w-[500px] shadow-lg flex flex-col">
						<div className="flex w-full justify-center">
							<Image src="/img/Logo.png" alt="logo" width={180} height={180} />
						</div>
						<h1 className="font-bold lg:text-[1.2vw] sm:text-[2vw] text-center mt-5 mb-1">
							Forgot your password?
						</h1>
						<p className="text-center text-sm mb-5">
							We'll send you an email with a link to reset your password.
						</p>
						<ForgetForm />
						<Button className="absolute top-[2%] md:top-auto md:bottom-[-15%] right-5 md:right-0 md:left-0">
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
								<CloseIcon />
							</IconButton>
						</Button>
					</div>
				</div>
			</Modal>
		</div>
	);
}
