"use client";

import { PricingTable } from "@/components/pricing-table/table";
import { Card, CardContent } from "@/components/ui/card";
import { useCredits } from "@/context/Credits";
import { SignedIn } from "@clerk/nextjs";

export default function CreditsPage() {
  const { data: credits, isLoading } = useCredits();

  return (
    <div className="gap-4">
      <SignedIn>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">
                הקרדיטים שלך: {isLoading ? "..." : credits?.credits_left ?? "-"}
              </h2>
            </div>
          </CardContent>
        </Card>
      </SignedIn>

      <div className="flex justify-center items-center py-12 bg-background">
        <PricingTable />
      </div>
    </div>
  );
}
