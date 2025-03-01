"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { XIcon } from "lucide-react"

export function CandidateFilters() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary" className="flex items-center gap-1">
          Match Score: 70%+
          <Button variant="ghost" size="icon" className="h-4 w-4 p-0">
            <XIcon className="h-3 w-3" />
          </Button>
        </Badge>
        <Badge variant="secondary" className="flex items-center gap-1">
          Language: TypeScript
          <Button variant="ghost" size="icon" className="h-4 w-4 p-0">
            <XIcon className="h-3 w-3" />
          </Button>
        </Badge>
        <Badge variant="secondary" className="flex items-center gap-1">
          Status: Pending
          <Button variant="ghost" size="icon" className="h-4 w-4 p-0">
            <XIcon className="h-3 w-3" />
          </Button>
        </Badge>
        <Button variant="ghost" size="sm" className="h-7">
          Clear All
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Status</label>
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="hired">Hired</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Programming Language</label>
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="typescript">TypeScript</SelectItem>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="java">Java</SelectItem>
              <SelectItem value="go">Go</SelectItem>
              <SelectItem value="rust">Rust</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Match Score</label>
            <span className="text-sm text-muted-foreground">70%+</span>
          </div>
          <Slider defaultValue={[70]} max={100} step={5} />
        </div>
      </div>
    </div>
  )
}

