"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GitHubLogoIcon } from "@radix-ui/react-icons"

export function SetBenchmarkForm() {
  const [githubLink, setGithubLink] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!githubLink) return alert("Please enter a valid GitHub URL")

    const token = localStorage.getItem("token") // Fetch token from localStorage or your state management
    if (!token) return alert("You must be logged in to set a benchmark.")

    setLoading(true)

    try {
      const response = await fetch(`https://codefit.onrender.com/api/benchmark/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ githubUrl: githubLink }),
      })

      if (!response.ok) throw new Error("Failed to set benchmark")

      const data = await response.json()
      console.log("Benchmark set:", data)
      alert("Benchmark successfully set!")
    } catch (error) {
      console.error("Error setting benchmark:", error)
      alert("Failed to set benchmark. Please try again.")
    } finally {
      setLoading(false)
    }
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
            disabled={loading}
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Setting..." : (
              <>
                <GitHubLogoIcon className="mr-2 h-4 w-4" />
                Set Benchmark
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  )
}
