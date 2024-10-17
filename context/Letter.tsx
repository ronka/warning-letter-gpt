"use client";
import { generateAsync, type GenerateResponse } from "@/services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Toggle this to switch between mock and real API
const USE_MOCK_API = true;

// Mock data store
const mockLetters: Record<string, GenerateResponse> = {};

const mockGenerateAsync = async (formData: any): Promise<GenerateResponse> => {
  const id = Math.random().toString(36).substr(2, 9);
  const newLetter: GenerateResponse = {
    id,
    letter: {
      to: formData["against-name"],
      title: `התרעה בנושא ${formData.topic}`,
      body: 'אורי כהן הנכבד,\n\nהנדון: דרישה להסרת פוסט בגין לשון הרע\n\nבהתאם להוראות חוק איסור לשון הרע, תשכ"ה-1965, אני פונה אליך בדרישה להסרת הפוסט שפרסמת, שבו הכפשת את שמי באופן פומבי ביני לבין אחרים. הפוסט מהווה הוצאת דיבה, כמשמעותו בחוק, וכולל פרטים שקריים ופוגעניים אשר עלולים להשפיל אותי ולהזיק לשמי הטוב. לפרסום זה ישנן השלכות חמורות על המוניטין האישי והמקצועי שלי.\n\nבמקרה המצורף, מדובר בפוסט שפרסמת הנושא את שמי, ובו הצגת פרטים לא נכונים ושקריים בקשר לעבודתי וכישורי המקצועיים. פרסום זה עלול להשפיע לרעה על תפקידי ועל היחס המקצועי כלפיי מצד קולגות ואנשי מקצוע בתחום. \n\nבשל הפרסום הנ"ל, אני דורש ממך לבצע את הפעולות הבאות באופן מיידי ולא יאוחר מ-7 ימים מיום קבלת מכתב זה:\n\n1. להסיר את הפוסט המכפיש לאלתר.\n2. להתנצל בפומבי באותה רשת חברתית בה פורסם הפוסט המקורי, ולציין שהמידע שנכתב בפוסט אינו נכון ושגוי.\n3. להימנע מכל פרסום עתידי דומה שעלול לפגוע בשמי הטוב.\n\nבמידה ולא תבצע את הפעולות הנדרשות לעיל, אשקול לנקוט נגדך בהליכים משפטיים בגין פרסום לשון הרע, אשר יכולים לכלול תביעה לפיצוי כספי ולסעדים נוספים כפי שיימצא לנכון.\n\nמכתב זה נשלח בתום לב ובמטרה למנוע הליכים משפטיים מיותרים. אני מקווה כי תבין את חומרת המצב ותפעל בהתאם לדרישותיי בהקדם האפשרי.\n\nבכבוד רב,\n\nרון קנטור',
      wanted_outcome: formData.purpose,
    },
  };
  mockLetters[id] = newLetter;
  return newLetter;
};

const mockFetchLetter = async (id: string): Promise<GenerateResponse> => {
  console.log("mockFetchLetter");
  const letter = mockLetters[id];
  if (!letter) {
    throw new Error("Letter not found");
  }
  return letter;
};

export const useLetterMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: USE_MOCK_API ? mockGenerateAsync : generateAsync,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["letters"] });
      queryClient.setQueryData(["letter", data.id], data);
    },
  });
};

export const useLetterQuery = (id: string) => {
  return useQuery({
    queryKey: ["letter", id],
    queryFn: () => (USE_MOCK_API ? mockFetchLetter(id) : fetchLetter(id)),
    enabled: !!id,
  });
};

const fetchLetter = async (id: string): Promise<GenerateResponse> => {
  // Implement the actual API call to fetch a specific letter by ID
  // This function should be implemented when you're ready to connect to a real API
  throw new Error("Real API not implemented yet");
};
