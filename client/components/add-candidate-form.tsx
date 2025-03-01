"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { GitHubLogoIcon } from "@radix-ui/react-icons"

export function AddCandidateForm() {
  const [githubLink, setGithubLink] = useState("")
  const [manualName, setManualName] = useState("")
  const [manualEmail, setManualEmail] = useState("")
  const [benchmarkCommits, setBenchmarkCommits] = useState(50)
  const [benchmarkPRs, setBenchmarkPRs] = useState(10)
  const [benchmarkIssues, setBenchmarkIssues] = useState(5)
  const [useAI, setUseAI] = useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would handle the form submission, including the API call to process the candidate
    console.log("Form submitted", {
      githubLink,
      manualName,
      manualEmail,
      benchmarkCommits,
      benchmarkPRs,
      benchmarkIssues,
      useAI,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Tabs defaultValue="github" className="w-full">
        <TabsList>
          <TabsTrigger value="github">GitHub Profile</TabsTrigger>
          <TabsTrigger value="manual">Manual Input</TabsTrigger>
        </TabsList>
        <TabsContent value="github" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="github-link">GitHub Profile URL</Label>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                type="url"
                id="github-link"
                placeholder="https://github.com/username"
                value={githubLink}
                onChange={(e) => setGithubLink(e.target.value)}
              />
              <Button type="submit">
                <GitHubLogoIcon className="mr-2 h-4 w-4" />
                Add
              </Button>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="manual" className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="manual-name">Name</Label>
            <Input type="text" id="manual-name" value={manualName} onChange={(e) => setManualName(e.target.value)} />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="manual-email">Email</Label>
            <Input
              type="email"
              id="manual-email"
              value={manualEmail}
              onChange={(e) => setManualEmail(e.target.value)}
            />
          </div>
          <Button type="submit">Add Candidate</Button>
        </TabsContent>
      </Tabs>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Benchmark Settings</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="benchmark-commits">Minimum Commits (last year)</Label>
            <Slider
              id="benchmark-commits"
              min={0}
              max={500}
              step={10}
              value={[benchmarkCommits]}
              onValueChange={(value) => setBenchmarkCommits(value[0])}
            />
            <p className="text-sm text-muted-foreground">{benchmarkCommits} commits</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="benchmark-prs">Minimum Pull Requests (last year)</Label>
            <Slider
              id="benchmark-prs"
              min={0}
              max={100}
              step={5}
              value={[benchmarkPRs]}
              onValueChange={(value) => setBenchmarkPRs(value[0])}
            />
            <p className="text-sm text-muted-foreground">{benchmarkPRs} pull requests</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="benchmark-issues">Minimum Issues (last year)</Label>
            <Slider
              id="benchmark-issues"
              min={0}
              max={50}
              step={1}
              value={[benchmarkIssues]}
              onValueChange={(value) => setBenchmarkIssues(value[0])}
            />
            <p className="text-sm text-muted-foreground">{benchmarkIssues} issues</p>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch id="use-ai" checked={useAI} onCheckedChange={setUseAI} />
        <Label htmlFor="use-ai">Use AI for candidate evaluation</Label>
      </div>

      <Button type="submit">Add Candidate and Set Benchmark</Button>
    </form>
  )
}

