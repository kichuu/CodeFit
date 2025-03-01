import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/github-hiring";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("🔥 MongoDB Connected...");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  }
};
