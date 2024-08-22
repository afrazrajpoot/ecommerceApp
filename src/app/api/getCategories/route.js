import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const response = await axios.get(
      "https://develop.sonduckfilm.com/wp-json/wc/v3/products/categories",
      {
        auth: {
          username: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY,
          password: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET,
        },
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return NextResponse.json({ success: true, data: response.data }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
