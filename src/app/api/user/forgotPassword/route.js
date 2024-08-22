import { sendEmail } from "@/app/utils/sendEmail";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email } = await req.json();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    // Generate 5-digit OTP
    const otp = Math.floor(10000 + Math.random() * 90000).toString();
    // Save OTP to user (you need to add an otp field to your user model)
    user.otp = otp;
    await user.save();
    await sendEmail(user.email, "You have requested for OTP, this otp is required to reset your password ", ` ${otp}`);
    // Respond with success message
    return NextResponse.json({ message: "OTP sent to email" });
  } catch (err) {
    console.error("Error in POST handler:", err.message);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}