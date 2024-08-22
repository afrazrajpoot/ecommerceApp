"use client";
import React from "react";
import DoneIcon from "@mui/icons-material/Done";
import Done from "@mui/icons-material/Done";

const Pricing = ({ plan, price, desc, info, paymentMethod }) => {
	const splitDesc = desc.split(",");
	return (
		<main className="w-full h-[580px] max-w-[320px] ">
			<section
				className={`flex flex-col py-10 px-8  gap-[5vw] lg:gap-[1.5vw] ${
					plan === "MONTHLY" && "bg-white"
				} ${plan === "40 PACK BUNDLE" ? "bg-[#FF387A] text-white" : ""}  ${
					plan === "ANNUAL" && "bg-black"
				} rounded-xl shadow-lg `}
				style={{ width: "100%", height: "100%" }}
			>
				<h2
					className={`lg:text-[1.3vw] text-[4vw] font-medium ${
						plan === "MONTHLY" ? "text-[#FF387A]" : "text-white"
					}`}
				>
					{plan}
				</h2>
				<div className={`flex gap-[1vw] items-center`}>
					<h3
						className={`text-[48px] font-extrabold ${
							price === "25" ? "text-[#FF387A]" : "text-white"
						}`}
					>
						${price}
					</h3>
					<p
						className={`flex flex-col text-[16px] ${
							plan === "MONTHLY" ? "text-black" : "text-white"
						}`}
					>
						<span> {splitDesc[0]}</span>
						<span className={price === "25" ? "text-gray-500" : "text-white"}>
							{" "}
							{splitDesc[1]}
						</span>
					</p>
				</div>
				<button
					type="submit"
					onClick={paymentMethod}
					className={`relative overflow-hidden px-6 py-2 text-[2.5vw] lg:text-[1.3vw] font-medium rounded-md transition-all group ${
						plan === "MONTHLY"
						? "bg-black text-white"
						: "bg-white text-black"
					}`}
					>
					<span
						className={`absolute inset-0 transition-all duration-300 transform translate-x-[-100%] group-hover:translate-x-0 ${
						plan === "MONTHLY" ? "bg-[#FF387A]" : "bg-white"
						}`}
					></span>
					<span
						className={`relative z-10 transition-colors duration-300 ${
						plan === "MONTHLY" ? "group-hover:text-white" : "group-hover:text-[#FF387A]"
						}`}
					>
						Buy Now Here
					</span>
				</button>
				<div>
					{info &&
						info.map((infoItem, index) => (
							<div
								key={index}
								className="border-b-[#E5E7EB] border-t-[1px] py-4"
							>
								<p
									className={`flex items-center gap-2 text-[3vw] lg:text-[1vw] ${
										plan === "MONTHLY" ? "text-black" : "text-white"
									}`}
								>
									<span
										className={`${
											plan === "40 PACK BUNDLE"
												? "text-white"
												: "text-[#FF387A]"
										} `}
									>
										<Done />
									</span>
									<span>{infoItem}</span>
								</p>
							</div>
						))}
				</div>
			</section>
		</main>
	);
};

export default Pricing;
