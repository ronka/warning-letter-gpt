import { useState } from "react";

const LetterContent = ({ content }: { content: string }) => {
  const [showFullContent, setShowFullContent] = useState(false);

  return (
    <>
      {content.length > 100 ? (
        <>
          <p>
            {showFullContent ? content : `${content.substring(0, 100)}...`}
            <button
              onClick={() => setShowFullContent(!showFullContent)}
              className="text-blue-500 underline ml-2"
            >
              {showFullContent ? "הצג פחות" : "קרא עוד"}
            </button>
          </p>
        </>
      ) : (
        <p>{content}</p>
      )}
    </>
  );
};

export { LetterContent };
