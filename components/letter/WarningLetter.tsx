import { useState } from "react";

interface WarningLetterProps {
  title: string;
  initialDate: string;
  recipient: {
    name: string;
  };
  warningPoints: string[];
  sender: {
    name: string;
  };
}

function WarningLetter({
  initialDate,
  recipient,
  warningPoints,
  sender,
  title,
}: WarningLetterProps) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div
        className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full"
        dir="rtl"
      >
        <div className="text-right mb-4">
          <p>{initialDate}</p>
        </div>

        <div className="mb-6">
          <p>עבור:</p>
          <p>{recipient.name}</p>
        </div>

        <h1 className="text-2xl font-bold mb-4 text-center">הנדון: {title}</h1>

        <ol className="space-y-4 mb-8">
          {warningPoints.map((point, index) => (
            <li key={index}>
              {index + 1}. {point}
            </li>
          ))}
        </ol>

        <div className="mt-8">
          <div className="w-40 h-20 border-b border-black mb-2"></div>
          <p>בכבוד רב ובברכה,</p>
          <p>{sender.name}</p>
        </div>
      </div>
    </div>
  );
}

export { WarningLetter };
