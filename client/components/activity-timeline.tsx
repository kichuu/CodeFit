import { Badge } from "@/components/ui/badge"
import { GitCommitIcon, GitPullRequestIcon, MessageSquareIcon } from "lucide-react"

interface ActivityTimelineProps {
  username: string
}

export function ActivityTimeline({ username }: ActivityTimelineProps) {
  // This would be fetched from an API in a real application
  const activities = [
    {
      id: 1,
      type: "commit",
      repo: "next-app",
      message: "Fix responsive layout issues",
      timestamp: "2 days ago",
    },
    {
      id: 2,
      type: "pull_request",
      repo: "next-app",
      message: "Add dark mode support",
      status: "merged",
      timestamp: "3 days ago",
    },
    {
      id: 3,
      type: "issue",
      repo: "ui-library",
      message: "Button component not working in Safari",
      status: "open",
      timestamp: "5 days ago",
    },
    {
      id: 4,
      type: "commit",
      repo: "ui-library",
      message: "Update documentation",
      timestamp: "1 week ago",
    },
    {
      id: 5,
      type: "pull_request",
      repo: "api-service",
      message: "Implement user authentication",
      status: "open",
      timestamp: "1 week ago",
    },
    {
      id: 6,
      type: "issue",
      repo: "api-service",
      message: "Rate limiting not working correctly",
      status: "closed",
      timestamp: "2 weeks ago",
    },
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "commit":
        return <GitCommitIcon className="h-4 w-4" />
      case "pull_request":
        return <GitPullRequestIcon className="h-4 w-4" />
      case "issue":
        return <MessageSquareIcon className="h-4 w-4" />
      default:
        return null
    }
  }

  const getStatusBadge = (activity: (typeof activities)[0]) => {
    if ("status" in activity) {
      switch (activity.status) {
        case "open":
          return (
            <Badge variant="outline" className="text-green-500 border-green-500">
              Open
            </Badge>
          )
        case "closed":
          return (
            <Badge variant="outline" className="text-red-500 border-red-500">
              Closed
            </Badge>
          )
        case "merged":
          return (
            <Badge variant="outline" className="text-purple-500 border-purple-500">
              Merged
            </Badge>
          )
        default:
          return null
      }
    }
    return null
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
            {getActivityIcon(activity.type)}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-medium">{activity.repo}</span>
              {getStatusBadge(activity)}
            </div>
            <p className="text-sm">{activity.message}</p>
            <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

