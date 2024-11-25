import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function SettingsLoading() {
  return (
    <div className="space-y-6">
      <div className="mb-6 flex items-center justify-between">
        <Skeleton className="h-8 w-32" />
      </div>

      <div className="space-y-4">
        {/* Tabs Skeleton */}
        <div className="border-b">
          <div className="flex space-x-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-24" />
            ))}
          </div>
        </div>

        {/* Content Skeleton */}
        <Card className="p-6">
          <Skeleton className="h-8 w-48 mb-6" />
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
            <Skeleton className="h-10 w-32 mt-6" />
          </div>
        </Card>
      </div>
    </div>
  );
}
