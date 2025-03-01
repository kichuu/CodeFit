"use client"

import { Card } from "@/components/ui/card"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

export function ContributionChart() {
  // This would be fetched from an API in a real application
  const data = [
    { name: "Jan", commits: 65, pullRequests: 12, issues: 8 },
    { name: "Feb", commits: 78, pullRequests: 15, issues: 10 },
    { name: "Mar", commits: 90, pullRequests: 18, issues: 12 },
    { name: "Apr", commits: 81, pullRequests: 14, issues: 9 },
    { name: "May", commits: 56, pullRequests: 10, issues: 7 },
    { name: "Jun", commits: 55, pullRequests: 9, issues: 6 },
    { name: "Jul", commits: 40, pullRequests: 7, issues: 5 },
    { name: "Aug", commits: 45, pullRequests: 8, issues: 6 },
    { name: "Sep", commits: 67, pullRequests: 13, issues: 9 },
    { name: "Oct", commits: 78, pullRequests: 16, issues: 11 },
    { name: "Nov", commits: 89, pullRequests: 17, issues: 12 },
    { name: "Dec", commits: 99, pullRequests: 20, issues: 14 },
  ]

  return (
    <Card className="p-4">
      <h3 className="mb-4 text-lg font-medium">GitHub Contributions (Last 12 Months)</h3>
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
  )
}

