"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  GitlabIcon as GitHubIcon,
  HomeIcon,
  LightbulbIcon,
  ListFilterIcon,
  UserCheckIcon,
  UserPlusIcon,
  LogOutIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const routes = [
    {
      name: "Dashboard",
      path: "/dashboard",
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

  const handleLogout = () => {
    localStorage.clear()
    router.push("/")
  }

  return (
    <>
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-screen w-16 flex flex-col justify-between border-r bg-background p-3 md:w-64">
        <div className="space-y-4">
          <div className="flex h-16 items-center justify-center md:justify-start">
            <Link href="/dashboard" className="flex items-center gap-2">
              <GitHubIcon className="h-8 w-8" />
              <span className="hidden text-xl font-bold md:inline-block">CodeFit</span>
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
        <div className="flex flex-col items-center gap-2 md:items-start">
          <button
            onClick={handleLogout}
            className="flex h-10 w-full items-center justify-center rounded-md px-3 text-muted-foreground transition-colors hover:bg-red-500 hover:text-white md:justify-start"
          >
            <LogOutIcon className="h-5 w-5" />
            <span className="hidden md:ml-3 md:inline-block">Logout</span>
          </button>
          <ThemeToggle />
          <div className="hidden md:block text-xs text-muted-foreground">© 2025 CodeFit</div>
        </div>
      </div>

      {/* Content Wrapper */}
      <div className="pl-16 md:pl-64">
        {/* Your main page content should be wrapped in this div */}
      </div>
    </>
  )
}
