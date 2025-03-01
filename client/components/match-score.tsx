"use client"

import { useEffect, useState } from "react"

interface MatchScoreProps {
  score: number
}

export function MatchScore({ score }: MatchScoreProps) {
  const [displayScore, setDisplayScore] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayScore(score)
    }, 100)

    return () => clearTimeout(timer)
  }, [score])

  const getScoreColor = () => {
    if (score >= 90) return "text-green-500"
    if (score >= 80) return "text-yellow-500"
    return "text-red-500"
  }

  return (
    <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-8 border-muted">
      <svg className="absolute h-full w-full" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          strokeDasharray={`${(displayScore / 100) * 251.2} 251.2`}
          strokeDashoffset="0"
          strokeLinecap="round"
          className={getScoreColor()}
          style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
        />
      </svg>
      <div className="text-center">
        <div className={`text-3xl font-bold ${getScoreColor()}`}>{displayScore}%</div>
        <div className="text-xs text-muted-foreground">Match Score</div>
      </div>
    </div>
  )
}

