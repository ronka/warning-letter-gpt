"use client";
import { generateAsync, type GenerateResponse } from "@/services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useLetterMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: generateAsync,
    onSuccess: (data) => {
      // Optionally invalidate queries or update the cache with the new item
      queryClient.invalidateQueries({ queryKey: ["letters"] });
      queryClient.setQueryData(["generateLetter"], data);
    },
  });
};

export const useLetterQuery = () => {
  const data = {
    id: "1",
    letter: {
      to: "אורי כהן",
      title: "התרעה על הוצאת דיבה",
      body: 'אורי כהן הנכבד,\n\nהנדון: דרישה להסרת פוסט בגין לשון הרע\n\nבהתאם להוראות חוק איסור לשון הרע, תשכ"ה-1965, אני פונה אליך בדרישה להסרת הפוסט שפרסמת, שבו הכפשת את שמי באופן פומבי ביני לבין אחרים. הפוסט מהווה הוצאת דיבה, כמשמעותו בחוק, וכולל פרטים שקריים ופוגעניים אשר עלולים להשפיל אותי ולהזיק לשמי הטוב. לפרסום זה ישנן השלכות חמורות על המוניטין האישי והמקצועי שלי.\n\nבמקרה המצורף, מדובר בפוסט שפרסמת הנושא את שמי, ובו הצגת פרטים לא נכונים ושקריים בקשר לעבודתי וכישורי המקצועיים. פרסום זה עלול להשפיע לרעה על תפקידי ועל היחס המקצועי כלפיי מצד קולגות ואנשי מקצוע בתחום. \n\nבשל הפרסום הנ"ל, אני דורש ממך לבצע את הפעולות הבאות באופן מיידי ולא יאוחר מ-7 ימים מיום קבלת מכתב זה:\n\n1. להסיר את הפוסט המכפיש לאלתר.\n2. להתנצל בפומבי באותה רשת חברתית בה פורסם הפוסט המקורי, ולציין שהמידע שנכתב בפוסט אינו נכון ושגוי.\n3. להימנע מכל פרסום עתידי דומה שעלול לפגוע בשמי הטוב.\n\nבמידה ולא תבצע את הפעולות הנדרשות לעיל, אשקול לנקוט נגדך בהליכים משפטיים בגין פרסום לשון הרע, אשר יכולים לכלול תביעה לפיצוי כספי ולסעדים נוספים כפי שיימצא לנכון.\n\nמכתב זה נשלח בתום לב ובמטרה למנוע הליכים משפטיים מיותרים. אני מקווה כי תבין את חומרת המצב ותפעל בהתאם לדרישותיי בהקדם האפשרי.\n\nבכבוד רב,\n\nרון קנטור',
      wanted_outcome: "שיסיר את הפוסט",
    },
  };

  const isError = false;
  const isLoading = false;
  const error = new Error("test");

  return { data, isError, isLoading, error };

  const queryClient = useQueryClient();

  const fetchLetters = async () => {
    const data = queryClient.getQueryData(["generateLetter"]);
    return data as GenerateResponse;
  };

  return useQuery({
    queryKey: ["letters"],
    queryFn: fetchLetters,
    enabled: !!queryClient.getQueryData(["generateLetter"]),
  });
};
