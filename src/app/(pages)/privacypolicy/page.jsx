import { privacyPolicyData } from "@/data/data";
import React from "react";
import Footer from "../../components/Common/Footer/Footer";

const page = () => {
	return (
		<main>
			<section className="lg:translate-y-[8vw] translate-y-[25vw] sm:translate-y-[8vw]  lg:pb-[15vw] pb-[30vw]">
				<h1 className="lg:text-[2vw] text-[6vw] font-bold text-center sm:text-[5vw]">
					Privacy Policy
				</h1>
				<p className="text-center mt-[0.6vw] lg:text-[1vw] text-[3vw] sm:text-[2vw]">
					Effective Date: November 28, 2023
				</p>
				<article className=" w-full max-w-[100vw] m-auto mt-[6vw] flex flex-col gap-[3vw] lg:gap-[1vw] sm:gap-[5vw] px-[9vw]">
					{privacyPolicyData?.map((section, index) => (
						<div
							key={index}
							className="w-full max-w-[70vw] flex flex-col gap-[0.3vw] "
						>
							<h2 className="font-medium lg:text-[1vw] text-[4vw]  lg:w-[80vw] w-[80vw] sm:text-[2.5vw]">
								{section.title}
							</h2>
							<p className="lg:text-[1vw] text-[4vw]  lg:w-[80vw] w-[80vw] sm:text-[2.5vw]">
								{section.desc}
							</p>
						</div>
					))}
				</article>
			</section>
			<footer className="translate-y-[1vw]">
				<Footer />
			</footer>
		</main>
	);
};

export default page;
