import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCheckIcon, TrendingUpIcon } from "lucide-react";

interface Candidate {
  _id: string;
  status: string;
  hireDate: string;
  matchPercentByCompany: { companyId: string; matchPercent: number }[];
}

export function HiredStats() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCandidates() {
      try {
        const token = localStorage.getItem("token");
        const companyId = localStorage.getItem("companyId"); // Get companyId

        if (!token || !companyId) throw new Error("Missing authentication details.");

        const res = await fetch(`https://codefit.onrender.com/api/candidates/`, {
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

  const companyId = localStorage.getItem("companyId");
  if (!companyId) return <p className="text-red-500">Company ID not found</p>;

  // Total hired candidates
  const totalHired = candidates.length;

  // Avg match score calculation using matchPercentByCompany
  const avgMatchScore =
    totalHired > 0
      ? candidates.reduce((acc, candidate) => {
          const matchData = candidate.matchPercentByCompany.find(
            (entry) => entry.companyId === companyId
          );
          return acc + (matchData ? matchData.matchPercent : 0);
        }, 0) / totalHired
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
          <p className="text-xs text-muted-foreground">Build your company</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg. Match Score</CardTitle>
          <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{avgMatchScore.toFixed(2)}%</div>
          <p className="text-xs text-muted-foreground">Find your ideal candidate</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Hired this Month</CardTitle>
          <UserCheckIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalHired}</div>
          <p className="text-xs text-muted-foreground">Build your company</p>
        </CardContent>
      </Card>
    </div>
  );
}
