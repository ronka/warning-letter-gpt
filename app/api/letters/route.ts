import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { letters } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: NextRequest) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userLetters = await db
      .select()
      .from(letters)
      .where(eq(letters.user_id, userId))
      .orderBy(desc(letters.createdAt));

    return NextResponse.json(userLetters);
  } catch (error) {
    console.error("Error fetching user letters:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
