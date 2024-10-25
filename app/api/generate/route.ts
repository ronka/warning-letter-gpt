import { FormData } from "@/types/FormData";
import { NextRequest, NextResponse } from "next/server";
import { openai } from "@ai-sdk/openai";
import { ImagePart, generateObject, CoreMessage } from "ai";
import { TopicToDesciption } from "@/data/Topics";
import {
  LetterInputSchema,
  LetterInput,
  LetterResponseSchema,
} from "@/types/Letter";
import { db } from "@/db";
import { letters, userCredits } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

const parseFormData = (formData: globalThis.FormData): FormData => {
  const data = {} as FormData;

  formData.forEach((value, key) => {
    if (key === "file[]") {
      data["file"] = Array.isArray(data["file"])
        ? [...data["file"], value]
        : [value];
    } else {
      const parsedKey = key as keyof FormData;

      data[parsedKey] = value;
    }
  });

  return data;
};

const filesToBuffers = async (files: File[]): Promise<ArrayBuffer[]> => {
  return Promise.all(files.map((file) => file.arrayBuffer()));
};

const imagesToImageParts = (images: ArrayBuffer[]): ImagePart[] => {
  return images.map((image) => ({
    type: "image",
    image: image,
  }));
};

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check user credits
    const [userCredit] = await db
      .select()
      .from(userCredits)
      .where(eq(userCredits.user_id, userId));

    if (!userCredit || userCredit.credits_left < 1) {
      return NextResponse.json(
        { error: "Insufficient credits" },
        { status: 403 }
      );
    }

    const formData = await req.formData();
    const data = parseFormData(formData);
    const images = await filesToBuffers(data["file"] ?? []);

    const topic = data["topic"] as keyof typeof TopicToDesciption;

    const messages: CoreMessage[] = [
      {
        role: "system",
        content: `Write a warning letter to ${
          data["against-name"]
        } in the name of the client, ${data["name"]}.
		the topic of the letter is: "${data["topic"]}".
		The reason for this warning letter from the client is:
		"${data["body"]}".
		The wanted outcome of the letter should be: "${data["purpose"]}".
		Use the examples and refer to the law as much as possible, DONT refer if you dont find it in the law, what this letter is about with the wanted outcome listed in that list
		
		<the-law>
		   ${TopicToDesciption[topic].law}
		</the-law>

		<warning-letter-examples>
	   		${TopicToDesciption[topic].examples.join("\n")}
		</warning-letter-examples>`,
      },
    ];

    if (images.length > 0) {
      messages.push({
        role: "user",
        content: [
          {
            type: "text",
            text: "here is a list of evidence that you can use:",
          },
          ...imagesToImageParts(images),
        ],
      });
    }

    const { object } = await generateObject({
      model: openai("gpt-4o"),
      schema: LetterInputSchema,
      system: `You are an attorney and you help your client to write a warning letter to do what ever the client request you to do.
		You are a professional and you know how to write a warning letter, but the letter should sound like it was written by the client.
		Refer to law only from what i provide you.
		Dont put placeholders, if you dont have the data don't write it.
		
		the letter MUST be in hebrew`,
      messages,
    });

    const currentDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format

    // Insert the generated letter into the database
    const newLetter: LetterInput = {
      title: object.title,
      initialDate: currentDate,
      recipientName: data["against-name"] as string,
      warningPoints: object.warningPoints,
      senderName: data["name"] as string,
    };

    // Use a transaction to ensure both operations succeed or fail together
    const [insertedLetter] = await db.transaction(async (tx) => {
      const [letter] = await tx
        .insert(letters)
        .values({
          ...newLetter,
          user_id: userId,
        })
        .returning();

      await tx
        .update(userCredits)
        .set({
          credits_left: userCredit.credits_left - 1,
          last_usage: new Date(),
        })
        .where(eq(userCredits.user_id, userId));

      return [letter];
    });

    // Transform the inserted letter to match LetterResponseSchema
    const responseData = LetterResponseSchema.parse({
      id: insertedLetter.id,
      title: insertedLetter.title,
      initialDate: insertedLetter.initialDate,
      recipient: {
        name: insertedLetter.recipientName,
      },
      warningPoints: insertedLetter.warningPoints,
      sender: {
        name: insertedLetter.senderName,
      },
    });

    // Return response
    return NextResponse.json(responseData);
  } catch (error) {
    // Handle errors
    console.error("Error generating letter:", error);
    return NextResponse.json(
      { error: "Invalid request or server error" },
      { status: 400 }
    );
  }
}
