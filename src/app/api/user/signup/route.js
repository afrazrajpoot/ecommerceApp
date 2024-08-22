import { connection } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/app/utils/sendEmail";


connection();

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { fullName, email, password } = reqBody;

    const user = await User.findOne({ email: email });
    if (user) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt();
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Send the welcome email
    await sendEmail(
      newUser.email,
      "Welcome to Sonduckfilm",
      `Thank you for registering at Sonduckfilm! We're excited to have you on board, ${newUser.fullName}`
    );

    return NextResponse.json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (err) {
    console.error("Error in POST handler:", err.message);
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
}