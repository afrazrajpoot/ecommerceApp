import React from "react";
import Sidebar from "../../components/Common/Sidebar/Sidebar";
import { paymentMethodData } from "@/data/data";
import { Button } from "@mui/material";

const page = () => {
	return (
		<main className="bg-[#FAFAFA]">
			<article className="">
				<Sidebar />
				<div className="absolute top-[20vw] sm:top-[10vw] lg:top-[5vw] lg:left-[30vw] pb-[1vw]">
					<h1 className="font-bold text-[5vw] lg:text-[1.5vw] lg:ml-[0vw] ml-[5vw] sm:text-[3.5vw]">
						Payment Methods
					</h1>
					<div className="bg-white border-[1px] border-[#F5F5F5] rounded-lg p-[2vw] gap-[3vw] mt-[1vw] lg:w-[55vw]  w-[90vw] ml-[5vw] lg:ml-[0vw] lg:h-[89vh] max-h-[200vh] pb-[90vw] sm:pb-[3vw] lg:pb-[2vw]">
						<div className="  grid grid-cols-1 lg:grid-cols-2 sm:grid-cols-2 lg:gap-[2vw] lg:ml-[0.2vw] sm:ml-[-2vw] gap-[3vw]">
							{paymentMethodData?.map((elem, ind) => (
								<div
									key={ind}
									className="bg-[#F8FAFC] grid grid-cols-1  gap-[3.5vw] lg:gap-[0.7vw] lg:p-[1vw] lg:w-[25vw] sm:w-[40vw] w-[80vw] ml-[2.5vw] lg:ml-[-1vw] p-[4vw] sm:p-[2vw]"
								>
									{elem.img ? (
										<elem.img
											size={30}
											className={`${
												elem.title === "Stripe"
													? "text-[#635BFF]"
													: "text-[#101827]"
											}`}
										/>
									) : (
										<img src={elem?.icon} alt="icon" className="" />
									)}
									<h1 className="font-bold text-[4vw] lg:text-[0.8vw] sm:text-[3vw]">
										{" "}
										{elem.title}
									</h1>
									<p className="lg:text-[0.7vw] text-[3vw] text-[#64748B] sm:text-[2vw]">
										{" "}
										{elem.desc}
									</p>
								</div>
							))}
						</div>
						<div className="bg-[#F8FAFC] p-[1vw] lg:w-[25vw] lg:h-[20vh] border-[1px] border-dashed border-[#E2E8F0] w-[80vw] h-[20vh] ml-[2.4vw] lg:ml-[0vw] mt-[3vw] sm:w-[40vw] sm:ml-[1vw]">
							<div className="flex flex-col justify-center items-center h-full w-full">
								<img src="/img/wallet.png" alt="" />
								<p className="font-bold text-[0.8vw] text-[#64748B]">
									Add wallet
								</p>
							</div>
						</div>
						<div className="flex gap-5 sm:ml-[2vw] ml-[2vw]  lg:ml-[0.2vw] w-full">
							<Button
								type="submit"
								size="small"
								className="capitalize w-full mt-4 text-[4vw] lg:text-[0.8vw] bg-[#FF387A] sm:text-[1.5vw] lg:max-w-[10vw] max-w-[38vw] lg:p-[0.5vw] p-[2vw] hover:bg-[#FF387A] text-white sm:w-[15vw] sm:p-[1vw]"
							>
								save changes
							</Button>
							<Button
								variant="outlined"
								size="small"
								className="capitalize w-full mt-4 lg:text-[0.8vw] text-[4vw] lg:max-w-[10vw] sm:text-[1.5vw] max-w-[38vw] lg:p-[0.5vw] p-[2vw]  text-[#FF387A] hover:border-[#FF387A] sm:w-[15vw] font-bold sm:p-[1vw] border-[#FF387A]"
							>
								Cancel
							</Button>
						</div>
					</div>
				</div>
			</article>
		</main>
	);
};

export default page;
