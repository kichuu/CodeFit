import { AddCandidateForm } from "@/components/add-candidate-form"

export default function AddCandidatePage() {
  return (
    <div className="ml-16 md:ml-64 p-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add New Candidate</h1>
          <p className="text-muted-foreground">Add a new candidate using their GitHub profile or manual input</p>
        </div>
        <AddCandidateForm />
      </div>
    </div>
  )
}