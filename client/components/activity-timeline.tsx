import { useEffect, useState } from "react";
import { GitCommitIcon } from "lucide-react";

interface ActivityTimelineProps {
  username: string;
}

interface Activity {
  id: string;
  repo: string;
  message: string;
  timestamp: string;
  date: Date;
}

export function ActivityTimeline({ username }: ActivityTimelineProps) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const githubToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
    if (!githubToken) {
      setError("GitHub token not found. Ensure NEXT_PUBLIC_GITHUB_TOKEN is set.");
      setLoading(false);
      return;
    }

    const headers = {
      Authorization: `token ${githubToken}`,
      Accept: "application/vnd.github.v3+json",
    };

    const fetchLatestCommits = async (repos: any[]): Promise<Activity[]> => {
      const commitPromises = repos.map(async (repo) => {
        try {
          const commitResponse = await fetch(
            `https://api.github.com/repos/${repo.full_name}/commits?per_page=1`,
            { headers }
          );
          if (!commitResponse.ok) return null;

          const commitData = await commitResponse.json();
          if (commitData.length === 0) return null;

          const commitDate = new Date(commitData[0].commit.committer.date);

          return {
            id: commitData[0].sha,
            repo: repo.full_name,
            message: commitData[0].commit.message,
            timestamp: commitDate.toLocaleString(),
            date: commitDate,
          };
        } catch {
          return null;
        }
      });

      const results = await Promise.all(commitPromises);
      return results.filter((commit): commit is Activity => commit !== null);
    };

    const fetchGitHubActivity = async () => {
      try {
        setLoading(true);

        // Fetch user's repositories (excluding org-owned)
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=20`, { headers });
        if (!reposResponse.ok) throw new Error(`GitHub API error: ${reposResponse.statusText}`);
        const reposData = await reposResponse.json();

        // Filter only personal repositories (not org-owned)
        const userRepos = reposData.filter((repo: any) => !repo.fork && repo.owner.login === username);

        // Fetch latest commits from these repositories
        let commitActivities = await fetchLatestCommits(userRepos);

        // Sort by date (latest first) and get the latest 10 activities
        commitActivities = commitActivities.sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 10);

        setActivities(commitActivities);
      } catch (err) {
        console.error("Error fetching GitHub activity:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch GitHub activity");
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchGitHubActivity();
    }
  }, [username]);

  if (loading) return <p>Loading activity...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
            <GitCommitIcon className="h-4 w-4" />
          </div>
          <div className="space-y-1">
            <div className="font-medium">{activity.repo}</div>
            <p className="text-sm">{activity.message}</p>
            <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
