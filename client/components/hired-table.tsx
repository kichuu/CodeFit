"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";

interface MatchPercent {
  companyId: string;
  matchPercent: number;
}

interface Candidate {
  _id: string;
  username: string;
  name: string;
  avatar: string;
  topLanguages: string[];
  status: string;
  matchPercent: number;
  updatedAt: string;
  position: string;
  matchPercentByCompany: MatchPercent[];
}

export function HiredTable() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const companyId = typeof window !== "undefined" ? localStorage.getItem("companyId") : null; // Ensure we get it in client-side

  useEffect(() => {
    async function fetchCandidates() {
      try {
        const token = localStorage.getItem("token");

        if (!token) throw new Error("No token found, please log in.");
        if (!companyId) throw new Error("No company ID found.");

        const res = await fetch(`https://codefit.onrender.com/api/candidates/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch candidates");
        const data: Candidate[] = await res.json();

        // Filter only hired candidates
        const hiredCandidates = data.filter((c) => c.status === "Hired");
        setCandidates(hiredCandidates);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCandidates();
  }, [companyId]);

  if (loading) return <p>Loading hired candidates...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Total Hired Candidates: {candidates.length}</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Candidate</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Match Score</TableHead>
            <TableHead className="hidden md:table-cell">Key Skills</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {candidates.map((candidate) => {
            // Calculate the match score for the current company
            const companyMatch = candidate.matchPercentByCompany.find((m) => m.companyId === companyId);
            const matchScore = companyMatch ? companyMatch.matchPercent : candidate.matchPercent;

            return (
              <TableRow key={candidate._id}>
                <TableCell>
                  <Link href={`/candidates/${candidate.username}`} className="flex items-center gap-3 hover:underline">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={candidate.avatar} alt={candidate.name} />
                      <AvatarFallback>{candidate.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{candidate.name}</div>
                      <div className="text-xs text-muted-foreground">@{candidate.username}</div>
                    </div>
                  </Link>
                </TableCell>
                <TableCell>{candidate.position}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span
                      className={`mr-2 h-2 w-2 rounded-full ${
                        matchScore >= 90 ? "bg-green-500" : matchScore >= 80 ? "bg-yellow-500" : "bg-red-500"
                      }`}
                    ></span>
                    <span>{matchScore}%</span>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex flex-wrap gap-1">
                    {candidate.topLanguages.slice(0, 2).map((skill) => (
                      <Badge key={skill} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                    {candidate.topLanguages.length > 2 && (
                      <Badge variant="outline">+{candidate.topLanguages.length - 2}</Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>{new Date(candidate.updatedAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontalIcon className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
