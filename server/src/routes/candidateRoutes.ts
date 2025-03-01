import express from "express";
import { addCandidate, getCandidates, getCandidate } from "../controllers/candidateController";

const router = express.Router();

router.post("/", addCandidate);
router.get("/", getCandidates);
router.get("/:username", getCandidate);

export default router;
