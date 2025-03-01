import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import candidateRoutes from "./routes/candidateRoutes";
dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Connect to DB
connectDB();

// Routes
app.use("/api/candidates", candidateRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port http://localhost:${PORT}/`));

