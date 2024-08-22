"use client";
import { Button } from "@mui/material";
import React, { useEffect, useState, useCallback, Suspense } from "react";
import Pack from "../../components/Cards/Pack";
import Pagination from "../../components/Common/Paggination";
import SubscriptionPass from "../../components/pagesComponents/landingpage/SubscriptionPass";
import Bundles from "../../components/pagesComponents/landingpage/Bundles";
import Link from "next/link";
import Footer from "../../components/Common/Footer/Footer";
import Loading from "../../components/Common/Loading";
import { useGlobalContext } from "@/context/globalState";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { RiArrowUpDownLine } from "react-icons/ri";

const Store = () => {
	const btnData = [
		"Filter",
		"All Products",
		"Bundle",
		"Single Pack",
		"Premiere Pro",
		"After Effects",
	];

	const [sortOrder, setSortOrder] = useState("desc");
	const [products, setProducts] = useState([]);
	const [selectedBtn, setSelectedBtn] = useState("All Products");
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const { fetchWooCommerceData, querySuggestion } = useGlobalContext();
	const itemsPerPage = 6;

	const searchParams = useSearchParams();
	const searchQuery = searchParams.get("query") || "";

	const fetchProducts = useCallback(
		async (categorySlug = "", page = 1) => {
			try {
				let params = { per_page: itemsPerPage, page };

				if (categorySlug) {
					const categoriesResponse = await fetchWooCommerceData(
						"wc/v3/products/categories",
						{ params: { per_page: 100 } }
					);
					const categories = await categoriesResponse.data;
					const category = categories?.find((cat) => cat.slug === categorySlug);
					if (category) {
						params = { ...params, category: category.id };
					} else {
						return;
					}
				}

				if (searchQuery) {
					params = { ...params, search: searchQuery };
				}

				const response = await fetchWooCommerceData("wc/v3/products", {
					params,
				});
				const totalProducts = response.totalProducts;
				const data = response.data;
				setTotalPages(Math.ceil(totalProducts / itemsPerPage));
				setProducts(data);
			} catch (error) {
				if (error.message === "socket hung up") {
					window.location.reload();
				} else {
					toast.warning("Slow network, please refresh", {
						position: "top-right",
						style: { marginTop: 40 },
					});
				}
			}
		},
		[fetchWooCommerceData, itemsPerPage, searchQuery]
	);

	useEffect(() => {
		const categorySlug =
			selectedBtn === querySuggestion || selectedBtn === "All Products"
				? ""
				: selectedBtn.toLowerCase().replace(/\s+/g, "-");

		fetchProducts(categorySlug, currentPage);
	}, [selectedBtn, currentPage, querySuggestion, fetchProducts]);

	const handleClick = useCallback(
		(label) => {
			setSelectedBtn(label);
			setCurrentPage(1);

			// Update the query params
			const newParams = new URLSearchParams(searchParams);
			if (label !== "All Products") {
				newParams.set("query", label);
			} else {
				newParams.delete("query");
			}

			window.history.replaceState(
				{},
				"",
				`${window.location.pathname}?${newParams.toString()}`
			);

			const categorySlug =
				label === "All Products"
					? ""
					: label === "Bundle"
					? "bundles"
					: label.toLowerCase().replace(/\s+/g, "-");
			fetchProducts(categorySlug, 1);
		},
		[searchParams, fetchProducts]
	);

	const handlePageChange = (page) => {
		if (page < 1 || page > totalPages) return;
		setCurrentPage(page);
	};

	useEffect(() => {
		sortProducts();
	}, [sortOrder]);

	const sortProducts = useCallback(() => {
		const sortedProducts = [...products].sort((a, b) => {
			const dateA = new Date(a.date_created).getTime();
			const dateB = new Date(b.date_created).getTime();
			return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
		});
		setProducts(sortedProducts);
	}, [products, sortOrder]);

	const toggleSortOrder = () => {
		setSortOrder(sortOrder === "asc" ? "desc" : "asc");
	};

	useEffect(() => {
		const queryParam = searchQuery;
		if (queryParam && btnData.includes(queryParam)) {
			setSelectedBtn(queryParam);
		} else {
			setSelectedBtn("All Products");
		}

		if (queryParam && btnData.includes(queryParam)) {
			handleClick(queryParam);
		}
	}, [searchQuery, handleClick]);

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<main className="w-full overflow-x-hidden">
				<nav className="flex mt-[20vw] sm:mt-[8vw] lg:mt-[5vw] w-full max-w-[90vw] mx-auto items-center justify-between p-[3vw]">
					<section className="hidden sm:grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-[1vw] items-center">
						{btnData.map((label, index) => (
							<Button
								key={index}
								style={{ textTransform: "capitalize" }}
								startIcon={
									label === "Filter" ? <RiArrowUpDownLine size={20} /> : null
								}
								variant="outlined"
								className={` ml-[0.5vw] border-[1px] ${
									selectedBtn === label
										? "text-[#FF387A] border-[#FF387A] font-medium"
										: "text-[#525252] border-gray-200  font-semibold"
								} hover:bg-[#FF387A] hover:text-[#ffff] hover:border-[#FF387A]  hover:shadow-md rounded-md text-center whitespace-nowrap px-6 py-2`}
								onClick={() => handleClick(label)}
							>
								{label}
							</Button>
						))}
					</section>

					<section className="flex items-center w-full sm:max-w-[40vw] lg:max-w-[30vw] justify-between sm:justify-end">
						<div className="flex sm:hidden gap-1 text-[#525252] items-center text-[4vw] sm:text-[2vw] lg:text-[1vw]">
							<RiArrowUpDownLine size={20} className="text-[#171717]" />
							Filter
						</div>
						<div className="flex items-center gap-2">
							<p className="text-[#525252] w-full max-w-fit sm:max-w-[8vw] lg:max-w-[5vw] text-[4vw] sm:text-[2vw] lg:text-[1vw]">
								Sort by
							</p>
							<button
								onClick={toggleSortOrder}
								className={`flex items-center gap-2 sm:px-6 py-2 ml-[0.5vw] border-[1px] text-[3.5vw] sm:text-[2vw] lg:text-[1vw] 
                  text-[#171717] bg-white border-gray-200 sm:hover:text-[#FF387A] sm:hover:border-[#FF387A]
                  hover:shadow-md p-[2.5vw] md:p-[0.5vw] rounded-md flex-shrink-0 text-center font-semibold`}
							>
								Release Date{" "}
								<RiArrowUpDownLine
									size={20}
									className={`transition-transform duration-300 ${
										sortOrder === "asc" ? "rotate-180" : "rotate-0"
									}`}
								/>
							</button>
						</div>
					</section>
				</nav>
				<nav className="flex sm:hidden w-[95vw] mx-auto ml-[5vw] pr-[2vw] pb-[4vw]  mt-[1vw] gap-[3vw] overflow-x-scroll flex-nowrap">
					{btnData
						?.filter((item) => item !== "Filter")
						.map((elem, ind) => (
							<div className="flex" key={ind}>
								<Button
									style={{ textTransform: "capitalize" }}
									variant="outlined"
									className={`bg-[#FFFF] font-bold text-[#525252]  border-[#525252] border-[1px] w-[30vw]   text-[3vw]   hover:shadow-md    py-[2.5vw] rounded-md  px-[3vw]    text-center ${
										ind === 0 &&
										"border-[#FF387A] hover:bg-[#ff387af6] text-[#FF387A] text-[3.5vw]"
									}`}
								>
									{elem}
								</Button>
							</div>
						))}
				</nav>
				<div className="w-screen overflow-x-hidden">
					<section className="w-full max-w-[90vw] mx-auto mt-[6vw] md:mt-[2vw] ml-[20vw] md:ml-[10vw]">
						{products?.length === 0 ? (
							<main className="w-full flex items-center justify-center h-[30vw]">
								<Loading />
							</main>
						) : (
							<>
								<figure className="w-full mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-[5vw] md:mt-0 gap-10 items-start">
									{products?.map((product, index) => {
										const { images, regular_price, sale_price, name, slug } =
											product;
										return (
											<Link href={`/product/${slug}`} key={index}>
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
								<div className="mr-[10vw]">
									<Pagination
										currentPage={currentPage}
										totalPages={totalPages}
										onPageChange={handlePageChange}
									/>
								</div>
							</>
						)}
					</section>
				</div>
				<article className="w-full max-w-[85vw] mx-auto mt-[10vw] md:mt-[2vw]">
					<SubscriptionPass btnBg={"#FF387A"} />
				</article>
				<section className="w-full mt-[10vw] md:mt-[2vw] bg-[#F8F8F8]">
					<Bundles />
				</section>
				<Footer />
			</main>
		</Suspense>
	);
};

export default Store;
