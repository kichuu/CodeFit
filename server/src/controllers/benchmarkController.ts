import { Request, Response } from "express";
import { Benchmark } from "../models/Benchmark";
import axios from "axios"
import dotenv from "dotenv";
import { updateMatchPercentForCandidates } from "../utils/matchPercentUtils";

dotenv.config();
const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Replace with your token

const headers = {
    Authorization: `token ${GITHUB_TOKEN}`,
    Accept: "application/vnd.github.v3+json",
  };

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
    openSourceContributed: "No" | "Yes";
    totalRepos: number;
    teamProjects: number;
    codeReviewThoroughness: "low" | "medium" | "high";
  }

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
          codeReviewThoroughness: "low", // ✅ Initialize
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
    


    export const addBenchmark = async (req: Request, res: Response): Promise<void> => {
      try {
          const { githubUrl, companyId } = req.body;
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
  
          let benchmark = await Benchmark.findOne({ companyIds: companyId });
  
          if (benchmark) {
              // Update existing benchmark
              benchmark.topLanguages = gitHubData.topLanguages;
              benchmark.totalCommits = gitHubData.totalCommits;
              benchmark.totalPRs = gitHubData.totalPRs;
              benchmark.totalIssues = gitHubData.totalIssues;
              benchmark.commitQualityScore = gitHubData.commitQualityScore;
              benchmark.openSourceContributed = gitHubData.openSourceContributed;
              benchmark.totalRepos = gitHubData.totalRepos;
              benchmark.codeReviewThoroughness = gitHubData.codeReviewThoroughness;
              benchmark.updatedAt = new Date();
  
              await benchmark.save();
          } else {
              // Create a new benchmark
              benchmark = new Benchmark({
                  topLanguages: gitHubData.topLanguages,
                  totalCommits: gitHubData.totalCommits,
                  totalPRs: gitHubData.totalPRs,
                  totalIssues: gitHubData.totalIssues,
                  commitQualityScore: gitHubData.commitQualityScore,
                  openSourceContributed: gitHubData.openSourceContributed,
                  totalRepos: gitHubData.totalRepos,
                  codeReviewThoroughness: gitHubData.codeReviewThoroughness,
                  companyIds: [companyId],
              });
  
              await benchmark.save();
          }
  
          // Update match percentages for existing candidates
          await updateMatchPercentForCandidates(companyId, benchmark);
  
          res.status(200).json({ message: "Benchmark updated", benchmark });
      } catch (error) {
          res.status(500).json({ message: (error as Error).message });
      }
  };
  
