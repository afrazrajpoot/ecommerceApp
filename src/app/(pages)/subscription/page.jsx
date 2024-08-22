"use client";
import Image from "next/image";
import React from "react";
import Categories from "../../components/pagesComponents/landingpage/Categories";
import SubscriptionPlains from "../../components/pagesComponents/landingpage/SubscriptionPlains";
import {
	pricingData,
	profileData,
	motionDuckData,
	features1,
	features2,
} from "@/data/data";
import Profile from "../../components/Cards/Profile";
import Questions from "../../components/pagesComponents/subscriptionPage/Questions";
import Footer from "../../components/Common/Footer/Footer";
import Pricing from "../../components/pagesComponents/landingpage/Pricing";
import Motion from "../../components/Common/Motion";
import { useGlobalContext } from "@/context/globalState";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import "../styles.css";

const Subscription = () => {
	const navigate = useRouter();
	const { setSelectedPlan, setActive, login, customerID } = useGlobalContext();

	const handlePlanSelect = (index, price, features, available) => {
		if (login == false) {
			toast.error("Please login first", {
				position: "top-right",
				style: { marginTop: 40 },
			});
			return;
		} else if (!customerID && customerID === undefined) {
			toast.error("Please register yourself as a customer", {
				position: "top-right",
				style: { marginTop: 40 },
			});
			navigate.push("/accountdetails");
			return;
		} else {
			const newSelectedPlan = { index, price, features, available };
			setSelectedPlan(newSelectedPlan);
			setActive(true);
			navigate.push("/payment");
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

	return (
		<>
			<main
				// style={{ backgroundImage: "url('/img/BG.png')" }}
				className="relative w-full"
			>
				<div className="absolute w-full h-full z-0">
					<Image
						src={"/img/5-SubscriptionBannerMaster1.jpg"}
						alt="bg-hero"
						fill
					/>
				</div>
				<article className="flex w-full flex-col justify-center py-[150px] items-center relative">
					<h1 className="gradient-text text-[8vw] md:text-[4vw] font-bold ">
						Subscription
					</h1>
					<Image
						src={"/img/banner-new.png"}
						className="mt-[3vw]"
						width={1100}
						height={1000}
					/>
					<footer className="absolute top-[88%] flex md:flex-row flex-col items-start shadow-lg gap-10 justify-between p-[2vw] bg-[#ffff] w-full max-w-[80vw] rounded-lg  mt-10">
						<section className="w-full mt-5 lg:mt-0 ">
							<h2 className="text-lg md:text-xl mt-[1vw] text-[#171717] text-center font-semibold">
								What is MotionDuck?
							</h2>
							<iframe
								width="560"
								height="315"
								src="https://www.youtube.com/embed/MOQs3TVrZrQ?si=aiYrrSNTJC7W0Ndi"
								title="YouTube video player"
								frameBorder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
								referrerPolicy="strict-origin-when-cross-origin"
								className="rounded-[20px] w-full mt-[5vw] lg:mt-[1vw]"
								allowFullScreen
							></iframe>
						</section>
						<section className="w-full mt-5 lg:mt-0">
							<h2 className="text-lg md:text-xl mt-[1vw]  text-[#171717] text-center font-semibold">
								Subscription Walkthrough
							</h2>
							<iframe
								width="560"
								height="315"
								src="https://www.youtube.com/embed/6xwqSUPC4bM?si=2-gP_9YS90DRybHN"
								title="YouTube video player"
								frameBorder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
								referrerPolicy="strict-origin-when-cross-origin"
								className="rounded-[20px] w-full  mt-[5vw] lg:mt-[1vw]"
								allowFullScreen
							></iframe>
						</section>
					</footer>
				</article>
			</main>
			<section className="mt-[900px] md:mt-[450px] w-full">
				<h1 className="text-center font-bold text-[5vw] lg:text-[2.4vw]">
					Pricing
				</h1>
				<div className="flex lg:flex-row flex-col gap-[5vw] items-center lg:items-start  justify-center mt-[3vw]">
					{pricingData?.map((data, index) => (
						<Pricing
							key={index}
							paymentMethod={() =>
								handlePlanSelect(index, data.price, data.info, data.plan)
							}
							{...data}
						/>
					))}
				</div>
			</section>
			<section className="  mt-[10vw]   w-full ">
				<h1 className="text-center font-semibold text-[5vw] md:text-[2.4vw]">
					What is MotionDuck?
				</h1>
				<div className=" mt-[3vw] p-[2vw]">
					{motionDuckData.map((data, index) => (
						<Motion key={index} {...data} index={index} />
					))}
				</div>
			</section>
			<section className="  mt-[15vw]  w-full  ">
				<h1 className="text-center font-semibold text-[5vw] lg:text-[2.4vw]">
					Save time
				</h1>
				<div className="mx-auto h-[330px] w-[90%] md:w-[550px] ">
					<iframe
						src="https://www.youtube.com/embed/KqhARH_JaPE?si=systEFIA4suGJ5bO"
						title="YouTube video player"
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						referrerPolicy="strict-origin-when-cross-origin"
						allowFullScreen
						className="mx-auto mt-[2vw] w-full h-full rounded-[20px] shadow-md"
					></iframe>
				</div>
			</section>
			<section className="relative flex flex-col gap-10 mt-[10vw] w-[90%] md:max-w-[70vw] mx-auto bg-[#171717] pt-[50px] pb-[300px] rounded-2xl">
				<h2 className="text-[32px] md:text-[48px] font-semibold text-white text-center z-10">
					Features
				</h2>
				<div className="flex flex-col lg:flex-row gap-5 w-[85%] mx-auto z-10">
					<div className="flex flex-col gap-4">
						{features1.map((item, index) => (
							<div className="flex gap-2 w-[90%]" key={index}>
								<div className="relative w-6 h-6 flex-shrink-0 mt-2">
									<Image src={"/img/pinkCheck.png"} fill alt="check-mark" />
								</div>
								<p className="text-white text-sm font-light leading-[35px]">
									<span className="font-semibold mb-1">{item.heading}</span>
									{item.desc}
								</p>
							</div>
						))}
					</div>
					<div className="flex flex-col gap-4 z-10">
						{features2.map((item, index) => (
							<div className="flex gap-2 w-[90%]" key={index}>
								<div className="relative w-6 h-6 flex-shrink-0 mt-2">
									<Image src={"/img/pinkCheck.png"} fill alt="check-mark" />
								</div>
								<p className="text-white text-sm font-light leading-[35px]">
									<span className="font-semibold mb-1">{item.heading}</span>
									{item.desc}
								</p>
							</div>
						))}
					</div>
				</div>
				<div className="absolute w-full h-full z-0">
					<Image src={"/img/6-FeaturesBanner1.jpg"} fill />
				</div>
			</section>

			<section className="w-full mt-[10vw] md:mt-[5vw] bg-[#F8F8F8] ">
				<Categories />
			</section>
			<section className="w-full mt-[10vw] md:mt-[2vw] bg-[#F8F8F8]">
				<SubscriptionPlains />
			</section>
			<section className="w-full mt-[10vw] md:mt-[2vw] bg-[#171717]">
				<Questions />
			</section>
			<section className="w-full py-[6vw] sm:py-[4vw] lg:py-[2vw] bg-[#F6F6F6]">
				<article className="w-full flex flex-col sm:flex-row justify-between mt-[3vw]  max-w-[1050px] mx-auto gap-4">
					<h1 className="text-[5.8vw] sm:text-[3.2vw] lg:text-[2.4vw] leading-[6vw] md:leading-[3vw] font-bold text-[#171717]">
						Discover What Our <br /> Community Is Saying
					</h1>
					<p className="font-medium text-[#525252] mt-[3vw] sm:mt-0 text-[4vw] sm:text-[2vw] lg:text-[1vw] w-full max-w-[80vw] sm:max-w-[45vw] lg:max-w-[35vw]">
						At Sonduck, our vibrant community of learners and creators is at the
						heart of what we do. Hear directly from those who have experienced
						the transformative journey of learning and creating on our platform.
						Explore testimonials that reflect the diverse perspectives of
						enthusiastic learners and accomplished creators.
					</p>
				</article>
				<div className="slider-container max-w-[1050px] mx-auto w-full grid grid-cols-1 gap-[10vw] sm:gap-[5vw] lg:gap-[2vw] my-20">
					<Slider {...settings}>
						{profileData?.map((user, index) => (
							<Profile key={index} {...user} />
						))}
					</Slider>
				</div>
			</section>
			<Footer />
		</>
	);
};

export default Subscription;
