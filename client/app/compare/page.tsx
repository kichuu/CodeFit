"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CompareChart } from "@/components/compare-chart"
import { CompareSelector } from "@/components/compare-selector"
import { CompareTable } from "@/components/compare-table"
import { CompareRecommendation } from "@/components/compare-recommendation"
import {Candidate} from "./types"



export default function ComparePage() {
  const [selectedCandidates, setSelectedCandidates] = useState<Candidate[]>([])

  // Function to update selected candidates from CompareSelector
  const handleCompare = (candidates: Candidate[]): void => {
    setSelectedCandidates(candidates)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Compare Candidates</h1>
        <p className="text-muted-foreground">Side-by-side comparison of GitHub candidates</p>
      </div>

      {/* Pass handleCompare function to CompareSelector */}
      <CompareSelector onCompare={handleCompare} />

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Skills Comparison</CardTitle>
            <CardDescription>Comparison of programming languages and technical skills</CardDescription>
          </CardHeader>
          <CardContent>
            <CompareChart candidates={selectedCandidates} type="skills" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activity Comparison</CardTitle>
            <CardDescription>Comparison of GitHub activity metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <CompareChart candidates={selectedCandidates} type="activity" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Detailed Metrics</CardTitle>
            <CardDescription>Side-by-side comparison of all metrics</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Pass selectedCandidates to CompareTable */}
            <CompareTable candidates={selectedCandidates} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Recommendation</CardTitle>
            <CardDescription>AI-generated recommendation based on comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <CompareRecommendation />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
