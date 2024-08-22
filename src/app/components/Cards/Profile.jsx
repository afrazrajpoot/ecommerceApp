import Image from "next/image";
import React from "react";

const Profile = ({ image, name, title, info }) => {
	return (
		<main className="profile mb-10 bg-[#FFFFFF] h-full min-h-[400px] md:max-h-[50vw] lg:max-h-[30vw] w-full sm:max-w-[45vw] lg:max-w-[22vw] rounded-[5vw] md:rounded-[1vw] p-[5.5vw] md:p-[1.5vw]">
			<Image
				src={image}
				alt="logo"
				width={72}
				height={72}
				className="rounded-full object-cover"
			/>
			<h1 className="text-[5vw] sm:text-[3vw] lg:text-[1vw] mt-[6vw] md:mt-[1vw] text-[#171717] font-extrabold">
				{name}
			</h1>
			<h2 className="text-[4vw] sm:text-[3vw] lg:text-[1vw] mt-1 text-[#171717]">
				{title}
			</h2>
			<p className="text-[4vw] sm:text-[2vw] lg:text-[1vw] mt-[2.5vw] md:mt-[1.5vw] text-[#171717] text-md font-medium w-full lg:max-w-[20vw]">
				{info}
			</p>
		</main>
	);
};

export default Profile;
