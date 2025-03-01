"use client"

import { Card } from "@/components/ui/card"
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from "recharts"

export function LanguageChart() {
  // This would be fetched from an API in a real application
  const data = [
    { name: "TypeScript", value: 45, color: "#3178c6" },
    { name: "JavaScript", value: 25, color: "#f7df1e" },
    { name: "Python", value: 15, color: "#3776ab" },
    { name: "HTML/CSS", value: 10, color: "#e34c26" },
    { name: "Other", value: 5, color: "#6c757d" },
  ]

  return (
    <Card className="p-4">
      <h3 className="mb-4 text-lg font-medium">Language Distribution</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {data.map((entry, index) => (
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
  )
}

