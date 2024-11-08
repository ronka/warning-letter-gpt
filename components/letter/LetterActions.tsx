import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

interface LetterActionsProps {
  isEditing: boolean;
  isLoading: boolean;
  isUpdating: boolean;
  onSave: () => void;
  onCancel: () => void;
  onEdit: () => void;
  onDownload: () => void;
  onPrint: () => void;
}

export function LetterActions({
  isEditing,
  isLoading,
  isUpdating,
  onSave,
  onCancel,
  onEdit,
  onDownload,
  onPrint,
}: LetterActionsProps) {
  if (isEditing) {
    return (
      <>
        <Button onClick={onSave} disabled={isLoading || isUpdating}>
          💾 {isUpdating ? <Spinner /> : "שמור"}
        </Button>
        <Button variant="outline" onClick={onCancel} disabled={isLoading}>
          🚫 ביטול
        </Button>
      </>
    );
  }

  return (
    <>
      <Button variant="outline" onClick={onEdit} disabled={isLoading}>
        🖊️ עריכה
      </Button>
      <Button
        variant="outline"
        onClick={onDownload}
        disabled={isLoading}
        className="hidden md:inline-flex"
      >
        📃 הורד PDF
      </Button>
      <Button variant="outline" onClick={onPrint} disabled={isLoading}>
        🖨️ הדפס
      </Button>
    </>
  );
}
