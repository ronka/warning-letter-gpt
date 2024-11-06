import { Hero } from "@/components/home/Hero";
import { PromoSection } from "@/components/home/PromoSection";
import { ExplainationSection } from "@/components/home/ExplainationSection";
import { PricingTable } from "@/components/pricing-table/table";

export default function Home() {
  return (
    <main className="flex-grow">
      <Hero />
      <ExplainationSection />
      <PromoSection />
      <PricingTable />
    </main>
  );
}
