"use client";

import React, { useState } from "react";

const MotionDuck = () => {
	const [playVideo, setPlayVideo] = useState(false);
	const videoUrl = "https://www.youtube.com/embed/vqIt9nC7wFo";

	const handlePlayVideo = () => {
		setPlayVideo(true);
	};

	return (
		<main className="w-full bg-[#ffff] md:h-[20vw] lg:h-[16vw] p-[2vw] rounded-[2vw] md:rounded-[0.6vw] shadow-md flex flex-col md:flex-row items-center justify-between overflow-hidden">
			<img
				src="/img/duck_bg.png"
				alt="duck_bg"
				className="absolute top-0 left-0 w-full h-full object-cover"
			/>
			<section className="p-[2vw] z-30">
				<h1 className="text-[5.5vw] md:text-[2.5vw] text-black font-bold">
					What is MotionDucks
				</h1>
				<p className="text-[4vw] md:text-[2vw] lg:text-[1vw] text-[#171717] mt-[1vw] font-semibold">
					25,5000+ Assets
				</p>
				<button
					onClick={handlePlayVideo}
					className="bg-[#FFFF] mt-[8vw] md:mt-[1vw] border-[1px] border-[#171717] text-[4vw] md:text-[2vw] lg:text-[1vw] p-[2vw] md:p-[0.9vw] rounded-md w-full max-w-[30vw] md:max-w-[15vw] lg:max-w-[10vw] text-center relative overflow-hidden group"
					>
					<span className="absolute inset-0 bg-[#171717] transition-all duration-300 transform translate-x-[-100%] group-hover:translate-x-0"></span>
					<span className="relative z-10 text-[#171717] transition-colors duration-300 group-hover:text-[#FFFF]">
						Play Video
					</span>
				</button>
			</section>
			<section className="p-[2vw] w-full md:max-w-[36vw] mt-[2.5vw] z-40">
				<iframe
					className="rounded-xl w-full h-[45vw] md:h-[19vw] lg:h-[15vw] md:rounded-t-[0.6vw]"
					src={playVideo ? `${videoUrl}?autoplay=1` : videoUrl}
					title="YouTube video player"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					referrerPolicy="strict-origin-when-cross-origin"
					allowFullScreen
				/>
			</section>
		</main>
	);
};

export default MotionDuck;
