"use client";
import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { faqCardData, faqData } from "@/data/data";
import Footer from "../../components/Common/Footer/Footer";
import FaqCard from "../../components/Cards/FaqCard";
import Link from "next/link";

export default function DisabledAccordion() {
	const [expanded, setExpanded] = React.useState(false);

	const handleChange = React.useCallback(
		(panel) => (event, isExpanded) => {
			setExpanded(isExpanded ? panel : false);
		},
		[]
	);

	return (
		<main className="bg-[#FAFAFA]">
			<section className="translate-y-[18vw] sm:translate-y-[10vw] lg:translate-y-[5vw] pb-[4vw]">
				<article className="w-full max-w-[80vw] mx-auto mt-10">
					<Link
						href="/faqs"
						className="border-[1px] border-[#FF689A] font-semibold py-2 px-4 rounded-lg text-[#FF689A] text-[3vw] sm:text-[1.5vw] lg:text-[1vw]"
					>
						FAQs
					</Link>
					<h1 className="font-semibold mt-8 text-[5vw] sm:text-[3vw] lg:text-[2vw]">
						Frequently Asked Questions
					</h1>
					<p className="mt-2 text-[3vw] sm:text-[2vw] lg:text-[1vw]">
						We understand that you may have some questions about sunduckfilm. We
						have compiled a list of frequently asked questions to help you get
						the information you need. If you have any other questions, please do
						not hesitate to contact us.
					</p>
				</article>
				<article className="w-full max-w-[80vw] mx-auto flex flex-col gap-5 mt-14">
					{faqData?.map((item, index) => (
						<Accordion
							key={index}
							expanded={expanded === index}
							onChange={handleChange(index)}
							className="rounded-lg shadow-none"
							elevation={0}
							sx={{ "&:before": { height: "0px" } }}
							aria-expanded={expanded === index}
						>
							<AccordionSummary
								expandIcon={expanded === index ? <RemoveIcon /> : <AddIcon />}
								aria-controls={`panel${index}-content`}
								id={`panel${index}-header`}
							>
								<Typography className="font-semibold text-[3vw] sm:text-[2vw] lg:text-[1vw]">
									{item.title}
								</Typography>
							</AccordionSummary>
							<AccordionDetails className="flex flex-col lg:flex-row items-start gap-[1vw]">
								<div className="w-full lg:w-[150vw] max-w-[550px] flex-shrink-0 h-[30vh] lg:h-[40vh]">
									<iframe
										src={item?.src}
										title="YouTube video player"
										frameBorder="0"
										loading="lazy"
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
										referrerPolicy="strict-origin-when-cross-origin"
										allowFullScreen
										className="w-full h-full rounded-xl"
									></iframe>
								</div>
								<Typography className="mt-[2vw] sm:mt-[0.7vw] text-[3vw] lg:text-[1vw]">
									{item.desc}
								</Typography>
							</AccordionDetails>
						</Accordion>
					))}
				</article>
				<article className="bg-white pt-[2vw] pb-[8vw] sm:pb-[6vw] lg:mt-[9vw] mt-[20vw] sm:mt-[5vw]">
					<h2 className="font-bold text-center text-[6vw] sm:text-[3vw] lg:text-[2vw]">
						What they say
					</h2>
					<p className="text-center w-[99vw] sm:w-[50vw] lg:w-[27vw] mx-auto text-[#525252] font-medium mt-5">
						Hear from our satisfied clients and learn how we've helped them take
						their businesses to new heights.
					</p>
					<figure className="flex justify-center mt-[4vw] sm:mt-[4vw]">
						<img src="/img/brands.png" alt="Brand logos" />
					</figure>
					<main className="flex flex-col lg:flex-row sm:flex-row w-full max-w-[65vw] gap-[8vw] lg:gap-[3vw] mx-auto mt-[4vw] sm:mt-[4vw]">
						{faqCardData?.map((item, index) => (
							<FaqCard key={index} {...item} index={index} />
						))}
					</main>
				</article>
			</section>
			<footer className="translate-y-[25vw] sm:translate-y-[5vw] lg:translate-y-[1vw]">
				<Footer />
			</footer>
		</main>
	);
}
