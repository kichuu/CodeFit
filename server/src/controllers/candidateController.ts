import { Request, Response } from "express";
import { fetchGitHubProfile, fetchTopLanguages } from "../utils/githubAPI";
import { Candidate } from "../models/Candidate";
import dotenv from "dotenv";

dotenv.config();

import axios from "axios";

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
    // Fetch user profile details
    const userResponse = await axios.get(`https://api.github.com/users/${username}`, { headers });
    const user = userResponse.data;

    // Initialize user data object
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
      topLanguages: [],
    };

    // Fetch repositories
    const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos?per_page=100`, { headers });
    const repos = reposResponse.data;

    let allCommitMessages: string[] = [];
    let languageCount: Record<string, number> = {};

    for (const repo of repos) {
      const repoName: string = repo.name;

      // Fetch commit history
      try {
        const commitsResponse = await axios.get(`https://api.github.com/repos/${username}/${repoName}/commits?per_page=100`, { headers });
        const commits = commitsResponse.data;

        const commitMessages = commits.map((commit: { commit: { message: string } }) => commit.commit.message);
        allCommitMessages.push(...commitMessages);

        userData.totalCommits += commits.length;
      } catch (error: any) {
        if (error.response?.status === 409) {
          console.log(`⚠ Skipping empty repo: ${repoName}`);
        } else {
          console.error(`❌ Error fetching commits for ${repoName}:`, error.response?.data || error.message);
        }
      }

      // Fetch repository languages
      try {
        const languagesResponse = await axios.get(`https://api.github.com/repos/${username}/${repoName}/languages`, { headers });
        const repoLanguages: { [key: string]: number } = languagesResponse.data;

        for (const [lang, bytes] of Object.entries(repoLanguages)) {
          languageCount[lang] = (languageCount[lang] || 0) + bytes;
        }
      } catch (error) {
        console.error(`❌ Error fetching languages for ${repoName}:`, error);
      }
    }

    // Determine top languages (sorted by usage)
    userData.topLanguages = Object.entries(languageCount)
      .sort((a, b) => b[1] - a[1])
      .map(([lang]) => lang)
      .slice(0, 5); // Top 5 languages

    // Fetch total PRs
    try {
      const prsResponse = await axios.get(`https://api.github.com/search/issues?q=author:${username}+type:pr`, { headers });
      userData.totalPRs = prsResponse.data.total_count;
    } catch (error) {
      console.error(`❌ Error fetching PRs for ${username}:`, error);
    }

    // Fetch total Issues (excluding PRs)
    try {
      const issuesResponse = await axios.get(`https://api.github.com/search/issues?q=author:${username}+type:issue`, { headers });
      userData.totalIssues = issuesResponse.data.total_count;
    } catch (error) {
      console.error(`❌ Error fetching issues for ${username}:`, error);
    }

    // Calculate commit quality score
    userData.commitQualityScore = calculateCommitQuality(allCommitMessages);

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
  
      if (!username) {
        res.status(400).json({ message: "Invalid GitHub URL" });
        return;
      }
  
      // Fetch GitHub profile and repository data
      const gitHubData = await fetchGitHubData(username);
      if (!gitHubData) {
        res.status(500).json({ message: "Failed to fetch GitHub data" });
        return;
      }
  
      // Use GitHub data and save it to the database
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
      });
  
      await newCandidate.save();
      res.status(201).json(newCandidate);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  };
  

export const getCandidates = async (req: Request, res: Response)  => {
  try {
    const candidates = await Candidate.find();
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
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
