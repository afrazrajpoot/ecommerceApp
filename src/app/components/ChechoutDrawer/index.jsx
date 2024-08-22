"use client";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useGlobalContext } from "@/context/globalState";
import { useRouter } from "next/navigation";
import { Drawer } from "@mui/material";
import {
	RiDeleteBin5Line,
	RiDownloadCloud2Line,
	RiLock2Line,
	RiCustomerService2Line,
} from "react-icons/ri";
import {
	IoIosCloseCircleOutline,
	IoIosArrowRoundForward,
} from "react-icons/io";

const CheckoutDrawer = () => {
	const {
		active,
		setActive,
		cart,
		showCart,
		removeFromCartHandler,
		productsAddedToCart,
		cartCount,
		cartDetail,
	} = useGlobalContext();

	const cartData = [
		{ img: RiDownloadCloud2Line, title: "DOWNLOAD RIGHT AWAY" },
		{ img: RiLock2Line, title: "SAFE CHECKOUT" },
		{ img: RiCustomerService2Line, title: "CUSTOMER SUPPORT" },
	];

	const subtotal = useMemo(() => {
		return productsAddedToCart?.reduce((total, item) => {
			const price = item?.sale_price || item?.regular_price;
			return price ? total + parseFloat(price) : total;
		}, 0);
	}, [productsAddedToCart]);

	useEffect(() => {
		localStorage.setItem("totalPrice", JSON.stringify(subtotal));
	}, [subtotal]);

	const navigate = useRouter();

	const addCheckoutDetail = useCallback(() => {
		showCart(false);
		setActive(true);
		navigate.push("/checkout");
	}, [navigate, showCart, setActive]);

	return (
		<Drawer
			className="backdrop-blur-[2px] z-[45]"
			anchor="right"
			open={cart}
			onClose={() => showCart(false)}
		>
			<main className="flex flex-col h-full bg-[#fff] py-6 px-4 w-screen md:max-w-[350px] pt-[100px]">
				<nav className="flex justify-between px-2">
					<p className="text-xl cursor-pointer font-medium text-[#171717]">
						Cart{" "}
						<span className="bg-[#F5F5F5] text-[#171717] rounded-full text-center p-[0.4vw] ml-[0.6vw] text-sm">
							{cartCount}
						</span>
					</p>
					<IoIosCloseCircleOutline
						size={25}
						className="cursor-pointer"
						onClick={() => showCart(false)}
					/>
				</nav>
				<div className="w-full my-5 h-full overflow-x-hidden overflow-auto pr-2">
					{productsAddedToCart?.length > 0 ? (
						productsAddedToCart?.map((item, index) => (
							<aside
								className="cursor-default w-full flex items-center py-4 px-2 rounded-md border-b border-[#E5E5E5] gap-2 overflow-hidden bg-[#F8F8F8] group hover:bg-[#FF387A] transition-all"
								key={index}
							>
								{!cartDetail && (
									<img
										src={item?.images?.[0]?.src}
										alt={item?.name}
										className="w-16 h-12 object-scale-down ml-[-10px]"
									/>
								)}

								<section className="flex flex-col justify-between gap-1 w-full">
									<h2 className="font-semibold text-[#171717] group-hover:text-white line-clamp-1">
										{cartDetail ? "" : item?.name?.slice(0, 30)}...
									</h2>
									<div className="flex items-center justify-between mt-1 w-full">
										<p className="font-semibold text-sm group-hover:text-white">
											$
											{cartDetail
												? ""
												: item?.sale_price
												? item?.sale_price
												: item?.regular_price}
										</p>
										{!cartDetail && (
											<RiDeleteBin5Line
												size={18}
												className="cursor-pointer text-[#F87171] group-hover:text-white"
												onClick={() => removeFromCartHandler(index)}
											/>
										)}
									</div>
								</section>
							</aside>
						))
					) : (
						<p className="text-center text-[#171717]">Your cart is empty.</p>
					)}
				</div>
				<footer className="mt-auto mx-2">
					<section className="flex justify-between gap-2 border-b border-b-[#E5E5E5] pb-2">
						{cartData?.map((item, index) => (
							<main
								className="flex flex-col items-center gap-2 mr-2 p-1"
								key={index}
							>
								<span className="p-1 rounded-full border border-[#E5E5E5] bg-[#FAFAFA]">
									<item.img size={20} />
								</span>
								<h2 className="md:text-xs text-sm max-w-[90%] text-center font-bold text-[#171717]">
									{item?.title}
								</h2>
							</main>
						))}
					</section>
					<section className="flex justify-between pt-4">
						<h2 className="font-medium text-base">Subtotal</h2>
						<p className="font-semibold text-[#FF387A] text-lg">
							{cartDetail ? "0" : subtotal.toFixed(2)}$
						</p>
					</section>

					<button
						onClick={addCheckoutDetail}
						className="relative group w-full bg-[#FF387A] text-[#fff] py-3 px-4 rounded-md mt-4 text-xs hover:shadow-md transition-all duration-300"
					>
						Continue to Checkout
						<span className="absolute top-[15%] right-4 w-[30px] h-[25px] overflow-hidden">
							<IoIosArrowRoundForward
								className="transform translate-x-[-20px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300"
								size={25}
							/>
						</span>
					</button>
				</footer>
			</main>
		</Drawer>
	);
};

export default CheckoutDrawer;
