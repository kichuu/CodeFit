"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontalIcon } from "lucide-react"
import Link from "next/link"

interface Candidate {
  _id: string
  username: string
  name: string
  avatar: string
  topLanguages: string[]
  status: string
}

interface CandidateTableProps {
  limit?: number
}

export function CandidateTable({ limit }: CandidateTableProps) {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCandidates() {
      try {
        const token = localStorage.getItem("token") // Get token from localStorage
        if (!token) throw new Error("No token found, please log in.")
          console.log(token)
        const res = await fetch("http://localhost:5000/api/candidates/", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`, // Attach token in Authorization header
            "Content-Type": "application/json",
          },
        })

        if (!res.ok) throw new Error("Failed to fetch candidates")
        const data: Candidate[] = await res.json()
      console.log(data)
        setCandidates(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCandidates()
  }, [])

  if (loading) return <p>Loading candidates...</p>
  if (error) return <p className="text-red-500">Error: {error}</p>

  const displayCandidates = limit ? candidates.slice(0, limit) : candidates

  return (
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
        {displayCandidates.map((candidate) => (
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
                <span>0%</span>
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
              <Button variant="ghost" size="icon">
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
