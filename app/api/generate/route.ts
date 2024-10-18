import { FormData } from "@/types/FormData";
import { NextRequest, NextResponse } from "next/server";
import { openai } from "@ai-sdk/openai";
import { ImagePart, generateObject } from "ai";
import { TopicToDesciption } from "@/data/Topics";
import { LetterInputSchema, LetterInput } from "@/types/Letter";
import { db } from "@/db";
import { letters } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";

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

    const formData = await req.formData();
    const data = parseFormData(formData);
    const images = await filesToBuffers(data["file"] ?? []);

    const { object } = await generateObject({
      model: openai("gpt-4o"),
      schema: LetterInputSchema,
      system: `You are an attorney and you help your client to write a warning letter to do what ever the client request you to do.
		You are a professional and you know how to write a warning letter, but the letter should sound like it was written by the client.
		Refer to law only from what i provide you.
		Dont put placeholders, if you dont have the data don't write it.
		
		the letter MUST be in hebrew`,
      messages: [
        {
          role: "system",
          content: `Write a warning letter to ${
            data["against-name"]
          } in the name of the client, ${data["name"]}.
		  the topic of the letter is: "${data["topic"]}".
		  The reason for this warning letter from the client is:
		  "${data["body"]}".
		  The wanted outcome of the letter should be: "${data["purpose"]}".
		  
		 the law regreding this topic is:
		 ${TopicToDesciption[data["topic"]].law}
		 
		 Here are examples for a warning letter:
		 ${TopicToDesciption[data["topic"]].examples.join("\n")}`,
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "here is a list of evidence that you can use:",
            },
            ...imagesToImageParts(images),
          ],
        },
      ],
    });

    // Insert the generated letter into the database
    const newLetter: LetterInput = {
      to: data["against-name"],
      title: object.title,
      body: object.body,
      wantedOutcome: object.wantedOutcome,
      user_id: userId,
    };

    const [insertedLetter] = await db
      .insert(letters)
      .values(newLetter)
      .returning();

    // Return response
    return NextResponse.json(insertedLetter);
  } catch (error) {
    // Handle errors
    console.error("Error generating letter:", error);
    return NextResponse.json(
      { error: "Invalid request or server error" },
      { status: 400 }
    );
  }
}
