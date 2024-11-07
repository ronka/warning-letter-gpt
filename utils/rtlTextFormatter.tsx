import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { ReactNode } from "react";

const styles = StyleSheet.create({
  lineContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },
  text: {
    marginBottom: 8,
  },
  numberText: {
    marginLeft: 4,
  },
  lineText: {
    width: "90%",
    marginHorizontal: 16,
  },
});

const extractNumberAndText = (line: string) => {
  const numberMatch = line.match(/^(\d+\.)\s*/);
  if (!numberMatch) return { number: null, text: line.trim() };

  const [fullMatch, number] = numberMatch;
  return {
    number,
    text: line.slice(fullMatch.length).trim(),
  };
};

const handlePunctuation = (text: string) => {
  const punctuationMarks = [".", "!", "?", ":", ";", ","];
  const lastChar = text[text.length - 1];

  return {
    cleanText: punctuationMarks.includes(lastChar) ? text.slice(0, -1) : text,
    hasPunctuation: punctuationMarks.includes(lastChar),
  };
};

export const formatRTLText = (text: string): ReactNode[] => {
  return text.split("\n").map((line, lineIndex) => {
    const { number, text: extractedText } = extractNumberAndText(line);
    const { cleanText, hasPunctuation } = handlePunctuation(extractedText);

    if (number) {
      return (
        <View key={lineIndex} style={styles.lineContainer}>
          <Text style={styles.lineText}>{cleanText}</Text>
          <Text style={styles.numberText}>
            {number.split("").reverse().join("")}
          </Text>
        </View>
      );
    }

    return (
      <Text key={lineIndex} style={styles.text}>
        {cleanText}
      </Text>
    );
  });
};
