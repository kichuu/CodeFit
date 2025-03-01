import express from "express";
import { addCandidate, getCandidates, getCandidate ,getCandidatesForCompany} from "../controllers/candidateController";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

router.post("/", authMiddleware,addCandidate);
// router.get("/",authMiddleware ,getCandidates);
router.get("/",authMiddleware ,getCandidates);
router.get("/comp",authMiddleware ,getCandidatesForCompany);




router.get("/:username", getCandidate);

export default router;
