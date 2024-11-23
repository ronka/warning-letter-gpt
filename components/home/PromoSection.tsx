import Image from "next/image";
import imageSrc from "./image.png";
import { Button } from "../ui/button";
import Link from "next/link";

export function PromoSection() {
  return (
    <section className="py-20 bg-gradient-to-br ">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="w-full md:w-1/2 space-y-4 bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-800">
              צור מבנית למכתב אזהרה תוך דקות –{" "}
              <span className="text-blue-600">שמור על זכויותיך!</span>
            </h2>
            <p className="text-lg text-gray-600">
              מכתבי אזהרה הם כלי חיוני במצבים בהם מתבצע פרסום פוגעני או הפצת
              מידע שקרי שעלולים לפגוע במוניטין שלך, הפרטי או העסקי. בין אם מדובר
              בדיבה, לשון הרע או השמצה – מכתב אזהרה מנוסח היטב יכול לעצור את
              הפגיעה ולהגן על זכויותיך המשפטיות. האתר שלנו מספק לך אפשרות לייצר
              מכתב משפטי בצורה מהירה, יעילה ומקצועית – מבלי להמתין לעורך דין.
            </p>
            <p className="text-gray-600 text-lg">
              הצטרף לאלפי משתמשים שכבר בחרו להגן על שמם הטוב!
            </p>
            <div className="flex justify-center">
              <Link href={"/letter"}>
                <Button>צור תבנית למכתב אזהרה ✉️</Button>
              </Link>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <Image
              src={imageSrc}
              width={600}
              height={400}
              alt="Promotional image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
