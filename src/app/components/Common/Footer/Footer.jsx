import { footerLists, socialMediaLinks } from "@/data/data";
import { TextField } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";

const Footer = () => {
	return (
		<footer className="w-full px-8 py-12 bg-[#171717]">
			<main className="w-full md:max-w-[90vw] lg:max-w-[80vw] mx-auto mt-[2vw] flex flex-col md:flex-row items-start">
				<section className="w-[80%]">
					<Link href={"/"}>
						<Image src={"/img/12.png"} alt="logo" width={400} height={40} />
					</Link>
					<p className="text-white font-light mt-[3.5vw] md:mt-[1.5vw] text-[4vw] md:text-[1.5vw] lg:text-[1vw] w-full md:max-w-[40vw] lg:max-w-[30vw]">
						Market design is the process of designing markets to achieve
						specific goals.
					</p>
				</section>
				<section className="w-full md:max-w-[20vw] mt-[6vw] md:mt-0 md:ml-[10vw]">
					<main className="grid grid-cols-1 md:grid-cols-2 gap-[5vw] md:gap-[1vw]">
						{footerLists?.map((list, index) => (
							<section key={index}>
								<h1 className="text-[#A3A3A3] text-[4vw] md:text-[2vw] lg:text-[1vw]">
									{list?.title}
								</h1>
								<div className="text-[#ffff] text-[3.9vw] md:text-[1.5vw] lg:text-[0.9vw] mt-[3vw] md:mt-[1vw]">
									{list?.list?.map((item, index) => (
										<Link
											className="block my-5 hover:text-[#FF387A]"
											href={item?.path}
											key={index}
										>
											{item?.title}
										</Link>
									))}
								</div>
							</section>
						))}
					</main>
				</section>
				<section className="w-full mt-[4vw] md:mt-[0vw] md:max-w-[40vw]">
					<h1 className="text-[#ffff] text-[4vw] md:text-[2vw] lg:text-[1vw]">
						Newsletter
					</h1>
					<section className="flex w-full flex-col md:flex-row items-center mt-[3vw] md:mt-[1vw]">
						<TextField
							fullWidth
							id="outlined-basic"
							placeholder="Enter Your Email Address"
							InputProps={{
								className:
									"text-gray-800 bg-[#F6F6F6] focus:outline-none focus:shadow-md p-[0.3vw] focus:outline-none rounded-md",
								style: { padding: "0.3vw" },
							}}
							sx={{
								"& input": {
									padding: "0.3vw",
									width: "21vw",
									fontSize: "1vw",
									outline: "none !important",
									boxShadow: "none !important",
									"@media (max-width: 1020px)": {
										padding: "1vw",
										width: "77vw",
										fontSize: "2vw",
									},
									"@media (max-width: 768px)": {
										padding: "2vw",
										width: "85vw",
										fontSize: "3vw",
									},
									"@media (max-width: 630px)": {
										padding: "2.5vw",
										width: "100%",
										fontSize: "4vw",
									},
								},
							}}
						/>
						<button className="relative gap-2 bg-[#FF689A] group text-[4vw] mt-[3vw] md:mt-0 md:text-[2vw] lg:text-[1vw] ml-[1vw] text-[#fff] pl-4 pr-6 py-2 rounded-md w-full md:max-w-[10vw] lg:max-w-[7vw] text-center transition-all duration-300 hover:shadow-md hover:bg-[#ff387af1]">
							Submit
							<span className="absolute top-[12%] right-1 w-[30px] h-[25px] overflow-hidden">
								<IoIosArrowRoundForward
									className="transform translate-x-[-20px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300"
									size={30}
								/>
							</span>
						</button>
					</section>
				</section>
			</main>
			<article className="w-full md:max-w-[90vw] lg:max-w-[80vw] mx-auto mt-10 mb-5 flex flex-col gap-6 md:flex-row md:items-center">
				<p className="text-[#FFFFFF] text-[16px] w-full  font-light">
					© 2024 SonduckFilm, LLC | All Rights Reserved
				</p>
				<section className="flex items-center gap-3 w-full">
					{socialMediaLinks?.map((item, index) => (
						<Link
							className="relative border p-2 rounded-full text-white hover:text-[#171717] border-white hover:bg-white"
							href={item?.path}
							key={index}
						>
							<item.img size={15} />
						</Link>
					))}
				</section>
				<p className="flex items-center gap-8 text-[#fff] text-[3.9vw] md:text-[1.5vw] lg:text-[0.9vw] font-semibold whitespace-nowrap">
					<Link href={"/termsandconditions"}>
						<span className="hover:text-[#FF387A]">Terms of Service</span>
					</Link>
					<Link href={"/privacypolicy"}>
						<span className="hover:text-[#FF387A]">Privacy Policy</span>
					</Link>
				</p>
			</article>
		</footer>
	);
};

export default Footer;
