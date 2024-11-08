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
}

export function LetterActions({
  isEditing,
  isLoading,
  isUpdating,
  onSave,
  onCancel,
  onEdit,
  onDownload,
}: LetterActionsProps) {
  if (isEditing) {
    return (
      <>
        <Button onClick={onSave} disabled={isLoading || isUpdating}>
          💾 {isUpdating ? <Spinner /> : "שמור"}
        </Button>
        <Button variant="outline" onClick={onCancel} disabled={isLoading}>
          ❌ ביטול
        </Button>
      </>
    );
  }

  return (
    <>
      <Button variant="outline" onClick={onEdit} disabled={isLoading}>
        🖊️ עריכה
      </Button>
      <Button onClick={onDownload} disabled={isLoading}>
        ↓ {isLoading ? "טוען..." : "להורדה"}
      </Button>
    </>
  );
}
