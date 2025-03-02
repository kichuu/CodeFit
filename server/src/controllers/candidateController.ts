import { Request, Response } from "express";
import { fetchGitHubProfile, fetchTopLanguages } from "../utils/githubAPI";
import { Candidate } from "../models/Candidate";

import dotenv from "dotenv";

dotenv.config();

import axios from "axios";
import { Company } from "../models/Company";
import { Benchmark } from "../models/Benchmark";
import { calculateMatchPercent } from "../utils/calculateMatchPercent";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Replace with your token

const headers = {
  Authorization: `token ${GITHUB_TOKEN}`,
  Accept: "application/vnd.github.v3+json",
};

// Define the structure of the fetched GitHub data
interface GitHubData {
  avatar: any;
  bio: any;
  location: any;
  joinedGithub: any;
  topLanguages: any;
  name: any;
  username: string;
  totalCommits: number;
  totalPRs: number;
  totalIssues: number;
  commitQualityScore: number;
  openSourceContributed:String;
  totalRepos:Number;
  teamProjects: number;
  codeReviewThoroughness: String;
}

// Function to calculate commit message quality score
function calculateCommitQuality(commitMessages: string[]): number {
  if (commitMessages.length === 0) return 0;

  let totalScore = 0;
  let messageCount: Record<string, number> = {}; // Track repeated messages

  commitMessages.forEach((msg) => {
    let score = 5; // Default baseline score

    // ✅ Length-based scoring
    if (msg.length < 10) score -= 2;
    else if (msg.length < 30) score += 2;
    else if (msg.length > 50) score += 3;

    // ✅ Recognizing Good Action Words
    if (msg.match(/\b(fix|refactor|optimize|improve|feature|add|remove|resolve|implement)\b/i)) score += 2;

    // ✅ Detecting Technical Terms
    if (msg.match(/\b(api|database|security|performance|memory|function|bug|patch|error|deployment)\b/i)) score += 2;

    // ✅ Checking for Issue References
    if (msg.includes("#") || msg.toLowerCase().includes("fixes") || msg.toLowerCase().includes("closes")) {
      score += 3;
    }

    // ❌ Penalizing Bad Commit Messages
    if (msg.match(/\b(update|more work|changes|edit|modified|updated|wip)\b/i)) score -= 2;

    // ❌ Penalizing Repetitive Messages
    messageCount[msg] = (messageCount[msg] || 0) + 1;
    if (messageCount[msg] > 2) {
      score -= 3; // Spam reduction
    }

    // Ensuring the score stays between 0 and 10
    totalScore += Math.min(Math.max(score, 0), 10);
  });

  return parseFloat((totalScore / commitMessages.length).toFixed(2)); // Average score out of 10
}

// Function to fetch GitHub data for a user


export async function fetchGitHubData(username: string): Promise<GitHubData | null> {
    try {
      const userResponse = await axios.get(`https://api.github.com/users/${username}`, { headers });
      const user = userResponse.data;
  
      let userData: GitHubData = {
        username,
        name: user.name || username,
        avatar: user.avatar_url,
        bio: user.bio,
        location: user.location,
        joinedGithub: user.created_at,
        totalCommits: 0,
        totalPRs: 0,
        totalIssues: 0,
        commitQualityScore: 0,
        codeReviewThoroughness: "Low", // ✅ Initialize
        topLanguages: [],
        openSourceContributed: "No",
        totalRepos: 0, 
        teamProjects: 0, 
      };
  
      // Fetch repositories
      const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos?per_page=100`, { headers });
      const repos = reposResponse.data;
  
      let allCommitMessages: string[] = [];
      let languageCount: Record<string, number> = {};
  
      userData.totalRepos = repos.length;
  
      for (const repo of repos) {
        const repoName: string = repo.name;
  
        
  
        try {
          const commitsResponse = await axios.get(
            `https://api.github.com/repos/${username}/${repoName}/commits?per_page=100`,
            { headers }
          );
          const commits = commitsResponse.data;
  
          allCommitMessages.push(...commits.map((commit: { commit: { message: string } }) => commit.commit.message));
          userData.totalCommits += commits.length;
        } catch (error: any) {
          if (error.response?.status === 409) console.log(`⚠ Skipping empty repo: ${repoName}`);
        }
  
        try {
          const languagesResponse = await axios.get(
            `https://api.github.com/repos/${username}/${repoName}/languages`,
            { headers }
          );
          for (const [lang, bytes] of Object.entries(languagesResponse.data)) {
            languageCount[lang] = (languageCount[lang] || 0) + (bytes as number);
          }
        } catch (error) {}
      }
  
      userData.topLanguages = Object.entries(languageCount)
        .sort((a, b) => b[1] - a[1])
        .map(([lang]) => lang)
        .slice(0, 5);
  
      try {
        const prsResponse = await axios.get(`https://api.github.com/search/issues?q=author:${username}+type:pr`, { headers });
        userData.totalPRs = prsResponse.data.total_count;
      } catch (error) {}
  
      try {
        const issuesResponse = await axios.get(`https://api.github.com/search/issues?q=author:${username}+type:issue`, { headers });
        userData.totalIssues = issuesResponse.data.total_count;
      } catch (error) {}
  
      try {
        const externalPRsResponse = await axios.get(
          `https://api.github.com/search/issues?q=author:${username}+type:pr -repo:${username}`,
          { headers }
        );
        if (externalPRsResponse.data.total_count > 0) {
          userData.openSourceContributed = "Yes";
        }
      } catch (error) {}
  
      // ✅ Calculate commit quality score
      userData.commitQualityScore = calculateCommitQuality(allCommitMessages);
  
      // ✅ Assign "Code Review Thoroughness" based on commit quality score
      if (userData.commitQualityScore >= 7) {
        userData.codeReviewThoroughness = "high";
      } else if (userData.commitQualityScore >= 5) {
        userData.codeReviewThoroughness = "medium";
      } else {
        userData.codeReviewThoroughness = "low";
      }
  
      console.log("📊 GitHub Data:", JSON.stringify(userData, null, 2));
      return userData;
    } catch (error: any) {
      console.error("❌ Error fetching GitHub data:", error.response?.data || error.message);
      return null;
    }
  }
  
  
  
  




  export const addCandidate = async (req: Request, res: Response): Promise<void> => {
    try {
        const { githubUrl } = req.body;
        const username = githubUrl.split("/").pop();
        const companyId = req.body.companyId; // Extracted from JWT middleware

        if (!username) {
            res.status(400).json({ message: "Invalid GitHub URL" });
            return;
        }

        // Check if candidate already exists
        let candidate = await Candidate.findOne({ username });
        if (candidate) {
            // If companyId is not in the array, add it
            if (!candidate.companyIds.includes(companyId)) {
                candidate.companyIds.push(companyId);
                await candidate.save();
            }
            res.status(200).json(candidate);
            return;
        }

        // Fetch GitHub profile and repository data
        const gitHubData = await fetchGitHubData(username);
        if (!gitHubData) {
            res.status(500).json({ message: "Failed to fetch GitHub data" });
            return;
        }

        // Find the company's benchmark
        const benchmark = await Benchmark.findOne({companyIds: companyId });
        console.log(benchmark)
        if (!benchmark) {
            res.status(404).json({ message: "Benchmark not found for company" });
            return;
        }

        // Calculate match percentage
        const matchPercent = calculateMatchPercent(gitHubData, benchmark);

        // Save GitHub data in the database
        const newCandidate = new Candidate({
            username,
            name: gitHubData.name,
            avatar: gitHubData.avatar,
            bio: gitHubData.bio,
            location: gitHubData.location,
            joinedGithub: gitHubData.joinedGithub,
            topLanguages: gitHubData.topLanguages,
            totalCommits: gitHubData.totalCommits,
            totalPRs: gitHubData.totalPRs,
            totalIssues: gitHubData.totalIssues,
            commitQualityScore: gitHubData.commitQualityScore,
            openSourceContributed: gitHubData.openSourceContributed,
            totalRepos: gitHubData.totalRepos,
            teamProjects: gitHubData.teamProjects,
            codeReviewThoroughness: gitHubData.codeReviewThoroughness,
            companyIds: [companyId],
            matchPercent:matchPercent, // Assign calculated match percent
        });

        await newCandidate.save();
        res.status(201).json(newCandidate);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

// Function to calculate match percentage



  

  
  export const getCandidates = async (req: Request, res: Response): Promise<void> => {
    try {
      const  companyId  = req.body.companyId;
        console.log(companyId)
      
  
        const candidates = await Candidate.find();
       
        
      res.status(200).json(candidates);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  };
  


export const getCandidatesForCompany = async (req: Request, res: Response): Promise<void> => {
  try {
    const companyId = req.body.companyId; // Extracted from JWT middleware
    
    const company = await Company.findById(companyId);
    console.log(company)
    if (!company)  {res.status(404).json({ message: "Company not found" })
        return
}
    const candidates = await Candidate.find({ companyIds: companyId });
    console.log(candidates)
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


export const getCandidate = async (req: Request, res: Response) : Promise<void> => {
  try {
    const { username } = req.params;
    const candidate = await Candidate.findOne({ username });

    if (!candidate) {
       res.status(404).json({ message: "Candidate not found" });
       return
    }

    res.status(200).json(candidate);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};


export const deleteCandidate = async (req: Request, res: Response): Promise<void> => {
    try {
      const { username } = req.params;
      const deletedCandidate = await Candidate.findOneAndDelete({ username });
  
      if (!deletedCandidate) {
        res.status(404).json({ message: "Candidate not found" });
        return;
      }
  
      res.status(200).json({ message: "Candidate deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  };




  export const markCandidateAsHired = async (req: Request, res: Response): Promise<void> => {
    try {
      const { username } = req.params;
  
      const updatedCandidate = await Candidate.findOneAndUpdate(
        { username: username },
        { $set: { status: "Hired" } },
        { new: true }
      );
  
      if (!updatedCandidate) {
        res.status(404).json({ message: "Candidate not found" });
        return;
      }
  
      res.status(200).json({ message: "Candidate marked as Hired", candidate: updatedCandidate });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  };
  