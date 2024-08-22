import React from "react";
import BillingForm from "../../components/authModel/register/BillingForm";
import Sidebar from "../../components/Common/Sidebar/Sidebar";

const page = () => {
	return (
		<main className="bg-[#FAFAFA] h-[110vh] sm:h-[200vh] lg:h-[120vh]">
			<Sidebar />
			<section className="mt-[2vw] rounded-lg w-full lg:max-w-[50vw] max-w-[90vw] translate-y-[5vw] lg:translate-x-[26vw] translate-x-[5vw]">
				<h1 className="font-bold text-[6vw] lg:text-[2vw] lg:ml-[0vw] ml-[5vw] translate-y-[13vw] lg:translate-y-[0.5vw] translate-x-[-4vw]  lg:translate-x-0 sm:text-[3vw] sm:translate-y-[4vw]">
					Billing Address
				</h1>
				<div
					className=" p-[2vw] bg-white border-[1px] border-[#F5F5F5] mt-[1vw] sm:translate-y-[5vw] translate-y-[15vw]
        lg:translate-y-0 rounded-[20px]"
				>
					<BillingForm />
				</div>
			</section>
		</main>
	);
};

export default page;
