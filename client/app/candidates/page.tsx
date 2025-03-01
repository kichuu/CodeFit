import { CandidateSearch } from "@/components/candidate-search"
import { CandidateTable } from "@/components/candidate-table"
import { CandidateFilters } from "@/components/candidate-filters"

export default function CandidatesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Candidates</h1>
          <p className="text-muted-foreground">Browse and filter all analyzed GitHub candidates</p>
        </div>
        <CandidateSearch />
      </div>

      <CandidateFilters />

      <CandidateTable />
    </div>
  )
}

