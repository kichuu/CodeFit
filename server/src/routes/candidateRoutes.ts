import express from "express";
import { addCandidate, getCandidates, getCandidate ,getCandidatesForCompany,deleteCandidate,markCandidateAsHired} from "../controllers/candidateController";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

router.post("/", authMiddleware,addCandidate);
// router.get("/",authMiddleware ,getCandidates);
// router.get("/",authMiddleware ,getCandidates);
router.get("/",authMiddleware ,getCandidatesForCompany);




router.get("/:username",getCandidate);
router.delete("/:username", authMiddleware,deleteCandidate);
router.patch("/:username/hired",authMiddleware, markCandidateAsHired);


export default router;
