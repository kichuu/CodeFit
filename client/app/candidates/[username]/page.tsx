"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MatchScore } from "@/components/match-score"
import { ContributionChart } from "@/components/contribution-chart"
import { LanguageChart } from "@/components/language-chart"
import { ActivityTimeline } from "@/components/activity-timeline"
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  GitCompareIcon,
  UserCheckIcon,
  XCircleIcon,
} from "lucide-react"
import Link from "next/link"

export default function CandidateProfile() {
  const { username } = useParams<{ username: string }>()
  const [candidate, setCandidate] = useState<any>(null)
  const [matchPercent, setMatchPercent] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!username) return

    const fetchCandidate = async () => {
      try {
        const token = localStorage.getItem("token")
        const companyId = localStorage.getItem("companyId") // Retrieve companyId

        if (!token || !companyId)
          throw new Error("Authorization failed. Please log in again.")

        const response = await fetch(
          `https://codefit.onrender.com/api/candidates/${username}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )

        if (!response.ok) throw new Error("Failed to fetch candidate data")

        const data = await response.json()
        setCandidate(data)

        // Find matchPercent for the logged-in company
        const companyMatch = data.matchPercentByCompany.find(
          (match: any) => match.companyId === companyId
        )

        setMatchPercent(companyMatch ? companyMatch.matchPercent : null)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCandidate()
  }, [username])

  if (loading)
    return (
      <div className="flex justify-center items-center h-40 text-lg">
        Loading candidate data...
      </div>
    )
  if (error)
    return (
      <div className="text-red-500 text-center text-lg">Error: {error}</div>
    )
  if (!candidate)
    return <div className="text-center text-lg">No candidate found</div>

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/candidates">
            <ArrowLeftIcon className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">{candidate.name}</h1>
        <Badge variant={candidate.status === "Hired" ? "default" : "secondary"}>
          {candidate.status}
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Candidate Profile Card */}
        <Card className="md:col-span-1">
          <CardHeader>
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={candidate.avatar || "/placeholder.svg"}
                  alt={candidate.name}
                />
                <AvatarFallback>
                  {candidate.name?.substring(0, 2).toUpperCase() || "NA"}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="mt-4">{candidate.name}</CardTitle>
              <CardDescription className="text-sm">
                <a
                  href={`https://github.com/${candidate.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  @{candidate.username}
                </a>
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <MatchScore score={matchPercent || 0} />
            </div>

            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Bio</div>
              <p className="text-sm">{candidate.bio || "No bio available"}</p>
            </div>

            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Location</div>
              <p className="text-sm">
                {candidate.location || "Location not provided"}
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">
                GitHub Member Since
              </div>
              <p className="text-sm">
                {candidate.joinedGithub
                  ? new Date(candidate.joinedGithub).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Top Languages</div>
              <div className="flex flex-wrap gap-2">
                {candidate.topLanguages?.length ? (
                  candidate.topLanguages.map((language: string) => (
                    <Badge key={language} variant="outline">
                      {language}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No data available
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <Button className="flex-1">
                <UserCheckIcon className="mr-2 h-4 w-4" />
                Mark as Hired
              </Button>
              <Button variant="outline" asChild>
                <Link href={`/compare?candidates=${candidate.username}`}>
                  <GitCompareIcon className="mr-2 h-4 w-4" />
                  Compare
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Section */}
        <Card className="md:col-span-2">
          <CardHeader>
            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="contributions">Contributions</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-6 mt-4">
                <LanguageChart username={username} />
              </TabsContent>
              <TabsContent value="contributions" className="mt-4">
                <ContributionChart username={username} />
              </TabsContent>
              <TabsContent value="activity" className="mt-4">
                <ActivityTimeline username={username} />
              </TabsContent>
            </Tabs>

            {candidate.matchPercent !== undefined && (
              <Card
                className={`border-2 ${
                  candidate.matchPercent >= 65
                    ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                    : "border-red-500 bg-red-50 dark:bg-red-950/20"
                }`}
              >
                {" "}
                <CardContent className="p-4">
                  {" "}
                  <div className="flex items-center gap-2">
                    {" "}
                    {candidate.matchPercent >= 65 ? (
                      <>
                        {" "}
                        <CheckCircleIcon className="h-5 w-5 text-green-500" />{" "}
                        <span className="font-medium">
                          Recommended for hire
                        </span>{" "}
                      </>
                    ) : (
                      <>
                        {" "}
                        <XCircleIcon className="h-5 w-5 text-red-500" />{" "}
                        <span className="font-medium">
                          Not recommended for hire
                        </span>{" "}
                      </>
                    )}{" "}
                  </div>{" "}
                  <p className="text-sm mt-2">
                    {" "}
                    {candidate.matchPercent >= 65
                      ? "This candidate has a strong match with your requirements."
                      : "This candidate may not be the best fit for your requirements."}{" "}
                  </p>{" "}
                </CardContent>{" "}
              </Card>
            )}
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}
