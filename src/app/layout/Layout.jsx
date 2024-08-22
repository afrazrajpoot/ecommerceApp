import React from "react";
import Footer from "../../components/authModel/register/Footer";

const Layout = ({ children }) => {
	return (
		<main className="pb-[0vw]">
			{children}
			<Footer />
		</main>
	);
};

export default Layout;
