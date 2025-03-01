import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentActivity() {
  // This would be fetched from an API in a real application
  const activities = [
    {
      id: 1,
      type: "new_candidate",
      username: "johndoe",
      name: "John Doe",
      avatar: "/placeholder.svg?height=32&width=32",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      type: "hired",
      username: "janedoe",
      name: "Jane Doe",
      avatar: "/placeholder.svg?height=32&width=32",
      timestamp: "5 hours ago",
    },
    {
      id: 3,
      type: "updated",
      username: "bobsmith",
      name: "Bob Smith",
      avatar: "/placeholder.svg?height=32&width=32",
      timestamp: "Yesterday",
    },
    {
      id: 4,
      type: "new_candidate",
      username: "alicejones",
      name: "Alice Jones",
      avatar: "/placeholder.svg?height=32&width=32",
      timestamp: "Yesterday",
    },
    {
      id: 5,
      type: "hired",
      username: "mikebrown",
      name: "Mike Brown",
      avatar: "/placeholder.svg?height=32&width=32",
      timestamp: "2 days ago",
    },
  ]

  const getActivityText = (activity: (typeof activities)[0]) => {
    switch (activity.type) {
      case "new_candidate":
        return "was added as a new candidate"
      case "hired":
        return "was hired"
      case "updated":
        return "profile was updated"
      default:
        return "had activity"
    }
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={activity.avatar} alt={activity.name} />
            <AvatarFallback>{activity.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="font-medium">{activity.name}</span> {getActivityText(activity)}
            </p>
            <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

