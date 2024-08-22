import Image from "next/image";
import React from "react";

const Pack = ({ discountedPrice, actualPrice, image, title }) => {
	return (
		<main className="relative w-full sm:max-w-[40vw] cursor-pointer lg:max-w-[25vw]">
			<figure className="w-full sm:h-[30vw] lg:h-[25vw] hover:scale-110 transition-all">
				<img
					src={image}
					alt={title}
					className="w-full h-full rounded-md ml-[-19%]"
				/>
			</figure>
			<p className="text-[3.9vw] sm:text-[2vw] lg:text-[1vw] mt-5 font-semibold pr-[30%] hover:text-[#FF689A] transition-all">
				{title}
			</p>
			<div className="flex items-center mt-[1vw] justify-between pr-[30%]">
				<p className="flex items-center gap-1">
					<span className="text-[#FF689A] text-[4.2vw] font-semibold sm:text-[2.5vw] lg:text-[1.2vw]">
						${discountedPrice ? discountedPrice : actualPrice}
					</span>
					<strike className="text-[#171717] ml-[0.6vw] text-[3.5vw] sm:text-[1.5vw] lg:text-[0.8vw] font-medium">
						${actualPrice}
					</strike>
				</p>
				<Image
					src={"/img/people.png"}
					alt="people"
					height={72}
					width={72}
					className="cursor-pointer"
				/>
			</div>
		</main>
	);
};

export default Pack;
