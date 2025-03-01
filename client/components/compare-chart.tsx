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

interface CompareChartProps {
  type: "skills" | "activity"
}

export function CompareChart({ type }: CompareChartProps) {
  // This would be fetched from an API in a real application
  const skillsData = [
    { subject: "TypeScript", johnDoe: 90, janeDoe: 70 },
    { subject: "React", johnDoe: 85, janeDoe: 95 },
    { subject: "Node.js", johnDoe: 75, janeDoe: 65 },
    { subject: "Testing", johnDoe: 60, janeDoe: 80 },
    { subject: "DevOps", johnDoe: 50, janeDoe: 90 },
    { subject: "UI/UX", johnDoe: 70, janeDoe: 85 },
  ]

  const activityData = [
    { name: "Commits", johnDoe: 245, janeDoe: 178 },
    { name: "Pull Requests", johnDoe: 42, janeDoe: 65 },
    { name: "Issues", johnDoe: 28, janeDoe: 37 },
    { name: "Code Reviews", johnDoe: 35, janeDoe: 52 },
    { name: "Projects", johnDoe: 8, janeDoe: 12 },
  ]

  if (type === "skills") {
    return (
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={skillsData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar name="John Doe" dataKey="johnDoe" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
            <Radar name="Jane Doe" dataKey="janeDoe" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
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
          <Bar dataKey="johnDoe" name="John Doe" fill="#3b82f6" />
          <Bar dataKey="janeDoe" name="Jane Doe" fill="#8b5cf6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

