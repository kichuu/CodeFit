import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CandidateSearch } from "@/components/candidate-search"
import { CandidateTable } from "@/components/candidate-table"
import { DashboardStats } from "@/components/dashboard-stats"
import { RecentActivity } from "@/components/recent-activity"
import { SetBenchmarkForm } from "@/components/set-benchmark-form"
import { TopCandidatesTable } from "@/components/TopCandidateTable"

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Overview of all analyzed candidates and recruiting metrics</p>
        </div>
        {/* <CandidateSearch /> */}
      </div>
      
      <DashboardStats />

      <div className="grid gap-6 md:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Top Candidates</CardTitle>
            <CardDescription>Candidates with the highest match scores</CardDescription>
          </CardHeader>
          <CardContent>
            <TopCandidatesTable/>
          </CardContent>
        </Card>

        {/* <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest candidate analyses and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivity />
          </CardContent>
        </Card> */}

        <Card className="md:col-span-3 h-fit">
          <CardHeader>
            <CardTitle>Set Benchmark</CardTitle>
            <CardDescription>Use a GitHub profile as a benchmark for candidate comparisons</CardDescription>
          </CardHeader>
          <CardContent>
            <SetBenchmarkForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}