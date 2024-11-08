import { Button } from "../ui/button";
import Link from "next/link";
const Hero = () => {
  return (
    <section className="bg-muted py-12 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          לשון הרע? פייק ניוז? תגידו די
        </h1>
        <p className="text-xl mb-8">
          בו לייצר מכתב התראה מהיר וקל לכל שם ומטרה שתרצה
        </p>
        <Link href={"/letter"}>
          <Button className="text-lg px-8 py-6 rounded-xl hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-xl bg-primary">
            <span className="ml-2 text-2xl">✉️</span>
            צור מכתב התראה
          </Button>
        </Link>
      </div>
    </section>
  );
};

export { Hero };
