import { type FormData } from "@/components/CreateForm";
import { NextRequest, NextResponse } from "next/server";

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

    // Return response
    return NextResponse.json({
      id: "1",
      content: "prompt",
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
