"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation" // Import useRouter for redirection
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { GitHubLogoIcon } from "@radix-ui/react-icons"

export function AddCandidateForm() {
  const [githubLink, setGithubLink] = useState("")
  const [useAI, setUseAI] = useState(true)
  const [loading, setLoading] = useState(false)
  const router = useRouter() // Initialize Next.js router

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!githubLink.trim()) return

    setLoading(true)
    try {
      const token = localStorage.getItem("token") || "" // Fetch JWT from localStorage

      const response = await fetch(`https://codefit-8ggk.onrender.com/api/candidates/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ githubUrl: githubLink }),
      })

      if (!response.ok) {
        throw new Error("Failed to add candidate")
      }

      // Extract GitHub username from the URL
      const username = githubLink.split("github.com/")[1]

      console.log("Candidate added successfully:", username)
      setGithubLink("") // Clear input field

      // Redirect to the candidate page
      router.push(`/candidates/${username}`)
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="github-link">GitHub Profile URL</Label>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="url"
              id="github-link"
              placeholder="https://github.com/username"
              value={githubLink}
              onChange={(e) => setGithubLink(e.target.value)}
              required
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : (
                <>
                  <GitHubLogoIcon className="mr-2 h-4 w-4" />
                  Add
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch id="use-ai" checked={useAI} onCheckedChange={setUseAI} />
        <Label htmlFor="use-ai">Use AI for candidate evaluation</Label>
      </div>
    </form>
  )
}
