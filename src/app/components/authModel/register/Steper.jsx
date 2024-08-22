"use client";
import * as React from "react";
import { usePathname } from "next/navigation";
import { RiHome6Line } from "react-icons/ri";
import { TbCreditCard } from "react-icons/tb";
import { LuClipboardList } from "react-icons/lu";

const steps = [
	{ label: "Detail", icon: RiHome6Line, path: "/checkout" },
	{ label: "Payment Method", icon: TbCreditCard, path: "/payment" },
	{ label: "Review", icon: LuClipboardList, path: "/review" },
];

const Steper = () => {
	const path = usePathname();
	const currentIndex = steps.findIndex((item) => item.path === path);
	return (
		<div className="flex justify-between w-full ml-[10vw] gap-5 md:gap-[150px] md:max-w-[90%] lg:max-w-[70%] relative overflow-hidden">
			<span className="border-gray-200 border-dashed border-t absolute w-[90vw] z-[0] top-5 right-[6px]"></span>
			{steps.map((item, index) => (
				<div className="flex flex-col items-center gap-2 z-10">
					<span
						className={`p-2 rounded-full border  ${
							index <= currentIndex
								? "bg-[#FF387A] text-white border-[#FF387A]"
								: "bg-white text-[#171717] border-[#D4D4D4]"
						}`}
					>
						<item.icon size={20} />
					</span>
					<span className="text-sm font-semibold text-center">
						{item.label}
					</span>
				</div>
			))}
		</div>
	);
};

export default Steper;
