"use client";
import React, { useEffect, useState, Suspense } from "react";
import Pack from "../../components/Cards/Pack";
import Pagination from "../../components/Common/Paggination";
import Bundles from "../../components/pagesComponents/landingpage/Bundles";
import Link from "next/link";
import Footer from "../../components/Common/Footer/Footer";
import { useGlobalContext } from "@/context/globalState";
import Loading from "../../components/Common/Loading";
import { useSearchParams } from "next/navigation";
import ImportExportSharpIcon from "@mui/icons-material/ImportExportSharp";

const page = () => {
	const [sortOrder, setSortOrder] = useState("desc");
	const [products, setProducts] = useState([]);

	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const { fetchWooCommerceData } = useGlobalContext();
	const itemsPerPage = 9;
	const params = useSearchParams();
	const searchQuery = params.get("query");
	const fetchProducts = async (categorySlug = "", page = 1) => {
		try {
			let params = { per_page: itemsPerPage, page };

			if (categorySlug) {
				const categoriesResponse = await fetchWooCommerceData(
					"wc/v3/products/categories",
					{
						params: { per_page: 100 },
					}
				);
				const categories = await categoriesResponse.data;
				const category = categories?.find((cat) => cat.slug === categorySlug);
				if (category) {
					params = { ...params, category: category.id };
				} else {
					// toast.error("Category not found");
					return;
				}
			}

			if (searchQuery) {
				params = { ...params, search: searchQuery };
			}

			const response = await fetchWooCommerceData("wc/v3/products", { params });
			const totalProducts = response.totalProducts;
			const data = response.data;
			setTotalPages(Math.ceil(totalProducts / itemsPerPage));
			setProducts(data);
		} catch (error) {
			if (error.message === "socket hung up") {
				window.location.reload();
			} else {
				console.warn(error);
			}
		}
	};

	useEffect(() => {
		fetchProducts(); // Fetch initial products (All Products)
	}, []); // Empty dependency array to run once on mount

	const handlePageChange = (page) => {
		if (page < 1 || page > totalPages) return;
		setCurrentPage(page);
	};

	useEffect(() => {
		// Sorting products whenever sortOrder or products change
		sortProducts();
	}, [sortOrder]);

	const sortProducts = () => {
		const sortedProducts = [...products].sort((a, b) => {
			const dateA = new Date(a.date_created).getTime();
			const dateB = new Date(b.date_created).getTime();
			if (sortOrder === "asc") {
				return dateA - dateB;
			} else {
				return dateB - dateA;
			}
		});
		setProducts(sortedProducts);
	};

	const toggleSortOrder = () => {
		setSortOrder(sortOrder === "asc" ? "desc" : "asc");
	};

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<main className="w-full">
				<nav className="flex mt-[20vw] sm:mt-[8vw] lg:mt-[5vw] w-full max-w-[90vw] mx-auto items-center justify-between p-[3vw]">
					<section className="flex items-center w-full  justify-end">
						<p className="text-[#525252] w-full max-w-[15vw] sm:max-w-[8vw] lg:max-w-[5vw] text-[4vw] sm:text-[2vw] lg:text-[1vw]">
							Sort by
						</p>
						<button
							onClick={toggleSortOrder}
							className={`whitespace-nowrap sm:px-6 py-2 border-[1px] text-[3.5vw] sm:text-[2vw] lg:text-[1vw] 
								
								text-[#525252] bg-white border-gray-200 sm:hover:text-[#FF387A] sm:hover:border-[#FF387A]
								hover:shadow-md p-[2.5vw] md:p-[0.5vw] rounded-md w-[150px] text-center font-semibold`}
						>
							Release Date <ImportExportSharpIcon />
						</button>
					</section>
				</nav>

				<section className="w-full max-w-[90vw] ml-[4vw] mx-auto mt-[6vw] md:mt-[2vw]">
					{products?.length === 0 ? (
						<main className="w-full flex items-center justify-center h-[30vw]">
							<Loading />
						</main>
					) : (
						<>
							<figure className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-[5vw] md:mt-0 gap-[10vw] md:gap-[2vw] items-start">
								{products?.map((product, index) => {
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
							<Pagination
								currentPage={currentPage}
								totalPages={totalPages}
								onPageChange={handlePageChange}
							/>
						</>
					)}
				</section>

				<section className="w-full mt-[10vw] md:mt-[2vw] bg-[#F8F8F8]">
					<Bundles />
				</section>
				<Footer />
			</main>
		</Suspense>
	);
};

export default page;
