"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

interface ContributionData {
  name: string;
  commits: number;
  pullRequests: number;
  issues: number;
}

interface ContributionChartProps {
  username: string;
}

export function ContributionChart({ username }: ContributionChartProps) {
  const [data, setData] = useState<ContributionData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);

        const githubToken = "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";
        if (!githubToken) {
          throw new Error("GitHub token not found. Ensure NEXT_PUBLIC_GITHUB_TOKEN is set in your environment.");
        }

        const now = new Date();
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(now.getFullYear() - 1);

        const fromDate = oneYearAgo.toISOString().split("T")[0];
        const toDate = now.toISOString().split("T")[0];

        // Generate last 12 months
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const last12Months: string[] = [];
        for (let i = 11; i >= 0; i--) {
          const date = new Date();
          date.setMonth(now.getMonth() - i);
          last12Months.push(monthNames[date.getMonth()]);
        }

        const monthlyData: Record<string, { commits: number; pullRequests: number; issues: number }> = {};
        last12Months.forEach((month) => {
          monthlyData[month] = { commits: 0, pullRequests: 0, issues: 0 };
        });

        const headers = {
          Authorization: `token ${githubToken}`,
          Accept: "application/vnd.github.v3+json",
        };

        // **Fetch User Repositories**
        const userReposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, { headers });
        if (!userReposResponse.ok) throw new Error(`GitHub API error: ${userReposResponse.statusText}`);
        const userRepos = await userReposResponse.json();

        // **Fetch Organization Repositories**
        const orgsResponse = await fetch(`https://api.github.com/users/${username}/orgs`, { headers });
        if (!orgsResponse.ok) throw new Error(`GitHub API error: ${orgsResponse.statusText}`);
        const orgs = await orgsResponse.json();

        let orgRepos: any[] = [];
        for (const org of orgs) {
          const orgReposResponse = await fetch(`https://api.github.com/orgs/${org.login}/repos?per_page=100`, { headers });
          if (orgReposResponse.ok) {
            const repos = await orgReposResponse.json();
            orgRepos = [...orgRepos, ...repos];
          }
        }

        const allRepos = [...userRepos, ...orgRepos];

        // **Fetch Commits**
        for (const repo of allRepos) {
          const commitsResponse = await fetch(
            `https://api.github.com/repos/${repo.full_name}/commits?author=${username}&since=${fromDate}T00:00:00Z&until=${toDate}T23:59:59Z&per_page=100`,
            { headers }
          );

          if (commitsResponse.ok) {
            const commitsData = await commitsResponse.json();
            for (const commit of commitsData) {
              const date = new Date(commit.commit.committer.date);
              const monthName = monthNames[date.getMonth()];
              if (monthlyData[monthName]) {
                monthlyData[monthName].commits++;
              }
            }
          }
        }

        // **Fetch Pull Requests**
        const prsResponse = await fetch(
          `https://api.github.com/search/issues?q=author:${username}+is:pr+created:${fromDate}..${toDate}`,
          { headers }
        );

        if (prsResponse.ok) {
          const prsData = await prsResponse.json();
          for (const pr of prsData.items || []) {
            const date = new Date(pr.created_at);
            const monthName = monthNames[date.getMonth()];
            if (monthlyData[monthName]) {
              monthlyData[monthName].pullRequests++;
            }
          }
        }

        // **Fetch Issues**
        const issuesResponse = await fetch(
          `https://api.github.com/search/issues?q=author:${username}+is:issue+created:${fromDate}..${toDate}`,
          { headers }
        );

        if (issuesResponse.ok) {
          const issuesData = await issuesResponse.json();
          for (const issue of issuesData.items || []) {
            const date = new Date(issue.created_at);
            const monthName = monthNames[date.getMonth()];
            if (monthlyData[monthName]) {
              monthlyData[monthName].issues++;
            }
          }
        }

        // Convert to array while maintaining order
        const chartData = last12Months.map((month) => ({
          name: month,
          commits: monthlyData[month].commits,
          pullRequests: monthlyData[month].pullRequests,
          issues: monthlyData[month].issues,
        }));

        setData(chartData);
      } catch (err) {
        console.error("Error fetching GitHub data:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch GitHub data");
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchGitHubData();
    }
  }, [username]);

  if (loading) {
    return (
      <Card className="p-4">
        <h3 className="mb-4 text-lg font-medium">Loading GitHub contributions...</h3>
        <div className="h-80 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-4">
        <h3 className="mb-4 text-lg font-medium">Error Loading Data</h3>
        <div className="h-80 flex items-center justify-center">
          <p className="text-red-500">{error}</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <h3 className="mb-4 text-lg font-medium">GitHub Contributions for {username} (Last 12 Months)</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              contentStyle={{
                borderRadius: "0.375rem",
                border: "1px solid hsl(var(--border))",
                backgroundColor: "hsl(var(--card))",
              }}
            />
            <Legend />
            <Bar dataKey="commits" name="Commits" fill="#3b82f6" />
            <Bar dataKey="pullRequests" name="Pull Requests" fill="#8b5cf6" />
            <Bar dataKey="issues" name="Issues" fill="#ec4899" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
