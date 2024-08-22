import Footer from "@/app/components/Common/Footer/Footer";
import React from "react";

const page = () => {
	const refundData = [
		{
			info: "If there’s any issues with your pack after activate your code, please message us or check our support page. All refunds are determined by the SonduckFilm team. Unfortunately, our acceptance of refunds can be strict, because our products are digital. So we can’t simply take it back, as you will have it forever.",
		},
		{
			info: "If there’s any issues with installation, please contact us at motionduckhelp@gmail.com, as we will help you get our pack working for you! You may use our free pack before buying.",
		},
	];
	const refundLi = [
		[
			"You no longer need to use the item.",
			"You cannot connect to the Internet to download or install.",
			"You activated your activation code and want a refund for any reason, except clear and unsolvable problems that we cannot help you with.",
			"You do not know how to use After Effects or Premiere Pro.",
			"You do not know how to use our items.",
			"The item was “falsely” promoted.",
			"An Adobe update has made our products no longer work.",
			"You contacted us for support and you did not receive a reply message. Please check your spam box. We always reply to customers.",
			"Asking for a refund for any reason, except for eligible refunds.",
		],
		[
			"You no longer use your subscription.",
			"You no longer use your subscription and forgot to cancel your membership.",
			"You have not used your subscription over any or specific time period.",
			"You were unaware of automatic recurring monthly or annual payments.",
			"Asking for a refund for any reason, except for eligible refunds.",
		],
	];
	return (
		<main className="pt-[50px] bg-[#FAFAFA]">
			<div className="lg:translate-y-[8vw] sm:translate-y-[8vw] translate-y-[25vw]  lg:pb-[15vw] pb-[30vw]">
				<section>
					<h1 className="lg:text-[2vw] text-[6vw] font-bold text-center sm:text-[4vw] ">
						Return and Refunds
					</h1>
					<article className="w-full max-w-[90vw] sm:gap-[5vw] mt-[4vw] flex flex-col gap-[3vw] lg:gap-[1vw] px-[9vw]">
						{refundData?.map((item, index) => (
							<p
								key={index}
								className="lg:text-[1vw] text-[4vw]  w-[85vw] sm:text-[2.5vw]"
							>
								{item.info}
							</p>
						))}
						<p className="lg:text-[1vw] text-[4vw]  w-[85vw] sm:text-[2.5vw]">
							Free 100 Templates for After Effects & Premiere Pro:
							<span className="text-[#FF387A] cursor-pointer ">
								https://www.sonduckfilm.com/tutorials/duck-pack/
							</span>
						</p>
					</article>
				</section>
				<section className=" w-full max-w-[90vw] sm:gap-[5vw] flex flex-col gap-[3vw] lg:gap-[1vw] px-[9vw]">
					<article>
						<h2 className="font-medium lg:text-[1vw] text-[4vw]  w-[85vw] sm:text-[2.5vw] mt-3 mb-1">
							Eligible Pack/Bundle Refunds
						</h2>
						<ul className="list-decimal pl-[2vw]">
							<li className="lg:text-[1vw] text-[4vw]  w-[85vw] sm:text-[2.5vw]">
								There is a clear and unsolvable problem within 30 days of your
								purchase. Proof must be sent that you have followed our support
								instructions.
							</li>
							<li className="lg:text-[1vw] text-[4vw]  w-[85vw] sm:text-[2.5vw]">
								You have bought the same item twice by mistake.
							</li>
						</ul>
					</article>
					<article>
						<h2 className="font-medium lg:text-[1vw] text-[4vw]  w-[85vw] sm:text-[2.5vw] mt-3 mb-1">
							Ineligible Pack/Bundle Refunds
						</h2>
						<ul className="list-decimal pl-[2vw]">
							{refundLi[0]?.map((item, index) => (
								<li
									key={index}
									className="lg:text-[1vw] text-[4vw]  w-[85vw] sm:text-[2.5vw]"
								>
									{item}
								</li>
							))}
						</ul>
					</article>
					<article>
						<h2 className="font-medium lg:text-[1vw] text-[4vw]  w-[85vw] sm:text-[2.5vw] mt-3 mb-1">
							Eligible Pack/Bundle Refunds
						</h2>
						<ul className="list-decimal pl-[2vw]">
							<li className="lg:text-[1vw] text-[4vw]  w-[85vw] sm:text-[2.5vw]">
								There is a clear and unsolvable problem within 3 days of
								activating your Token for the first time. Proof must be sent
								that you have followed our support instructions.
							</li>
						</ul>
					</article>
					<article>
						<h2 className="font-medium lg:text-[1vw] text-[4vw]  w-[85vw] sm:text-[2.5vw] mt-3 mb-1">
							Ineligible Subscription Refunds
						</h2>
						<ul className="list-decimal pl-[2vw]">
							{refundLi[1]?.map((item, index) => (
								<li
									key={index}
									className="lg:text-[1vw] text-[4vw]  w-[85vw] sm:text-[2.5vw]"
								>
									{item}
								</li>
							))}
						</ul>
					</article>
					<p className="lg:text-[1vw] text-[4vw]  w-[85vw] sm:text-[2.5vw]">
						By purchasing from our website, www.sonduckfilm.com you agree to our
						Returns & Refunds policy. We have the right to deny service if a
						user abuses our support or refund policy.
					</p>
				</section>
			</div>
			<footer>
				<Footer />
			</footer>
		</main>
	);
};

export default page;
