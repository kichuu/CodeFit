"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontalIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { CandidateFilters } from "@/components/candidate-filters";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Candidate {
  _id: string;
  username: string;
  name: string;
  avatar: string;
  topLanguages: string[];
  status: string;
  matchPercentByCompany?: { companyId: string; matchPercent: number }[];
  matchPercent?: number;
}

export function CandidateTable() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    status: "all",
    language: "all",
    matchScore: 20,
  });

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

        setCandidates(data);
        setFilteredCandidates(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCandidates();
  }, []);

  useEffect(() => {
    const filtered = candidates.filter((candidate) => {
      return (
        (filters.status === "all" || candidate.status.toLowerCase() === filters.status) &&
        (filters.language === "all" || candidate.topLanguages.includes(filters.language)) &&
        candidate.matchPercent !== undefined &&
        candidate.matchPercent >= filters.matchScore
      );
    });

    setFilteredCandidates(filtered);
  }, [filters, candidates]);

  const updateCandidateStatus = async (username: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found, please log in.");

      const res = await fetch(`https://codefit.onrender.com/api/candidates/${username}/Hired`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update status");
      }

      const { candidate } = await res.json();

      // Update UI with response data
      setCandidates((prev) =>
        prev.map((c) => (c.username === username ? { ...c, status: candidate.status } : c))
      );
    } catch (err: any) {
      alert(err.message);
    }
  };

  const deleteCandidate = async (username: string) => {
    if (!confirm(`Are you sure you want to delete ${username}?`)) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found, please log in.");

      const res = await fetch(`https://codefit.onrender.com/api/candidates/${username}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to delete candidate");

      // Remove from UI
      setCandidates((prev) => prev.filter((c) => c.username !== username));
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) return <p>Loading candidates...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="space-y-6">
      <CandidateFilters filters={filters} setFilters={setFilters} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Candidate</TableHead>
            <TableHead>Match Score</TableHead>
            <TableHead className="hidden md:table-cell">Key Skills</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCandidates.map((candidate) => (
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
                <div className="flex items-center">
                  <span className="mr-2 h-2 w-2 rounded-full bg-gray-400"></span>
                  <span>{candidate.matchPercent}%</span>
                </div>
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
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontalIcon className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {candidate.status !== "Hired" && (
                      <DropdownMenuItem onClick={() => updateCandidateStatus(candidate.username)}>
                        Mark as Hired
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={() => alert("Update feature coming soon!")}>
                      Update Status
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => deleteCandidate(candidate.username)} className="text-red-500">
                      <Trash2Icon className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
