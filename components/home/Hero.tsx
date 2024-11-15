import { Button } from "../ui/button";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="bg-muted py-12 md:py-24">
      <div className="container mx-auto px-4 text-center flex flex-col md:flex-row gap-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            לשון הרע? הפרת זכויות יוצרים? תגידו{" "}
            <span className="text-primary underline">די!</span>
          </h1>
          <p className="text-xl mb-8">
            בואו לייצר מכתב התראה מהיר וקל לכל שם ומטרה שתרצו
          </p>

          <ul className="text-lg mb-8">
            <li>✅ עצירת הפצת מידע שקרי עליך או על העסק שלך</li>
            <li>✅ הגנה על זכויות היוצרים שלך</li>
            <li>✅ שמירה על המוניטין האישי והעסקי שלך</li>
            <li>✅ קיצור הליכים משפטיים יקרים וממושכים</li>
            <li>✅ פתרון מהיר ומיידי למניעת פגיעה נוספת</li>
          </ul>

          <Link href={"/letter"}>
            <Button className="text-lg px-8 py-6 rounded-xl hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-xl bg-primary mb-12">
              <span className="ml-2 text-2xl">✉️</span>
              צור מכתב התראה
            </Button>
          </Link>
        </div>

        <div>
          <iframe
            width="560"
            height="315"
            className="aspect-video w-full"
            src="https://www.youtube.com/embed/RjTpwohtjQk?si=BI-8fTExNYoz9Znp"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
};

export { Hero };
