"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { XIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Candidate } from "@/app/compare/types"


interface CompareSelectorProps {
  onCompare: (candidates: Candidate[]) => void
}

export function CompareSelector({ onCompare }: CompareSelectorProps) {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [selectedCandidates, setSelectedCandidates] = useState<Candidate[]>([])

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      console.error("No auth token found")
      return
    }

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/candidates`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCandidates(data))
      .catch((err) => console.error("Error fetching candidates:", err))
  }, [])

  const addCandidate = (username: string) => {
    const candidate = candidates.find((c) => c.username === username)
    if (candidate && !selectedCandidates.some((c) => c.username === username)) {
      const updatedCandidates = [...selectedCandidates, candidate]
      setSelectedCandidates(updatedCandidates)
      onCompare(updatedCandidates) // Call onCompare with updated list
    }
  }

  const removeCandidate = (username: string) => {
    const updatedCandidates = selectedCandidates.filter((c) => c.username !== username)
    setSelectedCandidates(updatedCandidates)
    onCompare(updatedCandidates) // Call onCompare with updated list
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        {selectedCandidates.map((candidate) => (
          <Card key={candidate._id}>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={candidate.avatar} alt={candidate.name} />
                  <AvatarFallback>{candidate.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="font-medium">{candidate.name}</div>
                  <div className="text-xs text-muted-foreground">@{candidate.username}</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-sm font-medium text-green-500">
                    {candidate.commitQualityScore.toFixed(1)}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => removeCandidate(candidate.username)}
                  >
                    <XIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {selectedCandidates.length < 3 && (
          <Card className="border-dashed">
            <CardContent className="flex items-center justify-center p-4">
              <Select onValueChange={addCandidate}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Add candidate" />
                </SelectTrigger>
                <SelectContent>
                  {candidates
                    .filter((c) => !selectedCandidates.some((sc) => sc.username === c.username))
                    .map((c) => (
                      <SelectItem key={c._id} value={c.username}>
                        {c.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
