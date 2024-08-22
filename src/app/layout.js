"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/context/globalState";
import Header from "./components/Common/Header/Header";
import SigninModel from "./components/authModel/register/SigninModel";
import MobileSidebar from "./components/Common/Sidebar/MobileSidebar";
import Providers from "@/redux/Providers";
import SignupModel from "./components/authModel/register/SignupModel";
import { Toaster } from "sonner";
import ChechoutDrawer from "./components/ChechoutDrawer";
import ForgetModel from "./components/authModel/forgotPassword/ForgetModel";
import AuthProvider from "@/authProvider/AuthProvider";
import OtpModel from "./components/authModel/otp/OtpModel";
import ResetModel from "./components/authModel/resetModal/ResetModel";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

// import 'bootstrap/dist/css/bootstrap.min.css';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head></head>
			<Providers>
				<UserProvider>
					<AuthProvider>
						<body
							className={inter.className}
							style={{ backgroundColor: "#FAFAFA" }}
						>
							<ProgressBar
								height="4px"
								color="#FF387A"
								options={{ showSpinner: false }}
								shallowRouting
							/>

							<Header />
							<Toaster />
							{children}
							<SigninModel />
							<OtpModel />
							<ResetModel />
							<SignupModel />
							<ForgetModel />
							<ChechoutDrawer />

							<MobileSidebar />
						</body>
					</AuthProvider>
				</UserProvider>
			</Providers>
		</html>
	);
}
