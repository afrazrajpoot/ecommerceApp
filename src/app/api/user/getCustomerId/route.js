import { connection } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connection();

export async function POST(req) {
  try {
    const reqBody = await req.json().catch((err) => {
      throw new Error("Invalid JSON input");
    });

    const { email } = reqBody;

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    // Find the user by email
    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ user });
  } catch (err) {
    console.error("Error handling POST request:", err.message);
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
}
