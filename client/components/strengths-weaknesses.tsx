import { CheckCircleIcon, XCircleIcon } from "lucide-react"

interface StrengthsWeaknessesProps {
  strengths: string[]
  weaknesses: string[]
}

export function StrengthsWeaknesses({ strengths, weaknesses }: StrengthsWeaknessesProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-3">
        <h3 className="text-lg font-medium">Strengths</h3>
        <ul className="space-y-2">
          {strengths.map((strength, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircleIcon className="mt-0.5 h-4 w-4 text-green-500" />
              <span className="text-sm">{strength}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-medium">Areas for Improvement</h3>
        <ul className="space-y-2">
          {weaknesses.map((weakness, index) => (
            <li key={index} className="flex items-start gap-2">
              <XCircleIcon className="mt-0.5 h-4 w-4 text-red-500" />
              <span className="text-sm">{weakness}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

