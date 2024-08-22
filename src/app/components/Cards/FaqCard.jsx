import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa";

const FaqCard = ({ img, name, desc, icon, index, brandName, avatar }) => {
	return (
		<main
			className={`flex flex-col  gap-[1.4vw] lg:gap-[0vw]  sm:gap-[1vw]  ${
				index === 1 ? "border border-[#F5F5F5] rounded-2xl p-[0.6vw]" : ""
			} `}
		>
			<header className="">
				<figure>
					<img src={img} alt={name} className="" />
				</figure>
				<p className="lg:text-[0.8vw] text-[3vw] mt-[1vw] lg:mt-[1vw] font-medium sm:text-[1.5vw]">
					{desc}
				</p>
			</header>
			<figure className="border-[1px] border-[#F5F5F5] sm:mt-[1vw] p-[0.1vw] mt-[6vw] lg:mt-[1vw] rounded-full sm:w-[6vw] w-[10.5vw] lg:w-[3vw] flex items-center gap-1">
				<FaStar size={12} className="text-[#FF689A] mb-1" />
				<span className="lg:text-[0.8vw] text-[3vw] sm:text-[1.5vw] font-semibold">
					5.0
				</span>
			</figure>
			<figure className="flex gap-[1vw] mt-8">
				<figure>
					<Image
						src={avatar}
						height={50}
						width={50}
						className="object-cover rounded-full"
					/>
				</figure>
				<div>
					<p className="lg:text-[1vw] text-[3vw] sm:text-[1vw] font-semibold">
						{name}
					</p>
					<p className="lg:text-[0.8vw] text-[2.6vw] sm:text-[1vw] text-gray-600 mt-1">
						{brandName}
					</p>
				</div>
			</figure>
		</main>
	);
};

export default FaqCard;
