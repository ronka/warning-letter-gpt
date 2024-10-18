"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useLetterQuery } from "@/context/Letter";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import LetterSkeleton from "@/components/LetterSkeleton";

export default function LetterDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const { id } = params;
  const { data, error, isError, isLoading } = useLetterQuery(id);

  if (isError) {
    console.error(error);
    router.push("/");
    return null;
  }

  const visibleContent = data
    ? `לכבוד ${data.to}\n\n${data.title}\n\n${data.body}`
    : "";

  const handleDownload = () => {
    // Implement download functionality here
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 max-w-lg">
        <Card className="mb-4 relative overflow-hidden">
          {isLoading ? (
            <div className="p-6 space-y-4">
              <LetterSkeleton />
            </div>
          ) : (
            <div className="p-6 relative font-serif text-lg leading-relaxed whitespace-pre-wrap">
              {visibleContent}
            </div>
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
