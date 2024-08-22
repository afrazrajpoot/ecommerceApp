import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { AiOutlinePieChart } from "react-icons/ai";
import { RiShoppingBasketLine } from "react-icons/ri";
import { RxLayers } from "react-icons/rx";
import { TbMoneybag } from "react-icons/tb";
import { TbClipboardText } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { RiLock2Line } from "react-icons/ri";
import { RiCustomerService2Line } from "react-icons/ri";
import { RiDownloadCloud2Line } from "react-icons/ri";
import { BsStripe } from "react-icons/bs";
import { FaCcApplePay } from "react-icons/fa";

export const formData = [
	{
		label: "Full Name",
		name: "fullName",
		type: "text",
		placeholder: "e.g San Andreas",
		pc: "email",

		rules: {
			required: "Full name is required",
			minLength: {
				value: 3,
				message: "Full name must be at least 3 characters long",
			},
		},
	},
	{
		label: "Email address",
		name: "email",
		type: "email",
		placeholder: "e.g sanandreas@gmail.com",
		pc: "email",
		rules: {
			required: "Email is required",
			pattern: {
				value: /^\S+@\S+$/i,
				message: "Enter a valid email address",
			},
		},
	},
	{
		label: "Create Password",
		name: "password",
		type: "password",
		placeholder: "Must be at least 8 characters",
		pc: "email",

		rules: {
			required: "Password is required",
			minLength: {
				value: 8,
				message: "Password must be at least 8 characters long",
			},
		},
	},
];
export const loginFormData = [
	{
		label: "Email address",
		name: "email",
		type: "email",
		placeholder: "e.g sanandreas@gmail.com",
		pc: "email",
		rules: {
			required: "Email is required",
			pattern: {
				value: /^\S+@\S+$/i,
				message: "Enter a valid email address",
			},
		},
	},
	{
		label: "Create Password",
		name: "password",
		type: "password",
		placeholder: "Must be at least 8 characters",
		pc: "email",

		rules: {
			required: "Password is required",
			minLength: {
				value: 8,
				message: "Password must be at least 8 characters long",
			},
		},
	},
];

export const forgetForm = [
	{
		label: "Email address",
		name: "email",
		type: "email",
		placeholder: "e.g sanandreas@gmail.com",
		pc: "email",
		rules: {
			required: "Email is required",
			pattern: {
				value: /^\S+@\S+$/i,
				message: "Enter a valid email address",
			},
		},
	},
];
export const resetForm = [
	{
		label: "New password",
		name: "newPassword",
		type: "password",
		placeholder: "Must be at least 8 characters",
		pc: "email",

		rules: {
			required: "Password is required",
			minLength: {
				value: 8,
				message: "Password must be at least 8 characters long",
			},
		},
	},
	{
		label: "Confirm Password",
		name: "oldPassword",
		type: "password",
		placeholder: "Must be at least 8 characters",
		pc: "email",

		rules: {
			required: "Password is required",
			minLength: {
				value: 8,
				message: "Password must be at least 8 characters long",
			},
		},
	},
];
export const headerData = [
	{
		title: "store",
		link: "/store",
	},
	{
		title: "tutorials",
		link: "/latestarticle",
	},
	{
		title: "FAQs",
		link: "/faqs",
	},
];
export const menueData = [
	{
		title: "Dashboards",
		icon: RxDashboard,
		link: "/dashboard",
	},
	{
		title: "Orders",
		icon: AiOutlinePieChart,
		link: "/order",
	},
	{
		title: "Subscriptions",
		icon: RiShoppingBasketLine,
		link: "/subscriptions",
	},
	{
		title: "Downloads",
		icon: RxLayers,
		link: "/downloads",
	},
	{
		title: "Address",
		icon: TbMoneybag,
		link: "/billing",
	},
	{
		title: "Payment methods",
		icon: TbClipboardText,
		link: "/paymentmethod",
	},
];
export const otherData = [
	{
		title: "Account details",
		icon: IoSettingsOutline,
		link: "/accountdetails",
	},
	{
		title: "VAT Number",
		icon: LiaChalkboardTeacherSolid,
		link: "/vatnumber",
	},
	// {
	//   title: "Logout",
	//   icon: "/img/logoutIcon.png",
	//   link: "/",
	// },
];
export const accoutForm = [
	{
		label: "Email address",
		name: "email",
		type: "email",
		placeholder: "e.g sanandreas@gmail.com",
	},
	{
		label: "Display Name",
		name: "username",
		type: "text",
		placeholder: "e.g San Andreas",
	},
];
export const accountForm2 = [
	{
		label: "Phone number",
		name: "phone",
		type: "text",
		placeholder: "e.g San Andreas",
		rules: {
			// required: "phone is required",
			minLength: {
				value: 9,
				message: "phone must be at least 9 characters long",
			},
		},
	},
	{
		label: "Country",
		name: "country",
		type: "text",
		placeholder: "e.g San Andreas",
		pc: "email",

		rules: {
			// required: "country is required",
			minLength: {
				value: 3,
				message: "country must be a valid country",
			},
		},
	},
	{
		label: "Address",
		name: "address1",
		type: "text",
		placeholder: "e.g San Andreas",
		pc: "email",

		rules: {
			// required: "address is required",
			minLength: {
				value: 10,
				message: "address must be at least 10 characters long",
			},
		},
	},
];
export const checkoutFormData = [
	{
		label: "Your name",
		name: "username",
		type: "text",
		placeholder: "e.g San Andreas",
		pc: "email",

		rules: {
			required: "Full name is required",
			minLength: {
				value: 3,
				message: "Full name must be at least 3 characters long",
			},
		},
	},
	{
		label: "Phone number",
		name: "phone",
		value: "+62 888 999 1222",
		type: "text",
		placeholder: "e.g San Andreas",
		pc: "email",

		rules: {
			required: "Full name is required",
			minLength: {
				value: 3,
				message: "Full name must be at least 3 characters long",
			},
		},
	},
	{
		label: "Country",
		name: "country",
		value: "United Kingdom",
		type: "text",
		placeholder: "e.g San Andreas",
		pc: "email",

		rules: {
			required: "Full name is required",
			minLength: {
				value: 3,
				message: "Full name must be at least 3 characters long",
			},
		},
	},
	{
		label: "Address",
		name: "address1",
		value: "Malang, Sronowagen, East Java, Indonesia",
		type: "text",
		placeholder: "e.g San Andreas",
		pc: "email",

		rules: {
			required: "Full name is required",
			minLength: {
				value: 3,
				message: "Full name must be at least 3 characters long",
			},
		},
	},
];
export const createPasswordForm = [
	{
		label: "Old Password",
		name: "oldPassword",
		type: "password",
		placeholder: "Must be at least 8 characters",
		pc: "email",

		rules: {
			required: "Password is required",
			minLength: {
				value: 8,
				message: "Password must be at least 8 characters long",
			},
		},
	},
	{
		label: "New Password",
		name: "newPassword",
		type: "password",
		placeholder: "Must be at least 8 characters",
		pc: "email",

		rules: {
			required: "Password is required",
			minLength: {
				value: 8,
				message: "Password must be at least 8 characters long",
			},
		},
	},
	{
		label: "Confirm Password",
		name: "confirmPassword",
		type: "password",
		placeholder: "Must be at least 8 characters",
		pc: "email",

		rules: {
			required: "Password is required",
			minLength: {
				value: 8,
				message: "Password must be at least 8 characters long",
			},
		},
	},
];
export const paymentMethodData = [
	{
		icon: "/img/skype.png",
		img: BsStripe,
		title: "Stripe",
		desc: "Offers payment processing software for e-commerce websites and mobile applications.",
	},
	{
		icon: "/img/viza.png",
		title: "Stripe",
		desc: "Offers payment processing software for e-commerce websites and mobile applications.",
	},
	{
		icon: "/img/payPal.png",
		title: "Paypal",
		desc: "Offers payment processing software for e-commerce websites and mobile applications.",
	},
	{
		icon: "/img/apple.png",
		img: FaCcApplePay,
		title: "Apple pay",
		desc: "Offers payment processing software for e-commerce websites and mobile applications.",
	},
];
export const billingAddressFrom = [
	{
		label: "Email ",
		name: "email",
		type: "email",
		placeholder: "e.g sanandreas@gmail.com",
		pc: "email",
		rules: {
			required: "Email is required",
			pattern: {
				value: /^\S+@\S+$/i,
				message: "Enter a valid email address",
			},
		},
	},
	{
		label: "Your Name",
		name: "username",
		type: "text",
		placeholder: "e.g San Andreas",
		pc: "email",

		rules: {
			required: "Full name is required",
			minLength: {
				value: 3,
				message: "Full name must be at least 3 characters long",
			},
		},
	},
	{
		label: "Phone number",
		name: "phone",
		type: "text",
		placeholder: "e.g San Andreas",
		pc: "email",

		rules: {
			required: "Phone number is required",
			minLength: {
				value: 3,
				message: "Phone number must be at least 3 characters long",
			},
		},
	},
	{
		label: "Country",
		name: "country",
		type: "text",
		placeholder: "e.g San Andreas",
		pc: "email",

		rules: {
			required: "Full name is required",
			minLength: {
				value: 3,
				message: "Full name must be at least 3 characters long",
			},
		},
	},
	{
		label: "Address",
		name: "address1",
		type: "text",
		placeholder: "e.g San Andreas",
		pc: "email",

		rules: {
			required: "Full name is required",
			minLength: {
				value: 3,
				message: "Full name must be at least 3 characters long",
			},
		},
	},
];
export const footerLists = [
	{
		title: "Products",
		list: [
			{ title: "After Effect", path: `/store?query=After Effects` },
			{ title: "Premier Pro", path: `/store?query=Premiere Pro` },
		],
	},
	{
		title: "Links",
		list: [
			{ title: "Store", path: "/store" },
			{ title: "Tutorials", path: "tutorials" },
			{ title: "FAQs", path: "/faqs" },
			// { title: "Affiliate", path: "/affiliate" },
			{ title: "Returns & Refunds", path: "/refunds" },
			// { title: "Licences", path: "/licenses" },
		],
	},
];

export const socialMediaLinks = [
	{
		img: FaFacebookF,
		path: "https://www.facebook.com/sonduckfilm/",
	},
	{
		img: FaLinkedinIn,
		path: "https://www.linkedin.com/company/sonduck-llc",
	},
	{
		img: FaTwitter,
		path: "https://x.com/SonduckFilm",
	},
	{
		img: FaYoutube,
		path: "https://www.youtube.com/user/SonduckFilm",
	},
	{
		img: FaInstagram,
		path: "https://www.instagram.com/sonduckfilm/",
	},
];
export const summaryDetails = [
	{
		title: "1500+ Transitions Premiere Pro",
		desc: "$48.00",
	},
	{
		title: "100+ Transitions Premiere Pro",
		desc: "$48.00",
	},
];
export const summaryOptions = [
	{
		img: RiDownloadCloud2Line,
		title: "DOWNLOAD RIGHT AWAY",
	},
	{
		img: RiLock2Line,
		title: "SAFE CHECKOUT",
	},
	{
		img: RiCustomerService2Line,
		title: "CUSTOMER SUPPORT",
	},
];
export const profileDetails = [
	{
		title: "Address",
		name: "address1",
	},
	{
		title: "Zip Code",
		name: "postcode",
	},
	{
		title: "Currency",
		name: "USD",
		value: "USD",
	},
];
export const featurePack = [
	{
		image: "/img/card1.png",
		actualPrice: "48",
		discountedPrice: "60",
		title: "1500+ Transitions Premiere Pro",
	},
	{
		image: "/img/card2.png",
		actualPrice: "43",
		discountedPrice: "46",
		title: "1500+ Transitions Premiere Pro",
	},
];
export const privacyPolicyData = [
	{
		title: "Information We Collect",
		desc: "We collect various types of information from you when you use our website. This may include personal information such as your name, email address, and phone number. We may also collect non-personal information such as your IP address, browser type, and operating system.",
	},
	{
		title: "How We Use Your Information",
		desc: "We may use your personal information to contact you, provide services to you, and to improve our website. We may also use your non-personal information to improve our website, monitor our website usage, and analyze trends.",
	},
	{
		title: "Disclosure of Your Information",
		desc: "We may share your personal information with third-party service providers who help us operate our website, provide our services, and fulfill your requests. We may also share your information when required by law or when we believe that disclosure is necessary to protect our rights or the rights of others.",
	},
	{
		title: "Security of Your Information",
		desc: "We take reasonable measures to protect your personal information from unauthorized access, disclosure, or misuse. However, we cannot guarantee the security of your information transmitted through the internet.",
	},
	{
		title: "Children’s Privacy",
		desc: "Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us and we will remove the information.",
	},
	{
		title: "Contact Us",
		desc: "If you have any questions about this Privacy Policy or our practices, please contact us at [Business Agency Contact Information].",
	},
];
export const termAndConditionData = [
	{
		title: "Services",
		desc: 'Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the website (the "Service") operated by [company name]. Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service. By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.',
	},
	{
		title: "Accounts",
		desc: "When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service. You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service. You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.",
	},
	{
		title: "Intellectual Property",
		desc: "The Service and its original content, features, and functionality are and will remain the exclusive property of [company name] and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of [company name].",
	},
	{
		title: "Links To Other Web Sites",
		desc: "Our Service may contain links to third-party web sites or services that are not owned or controlled by [company name]. [company name] has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party web sites or services. You further acknowledge and agree that [company name] shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods or services available on or through any such web sites or services.",
	},
	{
		title: "Changes",
		desc: "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.",
	},
];
export const articleInfo = [
	{
		desc: "Consider your needs. What are your biggest financial risks? What would happen if you lost your job, got sick, or had a car accident? Once you know your biggest risks, you can start to think about what kind of Motion Graphic you need",
	},
	{
		desc: "Do your research. There are many different types of Motion Graphic available, and each one has its own pros and cons. It's important to do your research and understand the different options before you make a decision.",
	},
	{
		desc: "Get quotes from multiple companies. Once you know what kind of Motion Graphic you need, get quotes from multiple companies. This will help you compare prices and coverage.",
	},
	{
		desc: "Read the fine print. Before you sign any Motion Graphic policy, be sure to read the fine print. This is where you'll find information about things like deductibles, copays, and exclusions.",
	},
	{
		desc: "Ask questions. If you have any questions about Motion Graphic, don't be afraid to ask your Motion Graphic agent. They should be able to answer all of your questions and help you choose the right policy for you.'",
	},
];
export const articleInfo2 = [
	{
		desc: "Consider your budget: Motion Graphic can be expensive, so it's important to factor in your budget when you're making a decision.",
	},
	{
		desc: " Think about your lifestyle: If you have a high-risk lifestyle, you may need to purchase more Motion Graphic. For example, if you drive a lot, you may need to purchase more auto Motion Graphic.",
	},
	{
		desc: "  Talk to your family: If you have a family, you'll need to consider their needs when you're choosing Motion Graphic. For example, you may want to purchase life Motion Graphic to protect your family if you die..",
	},
	{
		desc: "   Review your Motion Graphic regularly: Your needs may change over time, so it's important to review your Motion Graphic regularly. This will help you make sure that you have the right coverage in place.'",
	},
];
export const articleInfo3 = [
	{
		desc: " Auto Motion Graphic: This type of Motion Graphic protects you financially if you are involved in a car accident.",
	},
	{
		desc: " Homeowners Motion Graphic: This type of Motion Graphic protects your home and belongings from damage caused by fire, theft, and other disasters.",
	},
	{
		desc: " Life Motion Graphic: This type of Motion Graphic provides financial support to your loved ones if you die.",
	},
	{
		desc: " Health Motion Graphic: This type of Motion Graphic helps pay for your medical expenses if you get sick or injured.",
	},
	{
		desc: " Disability Motion Graphic: This type of Motion Graphic provides income if you become disabled and unable to work.",
	},
	{
		desc: "Business Motion Graphic: This type of Motion Graphic protects your business from financial losses due to things like fire, theft, and lawsuits.",
	},
];
export const cardData = [
	{
		img: "/img/graphicsImg.png",
		title: "Make Powerful Motion Graphics in After Effects",
		date: "Sep 31 , 2023",
	},
	{
		img: "/img/graphicsImg2.png",
		title: "Make Powerful Motion Graphics in After Effects",
		date: "Sep 31 , 2023",
	},
	{
		img: "/img/graphicsImg3.png",
		title: "Make Powerful Motion Graphics in After Effects",
		date: "Sep 31 , 2023",
	},
];
export const downloadData = [
	{
		img: "/img/img.png",
		desc: "1500+ Transitions Premiere Pro",
	},
	{
		img: "/img/Img (1).png",
		desc: "1500+ Transitions Premiere Pro",
	},
	{
		img: "/img/Img (2).png",
		desc: "1500+ Transitions Premiere Pro",
	},
];

export const categoriesData = [
	{
		title: "Davinci Resolve",
		desc: "(8)",
	},
	{
		title: "After Effects",
		desc: "(2)",
	},
	{
		title: "Graphic Design",
		desc: "(24)",
	},
	{
		title: "Filmmaking",
		desc: "(12)",
	},
];
export const orderData = [
	{
		img: "/img/dashboardImg.png",
		desc: "1500+ Transitions Premiere Pro",
		price: "48$",
		invoiceText: "View Invoice",
		downloadImg: "/img/download.png",
	},
	{
		img: "/img/img1.png",
		desc: "1500+ Transitions Premiere Pro",
		price: "48$",
		invoiceText: "View Invoice",
		downloadImg: "/img/download.png",
	},
];
export const latestArticledata = [
	{
		img: "/img/latest1.png",
		title: "Make Powerful Motion Graphics in After Effects",
		date: "Sep 31 , 2023",
		desc: "Consider your needs. What are your biggest financial risks? What would happen if you lost your job, got sick, or had a car accident? Once you know your biggest risks, you can start to think about what kind of Motion Graphic you need",
	},
	{
		img: "/img/latest2.png",
		title: "Make Simple Cinematic 3D Visuals in After Effects",
		date: "Sep 31 , 2023",
		desc: "Consider your needs. What are your biggest financial risks? What would happen if you lost your job, got sick, or had a car accident? Once you know your biggest risks, you can start to think about what kind of Motion Graphic you need",
	},
	{
		img: "/img/latest3.png",
		title: "The Best Motion Graphic Texture & Color in After Effects",
		date: "Sep 31 , 2023",
		desc: "Consider your needs. What are your biggest financial risks? What would happen if you lost your job, got sick, or had a car accident? Once you know your biggest risks, you can start to think about what kind of Motion Graphic you need",
	},
	{
		img: "/img/latest4.png",
		title: "Make Any After Effects Project Cinematic in Seconds",
		date: "Sep 31 , 2023",
		desc: "Consider your needs. What are your biggest financial risks? What would happen if you lost your job, got sick, or had a car accident? Once you know your biggest risks, you can start to think about what kind of Motion Graphic you need",
	},
	{
		img: "/img/latest5.png",
		title: "Make Hyper Visual Motion Graphics in After Effects",
		date: "Sep 31 , 2023",
		desc: "Consider your needs. What are your biggest financial risks? What would happen if you lost your job, got sick, or had a car accident? Once you know your biggest risks, you can start to think about what kind of Motion Graphic you need",
	},
	{
		img: "/img/latest6.png",
		title: "Create Hyper Cinematic 3D Worlds in After Effects",
		date: "Sep 31 , 2023",
		desc: "Consider your needs. What are your biggest financial risks? What would happen if you lost your job, got sick, or had a car accident? Once you know your biggest risks, you can start to think about what kind of Motion Graphic you need",
	},
];
export const faqData = [
	{
		title: "What is Sonduckfilm Web?",
		src: "https://www.youtube.com/embed/MOQs3TVrZrQ?si=ty576DljzrXBJShI",
		desc: "Sonduckfilm Web is a website that offers a variety of UI kits, templates, and design resources for web developers and designers. They have a wide variety of templates to choose from, including templates for landing pages, websites, web applications, and more. They also offer premium features, such as the ability to export your designs in high resolution, the ability to add custom fonts and colors, and the ability to collaborate with other designers.",
	},
	{
		title: "How much does Sonduckfilm Web cost?",
		src: "https://www.youtube.com/embed/ItNoHd8tqi8?si=WGxKLrlcLh5-avwL",
		desc: "To use the templates, simply download the template files from the Sonduckfilm Web website and import them into your design software. From there, you can customize the templates to fit your specific needs by adding your own text, images, and other design elements.",
	},
	{
		title: "What are the benefits of using Sonduckfilm Web?",
		src: "https://www.youtube.com/embed/dy_z4wYxva4?si=vACijkH8994gGB-x",
		desc: "To use the templates, simply download the template files from the Sonduckfilm Web website and import them into your design software. From there, you can customize the templates to fit your specific needs by adding your own text, images, and other design elements.",
	},
	{
		title: "What are the drawbacks of using Sonduckfilm Web?",
		src: "https://www.youtube.com/embed/3gV3TYpgoFM?si=o-0PHSic7S5RXSNm",
		desc: "To use the templates, simply download the template files from the Sonduckfilm Web website and import them into your design software. From there, you can customize the templates to fit your specific needs by adding your own text, images, and other design elements.",
	},
	{
		title: "Is Sonduckfilm Web a good resource for beginners?",
		src: "https://www.youtube.com/embed/gkWrIcFQcNc?si=P7lAjKF0FryvHC2M",
		desc: "To use the templates, simply download the template files from the Sonduckfilm Web website and import them into your design software. From there, you can customize the templates to fit your specific needs by adding your own text, images, and other design elements.",
	},
	{
		title: "Is Sonduckfilm Web a good resource for experienced designers?",
		src: "https://www.youtube.com/embed/MOQs3TVrZrQ?si=ty576DljzrXBJShI",
		desc: "To use the templates, simply download the template files from the Sonduckfilm Web website and import them into your design software. From there, you can customize the templates to fit your specific needs by adding your own text, images, and other design elements.",
	},
	{
		title: "How do I get started with Sonduckfilm Web?",
		src: "https://www.youtube.com/embed/MOQs3TVrZrQ?si=ty576DljzrXBJShI",
		desc: "To use the templates, simply download the template files from the Sonduckfilm Web website and import them into your design software. From there, you can customize the templates to fit your specific needs by adding your own text, images, and other design elements.",
	},

	// Add more items as needed
];
export const faqCardData = [
	{
		img: "/img/quotation.png",
		desc: "The template company handled everything quickly and efficiently, and I was able to get a new car without having to worry about the cost.",
		icon: "/img/pinkStar.png",
		avatar: "/img/1.png",
		name: "Skylar Siphron",
		brandName: "Behance",
	},
	{
		img: "/img/quotation.png",
		desc: "The template company handled everything quickly and efficiently, and I was able to get a new car without having to worry about the cost.",
		icon: "/img/pinkStar.png",
		avatar: "/img/2.png",
		name: "Skylar Siphron",
		brandName: "Behance",
	},
	{
		img: "/img/quotation.png",
		desc: "The template company handled everything quickly and efficiently, and I was able to get a new car without having to worry about the cost.",
		icon: "/img/pinkStar.png",
		avatar: "/img/3.png",
		name: "Skylar Siphron",
		brandName: "Behance",
	},
];

export const subscriptionPlans = [
	{
		title: "Regular",
		price: "25",
		available: "Regular",
		features: [
			"5 downloads per day",
			"Access to all products",
			"Access to new releases",
			"25% renewal discount",
		],
	},
	{
		title: "Basic",
		price: "120",
		available: "Basic",
		features: [
			"10 downloads per day",
			"Access to all products",
			"Access to new releases",
			"25% renewal discount",
		],
	},
	{
		title: "Pro",
		price: "320",
		available: "Premium",
		features: [
			"Unlimited downloads per day",
			"Access to all products",
			"Access to new releases",
			"25% renewal discount",
		],
	},
];

export const profileData = [
	{
		image: "/img/1.png",
		name: "Sarah M.",
		title: "Enthusiastic Learner",
		info: `"Sonduck has transformed my approach to learning. The diverse range of courses and the quality of content provided by creators have exceeded my expectations. The platform truly fosters a sense of community and lifelong learning."`,
	},
	{
		image: "/img/2.png",
		name: "James L.",
		title: "Lifelong Learner",
		info: `"I've tried several online learning platforms, and Sonduck stands out for its vibrant community and the variety of courses available. The easy navigation and engaging content make it a go-to platform for continuous skill development."`,
	},
	{
		image: "/img/3.png",
		name: "Alex B.",
		title: "Inspired Creator",
		info: `"As a creator, Sonduck has been a game-changer for me. The Course Editor is user-friendly, and the support from the community is incredible. It's fulfilling to see my courses making a positive impact on learners globally."`,
	},
];

export const singlePack = [
	{
		image: "/img/card1.png",
		actualPrice: "48",
		discountedPrice: "60",
		title: "1500+ Transitions Premiere Pro",
	},
	{
		image: "/img/card2.png",
		actualPrice: "43",
		discountedPrice: "46",
		title: "1500+ Transitions Premiere Pro",
	},
	{
		image: "/img/card3.png",
		actualPrice: "48",
		discountedPrice: "60",
		title: "1500+ Transitions Premiere Pro",
	},
	{
		image: "/img/card4.png",
		actualPrice: "43",
		discountedPrice: "46",
		title: "1500+ Transitions Premiere Pro",
	},
	{
		image: "/img/card5.png",
		actualPrice: "48",
		discountedPrice: "60",
		title: "1500+ Transitions Premiere Pro",
	},
	{
		image: "/img/card2.png",
		actualPrice: "43",
		discountedPrice: "46",
		title: "1500+ Transitions Premiere Pro",
	},
];

export const bundleData = [
	{
		image1: "/img/bundle_bg1.png",
		actualPrice: "654",
		discountedPrice: "2132",
		title: "1500+ Transitions Premiere Pro",
		image2: "/img/subscription.png",
		saveInfo: "Save $1470 and get all 40 Packs!",
		template: "25,000+ Templates",
		bgColor: "#0D52FF",
	},
	{
		image1: "/img/bundle_bg2.png",
		actualPrice: "654",
		discountedPrice: "2132",
		title: "1500+ Transitions Premiere Pro",
		image2: "/img/subscription.png",
		saveInfo: "Save $1470 and get all 40 Packs!",
		template: "25,000+ Templates",
		bgColor: "#ED544E",
	},
	{
		image1: "/img/bundle_bg1.png",
		actualPrice: "654",
		discountedPrice: "2132",
		title: "1500+ Transitions Premiere Pro",
		image2: "/img/subscription.png",
		saveInfo: "Save $1470 and get all 40 Packs!",
		template: "25,000+ Templates",
		bgColor: "#66C87B",
	},
];

export const features = [
	"1500+ Transitions for Premiere Pro",
	"Premiere Pro MotionDuck Extension",
	"Works with any FPS",
	"Premiere Pro CC 2021 (15.0.0) and Above",
	'Lifetime "Unlimited" license for all your projects.',
];

export const pricingData = [
	{
		plan: "ANNUAL",
		price: "180",
		desc: "USD / year, billed annually",
		info: [
			"Install on up to 2 computers at a time.",
			"Get Access to Every Pack + Future Packs",
			"*Currency will update at checkout based on your location.",
		],
	},
	{
		plan: "MONTHLY",
		price: "25",
		desc: "USD / mo, per month",
		info: [
			"Install on up to 2 computers at a time.",
			"Get Access to Every Pack + Future Packs",
			"+ $15 sign",
		],
	},
	{
		plan: "40 PACK BUNDLE",
		price: "180",
		desc: "USD, one-time payment",
		info: [
			"Install on up to 2 computers at a time.",
			"Get Access to Every Pack + Future Packs",
			"*Currency will update at checkout based on your location.",
		],
	},
];

export const motionDuckData = [
	{
		tick: "/img/tick-circle.png",
		info1: "BROWSE AND PREVIEW EVERY TEMPLATE",
		info2: "APPLY WITHIN ONE CLICK",
		info3: "THEN UPDATE YOUR TEMPLATE",
		img: "/img/m1.png",
	},
	{
		img: "/img/m2.png",
		tick: "/img/tick-circle.png",
		info1: "DOWNLOAD EVERY PACK IN THE EXTENSION",
		info2: "NO NEED TO LEAVE AE OR PREMIERE",
		info3: "INSTANT INSTALL",
	},
];

export const features1 = [
	{
		heading: "Preview All Templates",
		desc: " – Quickly browse and watch every template with the MotionDuck Extension before applying a template.",
	},
	{
		heading: "After Effects & Premiere Pro",
		desc: " – Our Extension and templates work with both After Effects and Premiere Pro.",
	},
	{
		heading: "Customizable Control",
		desc: " – Easily update and change your template to fit your needs within seconds.",
	},
];

export const features2 = [
	{
		heading: "New Pack Notifications",
		desc: " – You will be notified when new templates are created from us within the MotionDuck Extension.",
	},
	{
		heading: "35,000+ Templates & More To Come",
		desc: " – Have access to all 35,000+ templates and every single template we create in the future.",
	},
	{
		heading: "Quick Install",
		desc: " – Download and install any pack within After Effects or Premiere Pro with the MotionDuck Extension.",
	},
];
