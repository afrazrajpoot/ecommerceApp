import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { endpoint, config } = Object.fromEntries(
    new URL(req.url).searchParams
  );

  try {
    const parsedConfig = JSON.parse(config || "{}");

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/${endpoint}`,
      {
        ...parsedConfig,
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

    return NextResponse.json(
      { data: response.data, totalProducts: response.headers["x-wp-total"], count: response.data.length },
      { status: 200 }
    );
  } catch (error) {
    if (error.response) {
      console.error("Error status:", error.response.status);
      return NextResponse.json(
        { message: error.response.data },
        { status: error.response.status }
      );
    } else {
      console.error(error.message);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

// Similar changes can be made to POST and PUT if needed

export async function POST(req) {
  try {
    const { endpoint, data } = await req.json();

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/${endpoint}`,
      data,
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

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    if (error.response) {
      console.error("Error status:", error.response.status);
      return NextResponse.json(
        { message: error.response.data },
        { status: error.response.status }
      );
    } else {
      console.error(error.message);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

export async function PUT(req) {
  try {
    const { endpoint, itemId, data } = await req.json();

    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/${endpoint}/${itemId}`,
      data,
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

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    if (error.response) {
      console.error("Error status:", error.response.status);
      return NextResponse.json(
        { message: error.response.data },
        { status: error.response.status }
      );
    } else {
      console.error(error.message);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
