"use client"

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

export function InsightTrends() {
  // This would be fetched from an API in a real application
  const data = [
    { month: "Jan", candidates: 45, hired: 5, avgMatchScore: 78 },
    { month: "Feb", candidates: 52, hired: 7, avgMatchScore: 76 },
    { month: "Mar", candidates: 58, hired: 8, avgMatchScore: 79 },
    { month: "Apr", candidates: 75, hired: 10, avgMatchScore: 80 },
    { month: "May", candidates: 80, hired: 12, avgMatchScore: 82 },
    { month: "Jun", candidates: 95, hired: 15, avgMatchScore: 83 },
    { month: "Jul", candidates: 110, hired: 18, avgMatchScore: 85 },
    { month: "Aug", candidates: 125, hired: 20, avgMatchScore: 84 },
    { month: "Sep", candidates: 140, hired: 22, avgMatchScore: 86 },
    { month: "Oct", candidates: 155, hired: 25, avgMatchScore: 87 },
    { month: "Nov", candidates: 170, hired: 28, avgMatchScore: 88 },
    { month: "Dec", candidates: 185, hired: 30, avgMatchScore: 89 },
  ]

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
          <Tooltip
            contentStyle={{
              borderRadius: "0.375rem",
              border: "1px solid hsl(var(--border))",
              backgroundColor: "hsl(var(--card))",
            }}
          />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="candidates"
            name="Total Candidates"
            stroke="#3b82f6"
            activeDot={{ r: 8 }}
          />
          <Line yAxisId="left" type="monotone" dataKey="hired" name="Hired Candidates" stroke="#22c55e" />
          <Line yAxisId="right" type="monotone" dataKey="avgMatchScore" name="Avg. Match Score (%)" stroke="#8b5cf6" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

