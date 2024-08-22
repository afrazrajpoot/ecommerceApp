import Image from "next/image";
import React from "react";

const BundleCard = ({ price, regular_price, title, name, images, bgColor }) => {
	return (
		<div className="w-[320px] h-[300px] z-40 rounded-xl lg:rounded-t-[1vw] relative overflow-hidden mx-4">
			<div className="flex flex-col min-h-[200px] p-4 bg-[#0D52FF]">
				<div className="flex items-center justify-between mb-4 pr-4">
					<div className="flex items-center gap-1">
						<div className="relative h-8 w-8">
							<Image
								src={"/img/adobe_pr.png"}
								alt="logo"
								className="cursor-pointer"
								fill
							/>
						</div>
						<div className="relative h-8 w-8">
							<Image
								src={"/img/adobe_ae.png"}
								alt="logo"
								className="cursor-pointer"
								fill
							/>
						</div>
					</div>
					<p className="flex items-center gap-1">
						<span className="text-white font-semibold text-[4.3vw] sm:text-[2.3vw] lg:text-[1.5vw]">
							${regular_price}
						</span>
						{regular_price !== price && (
							<strike className="text-white/80 ml-[0.6vw] font-semibold text-[4vw] sm:text-[2vw] lg:text-[1vw]">
								${price}
							</strike>
						)}
					</p>
				</div>
				<p className="text-white text-[4vw] sm:text-[2.3vw] lg:text-[1.4vw] font-semibold">
					{name}
				</p>
				<p className="text-white text-[3vw] sm:text-[2vw] lg:text-[1vw] font-light mt-2">
					{regular_price - price > 0
						? `Save $${regular_price - price} and get all Packs!`
						: "Get all Packs now!"}
				</p>
			</div>
			<div className="relative w-[120%] h-full mt-[-5%] ml-[-10%]">
				<Image src={images[0].src} fill className="object-cover object-top" />
			</div>
			<div className="flex justify-between p-4 absolute z-[99] bottom-0 left-0 w-full bg-gradient-to-t from-black/80 from-70% to-transparent items-center">
				<p className="text-white text-[3vw] sm:text-[2vw] lg:text-[1vw]">
					20,000+ Templates
				</p>

				<button className="relative overflow-hidden text-[#fff] hover:text-[#171717] border border-[#fff] font-semibold text-[3vw] sm:text-[1.5vw] lg:text-[0.8vw] px-6 py-3 rounded-md text-center group">
					<span className="absolute inset-0 bg-[#fff] transition-all duration-300 transform translate-x-[-100%] group-hover:translate-x-0"></span>
					<span className="relative z-10 transition-colors duration-300 group-hover:text-[#171717]">
						View Here
					</span>
				</button>
			</div>
		</div>
	);
};

export default BundleCard;
