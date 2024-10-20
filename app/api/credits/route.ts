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
      return NextResponse.json(
        { error: "User credits not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      credits_left: userCredit.credits_left,
      last_usage: userCredit.last_usage,
    });
  } catch (error) {
    console.error("Error fetching user credits:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
