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

        // Find the index where the company match percent is stored
        const existingMatchIndex = candidate.matchPercentByCompany.findIndex(
            (mp) => mp.companyId && mp.companyId.toString() === companyId
        );

        if (existingMatchIndex !== -1) {
            // Update existing entry
            candidate.matchPercentByCompany[existingMatchIndex].matchPercent = matchPercent;
        } else {
            // Add new entry
            candidate.matchPercentByCompany.push({ companyId, matchPercent });
        }

        await candidate.save();
    }
};
