"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MatchScore } from "@/components/match-score";
import { ContributionChart } from "@/components/contribution-chart";
import { LanguageChart } from "@/components/language-chart";
import { StrengthsWeaknesses } from "@/components/strengths-weaknesses";
import { ActivityTimeline } from "@/components/activity-timeline";
import { ArrowLeftIcon, GitCompareIcon, UserCheckIcon } from "lucide-react";
import Link from "next/link";

export default function CandidateProfile() {
  const { username } = useParams(); 
  // Get dynamic username from URL
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username) return;

    const fetchCandidate = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/candidates/${username}`);
        if (!response.ok) throw new Error("Failed to fetch candidate data");
        const data = await response.json();
        setCandidate(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidate();
  }, [username]);

  if (loading) return <div className="ml-16 md:ml-64 p-6 flex justify-center items-center h-40 text-lg">Loading candidate data...</div>;
  if (error) return <div className="ml-16 md:ml-64 p-6 text-red-500 text-center text-lg">Error: {error}</div>;
  if (!candidate) return <div className="ml-16 md:ml-64 p-6 text-center text-lg">No candidate found</div>;

  return (
    <div className="ml-16 md:ml-64 p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/candidates">
            <ArrowLeftIcon className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">{candidate.name}</h1>
        <Badge variant={candidate.status === "Hired" ? "default" : "secondary"}>{candidate.status}</Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24">
                <AvatarImage src={candidate.avatar || "/placeholder.svg?height=100&width=100"} alt={candidate.name} />
                <AvatarFallback>{candidate.name?.substring(0, 2).toUpperCase() || "NA"}</AvatarFallback>
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
              <MatchScore score={candidate.matchScore || 0} />
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Bio</div>
              <p className="text-sm">{candidate.bio || "No bio available"}</p>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Location</div>
              <p className="text-sm">{candidate.location || "Location not provided"}</p>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">GitHub Member Since</div>
              <p className="text-sm">
                {candidate.joinedGithub ? new Date(candidate.joinedGithub).toLocaleDateString() : "N/A"}
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Top Languages</div>
              <div className="flex flex-wrap gap-2">
                {candidate.topLanguages?.length ? (
                  candidate.topLanguages.map((language) => (
                    <Badge key={language} variant="outline">
                      {language}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No data available</p>
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
        <Card className="md:col-span-2">
          <CardHeader>
            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="contributions">Contributions</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-6 mt-4">
                <StrengthsWeaknesses strengths={candidate.strengths || []} weaknesses={candidate.weaknesses || []} />
                <LanguageChart username={username} />
              </TabsContent>
              <TabsContent value="contributions" className="mt-4">
                <ContributionChart username={username} />
              </TabsContent>
              <TabsContent value="activity" className="mt-4">
                <ActivityTimeline username={username} />
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}