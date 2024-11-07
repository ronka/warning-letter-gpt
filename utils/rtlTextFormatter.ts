/**
 * Formats text for RTL display in React PDF by handling multiple punctuation marks
 * @param text The input text to format
 * @returns Formatted text with correct RTL punctuation placement
 */
export const formatRTLText = (text: string): string => {
  // Define punctuation marks to handle
  const punctuationMarks = [".", "!", "?", ":", ";", ","];

  // Split text into lines first
  return text
    .split("\n")
    .map((line) => {
      let formattedLine = line.trim();

      // Find any punctuation at the end of the line
      const lastChar = formattedLine[formattedLine.length - 1];
      if (punctuationMarks.includes(lastChar)) {
        // Remove the punctuation from the end
        formattedLine = formattedLine.slice(0, -1);
        // Add it to the beginning with a space
        formattedLine = `${formattedLine}`;
      }

      return formattedLine;
    })
    .join("\n");
};
