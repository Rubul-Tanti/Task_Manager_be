import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  otp: {
    type: Number,
    required: true,
    min: [100000, "OTP cannot be less than 6 digits"],
    max: [999999, "OTP cannot be more than 6 digits"]
  },
  email: {
    type: String,
    required: true,
  },
}, { timestamps: true });

// TTL index: document auto-deletes after 5 minutes (300 seconds)
otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });

export const otpModel = mongoose.model("Otp", otpSchema);
