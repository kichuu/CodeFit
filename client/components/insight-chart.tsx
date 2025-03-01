"use client"

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts"

interface InsightChartProps {
  type: "languages" | "matchScores"
}

export function InsightChart({ type }: InsightChartProps) {
  // This would be fetched from an API in a real application
  const languageData = [
    { name: "TypeScript", value: 35, color: "#3178c6" },
    { name: "JavaScript", value: 25, color: "#f7df1e" },
    { name: "Python", value: 20, color: "#3776ab" },
    { name: "Java", value: 10, color: "#b07219" },
    { name: "Go", value: 5, color: "#00add8" },
    { name: "Rust", value: 5, color: "#dea584" },
  ]

  const matchScoreData = [
    { name: "90-100%", value: 15, color: "#22c55e" },
    { name: "80-89%", value: 35, color: "#84cc16" },
    { name: "70-79%", value: 25, color: "#eab308" },
    { name: "60-69%", value: 15, color: "#f97316" },
    { name: "Below 60%", value: 10, color: "#ef4444" },
  ]

  if (type === "languages") {
    return (
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={languageData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              formatter={(value) => [`${value}%`, "Candidates"]}
              contentStyle={{
                borderRadius: "0.375rem",
                border: "1px solid hsl(var(--border))",
                backgroundColor: "hsl(var(--card))",
              }}
            />
            <Bar dataKey="value" name="Candidates">
              {languageData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={matchScoreData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {matchScoreData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [`${value}%`, "Candidates"]}
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
  )
}

