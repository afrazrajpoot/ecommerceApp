import React from "react";
import { FaRegCircleCheck } from "react-icons/fa6";

const Motion = ({ tick, info1, info2, info3, img, index }) => {
	return (
		<main
			className={`lg:flex lg:justify-center lg:flex-row  lg:items-center relative  ${
				img === "/img/m2.png" && "flex-row-reverse"
			}`}
		>
			<article
				className={` flex flex-col gap-[3vw] ${
					img === "/img/m2.png" && "lg:ml-[5vw]"
				}  lg:gap-[1vw] ${img === "/img/m2.png" && "lg:mt-[2vw]"}`}
			>
				<div
					className={`flex items-center gap-2 ${
						index === 0 ? "md:justify-end" : ""
					} ${img === "/img/m2.png" && "lg:ml-[48vw]   xl:ml-[30vw]"}`}
				>
					<FaRegCircleCheck size={20} className="text-[#FF387A]" />
					<p>{info1}</p>
				</div>
				<div
					className={`flex items-center gap-2 ${
						index === 0 ? "md:justify-end" : ""
					} ${img === "/img/m2.png" && "lg:ml-[48vw] xl:ml-[30vw]"}`}
				>
					<FaRegCircleCheck size={20} className="text-[#FF387A]" />

					<p>{info2}</p>
				</div>
				<div
					className={`flex items-center gap-2 ${
						index === 0 ? "md:justify-end" : ""
					} ${img === "/img/m2.png" && "lg:ml-[48vw] xl:ml-[30vw]"}`}
				>
					<FaRegCircleCheck size={20} className="text-[#FF387A]" />

					<p>{info3}</p>
				</div>
			</article>
			<figure
				className={`w-full lg:max-w-[30vw] items-center gap-1 mx-2 my-5 ${
					img === "/img/m2.png" && "lg:absolute lg:top-[-3vw] lg:left-[21vw]"
				}`}
			>
				<img src={img} alt="img" className="w-full" />
			</figure>
		</main>
	);
};

export default Motion;
