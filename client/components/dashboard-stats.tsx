"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { UsersIcon, UserCheckIcon, BarChart3Icon, TrendingUpIcon } from "lucide-react"

const API_URL = "http://localhost:5000/api/candidates"

export function DashboardStats() {
  const [stats, setStats] = useState<{ totalCandidates: number; hiredCandidates: number; averageMatchScore: string; hiringRate: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchStats() {
      const token = localStorage.getItem("token") // Retrieve token dynamically

      if (!token) {
        console.log("No token found. Please log in.")
        setLoading(false)
        return
      }

      try {
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) throw new Error("Failed to fetch data")

        const data = await response.json()

        // ✅ Count total candidates
        const totalCandidates = data.length || 0

        // ✅ Count hired candidates where `status === "hired"`
        const hiredCandidates = data.filter((candidate: { status: string }) => candidate.status === "Hired").length

        // ✅ Calculate average match score (sum all scores and divide by total candidates)
        const totalMatchScore = data.reduce((sum: any, candidate: { matchPercent: any }) => sum + (candidate.matchPercent || 0), 0)
        const averageMatchScore = totalCandidates > 0 ? (totalMatchScore / totalCandidates).toFixed(2) : "0.00"

        // ✅ Calculate hiring rate as a percentage
        const hiringRate = totalCandidates > 0 ? ((hiredCandidates / totalCandidates) * 100).toFixed(2) : "0.00"

        setStats({ totalCandidates, hiredCandidates, averageMatchScore, hiringRate })
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) return <p>Loading stats...</p>
  if (error) return <p className="text-red-500">Error: {error}</p>

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard title="Total Candidates" icon={<UsersIcon className="h-4 w-4 text-muted-foreground" />} value={stats.totalCandidates} />
      <StatCard title="Hired Candidates" icon={<UserCheckIcon className="h-4 w-4 text-muted-foreground" />} value={stats.hiredCandidates} />
      <StatCard title="Average Match Score" icon={<BarChart3Icon className="h-4 w-4 text-muted-foreground" />} value={`${stats.averageMatchScore}%`} />
      <StatCard title="Hiring Rate" icon={<TrendingUpIcon className="h-4 w-4 text-muted-foreground" />} value={`${stats.hiringRate}%`} />
    </div>
  )
}

function StatCard({ title, icon, value }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  )
}
