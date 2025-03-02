"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { XIcon } from "lucide-react";

interface CandidateFiltersProps {
  filters: { status: string; language: string; matchScore: number };
  setFilters: (filters: { status: string; language: string; matchScore: number }) => void;
}

export function CandidateFilters({ filters, setFilters }: CandidateFiltersProps) {
  const handleChange = (key: string, value: string | number) => {
    setFilters({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    setFilters({ status: "all", language: "all", matchScore: 0 });
  };

  return (
    <div className="space-y-4">
      {/* Active filters display */}
      <div className="flex flex-wrap gap-2">
        {filters.matchScore > 0 && (
          <Badge variant="secondary" className="flex items-center gap-1">
            Match Score: {filters.matchScore}%+
            <Button variant="ghost" size="icon" className="h-4 w-4 p-0" onClick={() => handleChange("matchScore", 0)}>
              <XIcon className="h-3 w-3" />
            </Button>
          </Badge>
        )}
        {filters.language !== "all" && (
          <Badge variant="secondary" className="flex items-center gap-1">
            Language: {filters.language}
            <Button variant="ghost" size="icon" className="h-4 w-4 p-0" onClick={() => handleChange("language", "all")}>
              <XIcon className="h-3 w-3" />
            </Button>
          </Badge>
        )}
        {filters.status !== "all" && (
          <Badge variant="secondary" className="flex items-center gap-1">
            Status: {filters.status}
            <Button variant="ghost" size="icon" className="h-4 w-4 p-0" onClick={() => handleChange("status", "all")}>
              <XIcon className="h-3 w-3" />
            </Button>
          </Badge>
        )}
        <Button variant="ghost" size="sm" className="h-7" onClick={clearFilters}>
          Clear All
        </Button>
      </div>

      {/* Filter controls */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Status</label>
          <Select value={filters.status} onValueChange={(value) => handleChange("status", value)}>
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
          <Select value={filters.language} onValueChange={(value) => handleChange("language", value)}>
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
            <span className="text-sm text-muted-foreground">{filters.matchScore}%+</span>
          </div>
          <Slider value={[filters.matchScore]} max={100} step={5} onValueChange={(value) => handleChange("matchScore", value[0])} />
        </div>
      </div>
    </div>
  );
}
