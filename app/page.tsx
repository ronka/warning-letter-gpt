import { Footer } from "@/components/Footer";
import { CreateForm } from "@/components/home/CreateForm";
import { Hero } from "@/components/home/Hero";

export default function Home() {
  return (
    <main className="flex-grow">
      <h1 className="text-center text-2xl font-bold">
        Welcome to the Home Page
      </h1>
      <p className="text-center mt-4">
        Navigate to /letters to see the letters or /letter for individual letter
        details.
      </p>
    </main>
  );
}
