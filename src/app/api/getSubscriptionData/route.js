import { connection } from "@/dbConfig/dbConfig";
import Subscription from "@/models/subscription";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

connection();

export async function POST(req) {
  try {
    const { id } = await req.json();
    console.log("Searching for subscription with userId popopopo:", id, typeof id);

    // Validate and convert the ID to ObjectId
    let objectId;
    try {
      objectId = new mongoose.Types.ObjectId(id);
    } catch (error) {
      return NextResponse.json({ success: false, message: "Invalid ID format" }, { status: 400 });
    }

    // Use findById directly with the ObjectId
    const subscription = await Subscription.findById(objectId);
    console.log("Found subscription:", subscription);

    if (!subscription) {
      return NextResponse.json({ message: "Subscription not found" }, { status: 404 });
    }

    // Populate the userId field
    const populatedSubscription = await Subscription.findById(objectId).populate("userId");

    return NextResponse.json(
      { success: true, subscription: populatedSubscription },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    // console.log("Received userId:", id);

    if (!id) {
      // console.log("No ID provided in the request");
      return NextResponse.json({ message: "ID parameter is required" }, { status: 400 });
    }

    // The correct method is findOne, not findByOne
    const subscription = await Subscription.findById({ _id: id });
    // console.log("Found subscription:", subscription);

    if (!subscription) {
      // console.log("No subscription found for userId:", id);
      return NextResponse.json({ message: "Subscription not found" }, { status: 404 });
    }

    subscription.downloadLimit -= 1;
    await subscription.save();
    // console.log("Updated subscription:", subscription);

    return NextResponse.json({ success: true, subscription: subscription }, { status: 200 });
  } catch (err) {
    // console.error("Error in PUT request:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    // console.log("Attempting to delete subscription for userId:", userId);

    if (!id) {
      // console.log("No userId provided in the request");
      return NextResponse.json({ message: "userId parameter is required" }, { status: 400 });
    }

    const deletedSubscription = await Subscription.findByIdAndDelete({
      _id: id,
    });
    // console.log("Deleted subscription:", deletedSubscription);

    if (!deletedSubscription) {
      // console.log("No subscription found for userId:", userId);
      return NextResponse.json({ message: "Subscription not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Subscription deleted successfully",
        deletedSubscription,
      },
      { status: 200 }
    );
  } catch (err) {
    // console.error("Error in DELETE request:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
