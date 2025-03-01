import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Candidate {
  name: string;
  username: string;
  avatar: string;
  matchScore: string;
  joinedGithub: string;
  totalRepos: number;
  totalCommits: number;
  totalPRs: number;
  totalIssues: number;
  codeReviewThoroughness: string;
  openSourceContributed: string;
  topLanguages: string[];
  teamProjects: number;
  avgPRSize: string;
}

interface CompareTableProps {
  candidates: Candidate[];
}

const categories = [
  {
    category: "Profile",
    metrics: ["Match Score", "GitHub Member Since", "Repositories"],
  },
  {
    category: "Activity",
    metrics: [
      "Commits (Last Year)",
      "Pull Requests (Last Year)",
      "Issues (Last Year)",
    ],
  },
  {
    category: "Languages",
    metrics: ["Primary Language", "Secondary Languages"],
  },
  {
    category: "Collaboration",
    metrics: [
      "Open Source Contributions",
      "Team Projects",
      "Code Review Thoroughness",
    ],
  },
];

const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export function CompareTable({ candidates }: CompareTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          {candidates.map((candidate) => (
            <TableHead key={candidate.username} className="text-center">
              <div className="flex flex-col items-center">
                <img
                  src={candidate.avatar}
                  alt={candidate.name}
                  className="w-10 h-10 rounded-full mb-1"
                />
                <p className="font-medium">{candidate.name}</p>
                <p className="text-sm text-gray-500">@{candidate.username}</p>
              </div>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((section) => (
          <React.Fragment key={section.category}>
            <TableRow>
              <TableCell colSpan={candidates.length + 1} className=" font-semibold text-lg py-2">
                {section.category}
              </TableCell>
            </TableRow>
            {section.metrics.map((metric) => (
              <TableRow key={metric}>
                <TableCell>{metric}</TableCell>
                {candidates.map((candidate) => (
                  <TableCell key={candidate.username} className="text-center">
                    {
                      metric === "Match Score"
                        ? candidate.matchScore
                        : metric === "GitHub Member Since"
                        ? formatDate(candidate.joinedGithub)
                        : metric === "Repositories"
                        ? candidate.totalRepos
                        : metric === "Commits (Last Year)"
                        ? candidate.totalCommits
                        : metric === "Pull Requests (Last Year)"
                        ? candidate.totalPRs
                        : metric === "Issues (Last Year)"
                        ? candidate.totalIssues
                        : metric === "Code Review Thoroughness"
                        ? candidate.codeReviewThoroughness
                        : metric === "Primary Language"
                        ? candidate.topLanguages[0]
                        : metric === "Secondary Languages"
                        ? candidate.topLanguages.slice(1).join(", ")
                        : metric === "Open Source Contributions"
                        ? candidate.openSourceContributed
                        : metric === "Team Projects"
                        ? candidate.teamProjects
                        : metric === "Average PR Size"
                        ? candidate.avgPRSize
                        : "N/A"
                    }
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </React.Fragment>
        ))}
      </TableBody>
    </Table>
  );
}