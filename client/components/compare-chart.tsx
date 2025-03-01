"use client"

import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"

interface Candidate {
  name: string
  totalCommits: number
  totalPRs: number
  totalIssues: number
  commitQualityScore: number
}

interface CompareChartProps {
  type: "skills" | "activity"
  candidates: Candidate[]
}

// Predefined color palette
const COLORS = ["#3b82f6", "#8b5cf6", "#f97316", "#22c55e", "#eab308", "#ef4444", "#06b6d4"]

export function CompareChart({ type, candidates }: CompareChartProps) {
  // Assign colors dynamically
  const candidateColors = candidates.reduce<Record<string, string>>((acc, candidate, index) => {
    acc[candidate.name] = COLORS[index % COLORS.length] // Cycle through colors
    return acc
  }, {})

  const activityData = [
    { name: "Commits", ...Object.fromEntries(candidates.map(c => [c.name, c.totalCommits])) },
    { name: "Pull Requests", ...Object.fromEntries(candidates.map(c => [c.name, c.totalPRs])) },
    { name: "Issues", ...Object.fromEntries(candidates.map(c => [c.name, c.totalIssues])) },
    { name: "Code Reviews", ...Object.fromEntries(candidates.map(c => [c.name, c.commitQualityScore])) },
  ]

  if (type === "skills") {
    const skillsData = [
      { subject: "HTML", ...Object.fromEntries(candidates.map(c => [c.name, Math.random() * 100])) },
      { subject: "React", ...Object.fromEntries(candidates.map(c => [c.name, Math.random() * 100])) },
      { subject: "Node.js", ...Object.fromEntries(candidates.map(c => [c.name, Math.random() * 100])) },
      { subject: "Javascript", ...Object.fromEntries(candidates.map(c => [c.name, Math.random() * 100])) },
      { subject: "TypeScript", ...Object.fromEntries(candidates.map(c => [c.name, Math.random() * 100])) },
    ]

    return (
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={skillsData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            {candidates.map(candidate => (
              <Radar
                key={candidate.name}
                name={candidate.name}
                dataKey={candidate.name}
                stroke={candidateColors[candidate.name]}
                fill={candidateColors[candidate.name]}
                fillOpacity={0.3}
              />
            ))}
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    )
  }

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={activityData}>
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
          {candidates.map(candidate => (
            <Bar
              key={candidate.name}
              dataKey={candidate.name}
              name={candidate.name}
              fill={candidateColors[candidate.name]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
