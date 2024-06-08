import { type FormData } from "@/components/CreateForm";
import { NextRequest, NextResponse } from "next/server";
import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { TopicToDesciption } from "@/data/Topics";
import { LetterResponseSchema } from "@/types/Letter";

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

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const data = parseFormData(formData);

    const { object } = await generateObject({
      model: openai("gpt-4o"),
      schema: LetterResponseSchema,
      system: `You are an attorney and you help your client to write a warning letter to do what ever the client request you to do.
		You are a professional and you know how to write a warning letter, but the letter should sound like it was written by the client.
		Refer to law only from what i provide you.
		the letter MUST be in hebrew`,
      prompt: `Write a warning letter to ${
        data["against-name"]
      } in the name of the client, ${data["name"]}.
	  the topic of the letter is: "${data["topic"]}".
	  The reason for this warning letter from the client is:
	  "${data["body"]}".
	  The wanted outcome of the letter should be: "${data["purpose"]}".
	  
	 the law regreding this topic is:
	 ${TopicToDesciption[data["topic"]].law}
	 
	 Here are examples for a warning letter:
	 ${TopicToDesciption[data["topic"]].examples.join("\n")}
	 `,
    });

    // Return response
    return NextResponse.json({
      id: "1",
      letter: object.letter,
    });
  } catch (error) {
    // Handle errors
    console.error(error);
    return NextResponse.json(
      { error: "Invalid request or server error" },
      { status: 400 }
    );
  }
}
