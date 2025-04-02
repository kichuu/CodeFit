"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

interface LanguageChartProps {
  username: string;
}

export function LanguageChart({ username }: LanguageChartProps) {
  const [languageData, setLanguageData] = useState<{ name: string; value: number; color: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) return;

    const fetchLanguageData = async () => {
      try {
        setLoading(true);

        const token = "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";
        const headers: HeadersInit = token ? { Authorization: `token ${token}` } : {};

        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`, { headers });
        if (!reposResponse.ok) throw new Error(`Failed to fetch repositories: ${reposResponse.statusText}`);

        const repos = await reposResponse.json();
        if (!repos.length) throw new Error("No repositories found.");

        const languageStats: Record<string, number> = {};

        await Promise.all(
          repos.map(async (repo: any) => {
            const langResponse = await fetch(repo.languages_url, { headers });
            if (!langResponse.ok) return;

            const langData = await langResponse.json();
            for (const [lang, bytes] of Object.entries(langData)) {
              languageStats[lang] = (languageStats[lang] || 0) + (bytes as number);
            }
          })
        );

        // Convert raw byte counts into percentages
        const totalBytes = Object.values(languageStats).reduce((sum, bytes) => sum + bytes, 0);
        const sortedLanguages = Object.entries(languageStats)
          .map(([name, bytes]) => ({
            name,
            value: parseFloat(((bytes / totalBytes) * 100).toFixed(2)), // Convert to percentage
            color: getColorForLanguage(name),
          }))
          .filter(lang => lang.value >= 1) // **Exclude languages with less than 1% usage**
          .sort((a, b) => b.value - a.value); // Sort by usage percentage

        // Get the top 4 languages, and group the rest under "Others"
        const topLanguages = sortedLanguages.slice(0, 4);
        const otherLanguages = sortedLanguages.slice(4);

        if (otherLanguages.length > 0) {
          const otherTotal = otherLanguages.reduce((sum, lang) => sum + lang.value, 0);
          if (otherTotal >= 1) { // Only add "Others" if it contributes at least 1%
            topLanguages.push({ name: "Others", value: parseFloat(otherTotal.toFixed(2)), color: "#6c757d" });
          }
        }

        setLanguageData(topLanguages);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLanguageData();
  }, [username]);

  if (loading) return <div className="text-center">Loading language data...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <Card className="p-4">
      <h3 className="mb-4 text-lg font-medium">Language Distribution for {username}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={languageData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              label={({ name, value }) => `${name} ${value}%`}
              labelLine={false}
            >
              {languageData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`${value}%`, "Usage"]}
              contentStyle={{
                borderRadius: "0.375rem",
                border: "1px solid hsl(var(--border))",
                backgroundColor: "hsl(var(--card))",
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

// Function to assign colors to languages dynamically
function getColorForLanguage(language: string) {
  const colors: Record<string, string> = {
    TypeScript: "#3178c6",
    JavaScript: "#f7df1e",
    Python: "#3776ab",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Java: "#b07219",
    C: "#555555",
    "C++": "#f34b7d",
    PHP: "#4F5D95",
    Ruby: "#701516",
    Swift: "#ffac45",
    Go: "#00ADD8",
    Rust: "#dea584",
  };
  return colors[language] || "#6c757d"; // Default gray color for unknown languages
}
