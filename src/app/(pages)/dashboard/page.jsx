"use client";
import React from "react";
import { profileDetails } from "@/data/data";
import Sidebar from "../../components/Common/Sidebar/Sidebar";
import { useGlobalContext } from "@/context/globalState";
import Link from "next/link";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import Loading from "@/app/components/Common/Loading";
import { Avatar } from "@mui/material";
import { useSession } from "next-auth/react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaStar } from "react-icons/fa";

const OrderDetails = ({ image, title, price, onClick }) => {
	return (
		<main className="flex lg:mt-[1vw] mt-[3vw]">
			<img src={image} alt="img" className="lg:w-[4vw] w-[10vw] sm:w-[8vw]" />
			<section className="ml-[1vw]">
				<p className="lg:text-[0.9vw] text-[4vw] font-medium sm:text-[2.5vw]">
					{title}{" "}
				</p>
				<div className="flex   justify-between w-[50vw] lg:w-[20vw]">
					<p className="text-[3vw] lg:text-[1vw] sm:text-[2vw]"> {price}$ </p>
					<figure className="cursor-pointer" onClick={onClick}>
						<img
							src="/img/download.png"
							alt="download"
							className="w-[4vw] lg:w-[1.5vw] ml-[60vw] lg:ml-[0vw] sm:w-[2vw]"
						/>
					</figure>
				</div>
			</section>
		</main>
	);
};

const page = () => {
	const {
		customerDetails,
		fetchWooCommerceData,
		customerID,
		imediatelyUpdateDownload,
		siderbarImage,
	} = useGlobalContext();
	const session = useSession();
	const [data, setData] = useState([]); // Initialize as an empty array
	const [open, setOpen] = useState(false);
	const [selectedOrder, setSelectedOrder] = useState(null);
	const [loading, setLoading] = useState(false);
	const [image, setImage] = useState();

	const fetchData = async () => {
		try {
			if (customerID && customerID !== null) {
				setLoading(true);
				const orders = await fetchWooCommerceData(
					`wc/v3/orders/?customer=${customerID}`
				);
				setData(orders.data || []); // Ensure data is set correctly
				setLoading(false);
			}
		} catch (err) {
			toast.error("Network fail please try again later", {
				position: "top-right",
				style: { marginTop: 40 },
			});
			setLoading(false);
		}
	};

	const handleOpen = (order) => {
		setSelectedOrder(order);
		setOpen(true);
	};

	const handleClose = () => setOpen(false);

	const handleDownload = (order) => {
		const doc = new jsPDF();
		doc.text("Invoice", 10, 10);
		doc.text(`Order Name: ${order.line_items[0].name}`, 10, 20);
		doc.text(`Price: $${order.line_items[0].price}`, 10, 30);
		doc.text(`Quantity: ${order.line_items[0].quantity}`, 10, 40);
		doc.text(`Subtotal: $${order.line_items[0].subtotal}`, 10, 50);
		doc.text(`Total: $${order.total}`, 10, 60);
		doc.text(
			`Billing Address: ${order.billing.first_name} ${order.billing.last_name}, ${order.billing.address_1}, ${order.billing.address_2}, ${order.billing.city}, ${order.billing.state}, ${order.billing.postcode}, ${order.billing.country}`,
			10,
			70
		);
		doc.text(`Email: ${order.billing.email}`, 10, 80);
		doc.text(`Phone: ${order.billing.phone}`, 10, 90);
		doc.save("invoice.pdf");
	};

	useEffect(() => {
		fetchData();
	}, [customerID, imediatelyUpdateDownload]);

	useEffect(() => {
		const userData = JSON.parse(localStorage.getItem("user"));
		setImage(userData?.img?.img || userData?.img);
	}, [siderbarImage]);

	return (
		<main className="bg-[#FAFAFA] h-[110vh] sm:h-[270vh] lg:h-[110vh]">
			<Sidebar />
			<section className=" rounded-lg w-full lg:max-w-[50vw] max-w-[90vw] translate-y-[5vw] lg:translate-x-[26vw] translate-x-[5vw]">
				<h1 className="font-bold text-[6vw] lg:text-[2vw] lg:ml-[0vw] ml-[5vw] translate-y-[13vw] lg:translate-y-[0.5vw] sm:text-[3vw] sm:translate-y-[5vw] translate-x-[-4vw]  lg:translate-x-0">
					Dashboard
				</h1>
				<section className="grid lg:grid-cols-2 grid-cols-1 w-full gap-[4vw] sm:gap-[0vw] lg:gap-[2vw]">
					<article
						className=" p-[2vw]  bg-white border-[1px] border-[#F5F5F5] mt-[1vw] sm:translate-y-[7vw] translate-y-[15vw]
        lg:translate-y-0 rounded-lg w-[90vw] lg:ml-[0vw] lg:w-[25vw] ml-[1-2vw]"
					>
						<div className="flex flex-col items-center lg:gap-[1vw] ">
							<Avatar className="w-[16vw] h-[16vw] sm:w-[12vw] sm:h-[12vw] lg:w-[6vw] lg:h-[6vw]">
								<img
									src={
										image
											? image
											: session?.data?.user?.image
											? session?.data?.user?.image
											: "/img/accountAvatar.png"
									}
									alt="dashborad photo"
									className="w-full"
								/>
							</Avatar>
							<div>
								<p className="text-center font-bold lg:text-[1vw] text-[4vw] sm:text-[2.5vw] text-[#0F172A]">
									{customerDetails?.username}
								</p>
								<p className="text-center lg:text-[0.9vw] text-[3.5vw] font-medium  text-[#475569] sm:text-[2vw]">
									{customerDetails?.email}
								</p>
							</div>
						</div>
						<div className="flex gap-10 justify-center items-center mt-4">
							<div className="flex gap-[0.3vw] items-center">
								<HiOutlineLocationMarker className="text-[#475569] mb-1" />
								<span className="text-[#475569] lg:text-[1vw] text-[2.5vw] sm:text-[1.5vw] font-medium capitalize">
									{customerDetails?.country}
								</span>
							</div>
							<div
								className="border-[2px] border-[#CBD5E1] bg-[#CBD5E1] rounded-full"
								style={{ width: "0.2vw", height: "0.5vh" }}
							/>
							<div className="flex gap-[0.3vw] items-center">
								<span className="text-[#475569] lg:text-[1vw] text-[2.5vw] sm:text-[1.5vw]">
									Since
								</span>
								<FaStar className="text-[#FDD700] mb-1" />
								<span className="text-[#000929] lg:text-[1vw] text-[2.5vw] sm:text-[1.5vw]">
									{customerDetails?.date_created?.slice(0, 4)}
								</span>
							</div>
						</div>
						<aside>
							{profileDetails?.map((item, index) => (
								<main className="" key={index}>
									<div className="flex justify-between mt-10">
										<p className="text-[#475569] lg:text-[0.9vw] text-[4vw] font-medium sm:text-[2.5vw]">
											{item?.title}
										</p>
										<p className="text-[#000929] lg:text-[0.9vw] text-[3.5vw] font-semibold sm:text-[2vw]">
											{customerDetails?.[item?.name] || item?.value}
										</p>
									</div>
								</main>
							))}
						</aside>
						<div className="flex items-center justify-center gap-5 w-full mt-10">
							<Link href="/accountdetails">
								<button className="text-[#FF387A] hover:text-[#ff387af3] font-bold text-sm">
									Change Password
								</button>
							</Link>
							<Link href="/accountdetails">
								<button className="py-2 px-6 text-sm font-bold hover:border-[#FF387A] hover:text-[#ffff] hover:bg-[#FF387A] text-[#FF387A] border-[1px] border-[#FF387A] rounded-md">
									Edit Profile
								</button>
							</Link>
						</div>
					</article>
					<section>
						<article
							className=" p-[2vw] bg-white border-[1px] border-[#F5F5F5] mt-[1vw] sm:translate-y-[8vw] translate-y-[15vw]
        lg:translate-y-0 rounded-lg lg:w-[30vw] w-[90vw] lg:ml-[0vw] ml-[0.5vw] sm:ml-[0.4vw]"
						>
							<p className="lg:text-[1vw] text-[5vw] font-bold sm:text-[3vw]">
								Recent Orders
							</p>
							{data.length > 0 ? (
								loading ? (
									<Loading />
								) : (
									data.slice(0, 2).map((order, index) => (
										<React.Fragment key={index}>
											<OrderDetails
												image={order?.line_items[0]?.image?.src}
												title={order?.line_items[0].name}
												price={order?.line_items[0].price}
												onClick={() => handleDownload(order)}
											/>
											<div className="border-[1px] border-b-[#EEEEEE] lg:mt-[1.3vw] mt-[8vw]"></div>
										</React.Fragment>
									))
								)
							) : (
								<p className="text-[#FF387A] text-center font-bold lg:text-[1vw] text-[3vw] sm:text-[2.5vw] mt-5">
									No recent orders
								</p>
							)}

							{/*              
              <OrderDetails image={"/img/img1.png"} title={"1500+ Transitions Premiere Pro"} price={"48"} /> */}
							<Link href={"/order"}>
								<button className="py-2 px-6 w-full lg:mt-[1vw] text-[#FF387A] border-[1px] border-[#FF387A] rounded-md mt-[8vw] lg:text-[1vw] text-[3vw] font-bold sm:text-[1.5vw] relative overflow-hidden group">
									<span className="absolute inset-0 bg-[#FF387A] transition-all duration-300 transform translate-x-[-100%] group-hover:translate-x-0"></span>
									<span className="relative z-10 transition-colors duration-300 group-hover:text-white">
										View All
									</span>
								</button>
							</Link>
						</article>
					</section>
				</section>
			</section>
		</main>
	);
};

export default page;
