"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";

interface Candidate {
  _id: string;
  username: string;
  name: string;
  avatar: string;
  topLanguages: string[];
  status: string;
  matchPercentByCompany?: { companyId: string; matchPercent: number }[];
}

export function TopCandidatesTable() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCandidates() {
      try {
        const token = localStorage.getItem("token");
        const companyId = localStorage.getItem("companyId");

        if (!token || !companyId) throw new Error("No token or companyId found, please log in.");

        const res = await fetch(`https://codefit.onrender.com/api/candidates/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch candidates");
        let data: Candidate[] = await res.json();

        // Extract company-specific matchPercent
        data = data.map((candidate) => {
          const companyMatch = candidate.matchPercentByCompany?.find((mp) => mp.companyId === companyId);
          return { ...candidate, matchPercent: companyMatch ? companyMatch.matchPercent : 0 };
        });

        // Sort candidates by matchPercent and get top 5
        data = data.sort((a, b) => b.matchPercent - a.matchPercent).slice(0, 5);

        setCandidates(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCandidates();
  }, []);

  if (loading) return <p>Loading candidates...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="space-y-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Candidate</TableHead>
            <TableHead>Match Score</TableHead>
            <TableHead className="hidden md:table-cell">Key Skills</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {candidates.map((candidate) => (
            <TableRow key={candidate._id}>
              <TableCell>
                <Link href={`/candidates/${candidate.username}`} className="flex items-center gap-3 hover:underline">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={candidate.avatar} alt={candidate.name} />
                    <AvatarFallback>{candidate.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span>{candidate.name}</span>
                </Link>
              </TableCell>
              <TableCell>
                <span>{candidate.matchPercent}%</span>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="flex flex-wrap gap-1">
                  {candidate.topLanguages.slice(0, 2).map((skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={candidate.status === "Hired" ? "default" : "secondary"}>{candidate.status}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
