"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  GitlabIcon as GitHubIcon,
  HomeIcon,
  LightbulbIcon,
  ListFilterIcon,
  UserCheckIcon,
  UserPlusIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

export function Sidebar() {
  const pathname = usePathname()

  const routes = [
    {
      name: "Dashboard",
      path: "/",
      icon: HomeIcon,
    },
    {
      name: "Candidates",
      path: "/candidates",
      icon: ListFilterIcon,
    },
    {
      name: "Add Candidate",
      path: "/add-candidate",
      icon: UserPlusIcon,
    },
    {
      name: "Compare",
      path: "/compare",
      icon: GitHubIcon,
    },
    {
      name: "AI Insights",
      path: "/insights",
      icon: LightbulbIcon,
    },
    {
      name: "Hired",
      path: "/hired",
      icon: UserCheckIcon,
    },
  ]

  return (
    <div className="fixed left-0 top-0 h-screen w-16 flex flex-col border-r bg-background p-3 md:w-64">
      <div className="space-y-4 flex-grow">
        <div className="flex h-16 items-center justify-center md:justify-start">
          <Link href="/" className="flex items-center gap-2">
            <GitHubIcon className="h-8 w-8" />
            <span className="hidden text-xl font-bold md:inline-block">GitHub Recruiter</span>
          </Link>
        </div>
        <nav className="space-y-2">
          {routes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className={cn(
                "flex h-10 items-center justify-center rounded-md px-3 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground md:justify-start",
                pathname === route.path && "bg-accent text-accent-foreground",
              )}
            >
              <route.icon className="h-5 w-5" />
              <span className="hidden md:ml-3 md:inline-block">{route.name}</span>
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto flex flex-col items-center gap-2 md:items-start">
        <ThemeToggle />
        <div className="hidden md:block text-xs text-muted-foreground">© 2025 GitHub Recruiter</div>
      </div>
    </div>
  )
}
