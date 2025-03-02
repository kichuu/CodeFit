import { Candidate } from "../models/Candidate";
import { calculateMatchPercent } from "./calculateMatchPercent";

export const updateMatchPercentForCandidates = async (companyId: string, benchmark: any) => {
    // Find all candidates for the company
    const candidates = await Candidate.find({ companyIds: companyId });

    if (candidates.length === 0) return;

    // Loop through each candidate and update their match percentage
    for (const candidate of candidates) {
        // Calculate the match percentage
        const matchPercent = calculateMatchPercent(candidate, benchmark);

        // Update the candidate's match percentage
        candidate.matchPercent = matchPercent;
        await candidate.save();
    }
};
