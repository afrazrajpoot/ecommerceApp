// models/Subscription.js
import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  username: { type: String, required: true },
  email: { type: String, required: true },
  // PayPal purchase ID
  status: { type: String, default: "ACTIVE" }, // ACTIVE, CANCELLED, EXPIRED
  startDate: { type: Date },
  endDate: { type: Date },
  planType: { type: String }, // e.g., 'monthly'
  downloadLimit: { type: Number, default: 0 },
  price: { type: Number, required: true },
  progress: { type: Number },
  limit: { type: String },
  createdAt: { type: Date, default: Date.now },
  lastReset: { type: Date, default: Date.now },
});

const Subscription =
  mongoose.models.Subscription || mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
