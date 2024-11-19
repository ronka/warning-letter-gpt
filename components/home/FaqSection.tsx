import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "מהו מכתב אזהרה משפטי?",
    answer:
      "מכתב אזהרה משפטי הוא כלי רב עוצמה שנועד להגן על זכויותיך לפני נקיטת צעדים משפטיים פורמליים. כאשר מתפרסם עליך או על העסק שלך מידע כוזב, דיבה או תוכן פוגעני, מכתב אזהרה מנוסח היטב יכול להרתיע את הצד הפוגע ולעצור את הפגיעה.",
  },
  {
    question: "מתי כדאי להשתמש במכתב אזהרה?",
    answer:
      "מומלץ להשתמש במכתב אזהרה במקרים הבאים: מניעת פרסום שקרי עליך או על העסק שלך, הגנה על המוניטין שלך, ופתרון מהיר לפני פנייה להליכים משפטיים יקרים. השירות שלנו מאפשר לך ליצור מכתב אזהרה מקצועי תוך דקות ספורות, וכך לשמור על זכויותיך בצורה יעילה.",
  },
  {
    question: "האם אתר WarningGPT לוקח אחריות משפטית על המכתבים הנוצרים?",
    answer:
      "לא, אתר WarningGPT אינו לוקח אחריות משפטית על המכתבים שהוא מייצר. מכתב האזהרה אינו מסמך משפטי מחייב, ולכן הוא אינו נושא באחריות משפטית בפני עצמו. השימוש במכתבים המיוצרים ובכל תוצאה הנובעת מכך הם באחריות הבלעדית של המשתמש.",
  },
  {
    question: "האם יש צורך בעורך דין ליצירת מכתב אזהרה?",
    answer:
      "אמנם השירות שלנו מספק דרך נוחה ומהירה ליצור מכתב אזהרה, אך במידה ואתה זקוק לייעוץ משפטי מעמיק או במקרה שהעניין מסלים, מומלץ להתייעץ עם עורך דין.",
  },
  {
    question: "כיצד מטופל המידע והפרטיות שלי?",
    answer:
      "המכתבים שנוצרים נשמרים במאגר המידע שלנו באופן מאובטח. רק משתמשים מחוברים יכולים לצפות במכתבים שהם יצרו, ואין גישה למכתבים של משתמשים אחרים. אנו מקפידים על אבטחת המידע ופרטיות המשתמשים שלנו.",
  },
];

export function FaqSection() {
  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            שאלות נפוצות
          </h2>
          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            קבל מידע מהיר על שיטות הפעולה שלנו וכיצד ניתן להשתמש במכתב התראה
            שלנו
          </p>
        </div>
        <div className="mx-auto max-w-3xl mt-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
