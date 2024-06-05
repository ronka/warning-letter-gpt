import { type FormData } from "@/components/CreateForm";
import { NextRequest, NextResponse } from "next/server";

const parseFormData = (formData: globalThis.FormData): FormData => {
  const data = {} as FormData;

  formData.forEach((value, key) => {
    if (key === "file[]") {
      data["file"] = Array.isArray(data["file"])
        ? [...data["file"], value]
        : [value];
    } else {
      const parsedKey = key as keyof FormData;

      data[parsedKey] = value;
    }
  });

  return data;
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const data = parseFormData(formData);

    // Return response
    return NextResponse.json({
      id: "1",
      content: `אורי ברוך הנכבד,

	  הנדון: דרישה להסרת פוסט והתנצלות פומבית בגין לשון הרע
	  
	  בהתאם להוראות חוק איסור לשון הרע, תשכ"ה-1965, אני פונה אליך בדרישה להסרת הפוסט שפרסמת ביום [תאריך הפרסום] ברשת החברתית פייסבוק בקבוצת "פאודר", אשר בו ציינת את שמי, רון קנטור, והוצאת עלי שם רע עם מקרים לא נכונים ושקריים.
	  
	  הפוסט שפרסמת מהווה לשון הרע כמשמעותו בחוק, שכן הוא כולל פרטים אשר עלולים להשפיל אותי בעיני אחרים, לבזות אותי ולהזיק לשמי הטוב. פוסט זה גרם וגורם לי נזקים רבים הן מבחינה אישית והן מבחינה מקצועית.
	  
	  בשל הפרסום הנ"ל, אני דורש ממך לבצע את הפעולות הבאות באופן מיידי ולא יאוחר מ-7 ימים מיום קבלת מכתב זה:
	  
	  להסיר את הפוסט הפוגעני לאלתר.
	  לפרסם הודעת הכחשה והתנצלות בפומבי באותה הרשת החברתית בה פורסם הפוסט המקורי, ולציין שהמידע שנכתב בפוסט אינו נכון ושגוי.
	  להימנע מכל פרסום עתידי דומה שעלול לפגוע בשמי הטוב.
	  במידה ולא תבצע את הפעולות הנדרשות לעיל, אשקול לנקוט נגדך בהליכים משפטיים בגין פרסום לשון הרע, אשר יכולים לכלול תביעה לפיצוי כספי ולסעדים נוספים כפי שיימצא לנכון.
	  
	  מכתב זה נשלח בתום לב ובמטרה למנוע הליכים משפטיים מיותרים. אני מקווה כי תבין את חומרת המצב ותפעל בהתאם לדרישותיי בהקדם האפשרי.`,
    });
  } catch (error) {
    // Handle errors
    console.error(error);
    return NextResponse.json(
      { error: "Invalid request or server error" },
      { status: 400 }
    );
  }
}
