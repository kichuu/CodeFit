import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCheckIcon, CalendarIcon, ClockIcon, TrendingUpIcon } from "lucide-react";

interface Candidate {
  _id: string;
  status: string;
  matchPercent: number;
  hireDate: string;
}

export function HiredStats() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCandidates() {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found, please log in.");

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/candidates/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch candidates");
        const data: Candidate[] = await res.json();

        // Set only hired candidates
        setCandidates(data.filter((c) => c.status === "Hired"));
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCandidates();
  }, []);

  if (loading) return <p>Loading stats...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  // Total hired candidates
  const totalHired = candidates.length;

  // Avg match score calculation
  const avgMatchScore = totalHired
    ? candidates.reduce((acc, candidate) => acc + candidate.matchPercent, 0) / totalHired
    : 0;

  // Hired candidates this month
  const hiredThisMonth = candidates.filter((candidate) => {
    const hireMonth = new Date(candidate.hireDate).getMonth();
    const currentMonth = new Date().getMonth();
    return hireMonth === currentMonth;
  }).length;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Hired</CardTitle>
          <UserCheckIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalHired}</div>
          <p className="text-xs text-muted-foreground">build your company</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg. Match Score</CardTitle>
          <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{avgMatchScore.toFixed(2)}%</div>
          <p className="text-xs text-muted-foreground">find your ideal candidate</p>
        </CardContent>
      </Card>
{/* 
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg. Time to Hire</CardTitle>
          <ClockIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">14 days</div>
          <p className="text-xs text-muted-foreground">-2 days from last month</p>
        </CardContent>
      </Card> */}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium"> Hired this month</CardTitle>
          <UserCheckIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalHired}</div>
          <p className="text-xs text-muted-foreground">keep up with the pace</p>
        </CardContent>
      </Card>
    </div>
  );
}
