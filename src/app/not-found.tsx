import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="mx-auto max-w-md text-center">
        {/* Status Code */}
        <div className="text-9xl font-bold text-muted-foreground">404</div>

        {/* Title */}
        <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
          Page not found
        </h1>

        {/* Description */}
        <p className="mt-4 text-lg text-muted-foreground">
          Sorry, we couldn't find the page you're looking for.
        </p>

        {/* Action Button */}
        <Button asChild className="mt-8">
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
