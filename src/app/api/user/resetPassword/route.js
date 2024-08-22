import { connection } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";
connection();

export async function POST(req) {
  try {
    const { oldPassword, id, otp, newPassword } = await req.json();
    const user = await User.findById({ _id: id });
    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        { status: 404 }
      );
    }

    if (user.otp !== otp) {
      return NextResponse.json(
        {
          message: "Invalid OTP",
        },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt();
    const hashedPassword = await bcryptjs.hash(newPassword, salt);
    user.password = hashedPassword;
    user.otp = null; // Clear OTP after successful password reset
    await user.save();

    return NextResponse.json({ message: "Password updated successfully" });
  } catch (err) {
    return NextResponse.json(
      {
        message: err.message,
      },
      { status: 500 }
    );
  }
}
