"use client";

import React, { useEffect } from "react";
import BundleCard from "../../Cards/BundleCard";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt"; // Make sure to import your icon
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useGlobalContext } from "@/context/globalState";
import Link from "next/link";

const Bundles = () => {
	const [bundleData, setBundleData] = React.useState([]);
	const { fetchWooCommerceData } = useGlobalContext();
	const fetchProducts = async () => {
		try {
			const resp = await fetchWooCommerceData("wc/v3/products?category=261");
			setBundleData(resp.data);
		} catch (error) {
			console.warn(error);
		}
	};
	const CustomPrevArrow = ({ style, onClick }) => (
		<span
			style={{ ...style }}
			onClick={onClick}
			className={`text-vw text-black absolute cursor-pointer z-50 top-[105%] left-0`}
		>
			<ArrowRightAltIcon className="text-[12vw] md:text-[5.5vw] lg:text-[3.5vw] p-[3vw] md:p-[1vw] cursor-pointer hover:bg-[#171717] hover:text-white hover:rounded-full hover:text-center rotate-180" />
		</span>
	);
	const CustomNextArrow = ({ style, onClick }) => (
		<span
			style={{ ...style }}
			onClick={onClick}
			className={`text-vw text-black absolute cursor-pointer z-[50] top-[105%] left-20`}
		>
			<ArrowRightAltIcon className="text-[12vw] md:text-[5.5vw] lg:text-[3.5vw] p-[3vw] md:p-[1vw] cursor-pointer hover:bg-[#171717] hover:text-white hover:rounded-full hover:text-center" />
		</span>
	);

	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		arrows: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		nextArrow: <CustomPrevArrow />,
		prevArrow: <CustomNextArrow />,
		responsive: [
			{
				breakpoint: 1428,
				settings: { slidesToShow: 2, slidesToScroll: 1, infinite: true },
			},
			{ breakpoint: 1000, settings: { slidesToShow: 1, slidesToScroll: 1 } },
			{ breakpoint: 640, settings: { slidesToShow: 1, slidesToScroll: 1 } },
		],
	};
	useEffect(() => {
		fetchProducts();
	}, []);
	return (
		<section className="w-full max-w-[80vw] mx-auto mt-[2vw] py-[15vw] sm:py-[10vw] lg:py-[8vw]">
			<h1 className="text-[5.5vw] sm:text-[3.5vw] lg:text-[2.5vw] text-[#171717] font-semibold">
				Get Bundles
			</h1>
			<p className="text-[#525252] text-[4vw] sm:text-[2vw] lg:text-[1vw] mb-10 font-medium">
				Unlimited Packs Get Every Pack We Have + Every Future Pack!
			</p>
			<div className="relative w-full grid grid-cols-1 mt-[2vw] pb-10">
				<Slider {...settings}>
					{bundleData?.map((bundle, index) => (
						<Link
							href={`/product/${bundle.slug}`}
							key={index}
							className="w-full mr-[1vw]"
						>
							<BundleCard key={index} {...bundle} />
						</Link>
					))}
				</Slider>
			</div>
		</section>
	);
};

export default Bundles;
