"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useLetterQuery } from "@/context/Letter";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

export default function Letter() {
  const router = useRouter();
  const params = useParams();
  const letterId = params.id as string;

  const { data, error, isError, isLoading } = useLetterQuery(letterId);

  if (isError) {
    console.error(error);
    router.push("/");
    return null;
  }

  const visibleContent = data?.letter
    ? `לכבוד ${data.letter.to}\n\n${data.letter.title}\n\n${data.letter.body
        .split("\n")
        .slice(0, 6)
        .join("\n")}`
    : "";

  const handleDownload = () => {
    // Implement download functionality here
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Letter Preview</h2>
        <Card className="mb-4 relative overflow-hidden">
          {isLoading ? (
            <div className="p-6 space-y-4">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ) : (
            <>
              <div className="p-6 relative font-serif text-lg leading-relaxed whitespace-pre-wrap">
                <div
                  className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute bottom-0 left-0 right-0 h-12 flex items-center justify-center text-sm">
                  Preview truncated. Download to read full letter.
                </div>
                {visibleContent}
              </div>
            </>
          )}
        </Card>
        <Button
          onClick={handleDownload}
          className="w-full sm:w-auto"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Download Full Letter"}
        </Button>
      </div>
    </section>
  );
}
