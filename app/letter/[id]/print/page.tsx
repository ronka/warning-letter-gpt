"use client";

import { useRouter } from "next/navigation";
import { useLetterQuery } from "@/context/Letter";

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

  if (!data || isLoading) return null;

  const { initialDate, recipientName, letterContent, senderName, title } = data;

  const contentLines = letterContent.split("\n");

  return (
    <div className={`bg-white p-4 md:p-8 `} dir="rtl">
      <div className="text-right mb-4">
        <p>{initialDate}</p>
      </div>

      <div className="mb-6">
        <p>עבור:</p>
        <p>{recipientName}</p>
      </div>

      <h1 className="text-2xl font-bold mb-4 text-center">הנדון: {title}</h1>

      <div className="space-y-4 mb-8">
        {contentLines.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>

      <div className="mt-8">
        <div className="w-40 h-20 border-b border-black mb-2"></div>
        <p>בכבוד רב ובברכה,</p>
        <p>{senderName}</p>
      </div>
    </div>
  );
}
