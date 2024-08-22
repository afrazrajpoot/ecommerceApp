import axios from "axios";
import { NextResponse } from "next/server";
import { connection } from "@/dbConfig/dbConfig";
import commentModel from "@/models/commentModel";
export async function GET(req, { params }) {
  try {
    await connection();
    const { id } = params; // Use params to get the id from dynamic route
    // console.log(id, "comment id");
    let username = process.env.NEXT_WP_USERNAME || "";
    let password = process.env.NEXT_WP_PASSWORD || "";
    const token = btoa(`${username}:${password}`);
    const response = await axios.get(
      `https://develop.sonduckfilm.com/wp-json/wp/v2/comments?post=${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Basic ${token}`,
        },
      }
    );
    const user = await commentModel.find({ post: id });
    // console.log(user, "user");
    // console.log(response?.data, "response data api");
    if (!user) {
      throw new Error("User not found");
    }
    return NextResponse.json({
      message: `Fetched data for ID: ${id}`,
      data: user,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
