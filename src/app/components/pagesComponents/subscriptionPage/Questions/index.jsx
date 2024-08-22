import React from "react";

const Questions = () => {
	const questions = [
		{
			title: "Does MotionDuck Work For MAC & PC?",
			info: "Yes, MotionDuck and every template will work on Mac and PC computers. The install process is simple and easy.",
		},
		{
			title: "Licensing",
			info: "You may use all templates on any project you work on. Our license allows you to use MotionDuck templates on client, commercial, or personal projects, as many times as you like.",
		},
		{
			title: "Can I Unsubscribe Anytime?",
			info: "You may unsubscribe at any moment by going to your account on sonduckfilm.com. Under the Subscriptions tab, click on cancel next to Action.",
		},
		{
			title: "Customer Support",
			info: "If you have any questions or need any help with MotionDuck, we want to help you! You can visit our support page for a quick FAQ or you can email us at motionduckhelp@gmail.com.",
		},
	];

	return (
		<main className="w-full pt-16 pb-20 max-w-[80vw] mx-auto">
			<h1 className="text-[5vw] md:text-[2vw] text-[#ffff] font-semibold text-center w-full">
				Frequently asked questions
			</h1>
			<section className="flex flex-col md:flex-row items-start w-full mt-14">
				<div className="w-full md:max-w-[30vw]">
					<h2 className="flex flex-col text-[4.4vw] md:text-[1.4vw] text-[#ffff] font-extrabold mb-4">
						<span className="leading-6"> Frequently asked </span>{" "}
						<span> questions </span>
					</h2>
					<p className="text-[4vw] md:text-[1vw] text-[#D4D4D4] w-full md:max-w-[25vw]">
						Can’t find the answer you’re looking for? Reach out to our{" "}
						<span className="text-[#FF387A]">customer support</span> team.
					</p>
				</div>
				<div className="w-full md:max-w-[50vw]">
					{questions?.map((question, i) => (
						<main key={i} className="first:mt-0 mt-10">
							<h2 className="text-[4.2vw] md:text-[1.2vw] text-[#ffff] font-medium">
								{question?.title}
							</h2>
							<p className="text-[4vw] md:text-[1vw] mt-[0.5vw] text-[#D4D4D4] w-full ">
								{question?.info}
							</p>
						</main>
					))}
				</div>
			</section>
		</main>
	);
};

export default Questions;
