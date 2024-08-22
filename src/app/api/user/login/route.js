import { connection } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"; // Import jsonwebtoken
import Subscription from "@/models/subscription";

connection();

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid credentials", // You can customize this message
        },
        { status: 400 }
      );
    }

    // Validate password
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        {
          message: "Invalid credentials", // You can customize this message
        },
        { status: 400 }
      );
    }

    // Generate JWT token
    const payload = {
      user: {
        id: user._id, // Assuming MongoDB ObjectId
        email: user.email,
      },
    };

    const jwtToken = jwt.sign(payload, "jfhdjkhfjksdhjkfhsdjkfhjksh", {
      expiresIn: "1h", // Token expiration time
    });

    const subscriptionPlan = await Subscription.find({ userId: user._id });


    const response = NextResponse.json({
      message: "Login successful",
      user,
      subscriptionPlan,
    });

    // Set the JWT token in a cookie
    response.cookies.set("token", jwtToken, {
      httpOnly: true, // Makes the cookie accessible only by the web server
      secure: process.env.NODE_ENV === "production", // Ensures the cookie is sent only over HTTPS
      maxAge: 3600, // 1 hour in seconds
      path: "/", // Path where the cookie is accessible
    });

    return response;
  } catch (err) {
    return NextResponse.json(
      {
        message: err.message,
      },
      { status: 500 }
    );
  }
}
