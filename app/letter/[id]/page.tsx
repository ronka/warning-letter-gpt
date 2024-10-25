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
import { WarningLetter } from "@/components/letter/WarningLetter";

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

  const handleDownload = () => {
    // Implement download functionality here
  };

  const handleEditClick = () => {
    if (!data) return;
    setIsEditing(true);
    setEditedContent(JSON.stringify(data, null, 2));
  };

  const handleSaveClick = async () => {
    if (!data) return;

    try {
      const updatedData = JSON.parse(editedContent);
      await updateLetter(updatedData);
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
            ) : data ? (
              <WarningLetter
                title={data.title}
                initialDate={data.initialDate}
                recipient={{ name: data.recipientName }}
                warningPoints={data.warningPoints}
                sender={{ name: data.senderName }}
              />
            ) : null}
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
