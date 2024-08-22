// pages/api/subscribe.js
import { connection } from "@/dbConfig/dbConfig";
import Subscription from "@/models/subscription";
import { NextResponse } from "next/server";

connection();

export async function POST(req) {
  const { username, email, price, downloadLimit, available, userId, limit } = await req.json();
  console.log(username, email, price, available, userId, limit, "userdetail");
  // if()
  // Calculate start and end dates based on limit
  const startDate = new Date();
  let endDate = new Date(startDate);

  // Adjust endDate based on the limit
  if (limit === "year") {
    endDate.setFullYear(startDate.getFullYear() + 1);
  } else {
    endDate.setMonth(startDate.getMonth() + 1); // Default to one month
  }

  // Initialize a new Subscription instance
  const subscription = new Subscription({
    userId: userId,
    username: username,
    email: email,
    startDate: startDate,
    endDate: endDate,
    planType: available,
    downloadLimit: downloadLimit,
    price: price,
    limit: limit,
  });

  // Set download limits based on available plan type
  if (available === "Regular" || available === "MONTHLY") {
    subscription.downloadLimit = 5;
  } else if (available === "Basic") {
    subscription.downloadLimit = 10;
  } else if (available === "Premium") {
    subscription.downloadLimit = 15;
  } else if (available === "ANNUAL") {
    subscription.downloadLimit = 10000;
  } else if (available === "40 PACK BUNDLE") {
    subscription.downloadLimit = 10000;
  }

  // Save the subscription to the database
  await subscription.save();

  // Return success response
  return NextResponse.json({ success: true, subscription: subscription }, { status: 200 });
}
