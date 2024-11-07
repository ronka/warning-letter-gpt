import { Letter } from "@/types/Letter";
import {
  Page,
  Text,
  Document,
  StyleSheet,
  View,
  Font,
} from "@react-pdf/renderer";

Font.register({
  family: "Rubik",
  format: "truetype",
  src: "http://fonts.gstatic.com/s/rubik/v3/4sMyW_teKWHB3K8Hm-Il6A.ttf",
});

// Create styles
const styles = StyleSheet.create({
  viewer: {
    width: "100%",
    height: "100vh",
  },
  page: {
    padding: 50,
    direction: "rtl",
    fontFamily: "Rubik",
    writingMode: "horizontal-tb",
  },
  header: {
    marginBottom: 20,
  },
  date: {
    textAlign: "left",
    fontSize: 12,
  },
  recipient: {
    textAlign: "right",
    fontSize: 12,
    marginBottom: 10,
  },
  subject: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
  },
  content: {
    fontSize: 12,
    lineHeight: 1.5,
    textAlign: "right",
    marginBottom: 40,
  },
  signature: {
    textAlign: "right",
    fontSize: 12,
  },
});

interface LetterPDFProps {
  letter: Letter;
}

export const LetterPDF = ({ letter }: LetterPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.date}>{letter.initialDate}</Text>
      </View>

      <Text style={styles.recipient}>:עבור</Text>
      <Text style={styles.recipient}>{letter.recipientName}</Text>

      <Text style={styles.subject}>הנדון: {letter.title}</Text>

      <View style={styles.content}>
        <Text>{letter.letterContent}</Text>
      </View>

      <View style={styles.signature}>
        <Text>,בכבוד רב ובברכה</Text>
        <Text>{letter.senderName}</Text>
      </View>
    </Page>
  </Document>
);

// interface LetterPDFProps {
//   letter: Letter;
// }

// export const LetterPDF = ({ letter }: LetterPDFProps) => (
//   <Document>
//     <Page size="A4" style={styles.page}>
//       <View style={styles.header}>
//         <Text style={styles.title}>{letter.title}</Text>
//         <Text style={styles.date}>{letter.initialDate}</Text>
//       </View>
//       <Text style={styles.recipient}>לכבוד: {letter.recipientName}</Text>
//       <Text style={styles.content}>{letter.letterContent}</Text>
//       <Text style={styles.sender}>
//         בברכה,{"\n"}
//         {letter.senderName}
//       </Text>
//     </Page>
//   </Document>
// );
