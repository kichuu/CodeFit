"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontalIcon } from "lucide-react"
import Link from "next/link"

interface CandidateTableProps {
  limit?: number
}

export function CandidateTable({ limit }: CandidateTableProps) {
  // This would be fetched from an API in a real application
  const candidates = [
    {
      username: "johndoe",
      name: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40",
      matchScore: 87,
      skills: ["TypeScript", "React", "Node.js"],
      status: "Pending",
    },
    {
      username: "janedoe",
      name: "Jane Doe",
      avatar: "/placeholder.svg?height=40&width=40",
      matchScore: 92,
      skills: ["Python", "Django", "AWS"],
      status: "Hired",
    },
    {
      username: "bobsmith",
      name: "Bob Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      matchScore: 78,
      skills: ["JavaScript", "Vue", "Express"],
      status: "Pending",
    },
    {
      username: "alicejones",
      name: "Alice Jones",
      avatar: "/placeholder.svg?height=40&width=40",
      matchScore: 85,
      skills: ["Java", "Spring", "Kubernetes"],
      status: "Pending",
    },
    {
      username: "mikebrown",
      name: "Mike Brown",
      avatar: "/placeholder.svg?height=40&width=40",
      matchScore: 81,
      skills: ["Go", "Docker", "PostgreSQL"],
      status: "Hired",
    },
    {
      username: "sarahlee",
      name: "Sarah Lee",
      avatar: "/placeholder.svg?height=40&width=40",
      matchScore: 90,
      skills: ["Rust", "WebAssembly", "GraphQL"],
      status: "Pending",
    },
  ]

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
          <TableRow key={candidate.username}>
            <TableCell>
              <Link href={`/candidates/:${candidate.username}`} className="flex items-center gap-3 hover:underline">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={candidate.avatar} alt={candidate.name} />
                  <AvatarFallback>{candidate.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{candidate.name}</div>
                  <div className="text-xs text-muted-foreground">@{candidate.username}</div>
                </div>
              </Link>
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                <span
                  className={`mr-2 h-2 w-2 rounded-full ${
                    candidate.matchScore >= 90
                      ? "bg-green-500"
                      : candidate.matchScore >= 80
                        ? "bg-yellow-500"
                        : "bg-red-500"
                  }`}
                ></span>
                <span>{candidate.matchScore}%</span>
              </div>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              <div className="flex flex-wrap gap-1">
                {candidate.skills.slice(0, 2).map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
                {candidate.skills.length > 2 && <Badge variant="outline">+{candidate.skills.length - 2}</Badge>}
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

