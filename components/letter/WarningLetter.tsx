interface WarningLetterProps {
  title: string;
  initialDate: string;
  recipient: {
    name: string;
  };
  letterContent: string;
  sender: {
    name: string;
  };
  printMode?: boolean;
}

function WarningLetter({
  initialDate,
  recipient,
  letterContent,
  sender,
  title,
  printMode,
}: WarningLetterProps) {
  const contentLines = letterContent.split("\n");

  return (
    <div
      className={
        !printMode ? "bg-muted flex items-center justify-center p-2 md:p-4" : ""
      }
    >
      <div
        className={`bg-white p-4 md:p-8 ${
          printMode ? "print-only" : "rounded-lg shadow-lg max-w-2xl w-full"
        }`}
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

        <div className="space-y-4 mb-8">
          {contentLines.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>

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
