import { Card, CardContent } from "@/components/ui/card"
import { LightbulbIcon } from "lucide-react"

export function CompareRecommendation() {
  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <LightbulbIcon className="h-5 w-5 text-primary" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">AI Recommendation</h3>
            <p className="text-sm">
              Based on the comparison, <strong>Jane Doe</strong> appears to be a better fit for your team. She has a
              higher match score (92% vs 87%) and demonstrates stronger collaboration skills with more team projects and
              thorough code reviews. Her experience with Python would also complement your existing team's TypeScript
              expertise.
            </p>
            <p className="text-sm">
              However, <strong>John Doe</strong> has more consistent commit activity and stronger TypeScript skills,
              which might be valuable if your project is TypeScript-heavy. Consider your specific project needs when
              making the final decision.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

