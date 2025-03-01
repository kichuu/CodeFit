"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontalIcon } from "lucide-react"
import Link from "next/link"

export function HiredTable() {
  // This would be fetched from an API in a real application
  const candidates = [
    {
      username: "janedoe",
      name: "Jane Doe",
      avatar: "/placeholder.svg?height=40&width=40",
      matchScore: 92,
      skills: ["Python", "Django", "AWS"],
      hireDate: "2023-12-15",
      position: "Senior Backend Developer",
    },
    {
      username: "mikebrown",
      name: "Mike Brown",
      avatar: "/placeholder.svg?height=40&width=40",
      matchScore: 81,
      skills: ["Go", "Docker", "PostgreSQL"],
      hireDate: "2023-11-20",
      position: "DevOps Engineer",
    },
    {
      username: "sarahlee",
      name: "Sarah Lee",
      avatar: "/placeholder.svg?height=40&width=40",
      matchScore: 90,
      skills: ["Rust", "WebAssembly", "GraphQL"],
      hireDate: "2023-10-05",
      position: "Systems Engineer",
    },
    {
      username: "davidwilson",
      name: "David Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      matchScore: 88,
      skills: ["TypeScript", "React", "Node.js"],
      hireDate: "2023-09-12",
      position: "Full-stack Developer",
    },
    {
      username: "emilyjohnson",
      name: "Emily Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      matchScore: 85,
      skills: ["Java", "Spring", "Kubernetes"],
      hireDate: "2023-08-28",
      position: "Backend Developer",
    },
  ]

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Candidate</TableHead>
          <TableHead>Position</TableHead>
          <TableHead>Match Score</TableHead>
          <TableHead className="hidden md:table-cell">Key Skills</TableHead>
          <TableHead>Hire Date</TableHead>
          <TableHead className="w-[50px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {candidates.map((candidate) => (
          <TableRow key={candidate.username}>
            <TableCell>
              <Link href={`/candidates/${candidate.username}`} className="flex items-center gap-3 hover:underline">
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
            <TableCell>{candidate.position}</TableCell>
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
            <TableCell>{new Date(candidate.hireDate).toLocaleDateString()}</TableCell>
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

