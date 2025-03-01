import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InsightChart } from "@/components/insight-chart"
import { InsightMetrics } from "@/components/insight-metrics"
import { InsightTrends } from "@/components/insight-trends"
import { InsightRecommendations } from "@/components/insight-recommendations"

export default function InsightsPage() {
  return (
    <div className="p-4 pl-16 md:pl-64 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Insights</h1>
        <p className="text-muted-foreground">
          AI-powered analysis of GitHub candidates and hiring trends
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Programming Languages</CardTitle>
            <CardDescription>Most common languages among candidates</CardDescription>
          </CardHeader>
          <CardContent>
            <InsightChart type="languages" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Match Score Distribution</CardTitle>
            <CardDescription>Distribution of candidate match scores</CardDescription>
          </CardHeader>
          <CardContent>
            <InsightChart type="matchScores" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hiring Trends</CardTitle>
          <CardDescription>Analysis of hiring patterns over time</CardDescription>
        </CardHeader>
        <CardContent>
          <InsightTrends />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Key Metrics</CardTitle>
          <CardDescription>Important metrics and correlations</CardDescription>
        </CardHeader>
        <CardContent>
          <InsightMetrics />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AI Recommendations</CardTitle>
          <CardDescription>AI-generated insights and recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <InsightRecommendations />
        </CardContent>
      </Card>
    </div>
  )
}
