"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useLetterQuery, useUpdateLetter } from "@/context/Letter";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { LetterViewer } from "@/components/letter/LetterViewer";
import { LetterActions } from "@/components/letter/LetterActions";
import {
  downloadLetterAsPDF,
  createLetterUpdatePayload,
} from "@/utils/letterUtils";

export default function LetterDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const { toast } = useToast();
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

  const handleDownload = async () => {
    if (!data) return;
    try {
      await downloadLetterAsPDF(data);
      toast({
        title: "הורדה הצליחה",
        description: "המכתב הורד בהצלחה",
      });
    } catch (error) {
      console.error("Failed to download PDF:", error);
      toast({
        variant: "destructive",
        title: "שגיאה בהורדה",
        description: "לא הצלחנו להוריד את המכתב. אנא נסה שוב.",
      });
    }
  };

  const handleSave = async () => {
    if (!data) return;
    try {
      const updatePayload = createLetterUpdatePayload(data, editedContent);
      await updateLetter(updatePayload);
      setIsEditing(false);
      toast({
        title: "נשמר בהצלחה",
        description: "המכתב עודכן בהצלחה",
      });
    } catch (error) {
      console.error("Failed to save changes:", error);
      toast({
        variant: "destructive",
        title: "שגיאה בשמירה",
        description: "לא הצלחנו לשמור את השינויים. אנא נסה שוב.",
      });
    }
  };

  const handleEdit = () => {
    if (!data) return;
    setIsEditing(true);
    setEditedContent(data.letterContent);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedContent("");
  };

  return (
    <section className="py-12">
      <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">מכתב ההתראה שלך</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <LetterViewer
            isLoading={isLoading}
            isEditing={isEditing}
            data={data}
            editedContent={editedContent}
            onEditContentChange={(content) => setEditedContent(content)}
          />
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <LetterActions
            isEditing={isEditing}
            isLoading={isLoading}
            isUpdating={isUpdating}
            onSave={handleSave}
            onCancel={handleCancel}
            onEdit={handleEdit}
            onDownload={handleDownload}
          />
        </CardFooter>
      </Card>
    </section>
  );
}
