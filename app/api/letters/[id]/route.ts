import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { letters } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const letterId = parseInt(params.id, 10);

    if (isNaN(letterId)) {
      return NextResponse.json({ error: "Invalid letter ID" }, { status: 400 });
    }

    const [letter] = await db
      .select()
      .from(letters)
      .where(eq(letters.id, letterId));

    if (!letter) {
      return NextResponse.json({ error: "Letter not found" }, { status: 404 });
    }

    if (letter.user_id !== userId) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    return NextResponse.json(letter);
  } catch (error) {
    console.error("Error fetching letter:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
