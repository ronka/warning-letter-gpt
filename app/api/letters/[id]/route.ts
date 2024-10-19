import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { letters } from "@/db/schema";
import { eq, and } from "drizzle-orm";
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

export async function PUT(req: NextRequest) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { id, to, title, body: letterBody } = body;

    if (!id || !to || !title || !letterBody) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const updatedLetter = await db
      .update(letters)
      .set({ to, title, body: letterBody, updatedAt: new Date() })
      .where(and(eq(letters.id, id), eq(letters.user_id, userId)))
      .returning();

    if (updatedLetter.length === 0) {
      return NextResponse.json(
        { error: "Letter not found or unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedLetter[0]);
  } catch (error) {
    console.error("Error updating letter:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
