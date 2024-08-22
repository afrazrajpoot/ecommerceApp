"use client";
import { useGlobalContext } from "@/context/globalState";
import { menueData, otherData } from "@/data/data";
import { Avatar } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { HiOutlineLogout } from "react-icons/hi";

const Sidebar = () => {
	const session = useSession();
	const [image, setImage] = useState();
	const { customerDetails, siderbarImage } = useGlobalContext();
	const navigate = useRouter();
	const path = usePathname();
	const handleLogout = async () => {
		if (session?.data) {
			await signOut("google");
			navigate.push("/");
		}
		localStorage.removeItem("user");
		localStorage.removeItem("customerID");
		localStorage.removeItem("subscriptionId");
		window.location.href = "/";
	};

	useEffect(() => {
		const userData = JSON.parse(localStorage.getItem("user"));
		setImage(userData?.img?.img || userData?.img);
	}, [siderbarImage]);

	return (
		<aside className="fixed translate-x-[5vw] top-[3vw] hidden lg:block overflow-y-auto h-screen w-full max-w-[20vw] lg:max-w-[17vw] bg-white border-[1px] border-[#F1F5F9]">
			<div className="flex items-start gap-[0.4vw] px-[1vw] my-[1.5vw] py-[1.5vw] border-b border-[#F1F5F9] ">
				<Avatar className="h-9 w-9">
					{session.data?.user?.image ? (
						<img
							src={session.data.user.image}
							alt="user"
							className="w-[3vw] h-[3vw] object-cover rounded-full"
						/>
					) : (
						image && (
							<img
								src={image}
								alt="user"
								className="w-[3vw] h-[3vw] object-cover rounded-full"
							/>
						)
					)}
				</Avatar>
				<div>
					<p className="font-bold text-sm">{customerDetails?.username}</p>
					<p className="text-[#64748B] text-xs">{customerDetails?.email}</p>
				</div>
			</div>
			<div className="flex flex-col gap-5 px-[1vw] pb-[1vw]">
				<div className="flex flex-col gap-[1vw]">
					<p className="font-bold lg:text-[0.9vw] sm:text-[1.5vw] text-[2.5vw] text-[#334155]">
						Menu
					</p>
					<div className="flex flex-col gap-2 ml-[1vw]">
						{menueData?.map((item, index) => (
							<Link
								href={item.link}
								key={index}
								className={`flex items-center border hover:bg-[#F8FAFC] p-[0.5vw] ${
									path === item.link
										? "border-[#E2E8F0] bg-[#F8FAFC]"
										: "border-transparent"
								} rounded-md gap-[0.4vw]`}
							>
								<item.icon className="text-[#5B6676]" />
								<p className="lg:text-[0.9vw] text-[2.5vw] sm:text-[1vw] text-[#334155]">
									{item.title}
								</p>
							</Link>
						))}
					</div>
				</div>
				<div className="flex flex-col gap-[1vw]">
					<p className="font-bold lg:text-[0.9vw] sm:text-[1.5vw] text-[#334155]">
						Other Options
					</p>
					<div className="flex flex-col gap-2 ml-[1vw]">
						{otherData?.map((item, index) => (
							<Link
								href={item.link}
								key={index}
								className={`flex items-center border hover:bg-[#F8FAFC] p-[0.5vw] ${
									path === item.link
										? "border-[#E2E8F0] bg-[#F8FAFC]"
										: "border-transparent"
								} rounded-md gap-[0.4vw]`}
							>
								<item.icon className="text-[#5B6676]" />
								<p
									className={`text-[0.9vw] text-[#334155] ${
										index === 2 && "text-[#ED544E]"
									}`}
								>
									{item.title}
								</p>
							</Link>
						))}
						<button
							onClick={handleLogout}
							className="flex items-center hover:bg-[#F8FAFC] rounded-md gap-[0.4vw] p-[0.5vw] text-red-500"
						>
							<HiOutlineLogout size={18} />
							Logout
						</button>
					</div>
				</div>
			</div>
		</aside>
	);
};

export default Sidebar;
