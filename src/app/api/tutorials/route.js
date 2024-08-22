import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { endpoint, config, slug } = Object.fromEntries(new URL(req.url).searchParams);
  console.log(endpoint, config, slug);

  try {
    const parsedConfig = JSON.parse(config || "{}");
    let username = process.env.NEXT_WP_USERNAME || "";
    let password =  process.env.NEXT_WP_PASSWORD || "";
    const token = btoa(`${username}:${password}`);
    const response = await axios.get(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/${endpoint}`, {
      ...parsedConfig,

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Basic ${token}`,
      },
    });

    return NextResponse.json(
      {
        data: response.data,
        totalProducts: response.headers["x-wp-total"],
        count: response.data.length,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error.response) {
      console.error("Error status:", error.response.status);
      return NextResponse.json({ message: error.response.data }, { status: error.response.status });
    } else {
      console.error(error.message);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
