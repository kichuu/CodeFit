"use client";

import { CandidateSearch } from "@/components/candidate-search";
import { HiredTable } from "@/components/hired-table";
import { HiredFilters } from "@/components/hired-filters";
import { HiredStats } from "@/components/hired-stats";
import { Sidebar } from "@/components/sidebar";

export default function HiredPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 md:ml-64">
        <div className="space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Hired Candidates</h1>
              <p className="text-muted-foreground">
                View and analyze all hired GitHub candidates
              </p>
            </div>
            <CandidateSearch />
          </div>

          <HiredStats />

          <HiredFilters />

          <HiredTable />
        </div>
      </main>
    </div>
  );
}
