"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { XIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function CompareSelector() {
  // This would be fetched from an API in a real application
  const candidates = [
    {
      username: "johndoe",
      name: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40",
      matchScore: 87,
    },
    {
      username: "janedoe",
      name: "Jane Doe",
      avatar: "/placeholder.svg?height=40&width=40",
      matchScore: 92,
    },
  ]

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        {candidates.map((candidate, index) => (
          <Card key={candidate.username}>
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
                  <div className="text-sm font-medium">
                    <span
                      className={
                        candidate.matchScore >= 90
                          ? "text-green-500"
                          : candidate.matchScore >= 80
                            ? "text-yellow-500"
                            : "text-red-500"
                      }
                    >
                      {candidate.matchScore}%
                    </span>
                  </div>
                  {index > 0 && (
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <XIcon className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {candidates.length < 3 && (
          <Card className="border-dashed">
            <CardContent className="flex items-center justify-center p-4">
              <div className="text-center">
                <Select>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Add candidate" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bobsmith">Bob Smith</SelectItem>
                    <SelectItem value="alicejones">Alice Jones</SelectItem>
                    <SelectItem value="mikebrown">Mike Brown</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

