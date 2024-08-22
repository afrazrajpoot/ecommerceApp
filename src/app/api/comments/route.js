import axios from "axios";

import commentModel from "@/models/commentModel"; // Import the schema, not the model
import { connection } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connection();
    const reqBody = await req.json();
    console.log(reqBody, "req body");
    const payLoad = {
      post: reqBody.post,
      name: reqBody.user.name,
      email: reqBody.user.email,
      content: reqBody.content,
      parent: reqBody.parent,
    };
    let username = process.env.NEXT_WP_USERNAME || "";
    let password = process.env.NEXT_WP_PASSWORD || "";
    const token = btoa(`${username}:${password}`);
    const response = await axios.post(
      "https://develop.sonduckfilm.com/wp-json/wp/v2/comments",
      payLoad,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Basic ${token}`,
        },
      }
    );
    // console.log(response.data, "post response data");
    await commentModel.create({
      id: response.data.id,
      post: reqBody.post,
      parent: response.data.parent,
      author: response.data.author,
      author_name: reqBody.user.name || "",
      date: response.data.date,
      content: reqBody.content || "",
      author_avatar_urls: reqBody.user.img || "",
    });

    return NextResponse.json(
      { message: "Data received successfully", data: response.data },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: err }, { status: 500 });
  }
}
