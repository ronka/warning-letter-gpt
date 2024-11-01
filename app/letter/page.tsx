"use client";

import { CreateForm } from "@/components/letter/CreateForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ERROR_MESSAGES, ERROR_MESSAGES_HEBREW } from "@/constants/errors";
import { useCredits } from "@/context/Credits";
import Link from "next/link";

export default function Letters() {
  const { data: credits, isLoading } = useCredits();

  const creditsLeft = credits?.credits_left ?? 0;

  return (
    <>
      <div className="text-center  mb-10">
        <div className="mb-10">
          <h1 className="text-2xl font-bold">
            יצירת מכתב התראה מעולם לא הייתה פשוטה יותר
          </h1>
          <h3>
            מלאו את השדות הבאים וניצור עבורכם מכתב התראה מותאם אישית תוך דקות.
            כל מה שנשאר לכם לעשות הוא לשלוח אותו!
          </h3>
        </div>

        {creditsLeft === 0 && (
          <Card className="max-w-xs mx-auto">
            <CardContent className="pt-6">
              <div className="text-center gap-4 flex flex-col">
                <p className="text-red-500">
                  {ERROR_MESSAGES_HEBREW[ERROR_MESSAGES.INSUFFICIENT_CREDITS]}
                </p>
                <Link href="/credits">
                  <Button>לקניית קרדיטים</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <CreateForm />
    </>
  );
}
