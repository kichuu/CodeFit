import React from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export function CompareTable() {
  // This would be fetched from an API in a real application
  const metrics = [
    {
      category: "Profile",
      metrics: [
        { name: "Match Score", johnDoe: "87%", janeDoe: "92%" },
        { name: "GitHub Member Since", johnDoe: "May 2018", janeDoe: "Jan 2016" },
        { name: "Repositories", johnDoe: "32", janeDoe: "48" },
      ],
    },
    {
      category: "Activity",
      metrics: [
        { name: "Commits (Last Year)", johnDoe: "245", janeDoe: "178" },
        { name: "Pull Requests (Last Year)", johnDoe: "42", janeDoe: "65" },
        { name: "Issues (Last Year)", johnDoe: "28", janeDoe: "37" },
        { name: "Code Reviews (Last Year)", johnDoe: "35", janeDoe: "52" },
      ],
    },
    {
      category: "Languages",
      metrics: [
        { name: "Primary Language", johnDoe: "TypeScript", janeDoe: "Python" },
        { name: "Secondary Languages", johnDoe: "JavaScript, Python", janeDoe: "TypeScript, Go" },
      ],
    },
    {
      category: "Collaboration",
      metrics: [
        { name: "Open Source Contributions", johnDoe: "Yes", janeDoe: "Yes" },
        { name: "Team Projects", johnDoe: "8", janeDoe: "12" },
        { name: "Average PR Size", johnDoe: "Medium", janeDoe: "Small" },
        { name: "Code Review Thoroughness", johnDoe: "High", janeDoe: "Very High" },
      ],
    },
  ]

  const getBadgeVariant = (value: string) => {
    if (value.includes("%")) {
      const score = Number.parseInt(value)
      if (score >= 90) return "default"
      if (score >= 80) return "secondary"
      return "outline"
    }
    if (value === "High" || value === "Very High") return "default"
    if (value === "Medium") return "secondary"
    if (value === "Low") return "outline"
    return null
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Metric</TableHead>
          <TableHead>John Doe</TableHead>
          <TableHead>Jane Doe</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {metrics.map((category) => (
          <React.Fragment key={category.category}>
            <TableRow>
              <TableCell colSpan={3} className="bg-muted font-medium">
                {category.category}
              </TableCell>
            </TableRow>
            {category.metrics.map((metric) => (
              <TableRow key={metric.name}>
                <TableCell className="font-medium">{metric.name}</TableCell>
                <TableCell>
                  {getBadgeVariant(metric.johnDoe) ? (
                    <Badge variant={getBadgeVariant(metric.johnDoe)}>{metric.johnDoe}</Badge>
                  ) : (
                    metric.johnDoe
                  )}
                </TableCell>
                <TableCell>
                  {getBadgeVariant(metric.janeDoe) ? (
                    <Badge variant={getBadgeVariant(metric.janeDoe)}>{metric.janeDoe}</Badge>
                  ) : (
                    metric.janeDoe
                  )}
                </TableCell>
              </TableRow>
            ))}
          </React.Fragment>
        ))}
      </TableBody>
    </Table>
  )
}

