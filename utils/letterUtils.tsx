import { Letter } from "@/types/Letter";
import { pdf } from "@react-pdf/renderer";
import { LetterPDF } from "@/components/letter/LetterPDF";

export async function downloadLetterAsPDF(letter: Letter) {
  const blob = await pdf(<LetterPDF letter={letter} />).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${letter.title || "warning-letter"}.pdf`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function createLetterUpdatePayload(
  data: Letter,
  editedContent: string
): Partial<Letter> {
  return {
    id: data.id,
    title: data.title,
    initialDate: data.initialDate,
    recipientName: data.recipientName,
    senderName: data.senderName,
    letterContent: editedContent,
    user_id: data.user_id,
    createdAt: data.createdAt,
    updatedAt: new Date(),
  };
}
