import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { userCredits } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: NextRequest) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [userCredit] = await db
      .select()
      .from(userCredits)
      .where(eq(userCredits.user_id, userId));

    if (!userCredit) {
      // If no user credit record is found, create a new one with zero credits
      const newUserCredit = await db
        .insert(userCredits)
        .values({
          user_id: userId,
          credits_left: 0,
          last_usage: new Date(),
        })
        .returning();

      return NextResponse.json({
        credits_left: 0,
        last_usage: newUserCredit[0].last_usage,
      });
    }

    return NextResponse.json({
      credits_left: userCredit.credits_left,
      last_usage: userCredit.last_usage,
    });
  } catch (error) {
    console.error("Error fetching or creating user credits:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
