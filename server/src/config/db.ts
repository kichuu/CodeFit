import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://krishnadevr07:xffVEo7iFq5lyMfd@cluster0.wc88p.mongodb.net/codefit?retryWrites=true&w=majority&appName=Cluster0";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("🔥 MongoDB Connected...");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  }
};
