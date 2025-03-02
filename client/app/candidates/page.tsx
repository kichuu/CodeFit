"use client";

import { useState } from "react";
import { CandidateSearch } from "@/components/candidate-search";
import { CandidateTable } from "@/components/candidate-table";
import { CandidateFilters } from "@/components/candidate-filters";

export default function CandidatesPage() {
  console.log(process.env.NEXT_PUBLIC_BACKEND_URL)
  const [filters, setFilters] = useState({ status: "all", language: "all", matchScore: 0 });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Candidates</h1>
          <p className="text-muted-foreground">Browse and filter all analyzed GitHub candidates</p>
        </div>
        <CandidateSearch />
      </div>

      {/* <CandidateFilters filters={filters} setFilters={setFilters} /> */}
    
      <CandidateTable filters={filters} />

    </div>
  );
}
