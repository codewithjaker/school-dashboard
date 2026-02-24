import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-6">
      {/* Breadcrumb Skeleton */}
      <div className="flex items-center space-x-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-32" />
      </div>

      {/* Header Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-5 w-64" />
      </div>

      {/* Card Skeleton */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Skeleton className="h-7 w-32" />
            <div className="flex items-center space-x-2">
              <Skeleton className="h-10 w-64" />
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-10 w-10" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
