import { Card, CardContent } from "@/components/ui/card";
import { CheckCircleIcon, XCircleIcon } from "lucide-react";

interface HireSuggestionProps {
  matchPercent: number;
}

export function HireSuggestion({ matchPercent }: HireSuggestionProps) {
  const shouldHire = matchPercent >= 65;

  return (
    <Card className={`${shouldHire ? 'bg-green-50 dark:bg-green-950/20' : 'bg-red-50 dark:bg-red-950/20'} border-l-4 ${shouldHire ? 'border-l-green-500' : 'border-l-red-500'} mb-4`}>
      <CardContent className="p-4">
        <div className="flex items-center">
          {shouldHire ? (
            <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
          ) : (
            <XCircleIcon className="h-5 w-5 text-red-500 mr-2" />
          )}
          <div>
            <p className="font-medium">
              {shouldHire ? 'Recommended to Hire' : 'Not Recommended'}
            </p>
            <p className="text-sm text-muted-foreground">
              {shouldHire 
                ? `This candidate has a strong match score of ${matchPercent}%, suggesting they would be a good fit for the role.` 
                : `This candidate's match score of ${matchPercent}% is below our hiring threshold of 65%.`}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}