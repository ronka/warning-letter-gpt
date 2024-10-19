"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useLetterQuery } from "@/context/Letter";
import { useRouter } from "next/navigation";
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
      <div className="container mx-auto px-4">
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              מכתב ההתראה שלך
            </CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            {isLoading ? (
              <div className="flex flex-col gap-4">
                <LetterSkeleton />
                <LetterSkeleton />
                <LetterSkeleton />
                <LetterSkeleton />
              </div>
            ) : (
              <div className="p-6 relative  text-lg leading-relaxed whitespace-pre-wrap">
                {visibleContent}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-center gap-4">
            <Button
              variant="outline"
              onClick={() => router.push(`/letter/${id}/edit`)}
            >
              🖊️ עריכה
            </Button>
            <Button onClick={handleDownload} disabled={isLoading}>
              ↓ {isLoading ? "טוען..." : "להורדה"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
