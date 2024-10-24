import { Hero } from "@/components/home/Hero";
import { PricingTable } from "@/components/pricing-table/table";

export default function Home() {
  return (
    <main className="flex-grow">
      <Hero />
      <PricingTable />
    </main>
  );
}
