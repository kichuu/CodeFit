import { Benchmark } from './../models/Benchmark'
import express from "express";
import { addBenchmark } from "../controllers/benchmarkController";
import { authMiddleware } from '../middleware/auth';

const Benchmarkrouter = express.Router();

// Route to add or update a benchmark for a company
Benchmarkrouter.post("/benchmark", authMiddleware,addBenchmark);

export default Benchmarkrouter;
