"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GitHubLogoIcon } from "@radix-ui/react-icons"

export function SetBenchmarkForm() {
  const [githubLink, setGithubLink] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would handle the form submission, including the API call to set the benchmark
    console.log("Benchmark set:", githubLink)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="github-benchmark">GitHub Profile URL</Label>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="url"
            id="github-benchmark"
            placeholder="https://github.com/username"
            value={githubLink}
            onChange={(e) => setGithubLink(e.target.value)}
          />
          <Button type="submit">
            <GitHubLogoIcon className="mr-2 h-4 w-4" />
            Set Benchmark
          </Button>
        </div>
      </div>
    </form>
  )
}