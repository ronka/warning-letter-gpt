import { Hero } from "@/components/home/Hero";
import { PromoSection } from "@/components/home/PromoSection";
import { ExplainationSection } from "@/components/home/ExplainationSection";
import { PricingTable } from "@/components/pricing-table/table";
import { FaqSection } from "@/components/home/FaqSection";

export default function Home() {
  return (
    <main className="flex-grow">
      <Hero />
      <ExplainationSection />
      <PromoSection />
      <PricingTable />
      <FaqSection />
    </main>
  );
}
