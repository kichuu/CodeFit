"use client"

import { SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/input"

export function CandidateSearch() {
  return (
    <div className="relative w-full max-w-sm">
      <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input type="search" placeholder="Search candidates..." className="w-full pl-8" />
    </div>
  )
}

