"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { XIcon } from "lucide-react"
import { DatePickerWithRange } from "@/components/date-range-picker"

export function HiredFilters() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary" className="flex items-center gap-1">
          Date: Last 3 months
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
        <Button variant="ghost" size="sm" className="h-7">
          Clear All
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <label className="text-sm font-medium">Date Range</label>
          <DatePickerWithRange />
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

        <div className="space-y-2">
          <label className="text-sm font-medium">Sort By</label>
          <Select defaultValue="date">
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Hire Date (Newest)</SelectItem>
              <SelectItem value="date-asc">Hire Date (Oldest)</SelectItem>
              <SelectItem value="score">Match Score (Highest)</SelectItem>
              <SelectItem value="score-asc">Match Score (Lowest)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

