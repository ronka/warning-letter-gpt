"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useLetterQuery, useUpdateLetter } from "@/context/Letter";
import { useRouter } from "next/navigation";
import LetterSkeleton from "@/components/LetterSkeleton";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";

export default function LetterDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const { id } = params;
  const { data, error, isError, isLoading } = useLetterQuery(id);
  const { mutate: updateLetter, isPending: isUpdating } = useUpdateLetter(id);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");

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

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedContent(visibleContent);
  };

  const handleSaveClick = async () => {
    if (!data) return;

    // Split the edited content to update the letter data
    const [to, ...rest] = editedContent.split("\n\n");
    const [title, ...bodyParts] = rest;
    const body = bodyParts.join("\n\n");

    try {
      await updateLetter({
        ...data,
        to: to.replace("לכבוד ", ""),
        title,
        body,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save changes:", error);
      // Implement error handling (e.g., show an error toast)
    }
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
            ) : isEditing ? (
              <Textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full h-[400px] p-6 text-lg leading-relaxed"
              />
            ) : (
              <div className="p-6 relative text-lg leading-relaxed whitespace-pre-wrap">
                {visibleContent}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-center gap-4">
            {isEditing ? (
              <Button
                onClick={handleSaveClick}
                disabled={isLoading || isUpdating}
              >
                💾 {isUpdating ? <Spinner /> : "שמור"}
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={handleEditClick}
                disabled={isLoading}
              >
                🖊️ עריכה
              </Button>
            )}
            <Button onClick={handleDownload} disabled={isLoading || isEditing}>
              ↓ {isLoading ? "טוען..." : "להורדה"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
