import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";

const SubscriptionPass = ({ btnBg }) => {
	return (
		<main
			style={{ backgroundImage: "url('/img/image_bg.png')" }}
			className="w-full overflow-hidden bg-[#FF387A]  py-1 pl-2 lg:pl-6 rounded-[2vw] lg:rounded-[0.6vw] shadow-lg flex flex-col lg:flex-row lg:items-center justify-between"
		>
			<section className="p-5">
				<aside className="flex items-center gap-4">
					<Image
						src={"/img/adobe_pr.png"}
						height={50}
						alt="logo"
						width={50}
						className="cursor-pointer"
					/>
					<Image
						src={"/img/adobe_ae.png"}
						height={50}
						alt="logo"
						width={50}
						className="cursor-pointer"
					/>
				</aside>
				<h1 className="flex flex-col text-[5.5vw] md:text-[2.5vw] mt-[5vw] md:mt-[1vw] text-[#fff] font-bold mb-8">
					<span>Motionduck All Access</span>{" "}
					<span className="leading-8"> Pass Subscription</span>
				</h1>
				<p className="text-[4vw] w-full sm:max-w-[40vw] sm:text-[2vw] lg:text-[1vw] text-[#fff] mt-[5vw] md:mt-[1vw]">
					Unlimited Packs Get Every Pack We Have + Every Future Pack!
				</p>
				<Link href={"/subscription"}>
				<button
					className={`relative group bg-[${
						btnBg ? btnBg : "#171717"
					}] mt-5 border-[1px] border-[${
						btnBg ? btnBg : "#171717"
					}] text-[4vw] sm:text-[2vw] lg:text-[1vw] hover:shadow-md hover:bg-[#111111] text-[#fff] px-4 pr-6 py-3 max-w-[200px] rounded-md w-full text-center transition-all duration-300`}
					>
					Get Access
					<span className="absolute top-[15%] right-5 w-[30px] h-[25px] overflow-hidden">
						<IoIosArrowRoundForward
						className="transform translate-x-[-20px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300"
						size={35}
						/>
					</span>
				</button>
				</Link>
			</section>
			<section className="mb-[-10%] mt-[8vw] lg:my-0 lg:ml-0 ml-[-15%] w-[120%] lg:w-full h-full lg:max-w-[25vw]">
				<img
					src={"/img/items.png"}
					alt="motionDuck"
					className="w-full rounded-b-[2vw]  h-full rounded-t-[0.6vw] md:rounded-none object-cover object-bottom md:object-fill"
				/>
			</section>
		</main>
	);
};

export default SubscriptionPass;
