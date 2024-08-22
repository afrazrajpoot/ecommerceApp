"use client";
import { Button } from "@mui/material";
import React, { useEffect, useState, useCallback } from "react";
import ImportExportSharpIcon from "@mui/icons-material/ImportExportSharp";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Link from "next/link";
import { useGlobalContext } from "@/context/globalState";
import Pack from "../../Cards/Pack";
import Loading from "../../Common/Loading";
import Pagination from "../../Common/Paggination";
import { usePathname } from "next/navigation";

const Categories = React.memo(() => {
	const btnData = ["All Products", "Premiere Pro", "After Effects"];
	const [state, setState] = useState({
		products: [],
		selectedBtn: "All Products",
		currentPage: 1,
		totalPages: 1,
		featurePackages: [],
	});
	const itemsPerPage = 6;
	const { fetchWooCommerceData } = useGlobalContext();
	const path = usePathname();

	const fetchProducts = useCallback(
		async (categorySlug = "", page = 1) => {
			try {
				let params = { per_page: itemsPerPage, page };

				if (categorySlug) {
					const categoriesResponse = await fetchWooCommerceData(
						"wc/v3/products/categories",
						{ params: { per_page: 100 } }
					);
					const categories = categoriesResponse.data;
					const category = categories?.find((cat) => cat.slug === categorySlug);
					if (category) {
						params.category = category.id;
					} else {
						console.warn("Category not found");
						return;
					}
				}

				const response = await fetchWooCommerceData("wc/v3/products", {
					params,
				});
				setState((prevState) => ({
					...prevState,
					products: response.data,
					totalPages: Math.ceil(response.totalProducts / itemsPerPage),
				}));
			} catch (error) {
				console.log(error);
			}
		},
		[fetchWooCommerceData]
	);

	const fetchFeaturePack = useCallback(async () => {
		try {
			const response = await fetchWooCommerceData(
				"wc/v3/products?featured=false"
			);
			setState((prevState) => ({
				...prevState,
				featurePackages: response.data,
			}));
		} catch (error) {
			console.log(error);
		}
	}, [fetchWooCommerceData]);

	useEffect(() => {
		fetchFeaturePack();
		fetchProducts();
	}, [fetchFeaturePack, fetchProducts]);

	useEffect(() => {
		const categorySlug =
			state.selectedBtn === "All Products"
				? ""
				: state.selectedBtn.toLowerCase().replace(/\s+/g, "-");
		fetchProducts(categorySlug, state.currentPage);
	}, [state.selectedBtn, state.currentPage, fetchProducts]);

	const handlePageChange = (page) => {
		if (page < 1 || page > state.totalPages) return;
		setState((prevState) => ({
			...prevState,
			currentPage: page,
		}));
	};

	const handleClick = (label) => {
		setState((prevState) => ({
			...prevState,
			selectedBtn: label,
			currentPage: 1,
		}));
	};

	const CustomPrevArrow = ({ style, onClick }) => (
		<span
			style={{ ...style }}
			onClick={onClick}
			className="text-black absolute cursor-pointer top-0 -left-[5vw] md:top-[20vw] lg:top-[12vw] md:-left-[37vw] lg:-left-[29vw] z-50"
		>
			<ArrowRightAltIcon className="text-[#000000] text-[10.5vw] md:text-[5.5vw] lg:text-[3.5vw] p-[3vw] md:p-[1vw] cursor-pointer hover:bg-[#171717] hover:text-white hover:rounded-full rotate-180" />
		</span>
	);

	const CustomNextArrow = ({ style, onClick }) => (
		<span
			style={{ ...style }}
			onClick={onClick}
			className="text-black absolute cursor-pointer top-0 left-[6vw] md:top-[20vw] lg:top-[12vw] md:-left-[25vw] lg:-left-[23vw]"
		>
			<ArrowRightAltIcon className="text-[#000000] text-[10.5vw] md:text-[5.5vw] lg:text-[3.5vw] p-[3vw] md:p-[1vw] cursor-pointer hover:bg-[#171717] hover:text-white hover:rounded-full" />
		</span>
	);

	const sliderSettings = {
		dots: false,
		infinite: true,
		speed: 500,
		arrows: true,
		slidesToShow: 2,
		slidesToScroll: 1,
		nextArrow: <CustomNextArrow />,
		prevArrow: <CustomPrevArrow />,
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
		<>
			<main className="w-full">
				<section className="flex w-full max-w-[80vw] mx-auto mt-[6vw] pt-[3vw] md:mt-[2vw] flex-col md:flex-row items-start gap-5">
					<aside className="w-full md:max-w-[35vw] lg:max-w-[28vw] ">
						<h1 className="text-[5.5vw] md:text-[2.5vw] text-[#171717] font-bold">
							Featured Single Packs
						</h1>
						<p className="text-[#404040] text-[4vw] sm:text-[2vw] lg:text-[1vw] mt-[1vw]">
							Find what you need on Sonduck Film, Discover millions of video
							templates, stock footage, audio & more. All for one low cost.
						</p>
					</aside>
					<figure className="grid grid-cols-1 w-full lg:max-w-[60vw] mt-[5vw] md:mt-0">
						{state.featurePackages.length === 0 ? (
							<main className="w-full lg:max-w-[60vw] flex items-center h-[16vw] justify-center">
								<Loading h={10} w={10} />
							</main>
						) : (
							<Slider {...sliderSettings}>
								{state.featurePackages.map((packages, index) => {
									const { images, regular_price, sale_price, name, slug } =
										packages;
									return (
										<Link
											href={`/product/${slug}`}
											key={index}
											className="w-full px-[1vw] mt-20 md:mt-0"
										>
											<Pack
												discountedPrice={sale_price}
												actualPrice={regular_price}
												image={images[0]?.src}
												title={name}
											/>
										</Link>
									);
								})}
							</Slider>
						)}
					</figure>
				</section>
				<section className="w-full max-w-[85vw] mx-auto mt-16">
					<h1 className="text-[5.5vw] md:text-[2.5vw] text-[#171717] font-bold">
						{path === "/" ? "Get Single Packs" : "All Motionduck Packs"}
					</h1>
				</section>
				<nav className="flex w-full max-w-[85vw] mx-auto items-center justify-between mt-10">
					<div className="flex justify-between w-full">
						<section className="grid grid-cols-3 gap-6 items-center justify-start">
							{btnData.map((label, index) => (
								<Button
									key={index}
									style={{ textTransform: "capitalize" }}
									startIcon={
										label === "Filter" ? <ImportExportSharpIcon /> : null
									}
									variant={state.selectedBtn === label ? "outlined" : "text"}
									className={` ml-[0.5vw] border-[1px] ${
										state.selectedBtn === label
											? "text-[#FF387A] border-[#FF387A]"
											: "text-[#525252]"
									} hover:text-[#FF387A] hover:border-[#FF387A] font-semibold text-[3.5vw] sm:text-[2vw] lg:text-[1vw] py-2 px-6 rounded-md w-full max-w-[30vw] md:max-w-[15vw] lg:max-w-[8vw] text-center whitespace-nowrap`}
									onClick={() => handleClick(label)}
								>
									{label}
								</Button>
							))}
						</section>
						<Link className="md:block hidden" href={"/store"}>
							<Button
								style={{
									textTransform: "capitalize",
									position: "relative",
									overflow: "hidden",
								}}
								variant="outlined"
								className="group border-[1px] text-[#FF387A] border-[#FF387A] font-semibold text-[3.5vw] sm:text-[2vw] lg:text-[1vw] py-2 px-6 rounded-md w-full max-w-[30vw] md:max-w-[15vw] lg:max-w-[8vw] text-center focus:outline-none"
							>
								<span className="absolute inset-0 bg-[#FF387A] transition-all duration-300 transform translate-x-[-100%] group-hover:translate-x-0"></span>
								<span className="relative z-10 transition-colors duration-300 group-hover:text-white">
									View All
								</span>
							</Button>
						</Link>
					</div>
				</nav>
				<section className="flex flex-col items-center w-full max-w-[90vw] mx-auto mt-[6vw] md:mt-[2vw] ml-[8vw]">
					{state.products.length === 0 ? (
						<main className="w-full flex items-center justify-center h-[30vw]">
							<Loading h={10} w={10} />
						</main>
					) : (
						<>
							<figure className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-[5vw] md:mt-0 gap-[10vw] md:gap-[2vw] items-start">
								{state.products.map((product, index) => {
									const { images, regular_price, sale_price, name, slug } =
										product;
									return (
										<Link
											href={`/product/${slug}`}
											key={index}
											className="w-full"
										>
											<Pack
												discountedPrice={sale_price}
												actualPrice={regular_price}
												image={images[0]?.src}
												title={name}
											/>
										</Link>
									);
								})}
							</figure>
							<div className="w-full md:block hidden mr-[8vw]">
								<Pagination
									currentPage={state.currentPage}
									totalPages={state.totalPages}
									onPageChange={handlePageChange}
								/>
							</div>
							<Link className="md:hidden block mt-16" href={"/store"}>
								<Button
									style={{
										textTransform: "capitalize",
										position: "relative",
										overflow: "hidden",
									}}
									variant="outlined"
									className="group border-[1px] text-[#FF387A] border-[#FF387A] font-semibold text-[3.5vw] sm:text-[2vw] lg:text-[1vw] py-2 px-6 rounded-md w-full max-w-[30vw] md:max-w-[15vw] lg:max-w-[8vw] text-center"
								>
									<span className="absolute inset-0 bg-[#FF387A] transition-all duration-300 transform translate-x-[-100%] group-hover:translate-x-0"></span>
									<span className="relative z-10 transition-colors duration-300 group-hover:text-white">
										View All
									</span>
								</Button>
							</Link>
						</>
					)}
				</section>
			</main>
		</>
	);
});

export default Categories;
