import { Card, CardContent } from "@/components/ui/card"
import { LightbulbIcon } from "lucide-react"

export function InsightRecommendations() {
  // This would be fetched from an API in a real application
  const recommendations = [
    {
      title: "Focus on TypeScript developers",
      description:
        "Based on your hiring patterns, TypeScript developers have been the most successful hires. Consider prioritizing candidates with strong TypeScript skills.",
    },
    {
      title: "Look for open source contributors",
      description:
        "Candidates with open source contributions have shown better collaboration skills and code quality. Filter for candidates with active GitHub projects.",
    },
    {
      title: "Prioritize code review experience",
      description:
        "Candidates who actively participate in code reviews tend to write better code and collaborate more effectively. Look for candidates with PR review history.",
    },
    {
      title: "Consider candidates with diverse language skills",
      description:
        "Developers proficient in multiple languages tend to be more adaptable and learn new technologies faster. Look for candidates with experience in 3+ languages.",
    },
  ]

  return (
    <div className="space-y-4">
      {recommendations.map((recommendation, index) => (
        <Card key={index} className="bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <LightbulbIcon className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-1">
                <h3 className="font-medium">{recommendation.title}</h3>
                <p className="text-sm">{recommendation.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

