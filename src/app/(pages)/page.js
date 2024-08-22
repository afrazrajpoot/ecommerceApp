"use client";
import MotionDuck from "../components/pagesComponents/landingpage/MotionDuck";
import SubscriptionPass from "../components/pagesComponents/landingpage/SubscriptionPass";
import Categories from "../components/pagesComponents/landingpage/Categories";
import SubscriptionPlains from "../components/pagesComponents/landingpage/SubscriptionPlains";
import Image from "next/image";
import { profileData } from "@/data/data";
import Profile from "../components/Cards/Profile";
import Footer from "../components/Common/Footer/Footer";
import Bundles from "../components/pagesComponents/landingpage/Bundles";
import InputField from "../components/InputField";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "../../context/globalState";
import { useEffect } from "react";
import { useGetCustomerIdByEmailMutation } from "../../store/storeApi";
import Slider from "react-slick";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoIosArrowRoundForward } from "react-icons/io";
import "./styles.css";
import Link from "next/link";

const LandingPage = () => {
	const session = useSession();
	const { customerDetails, setCustomerDetails, setCustomerID } =
		useGlobalContext();
	const [getCustomerID] = useGetCustomerIdByEmailMutation();

	const handleGetCustomerID = async (email) => {
		if (email) {
			const result = await getCustomerID({ email: email });
			if (result.data) {
				setCustomerDetails({
					...customerDetails,
					username: result.data.user.fullName,
					email: result.data?.user?.email,
				});
				if (result?.data?.user?.customerId) {
					setCustomerID(result?.data?.user?.customerId);
				}
				localStorage.setItem("user", JSON.stringify(result.data.user));
			}
		}
	};

	useEffect(() => {
		if (session) {
			handleGetCustomerID(session.data?.user?.email);
		} else {
			const userFromLocal = JSON.parse(localStorage.getItem("user"));
			setCustomerDetails(userFromLocal?.user);
		}
	}, [session?.data]);

	const CustomPrevArrow = ({ style, onClick }) => (
		<span
			style={{ ...style }}
			onClick={onClick}
			className={`text-vw text-black my-10 absolute top-[87vw] cursor-pointer sm:top-[74vw] md:top-[47vw] lg:top-[28vw]  left-0 z-50`}
		>
			<ArrowRightAltIcon className="text-black text-[10.5vw] md:text-[5.5vw] lg:text-[3.5vw] p-[3vw] md:p-[1vw] cursor-pointer hover:bg-[#171717] hover:text-white hover:rounded-full hover:text-center rotate-180" />
		</span>
	);
	const CustomNextArrow = ({ style, onClick }) => (
		<span
			style={{ ...style }}
			onClick={onClick}
			className={`text-vw text-black my-10 absolute top-[87vw] cursor-pointer sm:top-[74vw] md:top-[47vw] lg:top-[28vw] left-[12vw]  sm:left-[10vw] lg:left-[5vw] z-50`}
		>
			<ArrowRightAltIcon className="text-[#000000] text-[10.5vw] md:text-[5.5vw] lg:text-[3.5vw] p-[3vw] md:p-[1vw] cursor-pointer hover:bg-[#171717] hover:text-white hover:rounded-full hover:text-center" />
		</span>
	);

	const settings = {
		className: "active",
		centerMode: true,
		focusOnSelect: true,
		centerPadding: 0,
		dots: false,
		infinite: true,
		speed: 500,
		arrows: true,
		slidesToShow: 3,
		centerMode: true,
		slidesToScroll: 1,
		nextArrow: <CustomPrevArrow />,
		prevArrow: <CustomNextArrow />,
		responsive: [
			{
				breakpoint: 1024,
				settings: { slidesToShow: 2, slidesToScroll: 1, infinite: true },
			},
			{ breakpoint: 1000, settings: { slidesToShow: 2, slidesToScroll: 1 } },
			{ breakpoint: 640, settings: { slidesToShow: 1, slidesToScroll: 1 } },
		],
	};

	return (
		<main
			// style={{ backgroundImage: "url('/img/hero1.png')" }}
			className="relative w-full h-[120vh] md:h-screen bg-center bg-cover"
		>
			<div className="absolute w-full h-full z-0">
				<Image src={"/img/home-2.jpg"} alt="bg-hero" fill />
			</div>
			<div className="w-full h-screen relative">
				<aside className="pt-[200px] ml-[6vw] md:ml-[9vw] w-full max-w-[90vw]  md:max-w-[50vw] p-[1vw]">
					<button className="bg-[#3D3D3D]/25 border border-[#3D3D3D] text-[4vw] sm:text-[2vw] lg:text-[1vw] hover:bg-[#333333] text-white/60 font-light p-[2.5vw] sm:p-[0.6vw] rounded-full w-full max-w-[35vw] sm:max-w-[18vw] lg:max-w-[10vw] text-center">
						SONDUCKFILM
					</button>
					<p className="gradient-text mt-[5vw] w-full text-[12vw] lg:text-[4.5vw] font-bold leading-[12vw] lg:leading-[4.5vw] sm:mt-[2vw] sm:text-[5vw] sm:leading-[5vw] lg:mt-[1vw] ">
						Get Access to Hundreds <span>Motion</span> <span>Graphics</span>{" "}
						Available
					</p>
					<p className="w-full text-[4vw] mt-[3vw] sm:text-[2vw] lg:text-[1vw] md:mt-[1vw] text-[#B0B0B0] sm:max-w-[40vw] lg:max-w-[30vw]">
						Find what you need on Sonduck Film, Discover millions of video
						templates, stock footage, audio & more. All for one low cost.
					</p>
					<section className="flex flex-col justify-center md:justify-normal md:flex-row items-center mt-[4vw] sm:mt-[3vw] lg:mt-[1vw]">
						<InputField />
					</section>
				</aside>
				<section className="absolute w-full bottom-[-100vw] sm:bottom-[-80vw] md:bottom-[-12vw] left-0 right-0 max-w-[80vw] mx-auto">
					<MotionDuck />
				</section>
			</div>
			<section className="w-full mt-[110vw] sm:mt-[90vw] md:mt-[15vw] max-w-[80vw] mx-auto">
				<SubscriptionPass />
			</section>
			<section className="w-full mt-[10vw] md:mt-[4vw] bg-[#F8F8F8]">
				<Categories />
			</section>
			<section className="w-full mt-[10vw] md:mt-[0vw] bg-[#ffff]">
				<Bundles />
			</section>
			<section className="w-full mt-5 bg-[#F8F8F8]">
				<SubscriptionPlains />
			</section>
			<article className="w-full relative flex flex-col items-center justify-center mt-[10vw] sm:mt-[6vw] lg:mt-[2vw] pt-[6vw] md:pt-[2vw] bg-[#171717]">
				<img
					src={"/img/duck1.png"}
					alt="hero2"
					className="absolute w-full max-w-[13vw] top-[2vw] right-0 grayscale-[5] md:block hidden"
				/>
				<img
					src={"/img/duck2.png"}
					alt="hero2"
					className="absolute w-full max-w-[13vw] top-[15vw] left-0 grayscale-[5] md:block hidden"
				/>
				<h1 className="text-[5.5vw] sm:text-[3.5vw] lg:text-[2.5vw] mt-[2vw] font-semibold text-[#fff] text-center">
					Unlock Your Potential as a <br />{" "}
					<span className="text-[#FF689A]">Creator</span> with Sonduck
				</h1>
				<p className="text-[3.8vw] sm:text-[1.8vw] lg:text-[0.8vw] mt-2 mb-5 font-light text-[#D4D4D4] text-center w-full max-w-[80vw] sm:max-w-[70vw] lg:max-w-[47vw]">
					Experience the collaboration of numerous creators and an expanding
					selection of courses. Register now and become a part of a community
					comprising over 10,000 local and international creators. Utilize our
					Course Editor, and showcase your expertise by publishing your finest
					course on the Sonduck Course Library.
				</p>
				<Link
					href={"/store"}
					className="relative group bg-[#FF387A] text-[4vw] sm:text-[2vw] lg:text-[1vw] ml-[1vw] text-[#fff] px-4 pr-6 py-2 mb-10 mt-5 md:mt-[2vw] rounded-md w-full max-w-[30vw] sm:max-w-[15vw] lg:max-w-[10vw] text-center transition-all duration-300 hover:shadow-md"
				>
					Browse All
					<span className="absolute top-[12%] right-3 w-[30px] h-[25px] overflow-hidden">
						<IoIosArrowRoundForward
							className="transform translate-x-[-20px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300"
							size={30}
						/>
					</span>
				</Link>

				<Image
					src={"/img/Desktop.png"}
					alt="hero2"
					width={1250}
					height={300}
					className="mt-[4vw]"
				/>
			</article>
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
				<div className="slider-container max-w-[1050px] mx-auto w-full grid grid-cols-1 gap-[10vw] sm:gap-[5vw] lg:gap-[3vw] my-20">
					<Slider {...settings}>
						{profileData?.map((user, index) => (
							<Profile key={index} {...user} />
						))}
					</Slider>
				</div>
			</section>
			<Footer />
		</main>
	);
};

export default LandingPage;
