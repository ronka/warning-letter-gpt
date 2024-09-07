import { Footer } from "@/components/Footer";
import { CreateForm } from "@/components/home/CreateForm";
import { Hero } from "@/components/home/Hero";

export default function Home() {
  return (
    <main className="flex-grow">
      <Hero />
      <CreateForm />
    </main>
  );
}
