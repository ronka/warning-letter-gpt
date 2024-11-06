import Image from "next/image";
import imageSrc from "./latter.png";
import { Button } from "../ui/button";
import Link from "next/link";

export function ExplainationSection() {
  return (
    <section className="py-20 bg-gradient-to-br ">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="w-full md:w-1/2 space-y-4 bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-800">
              מהו מכתב אזהרה משפטי?
            </h2>
            <p className="text-lg text-gray-600">
              מכתב אזהרה הוא כלי משפטי חזק שמסייע להגן על זכויותיך לפני פנייה
              לבית המשפט. כאשר מופצים עליך או על העסק שלך שקרים, דיבה או מידע
              פוגעני, מכתב אזהרה יכול להרתיע את הצד הפוגע ולעצור את הפגיעה.
            </p>
            <h3 className="text-xl font-bold text-gray-800">
              מתי כדאי להשתמש?
            </h3>
            <ul className="text-gray-600 text-lg">
              <li>✅ מניעת פרסום שקרי עליך או על העסק שלך</li>
              <li>✅ הגנה על המוניטין שלך</li>
              <li>✅ פתרון מהיר לפני נקיטת צעדים משפטיים יקרים</li>
            </ul>
            <p className="text-gray-600 text-lg">
              הגן על זכויותיך בקלות – מכתב אזהרה משפטי מקצועי, תוך דקות!
            </p>
            <div className="flex justify-center">
              <Link href={"/letter"}>
                <Button>צור מכתב התראה ✉️</Button>
              </Link>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <Image
              src={imageSrc}
              width={600}
              height={400}
              className="max-h-[600px] md:object-contain"
              alt="Promotional image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
