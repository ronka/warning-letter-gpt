import { WarningLetter } from "./WarningLetter";
import LetterSkeleton from "@/components/LetterSkeleton";
import { Letter } from "@/types/Letter";
import { AutoResizeTextarea } from "@/components/ui/auto-resize-textarea";

interface LetterViewerProps {
  isLoading: boolean;
  isEditing: boolean;
  data: Letter | undefined;
  editedContent: string;
  onEditContentChange: (content: string) => void;
  printMode?: boolean;
}

export function LetterViewer({
  isLoading,
  isEditing,
  data,
  editedContent,
  onEditContentChange,
  printMode,
}: LetterViewerProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        {[...Array(4)].map((_, i) => (
          <LetterSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="space-y-4">
        <div className="font-semibold">{data?.title}</div>
        <div className="text-sm text-muted-foreground">{data?.initialDate}</div>
        <div className="font-semibold">לכבוד: {data?.recipientName}</div>
        <AutoResizeTextarea
          value={editedContent}
          onChange={(e) => onEditContentChange(e.target.value)}
          className="w-full p-4 text-lg leading-relaxed"
          placeholder="תוכן המכתב..."
          dir="rtl"
        />
        <div className="font-semibold mt-4">
          בברכה,
          <br />
          {data?.senderName}
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <WarningLetter
      title={data.title}
      initialDate={data.initialDate}
      recipient={{ name: data.recipientName }}
      letterContent={data.letterContent}
      sender={{ name: data.senderName }}
      printMode={printMode}
    />
  );
}
