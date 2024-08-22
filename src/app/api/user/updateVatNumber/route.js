import { connection } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connection();

export async function PUT(req) {
  try {
    const reqBody = await req.json();
    const { email, vatNumber  } = reqBody;    

    // Find the user by email
    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        { status: 404 }
      );
    }

    // Update the vatNumber field
    if(vatNumber){      
      user.vatNumber = vatNumber;
    }
    await user.save();
  
    return NextResponse.json({
      message: "Customer ID updated successfully",
      user,
    });
  } catch (err) {
    return NextResponse.json(
      {
        message: err.message,
      },
      { status: 500 }
    );
  }
}
