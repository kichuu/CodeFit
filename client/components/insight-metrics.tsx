import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react"

export function InsightMetrics() {
  // This would be fetched from an API in a real application
  const metrics = [
    {
      title: "Candidates with high commit frequency have 35% higher match scores",
      description: "Regular GitHub activity correlates strongly with better overall performance.",
      trend: "up",
    },
    {
      title: "TypeScript developers are hired 28% more often than other languages",
      description: "TypeScript skills are in high demand for your current hiring needs.",
      trend: "up",
    },
    {
      title: "Candidates with diverse language skills have 42% higher match scores",
      description: "Developers proficient in 3+ languages tend to be more adaptable.",
      trend: "up",
    },
    {
      title: "Candidates with low PR review activity have 25% lower match scores",
      description: "Code review participation is a strong indicator of collaboration skills.",
      trend: "down",
    },
    {
      title: "Open source contributors are 3x more likely to be hired",
      description: "Open source experience correlates with better code quality and collaboration.",
      trend: "up",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <div className="flex items-start gap-2">
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full ${
                  metric.trend === "up" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                }`}
              >
                {metric.trend === "up" ? <ArrowUpIcon className="h-4 w-4" /> : <ArrowDownIcon className="h-4 w-4" />}
              </div>
              <div className="space-y-1">
                <h3 className="font-medium">{metric.title}</h3>
                <p className="text-sm text-muted-foreground">{metric.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

